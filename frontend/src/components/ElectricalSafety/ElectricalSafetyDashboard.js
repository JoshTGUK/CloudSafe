import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBolt,
    faExclamationTriangle,
    faCheckCircle,
    faClipboardCheck
} from '@fortawesome/free-solid-svg-icons';

const ElectricalSafetyDashboard = () => {
    const stats = {
        totalInspections: 45,
        pendingIssues: 3,
        completedChecks: 42,
        upcomingTests: 5
    };

    return (
        <div className="dashboard-container">
            <div className="page-header">
                <div className="header-content">
                    <h1>Electrical Safety Dashboard</h1>
                    <p>Overview of electrical safety compliance and inspections</p>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <FontAwesomeIcon icon={faBolt} className="stat-icon" />
                    <div className="stat-content">
                        <h3>Total Inspections</h3>
                        <p className="stat-value">{stats.totalInspections}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="stat-icon warning" />
                    <div className="stat-content">
                        <h3>Pending Issues</h3>
                        <p className="stat-value">{stats.pendingIssues}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <FontAwesomeIcon icon={faCheckCircle} className="stat-icon success" />
                    <div className="stat-content">
                        <h3>Completed Checks</h3>
                        <p className="stat-value">{stats.completedChecks}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <FontAwesomeIcon icon={faClipboardCheck} className="stat-icon primary" />
                    <div className="stat-content">
                        <h3>Upcoming Tests</h3>
                        <p className="stat-value">{stats.upcomingTests}</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="section-card">
                    <h2>Recent Activities</h2>
                    <div className="activity-list">
                        <div className="activity-item">
                            <span className="activity-date">Mar 20, 2024</span>
                            <span className="activity-desc">Switchgear Inspection Completed</span>
                            <span className="activity-status success">Passed</span>
                        </div>
                        <div className="activity-item">
                            <span className="activity-date">Mar 18, 2024</span>
                            <span className="activity-desc">RCD Testing</span>
                            <span className="activity-status warning">Issues Found</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElectricalSafetyDashboard; 