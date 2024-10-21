import React, { useEffect } from 'react';
import { DB } from '../../../db';
import WindowHeader from '../../WindowHeader';
import ReferalMagnetIcon from '../../../assets/image/referal-magnet-icon.png';
import { formatScore } from '../../../utils/utils';
import { useGlobalState } from '../../../context/state';


const RefScreen = ({isActive}) => {
  const [ tgId ] = useGlobalState('tg_id');
  const [ referrals ] = useGlobalState('referrals');

  const fetchReferral = async () => {
    // const { data, error } = await DB
    //   .from('referrals')
    //   .select('*')
    //   .eq('referrer_id', tgId)

    // if (error) {
    //   console.error(error);
    //   return;
    // }

    // if (data && data.length > 0) {
    //   const referredCount = data.length;
    //   const updatedReferrals = {
    //     ...referrals,
    //     ['joined']: referredCount
    //   }
    //   dispatch({ type: actions.SET_REFERRALS, payload: updatedReferrals });
    //   return;
    // }
  }

  useEffect(() => {
    fetchReferral();
  }, []);


  const copyReferralLink = () => {
    navigator.clipboard.writeText(`https://t.me/coindashbeta_1bot?start=${tgId}`);
  }

  return(
    <div className={isActive ? 'ref window active' : 'ref window'}>
      <WindowHeader/>
      <div className='window__content'>
        <h2 className="window__title">Ваша реферальная система:</h2>
        <div className="ref__block b-btn">
          <div className="ref__block-content">
            <h3 className="ref__block-title">Ссылка для приглашения:</h3>
            <p className="ref__block-link">https://t.me/altcoin_bot?start={tgId}</p>
            <button className="ref__block-button a-btn" onClick={copyReferralLink}>Скопировать</button>
          </div>
          <div className="ref__block-image"><img src={ReferalMagnetIcon} alt="" /></div>
        </div>
        <p className="ref__p"><span>+2.5k монет</span> на счет за приглашенного друга<br/>Бонусы можно забрать <span>в разделе TASK</span></p>
        <div className="ref__stats">
          <div className="ref__stat">
            <h3>Количество<br/><span>приглашенных:</span></h3>
            <p className='ref__stat-number'>{referrals.joined}</p>
          </div>
          <div className="ref__stat">
            <h3>Заработанные<br/><span>бонусы:</span></h3>
            <p className='ref__stat-number'>{formatScore(referrals.reward)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefScreen;