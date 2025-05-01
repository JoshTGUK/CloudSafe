import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChartLine, 
    faGraduationCap, 
    faUserCheck, 
    faExclamationTriangle,
    faTasks,
    faCertificate,
    faHardHat,
    faChevronRight,
    faChevronDown,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import StaffSafetyDashboard from './StaffSafetyDashboard';
import TrainingRecords from './TrainingRecords';
import Inductions from './Inductions';
import IncidentReports from './IncidentReports';
import AssignedTasks from './AssignedTasks';
import Certifications from './Certifications';
import PPEIssuance from './PPEIssuance';
import MainHeader from '../common/MainHeader/MainHeader';
import './StaffSafety.css';

const StaffSafety = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    const menuItems = [
        {
            id: 'dashboard',
            title: 'Staff Dashboard',
            icon: faChartLine
        },
        {
            id: 'training',
            title: 'Training Records',
            icon: faGraduationCap
        },
        {
            id: 'inductions',
            title: 'Inductions',
            icon: faUserCheck
        },
        {
            id: 'incidents',
            title: 'Incident Reports',
            icon: faExclamationTriangle
        },
        {
            id: 'tasks',
            title: 'Assigned Safety Tasks',
            icon: faTasks
        },
        {
            id: 'certifications',
            title: 'Certifications',
            icon: faCertificate
        },
        {
            id: 'ppe',
            title: 'PPE Issuance Logs',
            icon: faHardHat
        }
    ];

    const renderContent = () => {
        const section = menuItems.find(item => item.id === activeSection);
        if (!section) return null;

        const Component = {
            dashboard: StaffSafetyDashboard,
            training: TrainingRecords,
            inductions: Inductions,
            incidents: IncidentReports,
            tasks: AssignedTasks,
            certifications: Certifications,
            ppe: PPEIssuance
        }[section.id];

        return <Component propertyId={id} />;
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="safety-container">
            <MainHeader />
            <div className="safety-content">
                <div className="safety-sidebar">
                    <button className="back-button" onClick={() => navigate(`/propertydashboard/${id}`)}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>
                    <nav className="safety-nav">
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => setActiveSection(item.id)}
                            >
                                <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                                <span>{item.title}</span>
                                <FontAwesomeIcon 
                                    icon={activeSection === item.id ? faChevronDown : faChevronRight} 
                                    className="nav-arrow"
                                />
                            </div>
                        ))}
                    </nav>
                </div>
                <div className="safety-main">
                    <div className="safety-header">
                        <h1>{menuItems.find(item => item.id === activeSection)?.title}</h1>
                    </div>
                    <div className="safety-body">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffSafety; 