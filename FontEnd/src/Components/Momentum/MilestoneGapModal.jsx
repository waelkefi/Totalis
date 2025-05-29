
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
import Calendar from './Calender/Calendar';
const MilestoneGapModal = ({ isOpen, onClose, goals }) => {
  const [activeTab, setActiveTab] = useState('Goal\'s actions');
  const tabs = ["Goal's actions", "Weekly planning", "Daily planning", "Review"];
  const progress = 65;
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
        // return <WeeklyPlan
        //   tasks={tasks}
        //   selectedGoal={selectedGoal}
        //   setTasks={setTasks}
        // />;
       return <Calendar
          tasks={tasks}
          selectedGoal={selectedGoal}
          setTasks={setTasks}
       />
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







