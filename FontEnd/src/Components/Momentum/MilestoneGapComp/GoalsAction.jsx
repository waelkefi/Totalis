import React from 'react';


export default function GoalsActions({ goals, selectedGoal, onSelectGoal, onOpenNew }) {
  return (
    <div className='dashboard-grid'>
      <div className="actions-tab">
        <div className="action-items">
          {goals?.map((goal, index) => (
            <div key={index} className="curstum-card" onClick={() => onSelectGoal(goal)} style={{ cursor: 'pointer' }}>
              <div className="action-content">
                <div className="action-title">{goal.title}</div>
                <div className="action-date">{goal.startDate.slice(0, 10)} - {goal.endDate.slice(0, 10)}</div>
              </div>
              <button className="edit-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="new-actions-list">
        <button className="new-action-btn" onClick={onOpenNew}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1V13M1 7H13" stroke="#15133A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg> New action
        </button>
        {selectedGoal?.actions?.map((item, index) => (
          <div key={item._id} className="curstum-card">
            <div className="new-action-header">
              <div className="checkbox-title">
                <input type="checkbox" id={`checkbox-${index}`} className="form-check-input" />
                <label htmlFor={`checkbox-${index}`} className="action-title">{item.title}</label>
              </div>
              <button className="lock-btn"><i className="bi bi-lock"></i></button>
            </div>
            <div className="new-action-details">
              <p>{item.details}</p>
              <div className="estimated-time">{item.date.slice(0, 10)}  from {item.startHour} to {item.endHour}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
