import React from 'react';
import './styles.css';

const getPersonalityClass = (category) => {
  const classes = {
    Analysts: {
      bg: 'personnality-custum-dbg1',
    },
    Diplomats: {
      bg: 'personnality-custum-dbg2',
    },
    Explorers: {
      bg: 'personnality-custum-dbg3',
    },
    Sentinels: {
      bg: 'personnality-custum-dbg4',
    },
  };

  return classes[category] || {
    bg: 'personnality-custum-bg-default',
  };
};

const PersonalityTrait = ({ label, leftText, rightText, percentage, category }) => {
  const { bg } = getPersonalityClass(category);

  return (
    <div className="trait-container">
      <div className="trait-labels">
        <p>{label}</p>
      </div>

      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="progress-bar-text">
          <p>{leftText}</p>
        </div>

        <div className={`progress-bar-personality ${bg}`}>
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          >
            <div className="progress-marker"></div>
          </div>
        </div>

        <div className="progress-bar-text">
          <p>{rightText}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalityTrait;
