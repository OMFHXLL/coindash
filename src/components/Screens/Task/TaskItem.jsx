import React, { useContext, useEffect, useState } from "react";
import { DB } from "../../../db";
import { formatScore, checkUserSubscription } from "../../../utils/utils";
import { GameContext, actions } from "../../../context/GameContext";

function TaskItem({ type, id, title, icon, reward, required, channel }) {
  const { state, dispatch } = useContext(GameContext);
  const { tgId, tasks, score, totalScore, level, referrals } = state;
  
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if (type === 'special' && tasks[type].includes(id)) {
      setStatus(3);
      return;
    }
    if (tasks[type].includes(id)) {
      setStatus(2);
    }
  }, [tasks]);

  const handleClaimReward = async () => {
    if (tasks[type] && tasks[type].includes(id)) {
      console.log('Active task #' + id);
    } else {
      const newScore = score + reward;
      const updatedTasks = {
        ...tasks,
        [type]: [...(tasks[type] || []), id]
      };
      dispatch({ type: actions.SET_TASKS, payload: updatedTasks });
      dispatch({ type: actions.SET_SCORE, payload: newScore });
      await DB
        .from('users')
        .update({ score: newScore, tasks: updatedTasks })
        .eq('tg_id', tgId);

      if (type === 'referral') {
        dispatch({ type: actions.SET_REFERRALS, payload: {...referrals, ['reward']: referrals.reward + reward} })
        await DB
          .from('users')
          .update({ referrals: {...referrals, ['reward']: referrals.reward + reward} })
          .eq('tg_id', tgId);
      }
    }
  };

  const handleRedirectToChannel = async () => {    
    checkUserSubscription(tgId, channel, (isSubscribed) => {
      setStatus(isSubscribed ? 1 : 2)
      if (status === 1) {
        handleClaimReward();
        setStatus(3);
        return;
      }
    });

    window.Telegram.WebApp.openTelegramLink(`https://t.me/${channel}`);
  };


  let barStyle = {};
  switch (type) {
    case 'special':
      return (
        <div className="item b-btn">
          <div className="item__logo"><img src={icon} alt={title} /></div>
          <div className="item__text">
            <div className="item__title">{title}</div>
            <div className="item__reward">Награда: <div className="coin-icon"></div> {formatScore(reward)}</div>
          </div>
          <div className="item__button">
            <button 
                status={status} 
                className="a-btn" 
                disabled={status === 3} 
                onClick={handleRedirectToChannel}
            >
                {status === 0 
                    ? "Перейти" 
                    : (status === 1 
                        ? "Забрать" 
                        : (status === 2 
                            ? "Забрать" 
                            : "Получено"))}
            </button>
          </div>
        </div>
      );

    case 'league':
      barStyle = {
        width: `${Math.min(100, (totalScore * 100) / required)}%`
      };

      return (
        <div className="item b-btn">
          <div className="item__logo"><img src={icon} alt={title} /></div>
          <div className="item__text">
            <div className="item__title">{title}</div>
            <div className="item__reward">Награда: <div className="coin-icon"></div> {formatScore(reward)}</div>
            <div className="item__progress-bar-container"><div className="item__progress-bar" style={barStyle}></div></div>
          </div>
          <div className="item__button">
            <button className={status === 2 ? 'a-btn done' : 'a-btn'}
                    disabled={totalScore <= required || status === 2}
                    onClick={handleClaimReward}
                    >{status === 2 ? 'Получено' : <>Забрать</>}</button>
          </div>
        </div>
      );

    case 'referral':
      barStyle = {
        width: `${Math.min(100, (referrals.joined * 100) / required)}%`
      };

      return (
        <div className="item b-btn">
          <div className="item__logo"><img src={icon} alt={title} /></div>
          <div className="item__text">
            <div className="item__title">{title}</div>
            <div className="item__reward">Награда: <div className="coin-icon"></div> {formatScore(reward)}</div>
            <div className="item__progress-bar-container"><div className="item__progress-bar" style={barStyle}></div></div>
          </div>
          <div className="item__button">
            <button className={status === 2 ? 'a-btn done' : 'a-btn'}
                    disabled={referrals.joined < required || status === 2}
                    onClick={handleClaimReward}
                    >{status === 2 ? 'Получено' : <>Забрать</>}</button>
          </div>
        </div>
      );
  }
}

export default TaskItem;