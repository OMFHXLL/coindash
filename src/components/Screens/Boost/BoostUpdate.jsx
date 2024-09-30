import React, { useContext, useState, useEffect } from 'react';
import { DB } from '../../../db';
import { GameContext, actions } from '../../../context/GameContext';

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
  const { state, dispatch } = useContext(GameContext);
  const { boosts, tgId, score, energy, maxEnergy, multiplier, extraTap } = state;

  const currentDate = new Date();
  const dailyBoost = boosts[type] || { date: null, count: 2 };
  const { date: lastPurchaseTimestamp, count: purchaseCount } = dailyBoost;
  const level = boosts[type] !== undefined ? boosts[type] : 0;
  const price = prices !== undefined ? prices[level - 1 ] : 0; // Изменили на level вместо level-1

  useEffect(() => {
    const checkAndUpdateDailyBoosts = async () => {
      if (BoostTypes.daily.includes(type)) {
        const cooldownTime = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах
        const lastPurchaseDate = lastPurchaseTimestamp ? new Date(lastPurchaseTimestamp) : null;

        if (
          lastPurchaseDate === null || 
          (currentDate - lastPurchaseDate) > cooldownTime
        ) {
          const newBoosts = {
            ...boosts,
            [type]: { date: currentDate.toISOString(), count: 2 },
          };

          await DB.from('users')
            .update({ boosts: newBoosts })
            .eq('tg_id', tgId);

          dispatch({
            type: actions.SET_BOOSTS,
            payload: newBoosts,
          });
        }
      }
    };

    checkAndUpdateDailyBoosts();

  }, [boosts, type, tgId, currentDate, dispatch, lastPurchaseTimestamp]);

  const canUpgrade = () => {
    if (BoostTypes.prog.includes(type)) {
      return score >= price;
    }
    if (type === 'extra_tap') {
      return purchaseCount > 0 && extraTap.active === false;
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
      dispatch({ type: actions.SET_BOOSTS, payload: updatedBoosts });
      dispatch({ type: actions.SET_SCORE, payload: score - price });

      const { updateError } = await DB
        .from('users')
        .update({ boosts: updatedBoosts, score: score - price })
        .eq('tg_id', tgId);

      if (updateError) {
        console.error('Error updating boosts:', updateError);
        return;
      }

      switch (type) {
        case 'power_compose':
          dispatch({ type: actions.SET_MULTIPLIER, payload: power * (level + 1) });
          break;
        case 'energy_limit':
          dispatch({ type: actions.SET_MAX_ENERGY, payload: power * (level + 1) });
          break;
        case 'energy_boost':
          dispatch({ type: actions.SET_ENERGY_MULTIPLIER, payload: power * (level + 1) });
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
      dispatch({ type: actions.SET_BOOSTS, payload: updatedBoosts });

      const { updateError } = await DB
        .from('users')
        .update({ boosts: updatedBoosts })
        .eq('tg_id', tgId);

      if (updateError) {
        console.error('Error updating boosts:', updateError);
        return;
      }

      if (type === 'extra_tap') {
        dispatch({ type: actions.SET_EXTRA_TAP, payload: { active: true, timeLeft: 20000, multiplier: multiplier } })
      } else if (type === 'energy_reset') {
        dispatch({ type: actions.SET_ENERGY, payload: maxEnergy });
      }
    }
  };

  return (
    <div className="update-boost-window" onClick={close} id={type + '-window'}>
      <div className="update-boost-container">
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