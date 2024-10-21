import React from 'react';
import { useGlobalState, socket } from '../../../context/state';
import { isExtraTapActive } from '../../../utils/extraTap';
import { coinIcons } from '../../../utils/utils';

const ranks = [
  5000,
  50000,
  250000,
  500000,
  1000000,
  2500000,
  5000000,
  10000000,
  50000000
]

const Coin = () => {
  const [ score, setScore ] = useGlobalState('score');
  const [ clicks, setClicks ] = useGlobalState('clicks');
  const [ totalScore, setTotalScore ] = useGlobalState('total_score');
  const [ energy, setEnergy ] = useGlobalState('energy');
  const [ multiplier, setMultiplier ] = useGlobalState('multiplier');
  const [ level, setLevel ] = useGlobalState('level');
  const [ isAccountActive ] = useGlobalState('is_account_active');
  const [ infinityEnergy ] = useGlobalState('infinity_energy');
  
  const newMultiplier = isExtraTapActive ? multiplier * 5 : multiplier;

  const handleCoinClick = (e) => {
    const touches = e.touches;
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      const x = touch.clientX;
      const y = touch.clientY;
      initClick(touch, x, y);
    }
  }

  const initClick = async (e, x, y) => {
    if (!isAccountActive) {
      return console.log('Аккаунт не активирован');
    }

    if (energy - multiplier < 0) {
      return console.log('Энергия закончилась');
    }    

    const multiplierAnimation = document.createElement('div');
    multiplierAnimation.className = 'coin-multiplier noselect';
    multiplierAnimation.innerHTML = `<span class="coin-multiplier noselect">+${newMultiplier}</span>`;
    document.body.appendChild(multiplierAnimation);
    multiplierAnimation.style.position = 'absolute';
    multiplierAnimation.style.left = `${x}px`;
    multiplierAnimation.style.top = `${y}px`;

    requestAnimationFrame(() => {
      multiplierAnimation.style.transition = 'transform 1s, opacity 1s';
      multiplierAnimation.style.transform = `translate(-50%, -170px) scale(1.7)`;
      multiplierAnimation.style.opacity = '0';
    });

    multiplierAnimation.addEventListener('transitionend', () => {
      multiplierAnimation.remove();
    });

    let newLevel = level;
    const newScore = score + newMultiplier;
    const newTotalScore = totalScore + newMultiplier;
    const newClicksScore = clicks + 1;
    const newEnergyScore = infinityEnergy ? energy : energy - newMultiplier;

    if (ranks[level - 1] < totalScore) {
      newLevel = level + 1;
      setLevel(newLevel);
    }

    setScore(newScore);
    setTotalScore(newTotalScore);
    setClicks(newClicksScore)
    setEnergy(newEnergyScore)
    
    socket.emit('updateUserData', { score: newScore, total_score: newTotalScore, clicks: newClicksScore, energy: newEnergyScore, level: newLevel })
  };


  return (
    <div>
      <div className="coin" onTouchStart={handleCoinClick}>
        <div className="coin-image">
          <img src={coinIcons[Object.keys(coinIcons)[level - 1]]} />
        </div>
      </div>
    </div>
  );
};

export default Coin;