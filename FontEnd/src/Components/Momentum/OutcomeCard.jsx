
import React from 'react';
import './OutcomeCard.css';
import ProgressCircle from './ProgressCircle';

const OutcomeCard = ({ title, description, percentage, tag }) => {
  return (
    <div className="outcome-card">
      <div className="outcome-content">
      
        <h3 className="outcome-title">{title}</h3>
        <p className="outcome-description">{description}</p>
        {/* <p className="outcome-date">Expected completion: {date}</p> */}
      </div>
      <div className="outcome-progress">
      <div className="outcome-tag">{tag}</div>
        <ProgressCircle size={40}  percentage={percentage} />
      </div>
    </div>
  );
};

export default OutcomeCard;
