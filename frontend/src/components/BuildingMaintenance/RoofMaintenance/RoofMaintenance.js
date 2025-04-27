import React, { useState } from 'react';
import MainHeader from '../../common/MainHeader/MainHeader';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaHome } from 'react-icons/fa';
import '../shared/MaintenanceStyles.css';
import './RoofMaintenance.css';

const RoofMaintenance = ({ hideHeader }) => {
  const [roofCondition] = useState('good');
  const [lastInspection] = useState('2024-02-15');
  const [nextDue] = useState('2024-05-15');
  
  const [inspections] = useState([
    {
      id: 1,
      date: '2024-02-15',
      type: 'Quarterly Inspection',
      area: 'Main Roof',
      findings: 'All gutters clear, no damage found',
      status: 'passed',
      inspector: 'John Smith'
    },
    {
      id: 2,
      date: '2024-01-10',
      type: 'Gutter Cleaning',
      area: 'North Wing',
      findings: 'Gutters cleaned and tested',
      status: 'completed',
      inspector: 'Mike Johnson'
    }
  ]);

  const [damageReports] = useState([
    {
      id: 1,
      area: 'South Wing',
      issue: 'Minor tile damage',
      reported: '2024-03-01',
      status: 'monitoring',
      comments: 'No immediate action required, will review in next inspection'
    }
  ]);

  return (
    <div className="maintenance-page">
      {!hideHeader && <MainHeader />}
      <div className="maintenance-content">
        <div className="content-header">
          <h1>Roof & Gutter Maintenance</h1>
          <button className="action-button">
            <FaUpload /> Upload Report
          </button>
        </div>

        {/* Status Cards */}
        <div className="status-grid">
          <div className="status-card">
            <h3>Roof Condition</h3>
            <p className={`status-badge ${roofCondition}`}>
              <FaHome />
              {roofCondition === 'good' && 'Good'}
              {roofCondition === 'warning' && 'Requires Attention'}
              {roofCondition === 'critical' && 'Immediate Action Required'}
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
          <h2>Inspection & Maintenance Log</h2>
          <div className="table-container">
            <table className="inspection-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Area</th>
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
                    <td>{inspection.area}</td>
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

        {/* Damage Reports */}
        <section className="damage-section">
          <h2>Damage Reports</h2>
          <div className="damage-grid">
            {damageReports.map(report => (
              <div key={report.id} className="damage-card">
                <div className="damage-header">
                  <h3>{report.area}</h3>
                  <span className={`status-pill ${report.status}`}>
                    {report.status}
                  </span>
                </div>
                <div className="damage-details">
                  <p><strong>Issue:</strong> {report.issue}</p>
                  <p><strong>Reported:</strong> {new Date(report.reported).toLocaleDateString()}</p>
                  <p><strong>Comments:</strong> {report.comments}</p>
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
    </div>
  );
};

export default RoofMaintenance; 