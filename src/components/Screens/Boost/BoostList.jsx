import Boost from "./Boost";
import { GameContext, actions } from '../../../context/GameContext';
import { useEffect, useContext } from "react";


const BoostsArray = [
  { level: 1, title: 'Уровень 1', price: 200, duration: 300, power: 1},
  { level: 2, title: 'Уровень 2', price: 500, duration: 300, power: 2},
  { level: 3, title: 'Уровень 3', price: 1000, duration: 300, power: 3},
  { level: 4, title: 'Уровень 4', price: 2000, duration: 300, power: 4},
  { level: 5, title: 'Уровень 5', price: 4000, duration: 300, power: 5},
  { level: 6, title: 'Уровень 6', price: 8000, duration: 300, power: 6},
  { level: 7, title: 'Уровень 7', price: 16000, duration: 300, power: 7},
  { level: 8, title: 'Уровень 8', price: 25000, duration: 300, power: 8},
  { level: 9, title: 'Уровень 9', price: 50000, duration: 300, power: 9},
  { level: 10, title: 'Уровень 10', price: 100000, duration: 300, power: 10},
  { level: 11, title: 'Уровень 11', price: 200000, duration: 300, power: 11},
  { level: 12, title: 'Уровень 12', price: 300000, duration: 300, power: 12},
  { level: 13, title: 'Уровень 13', price: 400000, duration: 300, power: 13},
  { level: 14, title: 'Уровень 14', price: 500000, duration: 300, power: 14},
  { level: 15, title: 'Уровень 15', price: 600000, duration: 300, power: 15},
]

const BoostList = () => {
  const { state, dispatch } = useContext(GameContext);
  const boosts = state.boosts;
  boosts.forEach(item => {
    const boost = BoostsArray.find(boost => boost.level === item.id);
    if (boost) {
      boost.date = item.date;
    }
  });
  
  return(<div className='screen__content'>
    <table className="boost-table">
      <tbody>
        {BoostsArray.map(boost => (
          <Boost 
          id={boost.level}
          key={boost.title} 
          title={boost.title} 
          price={boost.price} 
          duration={boost.duration} 
          power={boost.power}
          requiredLevel={boost.level}
          lastTimeActive={boost.date}
          />
        ))}
      </tbody>
    </table>
  </div>)
}

export default BoostList;