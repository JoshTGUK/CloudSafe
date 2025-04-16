import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './FireSafety.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainHeader from '../common/MainHeader/MainHeader';
import { 
  faChevronRight, 
  faSearch, 
  faFilter,
  faBell,
  faExclamationTriangle,
  faCheckCircle,
  faTimesCircle,
  faQuestionCircle,
  faFire,
  faBell as faAlarm,
  faTint,
  faLightbulb,
  faDoorOpen,
  faFireExtinguisher,
  faCloud,
  faThermometerHalf
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

const FireSafety = () => {
  const { id } = useParams();
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for the dashboard
  const dashboardData = {
    fireAlarms: {
      total: 24,
      passed: 20,
      failed: 2,
      pending: 2,
      status: 'warning'
    },
    sprinklers: {
      total: 18,
      passed: 15,
      failed: 1,
      pending: 2,
      status: 'good'
    },
    emergencyLights: {
      total: 32,
      passed: 30,
      failed: 1,
      pending: 1,
      status: 'good'
    },
    fireDoors: {
      total: 15,
      passed: 12,
      failed: 2,
      pending: 1,
      status: 'warning'
    },
    fireExtinguishers: {
      total: 28,
      passed: 25,
      failed: 2,
      pending: 1,
      status: 'good'
    },
    smokeDetectors: {
      total: 45,
      passed: 42,
      failed: 2,
      pending: 1,
      status: 'good'
    },
    heatDetectors: {
      total: 12,
      passed: 10,
      failed: 1,
      pending: 1,
      status: 'warning'
    }
  };

  useEffect(() => {
    // Simulate API call to check server connectivity and fetch property-specific data
    const checkServerConnection = async () => {
      try {
        // Replace with actual API call using the property ID
        console.log('Fetching fire safety data for property:', id);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (err) {
        setError('Failed to connect to server');
        setLoading(false);
      }
    };

    checkServerConnection();
  }, [id]);

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  const renderDashboard = () => {
    return (
      <div className="dashboard-section">
        <div className="dashboard-content modern">
          <div className="dashboard-header">
            <h2>Fire Safety Dashboard</h2>
            <div className="dashboard-actions">
              <button className="btn btn-primary">
                <FontAwesomeIcon icon={faBell} /> View Alerts
              </button>
              <button className="btn btn-secondary">
                Generate Report
              </button>
            </div>
          </div>

          <div className="equipment-grid">
            {Object.entries(dashboardData).map(([key, data]) => (
              <div key={key} className={`equipment-card ${data.status}`}>
                <div className="equipment-icon">
                  <FontAwesomeIcon 
                    icon={
                      key === 'fireAlarms' ? faAlarm :
                      key === 'sprinklers' ? faTint :
                      key === 'emergencyLights' ? faLightbulb :
                      key === 'fireDoors' ? faDoorOpen :
                      key === 'fireExtinguishers' ? faFireExtinguisher :
                      key === 'smokeDetectors' ? faCloud :
                      key === 'heatDetectors' ? faThermometerHalf :
                      faFire
                    }
                  />
                </div>
                <div className="equipment-info">
                  <h3>{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                  <div className="equipment-status">
                    <div className="status-indicator" />
                    <div className="status-details">
                      <span className="total-count">{data.total}</span>
                      <span className="status-message">
                        {data.failed > 0 ? `${data.failed} failed` : 'All systems operational'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-summary">
            <div className="summary-panel">
              <h3>Requires Attention</h3>
              <ul className="attention-list">
                {Object.entries(dashboardData)
                  .filter(([_, data]) => data.failed > 0)
                  .map(([key, data]) => (
                    <li key={key}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}: {data.failed} failed inspections
                    </li>
                  ))}
                {Object.values(dashboardData).every(data => data.failed === 0) && (
                  <li className="no-issues">No issues requiring attention</li>
                )}
              </ul>
            </div>

            <div className="summary-panel">
              <h3>Next Inspections</h3>
              <p className="next-inspection-message">
                Next scheduled inspection: March 15, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return renderDashboard();
      case 'fireAlarms':
        return <FireAlarms />;
      case 'sprinklers':
        return <Sprinklers />;
      case 'emergencyLights':
        return <EmergencyLights />;
      case 'fireDoors':
        return <FireDoors />;
      case 'fireExtinguishers':
        return <FireExtinguishers />;
      case 'smokeDetectors':
        return <SmokeDetectors />;
      case 'heatDetectors':
        return <HeatDetectors />;
      default:
        return (
          <div className="coming-soon-section">
            <h1>Coming Soon</h1>
            <p>This section is under development</p>
          </div>
        );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="fire-safety-page">
      <MainHeader />
      <div className="page-content">
        <div className="left-panel">
          <h2>Fire Safety</h2>
          <nav className="safety-nav">
            <button
              className={`nav-item ${currentSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleSectionChange('dashboard')}
            >
              Dashboard
              <FontAwesomeIcon icon={faChevronRight} className="arrow" />
            </button>
            <button
              className={`nav-item ${currentSection === 'fireAlarms' ? 'active' : ''}`}
              onClick={() => handleSectionChange('fireAlarms')}
            >
              Fire Alarms
              <FontAwesomeIcon icon={faChevronRight} className="arrow" />
            </button>
            <button
              className={`nav-item ${currentSection === 'sprinklers' ? 'active' : ''}`}
              onClick={() => handleSectionChange('sprinklers')}
            >
              Sprinklers
              <FontAwesomeIcon icon={faChevronRight} className="arrow" />
            </button>
            <button
              className={`nav-item ${currentSection === 'emergencyLights' ? 'active' : ''}`}
              onClick={() => handleSectionChange('emergencyLights')}
            >
              Emergency Lights
              <FontAwesomeIcon icon={faChevronRight} className="arrow" />
            </button>
            <button
              className={`nav-item ${currentSection === 'fireDoors' ? 'active' : ''}`}
              onClick={() => handleSectionChange('fireDoors')}
            >
              Fire Doors
              <FontAwesomeIcon icon={faChevronRight} className="arrow" />
            </button>
            <button
              className={`nav-item ${currentSection === 'fireExtinguishers' ? 'active' : ''}`}
              onClick={() => handleSectionChange('fireExtinguishers')}
            >
              Fire Extinguishers
              <FontAwesomeIcon icon={faChevronRight} className="arrow" />
            </button>
            <button
              className={`nav-item ${currentSection === 'smokeDetectors' ? 'active' : ''}`}
              onClick={() => handleSectionChange('smokeDetectors')}
            >
              Smoke Detectors
              <FontAwesomeIcon icon={faChevronRight} className="arrow" />
            </button>
            <button
              className={`nav-item ${currentSection === 'heatDetectors' ? 'active' : ''}`}
              onClick={() => handleSectionChange('heatDetectors')}
            >
              Heat Detectors
              <FontAwesomeIcon icon={faChevronRight} className="arrow" />
            </button>
          </nav>
        </div>

        <div className="main-panel">
          <div className="search-filter-container">
            <div className="search-bar">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="filter-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FontAwesomeIcon icon={faFilter} />
              Filters
            </button>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FireSafety;
