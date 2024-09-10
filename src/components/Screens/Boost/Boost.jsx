import BoostUpdate from './BoostUpdate';
import { useContext, useEffect, useState } from 'react';
import { DB } from '../../../db';
import { GameContext, actions } from '../../../context/GameContext';





function Boost({ type, title, description, prices, power, icon }) {
  const { state, dispatch } = useContext(GameContext);
  const { boosts, tgId, score } = state;
  const level = boosts[type] !== undefined ? boosts[type] : 0;
  const price = prices[level - 1];

  const [showBoostUpdate, setShowBoostUpdate] = useState(false);

  useEffect(() => {
    switch (type) {
      case 'power_compose':
        dispatch({ type: actions.SET_MULTIPLIER, payload: power * level });
        break;
      case 'energy_limit':
        dispatch({ type: actions.SET_MAX_ENERGY, payload: power * level });
        break;
      case 'energy_boost':
        dispatch({ type: actions.SET_ENERGY_MULTIPLIER, payload: power * level });
        break;
      default:
        break;
    }
  }, [boosts, type, level, power, dispatch]);

  const openBoosUpdate = () => {
    setShowBoostUpdate(true);
    dispatch({ type: actions.SET_HIDE_NAV, payload: true })
  }
  const closeBoosUpdate = (e) => {
    const container = document.querySelector('.update-boost-container');
    if (container && !container.contains(e.target)) {
      setShowBoostUpdate(false);
      dispatch({ type: actions.SET_HIDE_NAV, payload: false })
    }
  }

  return (
    <div className="boost a-btn" id={type}>
      <div className="boost__icon"><img src={icon} alt={`${type}-icon`} /></div>
      <div className="boost__text">
        <div className='boost__title'>{title}</div>
        <div className="boost__info">
          <div className="boost__price"><div className="coin-icon"></div>{price}</div>
          <div className="boost__level">Ур. {level}</div>
        </div>
      </div>
      <div className="boost__button">
        <button onClick={openBoosUpdate}>Улучшить<span className="boost-arrow">&raquo;</span></button>
      </div>
      {showBoostUpdate && <BoostUpdate type={type} title={title} description={description} prices={prices} power={power} icon={icon} close={closeBoosUpdate}/>}
    </div>
  )
}

export default Boost;