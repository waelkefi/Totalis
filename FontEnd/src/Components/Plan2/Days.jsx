
import React from "react";
import { Button } from "react-bootstrap";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import "./styles.css"
dayjs.locale("fr");

const DaysView = ({ date, onDateChange }) => {
    const daysInMonth = dayjs(date).daysInMonth();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
    return (
      <div className="curstum-card d-flex align-items-center justify-content-between" style={{height:"50px"}}>
        {days.map((day) => (
          <button 
            key={day} 
            className={date.date() === day ? "btn custum-day-btn-active" : "btn custum-day-btn"} 
            onClick={() => onDateChange(dayjs(date).date(day))}
            
          >
            {day}
          </button>
        ))}
      </div>
    );
  }

  export default DaysView