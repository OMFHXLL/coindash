import React, { useContext, useEffect, useState } from 'react';
import { GameContext, actions } from '../../../context/GameContext';
import { DB } from '../../../db';

const EnergyBar = () => {
  const { state, dispatch } = useContext(GameContext);
  const { energy, tgId, lastTimeOnline } = state;
  const [initialized, setInitialized] = useState(false);
  const [energyState, setEnergyState] = useState(energy);


  // Устанавливаем стиль для заполненной части EnergyBar
  const barStyle = {
    width: `${(energy * 100) / 500}%`
  };

  useEffect(() => {
    const calculateInitialEnergy = async () => {
      const now = new Date();
      const lastOnlineTime = new Date(lastTimeOnline);
      const timeDifferenceInSeconds = Math.floor((now - lastOnlineTime) / 1000);

      let newEnergy = Math.min(energy + timeDifferenceInSeconds, 500);
      

      dispatch({ type: actions.SET_ENERGY, payload: newEnergy });


      // Обновляем данные в базе данных
      await DB.from('users')
        .update({ energy: newEnergy, last_time_online: new Date().toISOString() })
        .eq('tg_id', tgId);
      setInitialized(true)
    };
    setTimeout(() => {
      calculateInitialEnergy();
    }, 100);
  }, []);

  useEffect(() => {
    if (initialized) {
      const intervalId = setInterval(async () => {
        if (energy < 500) {
          const newEnergyScore = Math.min(energy + 1, 500); // Ограничиваем максимальную энергию
          dispatch({ type: actions.SET_ENERGY, payload: newEnergyScore });
          await DB.from('users')
            .update({ energy: newEnergyScore, last_time_online: new Date().toISOString() })
            .eq('tg_id', tgId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [energy, tgId, dispatch, initialized]);

  return (
    <div className="energy">
      <p className="energy-score">🗲 {energy} / 500</p>
      <div className="energy-bar">
        <div className="energy-bar-fill" style={barStyle} />
      </div>
    </div>
  );
};

export default EnergyBar;