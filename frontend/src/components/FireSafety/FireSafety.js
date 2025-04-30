import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FireSafety.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainHeader from '../common/MainHeader/MainHeader';
import {
  faChartLine,
  faBell,
  faTint,
  faLightbulb,
  faDoorOpen,
  faFireExtinguisher,
  faCloud,
  faThermometerHalf,
  faChevronRight,
  faChevronDown,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

// Import all safety components
import FireSafetyDashboard from './FireSafetyDashboard';
import FireAlarms from './FireAlarms';
import Sprinklers from './Sprinklers';
import EmergencyLights from './EmergencyLights';
import FireDoors from './FireDoors';
import FireExtinguishers from './FireExtinguishers';
import SmokeDetectors from './SmokeDetectors';
import HeatDetectors from './HeatDetectors';

const sidebarSections = [
  {
    id: 'dashboard',
    title: 'Fire Dashboard',
    icon: faChartLine,
    component: FireSafetyDashboard
  },
  {
    id: 'fireAlarms',
    title: 'Fire Alarms',
    icon: faBell,
    component: FireAlarms
  },
  {
    id: 'sprinklers',
    title: 'Sprinklers',
    icon: faTint,
    component: Sprinklers
  },
  {
    id: 'emergencyLights',
    title: 'Emergency Lights',
    icon: faLightbulb,
    component: EmergencyLights
  },
  {
    id: 'fireDoors',
    title: 'Fire Doors',
    icon: faDoorOpen,
    component: FireDoors
  },
  {
    id: 'fireExtinguishers',
    title: 'Fire Extinguishers',
    icon: faFireExtinguisher,
    component: FireExtinguishers
  },
  {
    id: 'smokeDetectors',
    title: 'Smoke Detectors',
    icon: faCloud,
    component: SmokeDetectors
  },
  {
    id: 'heatDetectors',
    title: 'Heat Detectors',
    icon: faThermometerHalf,
    component: HeatDetectors
  }
];

const FireSafety = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSectionClick = (section) => {
    setExpandedSection(section);
  };

  const handleBackClick = () => {
    navigate(`/propertydashboard/${id}`);
  };

  const renderContent = () => {
    const section = sidebarSections.find(s => s.id === expandedSection);
    if (!section) return null;
    const Component = section.component;
    return <Component propertyId={id} searchQuery={searchQuery} />;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="fire-safety-container">
      <MainHeader />
      <div className="fire-safety-content">
        <div className="fire-safety-sidebar">
          <button className="sidebar-back-btn" onClick={handleBackClick}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Property
          </button>
          <div className="fire-safety-menu">
            {sidebarSections.map((section) => (
              <div
                key={section.id}
                className={`fire-safety-menu-item ${expandedSection === section.id ? 'active' : ''}`}
                onClick={() => handleSectionClick(section.id)}
              >
                <div className="fire-safety-menu-item-header">
                  <FontAwesomeIcon icon={section.icon} className="fire-safety-menu-icon" />
                  <span>{section.title}</span>
                  <FontAwesomeIcon 
                    icon={expandedSection === section.id ? faChevronDown : faChevronRight} 
                    className="fire-safety-menu-arrow"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fire-safety-main">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FireSafety;
