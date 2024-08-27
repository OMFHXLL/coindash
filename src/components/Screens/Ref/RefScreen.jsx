import React, { } from 'react';
import { DB } from '../../../db';
import RefHeader from './RefHeader';


const RefScreen = ({isActive}) => {
  return(
    <div className={isActive ? 'ref window active' : 'ref window'}>
      <RefHeader/>
    </div>
  )
}

export default RefScreen;