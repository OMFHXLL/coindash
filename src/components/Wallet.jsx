import React from "react";
import { setGlobalState, useGlobalState } from "../context/state";
import { formatScore, formatConversion } from "../utils/utils";
import Profile1 from "../assets/profile/profile1.jpg";
import Profile2 from "../assets/profile/profile2.jpg";
import Profile3 from "../assets/profile/profile3.jpg";
import Profile4 from "../assets/profile/profile4.jpg";

import { TbArrowBack } from "react-icons/tb";
import Chip from '../assets/image/sim.png';

function Wallet() {
  const [ score, setScore ] = useGlobalState('score');
  const [ showWallet, setShowWallet ] = useGlobalState('show_wallet');

  const handleCloseWallet = () => {
    setGlobalState('show_wallet', false);
  }

  const barStyle = {
    width: `${Math.min(100, (score * .2) / 2000)}%`
  };

  if (!showWallet) {
    return;
  }

  return(<div className="wallet-container">
    <div className="wallet">
      <div className="wallet__title">
        <h2>ВЫВОД</h2>
        <div className="wallet__back" onClick={handleCloseWallet}><TbArrowBack/></div>
      </div>
      <div className="wallet__exchange">Курс койна:&nbsp;&nbsp;<span className="coin-icon"></span> 1 = <span className="conversion-icon"></span> 0,002&#36;</div>
      <div className="wallet__card">
        <div className="wallet__balance">
          <h3>Баланс RoyalCoin:</h3>
          <p><span className="coin-icon"></span> {formatScore(score)}</p>
        </div>
        <div className="wallet__balance">
          <h3>Баланс Доллара:</h3>
          <p><span className="conversion-icon"></span> {formatConversion(score)}</p>
        </div>
        <img src={Chip} alt="" className="wallet__card-chip" />
        <div className="wallet__logo">ROYAL COIN</div>
      </div>
      <div className="wallet__withdraw">
        <p>Минимальная сумма: {parseInt(score * 0.002)} / 2000&#36;</p>
        <div className="wallet__bar-container">
          <div className="wallet__bar" style={barStyle}></div>
        </div>
        <button className="wallet__withdraw-button a-btn" disabled={true}>ВЫВЕСТИ</button>
      </div>
      <div className="wallet__top">
        <p className="wallet__top-title">Последние выводы за сегодня</p>
        <ul className="wallet__top-list">
          <li className="wallet__top-item">
            <p className="wallet__top-name">Денис Матузенко</p>
            <img src={Profile1} />
            <div className="wallet__top-cash">$9071</div>
          </li>
          <li className="wallet__top-item">
            <p className="wallet__top-name">Анна Хомякович</p>
            <img src={Profile2} />
            <div className="wallet__top-cash">$5891</div>
          </li>
          <li className="wallet__top-item">
            <p className="wallet__top-name">Кристиан Каваичи</p>
            <img src={Profile3} />
            <div className="wallet__top-cash">$3000</div>
          </li>
          <li className="wallet__top-item">
            <p className="wallet__top-name">Макс Кудрявый</p>
            <img src={Profile4} />
            <div className="wallet__top-cash">$18879</div>
          </li>
        </ul>
      </div>
    </div>
  </div>)
}

export default Wallet;