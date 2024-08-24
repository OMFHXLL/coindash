import React, { } from 'react';
import { DB } from '../../db';


const TaskScreen = ({isActive}) => {
  return(
    <div className={isActive ? 'task window active' : 'task window'}>
      <h2>Задания</h2>
    </div>
  )
}

export default TaskScreen;