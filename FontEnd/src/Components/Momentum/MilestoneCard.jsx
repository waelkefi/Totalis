
import React, { useState } from 'react';
import './MilestoneCard.css';
import ProgressCircle from './ProgressCircle';
import MilestoneGapModal from './MilestoneGapModal';
import GoalForm from './FormsModals/GoalForm';
const MilestoneCard = ({ title, date, goals, percentage, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isModalOpenGoal, setIsModalOpenGoal] = useState(false);

  const openModalGoal = () => {
    setIsModalOpenGoal(true);
  };

  const closeModalGoal = () => {
    setIsModalOpenGoal(false);
  };

  return (
    <div className="milestone-card curstum-card">
      <div className="milestone-header">
        <div>
          <h3 className="milestone-title">{title}</h3>
          <p className="milestone-date">created: {date.slice(0, 10)}</p>
        </div>
        <div className="milestone-progress">
          <ProgressCircle size={60} percentage={percentage} />
        </div>
      </div>

      <div className="milestone-goals">
        {goals?.map((goal, index) => (
          <div key={index} className="milestone-goal">
            <span className="goal-title">{goal.title}</span>
            <span className="goal-date">{goal.date}</span>
          </div>
        ))}
      </div>

      <div className="milestone-actions">
        <button className="new-goal-btn" onClick={openModalGoal}>
          <svg style={{ marginRight: '5px' }} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1V13M1 7H13" stroke="#15133A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg> New Goal
        </button>
        <button className="milestone-gap-btn" onClick={openModal}>Milestone GAP</button>
      </div>

      <MilestoneGapModal isOpen={isModalOpen} onClose={closeModal} goals={goals} />

      <GoalForm isOpen={isModalOpenGoal} onClose={closeModalGoal} milestone={id} />
    </div>
  );
};

export default MilestoneCard;
