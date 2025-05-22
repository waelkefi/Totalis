import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import OutcomeCard from './OutcomeCard';
import MilestoneCard from './MilestoneCard';
import OutcomeForm from './FormsModals/OutcomeForm';
import MileStoneForm from './FormsModals/MileStoneForm';

const Dashboard = ({ vision }) => {
  const [selectedOutcome, setSelectedOutcome] = useState(null);

  useEffect(() => {
    if (vision?.outcomes?.length > 0) {
      setSelectedOutcome(vision.outcomes[0]);
    }
  }, [vision]);

  const handleOutcomeClick = (outcome) => {
    setSelectedOutcome(outcome);
  };

   const [isModalOpenOutcome, setIsModalOpenOutcome] = useState(false);
  
    const openModalOutcome = () => {
      setIsModalOpenOutcome(true);
    };
  
    const closeModalOutcome = () => {
      setIsModalOpenOutcome(false);
    };
    const [isModalOpenMilestone, setIsModalOpenMilestone] = useState(false);
  
    const openModalMilestone = () => {
      setIsModalOpenMilestone(true);
    };
  
    const closeModalMilestone = () => {
      setIsModalOpenMilestone(false);
    };
  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {/* OUTCOMES */}
        <div className="outcomes-column">
          <div className="section-header">
            <h2 className="section-title">Outcomes</h2>
            <button className="prim-btn"  onClick={openModalOutcome}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1V13M1 7H13" stroke="#15133A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="outcomes-list">
            {vision?.outcomes?.map((outcome, index) => (
              <div key={index} onClick={() => handleOutcomeClick(outcome)} style={{ cursor: 'pointer' }}>
                <OutcomeCard
                  title={outcome.title}
                  description={outcome.description}
                  percentage={outcome.percentage || 25}
                  tag={vision?.area}
                />
              </div>
            ))}
          </div>
        </div>

        {/* MILESTONES */}
        <div className="milestones-column">
          <div className="section-header">
            <h2 className="section-title">{selectedOutcome?.title || 'Select an Outcome'}</h2>
            <button className="prim-btn" onClick={openModalMilestone}>
              <svg style={{ marginRight: '5px' }} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1V13M1 7H13" stroke="#15133A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              New Milestone
            </button>
          </div>

          <div className="milestones-list">
            {selectedOutcome?.milestones?.map((milestone, index) => (
              <MilestoneCard
                key={milestone._id}
                id={milestone._id}
                title={milestone.title}
                date={milestone.createdAt}
                goals={milestone.goals}
                percentage={25}
              />
            )) || <p>No milestones found for this outcome.</p>}
          </div>
        </div>
      </div>

      <OutcomeForm isOpen={isModalOpenOutcome} onClose={closeModalOutcome} vision={vision} />
      <MileStoneForm isOpen={isModalOpenMilestone} onClose={closeModalMilestone} outcome={selectedOutcome} />
    </div>
  );
};

export default Dashboard;
