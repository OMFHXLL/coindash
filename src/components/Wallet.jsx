import React, { useContext } from "react";
import { actions, GameContext } from "../context/GameContext";
import { formatScore, formatConversion } from "../utils/utils";

import { TbArrowBack } from "react-icons/tb";
import Chip from '../assets/image/sim.png';

function Wallet() {
  const { state, dispatch } = useContext(GameContext);
  const { score, showWallet } = state;

  const handleCloseWallet = () => {
    dispatch({type: actions.SET_SHOW_WALLET, payload: false})
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
        <div className="wallet__back" onClick={handleCloseWallet}>Вернуться назад<TbArrowBack/></div>
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
    </div>
  </div>)
}

export default Wallet;