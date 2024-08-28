import BoostList from './BoostList';
import BoostMainButton from './Main/BoostMainButton';


const BoostWindow = ({ isActive, type, changeWindow }) => {
  if (type === 'main') {
    return (
      <div className={isActive ? 'window__screen active' : 'window__screen'}>
        <BoostMainButton
          icon={'PiCoinsFill'}
          title={'Мультитап'} 
          type={'POWER_COMPOSE'}
          handleActiveWindow={changeWindow} />
        <BoostMainButton 
          icon={'AiFillThunderbolt'}
          title={'Лимит энергии'} 
          type={'ENERGY_COMPOSE'} 
          handleActiveWindow={changeWindow} />
        <BoostMainButton 
          icon={'PiTimerFill'}
          title={'Восстановление энергии'} 
          type={'ENERGY_BOOST'} 
          handleActiveWindow={changeWindow} />
      </div>
    )
  }

  return (
    <div className={isActive ? 'window__screen active' : 'window__screen'}>
      <BoostList type={type} />
    </div>
  )
}

export default BoostWindow;