import React, { useState, useRef } from 'react';
import { DB } from '../../../db';
import { rankIcons } from '../../../utils/utils';
import WindowHeader from '../../WindowHeader';
import WindowNavigation from '../../WindowNavigation';
import TaskItem from './TaskItem';

import SpecialIcon from '../../../assets/image/special-task-icon.png';
import ReferralIcon from '../../../assets/image/referal-icon.png';

import { IoIosStar } from "react-icons/io";
import { PiMedalFill } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";

const windows = [
  { slug: 'SPECIAL', title: 'Специальные', logo: IoIosStar },
  { slug: 'LEAGUE', title: 'Лиги', logo: PiMedalFill },
  { slug: 'REFERRAL', title: 'Рефералы', logo: FaPeopleGroup },
];

const Special = [
  { id: 1, title: 'Подписаться на канал', reward: 55000, channel: 'testchatcoindash' },
  { id: 2, title: 'Подписаться на канал', reward: 55000, channel: 'testchatcoindash' },
  { id: 3, title: 'Подписаться на канал', reward: 55000, channel: 'testchatcoindash' },
  { id: 4, title: 'Подписаться на канал', reward: 55000, channel: 'testchatcoindash' },
  { id: 5, title: 'Подписаться на канал', reward: 55000, channel: 'testchatcoindash' },
  { id: 6, title: 'Подписаться на канал', reward: 55000, channel: 'testchatcoindash' },
]

const League = [
  { rank: 1, title: 'Новичок', reward: 1000, required: 5000 },
  { rank: 2, title: 'Искатель', reward: 5000, required: 50000 },
  { rank: 3, title: 'Завоеватель', reward: 25000, required: 250000 },
  { rank: 4, title: 'Стратег', reward: 50000, required: 500000 },
  { rank: 5, title: 'Мастер', reward: 100000, required: 1000000 },
  { rank: 6, title: 'Властелин', reward: 250000, required: 2500000 },
  { rank: 7, title: 'Хранитель', reward: 500000, required: 5000000 },
  { rank: 8, title: 'Император', reward: 1000000, required: 10000000 },
  { rank: 9, title: 'Легенда', reward: 5000000, required: 50000000 },
]

const Referral = [
  { id: 1, title: 'Пригласить 1 друга', reward: 5000, required: 1 },
  { id: 2, title: 'Пригласить 3 друзей', reward: 5000, required: 3 },
  { id: 3, title: 'Пригласить 8 друзей', reward: 5000, required: 8 },
  { id: 4, title: 'Пригласить 15 друзей', reward: 5000, required: 15 },
  { id: 5, title: 'Пригласить 30 друзей', reward: 5000, required: 30 },
]

const TaskScreen = ({isActive}) => {
  const [ activeWindow, setActiveWindow ] = useState('SPECIAL');
  const sliderRef = useRef(null);

  const setWindow = (window) => {
    setActiveWindow(window);
    if (sliderRef.current) {
      sliderRef.current.scrollTop = 0; // Устанавливаем scrollTop на 0 для прокрутки вверх
    }
  }

  return(
    <div className={isActive ? 'task window active' : 'task window'}>
      <WindowHeader/>
      <WindowNavigation windows={windows} handle={setWindow} active={activeWindow}/>
      <div className='window-slider window__content' ref={sliderRef}>
        <div className={`window__slider-item ${activeWindow === 'SPECIAL' ? 'active' : ''}`} data-slider='special'>
          {Special.map((task) => (
              <TaskItem key={task.id}
                        id={task.id}
                        type='special'
                        title={task.title} 
                        icon={SpecialIcon}
                        channel={task.channel}
                        reward={task.reward}/>
          ))}
        </div>
        <div className={`window__slider-item ${activeWindow === 'LEAGUE' ? 'active' : ''}`} data-slider='league'>
          {League.map((task) => (
            <TaskItem key={task.rank}
                      id={task.rank}
                      type='league' 
                      title={task.title} 
                      icon={rankIcons[Object.keys(rankIcons)[task.rank - 1]]} 
                      required={task.required}
                      reward={task.reward}/>
          ))}
        </div>
        <div className={`window__slider-item ${activeWindow === 'REFERRAL' ? 'active' : ''}`} data-slider='referral'>
          {Referral.map((task) => (
            <TaskItem key={task.id} 
                      id={task.id}
                      type='referral' 
                      title={task.title} 
                      icon={ReferralIcon} 
                      required={task.required}
                      reward={task.reward}
                      />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaskScreen;