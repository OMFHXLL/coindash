import { useContext } from 'react';
import { GameContext, actions } from '../context/GameContext';
import { formatConversion, formatScore, rankIcons } from '../utils/utils';

import CoinIcon from '../assets/image/coin-icon.png';
import ConversionIcon from '../assets/image/conversion-icon.png';
import WalletIcon from '../assets/image/wallet-icon.png';

function WindowHeader({main}) {
  const { state, dispatch } = useContext(GameContext);
  const { score, level } = state;

  const handleOpenWallet = () => {
    dispatch({type: actions.SET_SHOW_WALLET, payload: true})
  }

  const rankIcon = rankIcons[Object.keys(rankIcons)[level - 1]]

  return(
    <div className={main ? "window__header main" : "window__header"}>
      {!main && <div className="window__header-item">
        <img src={CoinIcon} className="window__header-item-icon"/>
        <span>{formatScore(score)}</span>
      </div>}
      <div className="window__header-item">
        <img src={rankIcon} className="window__header-item-icon league"/>
        Лига
      </div>
      <div className="window__header-item">
        <img src={ConversionIcon} className="window__header-item-icon"/>
        {formatConversion(score)}
      </div>
      <div className="window__header-item">
        <button className='a-btn' onClick={handleOpenWallet}>
          <img src={WalletIcon}/>
          Кошелёк
        </button>
      </div>
    </div>
  )
}

export default WindowHeader;