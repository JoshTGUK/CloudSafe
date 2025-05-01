import React, { useState } from 'react';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaBuilding, FaPlus } from 'react-icons/fa';
import '../shared/MaintenanceStyles.css';
import './FacadeMaintenance.css';

const FacadeMaintenance = ({ propertyId }) => {
  const [facadeStatus] = useState('monitoring');
  const [lastAssessment] = useState('2024-01-20');
  const [nextAssessment] = useState('2024-07-20');
  
  const [inspections] = useState([
    {
      id: 1,
      date: '2024-01-20',
      area: 'North Façade',
      type: 'External Wall Survey',
      findings: 'Minor cracks identified',
      status: 'monitoring',
      inspector: 'John Smith'
    },
    {
      id: 2,
      date: '2023-12-15',
      area: 'East Wing',
      type: 'Cladding Inspection',
      findings: 'All cladding secure and compliant',
      status: 'passed',
      inspector: 'Mike Johnson'
    }
  ]);

  const [maintenanceIssues] = useState([
    {
      id: 1,
      area: 'West Façade',
      issue: 'Surface cracking',
      severity: 'low',
      reported: '2024-02-01',
      status: 'monitoring',
      notes: 'Hairline cracks observed, monitoring for any changes'
    }
  ]);

  return (
    <div className="facade-maintenance">
      <div className="page-header">
        <div className="header-content">
          <h1>Facade & Walls</h1>
          <p>Monitor and maintain building exterior</p>
        </div>
        <button className="action-button">
          <FaPlus />
          Add New Inspection
        </button>
      </div>

      {/* Status Cards */}
      <div className="status-grid">
        <div className="status-card">
          <h3>Façade Status</h3>
          <p className={`status-badge ${facadeStatus}`}>
            <FaBuilding />
            {facadeStatus === 'good' && 'Good'}
            {facadeStatus === 'monitoring' && 'Under Monitoring'}
            {facadeStatus === 'critical' && 'Requires Repair'}
          </p>
        </div>
        <div className="status-card">
          <h3>Last Assessment</h3>
          <p>{new Date(lastAssessment).toLocaleDateString()}</p>
        </div>
        <div className="status-card">
          <h3>Next Assessment</h3>
          <p>{new Date(nextAssessment).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Inspection Log */}
      <section className="inspection-section">
        <h2>Assessment History</h2>
        <div className="table-container">
          <table className="inspection-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Area</th>
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
                  <td>{inspection.area}</td>
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

      {/* Maintenance Issues */}
      <section className="issues-section">
        <h2>Maintenance Issues</h2>
        <div className="issues-grid">
          {maintenanceIssues.map(issue => (
            <div key={issue.id} className="issue-card">
              <div className="issue-header">
                <h3>{issue.area}</h3>
                <span className={`severity-pill ${issue.severity}`}>
                  {issue.severity}
                </span>
              </div>
              <div className="issue-details">
                <p><strong>Issue:</strong> {issue.issue}</p>
                <p><strong>Reported:</strong> {new Date(issue.reported).toLocaleDateString()}</p>
                <p><strong>Status:</strong> 
                  <span className={`status-pill ${issue.status}`}>
                    {issue.status}
                  </span>
                </p>
                <p><strong>Notes:</strong> {issue.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="documents-section">
        <h2>Assessment Reports</h2>
        <div className="upload-area">
          <div className="upload-box">
            <FaUpload />
            <p>Drop assessment reports here or click to upload</p>
            <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacadeMaintenance; 