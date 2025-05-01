import React from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import MainHeader from '../common/MainHeader/MainHeader';
import ComplianceDashboard from './ComplianceDashboard/ComplianceDashboard';
import EquipmentInventory from './EquipmentInventory/EquipmentInventory';
import InspectionLogs from './InspectionLogs/InspectionLogs';
import MaintenanceRecords from './MaintenanceRecords/MaintenanceRecords';
import DefectReporting from './DefectReporting/DefectReporting';
import Documentation from './Documentation/Documentation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWarehouse,
    faClipboardCheck,
    faTools,
    faExclamationTriangle,
    faFileAlt,
    faCheckSquare,
    faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import './EquipmentSafety.css';

const sidebarMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: faCheckSquare, path: '.' },
    { id: 'inventory', label: 'Equipment Inventory', icon: faWarehouse, path: 'inventory' },
    { id: 'inspections', label: 'Inspection Logs', icon: faClipboardCheck, path: 'inspections' },
    { id: 'maintenance', label: 'Maintenance Records', icon: faTools, path: 'maintenance' },
    { id: 'defects', label: 'Defect Reporting', icon: faExclamationTriangle, path: 'defects' },
    { id: 'documentation', label: 'Documentation', icon: faFileAlt, path: 'documentation' }
];

const EquipmentSafety = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => {
        if (path === '.') {
            return location.pathname === `/properties/${id}/equipment-safety`;
        }
        return location.pathname.includes(`/properties/${id}/equipment-safety/${path}`);
    };

    return (
        <div className="equipment-safety-container">
            <MainHeader />
            <div className="equipment-safety-content">
                <aside className="equipment-safety-sidebar">
                    <Link 
                        to={`/properties/${id}`}
                        className="sidebar-back-btn"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                        Back
                    </Link>
                    <nav className="equipment-safety-menu">
                        {sidebarMenu.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                className={`equipment-safety-menu-item ${isActive(item.path) ? 'active' : ''}`}
                            >
                                <div className="equipment-safety-menu-item-header">
                                    <FontAwesomeIcon icon={item.icon} className="equipment-safety-menu-icon" />
                                    <span>{item.label}</span>
                                </div>
                            </Link>
                        ))}
                    </nav>
                </aside>
                <main className="equipment-safety-main">
                    <Routes>
                        <Route index element={<ComplianceDashboard />} />
                        <Route path="inventory" element={<EquipmentInventory />} />
                        <Route path="inspections" element={<InspectionLogs />} />
                        <Route path="maintenance" element={<MaintenanceRecords />} />
                        <Route path="defects" element={<DefectReporting />} />
                        <Route path="documentation" element={<Documentation />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default EquipmentSafety; 