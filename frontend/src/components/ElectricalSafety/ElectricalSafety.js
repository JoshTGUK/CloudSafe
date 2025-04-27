import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MainHeader from '../common/MainHeader/MainHeader';
import ElectricalSafetyDashboard from './ElectricalSafetyDashboard';
import RCDTesting from './RCDTesting/RCDTesting';
import CircuitBreakerChecks from './CircuitBreakerChecks/CircuitBreakerChecks';
import FuseBoardInspections from './FuseBoardInspections/FuseBoardInspections';
import ElectricalEquipmentLogs from './ElectricalEquipmentLogs/ElectricalEquipmentLogs';
import PATTestingLogs from './PATTestingLogs/PATTestingLogs';
import LoadTesting from './LoadTesting/LoadTesting';
import SwitchgearInspections from './SwitchgearInspections/SwitchgearInspections';
import GroundingAndBonding from './GroundingAndBonding/GroundingAndBonding';
import EmergencyPowerSystems from './EmergencyPowerSystems/EmergencyPowerSystems';
import ThermalImagingReports from './ThermalImagingReports/ThermalImagingReports';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBolt,
    faPlug,
    faCircleNodes,
    faClipboardCheck,
    faToolbox,
    faBarcode,
    faWeightHanging,
    faIndustry,
    faPlug as faGrounding,
    faPowerOff,
    faCamera
} from '@fortawesome/free-solid-svg-icons';
import './ElectricalSafety.css';

const ElectricalSafety = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const sidebarMenu = [
        { name: 'Dashboard', path: '', icon: faBolt },
        { name: 'RCD Testing', path: 'rcd-testing', icon: faPlug },
        { name: 'Circuit Breaker Checks', path: 'circuit-breakers', icon: faCircleNodes },
        { name: 'Fuse Board Inspections', path: 'fuse-boards', icon: faClipboardCheck },
        { name: 'Electrical Equipment Logs', path: 'equipment-logs', icon: faToolbox },
        { name: 'PAT Testing Logs', path: 'pat-testing', icon: faBarcode },
        { name: 'Load Testing', path: 'load-testing', icon: faWeightHanging },
        { name: 'Switchgear Inspections', path: 'switchgear', icon: faIndustry },
        { name: 'Grounding and Bonding', path: 'grounding', icon: faGrounding },
        { name: 'Emergency Power Systems', path: 'emergency-power', icon: faPowerOff },
        { name: 'Thermal Imaging Reports', path: 'thermal-imaging', icon: faCamera }
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="electrical-safety">
            <MainHeader title="Electrical Safety" />
            
            <div className="electrical-safety-content">
                {/* Sidebar Navigation */}
                <aside className="sidebar">
                    <nav className="sidebar-nav">
                        {sidebarMenu.map((item, index) => (
                            <button
                                key={index}
                                className={`nav-item ${location.pathname.includes(item.path) ? 'active' : ''}`}
                                onClick={() => handleNavigation(item.path)}
                            >
                                <FontAwesomeIcon icon={item.icon} />
                                <span>{item.name}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="electrical-main">
                    <Routes>
                        <Route index element={<ElectricalSafetyDashboard />} />
                        <Route path="rcd-testing" element={<RCDTesting />} />
                        <Route path="circuit-breakers" element={<CircuitBreakerChecks />} />
                        <Route path="fuse-boards" element={<FuseBoardInspections />} />
                        <Route path="equipment-logs" element={<ElectricalEquipmentLogs />} />
                        <Route path="pat-testing" element={<PATTestingLogs />} />
                        <Route path="load-testing" element={<LoadTesting />} />
                        <Route path="switchgear" element={<SwitchgearInspections />} />
                        <Route path="grounding" element={<GroundingAndBonding />} />
                        <Route path="emergency-power" element={<EmergencyPowerSystems />} />
                        <Route path="thermal-imaging" element={<ThermalImagingReports />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default ElectricalSafety; 