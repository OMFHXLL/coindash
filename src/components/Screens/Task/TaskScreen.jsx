import React, { } from 'react';
import { DB } from '../../../db';
import TaskHeader from './TaskHeader';


const TaskScreen = ({isActive}) => {
  return(
    <div className={isActive ? 'task window active' : 'task window'}>
      <TaskHeader/>
    </div>
  )
}

export default TaskScreen;