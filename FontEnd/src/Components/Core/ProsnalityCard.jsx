import React from 'react';
import { useNavigate } from 'react-router-dom';

// Mapping des classes CSS selon la catégorie
const getPersonalityClass = (category) => {
 
  const classes = {
    Analysts: {
      color: "personnality-custum-color1",
      bg: "personnality-custum-bg1",
    },
    Diplomats: {
      color: "personnality-custum-color2",
      bg: "personnality-custum-bg2",
    },
    Explorers: {
      color: "personnality-custum-color3",
      bg: "personnality-custum-bg3",
    },
    Sentinels: {
      color: "personnality-custum-color4",
      bg: "personnality-custum-bg4",
    },
  };

  return classes[category] || {
    color: "personnality-custum-color-default",
    bg: "personnality-custum-bg-default",
  };
};

function ProsnalityCard({ personality }) {
  const { color, bg } = getPersonalityClass(personality?.categorie);
 const navigate=useNavigate()
  return (
    <div className="architect-card">
      <h1 className={color}>{personality?.role}</h1>
      <h2 className={color}>{personality?.type}</h2>
      <h3 className={color}>{personality?.categorie}</h3>
      <p className={bg}>{personality?.description}</p>
      <button className='primary-btn mt-3' style={{margin:'auto'}} onClick={()=>navigate('/recommendation')}>Read More</button>
    </div>
  );
}

export default ProsnalityCard;
