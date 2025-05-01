import React, { useState } from 'react';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaDoorOpen, FaWindowMaximize, FaPlus } from 'react-icons/fa';
import '../shared/MaintenanceStyles.css';
import './DoorsWindows.css';

const DoorsWindows = ({ propertyId }) => {
  const [fireDoorsStatus] = useState('good');
  const [lastInspection] = useState('2024-03-01');
  const [nextDue] = useState('2024-06-01');
  
  const [maintenanceLogs] = useState([
    {
      id: 1,
      date: '2024-03-01',
      type: 'Fire Door Check',
      location: 'Level 1 - Emergency Exit',
      work: 'Seals replaced, closing mechanism adjusted',
      status: 'completed',
      technician: 'John Smith'
    },
    {
      id: 2,
      date: '2024-02-15',
      type: 'Window Inspection',
      location: 'West Wing - Office Area',
      work: 'Window seals checked, hinges lubricated',
      status: 'completed',
      technician: 'Mike Johnson'
    }
  ]);

  const [repairs] = useState([
    {
      id: 1,
      date: '2024-03-10',
      type: 'Door',
      location: 'Main Entrance',
      issue: 'Door closer needs adjustment',
      priority: 'medium',
      status: 'scheduled'
    }
  ]);

  return (
    <div className="doors-windows">
      <div className="page-header">
        <div className="header-content">
          <h1>Doors & Windows</h1>
          <p>Monitor and maintain access points</p>
        </div>
        <button className="action-button">
          <FaPlus />
          Add New Inspection
        </button>
      </div>

      {/* Status Cards */}
      <div className="status-grid">
        <div className="status-card">
          <h3>Fire Doors Status</h3>
          <p className={`status-badge ${fireDoorsStatus}`}>
            <FaDoorOpen />
            {fireDoorsStatus === 'good' && 'Compliant'}
            {fireDoorsStatus === 'warning' && 'Review Required'}
            {fireDoorsStatus === 'critical' && 'Non-Compliant'}
          </p>
        </div>
        <div className="status-card">
          <h3>Last Inspection</h3>
          <p>{new Date(lastInspection).toLocaleDateString()}</p>
        </div>
        <div className="status-card">
          <h3>Next Due</h3>
          <p>{new Date(nextDue).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Maintenance Log */}
      <section className="maintenance-section">
        <h2>Maintenance History</h2>
        <div className="table-container">
          <table className="maintenance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Location</th>
                <th>Work Completed</th>
                <th>Status</th>
                <th>Technician</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceLogs.map(log => (
                <tr key={log.id}>
                  <td>{new Date(log.date).toLocaleDateString()}</td>
                  <td>{log.type}</td>
                  <td>{log.location}</td>
                  <td>{log.work}</td>
                  <td>
                    <span className={`status-pill ${log.status}`}>
                      {log.status}
                    </span>
                  </td>
                  <td>{log.technician}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Active Repairs */}
      <section className="repairs-section">
        <h2>Active Repairs</h2>
        <div className="repairs-grid">
          {repairs.map(repair => (
            <div key={repair.id} className="repair-card">
              <div className="repair-header">
                <div className="repair-type">
                  {repair.type === 'Door' ? <FaDoorOpen /> : <FaWindowMaximize />}
                  <h3>{repair.location}</h3>
                </div>
                <span className={`priority-pill ${repair.priority}`}>
                  {repair.priority}
                </span>
              </div>
              <div className="repair-details">
                <p><strong>Issue:</strong> {repair.issue}</p>
                <p><strong>Reported:</strong> {new Date(repair.date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> 
                  <span className={`status-pill ${repair.status}`}>
                    {repair.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="documents-section">
        <h2>Inspection Reports</h2>
        <div className="upload-area">
          <div className="upload-box">
            <FaUpload />
            <p>Drop inspection reports here or click to upload</p>
            <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoorsWindows; 