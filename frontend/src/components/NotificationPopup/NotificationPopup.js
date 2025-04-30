import React from 'react';
import { FaBell, FaCalendarAlt, FaFileAlt, FaExclamationTriangle } from 'react-icons/fa';
import './NotificationPopup.css';
import { useNavigate } from 'react-router-dom';

const NotificationPopup = ({ isOpen }) => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/notifications', { replace: true });
  };

  if (!isOpen) return null;

  return (
    <div className="notification-popup">
      <div className="notification-header">
        <h3>Notifications</h3>
        <span className="notification-count">4 new</span>
      </div>

      <div className="notification-item urgent">
        <FaExclamationTriangle className="notification-icon warning" />
        <div className="notification-content">
          <span>Roof inspection failed at Sam Test</span>
          <button className="action-btn">View Details</button>
        </div>
      </div>

      <div className="notification-item">
        <FaCalendarAlt className="notification-icon calendar" />
        <div className="notification-content">
          <span>3 Tasks due today</span>
          <button className="action-btn">View Tasks</button>
        </div>
      </div>

      <div className="notification-item">
        <FaFileAlt className="notification-icon document" />
        <div className="notification-content">
          <span>2 certifications expiring this week</span>
          <button className="action-btn">Review Docs</button>
        </div>
      </div>

      <div className="notification-item">
        <FaBell className="notification-icon reminder" />
        <div className="notification-content">
          <span>Fire Safety Check reminder - Avalon House</span>
          <button className="action-btn">Schedule Now</button>
        </div>
      </div>

      <div className="notification-footer">
        <button 
          className="view-all-btn"
          onClick={handleViewAll}
        >
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationPopup; 