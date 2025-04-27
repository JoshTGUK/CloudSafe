import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faTint,
    faLightbulb,
    faDoorOpen,
    faFireExtinguisher,
    faCloud,
    faThermometerHalf,
    faCalendar,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import './FireSafetyDashboard.css';

const stats = [
    {
        key: 'fireAlarms',
        label: 'Fire Alarms',
        icon: faBell,
        total: 24,
        failed: 2,
        status: 'warning',
    },
    {
        key: 'sprinklers',
        label: 'Sprinklers',
        icon: faTint,
        total: 18,
        failed: 1,
        status: 'good',
    },
    {
        key: 'emergencyLights',
        label: 'Emergency Lights',
        icon: faLightbulb,
        total: 32,
        failed: 1,
        status: 'good',
    },
    {
        key: 'fireDoors',
        label: 'Fire Doors',
        icon: faDoorOpen,
        total: 15,
        failed: 2,
        status: 'warning',
    },
    {
        key: 'fireExtinguishers',
        label: 'Fire Extinguishers',
        icon: faFireExtinguisher,
        total: 28,
        failed: 2,
        status: 'good',
    },
    {
        key: 'smokeDetectors',
        label: 'Smoke Detectors',
        icon: faCloud,
        total: 45,
        failed: 2,
        status: 'good',
    },
    {
        key: 'heatDetectors',
        label: 'Heat Detectors',
        icon: faThermometerHalf,
        total: 12,
        failed: 1,
        status: 'warning',
    },
];

const FireSafetyDashboard = () => {
    const attentionItems = stats.filter(item => item.failed > 0);
    return (
        <div className="fire-dashboard-wrapper">
            <div className="dashboard-header-row">
                <h2 className="dashboard-title">Fire Safety Dashboard</h2>
                <div className="dashboard-actions">
                    <button className="btn btn-primary">
                        <FontAwesomeIcon icon={faBell} /> View Alerts
                    </button>
                    <button className="btn btn-primary">
                        <FontAwesomeIcon icon={faCalendar} /> Generate Report
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
        </div>
    );
};

export default FireSafetyDashboard; 