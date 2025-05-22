import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import FullLogo from '../../assets/fullLogo.svg';
import Logo from '../../assets/logo.svg';
import userImage from "../../assets/user.png"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/Actions/Auth.action';
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
 const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const logoutuser = () => {
    dispatch(logout())
  }
  const navItems = [
    { path: "/", name: "Dashboard", icon: "bi-grid-1x2-fill" },
    { path: "/personalities", name: "Personalities", icon: "bi-list-ul" },
    { path: "/addpersonalities", name: "Add Perso", icon: "bi-plus-circle" },
  ];

  return (
     <div className={`sidebarMain ${isOpen ? 'open' : 'closed'}`} style={{ width: isOpen ? '200px' : '70px' }}>
      <div className="top_section">
        <img
          src={isOpen ? FullLogo : Logo}
          alt="Totalis Logo"
          className="logo"
          style={{ width: isOpen ? '100px' : '80%' }}
        />
        <button
          className="bars"
          onClick={toggleSidebar}
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          style={{
            position: isOpen ? 'relative' : 'absolute',
            right: isOpen ? 'auto' : '-30px',
            top: isOpen ? 'auto' : '0',
          }}
        >
          <FaBars />
        </button>
      </div>
      <nav className="menu">
        {navItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) => `link ${isActive ? 'active' : ''}`}
            aria-label={`Navigate to ${item.name}`}
          >
            {({ isActive }) => (
              <>
                <div className="icon">{isActive ?  <i className={`${item.icon}`}></i> :  <i className={`${item.icon}`}></i>}</div>
                <div className="link_text" style={{ display: isOpen ? 'block' : 'none' }}>
                  {item.name}
                </div>
              </>
            )}
          </NavLink>

          //  <li className="nav-item mb-2" key={item.href}>
          //     <button
          //       className={`nav-link rounded-3 d-flex align-items-center py-2 px-3 w-100 text-start ${
          //         location.pathname === item.href ? "active" : ""
          //       }`}
          //       onClick={() => navigate(item.href)}
          //     >
          //       <i className={`${item.icon} nav-item-icon me-3 me-md-0 me-lg-3`}></i>
          //       <span className="nav-item-text">{item.label}</span>
          //     </button>
          //   </li>
        ))}


      </nav>
      <div className="logout" >
        <button className="lougout-btn" onClick={() => logoutuser()}>
          <div style={{display: isOpen ? 'flex' : 'none' }}>
            <img src={userImage} alt="totalis-userImage" />
            <p>Admin</p>
          </div>

          <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.199219" width="40" height="40" rx="20" fill="#E5F3FB" />
            <path d="M23.1992 25.625C23.1256 27.4769 21.5823 29.0494 19.5149 28.9988C19.0339 28.987 18.4393 28.8194 17.2503 28.484C14.3888 27.6768 11.9048 26.3203 11.3088 23.2815C11.1992 22.723 11.1992 22.0944 11.1992 20.8373L11.1992 19.1627C11.1992 17.9056 11.1992 17.277 11.3088 16.7185C11.9048 13.6797 14.3888 12.3232 17.2503 11.516C18.4394 11.1806 19.0339 11.013 19.5149 11.0012C21.5823 10.9506 23.1256 12.5231 23.1992 14.375" stroke="#83D2E1" stroke-width="1.5" stroke-linecap="round" />
            <path d="M29.1992 20H18.1992M29.1992 20C29.1992 19.2998 27.2049 17.9915 26.6992 17.5M29.1992 20C29.1992 20.7002 27.2049 22.0085 26.6992 22.5" stroke="#83D2E1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>


        </button>
      </div>
    </div>
  );
}
