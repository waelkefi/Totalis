
import React from 'react';

const JungianFunctions = ({ personalityData }) => {
  const jungian = personalityData.jungian_functions_and_strengths;
  
  return (
    <div>
      <h1 className="page-header">Jungian Functions & Strengths</h1>
      
      <div className="card-custom mb-4">
        <div className="card-header-custom">
          <h2 className="mb-0">What Are Jungian Functions?</h2>
        </div>
        <div className="card-body-custom">
          <p className="fs-5">{jungian.what_are_jungian_functions}</p>
        </div>
      </div>
      
      <div className="card-custom mb-4">
        <div className="card-header-custom">
          <h2 className="mb-0">Your Cognitive Functions</h2>
        </div>
        <div className="card-body-custom">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body" style={{ backgroundColor: '#E1F5F9' }}>
                  <h3 className="mb-3">Dominant Function</h3>
                  <p>{jungian.your_functions.dominant}</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body" style={{ backgroundColor: '#E1F5F9' }}>
                  <h3 className="mb-3">Auxiliary Function</h3>
                  <p>{jungian.your_functions.auxiliary}</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body" style={{ backgroundColor: '#E1F5F9' }}>
                  <h3 className="mb-3">Tertiary Function</h3>
                  <p>{jungian.your_functions.tertiary}</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body" style={{ backgroundColor: '#E1F5F9' }}>
                  <h3 className="mb-3">Inferior Function</h3>
                  <p>{jungian.your_functions.inferior}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card-custom mb-4">
        <div className="card-header-custom">
          <h2 className="mb-0">Why This Matters</h2>
        </div>
        <div className="card-body-custom">
          <p className="fs-5">{jungian.why_it_matters}</p>
          <p className="fs-5 mt-3">{jungian.strengths_summary}</p>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-6">
          <div className="card-custom h-100">
            <div className="card-header-custom">
              <h2 className="mb-0">Core Strengths</h2>
            </div>
            <div className="card-body-custom">
              <ul className="list-unstyled">
                {jungian.core_strengths.map((strength, index) => (
                  <li key={index} className="strength-item">{strength}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="card-custom h-100">
            <div className="card-header-custom">
              <h2 className="mb-0">Intuitive Strengths</h2>
            </div>
            <div className="card-body-custom">
              <p>{jungian.develop_auxiliary}</p>
              <ul className="list-unstyled mt-3">
                {jungian.intuitive_strengths.map((strength, index) => (
                  <li key={index} className="strength-item">{strength}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card-custom mt-4">
        <div className="card-header-custom">
          <h2 className="mb-0">How It All Ties Together</h2>
        </div>
        <div className="card-body-custom">
          <p className="fs-5">{jungian.how_it_ties_together}</p>
        </div>
      </div>
    </div>
  );
};

export default JungianFunctions;
