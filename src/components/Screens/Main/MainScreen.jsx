import CoinImage from '../../../assets/image/coin.png'
import Score from './Score';
import Coin from './Coin';
import EnergyBar from './EnergyBar';
import WindowHeader from '../../WindowHeader';

const MainScreen = ({isActive}) => {
  return(
    <div className={isActive ? 'main window active' : 'main window'}>
      <WindowHeader main/>
      <Score image={CoinImage}/>
      <Coin/>
      <EnergyBar />
    </div>
  )
}

export default MainScreen;