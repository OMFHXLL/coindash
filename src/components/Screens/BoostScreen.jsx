import React, { } from 'react';
import { DB } from '../../db';


const BoostScreen = ({isActive}) => {
  return(
    <div className={isActive ? 'boost window active' : 'boost window'}>
      <h2>Улучшения</h2>
    </div>
  )
}

export default BoostScreen;