import { useEffect, useState } from 'react'
import BoostHeader from './BoostHeader'
import BoostWindow from './BoostWindow';


const BoostScreen = ({isActive}) => {
  const [activeWindow, setActiveWindow] = useState('MAIN');

  useEffect(() => {
    !isActive && setActiveWindow('MAIN');
  },[isActive]);

  const handleActiveWindow = (window) => {
    setActiveWindow(window);
  }

  return(
    <div className={isActive ? 'boost-screen window active' : 'boost-screen window'}>
      <BoostHeader isMainWindow={activeWindow === 'MAIN'} changeWindow={handleActiveWindow}/>
      <div className='window__content'>
        <BoostWindow type={'main'} isActive={activeWindow === 'MAIN'} changeWindow={handleActiveWindow}/>
        <BoostWindow type={'power_compose'} isActive={activeWindow === 'POWER_COMPOSE'}/>
        <BoostWindow type={'energy_compose'} isActive={activeWindow === 'ENERGY_COMPOSE'}/>
        <BoostWindow type={'energy_boost'} isActive={activeWindow === 'ENERGY_BOOST'}/>
      </div>
    </div>
  )
}

export default BoostScreen;