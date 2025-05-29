
import React from 'react';
import './ActionsSidebar.css';

const ActionsSidebar = ({ actions, setDraggedAction }) => {
  const handleDragStart = (action) => {
    setDraggedAction(action);
  };

  return (
    <div className="actions-sidebar">
      <h3 className="sidebar-title">Actions disponibles</h3>
      <div className="actions-list">
        {actions.map(action => (
          <div
            key={action.id}
            className="action-item"
            draggable
            onDragStart={() => handleDragStart(action)}
            style={{ backgroundColor: action.color }}
          >
            <span className="action-name">{action.name}</span>
            <span className="action-duration">{action.duration}h</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionsSidebar;
