import React, { useEffect, useState } from 'react';
import './App.css';
import { GameProvider } from './context/state';
import Preloader from './components/Preloader';
import Background from './components/Background';
import MainScreen from './components/Screens/Main/MainScreen';
import RefScreen from './components/Screens/Ref/RefScreen';
import TaskScreen from './components/Screens/Task/TaskScreen';
import BoostScreen from './components/Screens/Boost/BoostScreen';
import StatsScreen from './components/Screens/Stats/StatsScreen';
import Navigation from './components/Navigation/Navigation';
import Wallet from './components/Wallet';
import { startExtraTap, stopExtraTap } from './utils/extraTap';




function App() {
  const [activeWindow, setActiveWindow] = useState('TAP');

  const handleNavigationClick = (window) => {
    setActiveWindow(window);
  };

  useEffect(() => {
    if (activeWindow === 'TAP') {
      startExtraTap();
    } else {
      stopExtraTap();
    }
  }, [activeWindow])

  return (
    <GameProvider>
      <div className='app'>
        <Preloader/>
        <Background/>
        <MainScreen isActive={activeWindow === 'TAP'}/>
        <RefScreen isActive={activeWindow === 'REF'}/>
        <TaskScreen isActive={activeWindow === 'TASK'}/>
        <BoostScreen isActive={activeWindow === 'BOOST'}/>
        {/* <StatsScreen isActive={activeWindow === 'STATS'}/> */}
        <Navigation activeWindow={activeWindow} onNavClick={handleNavigationClick}/>
        <Wallet/>
      </div>
    </GameProvider>
  );
}

export default App;


// function App() {
//   const userId = '1257045227';

//   const [score, setScore] = useState(0);
//   const [multiplier, setMultiplier] = useState(1);
//   const [currentLevel, setCurrentLevel] = useState(1);
//   const [activeUpgrades, setActiveUpgrades] = useState([]);

//   const handleCoinClick = () => {
//     setScore(prevScore => prevScore + multiplier);
//   };

//   const handlePurchaseUpgrade = (upgrade) => {
//     if (score >= upgrade.cost) {
//       setScore(prevScore => prevScore - upgrade.cost);
//       setMultiplier(prevMultiplier => prevMultiplier * upgrade.multiplier);
//       const timer = useTimer(upgrade.timer);
//       setActiveUpgrades([...activeUpgrades, { ...upgrade, timer }]);
//     }
//   };


//   return (
//     <div>
//       <MainScreen userId={userId} />
//     </div>
//   );
// }

// export default App;
