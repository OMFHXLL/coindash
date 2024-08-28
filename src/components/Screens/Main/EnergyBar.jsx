import React, { useContext, useEffect, useState } from 'react';
import { GameContext, actions } from '../../../context/GameContext';
import EnergyIcon from '../../../assets/flash-thunder-svgrepo-com.svg';
import { DB } from '../../../db';

const EnergyBar = () => {
  const { state, dispatch } = useContext(GameContext);
  const { energy, energyMultiplier, maxEnergy, tgId, lastTimeOnline } = state;
  const [initialized, setInitialized] = useState(false);
  const [energyState, setEnergyState] = useState(energy);


  // Устанавливаем стиль для заполненной части EnergyBar
  const barStyle = {
    width: `${(energy * 100) / maxEnergy}%`
  };

  useEffect(() => {
    const calculateInitialEnergy = async () => {
      const now = new Date();
      const lastOnlineTime = new Date(lastTimeOnline);
      const timeDifferenceInSeconds = Math.floor((now - lastOnlineTime) / 1000);

      let newEnergy = Math.min(energy + timeDifferenceInSeconds * energyMultiplier, maxEnergy);
      

      dispatch({ type: actions.SET_ENERGY, payload: newEnergy });


      // Обновляем данные в базе данных
      await DB.from('users')
        .update({ energy: newEnergy, last_time_online: new Date().toISOString() })
        .eq('tg_id', tgId);
      setInitialized(true)
    };
    setTimeout(() => {
      calculateInitialEnergy();
    }, 200);
  }, []);

  useEffect(() => {
    if (initialized) {
      const intervalId = setInterval(async () => {
        if (energy < maxEnergy) {
          const newEnergyScore = Math.min(energy + energyMultiplier, maxEnergy); // Ограничиваем максимальную энергию
          dispatch({ type: actions.SET_ENERGY, payload: newEnergyScore });
          await DB.from('users')
            .update({ energy: newEnergyScore, max_energy: maxEnergy, last_time_online: new Date().toISOString() })
            .eq('tg_id', tgId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [energy, energyMultiplier, maxEnergy, tgId, dispatch, initialized]);

  useEffect(() => {
    if (energy > maxEnergy) {
      dispatch({ type: actions.SET_ENERGY, payload: maxEnergy });
    }
  }, [maxEnergy]);

  return (
    <div className="energy">
      <div className="energy-score"><div className='energy-icon mask'></div> {energy} / {maxEnergy}</div>
      <div className="energy-bar">
        <div className="energy-bar-fill" style={barStyle} />
      </div>
    </div>
  );
};

export default EnergyBar;