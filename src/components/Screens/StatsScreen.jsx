import React, { } from 'react';
import { DB } from '../../db';


const StatsScreen = ({isActive}) => {
  return(
    <div className={isActive ? 'stats window active' : 'stats window'}>
      <h2>Статистика</h2>
    </div>
  )
}

export default StatsScreen;