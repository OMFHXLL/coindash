import React, { Component, useState } from 'react';
import './App.css';
import Coin from './components/Coin';
import MainScreen from './components/Screens/MainScreen';
import { DB } from './db';

const tg = window.Telegram.WebApp;
const userId = tg.initDataUnsafe.user.id;
const tgUserName = tg.initDataUnsafe.user.username;
const tgFirstName = tg.initDataUnsafe.user.fisrtName;
const tgLastName = tg.initDataUnsafe.user.lastName;
const tgIsBot = tg.initDataUnsafe.user.is_bot;
const tgIsPremium = tg.initDataUnsafe.user.is_premium;
const tgPhotoUrl = tg.initDataUnsafe.user.photo_url;
const tgLanguage = tg.initDataUnsafe.user.language_code;

const upgrades = [
  { levelRequired: 1, cost: 10, multiplier: 2, timer: 300 },
  { levelRequired: 2, cost: 20, multiplier: 3, timer: 300 },
  { levelRequired: 3, cost: 30, multiplier: 4, timer: 300 },
  { levelRequired: 4, cost: 40, multiplier: 5, timer: 300 },
  { levelRequired: 5, cost: 50, multiplier: 6, timer: 300 },
  // Добавьте остальные улучшения до 15
];



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      multiplier: 1,
      upgrades: upgrades,
      level: 1,
      currentTime: 0
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  async fetchUserData() {
    const { data, error } = await DB
      .from('users')
      .select('*')
      .eq('tg_id', userId)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      console.log(data);
      this.setState({ 
        score: data.score,
        // income: data.income 
      });
    } else {
      // Запись не найдена, создаем новую запись
      const { data: newUser, error: insertError } = await DB
        .from('users')
        .insert([
          { tg_id: userId, lang: tgLanguage, username: tgUserName }
        ])
        .single();

      if (insertError) {
        console.error(insertError);
      } else {
        console.log('New user created:', newUser);
        this.setState({ 
          score: newUser.score + 10,
          // income: newUser.income 
        });
      }
    }
  }

  handleCoinClick = async () => {
    const newScore = this.state.score + 1;
    this.setState(state => ({
      score: state.score + state.multiplier
    }));

    await DB
      .from('users')
      .update({ score: newScore })
      .eq('tg_id', userId);
  };



  render() {
    return (
      <div className='app'>
        <Coin score={this.state.score} coinClickHandler={this.handleCoinClick} />
      </div>
    );
  }
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
