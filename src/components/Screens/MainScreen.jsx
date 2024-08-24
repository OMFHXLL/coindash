import React, { useEffect, useState } from 'react';
import { DB } from '../../db';

import Coin from '../Coin';
import EnergyBar from '../EnergyBar';

const MainScreen = ({isActive}) => {
  return(
    <div className={isActive ? 'main window active' : 'main window'}>
      <Coin />
      <EnergyBar />
    </div>
  )
}

export default MainScreen;