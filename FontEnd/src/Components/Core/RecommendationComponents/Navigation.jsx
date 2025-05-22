import { useNavigate } from 'react-router-dom';

const Navigation = ({ setActiveTab,activeTab }) => {

    const navigate = useNavigate();
  // Remove duplicate areas from visions and create an array of tabs
  const tabs = [ { id: 'introduction', label: 'Introduction', icon: 'house' },
    { id: 'characteristics', label: 'Characteristics', icon: 'star' },
    { id: 'jungian', label: 'Jungian Functions & Strengths', icon: 'boxes' },
    { id: 'development', label: 'Development', icon: 'arrow-up-right' },
    { id: 'success', label: 'Success', icon: 'trophy' },
    { id: 'recommendations', label: 'Recommendations', icon: 'lightbulb' }];

  return (
    <div className="navigation">
      <ul className="nav-tabs">
        {tabs.map(tab => (
          <li className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`} 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab.id);
                  navigate(`#${tab.id}`)
                }} key={tab.id}>
            
              
                <i className={`bi bi-${tab.icon}`}></i>
                <span>{tab.label}</span>
              
            </li>
        ))}
      
      </ul>
    </div>
  );
};

export default Navigation;
