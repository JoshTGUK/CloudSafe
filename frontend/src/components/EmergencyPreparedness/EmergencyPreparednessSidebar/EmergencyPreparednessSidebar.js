import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaFireExtinguisher, FaLightbulb, FaFirstAid, 
  FaRunning, FaMapMarkerAlt, FaClipboardList,
  FaHeartbeat, FaExclamationTriangle 
} from 'react-icons/fa';
import './EmergencyPreparednessSidebar.css';

const EmergencyPreparednessSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <nav className="sidebar-menu">
          <NavLink to="fire-drills" className="sidebar-item">
            <span className="sidebar-icon"><FaFireExtinguisher /></span>
            <span className="sidebar-label">Fire Drills</span>
          </NavLink>

          <NavLink to="emergency-lighting" className="sidebar-item">
            <span className="sidebar-icon"><FaLightbulb /></span>
            <span className="sidebar-label">Emergency Lighting</span>
          </NavLink>

          <NavLink to="first-aid-kits" className="sidebar-item">
            <span className="sidebar-icon"><FaFirstAid /></span>
            <span className="sidebar-label">First Aid Kits</span>
          </NavLink>

          <NavLink to="escape-routes" className="sidebar-item">
            <span className="sidebar-icon"><FaRunning /></span>
            <span className="sidebar-label">Escape Routes</span>
          </NavLink>

          <NavLink to="assembly-points" className="sidebar-item">
            <span className="sidebar-icon"><FaMapMarkerAlt /></span>
            <span className="sidebar-label">Assembly Points</span>
          </NavLink>

          <NavLink to="emergency-plans" className="sidebar-item">
            <span className="sidebar-icon"><FaClipboardList /></span>
            <span className="sidebar-label">Emergency Plans</span>
          </NavLink>

          <NavLink to="defibrillators" className="sidebar-item">
            <span className="sidebar-icon"><FaHeartbeat /></span>
            <span className="sidebar-label">Defibrillators</span>
          </NavLink>

          <NavLink to="incident-reporting" className="sidebar-item">
            <span className="sidebar-icon"><FaExclamationTriangle /></span>
            <span className="sidebar-label">Incident Reporting</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default EmergencyPreparednessSidebar; 