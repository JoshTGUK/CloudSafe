import React, { useState } from 'react';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock } from 'react-icons/fa';
import '../shared/MaintenanceStyles.css';
import './PlumbingSystems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const PlumbingSystems = ({ propertyId }) => {
  const [status] = useState('good'); // good, warning, critical
  const [lastInspection] = useState('2024-03-15');
  const [nextDue] = useState('2024-06-15');
  
  const [inspections] = useState([
    {
      id: 1,
      date: '2024-03-15',
      type: 'Quarterly Check',
      findings: 'All systems operational',
      status: 'good',
      inspector: 'John Smith'
    },
    {
      id: 2,
      date: '2024-02-01',
      type: 'Emergency Repair',
      findings: 'Fixed leak in basement',
      status: 'completed',
      inspector: 'Mike Johnson'
    }
  ]);

  return (
    <div className="plumbing-systems">
      <div className="page-header">
        <div className="header-content">
          <h1>Plumbing Systems</h1>
          <p>Monitor and maintain plumbing infrastructure</p>
        </div>
        <button className="action-button">
          <FontAwesomeIcon icon={faPlus} />
          Add New Inspection
        </button>
      </div>

      {/* Status Cards */}
      <div className="status-grid">
        <div className="status-card">
          <h3>System Status</h3>
          <p className={`status-badge ${status}`}>
            {status === 'good' && <FaCheck />}
            {status === 'warning' && <FaClock />}
            {status === 'critical' && <FaExclamationTriangle />}
            {status.charAt(0).toUpperCase() + status.slice(1)}
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

      {/* Inspection Log */}
      <section className="inspection-section">
        <h2>Inspection Log</h2>
        <div className="table-container">
          <table className="inspection-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Findings</th>
                <th>Status</th>
                <th>Inspector</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map(inspection => (
                <tr key={inspection.id}>
                  <td>{new Date(inspection.date).toLocaleDateString()}</td>
                  <td>{inspection.type}</td>
                  <td>{inspection.findings}</td>
                  <td>
                    <span className={`status-pill ${inspection.status}`}>
                      {inspection.status}
                    </span>
                  </td>
                  <td>{inspection.inspector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="documents-section">
        <h2>Certificates & Documents</h2>
        <div className="upload-area">
          <div className="upload-box">
            <FaUpload />
            <p>Drop files here or click to upload</p>
            <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlumbingSystems; 