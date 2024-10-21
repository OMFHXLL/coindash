import Rank from './Rank';
import { formatScore } from '../../../utils/utils';
import { useGlobalState } from '../../../context/state';


function Score ({ image }) {
  const [ score ] = useGlobalState('score');

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