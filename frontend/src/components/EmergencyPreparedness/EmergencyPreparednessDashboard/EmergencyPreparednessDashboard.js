import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb,
  faRunning,
  faMapMarkerAlt,
  faClipboardList,
  faHeartbeat,
  faExclamationTriangle,
  faCalendar,
  faBell,
  faFireExtinguisher,
  faFirstAid
} from '@fortawesome/free-solid-svg-icons';
import './EmergencyPreparednessDashboard.css';

const stats = [
  {
    key: 'lighting',
    label: 'Emergency Lighting',
    icon: faLightbulb,
    total: 32,
    failed: 3,
    status: 'warning',
  },
  {
    key: 'escape',
    label: 'Escape Routes',
    icon: faRunning,
    total: 12,
    failed: 0,
    status: 'good',
  },
  {
    key: 'assembly',
    label: 'Assembly Points',
    icon: faMapMarkerAlt,
    total: 8,
    failed: 0,
    status: 'good',
  },
  {
    key: 'plans',
    label: 'Emergency Plans',
    icon: faClipboardList,
    total: 15,
    failed: 2,
    status: 'warning',
  },
  {
    key: 'defibrillators',
    label: 'Defibrillators',
    icon: faHeartbeat,
    total: 6,
    failed: 1,
    status: 'warning',
  },
  {
    key: 'incidents',
    label: 'Incident Reports',
    icon: faExclamationTriangle,
    total: 24,
    failed: 0,
    status: 'good',
  },
  {
    key: 'fire-drills',
    label: 'Fire Drills',
    icon: faFireExtinguisher,
    total: 4,
    failed: 0,
    status: 'good',
  },
  {
    key: 'first-aid',
    label: 'First Aid Kits',
    icon: faFirstAid,
    total: 12,
    failed: 1,
    status: 'warning',
  }
];

const EmergencyPreparednessDashboard = () => {
  const attentionItems = stats.filter(item => item.failed > 0);

  return (
    <>
      <div className="dashboard-header-row">
        <h2 className="dashboard-title">Emergency Preparedness Dashboard</h2>
        <div className="dashboard-actions">
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faBell} /> View Alerts
          </button>
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faCalendar} /> Schedule Inspection
          </button>
        </div>
      </div>

      <div className="dashboard-cards-grid">
        {stats.map((item) => (
          <div key={item.key} className={`dashboard-card ${item.status}`}>
            <div className="dashboard-card-icon">
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <div className="dashboard-card-info">
              <div className="dashboard-card-label">{item.label}</div>
              <div className="dashboard-card-numbers">
                <span className="dashboard-card-total">{item.total}</span>
                {item.failed > 0 && (
                  <span className="dashboard-card-failed">{item.failed} Failed</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-bottom-panels">
        <div className="dashboard-panel attention-panel">
          <div className="panel-title">
            <FontAwesomeIcon icon={faExclamationTriangle} /> Required Attention
          </div>
          {attentionItems.length > 0 ? (
            <ul className="attention-list">
              {attentionItems.map(item => (
                <li key={item.key}>
                  <FontAwesomeIcon icon={item.icon} className="attention-icon" />
                  <span className="attention-label">{item.label}:</span>
                  <span className="attention-failed">{item.failed} Failed</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-issues">All systems are operational. No issues require attention.</div>
          )}
        </div>

        <div className="dashboard-panel next-inspection-panel">
          <div className="panel-title">
            <FontAwesomeIcon icon={faCalendar} /> Next Inspection
          </div>
          <div className="next-inspection-details">
            <span className="next-inspection-date">Next scheduled inspection: <b>March 15, 2024</b></span>
            <button className="btn btn-primary btn-small">
              <FontAwesomeIcon icon={faCalendar} /> Schedule Inspection
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmergencyPreparednessDashboard; 