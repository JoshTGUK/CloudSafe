import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faTint,
    faTemperatureHigh,
    faArrowUp,
    faHardHat,
    faBuilding,
    faDoorOpen,
    faLightbulb,
    faBug,
    faPaintRoller,
    faExclamationTriangle,
    faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import './BuildingMaintenanceSidebar.css';

const BuildingMaintenanceSidebar = () => {
    const { id } = useParams();
    const baseUrl = `/properties/${id}/building-maintenance`;
    
    const menuItems = [
        { path: '', icon: faHome, label: 'Dashboard', end: true },
        { path: 'plumbing', icon: faTint, label: 'Plumbing Systems' },
        { path: 'heating-cooling', icon: faTemperatureHigh, label: 'Heating & Cooling' },
        { path: 'lift', icon: faArrowUp, label: 'Lift Maintenance' },
        { path: 'roof', icon: faHardHat, label: 'Roof & Gutters' },
        { path: 'facade', icon: faBuilding, label: 'Facade & Walls' },
        { path: 'doors-windows', icon: faDoorOpen, label: 'Doors & Windows' },
        { path: 'lighting', icon: faLightbulb, label: 'Lighting & Electrical' },
        { path: 'pest-control', icon: faBug, label: 'Pest Control' },
        { path: 'painting', icon: faPaintRoller, label: 'Painting & Repairs' },
        { path: 'defects', icon: faExclamationTriangle, label: 'Defects Reporting' }
    ];

    return (
        <div className="building-maintenance-sidebar">
            <Link 
                to={`/properties/${id}`}
                className="back-link"
            >
                <FontAwesomeIcon icon={faChevronLeft} />
                Back
            </Link>

            <nav>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path === '' ? baseUrl : `${baseUrl}/${item.path}`}
                        end={item.end}
                        className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                    >
                        <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                        <span className="sidebar-label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default BuildingMaintenanceSidebar; 