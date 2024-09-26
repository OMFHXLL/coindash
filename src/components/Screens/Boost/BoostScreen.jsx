import PowerComposeIcon from '../../../assets/image/power-compose-icon.png';
import EnergyLimitIcon from '../../../assets/image/energy-limit-icon.png';
import EnergyBoostIcon from '../../../assets/image/energy-boost-icon.png';
import ExtraTapIcon from '../../../assets/image/extra-tap-icon.png';
import EnergyResetIcon from '../../../assets/image/energy-reset-icon.png';
import Boost from './Boost';
import ScreenScore from '../../WindowHeader';
import ScreenTitle from '../../ScreenTitle';

const boostsArray = {
  power_compose: { title: 'Мультитап', description: '<span>Увеличение</span> дохода в один клик<br><span>+1</span> единица за каждый уровень', price: [200, 500, 1000, 2000, 4000, 8000, 16000, 25000, 50000, 100000, 200000, 300000, 400000, 500000, 600000], power: 1},
  energy_limit: { title: 'Лимит энергии', description: '<span>Увеличение</span> макс. количества энергии<br><span>+500</span> единиц за каждый уровень', price: [200, 500, 1000, 2000, 4000, 8000, 16000, 25000, 50000, 100000, 200000, 300000, 400000, 500000, 600000], power: 500},
  energy_boost: { title: 'Обновление энергии', description: '<span>Увеличение</span> скорости восполнения энергии<br><span>+1</span> единица в секунду за каждый уровень', price: [2000, 10000, 100000, 250000], power: 1},
  extra_tap: { title: 'Экстратап', description: '<span>Умножение</span> количества монет за тап'},
  energy_reset: { title: 'Full энергия', description: 'Полное восстановление <span>энергии</span>' }
}


const BoostScreen = ({isActive}) => {



  return(
    <div className={isActive ? 'boost-screen window active' : 'boost-screen window'}>
      <ScreenScore/>
      <div className='window__content'>
        <div className='boost__list'>
          <div className="window__title">Ежедневные бусты</div>
          <div className="daily-boosts">
            <Boost type={'extra_tap'}
                  title={boostsArray.extra_tap.title}
                  description={boostsArray.extra_tap.description} 
                  icon={ExtraTapIcon} />
            <Boost type={'energy_reset'}
                  title={boostsArray.energy_reset.title}
                  description={boostsArray.energy_reset.description} 
                  icon={EnergyResetIcon} />
          </div>
        </div>
        <div className='boost__list'>
          <div className="window__title">Постоянные бусты</div>
          <Boost type={'power_compose'}
                 title={boostsArray.power_compose.title}
                 description={boostsArray.power_compose.description} 
                 prices={boostsArray.power_compose.price} 
                 power={boostsArray.power_compose.power} 
                 icon={PowerComposeIcon} />
          <Boost type={'energy_limit'}
                 title={boostsArray.energy_limit.title}
                 description={boostsArray.energy_limit.description} 
                 prices={boostsArray.energy_limit.price} 
                 power={boostsArray.energy_limit.power} 
                 icon={EnergyLimitIcon} />
          <Boost type={'energy_boost'}
                 title={boostsArray.energy_boost.title}
                 description={boostsArray.energy_boost.description} 
                 prices={boostsArray.energy_boost.price} 
                 power={boostsArray.energy_boost.power} 
                 icon={EnergyBoostIcon} />
        </div>
      </div>
    </div>
  )
}

export default BoostScreen;