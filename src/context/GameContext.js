import React, { createContext, useReducer, useEffect, useState } from 'react';
import { DB } from '../db';
import { tgUser, initTgApp } from '../hooks/useTelegram';

const userId = tgUser.id;

const initialState = {
  tgId: null,
  clicks: 0,
  score: 0,
  level: 1,
  upgrades: [],
  energy: 500,
};

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
      upgrades: data[0].upgrades,
      energy: data[0].energy,
    };
  }
  const { data: newUser, error: insertError } = await DB
    .from('users')
    .insert(
      { tg_id: userId, lang: tgUser.language, username: tgUser.username }
    )
    .single();

  if (insertError) {
    console.error(insertError);
    return null;
  } else {
    console.log('Новый пользователь создан:', newUser);
    return {
      tgId: data.tg_id,
      clicks: 0,
      score: 0,
      upgrades: [],
      energy: 500,
    };
  }
}

// Определение типов действий
const actions = {
  SET_USER_TG_ID: 'SET_USER_TG_ID',
  SET_CLICKS: 'SET_CLICKS',
  SET_SCORE: 'SET_SCORE',
  SET_LEVEL: 'SET_LEVEL',
  SET_UPGRADES: 'SET_UPGRADES',
  SET_ENERGY: 'SET_ENERGY',
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
    case actions.SET_LEVEL:
      return { ...state, level: action.payload };
    case actions.SET_UPGRADES:
      return { ...state, upgrades: action.payload };
    case actions.SET_ENERGY:
      return { ...state, energy: action.payload };
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
    async function loadUserData() {
      const userData = await fetchUserData();
      if (userData) {
        dispatch({ type: actions.SET_INITIAL_STATE, payload: userData });
      }
      setLoading(false);
    }

    loadUserData();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
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