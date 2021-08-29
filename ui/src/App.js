import JobList from './components/JobList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Welcome to Steno Scheduling!
        </h1>
      </header>
      <main className="main-content">
        <JobList />
      </main>
    </div>
  );
}

export default App;
