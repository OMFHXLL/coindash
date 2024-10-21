import React from 'react';
import StatsHeader from './StatsHeader';
import { useGlobalState } from '../../../context/state';

const StatsScreen = ({isActive}) => {
  const [ score ] = useGlobalState('score');
  const [ totalScore ] = useGlobalState('total_score');
  const [ level ] = useGlobalState('level');

  return(
    <div className={isActive ? 'stats window active' : 'stats window'}>
      <StatsHeader/>
      <div className='stats window__content'>
        <p><span>Уровень:</span><span>{level}</span></p>
        <p><span>Счет:</span><span>{score}</span></p>
        <p><span>Общий счет:</span><span>{totalScore}</span></p>
      </div>
    </div>
  )
}

export default StatsScreen;