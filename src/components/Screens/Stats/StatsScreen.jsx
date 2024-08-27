import React, { } from 'react';
import StatsHeader from './StatsHeader';

const StatsScreen = ({isActive}) => {
  return(
    <div className={isActive ? 'stats window active' : 'stats window'}>
      <StatsHeader/>
    </div>
  )
}

export default StatsScreen;