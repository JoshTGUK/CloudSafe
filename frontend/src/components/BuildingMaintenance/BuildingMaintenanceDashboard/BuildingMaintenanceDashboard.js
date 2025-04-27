import React, { useState } from 'react';
import MainHeader from '../../common/MainHeader/MainHeader';
import '../shared/MaintenanceStyles.css';
import './BuildingMaintenanceDashboard.css';
import { FaTools, FaExclamationTriangle, FaCheckCircle, FaClock } from 'react-icons/fa';

const BuildingMaintenanceDashboard = () => {
  const [stats] = useState({
    totalIssues: 12,
    scheduledTasks: 5,
    completedTasks: 8,
    criticalIssues: 2
  });

  const [maintenanceAreas] = useState([
    {
      name: 'Plumbing Systems',
      status: 'ok',
      lastInspection: '2024-03-15',
      nextDue: '2024-06-15',
      issues: 0
    },
    {
      name: 'HVAC Systems',
      status: 'warning',
      lastInspection: '2024-02-01',
      nextDue: '2024-04-01',
      issues: 1
    },
    {
      name: 'Lift Maintenance',
      status: 'ok',
      lastInspection: '2024-03-20',
      nextDue: '2024-06-20',
      issues: 0
    },
    {
      name: 'Electrical Systems',
      status: 'critical',
      lastInspection: '2024-01-15',
      nextDue: '2024-03-15',
      issues: 2
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'status-critical';
      case 'warning': return 'status-warning';
      case 'ok': return 'status-ok';
      default: return '';
    }
  };

  return (
    <div className="maintenance-page">
      <MainHeader />
      <div className="maintenance-content">
        <h1>Building Maintenance Dashboard</h1>
        
        {/* Overview Stats */}
        <div className="stats-grid">
          <div className="stat-card critical">
            <FaExclamationTriangle className="stat-icon" />
            <div className="stat-content">
              <h3>Critical Issues</h3>
              <p>{stats.criticalIssues}</p>
            </div>
          </div>
          
          <div className="stat-card warning">
            <FaClock className="stat-icon" />
            <div className="stat-content">
              <h3>Scheduled Tasks</h3>
              <p>{stats.scheduledTasks}</p>
            </div>
          </div>
          
          <div className="stat-card info">
            <FaTools className="stat-icon" />
            <div className="stat-content">
              <h3>Total Issues</h3>
              <p>{stats.totalIssues}</p>
            </div>
          </div>
          
          <div className="stat-card success">
            <FaCheckCircle className="stat-icon" />
            <div className="stat-content">
              <h3>Completed</h3>
              <p>{stats.completedTasks}</p>
            </div>
          </div>
        </div>

        {/* Maintenance Areas Overview */}
        <div className="maintenance-areas">
          <h2>Maintenance Areas Status</h2>
          <div className="area-grid">
            {maintenanceAreas.map((area, index) => (
              <div key={index} className={`area-card ${getStatusColor(area.status)}`}>
                <h3>{area.name}</h3>
                <div className="area-details">
                  <p>Last Inspection: {new Date(area.lastInspection).toLocaleDateString()}</p>
                  <p>Next Due: {new Date(area.nextDue).toLocaleDateString()}</p>
                  <p>Open Issues: {area.issues}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-date">Today</span>
              <p>HVAC maintenance scheduled for April 1st, 2024</p>
            </div>
            <div className="activity-item">
              <span className="activity-date">Yesterday</span>
              <p>Electrical system inspection completed</p>
            </div>
            <div className="activity-item">
              <span className="activity-date">2 days ago</span>
              <p>New plumbing issue reported in Level 2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingMaintenanceDashboard; 