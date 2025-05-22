
import React, { useState, useEffect } from 'react';
import { personalityData } from '../../../Data/personalityData';
import Introduction from './Introduction';
import Characteristics from './Characteristics';
import JungianFunctions from './JungianFunctions';
import Development from './Development';
import Success from './Success';
import Recommendations from './Recommendations';
import Sidebar from './Sidebar';

import './styles.css';
import MainLayoutScroll from '../../MainLayoutScroll';
import MainLayout from '../../MainLayout';
import TopBar from '../../Navigation/TopBar';
import Navigation from './Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPersonality } from '../../../Redux/Actions/userPerso.actions';
const IndexRec = () => {
  const [activeTab, setActiveTab] = useState('introduction');
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [userData, setUserData] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const userPerso = useSelector((state) => state.userPerso);

    useEffect(() => {
        if (user?._id) {
          dispatch(fetchUserPersonality(user._id));
        }
      }, []);
  const userPersonalityType = userPerso?.type; // Assuming this is the correct path to get the personality type

  // Find the personality data for the user's type
  useEffect(() => {
    const data = personalityData.find(item => item.type === userPersonalityType);
    setUserData(data);
  }, [userPersonalityType]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Render active component based on activeTab
  const renderActiveComponent = () => {
    if (!userData) return <div>Loading personality data...</div>;

    switch (activeTab) {
      case 'introduction':
        return <Introduction personalityData={userData} />;
      case 'characteristics':
        return <Characteristics personalityData={userData} />;
      case 'jungian':
        return <JungianFunctions personalityData={userData} />;
      case 'development':
        return <Development personalityData={userData} />;
      case 'success':
        return <Success personalityData={userData} />;
      case 'recommendations':
        return <Recommendations personalityData={userData} />;
      default:
        return <Introduction personalityData={userData} />;
    }
  };

  return (
    // <MainLayoutScroll>
    //   <div className="dashboard-container">
    //     <Sidebar
    //       activeTab={activeTab}
    //       setActiveTab={setActiveTab}
    //       isMobile={isMobile}
    //       show={showSidebar}
    //       toggleSidebar={toggleSidebar}
    //     />

    //     <div className={`content-wrapper ${isMobile ? 'pt-5' : ''}`}>
    //       {renderActiveComponent()}
    //     </div>
    //   </div>

     
    // </MainLayoutScroll>
     <MainLayout>
        <TopBar title="Recommendations" />
        <Navigation
           setActiveTab={setActiveTab}
            activeTab={activeTab}
        />
       <div className={`content-wrapper ${isMobile ? 'pt-5' : ''}`}>
          {renderActiveComponent()}
        </div>
      </MainLayout>
  );
};

export default IndexRec;
