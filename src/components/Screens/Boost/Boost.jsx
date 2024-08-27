import { useContext, useEffect, useState } from 'react';
import { GameContext, actions } from '../../../context/GameContext';
import { formatTime } from '../../../utils/utils';
import { DB } from '../../../db';

const Boost = ({ id, title, price, duration, power, requiredLevel, lastTimeActive }) => {
  const { state, dispatch } = useContext(GameContext);
  const tgId = state.tgId;
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const lastActiveTime = new Date(lastTimeActive).getTime();
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - lastActiveTime;

    if (elapsedTime < duration * 1000) {
      setTimeLeft(duration - Math.floor(elapsedTime / 1000));
      dispatch({ type: actions.SET_MULTIPLIER, payload: state.multiplier + power });
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
            dispatch({ type: actions.SET_MULTIPLIER, payload: Math.min(1, state.multiplier - power) });
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
      dispatch({ type: actions.SET_MULTIPLIER, payload: state.multiplier + power });
      dispatch({ type: actions.SET_SCORE, payload: state.score - price });
      updateBoostDate();
      setTimeLeft(duration);
    }
  };

  return (
    <tr className={requiredLevel >= state.level ? 'boost' : 'boost disabled'}>
      <th className='boost__title'>{title}</th>
      <th className='boost__button'>
        <button
            onClick={handleBoostClick}
            disabled={state.score < price || timeLeft > 0}
            >
          {timeLeft > 0 ? formatTime(timeLeft) : price}
        </button>
      </th>
    </tr>
  );
};

export default Boost;