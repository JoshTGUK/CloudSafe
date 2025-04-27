import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
    faCheckSquare
} from '@fortawesome/free-solid-svg-icons';
import './EquipmentSafety.css';

const EquipmentSafety = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('dashboard');

    const sidebarMenu = [
        { 
            id: 'dashboard', 
            label: 'Dashboard', 
            icon: faChartLine,
            path: ''
        },
        { 
            id: 'compliance',
            label: 'Compliance Dashboard', 
            icon: faCheckSquare,
            path: 'compliance'
        },
        { 
            id: 'inventory', 
            label: 'Equipment Inventory', 
            icon: faWarehouse,
            path: 'inventory'
        },
        { 
            id: 'inspections', 
            label: 'Inspection Logs', 
            icon: faClipboardCheck,
            path: 'inspections'
        },
        { 
            id: 'maintenance', 
            label: 'Maintenance Records', 
            icon: faTools,
            path: 'maintenance'
        },
        { 
            id: 'defects', 
            label: 'Defect Reporting', 
            icon: faExclamationTriangle,
            path: 'defects'
        },
        { 
            id: 'documentation', 
            label: 'Documentation', 
            icon: faFileAlt,
            path: 'documentation'
        }
    ];

    const handleNavigation = (path) => {
        setActiveSection(path);
        navigate(path);
    };

    return (
        <div className="equipment-safety">
            <MainHeader />
            <div className="equipment-safety-content">
                {/* Sidebar */}
                <aside className="equipment-sidebar">
                    <nav className="equipment-nav">
                        {sidebarMenu.map((item) => (
                            <button
                                key={item.id}
                                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => handleNavigation(item.path)}
                            >
                                <FontAwesomeIcon icon={item.icon} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="equipment-main">
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