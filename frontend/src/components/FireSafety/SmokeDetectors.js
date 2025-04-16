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
  faFire,
  faThermometerHalf,
  faWind,
  faLayerGroup,
  faClock,
  faPlus,
  faXmark,
  faQuestionCircle,
  faStickyNote,
  faCalendarCheck,
  faWrench
} from '@fortawesome/free-solid-svg-icons';
import './SmokeDetectors.css';

const SmokeDetectors = () => {
  const [detectors, setDetectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedDetector, setSelectedDetector] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [filters, setFilters] = useState({
    property: '',
    detectorType: '',
    status: '',
    zone: '',
    lastInspection: ''
  });

  // Mock data for smoke detectors
  const mockDetectors = [
    {
      id: 'SD-001',
      tag: 'SD-001',
      location: 'Main Building - Lobby',
      zone: 'Stairwell',
      type: 'Ionisation',
      lastTested: '2023-12-10',
      nextTestDue: '2024-01-10',
      status: 'operational',
      assignedTo: 'John Smith',
      notes: 'Fully operational, battery replaced during last test',
      hasCertificate: true
    },
    {
      id: 'SD-002',
      tag: 'SD-002',
      location: 'North Wing - Kitchen',
      zone: 'Room',
      type: 'Optical',
      lastTested: '2023-11-15',
      nextTestDue: '2023-12-15',
      status: 'needs-testing',
      assignedTo: 'Sarah Johnson',
      notes: 'Due for monthly test',
      hasCertificate: true
    },
    {
      id: 'SD-003',
      tag: 'SD-003',
      location: 'South Wing - Server Room',
      zone: 'Room',
      type: 'Heat',
      lastTested: '2023-10-20',
      nextTestDue: '2023-11-20',
      status: 'faulty',
      assignedTo: 'Mike Wilson',
      notes: 'Detector not responding to test, needs replacement',
      hasCertificate: false
    },
    {
      id: 'SD-004',
      tag: 'SD-004',
      location: 'East Building - Workshop',
      zone: 'Corridor',
      type: 'CO',
      lastTested: '2023-12-01',
      nextTestDue: '2024-01-01',
      status: 'operational',
      assignedTo: 'John Smith',
      notes: 'All systems operational',
      hasCertificate: true
    },
    {
      id: 'SD-005',
      tag: 'SD-005',
      location: 'West Building - Floor 3',
      zone: 'Stairwell',
      type: 'Combined',
      lastTested: '2023-09-05',
      nextTestDue: '2023-10-05',
      status: 'faulty',
      assignedTo: 'Sarah Johnson',
      notes: 'Battery low, needs replacement',
      hasCertificate: false
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch smoke detectors
    const fetchDetectors = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/fire-safety/smoke-detectors');
        // const data = await response.json();
        
        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDetectors(mockDetectors);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch smoke detectors');
        setLoading(false);
      }
    };

    fetchDetectors();
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

  const handleLogTest = (detector) => {
    setSelectedDetector(detector);
    setShowTestModal(true);
  };

  const handleCloseModal = () => {
    setShowTestModal(false);
    setSelectedDetector(null);
  };

  const handleTestSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // In a real app, this would make an API call to save the test record
    console.log('Test logged for:', selectedDetector.id);
    handleCloseModal();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'operational':
        return <span className="status-badge operational">Operational</span>;
      case 'needs-testing':
        return <span className="status-badge needs-testing">Needs Testing</span>;
      case 'faulty':
        return <span className="status-badge faulty">Faulty</span>;
      default:
        return <span className="status-badge unknown">Unknown</span>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon operational" />;
      case 'needs-testing':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="status-icon needs-testing" />;
      case 'faulty':
        return <FontAwesomeIcon icon={faTimesCircle} className="status-icon faulty" />;
      default:
        return <FontAwesomeIcon icon={faQuestionCircle} className="status-icon unknown" />;
    }
  };

  const getDetectorTypeIcon = (type) => {
    switch (type) {
      case 'Ionisation':
        return <FontAwesomeIcon icon={faFire} className="type-icon ionisation" />;
      case 'Optical':
        return <FontAwesomeIcon icon={faFire} className="type-icon optical" />;
      case 'Heat':
        return <FontAwesomeIcon icon={faThermometerHalf} className="type-icon heat" />;
      case 'CO':
        return <FontAwesomeIcon icon={faWind} className="type-icon co" />;
      case 'Combined':
        return <FontAwesomeIcon icon={faLayerGroup} className="type-icon combined" />;
      default:
        return <FontAwesomeIcon icon={faFire} className="type-icon unknown" />;
    }
  };

  const isOverdue = (lastTested) => {
    const today = new Date();
    const testDate = new Date(lastTested);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    return testDate < oneMonthAgo;
  };

  const filteredDetectors = detectors.filter(detector => {
    // Apply search filter
    if (searchQuery && !detector.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !detector.tag.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !detector.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !detector.zone.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !detector.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply other filters
    if (filters.property && detector.location.split(' - ')[0] !== filters.property) {
      return false;
    }
    
    if (filters.detectorType && detector.type !== filters.detectorType) {
      return false;
    }
    
    if (filters.status && detector.status !== filters.status) {
      return false;
    }
    
    if (filters.zone && detector.zone !== filters.zone) {
      return false;
    }
    
    // Last inspection filter would be implemented here
    
    return true;
  });

  if (loading) {
    return <div className="loading">Loading smoke detectors...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="smoke-detectors-container">
      <div className="page-header">
        <div className="header-content">
          <h1>Smoke Detectors</h1>
          <p>View, manage, and log inspections for all smoke detectors installed across your properties.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} /> Add Smoke Detector
          </button>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search by ID, location, zone, or inspector..."
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
            <label>Detector Type</label>
            <select 
              name="detectorType" 
              value={filters.detectorType} 
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="Ionisation">Ionisation</option>
              <option value="Optical">Optical</option>
              <option value="Heat">Heat</option>
              <option value="CO">CO</option>
              <option value="Combined">Combined</option>
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
              <option value="operational">Operational</option>
              <option value="needs-testing">Needs Testing</option>
              <option value="faulty">Faulty</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Zone/Area</label>
            <select 
              name="zone" 
              value={filters.zone} 
              onChange={handleFilterChange}
            >
              <option value="">All Zones</option>
              <option value="Stairwell">Stairwell</option>
              <option value="Corridor">Corridor</option>
              <option value="Room">Room</option>
              <option value="Lobby">Lobby</option>
              <option value="Kitchen">Kitchen</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Last Inspection</label>
            <select 
              name="lastInspection" 
              value={filters.lastInspection} 
              onChange={handleFilterChange}
            >
              <option value="">All Dates</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      )}

      {viewMode === 'table' ? (
        <div className="table-container">
          <table className="detectors-table">
            <thead>
              <tr>
                <th>Detector ID</th>
                <th>Location</th>
                <th>Zone</th>
                <th>Type</th>
                <th>Last Tested</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDetectors.length > 0 ? (
                filteredDetectors.map(detector => (
                  <tr 
                    key={detector.id} 
                    className={isOverdue(detector.lastTested) ? 'overdue' : ''}
                  >
                    <td>{detector.tag}</td>
                    <td>{detector.location}</td>
                    <td>{detector.zone}</td>
                    <td>
                      <div className="type-cell">
                        {getDetectorTypeIcon(detector.type)}
                        <span>{detector.type}</span>
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">
                        {new Date(detector.lastTested).toLocaleDateString()}
                        {isOverdue(detector.lastTested) && (
                          <span className="overdue-badge">Overdue</span>
                        )}
                      </div>
                    </td>
                    <td>{getStatusBadge(detector.status)}</td>
                    <td>{detector.assignedTo}</td>
                    <td className="actions-cell">
                      <button className="action-btn view" title="View Details">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="action-btn edit" title="Edit Detector">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        className="action-btn inspect" 
                        title="Log Test"
                        onClick={() => handleLogTest(detector)}
                      >
                        <FontAwesomeIcon icon={faClipboardCheck} />
                      </button>
                      <button className="action-btn repair" title="Mark as Repaired">
                        <FontAwesomeIcon icon={faWrench} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-results">No smoke detectors found matching your criteria</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card-container">
          {filteredDetectors.length > 0 ? (
            filteredDetectors.map(detector => (
              <div 
                key={detector.id} 
                className={`detector-card ${isOverdue(detector.lastTested) ? 'overdue' : ''}`}
              >
                <div className="card-header">
                  <div className="card-title">
                    <h3>{detector.tag}</h3>
                    {getStatusIcon(detector.status)}
                  </div>
                  <div className="card-actions">
                    <button className="action-btn view" title="View Details">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="action-btn edit" title="Edit Detector">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                      className="action-btn inspect" 
                      title="Log Test"
                      onClick={() => handleLogTest(detector)}
                    >
                      <FontAwesomeIcon icon={faClipboardCheck} />
                    </button>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="card-info">
                    <div className="info-item">
                      <span className="info-label">Location:</span>
                      <span className="info-value">{detector.location}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Zone:</span>
                      <span className="info-value">{detector.zone}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Type:</span>
                      <span className="info-value">
                        <div className="type-cell">
                          {getDetectorTypeIcon(detector.type)}
                          <span>{detector.type}</span>
                        </div>
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Assigned To:</span>
                      <span className="info-value">{detector.assignedTo}</span>
                    </div>
                  </div>
                  
                  <div className="card-dates">
                    <div className="date-item">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>Last Tested: {new Date(detector.lastTested).toLocaleDateString()}</span>
                    </div>
                    <div className="date-item">
                      <FontAwesomeIcon icon={faCalendarCheck} />
                      <span>
                        Next Due: {new Date(detector.nextTestDue).toLocaleDateString()}
                        {isOverdue(detector.lastTested) && (
                          <span className="overdue-badge">Overdue</span>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-status">
                    {getStatusBadge(detector.status)}
                  </div>
                  
                  {detector.notes && (
                    <div className="card-notes">
                      <p>{detector.notes}</p>
                    </div>
                  )}
                  
                  <div className="card-certificate">
                    <FontAwesomeIcon icon={faStickyNote} />
                    <span>Certificate: {detector.hasCertificate ? 'Present' : 'Missing'}</span>
                  </div>
                </div>
                
                <div className="card-footer">
                  <button className="btn btn-secondary">
                    <FontAwesomeIcon icon={faWrench} /> Mark as Repaired
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No smoke detectors found matching your criteria</div>
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
                <h3>{selectedDetector.tag} - {selectedDetector.location}</h3>
                <p>Type: {selectedDetector.type} | Zone: {selectedDetector.zone}</p>
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
                  <label>Inspector</label>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faUser} />
                    <select required>
                      <option value="">Select Inspector</option>
                      <option value="1">John Smith</option>
                      <option value="2">Sarah Johnson</option>
                      <option value="3">Mike Wilson</option>
                      <option value="4">FireTech Solutions</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Test Result</label>
                  <select required>
                    <option value="passed">Passed</option>
                    <option value="failed">Failed</option>
                    <option value="retest">Re-test Needed</option>
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
                    <span className="file-hint">Upload photos or test reports</span>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Test Record
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

export default SmokeDetectors; 