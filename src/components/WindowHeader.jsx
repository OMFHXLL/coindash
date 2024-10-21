import { useContext } from 'react';
import { getGlobalState, setGlobalState, useGlobalState } from '../context/state';
import { formatConversion, formatScore, rankIcons } from '../utils/utils';

import CoinIcon from '../assets/image/coin-icon.png';
import ConversionIcon from '../assets/image/conversion-icon.png';
import WalletIcon from '../assets/image/wallet-icon.png';

const ranks = [
  'Новичок',
  'Искатель',
  'Завоеватель',
  'Стратег',
  'Мастер',
  'Властелин',
  'Хранитель',
  'Император',
  'Легенда'
]

function WindowHeader({main}) {
  const [ score, setScore ] = useGlobalState('score');
  const [ level, setLevel ] = useGlobalState('level');
  const page = getGlobalState('page');

  const handleOpenWallet = () => {
    setGlobalState('show_wallet', true);
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
        {page === 'TAP' ? ranks[level - 1] : 'Лига'}
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