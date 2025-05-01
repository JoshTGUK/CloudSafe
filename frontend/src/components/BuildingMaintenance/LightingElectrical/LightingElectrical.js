import React, { useState } from 'react';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaLightbulb, FaBolt, FaPlus } from 'react-icons/fa';
import '../shared/MaintenanceStyles.css';
import './LightingElectrical.css';

const LightingElectrical = ({ propertyId }) => {
  const [emergencyLightingStatus] = useState('good');
  const [lastTest] = useState('2024-03-10');
  const [nextTest] = useState('2024-06-10');
  
  const [maintenanceLogs] = useState([
    {
      id: 1,
      date: '2024-03-10',
      type: 'Emergency Lighting Test',
      location: 'All Floors',
      work: 'Monthly function test completed',
      status: 'passed',
      technician: 'John Smith'
    },
    {
      id: 2,
      date: '2024-02-15',
      type: 'Electrical Inspection',
      location: 'Distribution Boards',
      work: 'Annual safety inspection',
      status: 'completed',
      technician: 'Mike Johnson'
    }
  ]);

  const [issues] = useState([
    {
      id: 1,
      date: '2024-03-12',
      type: 'Lighting',
      location: 'Level 2 Corridor',
      issue: 'Emergency light failure',
      priority: 'high',
      status: 'in-progress'
    }
  ]);

  return (
    <div className="lighting-electrical">
      <div className="page-header">
        <div className="header-content">
          <h1>Lighting & Electrical</h1>
          <p>Monitor and maintain electrical systems</p>
        </div>
        <button className="action-button">
          <FaPlus />
          Add New Inspection
        </button>
      </div>

      {/* Status Cards */}
      <div className="status-grid">
        <div className="status-card">
          <h3>Emergency Lighting</h3>
          <p className={`status-badge ${emergencyLightingStatus}`}>
            <FaLightbulb />
            {emergencyLightingStatus === 'good' && 'Functional'}
            {emergencyLightingStatus === 'warning' && 'Test Due'}
            {emergencyLightingStatus === 'critical' && 'Attention Required'}
          </p>
        </div>
        <div className="status-card">
          <h3>Last Test</h3>
          <p>{new Date(lastTest).toLocaleDateString()}</p>
        </div>
        <div className="status-card">
          <h3>Next Test Due</h3>
          <p>{new Date(nextTest).toLocaleDateString()}</p>
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

      {/* Active Issues */}
      <section className="issues-section">
        <h2>Active Issues</h2>
        <div className="issues-grid">
          {issues.map(issue => (
            <div key={issue.id} className="issue-card">
              <div className="issue-header">
                <div className="issue-type">
                  {issue.type === 'Lighting' ? <FaLightbulb /> : <FaBolt />}
                  <h3>{issue.location}</h3>
                </div>
                <span className={`priority-pill ${issue.priority}`}>
                  {issue.priority}
                </span>
              </div>
              <div className="issue-details">
                <p><strong>Issue:</strong> {issue.issue}</p>
                <p><strong>Reported:</strong> {new Date(issue.date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> 
                  <span className={`status-pill ${issue.status}`}>
                    {issue.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="documents-section">
        <h2>Certificates & Reports</h2>
        <div className="upload-area">
          <div className="upload-box">
            <FaUpload />
            <p>Drop electrical certificates here or click to upload</p>
            <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LightingElectrical; 