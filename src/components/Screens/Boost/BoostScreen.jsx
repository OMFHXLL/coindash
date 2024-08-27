import BoostList from './BoostList'
import BoostHeader from './BoostHeader'

const BoostScreen = ({isActive}) => {
  return(
    <div className={isActive ? 'boost-screen window active' : 'boost-screen window'}>
      <BoostHeader/>
      <BoostList/>
    </div>
  )
}

export default BoostScreen;