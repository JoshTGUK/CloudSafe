import React from 'react';
import { FaBell, FaCalendarAlt, FaFileAlt, FaExclamationTriangle, FaFilter } from 'react-icons/fa';
import './NotificationsPage.css';
import allSafeLogo from '../../assets/ALL-Safe-logo.png';
import { Link, useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'urgent',
      icon: <FaExclamationTriangle className="notification-icon warning" />,
      title: 'Roof inspection failed at Sam Test',
      timestamp: '2 hours ago',
      action: 'View Details',
      property: 'Sam Test'
    },
    {
      id: 2,
      type: 'task',
      icon: <FaCalendarAlt className="notification-icon calendar" />,
      title: '3 Tasks due today',
      timestamp: '3 hours ago',
      action: 'View Tasks'
    },
    {
      id: 3,
      type: 'document',
      icon: <FaFileAlt className="notification-icon document" />,
      title: '2 certifications expiring this week',
      timestamp: '5 hours ago',
      action: 'Review Docs'
    },
    {
      id: 4,
      type: 'reminder',
      icon: <FaBell className="notification-icon reminder" />,
      title: 'Fire Safety Check reminder',
      timestamp: '1 day ago',
      action: 'Schedule Now',
      property: 'Avalon House'
    }
    // Add more notifications as needed
  ];

  return (
    <div className='main-container'>
      {/* Main Header */}
      <header className='dashboard-header'>
        <Link to="/dashboard" className="logo-link">
          <img src={allSafeLogo} alt="ALL Safe Logo" className='logo' />
        </Link>
        <div className='header-right'>
          <nav className='nav-links'>
            <Link to="/dashboard" className='nav-link'>Dashboard</Link>
            <Link to="/documents" className='nav-link'>Documents</Link>
            <Link to="/inspections" className='nav-link'>Inspections</Link>
            <Link to="/tasks" className='nav-link'>Tasks</Link>
          </nav>
          <div className='header-icons'>
            <div className='icon'><i className='fas fa-search'></i></div>
            <div className='icon'><i className='fas fa-bell'></i></div>
            <div className='icon'><i className='fas fa-question-circle'></i></div>
            <div className='user-avatar-container'>
              <div className="user-avatar">
                <i className="fas fa-user"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Content */}
      <main className='dashboard-content'>
        <div className="notifications-page">
          <div className="notifications-header">
            <div className="header-content">
              <h1>Notifications</h1>
              <div className="header-actions">
                <button className="filter-btn">
                  <FaFilter /> Filter
                </button>
                <button className="mark-all-read-btn">
                  Mark all as read
                </button>
              </div>
            </div>
          </div>

          <div className="notifications-container">
            <div className="notifications-filters">
              <button className="filter-chip active">All</button>
              <button className="filter-chip">Urgent</button>
              <button className="filter-chip">Tasks</button>
              <button className="filter-chip">Documents</button>
              <button className="filter-chip">Reminders</button>
            </div>

            <div className="notifications-list">
              {notifications.map(notification => (
                <div key={notification.id} className={`notification-card ${notification.type}`}>
                  <div className="notification-icon-wrapper">
                    {notification.icon}
                  </div>
                  <div className="notification-details">
                    <div className="notification-header">
                      <h3>{notification.title}</h3>
                      <span className="timestamp">{notification.timestamp}</span>
                    </div>
                    {notification.property && (
                      <p className="property-name">{notification.property}</p>
                    )}
                    <button className="action-button">{notification.action}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage; 