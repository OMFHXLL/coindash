import BoostUpdate from './BoostUpdate';
import { useContext, useEffect, useState } from 'react';
import { DB } from '../../../db';
import { GameContext, actions } from '../../../context/GameContext';


const BoostTypes = {
  prog: [
    'power_compose',
    'energy_limit',
    'energy_boost'
  ],
  daily: [
    'extra_tap',
    'energy_reset'
  ]
}


function Boost({ type, title, description, prices = [], power, icon }) {
  const { state, dispatch } = useContext(GameContext);
  const { boosts, tgId, score } = state;
  const [showBoostUpdate, setShowBoostUpdate] = useState(false);

  const openBoostUpdate = () => {
    const container = document.querySelector('.update-boost-container');
    if (!container) {
      setShowBoostUpdate(true);
      dispatch({ type: actions.SET_HIDE_NAV, payload: true })
    }
  }
  const closeBoosUpdate = (e) => {
    const container = document.querySelector('.update-boost-container');
    if (container && !container.contains(e.target)) {
      setShowBoostUpdate(false);
      dispatch({ type: actions.SET_HIDE_NAV, payload: false })
    }
  }

  if (BoostTypes.daily.includes(type)) {
    return(
      <div className='boost item b-btn' id={type} onClick={openBoostUpdate}>
        <div className="item__logo"><img src={icon} alt={`${type}-icon`} /></div>
        <div className='item__text'>
          <div className='item__title'>{title}</div>
          <div className="daily-boost-counter"></div>
          <div className="arrow">&raquo;</div>
          {/* <div className="boost__description" dangerouslySetInnerHTML={{ __html: description }}></div> */}
        </div>
        {showBoostUpdate && <BoostUpdate type={type} title={title} description={description} icon={icon} close={closeBoosUpdate}/>}
      </div>
    )
  }

  const level = boosts[type] !== undefined ? boosts[type] : 0;
  const price = prices !== undefined ? prices[level - 1] : 0;

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

  return (
    <div className="boost b-btn" id={type}>
      <div className="item__logo"><img src={icon} alt={`${type}-icon`} /></div>
      <div className="item__text">
        <div className='item__title'>{title}</div>
        <div className="boost__info">
          {prices[level - 1] && <div className="boost__price"><div className="coin-icon"></div>{price}</div>}
          <div className="boost__level">Ур. {level}</div>
        </div>
      </div>
      <div className="item__button">
        <button className='a-btn' onClick={openBoostUpdate} disabled={!prices[level - 1]}>{prices[level - 1] ? <>Улучшить{/*<span className="arrow">&raquo;</span>*/}</> : <div className="boost__max">МАКС</div>}</button>
      </div>
      {showBoostUpdate && <BoostUpdate type={type} title={title} description={description} prices={prices} power={power} icon={icon} close={closeBoosUpdate}/>}
    </div>
  )
}

export default Boost;