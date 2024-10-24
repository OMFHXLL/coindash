import React, { createContext, useReducer, useEffect, useState } from 'react';
import Preloader from '../components/Preloader';
import { io } from 'socket.io-client';
import { DB, getUser } from '../db';
import { tgUser, initTgApp } from '../hooks/useTelegram';

const socket = io('http://192.168.0.16:3000');

const userId = tgUser.id;

const initialState = {
  tgId: null,
  clicks: 0,
  score: 0,
  totalScore: 0,
  level: 1,
  multiplier: 1,
  energy: 500,
  energyMultiplier: 1,
  maxEnergy: 500,
  lastTimeOnline: null,
  boosts: {},
  tasks: {},
  referrals: {joined: 0, reward: 0},
  isAccountActive: false,
  hideNav: false,
  showWallet: false,
  infinityEnergy: false,
  extraTap: {
    active: false,
    timeLeft: 0,
    multiplier: 1,
  },
  page: 'TAP'
};

const boosts = {
  power_compose: 1,
  energy_limit: 1,
  energy_boost: 1,
  extra_tap: {},
  energy_reset: {}
};
const tasks = {
  special: [],
  league: [],
  referal: [],
};
const referrals = {
  joined: 0,
  reward: 0
}

async function fetchUserData() {
  const { data, error } = await DB
    .from('users')
    .select('*')
    .eq('tg_id', userId);

  if (error) {
    console.error(error);
    return null;
  }

  if (data && data.length > 0) {
    return {
      tgId: data[0].tg_id,
      clicks: data[0].clicks,
      score: data[0].score,
      totalScore: data[0].total_score,
      energy: data[0].energy,
      maxEnergy: data[0].max_energy,
      level: data[0].level,
      boosts: data[0].boosts,
      tasks: data[0].tasks,
      referrals: data[0].referrals,
      lastTimeOnline: data[0].last_time_online,
      isAccountActive: true,
    };
  }
  const { data: newUser, error: insertError } = await DB
    .from('users')
    .insert(
      { tg_id: userId, lang: tgUser.language, username: tgUser.username, boosts: boosts, tasks: tasks, referrals: referrals }
    )
    .single();

  if (insertError) {
    console.error(insertError);
    return null;
  } 
  return(
    {
      tgId: userId,
      clicks: 0,
      score: 0,
      totalScore: 0,
      level: 1,
      multiplier: 1,
      energy: 500,
      energyMultiplier: 1,
      maxEnergy: 500,
      lastTimeOnline: null,
      boosts: boosts,
      tasks: tasks,
      referrals: referrals,
      isAccountActive: true,
    }
  )
}

// Определение типов действий
const actions = {
  SET_USER_TG_ID: 'SET_USER_TG_ID',
  SET_CLICKS: 'SET_CLICKS',
  SET_SCORE: 'SET_SCORE',
  SET_TOTAL_SCORE: 'SET_TOTAL_SCORE',
  SET_LEVEL: 'SET_LEVEL',
  SET_MULTIPLIER: 'SET_MULTIPLIER',
  SET_ENERGY: 'SET_ENERGY',
  SET_ENERGY_MULTIPLIER: 'SET_ENERGY_MULTIPLIER',
  SET_MAX_ENERGY: 'SET_MAX_ENERGY',
  SET_BOOSTS: 'SET_BOOSTS',
  SET_TASKS: 'SET_TASKS',
  SET_REFERRALS: 'SET_REFERRALS',
  SET_LAST_TIME_ONLINE: 'SET_LAST_TIME_ONLINE',
  SET_IS_ACCOUNT_ACTIVE: 'SET_IS_ACCOUNT_ACTIVE',
  SET_HIDE_NAV: 'SET_HIDE_NAV',
  SET_SHOW_WALLET: 'SET_SHOW_WALLET',
  SET_INFINITY_ENERGY: 'SET_INFINITY_ENERGY',
  SET_EXTRA_TAP: 'SET_EXTRA_TAP',
  SET_PAGE: 'SET_PAGE',
  SET_INITIAL_STATE: 'SET_INITIAL_STATE',
};

// Создание редьюсера как функции
const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_USER_TG_ID:
      return { ...state, tgId: action.payload };
    case actions.SET_CLICKS:
      return { ...state, clicks: action.payload };
    case actions.SET_SCORE:
      return { ...state, score: action.payload };
    case actions.SET_TOTAL_SCORE:
      return { ...state, totalScore: action.payload };
    case actions.SET_LEVEL:
      return { ...state, level: action.payload };
    case actions.SET_MULTIPLIER:
      return { ...state, multiplier: action.payload };
    case actions.SET_ENERGY:
      return { ...state, energy: action.payload };
    case actions.SET_ENERGY_MULTIPLIER:
      return { ...state, energyMultiplier: action.payload };
    case actions.SET_MAX_ENERGY:
      return { ...state, maxEnergy: action.payload };
    case actions.SET_BOOSTS:
      return { ...state, boosts: action.payload };
    case actions.SET_TASKS:
      return { ...state, tasks: action.payload };
    case actions.SET_REFERRALS:
      return { ...state, referrals: action.payload };
    case actions.SET_LAST_TIME_ONLINE:
      return { ...state, lastTimeOnline: action.payload };
    case actions.SET_IS_ACCOUNT_ACTIVE:
      return { ...state, isAccountActive: action.payload };
    case actions.SET_HIDE_NAV:
      return { ...state, hideNav: action.payload };
    case actions.SET_SHOW_WALLET:
      return { ...state, showWallet: action.payload };
    case actions.SET_INFINITY_ENERGY:
      return { ...state, infinityEnergy: action.payload };
    case actions.SET_EXTRA_TAP:
      return { ...state, extraTap: action.payload };
    case actions.SET_PAGE:
      return { ...state, page: action.payload };
    case actions.SET_INITIAL_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Создание контекста
const GameContext = createContext(initialState);

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initTgApp();
    socket.on('connect', () => {
      socket.emit('connectUser')
    })
    async function loadUserData() {
      const userData = await fetchUserData();
      if (userData) {
        dispatch({ type: actions.SET_INITIAL_STATE, payload: userData });
        console.log(userData);
      }
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }

    loadUserData();
  }, []);

  if (loading) {
    return <Preloader loading={true}/>;
  }

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

// HOC для упрощения использования контекста
const withGameContext = (Component) => (props) => (
  <GameContext.Consumer>
    {(context) => <Component {...props} context={context} />}
  </GameContext.Consumer>
);

export { GameProvider, GameContext, withGameContext, actions };