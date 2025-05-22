import React from 'react';
import './Navigation.css';

const Navigation = ({ visions, activeVision, onChangeVision }) => {
  // Remove duplicate areas from visions and create an array of tabs
  const tabs = [...new Set(visions.map(v => v.area))];

  return (
    <div className="navigation">
      <ul className="nav-tabs">
        {tabs.map(tab => (
          <li 
            key={tab}
            className={`nav-tab ${activeVision === tab ? 'active' : ''}`}  // Dynamically add 'active' class
            onClick={() => onChangeVision(tab)}  // When clicked, change active vision
          >
            {tab}
          </li>
        ))}
        <li className="nav-tab add-tab">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1V13M1 7H13" stroke="#15133A" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
