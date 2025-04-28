import React, { useState } from 'react';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock } from 'react-icons/fa';
import './FireDrills.css';

const FireDrills = () => {
  const [drills] = useState([
    {
      id: 1,
      date: '2024-03-15',
      type: 'Planned Evacuation',
      participants: 45,
      evacuationTime: '3:15',
      status: 'completed',
      notes: 'All occupants evacuated successfully. Minor congestion at stairwell B.'
    },
    {
      id: 2,
      date: '2024-06-15',
      type: 'Unannounced Drill',
      status: 'scheduled'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheck className="status-icon completed" />;
      case 'scheduled':
        return <FaClock className="status-icon scheduled" />;
      case 'overdue':
        return <FaExclamationTriangle className="status-icon overdue" />;
      default:
        return null;
    }
  };

  return (
    <div className="fire-drills-container">
      <h2>Fire Drills</h2>
      <div className="content-header">
        <h1>Fire Drills</h1>
        <button className="action-button">
          <FaUpload /> Upload Report
        </button>
      </div>

      {/* Status Overview */}
      <div className="status-overview">
        <div className="status-card">
          <h3>Next Scheduled Drill</h3>
          <p>June 15, 2024</p>
          <span className="status-badge scheduled">
            <FaClock /> Scheduled
          </span>
        </div>
      </div>

      {/* Drills Table */}
      <section className="drills-section">
        <h2>Drill History</h2>
        <div className="table-container">
          <table className="drills-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Participants</th>
                <th>Evacuation Time</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {drills.map(drill => (
                <tr key={drill.id}>
                  <td>{new Date(drill.date).toLocaleDateString()}</td>
                  <td>{drill.type}</td>
                  <td>{drill.participants || '-'}</td>
                  <td>{drill.evacuationTime || '-'}</td>
                  <td>
                    <span className={`status-pill ${drill.status}`}>
                      {getStatusIcon(drill.status)}
                      {drill.status}
                    </span>
                  </td>
                  <td>{drill.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="documents-section">
        <h2>Drill Reports & Documentation</h2>
        <div className="upload-area">
          <div className="upload-box">
            <FaUpload />
            <p>Drop evaluation reports here or click to upload</p>
            <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FireDrills; 