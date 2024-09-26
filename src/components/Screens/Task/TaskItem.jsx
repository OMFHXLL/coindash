import React, { useContext } from "react"
import { formatScore } from "../../../utils/utils";
import { GameContext, actions } from "../../../context/GameContext";

function TaskItem({ type, title, icon, reward, requiredRank }) {
  const { state, dispatch } = useContext(GameContext);
  const { totalScore, rank } = state;

  let barStyle = {};
  switch (type) {
    case 'special':
      return(<div className="item b-btn">
        <div className="item__logo"><img src={icon}/></div>
        <div className="item__text">
          <div className="item__title">{title}</div>
          <div className="item__reward">Награда: <div className="coin-icon"></div> {formatScore(reward)}</div>
        </div>
        <div className="item__button">
          <button className="a-btn" disabled={false}>Перейти<div className="arrow">&raquo;</div></button>
        </div>
      </div>)
    case 'league': 
      barStyle = {
        width: `${Math.min(100, (totalScore * 100) / requiredRank)}%`
      };

      return (<div className="item b-btn">
        <div className="item__logo"><img src={icon}/></div>
        <div className="item__text">
          <div className="item__title">{title}</div>
          <div className="item__reward">Награда: <div className="coin-icon"></div> {formatScore(reward)}</div>
          <div className="item__progress-bar-container"><div className="item__progress-bar" style={barStyle}></div></div>
        </div>
        <div className="item__button">
          <button className="a-btn" disabled={totalScore < requiredRank}>Забрать<div className="arrow">&raquo;</div></button>
        </div>
      </div>)
    case 'referal':
      barStyle = {
        width: `${(0 * 100) / 100}%`
      };

      return (<div className="item b-btn">
        <div className="item__logo"><img src={icon}/></div>
        <div className="item__text">
          <div className="item__title">{title}</div>
          <div className="item__reward">Награда: <div className="coin-icon"></div> {formatScore(reward)}</div>
          <div className="item__progress-bar-container"><div className="item__progress-bar" style={barStyle}></div></div>
        </div>
        <div className="item__button">
          <button className="a-btn" disabled={true}>Забрать<div className="arrow">&raquo;</div></button>
        </div>
      </div>)
  }
}

export default TaskItem;