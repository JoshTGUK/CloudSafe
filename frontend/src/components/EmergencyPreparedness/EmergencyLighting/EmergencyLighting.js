import React, { useState } from 'react';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaLightbulb } from 'react-icons/fa';
import './EmergencyLighting.css';

const EmergencyLighting = () => {
  const [inspections] = useState([
    {
      id: 1,
      date: '2024-03-10',
      location: 'Main Stairwell',
      type: 'Monthly Test',
      status: 'working',
      inspector: 'John Smith',
      notes: 'All lights functioning correctly'
    },
    {
      id: 2,
      date: '2024-03-10',
      location: 'Emergency Exit A',
      type: 'Monthly Test',
      status: 'needs_repair',
      inspector: 'John Smith',
      notes: 'Battery replacement required'
    }
  ]);

  const [certificates] = useState([
    {
      id: 1,
      type: 'Annual Certification',
      issueDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'valid'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'working':
        return <FaCheck className="status-icon working" />;
      case 'needs_repair':
        return <FaExclamationTriangle className="status-icon needs-repair" />;
      case 'scheduled':
        return <FaClock className="status-icon scheduled" />;
      default:
        return null;
    }
  };

  return (
    <div className="emergency-lighting-page">
      <div className="content-header">
        <h1>Emergency Lighting</h1>
        <button className="action-button">
          <FaUpload /> Upload Certificate
        </button>
      </div>

      {/* Status Overview */}
      <div className="status-overview">
        <div className="status-card">
          <div className="status-icon">
            <FaLightbulb />
          </div>
          <div className="status-details">
            <h3>System Status</h3>
            <p>Last Inspection: March 10, 2024</p>
            <span className="status-badge working">
              <FaCheck /> Operational
            </span>
          </div>
        </div>
      </div>

      {/* Inspections Table */}
      <section className="inspections-section">
        <h2>Recent Inspections</h2>
        <div className="table-container">
          <table className="inspections-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Location</th>
                <th>Type</th>
                <th>Status</th>
                <th>Inspector</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map(inspection => (
                <tr key={inspection.id}>
                  <td>{new Date(inspection.date).toLocaleDateString()}</td>
                  <td>{inspection.location}</td>
                  <td>{inspection.type}</td>
                  <td>
                    <span className={`status-pill ${inspection.status}`}>
                      {getStatusIcon(inspection.status)}
                      {inspection.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{inspection.inspector}</td>
                  <td>{inspection.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="certificates-section">
        <h2>Compliance Certificates</h2>
        <div className="certificates-grid">
          {certificates.map(cert => (
            <div key={cert.id} className="certificate-card">
              <div className="certificate-header">
                <h3>{cert.type}</h3>
                <span className={`status-pill ${cert.status}`}>
                  <FaCheck /> Valid
                </span>
              </div>
              <div className="certificate-details">
                <p><strong>Issued:</strong> {new Date(cert.issueDate).toLocaleDateString()}</p>
                <p><strong>Expires:</strong> {new Date(cert.expiryDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="documents-section">
        <h2>Documentation</h2>
        <div className="upload-area">
          <div className="upload-box">
            <FaUpload />
            <p>Drop inspection reports or certificates here</p>
            <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmergencyLighting; 