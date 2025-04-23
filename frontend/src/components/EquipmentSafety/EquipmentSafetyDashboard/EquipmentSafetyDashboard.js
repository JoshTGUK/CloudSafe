import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTools, 
    faExclamationTriangle,
    faCheckCircle,
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import './EquipmentSafetyDashboard.css';

const EquipmentSafetyDashboard = () => {
    const dashboardStats = [
        {
            title: 'Total Equipment',
            count: 48,
            icon: faTools,
            type: 'primary'
        },
        {
            title: 'Maintenance Due',
            count: 5,
            icon: faExclamationTriangle,
            type: 'warning'
        },
        {
            title: 'Active Issues',
            count: 3,
            icon: faExclamationTriangle,
            type: 'danger'
        },
        {
            title: 'Compliant Items',
            count: 40,
            icon: faCheckCircle,
            type: 'success'
        }
    ];

    const upcomingInspections = [
        {
            equipment: 'Forklift #1',
            date: '2024-04-15',
            type: 'Maintenance'
        },
        {
            equipment: 'Crane System',
            date: '2024-04-18',
            type: 'Safety Check'
        },
        // Add more inspections as needed
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Equipment Safety Overview</h1>
                <p>Monitor equipment status and upcoming inspections</p>
            </div>

            <div className="stats-grid">
                {dashboardStats.map((stat, index) => (
                    <div key={index} className={`stat-card ${stat.type}`}>
                        <div className="stat-icon">
                            <FontAwesomeIcon icon={stat.icon} />
                        </div>
                        <div className="stat-content">
                            <h3>{stat.title}</h3>
                            <p>{stat.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="upcoming-inspections">
                <h2>Upcoming Inspections</h2>
                <div className="inspection-list">
                    {upcomingInspections.map((inspection, index) => (
                        <div key={index} className="inspection-item">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <div className="inspection-details">
                                <h4>{inspection.equipment}</h4>
                                <p>{inspection.type} - {inspection.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EquipmentSafetyDashboard; 