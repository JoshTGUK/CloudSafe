import React, { useState } from 'react';
import MainHeader from '../../common/MainHeader/MainHeader';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaPaintRoller, FaTools } from 'react-icons/fa';
import '../shared/MaintenanceStyles.css';
import './PaintingRepairs.css';

const PaintingRepairs = ({ hideHeader }) => {
  const [status] = useState('good');
  const [lastPainting] = useState('2023-12-15');
  const [nextScheduled] = useState('2024-06-15');
  
  const [maintenanceLogs] = useState([
    {
      id: 1,
      date: '2023-12-15',
      type: 'Interior Painting',
      location: 'Main Reception',
      work: 'Full repaint and wall repairs',
      contractor: 'Premier Painters Ltd',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-02-01',
      type: 'Surface Repair',
      location: 'West Wing Corridor',
      work: 'Wall crack repairs and touch-up',
      contractor: 'BuildFix Solutions',
      status: 'completed'
    }
  ]);

  const [scheduledWork] = useState([
    {
      id: 1,
      scheduled: '2024-06-15',
      type: 'Exterior Painting',
      location: 'Building Façade',
      scope: 'Full exterior repaint',
      contractor: 'Premier Painters Ltd',
      status: 'scheduled'
    }
  ]);

  return (
    <div className="maintenance-page">
      {!hideHeader && <MainHeader />}
      <div className="maintenance-content">
        <div className="content-header">
          <h1>Painting & Repairs</h1>
          <button className="action-button">
            <FaUpload /> Upload Report
          </button>
        </div>

        {/* Status Cards */}
        <div className="status-grid">
          <div className="status-card">
            <h3>Maintenance Status</h3>
            <p className={`status-badge ${status}`}>
              <FaPaintRoller />
              {status === 'good' && 'Up to Date'}
              {status === 'warning' && 'Due Soon'}
              {status === 'critical' && 'Overdue'}
            </p>
          </div>
          <div className="status-card">
            <h3>Last Major Work</h3>
            <p>{new Date(lastPainting).toLocaleDateString()}</p>
          </div>
          <div className="status-card">
            <h3>Next Scheduled</h3>
            <p>{new Date(nextScheduled).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Maintenance History */}
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
                  <th>Contractor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceLogs.map(log => (
                  <tr key={log.id}>
                    <td>{new Date(log.date).toLocaleDateString()}</td>
                    <td>{log.type}</td>
                    <td>{log.location}</td>
                    <td>{log.work}</td>
                    <td>{log.contractor}</td>
                    <td>
                      <span className={`status-pill ${log.status}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Scheduled Work */}
        <section className="scheduled-section">
          <h2>Scheduled Work</h2>
          <div className="scheduled-grid">
            {scheduledWork.map(work => (
              <div key={work.id} className="scheduled-card">
                <div className="scheduled-header">
                  <div className="work-type">
                    {work.type.includes('Painting') ? <FaPaintRoller /> : <FaTools />}
                    <h3>{work.location}</h3>
                  </div>
                  <span className={`status-pill ${work.status}`}>
                    {work.status}
                  </span>
                </div>
                <div className="scheduled-details">
                  <p><strong>Type:</strong> {work.type}</p>
                  <p><strong>Scheduled:</strong> {new Date(work.scheduled).toLocaleDateString()}</p>
                  <p><strong>Scope:</strong> {work.scope}</p>
                  <p><strong>Contractor:</strong> {work.contractor}</p>
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
              <p>Drop completion reports or photos here</p>
              <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaintingRepairs; 