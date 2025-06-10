import React from 'react';
import MilestoneProgressBar from './MilestoneProgressBar';

function MilestoneApp() {
  const milestones = [1000, 1270, 1450, 1500];
  const currentValue = 1200;

  return (
    <div className="App">
      <MilestoneProgressBar milestones={milestones} value={currentValue} />
    </div>
  );
}

export default MilestoneApp;
