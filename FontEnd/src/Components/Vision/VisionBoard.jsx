import React, { use } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from '../MainLayout';
import MainLayoutScroll from '../MainLayoutScroll';
import TopBar from '../Navigation/TopBar';
import { useNavigate } from 'react-router-dom';

const VisionBoard = () => {
  const visionData = [
    {
      area: "Personal Life",
      icon: "bi-person",
      color: "primary",
      description: "Live in a comfortable home with a garden, travel the world at least twice a year, spend quality time with family and friends, and pursue meaningful hobbies."
    },
    {
      area: "Career",
      icon: "bi-briefcase",
      color: "purple",
      description: "Lead a successful tech company that makes a positive impact, mentor junior developers, write a tech book, and speak at major conferences."
    },
    {
      area: "Health & Fitness",
      icon: "bi-heart-pulse",
      color: "success",
      description: "Exercise 4 times a week, maintain healthy BMI, practice yoga or meditation daily, sleep 7–8 hours each night, and eat nutrient-rich meals."
    },
    {
      area: "Finances",
      icon: "bi-cash-coin",
      color: "warning",
      description: "Be debt-free, have 12 months of emergency savings, invest 20% of income, own property, and have a comfortable retirement fund."
    },
    {
      area: "Relationships",
      icon: "bi-people",
      color: "pink",
      description: "Nurture deep connections with family and friends, participate in community events, volunteer monthly, and build a supportive network."
    },
    {
      area: "Spiritual Life",
      icon: "bi-brightness-high",
      color: "orange",
      description: "Practice daily gratitude, spend time in nature weekly, read philosophical works, and dedicate time to personal reflection and growth."
    },
  ];
const navigate = useNavigate();
  return (
    <MainLayoutScroll>
      <TopBar title="Vision Board" />
      <div style={{width:"100%"}} className='d-flex justify-content-end align-items-center'>
        <button className='dark-btn' style={{ float: "right" }} onClick={() =>navigate('/vision-form')}>Edit Your Vision Board</button>
      </div>
      <div className="container my-4">

        <div className="row">
          {visionData.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className={`card vision-card h-100 border-top-${item.color}`}>
                <div className="card-body">
                  <h5 className="vision-card-title">
                    <div className="vision-card-icon" style={{ backgroundColor: `var(--bs-${item.color})` }}>
                      <i className={`bi ${item.icon} text-white`}></i>
                    </div>
                    <h2> {item.area}</h2>

                  </h5>
                  <p className="vision-card-text">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </MainLayoutScroll>

  );
};

export default VisionBoard;
