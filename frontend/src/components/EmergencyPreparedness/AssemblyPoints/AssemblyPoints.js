import React, { useState } from 'react';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import './AssemblyPoints.css';

const AssemblyPoints = () => {
  const [points] = useState([
    {
      id: 1,
      location: 'Car Park A',
      capacity: 150,
      lastInspected: '2024-03-10',
      nextInspection: '2024-04-10',
      status: 'clear',
      inspector: 'John Smith',
      notes: 'Area clearly marked and signposted'
    },
    {
      id: 2,
      location: 'Front Garden',
      capacity: 75,
      lastInspected: '2024-03-10',
      nextInspection: '2024-04-10',
      status: 'maintenance',
      inspector: 'John Smith',
      notes: 'Lighting needs repair, temporary signage in place'
    },
    {
      id: 3,
      location: 'Side Street B',
      capacity: 100,
      lastInspected: '2024-03-10',
      nextInspection: '2024-04-10',
      status: 'clear',
      inspector: 'John Smith',
      notes: 'New assembly point signs installed'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'clear':
        return <FaCheck className="status-icon clear" />;
      case 'maintenance':
        return <FaClock className="status-icon maintenance" />;
      case 'blocked':
        return <FaExclamationTriangle className="status-icon blocked" />;
      default:
        return null;
    }
  };

  return (
    <div className="assembly-points-page">
      <div className="content-header">
        <h1>Assembly Points</h1>
        <button className="action-button">
          <FaUpload /> Upload Map
        </button>
      </div>

      {/* Status Overview */}
      <div className="status-overview">
        <div className="status-card">
          <div className="status-icon">
            <FaMapMarkerAlt />
          </div>
          <div className="status-details">
            <h3>Assembly Points Status</h3>
            <p>Last Inspection: March 10, 2024</p>
            <span className="status-badge warning">
              <FaClock /> 1 Point Needs Maintenance
            </span>
          </div>
        </div>
      </div>

      {/* Assembly Points Table */}
      <section className="points-section">
        <h2>Assembly Point Locations</h2>
        <div className="table-container">
          <table className="points-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Capacity</th>
                <th>Last Inspected</th>
                <th>Next Inspection</th>
                <th>Status</th>
                <th>Inspector</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {points.map(point => (
                <tr key={point.id}>
                  <td>{point.location}</td>
                  <td>{point.capacity} people</td>
                  <td>{new Date(point.lastInspected).toLocaleDateString()}</td>
                  <td>{new Date(point.nextInspection).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-pill ${point.status}`}>
                      {getStatusIcon(point.status)}
                      {point.status}
                    </span>
                  </td>
                  <td>{point.inspector}</td>
                  <td>{point.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Location Map */}
      <section className="map-section">
        <h2>Assembly Point Map</h2>
        <div className="map-container">
          <div className="map-placeholder">
            <FaMapMarkerAlt />
            <p>Click to view or upload assembly point location map</p>
          </div>
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="documents-section">
        <h2>Documentation</h2>
        <div className="upload-area">
          <div className="upload-box">
            <FaUpload />
            <p>Drop location maps or inspection reports here</p>
            <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssemblyPoints; 