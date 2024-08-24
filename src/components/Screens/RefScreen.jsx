import React, { } from 'react';
import { DB } from '../../db';


const RefScreen = ({isActive}) => {
  return(
    <div className={isActive ? 'ref window active' : 'ref window'}>
      <h2>Рефералы</h2>
    </div>
  )
}

export default RefScreen;