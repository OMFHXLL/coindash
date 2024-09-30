import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { formatScore } from '../utils/utils';

import CoinIcon from '../assets/image/coin-icon.png';
import LevelIcon from '../assets/image/ranks/1.png';
import ConversionIcon from '../assets/image/conversion-icon.png';
import WalletIcon from '../assets/image/wallet-icon.png';

function WindowHeader({main}) {
  const { state } = useContext(GameContext);
  const { score } = state;

  return(
    <div className={main ? "window__header main" : "window__header"}>
      {!main && <div className="window__header-item">
        <img src={CoinIcon} className="window__header-item-icon"/>
        <span>{formatScore(score)}</span>
      </div>}
      <div className="window__header-item">
        <img src={LevelIcon} className="window__header-item-icon league"/>
        Лига
      </div>
      <div className="window__header-item">
        <img src={ConversionIcon} className="window__header-item-icon"/>
        {formatScore(Math.round((score * 0.002) * 100) / 100)}
      </div>
      <div className="window__header-item">
        <button className='a-btn'>
          <img src={WalletIcon}/>
          Кошелёк
        </button>
      </div>
    </div>
  )
}

export default WindowHeader;