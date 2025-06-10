import React from 'react';
import AppContainer from './AppContainer';
// import Drive from './Components/GoogleDrive';
// import FileManager from './Components/FileManager';
// import AnalogClock from "./Components/AnalogClock"
import MilestoneProgressBar from "./Components/MilestoneProgressBar/Application";
import './App.css';

const App = () => {
  return (
    <AppContainer>
      <div className="app-container">
        <MilestoneProgressBar/>
      </div>
    </AppContainer>
  );
}

export default App;
