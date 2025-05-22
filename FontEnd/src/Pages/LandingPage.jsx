import { useEffect, useState } from "react";
import CustomNavbar from "../Components/Navigation/LandingPageNavbar";

const focusList = ['Mind', 'Body', 'Money', 'Goals', 'Life'];

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const focus = focusList[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % focusList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getColorStyle = () => {
    switch (focus) {
      case 'Mind':
        return { color: '#7867AE' };
      case 'Body':
        return { color: '#E2E426' };
      case 'Money':
        return { color: '#A8DFEA' };
      case 'Goals':
        return { color: '#EC688E' };
      case 'Life':
        return { color: '#9399E6' };
      default:
        return { color: '#7867AE' };
    }
  };

  const getBackgroundStyle = () => {
    let colorMap = {
      Mind: '#7867AE',
      Body: '#EEEF7D',
      Money: '#A8DFEA',
      Goals: '#F295B0',
      Life: '#9399E6',
    };

    return {
      background: `radial-gradient( circle at bottom, ${colorMap[focus]} -20%,${colorMap[focus]} 10%, #15133A 80%)`,
    };
  };

  return (
    <><CustomNavbar/>
       <div className="hero-container" >
      <div className="hero-content">
        <div className="hero-subtitle">Master Your Personal Development Journey</div>
        <h1 className="hero-title">
          Your <span style={getColorStyle()}>{focus}</span> <br /> matters
        </h1>
        <p className="hero-description">
          Totalis is a revolutionary platform that combines AI, psychology, and
          gamification to help individuals master their personal development journey.
        </p>
        <button className="hero-button">Start My Journey</button>
      </div>
      <div className="bg-custum" style={getBackgroundStyle()}>

      </div>
    </div></>
 
  );
};

export default LandingPage;
