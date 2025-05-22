import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { Rnd } from 'react-rnd';

export default function WeeklyPlan({ tasks, setTasks }) {
  const [weekDate, setWeekDate] = useState(dayjs());
  const startOfWeek = weekDate.startOf('week');
  const endOfWeek = startOfWeek.add(6, 'day');
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const prevWeek = () => setWeekDate(weekDate.subtract(1, 'week'));
  const nextWeek = () => setWeekDate(weekDate.add(1, 'week'));

  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const d = startOfWeek.add(i, 'day');
    return { name: d.format('dddd'), date: d.format('D MMM'), dayjs: d };
  });

  const parsedTasks = useMemo(() => {
    return tasks.map(t => ({
      ...t,
      startHour: parseInt(t.startHour?.split(':')[0] || 0, 10),
      endHour: parseInt(t.endHour?.split(':')[0] || 1, 10),
      day: dayjs(t.date).startOf('day').format('YYYY-MM-DD'),
    }));
  }, [tasks]);

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter((t) => t._id !== id));
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task._id === id) {
          const updatedDate = updates.date ? dayjs(updates.date).toISOString() : task.date;
          return {
            ...task,
            ...updates,
            date: updatedDate,
            startHour: updates.startHour?.toString().padStart(2, '0') + ':00',
            endHour: updates.endHour?.toString().padStart(2, '0') + ':00',
          };
        }
        return task;
      })
    );
  };

  return (
    <div className="weekly-planning">
      <div className="week-navigation">
        <button className="week-nav-btn" onClick={prevWeek}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 6C15 6 9 10.42 9 12C9 13.58 15 18 15 18" stroke="#15133A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Last week
        </button>
        <h3 className="week-title">{startOfWeek.format("DD MMM")} - {endOfWeek.format("DD MMM")}</h3>
        <button className="week-nav-btn" onClick={nextWeek}>
          Next week
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 6C9 6 15 10.42 15 12C15 13.58 9 18 9 18" stroke="#15133A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <div className="week-scroll-container">
        <div className="weekdays-container" style={{ display: 'grid', gridTemplateColumns: '65px repeat(7, 1fr)' }}>
          <div className="time-gutter weekday-column">
            <div className="weekday-header" style={{ background: '#fff', height: '65px' }} />
            <div style={{ position: 'relative', height: hours.length * 65 }}>
              {hours.map(hour => (
                <div
                  key={hour}
                  style={{
                    backgroundColor: '#E4E6FF',
                    position: 'absolute',
                    top: hour * 65,
                    left: 0,
                    right: 0,
                    borderTop: '2px solid #fff',
                    height: '65px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#262b5b',
                    fontWeight: '600',
                    fontSize: '12px',
                  }}
                >
                  {hour.toString().padStart(2, '0')}:00
                </div>
              ))}
            </div>
          </div>

          {weekdays.map((day, index) => {
            const dayKey = day.dayjs.format('YYYY-MM-DD');
            const tasksForDay = parsedTasks.filter(t => t.day === dayKey);

            return (
              <div key={index} className="weekday-column">
                <div className="weekday-header" style={{ height: '65px' }}>
                  <div className="weekday-name">{day.name}</div>
                  <div className="weekday-date">{day.date}</div>
                </div>

                <div style={{ position: 'relative', height: hours.length * 65 }}>
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      style={{
                        backgroundColor: '#F3F4FF',
                        position: 'absolute',
                        top: hour * 65,
                        left: 0,
                        right: 0,
                        borderTop: '2px solid #fff',
                        height: '65px',
                      }}
                    />
                  ))}

                  {tasksForDay.map((task) => {
                    const top = task.startHour * 65;
                    const height = (task.endHour - task.startHour) * 65;

                    return (
                      <Rnd
                        key={task._id}
                        bounds="parent"
                        default={{ x: 0, y: top, width: '100%', height }}
                        position={{ x: 0, y: top }}
                        size={{ width: '100%', height }}
                        onDragStop={(e, d) => {
                          const newStart = Math.floor(d.y / 65);
                          updateTask(task._id, {
                            startHour: newStart,
                            endHour: newStart + (task.endHour - task.startHour),
                            date: day.dayjs.toISOString(),
                          });
                        }}
                        onResizeStop={(e, dir, ref, delta, pos) => {
                          const newStart = Math.floor(pos.y / 65);
                          const newEnd = newStart + Math.ceil(ref.clientHeight / 65);
                          updateTask(task._id, {
                            startHour: newStart,
                            endHour: newEnd,
                            date: day.dayjs.toISOString(),
                          });
                        }}
                      >
                        <div className="day-task">
                          <div className="task-checkbox-title">
                            <input type="checkbox" id={`task-${task._id}`} className="form-check-input" />
                            <label htmlFor={`task-${task._id}`} className="day-task-title">{task.title}</label>
                          </div>
                          <div className="task-actions">
                            <button className="task-lock-btn"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.86328 11.4907L8.86328 10.1574" stroke="#221E5D" stroke-width="1.5" stroke-linecap="round" />
                              <path d="M3.62007 13.0539C3.77255 14.1673 4.71061 15.0397 5.85215 15.0913C6.8127 15.1347 7.78845 15.1574 8.86298 15.1574C9.9375 15.1574 10.9133 15.1347 11.8738 15.0913C13.0153 15.0397 13.9534 14.1673 14.1059 13.0539C14.2054 12.3271 14.2875 11.5824 14.2875 10.824C14.2875 10.0656 14.2054 9.3209 14.1059 8.5942C13.9534 7.48071 13.0153 6.60835 11.8738 6.55675C10.9133 6.51334 9.9375 6.49069 8.86298 6.49069C7.78846 6.49069 6.8127 6.51334 5.85215 6.55675C4.71061 6.60835 3.77255 7.48071 3.62007 8.5942C3.52055 9.3209 3.43848 10.0656 3.43848 10.824C3.43848 11.5824 3.52055 12.3271 3.62007 13.0539Z" stroke="#221E5D" stroke-width="1.5" />
                              <path d="M5.81152 6.4907L5.81152 4.82404C5.81152 3.16718 7.17763 1.82404 8.86281 1.82404C10.1914 1.82404 11.236 2.82404 11.5751 3.82404" stroke="#221E5D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            </button>
                            <button className="task-menu-btn" onClick={() => handleDeleteTask(task._id)}>x
                            </button>
                          </div>
                        </div>
                      </Rnd>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
