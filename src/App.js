import AppContainer from './AppContainer';
import TicTacToe from "./Components/TicTacToe";
import './App.css';

const App = () => {
  return (
    <AppContainer>
      <div>
        <div className="app-container">
          <TicTacToe size={3} />
        </div>
      </div>
    </AppContainer>
  );
}

export default App;
