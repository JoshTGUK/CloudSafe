import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faGraduationCap, 
    faUserCheck, 
    faExclamationTriangle,
    faTasks,
    faCertificate,
    faHardHat,
    faChartLine
} from '@fortawesome/free-solid-svg-icons';
import './StaffSafetyDashboard.css';

const StaffSafetyDashboard = ({ propertyId }) => {
    const [stats, setStats] = useState({
        totalStaff: 0,
        activeTrainings: 0,
        pendingInductions: 0,
        recentIncidents: 0,
        overdueTasks: 0,
        expiringCertifications: 0,
        ppeIssued: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardStats();
    }, [propertyId]);

    const fetchDashboardStats = async () => {
        try {
            // TODO: Replace with actual API call
            // Simulated data for now
            setStats({
                totalStaff: 45,
                activeTrainings: 12,
                pendingInductions: 5,
                recentIncidents: 3,
                overdueTasks: 8,
                expiringCertifications: 7,
                ppeIssued: 38
            });
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading dashboard data...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="staff-safety-dashboard">
            <h2 className="dashboard-title">Staff Safety Dashboard</h2>
            
            <div className="dashboard-stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">
                        <FontAwesomeIcon icon={faChartLine} />
                    </div>
                    <div className="stat-content">
                        <h3>Total Staff</h3>
                        <p className="stat-value">{stats.totalStaff}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FontAwesomeIcon icon={faGraduationCap} />
                    </div>
                    <div className="stat-content">
                        <h3>Active Trainings</h3>
                        <p className="stat-value">{stats.activeTrainings}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FontAwesomeIcon icon={faUserCheck} />
                    </div>
                    <div className="stat-content">
                        <h3>Pending Inductions</h3>
                        <p className="stat-value">{stats.pendingInductions}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                    </div>
                    <div className="stat-content">
                        <h3>Recent Incidents</h3>
                        <p className="stat-value">{stats.recentIncidents}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FontAwesomeIcon icon={faTasks} />
                    </div>
                    <div className="stat-content">
                        <h3>Overdue Tasks</h3>
                        <p className="stat-value">{stats.overdueTasks}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FontAwesomeIcon icon={faCertificate} />
                    </div>
                    <div className="stat-content">
                        <h3>Expiring Certifications</h3>
                        <p className="stat-value">{stats.expiringCertifications}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FontAwesomeIcon icon={faHardHat} />
                    </div>
                    <div className="stat-content">
                        <h3>PPE Issued</h3>
                        <p className="stat-value">{stats.ppeIssued}</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-charts">
                {/* TODO: Add charts for:
                    - Training completion trends
                    - Incident frequency
                    - Certification expiry timeline
                    - PPE issuance trends
                */}
            </div>
        </div>
    );
};

export default StaffSafetyDashboard; 