import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const EnergyBar = () => {
  const { state } = useContext(GameContext);
  const barStyle = {
    width: `${(state.energy * 100) / 500}%`,
  };

  return (
    <div className="energy">
      <p className="energy-score">{state.energy} / 500</p>
      <div className="energy-bar">
        <div className="energy-bar-fill" style={barStyle} />
      </div>
    </div>
  );
}

export default EnergyBar;