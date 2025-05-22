
import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, isMobile, show, toggleSidebar }) => {
  const navItems = [
    { id: 'introduction', label: 'Introduction', icon: 'house' },
    { id: 'characteristics', label: 'Characteristics', icon: 'star' },
    { id: 'jungian', label: 'Jungian Functions & Strengths', icon: 'boxes' },
    { id: 'development', label: 'Development', icon: 'arrow-up-right' },
    { id: 'success', label: 'Success', icon: 'trophy' },
    { id: 'recommendations', label: 'Recommendations', icon: 'lightbulb' },
  ];

  return (
    <>
      {isMobile && (
        <button className="btn toggle-sidebar" onClick={toggleSidebar}>
          <i className="bi bi-list"></i>
        </button>
      )}
      <div className={`sidebar ${isMobile && show ? 'show' : ''} ${isMobile && !show ? 'd-none d-md-block' : ''}`}>
        {/* <div className="sidebar-header">
          <h3>Personality Profile</h3>
        </div> */}
        <ul className="nav flex-column sidebar-nav">
          {navItems.map((item) => (
            <li className="nav-item" key={item.id}>
              <a
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                  if (isMobile) toggleSidebar();
                }}
              >
                <i className={`bi bi-${item.icon}`}></i>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
