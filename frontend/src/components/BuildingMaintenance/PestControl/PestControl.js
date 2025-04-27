import React, { useState } from 'react';
import MainHeader from '../../common/MainHeader/MainHeader';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaBug } from 'react-icons/fa';
import '../shared/MaintenanceStyles.css';
import './PestControl.css';

const PestControl = ({ hideHeader }) => {
  const [status] = useState('good');
  const [lastTreatment] = useState('2024-03-05');
  const [nextService] = useState('2024-06-05');
  
  const [treatments] = useState([
    {
      id: 1,
      date: '2024-03-05',
      type: 'Preventive Treatment',
      areas: ['Ground Floor', 'Kitchen Area'],
      contractor: 'SafePest Solutions',
      findings: 'No active infestations found',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-02-01',
      type: 'Routine Inspection',
      areas: ['All Floors'],
      contractor: 'SafePest Solutions',
      findings: 'All areas clear',
      status: 'completed'
    }
  ]);

  const [activeIssues] = useState([
    {
      id: 1,
      reported: '2024-03-10',
      area: 'Storage Room B',
      type: 'Rodent Activity',
      severity: 'medium',
      status: 'scheduled',
      treatment: 'Scheduled for March 15, 2024'
    }
  ]);

  return (
    <div className="maintenance-page">
      {!hideHeader && <MainHeader />}
      <div className="maintenance-content">
        <div className="content-header">
          <h1>Pest Control Management</h1>
          <button className="action-button">
            <FaUpload /> Upload Report
          </button>
        </div>

        {/* Status Cards */}
        <div className="status-grid">
          <div className="status-card">
            <h3>Current Status</h3>
            <p className={`status-badge ${status}`}>
              <FaBug />
              {status === 'good' && 'No Active Issues'}
              {status === 'warning' && 'Treatment Due'}
              {status === 'critical' && 'Requires Attention'}
            </p>
          </div>
          <div className="status-card">
            <h3>Last Treatment</h3>
            <p>{new Date(lastTreatment).toLocaleDateString()}</p>
          </div>
          <div className="status-card">
            <h3>Next Service</h3>
            <p>{new Date(nextService).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Treatment History */}
        <section className="treatment-section">
          <h2>Treatment History</h2>
          <div className="table-container">
            <table className="treatment-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Areas Treated</th>
                  <th>Contractor</th>
                  <th>Findings</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {treatments.map(treatment => (
                  <tr key={treatment.id}>
                    <td>{new Date(treatment.date).toLocaleDateString()}</td>
                    <td>{treatment.type}</td>
                    <td>{treatment.areas.join(', ')}</td>
                    <td>{treatment.contractor}</td>
                    <td>{treatment.findings}</td>
                    <td>
                      <span className={`status-pill ${treatment.status}`}>
                        {treatment.status}
                      </span>
                    </td>
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
            {activeIssues.map(issue => (
              <div key={issue.id} className="issue-card">
                <div className="issue-header">
                  <h3>{issue.area}</h3>
                  <span className={`severity-pill ${issue.severity}`}>
                    {issue.severity}
                  </span>
                </div>
                <div className="issue-details">
                  <p><strong>Type:</strong> {issue.type}</p>
                  <p><strong>Reported:</strong> {new Date(issue.reported).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> 
                    <span className={`status-pill ${issue.status}`}>
                      {issue.status}
                    </span>
                  </p>
                  <p><strong>Treatment:</strong> {issue.treatment}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Document Upload Section */}
        <section className="documents-section">
          <h2>Treatment Reports</h2>
          <div className="upload-area">
            <div className="upload-box">
              <FaUpload />
              <p>Drop pest control reports here or click to upload</p>
              <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PestControl; 