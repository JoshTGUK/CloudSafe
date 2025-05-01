import React, { useState } from 'react';
import MainHeader from '../../common/MainHeader/MainHeader';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaArrowUp } from 'react-icons/fa';
import '../shared/MaintenanceStyles.css';
import './LiftMaintenance.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const LiftMaintenance = ({ hideHeader }) => {
  const [certificationStatus] = useState('valid');
  const [lastInspection] = useState('2024-03-15');
  const [nextDue] = useState('2024-06-15');
  
  const [maintenanceLogs] = useState([
    {
      id: 1,
      date: '2024-03-15',
      liftId: 'LIFT-001',
      type: 'LOLER Inspection',
      findings: 'All safety systems operational',
      status: 'passed',
      inspector: 'John Smith'
    },
    {
      id: 2,
      date: '2024-02-01',
      liftId: 'LIFT-002',
      type: 'Quarterly Service',
      findings: 'Routine maintenance completed',
      status: 'completed',
      inspector: 'Mike Johnson'
    }
  ]);

  const [certificates] = useState([
    {
      id: 1,
      name: 'LOLER Certificate 2024',
      date: '2024-03-15',
      expiry: '2024-09-15',
      status: 'active'
    }
  ]);

  return (
    <div className="lift-maintenance">
      <div className="page-header">
        <div className="header-content">
          <h1>Lift Maintenance</h1>
          <p>Monitor and maintain lift systems</p>
        </div>
        <button className="action-button">
          <FontAwesomeIcon icon={faPlus} />
          Add New Inspection
        </button>
      </div>

      {/* Status Cards */}
      <div className="status-grid">
        <div className="status-card">
          <h3>Certification Status</h3>
          <p className={`status-badge ${certificationStatus}`}>
            <FaArrowUp />
            {certificationStatus === 'valid' && 'Valid'}
            {certificationStatus === 'expiring' && 'Expiring Soon'}
            {certificationStatus === 'expired' && 'Expired'}
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
        <h2>Maintenance Log</h2>
        <div className="table-container">
          <table className="maintenance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Lift ID</th>
                <th>Type</th>
                <th>Findings</th>
                <th>Status</th>
                <th>Inspector</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceLogs.map(log => (
                <tr key={log.id}>
                  <td>{new Date(log.date).toLocaleDateString()}</td>
                  <td>{log.liftId}</td>
                  <td>{log.type}</td>
                  <td>{log.findings}</td>
                  <td>
                    <span className={`status-pill ${log.status}`}>
                      {log.status}
                    </span>
                  </td>
                  <td>{log.inspector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="certificates-section">
        <h2>LOLER Certificates</h2>
        <div className="certificates-grid">
          {certificates.map(cert => (
            <div key={cert.id} className="certificate-card">
              <div className="certificate-icon">
                <FaCheck />
              </div>
              <div className="certificate-details">
                <h3>{cert.name}</h3>
                <p>Issued: {new Date(cert.date).toLocaleDateString()}</p>
                <p>Expires: {new Date(cert.expiry).toLocaleDateString()}</p>
                <span className={`status-pill ${cert.status}`}>
                  {cert.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="documents-section">
        <h2>Upload Certificates</h2>
        <div className="upload-area">
          <div className="upload-box">
            <FaUpload />
            <p>Drop LOLER certificates here or click to upload</p>
            <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiftMaintenance; 