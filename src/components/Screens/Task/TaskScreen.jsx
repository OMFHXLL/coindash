import React, { useState } from 'react';
import { DB } from '../../../db';
import WindowHeader from '../../WindowHeader';
import WindowNavigation from '../../WindowNavigation';
import TaskItem from './TaskItem';

import SpecialIcon from '../../../assets/image/special-task-icon.png';
import RankIcon from '../../../assets/image/ranks/1.png';
import ReferalIcon from '../../../assets/image/referal-icon.png';

import { IoIosStar } from "react-icons/io";
import { PiMedalFill } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";

const windows = [
  { slug: 'SPECIAL', title: 'Специальные', logo: IoIosStar },
  { slug: 'LEAGUE', title: 'Лиги', logo: PiMedalFill },
  { slug: 'REFERAL', title: 'Рефералы', logo: FaPeopleGroup },
];

const Special = [
  { id: 1, title: 'Подписаться на канал', reward: 55000 },
  { id: 2, title: 'Подписаться на канал', reward: 55000 },
  { id: 3, title: 'Подписаться на канал', reward: 55000 },
  { id: 4, title: 'Подписаться на канал', reward: 55000 },
  { id: 5, title: 'Подписаться на канал', reward: 55000 },
  { id: 6, title: 'Подписаться на канал', reward: 55000 },
]

const League = [
  { rank: 1, title: 'Новичок', reward: 5000, required: 0 },
  { rank: 2, title: 'Ученик', reward: 5000, required: 5000 },
  { rank: 3, title: 'Мастер монет', reward: 5000, required: 10000 },
  { rank: 4, title: 'Эксперт тапов', reward: 5000, required: 25000 },
  { rank: 5, title: 'Виртуоз', reward: 5000, required: 50000 },
  { rank: 6, title: 'Легенда', reward: 5000, required: 100000 },
  { rank: 7, title: 'Грандмастер', reward: 5000, required: 200000 },
]

const Referal = [
  { id: 1, title: 'Пригласить 1 друга', reward: 5000 },
  { id: 2, title: 'Пригласить 3 друзей', reward: 5000 },
  { id: 3, title: 'Пригласить 8 друзей', reward: 5000 },
  { id: 4, title: 'Пригласить 15 друзей', reward: 5000 },
  { id: 5, title: 'Пригласить 30 друзей', reward: 5000 },
]

const TaskScreen = ({isActive}) => {
  const [ activeWindow, setActiveWindow ] = useState('SPECIAL');

  const setWindow = (window) => {
    setActiveWindow(window);
  }

  return(
    <div className={isActive ? 'task window active' : 'task window'}>
      <WindowHeader/>
      <WindowNavigation windows={windows} handle={setWindow} active={activeWindow}/>
      <div className='window-slider window__content'>
        <div className={`window__slider-item ${activeWindow === 'SPECIAL' ? 'active' : ''}`} data-slider='special'>
          {Special.map((task) => (
              <TaskItem key={task.id}
                        type='special'
                        title={task.title} 
                        icon={SpecialIcon} 
                        reward={task.reward}/>
          ))}
        </div>
        <div className={`window__slider-item ${activeWindow === 'LEAGUE' ? 'active' : ''}`} data-slider='league'>
          {League.map((task) => (
            <TaskItem key={task.rank} 
                      type='league' 
                      title={task.title} 
                      icon={RankIcon} 
                      requiredRank={task.required}
                      reward={task.reward}/>
          ))}
        </div>
        <div className={`window__slider-item ${activeWindow === 'REFERAL' ? 'active' : ''}`} data-slider='referal'>
          {Referal.map((task) => (
            <TaskItem key={task.id} 
                      type='referal' 
                      title={task.title} 
                      icon={ReferalIcon} 
                      reward={task.reward}
                      />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaskScreen;