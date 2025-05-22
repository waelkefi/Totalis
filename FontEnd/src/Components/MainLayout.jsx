import React from 'react';
import Sidebar from './Navigation/SideBar';


const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content" >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;