import './App.css';
const tg = window.Telegram.WebApp;

function App() {
  return (
    <div className="App">
      <h1>Telegram Web App Integration</h1>
      <button onClick={() => tg.close()}>Close Telegram</button>
    </div>
  );
}

export default App;
