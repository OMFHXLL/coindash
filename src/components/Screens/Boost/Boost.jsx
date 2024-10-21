import BoostUpdate from './BoostUpdate';
import { useContext, useEffect, useState } from 'react';
import { DB } from '../../../db';
import { useGlobalState, setGlobalState, socket, getGlobalState } from '../../../context/state';

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
  const [ isVisible, setIsVisible ] = useState(false);
  const [showBoostUpdate, setShowBoostUpdate] = useState(false);
  const [ tgId ] = useGlobalState('tg_id');
  const [ boosts, setBoosts ] = useGlobalState('boosts');
  const page = getGlobalState('page');

  const openBoostUpdate = () => {
    const container = document.querySelector('.update-boost-container');
    if (!container) {
      setShowBoostUpdate(true);
      setGlobalState('hide_nav', true);
    }
  }
  const closeBoosUpdate = (e) => {
    const container = document.querySelector('.update-boost-container');
    const backButton = document.querySelector('.update-boost-container .back-button');
    if ((container && !container.contains(e.target)) || (backButton && backButton.contains(e.target))) {
      setShowBoostUpdate(false);
      setGlobalState('hide_nav', false);
    }
  }

  useEffect(() => {
    if (page === 'BOOST') {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [page])

  const currentDate = new Date();
  const dailyBoost = boosts[type] || { date: null, count: 2 };
  const { date: lastPurchaseTimestamp } = dailyBoost;

  useEffect(() => {
    const checkAndUpdateDailyBoosts = async () => {
      if (BoostTypes.daily.includes(type)) {
        const cooldownTime = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах
        const lastPurchaseDate = lastPurchaseTimestamp ? new Date(lastPurchaseTimestamp) : null;
        if (
          lastPurchaseDate === null || 
          (currentDate - lastPurchaseDate) > cooldownTime
        ) {
          console.log(currentDate - lastPurchaseDate)
          const newBoosts = {
            ...boosts,
            [type]: { date: currentDate.toISOString(), count: 2 },
          };
          socket.emit('updateUserData', { boosts: newBoosts });
          setBoosts(newBoosts);
        }
      }
    };

    checkAndUpdateDailyBoosts();

  }, [boosts, type, tgId, currentDate, lastPurchaseTimestamp]);


  if (BoostTypes.daily.includes(type)) {
    return(
      <div className={`boost item b-btn ${isVisible && 'visible'}`} id={type} onClick={openBoostUpdate}>
        <div className="item__logo"><img src={icon} alt={`${type}-icon`} /></div>
        <div className='item__text'>
          <div className='item__title'>{title}</div>
          <div className="daily-boosts-counter">
            <div className={boosts[type].count > 0 ? "counter-item active" : "counter-item"}></div>
            <div className={boosts[type].count > 1 ? "counter-item active" : "counter-item"}></div>
          </div>
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
        setGlobalState('multiplier', power * level);
        break;
      case 'energy_limit':
        setGlobalState('max_energy', power * level);
        break;
      case 'energy_boost':
        setGlobalState('energy_multiplier', power * level);
        break;
      default:
        break;
    }
  }, [boosts, type, level, power]);

  return (
    <div className={`boost b-btn ${isVisible && 'visible'}`} id={type}>
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