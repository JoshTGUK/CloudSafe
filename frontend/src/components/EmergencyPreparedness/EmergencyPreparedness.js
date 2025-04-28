import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb, faRunning, faMapMarkerAlt, 
  faClipboardList, faHeartbeat, faExclamationTriangle,
  faChevronRight, faChevronDown, faArrowLeft,
  faFireExtinguisher, faFirstAid
} from '@fortawesome/free-solid-svg-icons';
import MainHeader from '../common/MainHeader/MainHeader';
import EmergencyLighting from './EmergencyLighting/EmergencyLighting';
import EscapeRoutes from './EscapeRoutes/EscapeRoutes';
import AssemblyPoints from './AssemblyPoints/AssemblyPoints';
import EmergencyPlans from './EmergencyPlans/EmergencyPlans';
import Defibrillators from './Defibrillators/Defibrillators';
import IncidentReporting from './IncidentReporting/IncidentReporting';
import EmergencyPreparednessDashboard from './EmergencyPreparednessDashboard/EmergencyPreparednessDashboard';
import FireDrills from './FireDrills/FireDrills';
import FirstAidKits from './FirstAidKits/FirstAidKits';
import './EmergencyPreparedness.css';

const sidebarSections = [
  {
    id: 'dashboard',
    title: 'Emergency Dashboard',
    icon: faClipboardList,
    component: EmergencyPreparednessDashboard
  },
  {
    id: 'lighting',
    title: 'Emergency Lighting',
    icon: faLightbulb,
    component: EmergencyLighting
  },
  {
    id: 'escape-routes',
    title: 'Escape Routes',
    icon: faRunning,
    component: EscapeRoutes
  },
  {
    id: 'assembly-points',
    title: 'Assembly Points',
    icon: faMapMarkerAlt,
    component: AssemblyPoints
  },
  {
    id: 'emergency-plans',
    title: 'Emergency Plans',
    icon: faClipboardList,
    component: EmergencyPlans
  },
  {
    id: 'fire-drills',
    title: 'Fire Drills',
    icon: faFireExtinguisher,
    component: FireDrills
  },
  {
    id: 'first-aid-kits',
    title: 'First Aid Kits',
    icon: faFirstAid,
    component: FirstAidKits
  },
  {
    id: 'defibrillators',
    title: 'Defibrillators',
    icon: faHeartbeat,
    component: Defibrillators
  },
  {
    id: 'incident-reporting',
    title: 'Incident Reporting',
    icon: faExclamationTriangle,
    component: IncidentReporting
  }
];

const EmergencyPreparedness = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState('dashboard');

  const handleSectionClick = (section) => {
    setExpandedSection(section);
    // Update the URL without triggering a re-render
    window.history.replaceState(null, '', `${location.pathname}/${section}`);
  };

  return (
    <div className="emergency-preparedness-container">
      <MainHeader />
      <div className="emergency-preparedness-content">
        <div className="emergency-preparedness-sidebar">
          <button className="sidebar-back-btn" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
          <div className="emergency-preparedness-menu">
            {sidebarSections.map((section) => (
              <div
                key={section.id}
                className={`emergency-preparedness-menu-item ${expandedSection === section.id ? 'active' : ''}`}
                onClick={() => handleSectionClick(section.id)}
              >
                <div className="emergency-preparedness-menu-item-header">
                  <FontAwesomeIcon icon={section.icon} className="emergency-preparedness-menu-icon" />
                  <span>{section.title}</span>
                  <FontAwesomeIcon 
                    icon={expandedSection === section.id ? faChevronDown : faChevronRight} 
                    className="emergency-preparedness-menu-arrow"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="emergency-preparedness-main">
          {(() => {
            const section = sidebarSections.find(s => s.id === expandedSection);
            if (!section) return null;
            const Component = section.component;
            return <Component key={section.id} />;
          })()}
        </div>
      </div>
    </div>
  );
};

export default EmergencyPreparedness; 