import React, { useState } from 'react';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaRunning, FaMapMarkedAlt } from 'react-icons/fa';
import './EscapeRoutes.css';

const EscapeRoutes = () => {
  const [routes] = useState([
    {
      id: 1,
      location: 'Main Entrance',
      lastInspected: '2024-03-10',
      nextInspection: '2024-04-10',
      status: 'clear',
      inspector: 'John Smith',
      notes: 'All exit signs illuminated and paths clear'
    },
    {
      id: 2,
      location: 'Emergency Exit A',
      lastInspected: '2024-03-10',
      nextInspection: '2024-04-10',
      status: 'blocked',
      inspector: 'John Smith',
      notes: 'Construction materials blocking access - requires immediate clearance'
    },
    {
      id: 3,
      location: 'Fire Escape B',
      lastInspected: '2024-03-10',
      nextInspection: '2024-04-10',
      status: 'clear',
      inspector: 'John Smith',
      notes: 'Regular maintenance completed'
    }
  ]);

  const [maps] = useState([
    {
      id: 1,
      name: 'Ground Floor Escape Plan',
      lastUpdated: '2024-01-15',
      status: 'current'
    },
    {
      id: 2,
      name: 'First Floor Escape Plan',
      lastUpdated: '2024-01-15',
      status: 'current'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'clear':
        return <FaCheck className="status-icon clear" />;
      case 'blocked':
        return <FaExclamationTriangle className="status-icon blocked" />;
      case 'maintenance':
        return <FaClock className="status-icon maintenance" />;
      default:
        return null;
    }
  };

  return (
    <div className="escape-routes-page">
      <div className="content-header">
        <h1>Escape Routes</h1>
        <button className="action-button">
          <FaUpload /> Upload Map
        </button>
      </div>

      {/* Status Overview */}
      <div className="status-overview">
        <div className="status-card">
          <div className="status-icon">
            <FaRunning />
          </div>
          <div className="status-details">
            <h3>Routes Status</h3>
            <p>Last Inspection: March 10, 2024</p>
            <span className="status-badge warning">
              <FaExclamationTriangle /> 1 Route Blocked
            </span>
          </div>
        </div>
      </div>

      {/* Routes Table */}
      <section className="routes-section">
        <h2>Escape Routes Status</h2>
        <div className="table-container">
          <table className="routes-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Last Inspected</th>
                <th>Next Inspection</th>
                <th>Status</th>
                <th>Inspector</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {routes.map(route => (
                <tr key={route.id}>
                  <td>{route.location}</td>
                  <td>{new Date(route.lastInspected).toLocaleDateString()}</td>
                  <td>{new Date(route.nextInspection).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-pill ${route.status}`}>
                      {getStatusIcon(route.status)}
                      {route.status}
                    </span>
                  </td>
                  <td>{route.inspector}</td>
                  <td>{route.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Escape Plans */}
      <section className="plans-section">
        <h2>Escape Plans</h2>
        <div className="plans-grid">
          {maps.map(map => (
            <div key={map.id} className="plan-card">
              <div className="plan-icon">
                <FaMapMarkedAlt />
              </div>
              <div className="plan-details">
                <h3>{map.name}</h3>
                <p>Last Updated: {new Date(map.lastUpdated).toLocaleDateString()}</p>
                <span className={`status-pill ${map.status}`}>
                  <FaCheck /> Current
                </span>
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
            <p>Drop escape route plans or inspection reports here</p>
            <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EscapeRoutes; 