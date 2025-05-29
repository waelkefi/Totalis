
import React, { useState, useRef } from 'react';
import './CalendarEvent.css';

const CalendarEvent = ({ event, onUpdateDuration, onUpdatePosition, onDelete, setDraggedEvent }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [initialY, setInitialY] = useState(0);
  const [initialDuration, setInitialDuration] = useState(0);
  const eventRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('resize-handle')) {
      setIsResizing(true);
      setInitialY(e.clientY);
      setInitialDuration(event.duration);
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDragStart = (e) => {
    setDraggedEvent(event);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const deltaY = e.clientY - initialY;
      const cellHeight = 60; // Height of each hour cell
      const durationChange = deltaY / cellHeight;
      const newDuration = Math.max(0.5, Math.round((initialDuration + durationChange) * 2) / 2);
      onUpdateDuration(event.id, newDuration);
    }
  };

  const handleMouseUp = () => {
    if (isResizing) {
      setIsResizing(false);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(event.id);
  };

  const eventHeight = event.duration * 60; // 60px per hour

  // Add event listeners for resize functionality
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, initialY, initialDuration]);

  return (
    <div
      ref={eventRef}
      className={`calendar-event ${isDragging ? 'dragging' : ''} ${isResizing ? 'resizing' : ''}`}
      style={{
        backgroundColor: event.color,
        height: `${eventHeight}px`
      }}
      draggable={!isResizing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseDown={handleMouseDown}
    >
      <div className="event-content">
        <span className="event-name">{event.name}</span>
        <button className="delete-btn" onClick={handleDelete}>×</button>
      </div>
      <div className="event-time">
        {event.startHour}:00 - {(event.startHour + event.duration).toFixed(event.duration % 1 === 0 ? 0 : 1)}:00
      </div>
      <div className="resize-handle" onMouseDown={handleMouseDown}></div>
    </div>
  );
};

export default CalendarEvent;
