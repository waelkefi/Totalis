
import React from 'react';

const Development = ({ personalityData }) => {
  const development = personalityData.development;
  
  return (
    <div>
      <h1 className="page-header mb-5">Personal Development</h1>
      
      <div className="card-custom mb-4">
        <div className="card-header-custom">
          <h2 className="mb-0">Your Growth Journey</h2>
        </div>
        <div className="card-body-custom">
          <p className="fs-5">{development.growth_path}</p>
          
          <div className="row mt-4">
            {development.growth_stages.map((stage, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <div style={{ backgroundColor: '#E1F5F9' }} className="rounded p-3 text-center h-100">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" 
                         style={{ width: '50px', height: '50px', backgroundColor: 'var(--highlight)', color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>
                      {index + 1}
                    </div>
                  </div>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card-custom h-100">
            <div className="card-header-custom">
              <h2 className="mb-0">Problem Areas to Address</h2>
            </div>
            <div className="card-body-custom">
              <ul className="list-unstyled">
                {development.problem_areas.map((problem, index) => (
                  <li key={index} className="weakness-item">{problem}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card-custom h-100">
            <div className="card-header-custom">
              <h2 className="mb-0">Growth Solutions</h2>
            </div>
            <div className="card-body-custom">
              <ul className="list-unstyled">
                {development.solutions.map((solution, index) => (
                  <li key={index} className="strength-item">{solution}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Development;
