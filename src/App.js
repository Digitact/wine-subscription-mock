import logo from './logo.svg';
import './App.css';
import SubscriptionFlow from './SubscriptionFlow';

function App() {
  return (
    <div className="subscription-module">
      <header className="App-header">
        
      <SubscriptionFlow step={3} />
      </header>

    </div>
  );
}

export default App;
