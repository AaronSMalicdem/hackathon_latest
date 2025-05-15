import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaBriefcase, FaUser, FaSignOutAlt, FaBook, FaPen } from 'react-icons/fa';
import '../index.scss';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    return (
        <>
            <button
                className="sidebar-toggle"
                onClick={toggleSidebar}
                aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
            >
                {isOpen ? '✕' : '☰'}
            </button>
            <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <h3 className="sidebar-title">My App</h3>
                </div>
                <nav className="sidebar-nav">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        <FaHome className="sidebar-icon" />
                        Home
                    </NavLink>
                    <NavLink
                        to="/workloads"
                        className={({ isActive }) =>
                            isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        <FaBriefcase className="sidebar-icon" />
                        Teacher Workloads
                    </NavLink>
                    <NavLink
                        to="/studenttask"
                        className={({ isActive }) =>
                            isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        <FaBook className="sidebar-icon" />
                        Student Task
                    </NavLink>
                    
                        <NavLink
                        to="/personalworks"
                        className={({ isActive }) =>
                            isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        <FaPen className="sidebar-icon" />
                        My Works
                    </NavLink>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        <FaUser className="sidebar-icon" />
                        Profile
                    </NavLink>
                    <button
                        className="sidebar-link sidebar-logout"
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt className="sidebar-icon" />
                        Logout
                    </button>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;