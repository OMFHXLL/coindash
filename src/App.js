import './App.css';
const tg = window.Telegram.WebApp;

function App() {
  return (
    <div className="App">
      <p>id: {tg.initDataUnsafe.user.id} </p>
      <p>username: {tg.initDataUnsafe.user.username} </p>
      <p>isBot: {tg.initDataUnsafe.user.is_bot ? "Бот" : "Не бот"} </p>
      <p>isBot: {tg.initDataUnsafe.user.is_premium ? "Премиум" : "Стандартный"} </p>
      <image src={tg.initDataUnsafe.user.photo_url} />
    </div>
  );
}

export default App;
