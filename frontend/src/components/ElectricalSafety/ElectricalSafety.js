import React from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import MainHeader from '../common/MainHeader/MainHeader';
import ElectricalSafetyDashboard from './ElectricalSafetyDashboard';
import CircuitBreakerChecks from './CircuitBreakerChecks/CircuitBreakerChecks';
import ElectricalEquipmentLogs from './ElectricalEquipmentLogs/ElectricalEquipmentLogs';
import EmergencyPowerSystems from './EmergencyPowerSystems/EmergencyPowerSystems';
import FuseBoardInspections from './FuseBoardInspections/FuseBoardInspections';
import GroundingAndBonding from './GroundingAndBonding/GroundingAndBonding';
import LoadTesting from './LoadTesting/LoadTesting';
import PATTestingLogs from './PATTestingLogs/PATTestingLogs';
import RCDTesting from './RCDTesting/RCDTesting';
import SwitchgearInspections from './SwitchgearInspections/SwitchgearInspections';
import ThermalImagingReports from './ThermalImagingReports/ThermalImagingReports';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faBolt,
    faTools,
    faPlug,
    faIndustry,
    faCamera,
    faLightbulb,
    faWrench,
    faExclamationTriangle,
    faFileAlt,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import './ElectricalSafety.css';

const sidebarMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: faChartLine, path: '' },
    { id: 'circuit-breakers', label: 'Circuit Breakers', icon: faBolt, path: 'circuit-breakers' },
    { id: 'equipment-logs', label: 'Equipment Logs', icon: faTools, path: 'equipment-logs' },
    { id: 'emergency-power', label: 'Emergency Power', icon: faPlug, path: 'emergency-power' },
    { id: 'fuse-boards', label: 'Fuse Boards', icon: faIndustry, path: 'fuse-boards' },
    { id: 'grounding', label: 'Grounding & Bonding', icon: faLightbulb, path: 'grounding' },
    { id: 'load-testing', label: 'Load Testing', icon: faWrench, path: 'load-testing' },
    { id: 'pat-testing', label: 'PAT Testing', icon: faExclamationTriangle, path: 'pat-testing' },
    { id: 'rcd-testing', label: 'RCD Testing', icon: faFileAlt, path: 'rcd-testing' },
    { id: 'switchgear', label: 'Switchgear', icon: faIndustry, path: 'switchgear' },
    { id: 'thermal-imaging', label: 'Thermal Imaging', icon: faCamera, path: 'thermal-imaging' }
];

const ElectricalSafety = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const activeSection = sidebarMenu.find(item => {
        const currentPath = location.pathname;
        if (item.path === '') {
            return currentPath === `/propertydashboard/${id}/electrical-safety`;
        }
        return currentPath === `/propertydashboard/${id}/electrical-safety/${item.path}`;
    })?.id || 'dashboard';

    const handleNavigation = (path) => {
        navigate(path === '' ? 
            `/propertydashboard/${id}/electrical-safety` : 
            `/propertydashboard/${id}/electrical-safety/${path}`
        );
    };

    return (
        <div className="electrical-safety-container">
            <MainHeader />
            <div className="electrical-safety-content">
                <aside className="electrical-safety-sidebar">
                    <button className="sidebar-back-btn" onClick={() => navigate(`/propertydashboard/${id}`)}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>
                    <nav className="electrical-safety-menu">
                        {sidebarMenu.map((item) => (
                            <div
                                key={item.id}
                                className={`electrical-safety-menu-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => handleNavigation(item.path)}
                            >
                                <div className="electrical-safety-menu-item-header">
                                    <FontAwesomeIcon icon={item.icon} className="electrical-safety-menu-icon" />
                                    <span>{item.label}</span>
                                </div>
                            </div>
                        ))}
                    </nav>
                </aside>
                <main className="electrical-safety-main">
                    <Routes>
                        <Route path="/" element={<ElectricalSafetyDashboard propertyId={id} />} />
                        <Route path="/circuit-breakers" element={<CircuitBreakerChecks propertyId={id} />} />
                        <Route path="/equipment-logs" element={<ElectricalEquipmentLogs propertyId={id} />} />
                        <Route path="/emergency-power" element={<EmergencyPowerSystems propertyId={id} />} />
                        <Route path="/fuse-boards" element={<FuseBoardInspections propertyId={id} />} />
                        <Route path="/grounding" element={<GroundingAndBonding propertyId={id} />} />
                        <Route path="/load-testing" element={<LoadTesting propertyId={id} />} />
                        <Route path="/pat-testing" element={<PATTestingLogs propertyId={id} />} />
                        <Route path="/rcd-testing" element={<RCDTesting propertyId={id} />} />
                        <Route path="/switchgear" element={<SwitchgearInspections propertyId={id} />} />
                        <Route path="/thermal-imaging" element={<ThermalImagingReports propertyId={id} />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default ElectricalSafety; 