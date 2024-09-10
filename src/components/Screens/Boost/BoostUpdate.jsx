import React, { useContext } from 'react';
import { DB } from '../../../db';
import { GameContext, actions } from '../../../context/GameContext';


const BoostUpdate = ({ type, title, description, prices, power, icon, close }) => {
  const { state, dispatch } = useContext(GameContext);
  const { boosts, tgId, score } = state;
  const level = boosts[type] !== undefined ? boosts[type] : 1;
  const price = prices[level - 1];

  const upgradeBoost = async () => {
    if (score >= price) {
      const updatedBoosts = { ...boosts, [type]: level + 1 };
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
    } else {
      console.log("Недостаточно очков для улучшения!");
    }
  }

  return(
    <div className="update-boost-window" onClick={close}>
      <div className="update-boost-container">
        <div className="update-boost-icon"><img src={icon} alt={`${type}-icon`} /></div>
        <h3 className="update-boost-title">{title}</h3>
        <p className="update-boost-description" dangerouslySetInnerHTML={{ __html: description }}></p>
        <p className="update-boost-avialable">Доступно {type !== 'multitap' ? <span>навсегда</span> : <><span>2 раза</span> в день</>}</p>
        <div className="update-boost-price-container">{ type !== 'multitap' ? <><span>Уровень {level}</span><p className="x-div">x</p><div className="update-boost-price"><div className="coin-icon"></div>{price}</div></> : <div className="update-boost-daily">ЕЖЕДНЕВНЫЙ БОНУС</div>}</div>
        <button className="update-boost-button a-btn" onClick={upgradeBoost} disabled={score < price || prices[level - 1] === undefined}>{prices[level - 1] === undefined ? "Максимальный уровень" : "Улучшить"}</button>
      </div>
    </div>
  )
}

export default BoostUpdate;