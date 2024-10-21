import React, { useState, useEffect } from 'react';
import { DB } from '../../../db';
import { socket, useGlobalState } from '../../../context/state';
import { extraTapTime, isExtraTapActive, startExtraTap, stopExtraTap, resetExtraTap } from '../../../utils/extraTap';
import { TbArrowBack } from "react-icons/tb";

const BoostTypes = {
  prog: [
    'power_compose',
    'energy_limit',
    'energy_boost',
  ],
  daily: [
    'extra_tap',
    'energy_reset',
  ],
};

const BoostUpdate = ({ type, title, description, prices, power = 0, icon, close }) => {
  const [ tgId ] = useGlobalState('tg_id');
  const [ boosts, setBoosts ] = useGlobalState('boosts');
  const [ score, setScore ] = useGlobalState('score');
  const [ energy, setEnergy ] = useGlobalState('energy');
  const [ maxEnergy, setMaxEnergy ] = useGlobalState('max_energy');
  const [ multiplier, setMultiplier ] = useGlobalState('multiplier');
  const [ energyMultiplier, setEnergyMultiplier ] = useGlobalState('energy_multiplier');

  const currentDate = new Date();
  const dailyBoost = boosts[type] || { date: null, count: 2 };
  const { date: lastPurchaseTimestamp, count: purchaseCount } = dailyBoost;
  const level = boosts[type] !== undefined ? boosts[type] : 0;
  const price = prices !== undefined ? prices[level - 1 ] : 0; // Изменили на level вместо level-1


  const canUpgrade = () => {
    if (BoostTypes.prog.includes(type)) {
      return score >= price;
    }
    if (type === 'extra_tap') {
      return purchaseCount > 0 && isExtraTapActive === false;
    }
    if (type === 'energy_reset') {
      return purchaseCount > 0 && energy < maxEnergy;
    }
    return false;
  };

  const upgradeBoost = async () => {
    if (BoostTypes.prog.includes(type) && score >= price) {
      // Обработка улучшения постоянных улучшений
      const updatedBoosts = { ...boosts, [type]: level + 1 }; // Изменено на level + 1
      setBoosts(updatedBoosts);
      setScore(score - price);

      socket.emit('updateUserData', { boosts: updatedBoosts, score: score - price });

      switch (type) {
        case 'power_compose':
          setMultiplier(power * (level + 1));
          break;
        case 'energy_limit':
          setMaxEnergy(power * (level + 1));
          break;
        case 'energy_boost':
          setEnergyMultiplier(power * (level + 1));
          break;
        default:
          break;
      }
    } else if (BoostTypes.daily.includes(type) && canUpgrade()) {
      // Обработка эффектов ежедневных улучшений
      const newPurchaseCount = purchaseCount - 1;

      const updatedBoosts = {
        ...boosts,
        [type]: { date: currentDate.toISOString(), count: newPurchaseCount },
      };

      setBoosts(updatedBoosts);
      socket.emit('updateUserData', { boosts: updatedBoosts });

      if (type === 'extra_tap') {
        resetExtraTap();
        // dispatch({ type: actions.SET_EXTRA_TAP, payload: { active: true, timeLeft: 20000, multiplier: multiplier } })
      } else if (type === 'energy_reset') {
        setEnergy(maxEnergy)
      }
    }
  };

  return (
    <div className="update-boost-window" onClick={close} id={type + '-window'}>
      <div className="update-boost-container">
        <div className="back-button"><TbArrowBack/></div>
        <div className="update-boost-icon"><img src={icon} alt={`${type}-icon`} /></div>
        <h3 className="update-boost-title">{title}</h3>
        <p className="update-boost-description" dangerouslySetInnerHTML={{ __html: description }}></p>
        <div className="update-boost-price-container">
          {BoostTypes.prog.includes(type) ? (
            <>
              <span>Уровень {level}</span>
              <p className="x-div">x</p>
              <div className="update-boost-price"><div className="coin-icon"></div>{price}</div>
            </>
          ) : (
            <div className="update-boost-daily">ЕЖЕДНЕВНЫЙ БОНУС</div>
          )}
        </div>
        <button
          className={`update-boost-button a-btn ${!canUpgrade() ? 'disabled' : ''}`}
          onClick={upgradeBoost}
          disabled={!canUpgrade()}
        >
          {BoostTypes.prog.includes(type) ? (
            prices[level - 1] === undefined ? "Максимальный уровень" : "Улучшить"
          ) : (type === 'energy_reset' && energy >= maxEnergy ? 'Максимальная энергия' : "Активировать")}
        </button>
      </div>
    </div>
  );
};

export default BoostUpdate;