import React from 'react';
import './MilestoneProgressBar.css';

const MilestoneProgressBar = ({ milestones = [], value = 0 }) => {
  if (!milestones || milestones.length === 0) return null;

  const sortedMilestones = [...milestones].sort((a, b) => a - b);
  const maxMilestone = sortedMilestones[sortedMilestones.length - 1];
  const progressPercent = Math.min((value / maxMilestone) * 100, 100);

  return (
    <div className="progress-container">
      <div className="header">
        <span className="value">₹{value}</span>
        <span className="title">Total Transaction</span>
      </div>

      <div className="bar-wrapper">
        <div className="bar-background">
          <div className="bar-foreground" style={{ width: `${progressPercent}%` }} />
          {sortedMilestones.map((m, index) => {
            const leftPercent = (index / (sortedMilestones.length - 1)) * 100;
            return (
              <div
                key={m}
                className={`milestone-dot ${value >= m ? 'filled' : ''}`}
                style={{ left: `${leftPercent}%` }}
              />
            );
          })}
        </div>

        <div className="milestone-labels">
          <span>₹0</span>
          {sortedMilestones.map((m, index) => (
            <span key={m} style={{ left: `${(index / (sortedMilestones.length - 1)) * 100}%` }}>
              ₹{m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MilestoneProgressBar;
