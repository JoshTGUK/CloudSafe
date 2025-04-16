import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faChevronDown, 
  faEye, 
  faEdit, 
  faClipboardCheck, 
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  faDownload,
  faUpload,
  faCalendarAlt,
  faUser,
  faBuilding,
  faLightbulb,
  faSignHanging,
  faLightbulb as faLampDesk,
  faLightbulb as faLampStreet,
  faClock,
  faPlus,
  faXmark,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import './EmergencyLights.css';

const EmergencyLights = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [filters, setFilters] = useState({
    property: '',
    zone: '',
    status: '',
    testFrequency: '',
    dateRange: ''
  });

  // Mock data for emergency lighting fixtures
  const mockFixtures = [
    {
      id: 'EL-001',
      zone: 'Main Building - Stairwell A',
      type: 'Exit Sign',
      lastTest: '2023-12-10',
      status: 'working',
      nextDue: '2024-01-10',
      assignedTo: 'John Smith',
      testFrequency: 'Monthly',
      notes: 'All lights functioning properly'
    },
    {
      id: 'EL-002',
      zone: 'North Wing - Corridor 2',
      type: 'Bulkhead Light',
      lastTest: '2023-11-15',
      status: 'needs-testing',
      nextDue: '2023-12-15',
      assignedTo: 'Sarah Johnson',
      testFrequency: 'Monthly',
      notes: 'Battery replacement needed'
    },
    {
      id: 'EL-003',
      zone: 'South Wing - Fire Exit 1',
      type: 'Twinspot',
      lastTest: '2023-10-20',
      status: 'failed',
      nextDue: '2023-11-20',
      assignedTo: 'Mike Wilson',
      testFrequency: 'Monthly',
      notes: 'One light not functioning'
    },
    {
      id: 'EL-004',
      zone: 'East Building - Lobby',
      type: 'Downlight',
      lastTest: '2023-12-01',
      status: 'working',
      nextDue: '2024-06-01',
      assignedTo: 'John Smith',
      testFrequency: '6-Month',
      notes: 'All systems operational'
    },
    {
      id: 'EL-005',
      zone: 'West Building - Floor 3',
      type: 'Exit Sign',
      lastTest: '2023-09-05',
      status: 'needs-testing',
      nextDue: '2023-12-05',
      assignedTo: 'Sarah Johnson',
      testFrequency: '6-Month',
      notes: 'Scheduled for replacement'
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch emergency lighting fixtures
    const fetchFixtures = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/fire-safety/emergency-lighting');
        // const data = await response.json();
        
        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 1000));
        setFixtures(mockFixtures);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch emergency lighting fixtures');
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleLogTest = (fixture) => {
    setSelectedFixture(fixture);
    setShowTestModal(true);
  };

  const handleCloseModal = () => {
    setShowTestModal(false);
    setSelectedFixture(null);
  };

  const handleTestSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // In a real app, this would make an API call to save the test
    console.log('Test logged for:', selectedFixture.id);
    handleCloseModal();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'working':
        return <span className="status-badge working">Working</span>;
      case 'needs-testing':
        return <span className="status-badge needs-testing">Needs Testing</span>;
      case 'failed':
        return <span className="status-badge failed">Failed</span>;
      default:
        return <span className="status-badge unknown">Unknown</span>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'working':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon working" />;
      case 'needs-testing':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="status-icon needs-testing" />;
      case 'failed':
        return <FontAwesomeIcon icon={faTimesCircle} className="status-icon failed" />;
      default:
        return <FontAwesomeIcon icon={faQuestionCircle} className="status-icon unknown" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Exit Sign':
        return <FontAwesomeIcon icon={faSignHanging} className="type-icon exit-sign" />;
      case 'Bulkhead Light':
        return <FontAwesomeIcon icon={faLightbulb} className="type-icon bulkhead" />;
      case 'Downlight':
        return <FontAwesomeIcon icon={faLampDesk} className="type-icon downlight" />;
      case 'Twinspot':
        return <FontAwesomeIcon icon={faLampStreet} className="type-icon twinspot" />;
      default:
        return <FontAwesomeIcon icon={faQuestionCircle} className="type-icon unknown" />;
    }
  };

  const isOverdue = (nextDue) => {
    const today = new Date();
    const dueDate = new Date(nextDue);
    return dueDate < today;
  };

  const filteredFixtures = fixtures.filter(fixture => {
    // Apply search filter
    if (searchQuery && !fixture.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !fixture.zone.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply other filters
    if (filters.property && fixture.zone.split(' - ')[0] !== filters.property) {
      return false;
    }
    
    if (filters.zone && !fixture.zone.includes(filters.zone)) {
      return false;
    }
    
    if (filters.status && fixture.status !== filters.status) {
      return false;
    }
    
    if (filters.testFrequency && fixture.testFrequency !== filters.testFrequency) {
      return false;
    }
    
    // Date range filter would be implemented here
    
    return true;
  });

  if (loading) {
    return <div className="loading">Loading emergency lighting fixtures...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="emergency-lights-container">
      <div className="page-header">
        <div className="header-content">
          <h1>Emergency Lighting</h1>
          <p>Manage routine tests, inspections, and maintenance for all emergency lighting systems.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} /> Add Fixture
          </button>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search by ID, location, or notes..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <div className="filter-actions">
          <button 
            className={`view-mode-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('table')}
          >
            Table View
          </button>
          <button 
            className={`view-mode-btn ${viewMode === 'card' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('card')}
          >
            Card View
          </button>
          <button 
            className="filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FontAwesomeIcon icon={faFilter} />
            Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Property</label>
            <select 
              name="property" 
              value={filters.property} 
              onChange={handleFilterChange}
            >
              <option value="">All Properties</option>
              <option value="Main Building">Main Building</option>
              <option value="North Wing">North Wing</option>
              <option value="South Wing">South Wing</option>
              <option value="East Building">East Building</option>
              <option value="West Building">West Building</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Zone</label>
            <select 
              name="zone" 
              value={filters.zone} 
              onChange={handleFilterChange}
            >
              <option value="">All Zones</option>
              <option value="Stairwell">Stairwell</option>
              <option value="Corridor">Corridor</option>
              <option value="Fire Exit">Fire Exit</option>
              <option value="Lobby">Lobby</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Status</label>
            <select 
              name="status" 
              value={filters.status} 
              onChange={handleFilterChange}
            >
              <option value="">All Statuses</option>
              <option value="working">Working</option>
              <option value="needs-testing">Needs Testing</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Test Frequency</label>
            <select 
              name="testFrequency" 
              value={filters.testFrequency} 
              onChange={handleFilterChange}
            >
              <option value="">All Frequencies</option>
              <option value="Monthly">Monthly</option>
              <option value="6-Month">6-Month</option>
              <option value="Annual">Annual</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Last Tested</label>
            <select 
              name="dateRange" 
              value={filters.dateRange} 
              onChange={handleFilterChange}
            >
              <option value="">All Dates</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="last180">Last 180 Days</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      )}

      {viewMode === 'table' ? (
        <div className="table-container">
          <table className="fixtures-table">
            <thead>
              <tr>
                <th>Fixture ID</th>
                <th>Zone</th>
                <th>Type</th>
                <th>Last Test</th>
                <th>Next Due</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFixtures.length > 0 ? (
                filteredFixtures.map(fixture => (
                  <tr 
                    key={fixture.id} 
                    className={isOverdue(fixture.nextDue) ? 'overdue' : ''}
                  >
                    <td>{fixture.id}</td>
                    <td>{fixture.zone}</td>
                    <td>
                      <div className="type-cell">
                        {getTypeIcon(fixture.type)}
                        <span>{fixture.type}</span>
                      </div>
                    </td>
                    <td>{new Date(fixture.lastTest).toLocaleDateString()}</td>
                    <td>
                      <div className="date-cell">
                        {new Date(fixture.nextDue).toLocaleDateString()}
                        {isOverdue(fixture.nextDue) && (
                          <span className="overdue-badge">Overdue</span>
                        )}
                      </div>
                    </td>
                    <td>{getStatusBadge(fixture.status)}</td>
                    <td>{fixture.assignedTo}</td>
                    <td className="actions-cell">
                      <button className="action-btn view" title="View Details">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="action-btn edit" title="Edit Fixture">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        className="action-btn test" 
                        title="Log Test"
                        onClick={() => handleLogTest(fixture)}
                      >
                        <FontAwesomeIcon icon={faClipboardCheck} />
                      </button>
                      <button className="action-btn download" title="Download Report">
                        <FontAwesomeIcon icon={faDownload} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-results">No emergency lighting fixtures found matching your criteria</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card-container">
          {filteredFixtures.length > 0 ? (
            filteredFixtures.map(fixture => (
              <div 
                key={fixture.id} 
                className={`fixture-card ${isOverdue(fixture.nextDue) ? 'overdue' : ''}`}
              >
                <div className="card-header">
                  <div className="card-title">
                    <h3>{fixture.id}</h3>
                    {getStatusIcon(fixture.status)}
                  </div>
                  <div className="card-actions">
                    <button className="action-btn view" title="View Details">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="action-btn edit" title="Edit Fixture">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                      className="action-btn test" 
                      title="Log Test"
                      onClick={() => handleLogTest(fixture)}
                    >
                      <FontAwesomeIcon icon={faClipboardCheck} />
                    </button>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="card-info">
                    <div className="info-item">
                      <span className="info-label">Zone:</span>
                      <span className="info-value">{fixture.zone}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Type:</span>
                      <span className="info-value">
                        <div className="type-cell">
                          {getTypeIcon(fixture.type)}
                          <span>{fixture.type}</span>
                        </div>
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Assigned To:</span>
                      <span className="info-value">{fixture.assignedTo}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Test Frequency:</span>
                      <span className="info-value">{fixture.testFrequency}</span>
                    </div>
                  </div>
                  
                  <div className="card-dates">
                    <div className="date-item">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>Last Test: {new Date(fixture.lastTest).toLocaleDateString()}</span>
                    </div>
                    <div className="date-item">
                      <FontAwesomeIcon icon={faClock} />
                      <span>
                        Next Due: {new Date(fixture.nextDue).toLocaleDateString()}
                        {isOverdue(fixture.nextDue) && (
                          <span className="overdue-badge">Overdue</span>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-status">
                    {getStatusBadge(fixture.status)}
                  </div>
                  
                  {fixture.notes && (
                    <div className="card-notes">
                      <p>{fixture.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="card-footer">
                  <button className="btn btn-secondary">
                    <FontAwesomeIcon icon={faDownload} /> Download Report
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No emergency lighting fixtures found matching your criteria</div>
          )}
        </div>
      )}

      {showTestModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Log Test</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="test-info">
                <h3>{selectedFixture.id} - {selectedFixture.zone}</h3>
                <p>Type: {selectedFixture.type}</p>
              </div>
              
              <form onSubmit={handleTestSubmit}>
                <div className="form-group">
                  <label>Test Date</label>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <input type="date" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Tested By</label>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faUser} />
                    <select required>
                      <option value="">Select Tester</option>
                      <option value="1">John Smith (Internal)</option>
                      <option value="2">Sarah Johnson (Internal)</option>
                      <option value="3">Mike Wilson (Internal)</option>
                      <option value="4">FireTech Solutions (External)</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Test Outcome</label>
                  <select required>
                    <option value="pass">Pass</option>
                    <option value="fail">Fail</option>
                    <option value="recheck">Needs Recheck</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Notes</label>
                  <textarea rows="4" placeholder="Enter test notes..."></textarea>
                </div>
                
                <div className="form-group">
                  <label>Upload Evidence</label>
                  <div className="file-upload">
                    <button type="button" className="btn btn-secondary">
                      <FontAwesomeIcon icon={faUpload} /> Choose Files
                    </button>
                    <span className="file-hint">Upload photos or PDF reports</span>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Test
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyLights; 