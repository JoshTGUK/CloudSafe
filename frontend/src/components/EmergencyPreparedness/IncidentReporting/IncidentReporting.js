import React, { useState } from 'react';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaExclamationCircle } from 'react-icons/fa';
import './IncidentReporting.css';

const IncidentReporting = () => {
  const [incidents] = useState([
    {
      id: 1,
      date: '2024-03-15',
      type: 'Fire Alarm Activation',
      location: 'Kitchen Area',
      description: 'Smoke detector activated due to cooking fumes',
      response: 'Building evacuated, fire service attendance, false alarm confirmed',
      status: 'closed',
      reporter: 'John Smith',
      reviewedBy: 'Sarah Johnson'
    },
    {
      id: 2,
      date: '2024-03-10',
      type: 'Medical Emergency',
      location: 'Main Reception',
      description: 'Visitor reported chest pain',
      response: 'First aid provided, ambulance called, patient transferred to hospital',
      status: 'under_review',
      reporter: 'Mike Brown',
      reviewedBy: 'Sarah Johnson'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <FaExclamationCircle className="status-icon open" />;
      case 'under_review':
        return <FaClock className="status-icon under-review" />;
      case 'closed':
        return <FaCheck className="status-icon closed" />;
      default:
        return null;
    }
  };

  return (
    <div className="incident-reporting-page">
      <div className="content-header">
        <h1>Incident Reporting</h1>
        <button className="action-button primary">
          <FaExclamationCircle /> Report New Incident
        </button>
      </div>

      {/* Status Overview */}
      <div className="status-overview">
        <div className="status-card">
          <div className="status-icon">
            <FaExclamationTriangle />
          </div>
          <div className="status-details">
            <h3>Incident Reports Status</h3>
            <p>Last Report: March 15, 2024</p>
            <span className="status-badge warning">
              <FaClock /> 1 Report Under Review
            </span>
          </div>
        </div>
      </div>

      {/* Incidents Table */}
      <section className="incidents-section">
        <h2>Recent Incidents</h2>
        <div className="table-container">
          <table className="incidents-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Location</th>
                <th>Description</th>
                <th>Response</th>
                <th>Status</th>
                <th>Reporter</th>
                <th>Reviewed By</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map(incident => (
                <tr key={incident.id}>
                  <td>{new Date(incident.date).toLocaleDateString()}</td>
                  <td>{incident.type}</td>
                  <td>{incident.location}</td>
                  <td>{incident.description}</td>
                  <td>{incident.response}</td>
                  <td>
                    <span className={`status-pill ${incident.status}`}>
                      {getStatusIcon(incident.status)}
                      {incident.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{incident.reporter}</td>
                  <td>{incident.reviewedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Report Form */}
      <section className="report-section">
        <h2>Quick Report Form</h2>
        <div className="report-form">
          <div className="form-row">
            <div className="form-group">
              <label>Incident Type</label>
              <select>
                <option value="">Select Type</option>
                <option value="fire">Fire Emergency</option>
                <option value="medical">Medical Emergency</option>
                <option value="security">Security Incident</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" placeholder="Enter incident location" />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Describe the incident..."></textarea>
          </div>
          <div className="form-group">
            <label>Response Taken</label>
            <textarea placeholder="Describe actions taken..."></textarea>
          </div>
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="documents-section">
        <h2>Supporting Documentation</h2>
        <div className="upload-area">
          <div className="upload-box">
            <FaUpload />
            <p>Drop incident reports or evidence here</p>
            <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IncidentReporting; 