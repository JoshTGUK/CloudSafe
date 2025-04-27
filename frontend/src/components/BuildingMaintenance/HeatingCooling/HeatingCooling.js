import React, { useState } from 'react';
import MainHeader from '../../common/MainHeader/MainHeader';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaThermometerHalf } from 'react-icons/fa';
import '../shared/MaintenanceStyles.css';
import './HeatingCooling.css';

const HeatingCooling = ({ hideHeader }) => {
  const [hvacStatus] = useState('good');
  const [lastService] = useState('2024-03-01');
  const [nextService] = useState('2024-06-01');
  
  const [serviceLogs] = useState([
    {
      id: 1,
      date: '2024-03-01',
      type: 'HVAC Maintenance',
      system: 'Main Building HVAC',
      work: 'Filter replacement, system check',
      status: 'completed',
      technician: 'John Smith'
    },
    {
      id: 2,
      date: '2024-02-15',
      type: 'Boiler Service',
      system: 'Central Heating',
      work: 'Annual inspection and cleaning',
      status: 'completed',
      technician: 'Mike Johnson'
    }
  ]);

  const [issues] = useState([
    {
      id: 1,
      date: '2024-03-10',
      system: 'Level 2 AC',
      description: 'Temperature fluctuation reported',
      priority: 'medium',
      status: 'investigating'
    }
  ]);

  return (
    <div className="maintenance-page">
      {!hideHeader && <MainHeader />}
      <div className="maintenance-content">
        <div className="content-header">
          <h1>Heating & Cooling Systems</h1>
          <button className="action-button">
            <FaUpload /> Upload Service Report
          </button>
        </div>

        {/* Status Cards */}
        <div className="status-grid">
          <div className="status-card">
            <h3>HVAC Status</h3>
            <p className={`status-badge ${hvacStatus}`}>
              <FaThermometerHalf />
              {hvacStatus === 'good' && 'Operational'}
              {hvacStatus === 'warning' && 'Maintenance Due'}
              {hvacStatus === 'critical' && 'Attention Required'}
            </p>
          </div>
          <div className="status-card">
            <h3>Last Service</h3>
            <p>{new Date(lastService).toLocaleDateString()}</p>
          </div>
          <div className="status-card">
            <h3>Next Service Due</h3>
            <p>{new Date(nextService).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Service History */}
        <section className="service-section">
          <h2>Service History</h2>
          <div className="table-container">
            <table className="service-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>System</th>
                  <th>Work Completed</th>
                  <th>Status</th>
                  <th>Technician</th>
                </tr>
              </thead>
              <tbody>
                {serviceLogs.map(log => (
                  <tr key={log.id}>
                    <td>{new Date(log.date).toLocaleDateString()}</td>
                    <td>{log.type}</td>
                    <td>{log.system}</td>
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
          <div className="table-container">
            <table className="issues-table">
              <thead>
                <tr>
                  <th>Date Reported</th>
                  <th>System</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {issues.map(issue => (
                  <tr key={issue.id}>
                    <td>{new Date(issue.date).toLocaleDateString()}</td>
                    <td>{issue.system}</td>
                    <td>{issue.description}</td>
                    <td>
                      <span className={`priority-pill ${issue.priority}`}>
                        {issue.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill ${issue.status}`}>
                        {issue.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Document Upload Section */}
        <section className="documents-section">
          <h2>Service Documents</h2>
          <div className="upload-area">
            <div className="upload-box">
              <FaUpload />
              <p>Drop service reports here or click to upload</p>
              <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
            </div>
            <div className="documents-list">
              {/* Document list would go here */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeatingCooling; 