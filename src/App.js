import './App.css';
const tg = window.Telegram.WebApp;

function App() {
  return (
    <div className="App">
      <p> {tg.initDataUnsafe?.user} </p>
    </div>
  );
}

export default App;
