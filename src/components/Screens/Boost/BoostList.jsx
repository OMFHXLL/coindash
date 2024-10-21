import Boost from "./Boost";
import { useGlobalState, setGlobalState } from '../../../context/state';

const BoostsData = {
  'power_compose': { title: 'Мультитап' },
  'energy_compose': { title: 'Лимит энергии' },
  'energy_boost': { title: 'Восстановление энергии' },
}

const BoostsArray = [
  { id: 1, type: 'power_compose', title: '+1 дохода за клик', price: 200, duration: 300, power: 1},
  { id: 2, type: 'power_compose', title: '+2 дохода за клик', price: 500, duration: 300, power: 2},
  { id: 3, type: 'power_compose', title: '+3 дохода за клик', price: 1000, duration: 300, power: 3},
  { id: 4, type: 'power_compose', title: '+4 дохода за клик', price: 2000, duration: 300, power: 4},
  { id: 5, type: 'power_compose', title: '+5 дохода за клик', price: 4000, duration: 300, power: 5},
  { id: 6, type: 'power_compose', title: '+6 дохода за клик', price: 8000, duration: 300, power: 6},
  { id: 7, type: 'power_compose', title: '+7 дохода за клик', price: 16000, duration: 300, power: 7},
  { id: 8, type: 'power_compose', title: '+8 дохода за клик', price: 25000, duration: 300, power: 8},
  { id: 9, type: 'power_compose', title: '+9 дохода за клик', price: 50000, duration: 300, power: 9},
  { id: 10, type: 'power_compose', title: '+10 дохода за клик', price: 100000, duration: 300, power: 10},
  { id: 11, type: 'power_compose', title: '+11 дохода за клик', price: 200000, duration: 300, power: 11},
  { id: 12, type: 'power_compose', title: '+12 дохода за клик', price: 300000, duration: 300, power: 12},
  { id: 13, type: 'power_compose', title: '+13 дохода за клик', price: 400000, duration: 300, power: 13},
  { id: 14, type: 'power_compose', title: '+14 дохода за клик', price: 500000, duration: 300, power: 14},
  { id: 15, type: 'power_compose', title: '+15 дохода за клик', price: 600000, duration: 300, power: 15},

  { id: 16, type: 'energy_compose', title: '+500 макс. энергии', price: 200, duration: 300, power: 500},
  { id: 17, type: 'energy_compose', title: '+1000 макс. энергии', price: 500, duration: 300, power: 1000},
  { id: 18, type: 'energy_compose', title: '+1500 макс. энергии', price: 1000, duration: 300, power: 1500},
  { id: 19, type: 'energy_compose', title: '+2000 макс. энергии', price: 2000, duration: 300, power: 2000},
  { id: 20, type: 'energy_compose', title: '+2500 макс. энергии', price: 4000, duration: 300, power: 2500},
  { id: 21, type: 'energy_compose', title: '+3000 макс. энергии', price: 8000, duration: 300, power: 3000},
  { id: 22, type: 'energy_compose', title: '+3500 макс. энергии', price: 16000, duration: 300, power: 3500},
  { id: 23, type: 'energy_compose', title: '+4000 макс. энергии', price: 25000, duration: 300, power: 4000},
  { id: 24, type: 'energy_compose', title: '+4500 макс. энергии', price: 50000, duration: 300, power: 4500},
  { id: 25, type: 'energy_compose', title: '+5000 макс. энергии', price: 100000, duration: 300, power: 5000},
  { id: 26, type: 'energy_compose', title: '+5500 макс. энергии', price: 200000, duration: 300, power: 5500},
  { id: 27, type: 'energy_compose', title: '+6000 макс. энергии', price: 300000, duration: 300, power: 6000},
  { id: 28, type: 'energy_compose', title: '+7500 макс. энергии', price: 400000, duration: 300, power: 7500},
  { id: 29, type: 'energy_compose', title: '+8000 макс. энергии', price: 500000, duration: 300, power: 8000},
  { id: 30, type: 'energy_compose', title: '+9500 макс. энергии', price: 600000, duration: 300, power: 9500},
  
  { id: 31, type: 'energy_boost', title: '+1 энергии в секунду', price: 2000, duration: 300, power: 1},
  { id: 32, type: 'energy_boost', title: '+2 энергии в секунду', price: 10000, duration: 300, power: 2},
  { id: 33, type: 'energy_boost', title: '+3 энергии в секунду', price: 100000, duration: 300, power: 3},
  { id: 34, type: 'energy_boost', title: '+4 энергии в секунду', price: 250000, duration: 300, power: 4},
]

const BoostList = ({ type }) => {
  const [ boosts ] = useGlobalState('boosts');
  if (boosts) {
    boosts.forEach(item => {
      const boost = BoostsArray.find(boost => boost.id === item.id);
      if (boost) {
        boost.date = item.date;
      }
    });
  }

  const screenTitle = BoostsData[type]?.title || null;  

  return(<div className='boost__screen'>
    <h3>{screenTitle}</h3>
    <div className="boost__list">
      {BoostsArray.filter(boost => boost.type === type)
        .map(boost => (
          <Boost 
          id={boost.id}
          type={boost.type}
          key={boost.title} 
          title={boost.title} 
          price={boost.price} 
          duration={boost.duration} 
          power={boost.power}
          requiredLevel={boost.level}
          lastTimeActive={boost.date}
          />
      ))}
    </div>
  </div>)
}

export default BoostList;