import React, { useState } from 'react';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaHeartbeat, FaBatteryFull, FaBatteryHalf, FaBatteryQuarter } from 'react-icons/fa';
import './Defibrillators.css';

const Defibrillators = () => {
  const [devices] = useState([
    {
      id: 1,
      location: 'Main Reception',
      model: 'HeartStart FRx',
      serialNumber: 'HS2024001',
      batteryStatus: 'full',
      padStatus: 'valid',
      lastServiced: '2024-02-15',
      nextService: '2024-08-15',
      status: 'operational',
      inspector: 'John Smith',
      notes: 'Monthly check completed, all systems functional'
    },
    {
      id: 2,
      location: 'Gym Area',
      model: 'HeartStart FRx',
      serialNumber: 'HS2024002',
      batteryStatus: 'low',
      padStatus: 'expires_soon',
      lastServiced: '2024-01-10',
      nextService: '2024-07-10',
      status: 'needs_service',
      inspector: 'Sarah Johnson',
      notes: 'Battery replacement due, pads expire in 30 days'
    }
  ]);

  const getBatteryIcon = (status) => {
    switch (status) {
      case 'full':
        return <FaBatteryFull className="battery-icon full" />;
      case 'medium':
        return <FaBatteryHalf className="battery-icon medium" />;
      case 'low':
        return <FaBatteryQuarter className="battery-icon low" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <FaCheck className="status-icon operational" />;
      case 'needs_service':
        return <FaExclamationTriangle className="status-icon needs-service" />;
      case 'in_service':
        return <FaClock className="status-icon in-service" />;
      default:
        return null;
    }
  };

  return (
    <div className="defibrillators-page">
      <div className="content-header">
        <h1>Defibrillators (AED)</h1>
        <button className="action-button">
          <FaUpload /> Upload Report
        </button>
      </div>

      {/* Status Overview */}
      <div className="status-overview">
        <div className="status-card">
          <div className="status-icon">
            <FaHeartbeat />
          </div>
          <div className="status-details">
            <h3>AED Status</h3>
            <p>Last Inspection: February 15, 2024</p>
            <span className="status-badge warning">
              <FaExclamationTriangle /> 1 Device Needs Service
            </span>
          </div>
        </div>
      </div>

      {/* Defibrillators Table */}
      <section className="devices-section">
        <h2>AED Locations & Status</h2>
        <div className="table-container">
          <table className="devices-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Model</th>
                <th>Serial Number</th>
                <th>Battery</th>
                <th>Pads Status</th>
                <th>Last Serviced</th>
                <th>Next Service</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {devices.map(device => (
                <tr key={device.id}>
                  <td>{device.location}</td>
                  <td>{device.model}</td>
                  <td>{device.serialNumber}</td>
                  <td>
                    <span className={`battery-status ${device.batteryStatus}`}>
                      {getBatteryIcon(device.batteryStatus)}
                      {device.batteryStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${device.padStatus}`}>
                      {device.padStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{new Date(device.lastServiced).toLocaleDateString()}</td>
                  <td>{new Date(device.nextService).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-pill ${device.status}`}>
                      {getStatusIcon(device.status)}
                      {device.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{device.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Maintenance Schedule */}
      <section className="maintenance-section">
        <h2>Maintenance Schedule</h2>
        <div className="schedule-grid">
          <div className="schedule-card">
            <div className="schedule-header">
              <h3>Upcoming Services</h3>
              <span className="status-pill scheduled">
                <FaClock /> Scheduled
              </span>
            </div>
            <ul className="schedule-items">
              <li>Battery Replacement - Gym Area AED (Due: July 10, 2024)</li>
              <li>Pad Replacement - Gym Area AED (Due: April 15, 2024)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="documents-section">
        <h2>Service Records</h2>
        <div className="upload-area">
          <div className="upload-box">
            <FaUpload />
            <p>Drop service reports or certifications here</p>
            <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Defibrillators; 