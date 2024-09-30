import { GameContext, actions } from '../../../context/GameContext';
import Rank from './Rank';
import { formatScore } from '../../../utils/utils';
import { useContext } from 'react';


function Score ({ image }) {
  const { state } = useContext(GameContext);
  const { score } = state;

  return(
    <div className="score">
      <div className='score__content'>
        <div className="score__icon">
          <div className='coin-icon'></div>
        </div>
        <div className="score__conversion">&#36; {(score * 0.002).toFixed(3)}</div>
        {formatScore(score)}
      </div>
      <Rank/>
    </div>
  )
}

export default Score;