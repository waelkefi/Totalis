
import React, { useEffect, useState } from 'react';
import './MilestoneGapModal.css';
import dayjs from "dayjs";
import YearSelector from '../Plan2/Year';
import MonthSelector from '../Plan2/Month';
import DaysView from '../Plan2/Days';
import { Rnd } from 'react-rnd';
import TaskForm from './FormsModals/TaskForm';
import GoalsActions from './MilestoneGapComp/GoalsAction';
import WeeklyPlan from './MilestoneGapComp/WeeklyPlan';
import DailyPlan from './MilestoneGapComp/DailyPlan';
const MilestoneGapModal = ({ isOpen, onClose, goals }) => {
  const [activeTab, setActiveTab] = useState('Goal\'s actions');
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const tabs = ["Goal's actions", "Weekly planning", "Daily planning", "Review"];
  const progress = 65;
  console.log('goals', goals);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isModalOpenGoal, setIsModalOpenGoal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const openModalGoal = () => {
    setIsModalOpenGoal(true);
  };

  const closeModalGoal = () => {
    setIsModalOpenGoal(false);
  };
  useEffect(() => {
    if (goals?.length > 0) {
      setSelectedGoal(goals[0]);
    }
  }, [goals]);
  useEffect(() => {
    if (selectedGoal) {
      setTasks(selectedGoal.actions);
    }
  }, [selectedGoal]);
  console.log('selectedGoal0', selectedGoal);
  console.log('tasks', tasks);

  const handleGoalClick = (goal) => {
    setSelectedGoal(goal);
  };


  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t._id !== id));
  };

  /**
   * Mise à jour d'une tâche (drag / resize)
   * On reçoit un objet mis à jour (startHour, endHour, etc.)
   */
  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? { ...task, ...updates } : task))
    );
  };
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedWeekDate, setSelectedWeekDate] = useState(dayjs());
  const startOfWeek = selectedWeekDate.startOf("week"); // par défaut, commence le dimanche
  const endOfWeek = startOfWeek.add(6, "day");

  // Pour naviguer
  const handlePrevWeek = () => {
    setSelectedWeekDate(selectedWeekDate.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setSelectedWeekDate(selectedWeekDate.add(1, "week"));
  };

  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const d = startOfWeek.add(i, 'day');
    return {
      // Nom du jour en français, avec première lettre capitale
      day: d.format('dddd').replace(/^./, c => c.toUpperCase()),
      // Date formatée ; ex "1 avr." ou "01/04"
      date: d.format('D MMM'),
      // On peut aussi renvoyer l’objet dayjs si besoin
      dayjs: d,
    };
  });

  const timeSlots = ["12:00", "13:00", "14:00", "15:00", "16:00"];


  const renderTaskCounts = () => (
    <div className="task-counts">
      <div className="task-count">
        <div className="task-icon to-do">
          <i className="bi bi-hourglass"></i>
        </div>
        <div className="task-details">
          <span className="task-number">3 tasks</span>
          <span className="task-status">To Do</span>
        </div>
      </div>

      <div className="task-count">
        <div className="task-icon done">
          <i className="bi bi-check-circle"></i>
        </div>
        <div className="task-details">
          <span className="task-number">3 tasks</span>
          <span className="task-status">Done</span>
        </div>
      </div>

      <div className="task-count">
        <div className="task-icon protected">
          <i className="bi bi-lock"></i>
        </div>
        <div className="task-details">
          <span className="task-number">3 tasks</span>
          <span className="task-status">Protected</span>
        </div>
      </div>
    </div>
  );

  const renderActionsTab = () => (

    <div className='dashboard-grid'>
      <div className="actions-tab">


        <div className="action-items">
          {goals?.map((goal, index) => (
            <div key={index} className="curstum-card" onClick={() => handleGoalClick(goal)} style={{ cursor: 'pointer' }}>
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
        <button className="new-action-btn" onClick={openModalGoal}>
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

  const renderWeeklyPlanningTab = () => (
    <div className="weekly-planning">
      <div className="week-navigation">
        <button className="week-nav-btn" onClick={handlePrevWeek}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 5.99988C15 5.99988 9.00001 10.4188 9 11.9999C8.99999 13.581 15 17.9999 15 17.9999" stroke="#15133A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> Last week
        </button>
        <h3 className="week-title"> {startOfWeek.format("DD MMM")} - {endOfWeek.format("DD MMM")}</h3>
        <button className="week-nav-btn" onClick={handleNextWeek}>
          Next week <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="#15133A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
      </div>


      <div className="weekly-planning">
        {/* Navigation semaine (Last week, titre, Next week) */}


        {/* Conteneur unique scrollable qui englobe toute la grille */}
        <div className="week-scroll-container">
          <div
            className="weekdays-container"
            style={{
              display: 'grid',
              gridTemplateColumns: '65px repeat(7, 1fr)',
            }}
          >
            {/* gutter heures */}
            <div className="time-gutter weekday-column">
              <div className="weekday-header" style={{ background: "#fff", height: "65px", borderRadius: "0" }}>
                {/* <div className="weekday-name">xx</div>
                                    <div className="weekday-date">xx</div> */}
              </div>

              <div style={{ position: 'relative', height: hours.length * 65 }}>
                {hours.map((hour) => (
                  <div
                    key={hour}
                    style={{
                      backgroundColor: "#E4E6FF",
                      position: 'absolute',
                      top: hour * 65,
                      left: 0,
                      right: 0,
                      borderTop: '2px solid #fff',
                      height: '65px',
                      boxSizing: 'border-box',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#262b5b",
                      fontWeight: "600",
                      // borderRadius: "8px",
                    }}
                  >
                    {hour.toString().padStart(2, '0')}:00
                  </div>
                ))}
              </div>
            </div>

            {/* colonnes jours */}
            {

              weekdays.map((day, index) => {
                const parsedTasks = tasks.map(task => ({
                  ...task,
                  startHour: parseInt(task.startHour.split(":")[0], 10),
                  endHour: parseInt(task.endHour.split(":")[0], 10),
                }));
                console.log('tasks', tasks);
                console.log('parsedTasks', parsedTasks);
                const tasksForDay = parsedTasks.filter(t => dayjs(t.date).isSame(day.dayjs, 'day'));
                return (
                  <div key={index} className="weekday-column">
                    <div className="weekday-header" style={{ height: "65px" }}>
                      <div className="weekday-name">{day.day}</div>
                      <div className="weekday-date">{day.date}</div>
                    </div>

                    {/* même grille de fond */}
                    <div style={{ position: 'relative', height: hours.length * 65 }}>
                      {hours.map((hour) => (
                        <div
                          key={hour}
                          style={{
                            backgroundColor: "#F3F4FF",
                            position: 'absolute',
                            top: hour * 65,
                            left: 0,
                            right: 0,
                            borderTop: '2px solid #fff',
                            height: '65px',
                            boxSizing: 'border-box',
                          }}
                        />
                      ))}

                      {/* tâches glissables */}
                      {tasksForDay?.map((task) => {
                        const top = task.startHour * 65;
                        const height = (task.endHour - task.startHour) * 65;


                        return (
                          <Rnd
                            key={task._id}
                            bounds="parent"
                            default={{ x: 4, y: top, width: 'calc(100% - 8px)', height }}
                            position={{ x: 0, y: top }}
                            size={{ width: 'calc(100% - 8px)', height }}
                            onDragStop={(e, d) => {
                              const newStart = Math.floor(d.y / 65);
                              updateTask(task._id, {
                                startHour: newStart,
                                endHour: newStart + (task.endHour - task.startHour),
                              });
                            }}
                            onResizeStop={(e, dir, ref, delta, pos) => {
                              const newStart = Math.floor(pos.y / 65);
                              const newEnd = newStart + Math.ceil(ref.clientHeight / 65);
                              updateTask(task._id, { startHour: newStart, endHour: newEnd });
                            }}
                          // style={{
                          //   backgroundColor: "#DB4437",
                          //   borderRadius: '4px',
                          //   padding: '4px',
                          //   color: '#fff',
                          // }}

                          >
                            <div className='day-task'>
                              <div className="task-checkbox-title">
                                <input type="checkbox" id="day-task-extra" className="form-check-input" />
                                <label htmlFor="day-task-extra" className="day-task-title">{task.title}</label>
                              </div>
                              {/* <div className="task-actions">
                              <button className="task-menu-btn" onClick={() => handleDeleteTask(task._id)}>x
                              </button>
                              <button className="task-lock-btn"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.86328 11.4907L8.86328 10.1574" stroke="#221E5D" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M3.62007 13.0539C3.77255 14.1673 4.71061 15.0397 5.85215 15.0913C6.8127 15.1347 7.78845 15.1574 8.86298 15.1574C9.9375 15.1574 10.9133 15.1347 11.8738 15.0913C13.0153 15.0397 13.9534 14.1673 14.1059 13.0539C14.2054 12.3271 14.2875 11.5824 14.2875 10.824C14.2875 10.0656 14.2054 9.3209 14.1059 8.5942C13.9534 7.48071 13.0153 6.60835 11.8738 6.55675C10.9133 6.51334 9.9375 6.49069 8.86298 6.49069C7.78846 6.49069 6.8127 6.51334 5.85215 6.55675C4.71061 6.60835 3.77255 7.48071 3.62007 8.5942C3.52055 9.3209 3.43848 10.0656 3.43848 10.824C3.43848 11.5824 3.52055 12.3271 3.62007 13.0539Z" stroke="#221E5D" stroke-width="1.5" />
                                <path d="M5.81152 6.4907L5.81152 4.82404C5.81152 3.16718 7.17763 1.82404 8.86281 1.82404C10.1914 1.82404 11.236 2.82404 11.5751 3.82404" stroke="#221E5D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              </button>
                            </div> */}
                            </div>


                            {/* <br />
                          <button onClick={() => handleDeleteTask(task._id)}>x</button> */}
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

    </div>
  );

  const renderTodaysPlanning = () => (
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

  const renderContent = () => {
    switch (activeTab) {
      case "Goal's actions":
        return <GoalsActions
          goals={goals}
          selectedGoal={selectedGoal}
          onSelectGoal={setSelectedGoal}
          onOpenNew={openModalGoal}
        />;
      case "Weekly planning":
        return <WeeklyPlan
          tasks={tasks}
          selectedGoal={selectedGoal}
        />;
      case "Daily planning":
        return <DailyPlan
          tasks={tasks}
        />;
      case "Review":
        return <div className="wrap-content">WRAP content coming soon</div>;
      default:
        return <GoalsActions
          goals={goals}
          selectedGoal={selectedGoal}
          onSelectGoal={setSelectedGoal}
          onOpenNew={openModalGoal}
        />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-gap" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-content-gap milestone-gap-dialog">
          <div className="modal-header milestone-gap-title">
            <h5>Milestone GAP</h5>
            <button type="button" className="close-btn" onClick={onClose}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33301 15.9998C3.33301 10.0287 3.33301 7.04311 5.188 5.18812C7.04299 3.33313 10.0286 3.33313 15.9997 3.33313C21.9708 3.33313 24.9564 3.33313 26.8114 5.18812C28.6663 7.04311 28.6663 10.0287 28.6663 15.9998C28.6663 21.9709 28.6663 24.9565 26.8114 26.8115C24.9564 28.6665 21.9708 28.6665 15.9997 28.6665C10.0286 28.6665 7.04299 28.6665 5.188 26.8115C3.33301 24.9565 3.33301 21.9709 3.33301 15.9998Z" stroke="#221E5D" stroke-width="1.5" />
                <path d="M21.9163 21.3333C21.9163 21.7475 22.2521 22.0833 22.6663 22.0833C23.0806 22.0833 23.4163 21.7475 23.4163 21.3333H21.9163ZM23.4163 10.6666C23.4163 10.2524 23.0806 9.91663 22.6663 9.91663C22.2521 9.91663 21.9163 10.2524 21.9163 10.6666H23.4163ZM16.2763 12.1275C15.9786 11.8395 15.5038 11.8475 15.2158 12.1452C14.9279 12.443 14.9358 12.9178 15.2336 13.2058L16.2763 12.1275ZM17.3738 14.2322L17.8952 13.6931V13.6931L17.3738 14.2322ZM17.3738 17.7677L17.8952 18.3069V18.3069L17.3738 17.7677ZM15.2336 18.7942C14.9358 19.0821 14.9279 19.5569 15.2158 19.8547C15.5038 20.1524 15.9786 20.1604 16.2763 19.8724L15.2336 18.7942ZM9.33301 15.25C8.91879 15.25 8.58301 15.5857 8.58301 16C8.58301 16.4142 8.91879 16.75 9.33301 16.75L9.33301 15.25ZM22.6663 21.3333H23.4163V10.6666H22.6663H21.9163V21.3333H22.6663ZM15.7549 12.6666L15.2336 13.2058L16.8524 14.7713L17.3738 14.2322L17.8952 13.6931L16.2763 12.1275L15.7549 12.6666ZM17.3738 17.7677L16.8524 17.2286L15.2336 18.7942L15.7549 19.3333L16.2763 19.8724L17.8952 18.3069L17.3738 17.7677ZM17.3738 14.2322L16.8524 14.7713C17.2987 15.2029 17.5776 15.4749 17.7544 15.699C17.9184 15.9068 17.9163 15.9788 17.9163 16H18.6663H19.4163C19.4163 15.5033 19.1989 15.1081 18.932 14.7699C18.6779 14.4478 18.3106 14.0948 17.8952 13.6931L17.3738 14.2322ZM17.3738 17.7677L17.8952 18.3069C18.3106 17.9051 18.6779 17.5521 18.932 17.23C19.1989 16.8918 19.4163 16.4966 19.4163 16H18.6663H17.9163C17.9163 16.0211 17.9184 16.0931 17.7544 16.301C17.5776 16.525 17.2987 16.797 16.8524 17.2286L17.3738 17.7677ZM18.6663 16V15.25L9.33301 15.25L9.33301 16L9.33301 16.75L18.6663 16.75V16Z" fill="#221E5D" />
              </svg>

            </button>
          </div>

          <div className="milestone-gap-content">
            {activeTab !== "Goal's actions" && renderTaskCounts()}

            <div className="progress-section">
              <div className="progress milestone-progress-gap">
                <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div className="progress-label">{progress}% complete</div>
            </div>

            <div className="tab-navigation">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'activeTabNav' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      <TaskForm isOpen={isModalOpenGoal} onClose={closeModalGoal} goal={selectedGoal} />
    </div>
  );
};

export default MilestoneGapModal;







