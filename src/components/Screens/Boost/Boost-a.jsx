import { useContext, useEffect, useState } from 'react';
import { GameContext, actions } from '../../../context/GameContext';
import { formatTime } from '../../../utils/utils';
import { DB } from '../../../db';

import { PiCoinsFill } from "react-icons/pi";
import { AiFillThunderbolt } from "react-icons/ai";
import { PiTimerFill } from "react-icons/pi";

const icons = {
    'power_compose': <PiCoinsFill className="boost-main-button-icon"/>,
    'energy_compose': <AiFillThunderbolt className="boost-main-button-icon"/>,
    'energy_boost': <PiTimerFill className="boost-main-button-icon"/>
  }

const Boost = ({ type, id, title, price, duration, power, requiredLevel, lastTimeActive }) => {
  const { state, dispatch } = useContext(GameContext);
  const tgId = state.tgId;
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const lastActiveTime = new Date(lastTimeActive).getTime();
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - lastActiveTime;

    if (elapsedTime < duration * 1000) {
      setTimeLeft(duration - Math.floor(elapsedTime / 1000));
      switch (type) {
        case 'power_compose':
          dispatch({ type: actions.SET_MULTIPLIER, payload: state.multiplier + power });
          break;
        case 'energy_compose':
          dispatch({ type: actions.SET_MAX_ENERGY, payload: state.maxEnergy + power });
          break;
        case 'energy_boost':
          dispatch({ type: actions.SET_ENERGY_MULTIPLIER, payload: state.energyMultiplier + power });
          break;
      }
    } else {
      setTimeLeft(0);
    }
  }, [lastTimeActive, duration]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft <= 1) {
            clearInterval(timerId);
            switch (type) {
              case 'power_compose':
                dispatch({ type: actions.SET_MULTIPLIER, payload: Math.min(1, state.multiplier - power) });
                break;
              case 'energy_compose':
                dispatch({ type: actions.SET_MAX_ENERGY, payload: Math.min(500, state.maxEnergy - power) });
                break;
              case 'energy_boost':
                dispatch({ type: actions.SET_ENERGY_MULTIPLIER, payload: Math.min(1, state.energyMultiplier - power) });
                break;
            }
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);

      return () => clearInterval(timerId);
    } 
  }, [timeLeft]);

  const updateBoostDate = async () => {
    const { data, error } = await DB
      .from('users')
      .select('*')
      .eq('tg_id', tgId)
      
    
    if (error) {
      console.error('Error fetching boosts:', error);
      return;
    }
    
    let boosts = data[0].boosts;
    if (!boosts) {
      boosts = [];
    }

    let boostIndex = boosts.findIndex(boost => boost.id === id);
    if (boostIndex !== -1) {
      boosts[boostIndex].date = new Date().toISOString();
    } else {
      boosts.push({ id: id, date: new Date().toISOString() });
    }
    
    const updatedBoosts = boosts.map(boost => {
      if (boost.id === id) {
        boost.date = new Date().toISOString();
      }
      return boost;
    });

    console.log(updatedBoosts)
    
    const { updateError } = await DB
      .from('users')
      .update({ boosts: updatedBoosts, score: state.score - price })
      .eq('tg_id', tgId);
  
    if (updateError) {
      console.error('Error updating boosts:', updateError);
      return;
    }
  }

  const handleBoostClick = () => {
    if (state.score >= price && timeLeft === 0) {
      dispatch({ type: actions.SET_SCORE, payload: state.score - price });
      switch (type) {
        case 'power_compose':
          dispatch({ type: actions.SET_MULTIPLIER, payload: state.multiplier + power });
          break;
        case 'energy_compose':
          dispatch({ type: actions.SET_MAX_ENERGY, payload: state.maxEnergy + power });
          break;
        case 'energy_boost':
          dispatch({ type: actions.SET_ENERGY_MULTIPLIER, payload: state.energyMultiplier + power });
          break;
      }
      updateBoostDate();
      setTimeLeft(duration);
    }
  };

  return (
    <div className='boost a-btn'>
      <div className='boost__title'>{icons[type]}{title}</div>
      <div className={timeLeft > 0 ? 'boost__button active' : 'boost__button'}>
        <button
            onClick={handleBoostClick}
            disabled={state.score < price}
            >
          {timeLeft > 0 ? formatTime(timeLeft) : price}
        </button>
      </div>
    </div>
  );
};

export default Boost;