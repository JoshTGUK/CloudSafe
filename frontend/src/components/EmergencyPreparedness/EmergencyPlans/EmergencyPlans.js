import React, { useState } from 'react';
import { FaUpload, FaCheck, FaExclamationTriangle, FaClock, FaClipboardList, FaHistory } from 'react-icons/fa';
import './EmergencyPlans.css';

const EmergencyPlans = () => {
  const [plans] = useState([
    {
      id: 1,
      name: 'Fire Emergency Response Plan',
      version: '2.1',
      lastUpdated: '2024-02-15',
      nextReview: '2024-08-15',
      status: 'current',
      reviewer: 'John Smith',
      notes: 'Updated evacuation procedures for new building layout'
    },
    {
      id: 2,
      name: 'Medical Emergency Plan',
      version: '1.3',
      lastUpdated: '2024-01-10',
      nextReview: '2024-07-10',
      status: 'needs_update',
      reviewer: 'Sarah Johnson',
      notes: 'Requires update to include new first aid locations'
    },
    {
      id: 3,
      name: 'Natural Disaster Response',
      version: '1.0',
      lastUpdated: '2024-03-01',
      nextReview: '2024-09-01',
      status: 'current',
      reviewer: 'Mike Brown',
      notes: 'Initial version implemented'
    }
  ]);

  const [revisions] = useState([
    {
      id: 1,
      planId: 1,
      version: '2.1',
      date: '2024-02-15',
      author: 'John Smith',
      changes: 'Updated evacuation routes and assembly points'
    },
    {
      id: 2,
      planId: 1,
      version: '2.0',
      date: '2023-08-15',
      author: 'John Smith',
      changes: 'Major revision of emergency procedures'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'current':
        return <FaCheck className="status-icon current" />;
      case 'needs_update':
        return <FaExclamationTriangle className="status-icon needs-update" />;
      case 'in_review':
        return <FaClock className="status-icon in-review" />;
      default:
        return null;
    }
  };

  return (
    <div className="emergency-plans-page">
      <div className="content-header">
        <h1>Emergency Plans</h1>
        <button className="action-button">
          <FaUpload /> Upload Plan
        </button>
      </div>

      {/* Status Overview */}
      <div className="status-overview">
        <div className="status-card">
          <div className="status-icon">
            <FaClipboardList />
          </div>
          <div className="status-details">
            <h3>Plans Status</h3>
            <p>Last Review: February 15, 2024</p>
            <span className="status-badge warning">
              <FaExclamationTriangle /> 1 Plan Needs Update
            </span>
          </div>
        </div>
      </div>

      {/* Emergency Plans Table */}
      <section className="plans-section">
        <h2>Emergency Response Plans</h2>
        <div className="table-container">
          <table className="plans-table">
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Version</th>
                <th>Last Updated</th>
                <th>Next Review</th>
                <th>Status</th>
                <th>Reviewer</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.name}</td>
                  <td>v{plan.version}</td>
                  <td>{new Date(plan.lastUpdated).toLocaleDateString()}</td>
                  <td>{new Date(plan.nextReview).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-pill ${plan.status}`}>
                      {getStatusIcon(plan.status)}
                      {plan.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{plan.reviewer}</td>
                  <td>{plan.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Version History */}
      <section className="history-section">
        <h2>Version History</h2>
        <div className="history-grid">
          {revisions.map(revision => (
            <div key={revision.id} className="history-card">
              <div className="history-icon">
                <FaHistory />
              </div>
              <div className="history-details">
                <h3>Version {revision.version}</h3>
                <p className="history-date">{new Date(revision.date).toLocaleDateString()}</p>
                <p className="history-author">Updated by: {revision.author}</p>
                <p className="history-changes">{revision.changes}</p>
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
            <p>Drop emergency plans or revisions here</p>
            <span>Accepted formats: PDF, DOC, DOCX (max 10MB)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmergencyPlans; 