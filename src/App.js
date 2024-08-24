import React, { Component, useState } from 'react';
import './App.css';
import { GameProvider } from './context/GameContext';
import MainScreen from './components/Screens/MainScreen';
import RefScreen from './components/Screens/RefScreen';
import TaskScreen from './components/Screens/TaskScreen';
import BoostScreen from './components/Screens/BoostScreen';
import StatsScreen from './components/Screens/StatsScreen';
import Navigation from './components/Navigation';
import { DB } from './db';




const upgrades = [
  { levelRequired: 1, cost: 10, multiplier: 2, timer: 300 },
  { levelRequired: 2, cost: 20, multiplier: 3, timer: 300 },
  { levelRequired: 3, cost: 30, multiplier: 4, timer: 300 },
  { levelRequired: 4, cost: 40, multiplier: 5, timer: 300 },
  { levelRequired: 5, cost: 50, multiplier: 6, timer: 300 },
  // Добавьте остальные улучшения до 15
];




const App = () => {
  const [activeWindow, setActiveWindow] = useState('MAIN');

  const handleNavigationClick = (window) => {
    setActiveWindow(window);
  };

  return (
    <GameProvider>
      <div className='app'>
        <MainScreen isActive={activeWindow === 'MAIN'}/>
        <RefScreen isActive={activeWindow === 'REF'}/>
        <TaskScreen isActive={activeWindow === 'TASK'}/>
        <BoostScreen isActive={activeWindow === 'BOOST'}/>
        <StatsScreen isActive={activeWindow === 'STATS'}/>
        <Navigation onNavClick={handleNavigationClick}/>
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
