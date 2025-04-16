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
  faLayerGroup,
  faClock,
  faPlus,
  faXmark,
  faQuestionCircle,
  faStickyNote,
  faCalendarCheck,
  faWrench
} from '@fortawesome/free-solid-svg-icons';
import './HeatDetectors.css';

const HeatDetectors = () => {
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
    areaType: '',
    testFrequency: '',
    lastTested: ''
  });

  // Mock data for heat detectors
  const mockDetectors = [
    {
      id: 'HD-001',
      tag: 'HD-001',
      location: 'Main Building - Kitchen',
      areaType: 'Kitchen',
      type: 'Fixed Temperature',
      lastTested: '2023-12-10',
      nextTestDue: '2024-01-10',
      status: 'operational',
      assignedTo: 'John Smith',
      notes: 'Fully operational, tested with heat gun',
      hasCertificate: true
    },
    {
      id: 'HD-002',
      tag: 'HD-002',
      location: 'North Wing - Plant Room',
      areaType: 'Plant Room',
      type: 'Rate-of-Rise',
      lastTested: '2023-11-15',
      nextTestDue: '2023-12-15',
      status: 'needs-testing',
      assignedTo: 'Sarah Johnson',
      notes: 'Due for monthly test',
      hasCertificate: true
    },
    {
      id: 'HD-003',
      tag: 'HD-003',
      location: 'South Wing - Electrical Cupboard',
      areaType: 'Electrical Cupboard',
      type: 'Combined',
      lastTested: '2023-10-20',
      nextTestDue: '2023-11-20',
      status: 'faulty',
      assignedTo: 'Mike Wilson',
      notes: 'Detector not responding to test, needs replacement',
      hasCertificate: false
    },
    {
      id: 'HD-004',
      tag: 'HD-004',
      location: 'East Building - Boiler Room',
      areaType: 'Plant Room',
      type: 'Fixed Temperature',
      lastTested: '2023-12-01',
      nextTestDue: '2024-01-01',
      status: 'operational',
      assignedTo: 'John Smith',
      notes: 'All systems operational',
      hasCertificate: true
    },
    {
      id: 'HD-005',
      tag: 'HD-005',
      location: 'West Building - Storage Room',
      areaType: 'Storage',
      type: 'Rate-of-Rise',
      lastTested: '2023-09-05',
      nextTestDue: '2023-10-05',
      status: 'faulty',
      assignedTo: 'Sarah Johnson',
      notes: 'Battery low, needs replacement',
      hasCertificate: false
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch heat detectors
    const fetchDetectors = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/fire-safety/heat-detectors');
        // const data = await response.json();
        
        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDetectors(mockDetectors);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch heat detectors');
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
      case 'Fixed Temperature':
        return <FontAwesomeIcon icon={faThermometerHalf} className="type-icon fixed-temp" />;
      case 'Rate-of-Rise':
        return <FontAwesomeIcon icon={faFire} className="type-icon rate-rise" />;
      case 'Combined':
        return <FontAwesomeIcon icon={faLayerGroup} className="type-icon combined" />;
      default:
        return <FontAwesomeIcon icon={faThermometerHalf} className="type-icon unknown" />;
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
        !detector.areaType.toLowerCase().includes(searchQuery.toLowerCase()) &&
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
    
    if (filters.areaType && detector.areaType !== filters.areaType) {
      return false;
    }
    
    // Last inspection filter would be implemented here
    
    return true;
  });

  if (loading) {
    return <div className="loading">Loading heat detectors...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="heat-detectors-container">
      <div className="page-header">
        <div className="header-content">
          <h1>Heat Detectors</h1>
          <p>Monitor and maintain all heat detectors installed across your buildings, with full inspection history and compliance status.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} /> Add Heat Detector
          </button>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search by ID, location, area type, or inspector..."
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
              <option value="Fixed Temperature">Fixed Temperature</option>
              <option value="Rate-of-Rise">Rate-of-Rise</option>
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
            <label>Area Type</label>
            <select 
              name="areaType" 
              value={filters.areaType} 
              onChange={handleFilterChange}
            >
              <option value="">All Areas</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Plant Room">Plant Room</option>
              <option value="Electrical Cupboard">Electrical Cupboard</option>
              <option value="Storage">Storage</option>
              <option value="Boiler Room">Boiler Room</option>
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
              <option value="monthly">Monthly</option>
              <option value="bi-annual">Bi-Annual</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Last Tested</label>
            <select 
              name="lastTested" 
              value={filters.lastTested} 
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
                <th>Area Type</th>
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
                    <td>{detector.areaType}</td>
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
                  <td colSpan="8" className="no-results">No heat detectors found matching your criteria</td>
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
                      <span className="info-label">Area Type:</span>
                      <span className="info-value">{detector.areaType}</span>
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
            <div className="no-results">No heat detectors found matching your criteria</div>
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
                <p>Type: {selectedDetector.type} | Area: {selectedDetector.areaType}</p>
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

export default HeatDetectors; 