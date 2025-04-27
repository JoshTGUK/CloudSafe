import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MainHeader from '../common/MainHeader/MainHeader';
import EquipmentSafetyDashboard from './EquipmentSafetyDashboard';
import EquipmentInventory from './EquipmentInventory/EquipmentInventory';
import InspectionLogs from './InspectionLogs/InspectionLogs';
import MaintenanceRecords from './MaintenanceRecords/MaintenanceRecords';
import DefectReporting from './DefectReporting/DefectReporting';
import Documentation from './Documentation/Documentation';
import ComplianceDashboard from './ComplianceDashboard/ComplianceDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faWarehouse,
    faClipboardCheck,
    faTools,
    faExclamationTriangle,
    faFileAlt,
    faCheckSquare,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import './EquipmentSafety.css';

const BASE_PATH = '/equipment-safety';

const sidebarMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: faChartLine, path: '' },
    { id: 'compliance', label: 'Compliance Dashboard', icon: faCheckSquare, path: 'compliance' },
    { id: 'inventory', label: 'Equipment Inventory', icon: faWarehouse, path: 'inventory' },
    { id: 'inspections', label: 'Inspection Logs', icon: faClipboardCheck, path: 'inspections' },
    { id: 'maintenance', label: 'Maintenance Records', icon: faTools, path: 'maintenance' },
    { id: 'defects', label: 'Defect Reporting', icon: faExclamationTriangle, path: 'defects' },
    { id: 'documentation', label: 'Documentation', icon: faFileAlt, path: 'documentation' }
];

const EquipmentSafety = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Determine active section from location
    const activeSection = sidebarMenu.find(item => {
        if (item.path === '') {
            return location.pathname === BASE_PATH || location.pathname === `${BASE_PATH}/`;
        }
        return location.pathname === `${BASE_PATH}/${item.path}`;
    })?.id || 'dashboard';

    const handleNavigation = (path) => {
        navigate(path ? `${BASE_PATH}/${path}` : BASE_PATH);
    };

    return (
        <div className="equipment-safety-container">
            <MainHeader />
            <div className="equipment-safety-content">
                {/* Sidebar */}
                <aside className="equipment-safety-sidebar">
                    <button className="sidebar-back-btn" onClick={() => navigate(-1)}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>
                    <nav className="equipment-safety-menu">
                        {sidebarMenu.map((item) => (
                            <div
                                key={item.id}
                                className={`equipment-safety-menu-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => handleNavigation(item.path)}
                            >
                                <div className="equipment-safety-menu-item-header">
                                    <FontAwesomeIcon icon={item.icon} className="equipment-safety-menu-icon" />
                                    <span>{item.label}</span>
                                </div>
                            </div>
                        ))}
                    </nav>
                </aside>
                {/* Main Content Area */}
                <main className="equipment-safety-main">
                    <Routes>
                        <Route path="/" element={<EquipmentSafetyDashboard />} />
                        <Route path="/compliance" element={<ComplianceDashboard />} />
                        <Route path="/inventory" element={<EquipmentInventory />} />
                        <Route path="/inspections" element={<InspectionLogs />} />
                        <Route path="/maintenance" element={<MaintenanceRecords />} />
                        <Route path="/defects" element={<DefectReporting />} />
                        <Route path="/documentation" element={<Documentation />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default EquipmentSafety; 