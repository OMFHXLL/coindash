import React, { useEffect } from 'react';
import { DB } from '../../../db';
import { withGameContext, actions } from '../../../context/GameContext';

const Coin = ({ context }) => {
  const { tgId, energy, score, clicks, multiplier } = context.state;

  const handleCoinClick = async (e) => {
    e.preventDefault();

    if (energy < 1) {
      return console.log('Энергия закончилась');
    }
    const multiplierAnimation = document.createElement('div');
    multiplierAnimation.className = 'coin-multiplier noselect';
    multiplierAnimation.innerHTML = `<span class="coin-multiplier noselect">+${multiplier}</span>`;
    document.body.appendChild(multiplierAnimation);
    multiplierAnimation.style.position = 'absolute';
    multiplierAnimation.style.left = `${e.pageX}px`; // Центрируем по X
    multiplierAnimation.style.top = `${e.pageY}px`; // Центрируем по Y

    // Запускаем анимацию
    requestAnimationFrame(() => {
        multiplierAnimation.style.transition = 'transform 1s, opacity 1s';
        multiplierAnimation.style.transform = `translateY(-150px)`;
        multiplierAnimation.style.opacity = '0';
    });

    multiplierAnimation.addEventListener('transitionend', () => {
        multiplierAnimation.remove();
    });

    const newScore = score + multiplier;
    const newClicksScore = clicks + 1;
    const newEnergyScore = energy - 1;

    context.dispatch({ type: actions.SET_SCORE, payload: newScore });
    context.dispatch({ type: actions.SET_CLICKS, payload: newClicksScore });
    context.dispatch({ type: actions.SET_ENERGY, payload: newEnergyScore });

    await DB
      .from('users')
      .update({ score: newScore, clicks: newClicksScore, energy: newEnergyScore })
      .eq('tg_id', tgId);
  };

  return (
    <div>
      <span className="score noselect">🔘{context.state.score}</span>
      <button className="coin" onClick={handleCoinClick}></button>
    </div>
  );
};

export default withGameContext(Coin);