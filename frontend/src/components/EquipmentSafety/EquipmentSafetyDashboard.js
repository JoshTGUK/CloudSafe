import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTools, 
    faExclamationTriangle,
    faTimesCircle,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import './EquipmentSafetyDashboard.css';

const EquipmentSafetyDashboard = () => {
    console.log('Rendering EquipmentSafetyDashboard component');

    try {
        const dashboardData = {
            totalEquipment: 48,
            dueInspections: 12,
            overdueInspections: 5,
            compliantItems: 31
        };

        return (
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Equipment Safety Dashboard</h1>
                    <p>Monitor and manage equipment safety compliance</p>
                </div>

                <div className="dashboard-stats">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <FontAwesomeIcon icon={faTools} />
                        </div>
                        <div className="stat-content">
                            <h3>Total Equipment</h3>
                            <p>{dashboardData.totalEquipment}</p>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div className="stat-icon">
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                        </div>
                        <div className="stat-content">
                            <h3>Due Soon</h3>
                            <p>{dashboardData.dueInspections}</p>
                        </div>
                    </div>

                    <div className="stat-card danger">
                        <div className="stat-icon">
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                        <div className="stat-content">
                            <h3>Overdue</h3>
                            <p>{dashboardData.overdueInspections}</p>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div className="stat-icon">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <div className="stat-content">
                            <h3>Compliant</h3>
                            <p>{dashboardData.compliantItems}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error in EquipmentSafetyDashboard:', error);
        throw error; // This will be caught by the ErrorBoundary
    }
};

export default EquipmentSafetyDashboard; 