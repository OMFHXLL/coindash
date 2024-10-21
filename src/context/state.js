import { createGlobalState } from "react-hooks-global-state";
import Preloader from '../components/Preloader';
import { tgUser, initTgApp } from '../hooks/useTelegram';
import { io } from 'socket.io-client';
import { useEffect, useState } from "react";

const userId = tgUser.id;

const socket = io('wss://195.14.123.68:4000');

const { setGlobalState, getGlobalState, useGlobalState } = createGlobalState({
  'tg_id': tgUser.id,
  'referrals': [],
  'last_time_online': null,
  'clicks': 0,
  'score': 0,
  'total_score': 0,
  'multiplier': 1,
  'level': 1,
  'energy': 500,
  'max_energy': 500,
  'energy_multiplier': 1,
  'boosts': {
    power_compose: 1,
    energy_limit: 1,
    energy_boost: 1,
    extra_tap: {},
    energy_reset: {}
  },
  'tasks': {
    special: [],
    league: [],
    referral: [],
  },
  'referrals': { joined: 0, reward: 0},
  'is_account_active': false,
  'hide_nav': false,
  'show_wallet': false,
  'infinity_energy': false,
  'extra_tap_time': 0,
  'page': 'TAP',
})



const GameProvider = ({children}) => {
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    initTgApp();
    socket.on('connect', () => {
      socket.emit('connectUser', userId);
    })
    socket.emit('getProgress', tgUser);
    socket.on('progress', (progress) => {
      console.log(progress)
      setGlobalState('referrals', progress.referrals);
      setGlobalState('last_time_online', progress.last_time_online);
      setGlobalState('clicks', progress.clicks);
      setGlobalState('score', progress.score);
      setGlobalState('total_score', progress.total_score);
      setGlobalState('multiplier', progress.multiplier);
      setGlobalState('level', progress.level);
      setGlobalState('energy', progress.energy);
      setGlobalState('max_energy', progress.max_energy);
      setGlobalState('energy_multiplier', progress.energy_multiplier);
      setGlobalState('boosts', progress.boosts);
      setGlobalState('tasks', progress.tasks);
      setGlobalState('is_account_active', true);
      setLoading(false);
    })

    return () => {
      socket.off('connect');
      socket.off('progress');
    };
  }, [socket, userId])

  if (loading) {
    return <Preloader loading={true} />
  }

  return (
    <>
      {children}
    </>
  )
}




export { setGlobalState, getGlobalState, useGlobalState, GameProvider, socket }