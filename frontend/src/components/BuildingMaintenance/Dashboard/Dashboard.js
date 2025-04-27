import React, { useState } from 'react';
import MainHeader from '../../../components/common/MainHeader/MainHeader';
import { FaChartBar, FaTools, FaExclamationTriangle, FaCalendar } from 'react-icons/fa';
import '../shared/MaintenanceStyles.css';
import './Dashboard.css';

const Dashboard = ({ hideHeader }) => {
  const [maintenanceStats] = useState({
    totalTasks: 24,
    completedTasks: 18,
    pendingTasks: 6,
    upcomingServices: 3
  });

  const [recentActivities] = useState([
    {
      id: 1,
      date: '2024-03-15',
      type: 'Service',
      description: 'HVAC Quarterly Maintenance',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-03-14',
      type: 'Inspection',
      description: 'Fire Door Safety Check',
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-03-13',
      type: 'Repair',
      description: 'Plumbing Leak Fix - Level 2',
      status: 'completed'
    }
  ]);

  const [upcomingMaintenance] = useState([
    {
      id: 1,
      date: '2024-03-20',
      type: 'Service',
      description: 'Lift Maintenance',
      priority: 'high'
    },
    {
      id: 2,
      date: '2024-03-25',
      type: 'Inspection',
      description: 'Electrical Systems Check',
      priority: 'medium'
    }
  ]);

  return (
    <div className="maintenance-page">
      {!hideHeader && <MainHeader />}
      <div className="maintenance-content">
        <div className="content-header">
          <h1>Maintenance Dashboard</h1>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FaChartBar />
            </div>
            <div className="stat-details">
              <h3>Total Tasks</h3>
              <p>{maintenanceStats.totalTasks}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaTools />
            </div>
            <div className="stat-details">
              <h3>Completed</h3>
              <p>{maintenanceStats.completedTasks}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaExclamationTriangle />
            </div>
            <div className="stat-details">
              <h3>Pending</h3>
              <p>{maintenanceStats.pendingTasks}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaCalendar />
            </div>
            <div className="stat-details">
              <h3>Upcoming</h3>
              <p>{maintenanceStats.upcomingServices}</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <section className="activities-section">
          <h2>Recent Activities</h2>
          <div className="table-container">
            <table className="activities-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map(activity => (
                  <tr key={activity.id}>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
                    <td>{activity.type}</td>
                    <td>{activity.description}</td>
                    <td>
                      <span className={`status-pill ${activity.status}`}>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Upcoming Maintenance */}
        <section className="upcoming-section">
          <h2>Upcoming Maintenance</h2>
          <div className="upcoming-grid">
            {upcomingMaintenance.map(task => (
              <div key={task.id} className="upcoming-card">
                <div className="upcoming-header">
                  <h3>{task.description}</h3>
                  <span className={`priority-pill ${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="upcoming-details">
                  <p><strong>Type:</strong> {task.type}</p>
                  <p><strong>Date:</strong> {new Date(task.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard; 