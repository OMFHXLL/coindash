import React, { useEffect, useContext, useRef } from 'react';
import { DB } from '../../../db';
import { GameContext, actions } from '../../../context/GameContext';
import { RiCopperCoinFill } from "react-icons/ri";

const ranks = [
  5000, 10000, 20000, 50000, 100000, 200000, 300000
]

const Coin = () => {
  const { state, dispatch } = useContext(GameContext);
  const { tgId, energy, level, score, totalScore, clicks, multiplier, isAccountActive, infinityEnergy, extraTap, page } = state;
  
  const extraTapTimerRef = useRef(null);
  const originalMultiplierRef = useRef(multiplier); // Сохраняем исходный множитель

  const handleCoinClick = async (e) => {
    e.preventDefault();

    if (!isAccountActive) {
      return console.log('Аккаунт не активирован');
    }

    if (energy - multiplier < 0) {
      return console.log('Энергия закончилась');
    }

    const multiplierAnimation = document.createElement('div');
    multiplierAnimation.className = 'coin-multiplier noselect';
    multiplierAnimation.innerHTML = `<span class="coin-multiplier noselect">+${multiplier}</span>`;
    document.body.appendChild(multiplierAnimation);
    multiplierAnimation.style.position = 'absolute';
    multiplierAnimation.style.left = `${e.pageX}px`;
    multiplierAnimation.style.top = `${e.pageY}px`;

    requestAnimationFrame(() => {
      multiplierAnimation.style.transition = 'transform 1s, opacity 1s';
      multiplierAnimation.style.transform = `translate(-50%, -170px) scale(1.7)`;
      multiplierAnimation.style.opacity = '0';
    });

    multiplierAnimation.addEventListener('transitionend', () => {
      multiplierAnimation.remove();
    });

    const newLevel = level;
    const newScore = score + multiplier;
    const newTotalScore = totalScore + multiplier;
    const newClicksScore = clicks + 1;
    const newEnergyScore = infinityEnergy ? energy : energy - multiplier;

    if (ranks[level - 1] < totalScore) {
      newLevel = level + 1;
      dispatch({ type: actions.SET_LEVEL, payload: newLevel });
    }

    dispatch({ type: actions.SET_SCORE, payload: newScore });
    dispatch({ type: actions.SET_TOTAL_SCORE, payload: newTotalScore });
    dispatch({ type: actions.SET_CLICKS, payload: newClicksScore });
    dispatch({ type: actions.SET_ENERGY, payload: newEnergyScore });
    
    await DB
      .from('users')
      .update({ score: newScore, total_score: newTotalScore, clicks: newClicksScore, energy: newEnergyScore, level: newLevel })
      .eq('tg_id', tgId);
  };

  useEffect(() => {
    if (page !== 'TAP') {
      // Останавливаем таймер и восстанавливаем множитель при уходе со страницы TAP
      if (extraTapTimerRef.current) {
        clearTimeout(extraTapTimerRef.current);
        extraTapTimerRef.current = null;
        dispatch({ type: actions.SET_MULTIPLIER, payload: originalMultiplierRef.current });
        dispatch({ type: actions.SET_INFINITY_ENERGY, payload: false });
        dispatch({ type: actions.SET_EXTRA_TAP, payload: { active: false, started: false } });
      }
    }

    if (extraTap.active && page === 'TAP' && extraTap.timeLeft > 0) {
      const newMultiplier = multiplier * 5;
      originalMultiplierRef.current = multiplier; // Сохраняем текущий множитель перед изменением

      dispatch({ type: actions.SET_MULTIPLIER, payload: newMultiplier });
      dispatch({ type: actions.SET_INFINITY_ENERGY, payload: true });

      if (extraTapTimerRef.current) {
        clearTimeout(extraTapTimerRef.current);
      }

      extraTapTimerRef.current = setTimeout(() => {
        // Возвращаем исходный множитель и отключаем улучшение
        dispatch({ type: actions.SET_MULTIPLIER, payload: originalMultiplierRef.current });
        dispatch({ type: actions.SET_INFINITY_ENERGY, payload: false });
        dispatch({ type: actions.SET_EXTRA_TAP, payload: { active: false, started: false } });
        extraTapTimerRef.current = null;
      }, extraTap.timeLeft);
    }
  }, [page, extraTap]);

  return (
    <div>
      <div className="coin" onClick={handleCoinClick}>
        <div className="coin-image"></div>
      </div>
    </div>
  );
};

export default Coin;