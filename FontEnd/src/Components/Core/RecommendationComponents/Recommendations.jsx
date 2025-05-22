
import React from 'react';

const Recommendations = ({ personalityData }) => {
  const recommendations = personalityData.recommendations;
  
  return (
    <div>
      <h1 className="page-header mb-5">Recommendations</h1>
      
      <div className="card-custom mb-4">
        <div className="card-header-custom">
          <h2 className="mb-0">Keys to Living Well</h2>
        </div>
        <div className="card-body-custom">
          <div className="row">
            {recommendations.living_well.map((recommendation, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center" style={{ backgroundColor: 'rgba(45, 204, 205, 0.05)' }}>
                    <div className="py-3">
                      <i className="fas fa-key fa-2x mb-3" style={{ color: 'var(--highlight)' }}></i>
                      <p className="fs-5">{recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card-custom mb-4">
        <div className="card-header-custom">
          <h2 className="mb-0">Specific Suggestions</h2>
        </div>
        <div className="card-body-custom">
          <ul className="list-unstyled">
            {recommendations.specific_suggestions.map((suggestion, index) => (
              <li key={index} className="strength-item mb-3">{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="card-custom">
        <div className="card-header-custom">
          <h2 className="mb-0">Personal Growth Exercises</h2>
        </div>
        <div className="card-body-custom">
          <div className="row">
            {recommendations.growth_exercises.map((exercise, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 border-0 shadow">
                  <div className="card-header text-white" style={{ backgroundColor: 'var(--highlight)' }}>
                    <h3 className="h5 mb-0">{exercise.title}</h3>
                  </div>
                  <div className="card-body">
                    <p>{exercise.description}</p>
                    <p className="text-muted mt-3"><small>{exercise.benefits}</small></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="alert alert-success mt-3">
            <i className="fas fa-lightbulb me-2"></i>
            <strong>Pro Tip:</strong> {recommendations.pro_tip}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
