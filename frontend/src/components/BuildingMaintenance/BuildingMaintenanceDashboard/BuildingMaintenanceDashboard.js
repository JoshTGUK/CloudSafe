import React from 'react';
import { 
  FaExclamationTriangle, 
  FaClock, 
  FaTools, 
  FaCheck,
} from 'react-icons/fa';
import './BuildingMaintenanceDashboard.css';

const BuildingMaintenanceDashboard = () => {
  const maintenanceAreas = [
    {
      name: 'Plumbing Systems',
      lastInspection: '15/03/2024',
      nextDue: '15/06/2024',
      openIssues: 0,
      status: 'good'
    },
    {
      name: 'HVAC Systems',
      lastInspection: '01/02/2024',
      nextDue: '01/04/2024',
      openIssues: 1,
      status: 'warning'
    },
    {
      name: 'Lift Maintenance',
      lastInspection: '20/03/2024',
      nextDue: '20/06/2024',
      openIssues: 0,
      status: 'good'
    },
    {
      name: 'Electrical Systems',
      lastInspection: '15/01/2024',
      nextDue: '15/03/2024',
      openIssues: 2,
      status: 'critical'
    }
  ];

  const recentActivity = [
    {
      date: 'Today',
      activity: 'HVAC maintenance scheduled for April 1st, 2024'
    },
    {
      date: 'Yesterday',
      activity: 'Electrical system inspection completed'
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Building Maintenance Dashboard</h1>
          <div className="action-buttons">
            <button className="btn-primary">
              <FaTools /> View Alerts
            </button>
            <button className="btn-primary">
              <FaCheck /> Generate Report
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card critical">
            <div className="icon-wrapper critical">
              <FaExclamationTriangle />
            </div>
            <div className="card-content">
              <h3>Critical Issues</h3>
              <span className="count">2</span>
            </div>
          </div>

          <div className="summary-card scheduled">
            <div className="icon-wrapper scheduled">
              <FaClock />
            </div>
            <div className="card-content">
              <h3>Scheduled Tasks</h3>
              <span className="count">5</span>
            </div>
          </div>

          <div className="summary-card total">
            <div className="icon-wrapper total">
              <FaTools />
            </div>
            <div className="card-content">
              <h3>Total Issues</h3>
              <span className="count">12</span>
            </div>
          </div>

          <div className="summary-card completed">
            <div className="icon-wrapper completed">
              <FaCheck />
            </div>
            <div className="card-content">
              <h3>Completed</h3>
              <span className="count">8</span>
            </div>
          </div>
        </div>

        {/* Maintenance Areas Status */}
        <section className="maintenance-areas">
          <h2>Maintenance Areas Status</h2>
          <div className="areas-grid">
            {maintenanceAreas.map((area, index) => (
              <div key={index} className={`area-card ${area.status}`}>
                <h3>{area.name}</h3>
                <div className="area-details">
                  <p><strong>Last Inspection:</strong> {area.lastInspection}</p>
                  <p><strong>Next Due:</strong> {area.nextDue}</p>
                  <p><strong>Open Issues:</strong> {area.openIssues}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.map((item, index) => (
              <div key={index} className="activity-item">
                <span className="activity-date">{item.date}</span>
                <span className="activity-description">{item.activity}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BuildingMaintenanceDashboard; 