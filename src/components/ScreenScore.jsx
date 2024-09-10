import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { formatScore } from '../utils/utils';

function ScreenScore() {
  const { state } = useContext(GameContext);
  const { score } = state;

  return(
    <div className="screen-score-container">
      <div className="screen-score-title">Баланс</div>
      <div className="screen-score">
        <div className="coin-icon"></div>
        {formatScore(score)}
      </div>
    </div>
  )
}

export default ScreenScore;