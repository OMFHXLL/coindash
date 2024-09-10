import PowerComposeIcon from '../../../assets/image/power-compose-icon.png';
import EnergyLimitIcon from '../../../assets/image/energy-limit-icon.png';
import EnergyBoostIcon from '../../../assets/image/energy-boost-icon.png';
import Boost from './Boost';
import ScreenScore from '../../ScreenScore';
import ScreenTitle from '../../ScreenTitle';

const boostsArray = {
  power_compose: { title: 'Мультитап', description: 'Увеличивает доход на +1', price: [200, 500, 1000, 2000, 4000, 8000, 16000, 25000, 50000, 100000, 200000, 300000, 400000, 500000, 600000], power: 1},
  energy_limit: { title: 'Лимит энергии', description: 'Увеличивает лимит энергии на +500', price: [200, 500, 1000, 2000, 4000, 8000, 16000, 25000, 50000, 100000, 200000, 300000, 400000, 500000, 600000], power: 500},
  energy_boost: { title: 'Восстановление энергии', description: 'Увеличивает скорость восстановления энергии на +1', price: [2000, 10000, 100000, 250000], power: 1},
}


const BoostScreen = ({isActive}) => {



  return(
    <div className={isActive ? 'boost-screen window active' : 'boost-screen window'}>
      <ScreenScore/>
      <div className='window__content'>
        <ScreenTitle title="Улучшения"/>
        <Boost type={'power_compose'} title={boostsArray.power_compose.title} description={boostsArray.power_compose.description} prices={boostsArray.power_compose.price} power={boostsArray.power_compose.power} icon={PowerComposeIcon} />
        <Boost type={'energy_limit'} title={boostsArray.energy_limit.title} description={boostsArray.energy_limit.description} prices={boostsArray.energy_limit.price} power={boostsArray.energy_limit.power} icon={EnergyLimitIcon} />
        <Boost type={'energy_boost'} title={boostsArray.energy_boost.title} description={boostsArray.energy_boost.description} prices={boostsArray.energy_boost.price} power={boostsArray.energy_boost.power} icon={EnergyBoostIcon} />
      </div>
    </div>
  )
}

export default BoostScreen;