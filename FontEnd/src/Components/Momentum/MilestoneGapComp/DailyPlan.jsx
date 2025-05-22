import React, { useState } from 'react';
import dayjs from 'dayjs';
import YearSelector from '../../Plan2/Year';
import MonthSelector from '../../Plan2/Month';
import DaysView from '../../Plan2/Days';


export default function DailyPlan({ tasks }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const timeSlots = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00"];

  return (
    <div className="todays-planning">
    <div className="calendar-navigation">
      <div className="year-nav">
        <YearSelector date={selectedDate} onDateChange={setSelectedDate} />
      </div>

      <div className="month-selector">
        {/* {months.map((month, index) => (
          <button
            key={index}
            className={`month-btn ${month === 'Apr' ? 'active' : ''}`}
          >
            {month}
          </button>
        ))} */}
        <MonthSelector date={selectedDate} onDateChange={setSelectedDate} />
      </div>

      <div className="date-grid">
        {/* {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
          <button
            key={date}
            className={`date-btn ${date === 7 ? 'active' : ''}`}
          >
            {date}
          </button>
        ))} */}
        <DaysView date={selectedDate} onDateChange={setSelectedDate} />
      </div>
    </div>

    <div className="time-schedule">
      {timeSlots.map((time, index) => (
        <div key={index} className="time-slot">
          <div className="time-label">{time}</div>
          <div className="time-tasks">
            <div className="time-task">
              <div className="task-checkbox-title">
                <input type="checkbox" id={`time-task-${index}`} className="form-check-input" />
                <label htmlFor={`time-task-${index}`} className="time-task-title">Here goes the action's title</label>
              </div>
              <div className="task-actions">
                <button className="task-menu-btn"><i className="bi bi-three-dots"></i></button>
                <button className="task-lock-btn"><i className="bi bi-lock"></i></button>
              </div>
            </div>

            {(index === 0 || index === 4) && (
              <div className="time-task second-task">
                <div className="task-checkbox-title">
                  <input type="checkbox" id={`time-task-${index}-2`} className="form-check-input" />
                  <label htmlFor={`time-task-${index}-2`} className="time-task-title">Here goes the action's title</label>
                </div>
                <div className="task-actions">
                  <button className="task-menu-btn"><i className="bi bi-three-dots"></i></button>
                  <button className="task-lock-btn"><i className="bi bi-lock"></i></button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
