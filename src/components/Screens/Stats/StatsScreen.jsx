import React, { useContext } from 'react';
import { GameContext, actions } from '../../../context/GameContext';
import StatsHeader from './StatsHeader';

const StatsScreen = ({isActive}) => {
  const { state, dispatch } = useContext(GameContext);
  const { score, totalScore, level } = state;

  return(
    <div className={isActive ? 'stats window active' : 'stats window'}>
      <StatsHeader/>
      <div className='stats screen__content'>
        <p><span>Уровень:</span><span>{level}</span></p>
        <p><span>Счет:</span><span>{score}</span></p>
        <p><span>Общий счет:</span><span>{totalScore}</span></p>
      </div>
    </div>
  )
}

export default StatsScreen;