import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClipboardCheck,
    faExclamationTriangle,
    faWrench,
    faFileAlt,
    faChartPie
} from '@fortawesome/free-solid-svg-icons';
import Charts from './Charts';
import './ComplianceDashboard.css';

const ComplianceDashboard = () => {
    const complianceData = {
        compliant: 85,
        nonCompliant: 15,
        overdueInspections: 3,
        overdueMaintenance: 2,
        totalEquipment: 47
    };

    const pieData = {
        labels: ['Compliant', 'Non-Compliant'],
        datasets: [
            {
                data: [complianceData.compliant, complianceData.nonCompliant],
                backgroundColor: ['#4caf50', '#ff4444'],
                borderColor: ['#43a047', '#e53935'],
                borderWidth: 1,
            },
        ],
    };

    const lineData = {
        labels: ['Apr 1', 'Apr 15', 'May 1', 'May 15', 'Jun 1'],
        datasets: [
            {
                label: 'Upcoming Tasks',
                data: [2, 4, 3, 1, 5],
                borderColor: '#1A80E5',
                backgroundColor: 'rgba(26, 128, 229, 0.1)',
                fill: true,
            },
        ],
    };

    return (
        <div className="compliance-dashboard">
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>Equipment Compliance Dashboard</h1>
                    <p>Overview of equipment safety compliance status</p>
                </div>
            </div>

            <div className="metrics-container">
                <div className="metric-card">
                    <FontAwesomeIcon icon={faClipboardCheck} className="metric-icon compliant" />
                    <div className="metric-content">
                        <h3>Compliance Rate</h3>
                        <div className="metric-value">{complianceData.compliant}%</div>
                        <p>of equipment compliant</p>
                    </div>
                </div>

                <div className="metric-card">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="metric-icon warning" />
                    <div className="metric-content">
                        <h3>Overdue Items</h3>
                        <div className="metric-value">{complianceData.overdueInspections + complianceData.overdueMaintenance}</div>
                        <p>tasks requiring attention</p>
                    </div>
                </div>

                <div className="metric-card">
                    <FontAwesomeIcon icon={faWrench} className="metric-icon" />
                    <div className="metric-content">
                        <h3>Total Equipment</h3>
                        <div className="metric-value">{complianceData.totalEquipment}</div>
                        <p>items being tracked</p>
                    </div>
                </div>
            </div>

            <div className="charts-container">
                <Charts pieData={pieData} lineData={lineData} />
            </div>

            <div className="quick-links">
                <h3>Quick Access</h3>
                <div className="links-container">
                    <Link to="/equipment-safety/inspection-records" className="quick-link-card">
                        <FontAwesomeIcon icon={faClipboardCheck} />
                        <span>Inspection Records</span>
                    </Link>
                    <Link to="/equipment-safety/maintenance-records" className="quick-link-card">
                        <FontAwesomeIcon icon={faWrench} />
                        <span>Maintenance Records</span>
                    </Link>
                    <Link to="/equipment-safety/reports" className="quick-link-card">
                        <FontAwesomeIcon icon={faFileAlt} />
                        <span>Compliance Reports</span>
                    </Link>
                    <Link to="/equipment-safety/analytics" className="quick-link-card">
                        <FontAwesomeIcon icon={faChartPie} />
                        <span>Detailed Analytics</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ComplianceDashboard; 