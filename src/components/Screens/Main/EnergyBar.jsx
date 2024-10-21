import React, { useContext, useEffect, useState } from 'react';
import { useGlobalState, socket } from '../../../context/state';
import { isExtraTapActive, extraTapInitialTime } from '../../../utils/extraTap';

const EnergyBar = () => {
  const [initialized, setInitialized] = useState(false);
  const [ tgId ] = useGlobalState('tg_id');
  const [ lastTimeOnline, setLastTimeOnline] = useGlobalState('last_time_online');
  const [ energy, setEnergy ] = useGlobalState('energy');
  const [ energyMultiplier, setEnergyMultiplier ] = useGlobalState('energy_multiplier');
  const [ maxEnergy, setMaxEnergy ] = useGlobalState('max_energy');
  const [ extraTapTime, setExtraTapTime ] = useGlobalState('extra_tap_time');


  // Устанавливаем стиль для заполненной части EnergyBar
  const progressBarStyle = {
    width: `${(energy * 100) / maxEnergy}%`
  };
  
  const extraTapProgressBarStyle = {
    width: `${(extraTapTime * 100) / extraTapInitialTime}%`
  };

  useEffect(() => {
    const calculateInitialEnergy = async () => {
      const now = new Date();
      const lastOnlineTime = new Date(lastTimeOnline);
      const timeDifferenceInSeconds = Math.floor((now - lastOnlineTime) / 1000);

      let newEnergy = Math.min(energy + timeDifferenceInSeconds * energyMultiplier, maxEnergy);
      setEnergy(newEnergy);
      
      socket.emit('updateUserData', { energy: newEnergy });
      setInitialized(true)
    };
    setTimeout(() => {
      calculateInitialEnergy();
    }, 200);
  }, [initialized]);

  useEffect(() => {
    if (initialized) {
      const intervalId = setInterval(async () => {
        if (energy < maxEnergy) {
          const newEnergyScore = Math.min(energy + energyMultiplier, maxEnergy); // Ограничиваем максимальную энергию
          setEnergy(newEnergyScore);

          socket.emit('updateUserData', { energy: newEnergyScore });
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [energy, energyMultiplier, maxEnergy, tgId, initialized]);

  useEffect(() => {
    if (energy > maxEnergy) {
      setEnergy(maxEnergy);
    }
  }, [maxEnergy]);

  return (
    <div className="energy">
      <div className="energy-score"><div className='energy-icon mask'></div> {energy} / {maxEnergy}</div>
      <div className="energy-bar">
        <div className="energy-bar-fill" style={progressBarStyle} />
      </div>
      {isExtraTapActive && <div className="extra-tap-bar" style={extraTapProgressBarStyle}></div>}
    </div>
  );
};

export default EnergyBar;