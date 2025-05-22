
import React from 'react';
import Image from "../../../assets/pers1.jpeg"

const Characteristics = ({ personalityData }) => {
  return (
    <div>
      <h1 className="page-header">Characteristics</h1>
      
      <div className="row">
        <div className="col-lg-6">
          <div className="card-custom h-100">
            <div className="card-section-header">
              <i className="fas fa-star text-warning"></i>
              <h2>Strengths</h2>
            </div>
            <div className="card-body-custom">
              {personalityData.characteristics.strengths.map((strength, index) => (
                <div key={index} className="strength-item">{strength}</div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="card-custom h-100">
            <div className="card-section-header">
              <i className="fas fa-exclamation-circle text-danger"></i>
              <h2>Growth Areas</h2>
            </div>
            <div className="card-body-custom">
              {personalityData.characteristics.weaknesses.map((weakness, index) => (
                <div key={index} className="weakness-item">{weakness}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="card-custom mt-4">
        <div className="card-section-header">
          <h2>Character Themes</h2>
        </div>
        <div className="card-body-custom">
          <div className="row">
            {personalityData.characteristics.themes.map((theme, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="border rounded p-3 h-100" style={{ borderColor: 'var(--secondary)' }}>
                  <h3 className="h4 mb-3">{theme.title}</h3>
                  <p>{theme.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card-custom mt-4">
        <div className="card-section-header">
          <h2>How Others See You</h2>
        </div>
        <div className="card-body-custom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h3>Common Perceptions</h3>
              <ul className="mt-3">
                {personalityData.characteristics.perceptions.common_perceptions.map((perception, index) => (
                  <li key={index} className="mb-2">{perception}</li>
                ))}
              </ul>
            </div>
            <div className="col-md-6 text-center">
              <img src={Image} alt="Perception Illustration" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characteristics;
