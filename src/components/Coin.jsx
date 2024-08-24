import React from 'react';
import { DB } from '../db';
import { withGameContext, actions } from '../context/GameContext';


const Coin = ({ context }) => {

  const handleCoinClick = async (e) => {
    e.preventDefault();
    const { tgId, energy, score, clicks } = context.state;

    if (energy < 1) {
      return console.log('Энергия закончилась');
    }

    const newScore = score + 1;
    const newClicksScore = clicks + 1;
    const newEnergyScore = energy - 1;

    context.dispatch({ type: actions.SET_SCORE, payload: newScore });
    context.dispatch({ type: actions.SET_CLICKS, payload: newClicksScore });
    context.dispatch({ type: actions.SET_ENERGY, payload: newEnergyScore });

    await DB
      .from('users')
      .update({ score: newScore, clicks: newClicksScore, energy: newEnergyScore })
      .eq('tg_id', tgId);
  };

  return (
    <div>
      <span className="score">{context.state.score}</span>
      <button className="coin" onClick={handleCoinClick}>Click me</button>
    </div>
  );
};

export default withGameContext(Coin);