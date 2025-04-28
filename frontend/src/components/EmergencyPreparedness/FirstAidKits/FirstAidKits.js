import React, { useState } from 'react';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaFirstAid } from 'react-icons/fa';
import './FirstAidKits.css';

const FirstAidKits = () => {
  const [kits] = useState([
    {
      id: 1,
      location: 'Main Reception',
      lastChecked: '2024-03-15',
      nextCheck: '2024-04-15',
      stockStatus: 'ok',
      inspector: 'John Smith',
      notes: 'All supplies within expiry dates'
    },
    {
      id: 2,
      location: 'Kitchen Area',
      lastChecked: '2024-03-15',
      nextCheck: '2024-04-15',
      stockStatus: 'low_stock',
      inspector: 'John Smith',
      notes: 'Bandages and antiseptic wipes need replenishing'
    },
    {
      id: 3,
      location: 'Workshop',
      lastChecked: '2024-03-15',
      nextCheck: '2024-04-15',
      stockStatus: 'ok',
      inspector: 'John Smith',
      notes: 'Burn treatment supplies replaced'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ok':
        return <FaCheck className="status-icon ok" />;
      case 'low_stock':
        return <FaExclamationTriangle className="status-icon low-stock" />;
      case 'empty':
        return <FaExclamationTriangle className="status-icon empty" />;
      default:
        return null;
    }
  };

  return (
    <div className="first-aid-kits-container">
      <h2>First Aid Kits</h2>
      <div className="content-header">
        <button className="action-button">
          <FaUpload /> Upload Checklist
        </button>
      </div>

      {/* Status Overview */}
      <div className="status-overview">
        <div className="status-card">
          <div className="status-icon">
            <FaFirstAid />
          </div>
          <div className="status-details">
            <h3>Overall Status</h3>
            <p>Last Inspection: March 15, 2024</p>
            <span className="status-badge ok">
              <FaCheck /> All Kits Maintained
            </span>
          </div>
        </div>
      </div>

      {/* First Aid Kits Table */}
      <section className="kits-section">
        <h2>Kit Locations & Status</h2>
        <div className="table-container">
          <table className="kits-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Last Checked</th>
                <th>Next Check</th>
                <th>Stock Status</th>
                <th>Inspector</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {kits.map(kit => (
                <tr key={kit.id}>
                  <td>{kit.location}</td>
                  <td>{new Date(kit.lastChecked).toLocaleDateString()}</td>
                  <td>{new Date(kit.nextCheck).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-pill ${kit.stockStatus}`}>
                      {getStatusIcon(kit.stockStatus)}
                      {kit.stockStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{kit.inspector}</td>
                  <td>{kit.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Replenishment Checklist */}
      <section className="checklist-section">
        <h2>Replenishment Checklist</h2>
        <div className="checklist-grid">
          <div className="checklist-card">
            <div className="checklist-header">
              <h3>Required Items</h3>
              <span className="status-pill low_stock">
                <FaExclamationTriangle /> Needs Attention
              </span>
            </div>
            <ul className="checklist-items">
              <li>Bandages (Kitchen Kit)</li>
              <li>Antiseptic Wipes (Kitchen Kit)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="documents-section">
        <h2>Inspection Records</h2>
        <div className="upload-area">
          <div className="upload-box">
            <FaUpload />
            <p>Drop inspection checklists here</p>
            <span>Accepted formats: PDF, JPG, PNG (max 10MB)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FirstAidKits; 