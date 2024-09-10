import CoinImage from '../../../assets/image/coin.png'
import Score from './Score';
import Coin from './Coin';
import EnergyBar from './EnergyBar';

const MainScreen = ({isActive}) => {
  return(
    <div className={isActive ? 'main window active' : 'main window'}>
      <Score image={CoinImage}/>
      <Coin/>
      <EnergyBar />
    </div>
  )
}

export default MainScreen;