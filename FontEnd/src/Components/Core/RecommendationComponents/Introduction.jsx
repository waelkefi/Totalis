
import React from 'react';

const Introduction = ({ personalityData }) => {
  return (
    <div className="fade-in">
      <h1 className="page-header">MBTI Personality Profile</h1>
      
      <div className="card-custom">
        <div className="card-header-custom">
          <h2>Your Personality Type</h2>
        </div>
        <div className="card-body-custom">
          <div className="personality-display">
            <div className="personality-type">{personalityData.type}</div>
            <div className="personality-nickname">"{personalityData.nickname}"</div>
          </div>
          <p className="personality-description">{personalityData.description.summary}</p>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card-custom h-100">
            <div className="card-section-header">
              <i className="fas fa-rocket"></i>
              <h3>Motivations</h3>
            </div>
            <div className="card-body-custom motivations-card">
              {personalityData.description.motivations.map((motivation, index) => (
                <div key={index} className="strength-item">{motivation}</div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card-custom h-100">
            <div className="card-section-header">
              <i className="fas fa-exclamation-triangle"></i>
              <h3>Challenges</h3>
            </div>
            <div className="card-body-custom challenges-card">
              {personalityData.description.challenges.map((challenge, index) => (
                <div key={index} className="weakness-item">{challenge}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* <div className="card-custom mt-4">
        <div className="card-header-custom">
          <h3><i className="fas fa-info-circle me-2"></i>Metadata</h3>
        </div>
        <div className="card-body-custom">
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3">
                <i className="fas fa-calendar-alt me-3 text-primary fs-4"></i>
                <div>
                  <p className="text-muted mb-0">Last Updated</p>
                  <p className="fs-5 mb-0">{personalityData.metadata.last_updated}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <i className="fas fa-book me-3 text-primary fs-4"></i>
                <div>
                  <p className="text-muted mb-0">Source</p>
                  <p className="fs-5 mb-0">{personalityData.metadata.source}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Introduction;
