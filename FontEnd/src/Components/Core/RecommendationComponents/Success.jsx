
import React from 'react';

const Success = ({ personalityData }) => {
  const success = personalityData.success;
  
  return (
    <div>
      <h1 className="page-header mb-5">Path to Success</h1>
      
      <div className="card-custom mb-4">
        <div className="card-header-custom">
          <h2 className="mb-0">What Success Means for You</h2>
        </div>
        <div className="card-body-custom">
          <p className="fs-5">{success.definition}</p>
          
          <div className="row mt-4">
            {success.pillars.map((pillar, index) => (
              <div className="col-md-3 mb-4 text-center" key={index}>
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" 
                     style={{ 
                       width: '80px', 
                       height: '80px', 
                       backgroundColor: 'var(--highlight)',
                       color: 'white',
                       fontSize: '1.5rem',
                       fontWeight: 'bold'
                     }}>
                  {index + 1}
                </div>
                <h3 className="mt-3">{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card-custom">
        <div className="card-header-custom">
          <h2 className="mb-0">Your Rules for Success</h2>
        </div>
        <div className="card-body-custom p-0">
          <div className="accordion" id="successRules">
            {success.rules.map((rule, index) => (
              <div className="accordion-item border-0 mb-2" key={index}>
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button collapsed py-3" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target={`#rule${index}`}
                  >
                    <strong>{rule.title}</strong>
                  </button>
                </h2>
                <div id={`rule${index}`} className="accordion-collapse collapse" data-bs-parent="#successRules">
                  <div className="accordion-body">
                    {rule.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card-custom h-100">
            <div className="card-header-custom">
              <h3 className="mb-0">Career Paths</h3>
            </div>
            <div className="card-body-custom">
              <p>As an ENFJ, you often excel in these career areas:</p>
              
              <div className="row mt-4">
                {success.career_paths.suggestions.map((career, index) => (
                  <div className="col-6 mb-3" key={index}>
                    <div className="d-flex align-items-center">
                      <span 
                        className="d-inline-flex align-items-center justify-content-center rounded-circle me-2"
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          backgroundColor: 'var(--highlight)', 
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        {index + 1}
                      </span>
                      <span>{career.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card-custom h-100">
            <div className="card-header-custom">
              <h3 className="mb-0">Work Environment Preferences</h3>
            </div>
            <div className="card-body-custom">
              <ul className="list-unstyled">
                {success.career_paths.environment_preferences.map((preference, index) => (
                  <li key={index} className="strength-item">{preference}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
