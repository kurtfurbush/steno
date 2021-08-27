import WeatherList from './components/WeatherList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Welcome to FunWeather!
        </h1>
      </header>
      <main className="weather-content">
        <WeatherList />
      </main>
    </div>
  );
}

export default App;
