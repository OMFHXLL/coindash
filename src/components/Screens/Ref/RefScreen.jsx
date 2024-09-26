import React, { } from 'react';
import { DB } from '../../../db';
import WindowHeader from '../../WindowHeader';
import ReferalMagnetIcon from '../../../assets/image/referal-magnet-icon.png';


const RefScreen = ({isActive}) => {
  return(
    <div className={isActive ? 'ref window active' : 'ref window'}>
      <WindowHeader/>
      <div className='window__content'>
        <h2 className="window__title">Ваша реферальная система:</h2>
        <div className="ref__block b-btn">
          <div className="ref__block-content">
            <h3 className="ref__block-title">Ссылка для приглашения:</h3>
            <p className="ref__block-link">https://t.me/altcoin_bot?start=r_5281684484<br/>+2.5k за первое приглашение</p>
            <button className="ref__block-button a-btn">Скопировать</button>
          </div>
          <div className="ref__block-image"><img src={ReferalMagnetIcon} alt="" /></div>
        </div>
        <p className="ref__p"><span>+2.5k монет</span> на счет за приглашенного друга по ссылке<br/>Бонусы можно забрать <span>в разделе TASK</span></p>
        <div className="ref__stats">
          <div className="ref__stat">
            <h3>Количество<br/><span>приглашенных:</span></h3>
            <p className='ref__stat-number'>0</p>
          </div>
          <div className="ref__stat">
            <h3>Заработанные<br/><span>бонусы:</span></h3>
            <p className='ref__stat-number'>0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefScreen;