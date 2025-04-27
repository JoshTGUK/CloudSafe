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
    const [expandedSection, setExpandedSection] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleSectionClick = (section) => {
        setExpandedSection(section);
    };

    const sidebarSections = [
        {
            id: 'dashboard',
            title: 'Staff Dashboard',
            icon: faChartLine,
            component: StaffSafetyDashboard
        },
        {
            id: 'training',
            title: 'Training Records',
            icon: faGraduationCap,
            component: TrainingRecords
        },
        {
            id: 'inductions',
            title: 'Inductions',
            icon: faUserCheck,
            component: Inductions
        },
        {
            id: 'incidents',
            title: 'Incident Reports',
            icon: faExclamationTriangle,
            component: IncidentReports
        },
        {
            id: 'tasks',
            title: 'Assigned Safety Tasks',
            icon: faTasks,
            component: AssignedTasks
        },
        {
            id: 'certifications',
            title: 'Certifications',
            icon: faCertificate,
            component: Certifications
        },
        {
            id: 'ppe',
            title: 'PPE Issuance Logs',
            icon: faHardHat,
            component: PPEIssuance
        }
    ];

    const renderContent = () => {
        const section = sidebarSections.find(s => s.id === expandedSection);
        if (!section) return null;

        const Component = section.component;
        return <Component propertyId={id} />;
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="staff-safety-container">
            <MainHeader />
            <div className="staff-safety-content">
                <div className="staff-safety-sidebar">
                    <button className="sidebar-back-btn" onClick={() => navigate(-1)}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>
                    <div className="staff-safety-menu">
                        {sidebarSections.map((section) => (
                            <div
                                key={section.id}
                                className={`staff-safety-menu-item ${expandedSection === section.id ? 'active' : ''}`}
                                onClick={() => handleSectionClick(section.id)}
                            >
                                <div className="staff-safety-menu-item-header">
                                    <FontAwesomeIcon icon={section.icon} className="staff-safety-menu-icon" />
                                    <span>{section.title}</span>
                                    <FontAwesomeIcon 
                                        icon={expandedSection === section.id ? faChevronDown : faChevronRight} 
                                        className="staff-safety-menu-arrow"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="staff-safety-main">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default StaffSafety; 