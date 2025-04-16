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
  faWater,
  faTint,
  faSnowflake,
  faFire,
  faClock,
  faPlus,
  faXmark,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import './Sprinklers.css';

const Sprinklers = () => {
  const [sprinklers, setSprinklers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [selectedSprinkler, setSelectedSprinkler] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [filters, setFilters] = useState({
    property: '',
    systemType: '',
    status: '',
    dateRange: ''
  });

  // Mock data for sprinkler systems
  const mockSprinklers = [
    {
      id: 'SP-001',
      type: 'Wet',
      location: 'Main Building - Lobby',
      lastInspection: '2023-12-15',
      status: 'operational',
      contractor: 'FireTech Solutions',
      notes: 'Annual inspection completed successfully',
      nextInspection: '2024-06-15'
    },
    {
      id: 'SP-002',
      type: 'Dry',
      location: 'North Wing - Floor 2',
      lastInspection: '2023-11-20',
      status: 'maintenance',
      contractor: 'SafetyFirst Systems',
      notes: 'Pipe replacement needed in zone 3',
      nextInspection: '2024-05-20'
    },
    {
      id: 'SP-003',
      type: 'Pre-Action',
      location: 'South Wing - Floor 1',
      lastInspection: '2023-10-05',
      status: 'offline',
      contractor: 'FireTech Solutions',
      notes: 'Control valve malfunction detected',
      nextInspection: '2024-04-05'
    },
    {
      id: 'SP-004',
      type: 'Deluge',
      location: 'East Building - Basement',
      lastInspection: '2023-12-01',
      status: 'operational',
      contractor: 'SafetyFirst Systems',
      notes: 'All systems operational',
      nextInspection: '2024-06-01'
    },
    {
      id: 'SP-005',
      type: 'Wet',
      location: 'West Building - Floor 3',
      lastInspection: '2023-09-15',
      status: 'maintenance',
      contractor: 'FireTech Solutions',
      notes: 'Pressure test required',
      nextInspection: '2024-03-15'
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch sprinkler systems
    const fetchSprinklers = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/fire-safety/sprinklers');
        // const data = await response.json();
        
        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSprinklers(mockSprinklers);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch sprinkler systems');
        setLoading(false);
      }
    };

    fetchSprinklers();
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

  const handleLogInspection = (sprinkler) => {
    setSelectedSprinkler(sprinkler);
    setShowInspectionModal(true);
  };

  const handleCloseModal = () => {
    setShowInspectionModal(false);
    setSelectedSprinkler(null);
  };

  const handleInspectionSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // In a real app, this would make an API call to save the inspection
    console.log('Inspection logged for:', selectedSprinkler.id);
    handleCloseModal();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'operational':
        return <span className="status-badge operational">Operational</span>;
      case 'maintenance':
        return <span className="status-badge maintenance">Maintenance Needed</span>;
      case 'offline':
        return <span className="status-badge offline">Offline</span>;
      default:
        return <span className="status-badge unknown">Unknown</span>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon operational" />;
      case 'maintenance':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="status-icon maintenance" />;
      case 'offline':
        return <FontAwesomeIcon icon={faTimesCircle} className="status-icon offline" />;
      default:
        return <FontAwesomeIcon icon={faQuestionCircle} className="status-icon unknown" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Wet':
        return <FontAwesomeIcon icon={faWater} className="type-icon wet" />;
      case 'Dry':
        return <FontAwesomeIcon icon={faSnowflake} className="type-icon dry" />;
      case 'Pre-Action':
        return <FontAwesomeIcon icon={faTint} className="type-icon pre-action" />;
      case 'Deluge':
        return <FontAwesomeIcon icon={faFire} className="type-icon deluge" />;
      default:
        return <FontAwesomeIcon icon={faQuestionCircle} className="type-icon unknown" />;
    }
  };

  const filteredSprinklers = sprinklers.filter(sprinkler => {
    // Apply search filter
    if (searchQuery && !sprinkler.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !sprinkler.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply other filters
    if (filters.property && sprinkler.location.split(' - ')[0] !== filters.property) {
      return false;
    }
    
    if (filters.systemType && sprinkler.type !== filters.systemType) {
      return false;
    }
    
    if (filters.status && sprinkler.status !== filters.status) {
      return false;
    }
    
    // Date range filter would be implemented here
    
    return true;
  });

  if (loading) {
    return <div className="loading">Loading sprinkler systems...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="sprinklers-container">
      <div className="page-header">
        <div className="header-content">
          <h1>Sprinkler Systems</h1>
          <p>Log inspections, monitor maintenance activity, and ensure full compliance of all sprinkler installations.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} /> Add Sprinkler System
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
            <label>System Type</label>
            <select 
              name="systemType" 
              value={filters.systemType} 
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="Wet">Wet</option>
              <option value="Dry">Dry</option>
              <option value="Pre-Action">Pre-Action</option>
              <option value="Deluge">Deluge</option>
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
              <option value="maintenance">Maintenance Needed</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Inspection Date</label>
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
          <table className="sprinklers-table">
            <thead>
              <tr>
                <th>System ID</th>
                <th>Type</th>
                <th>Location</th>
                <th>Last Inspection</th>
                <th>Next Inspection</th>
                <th>Status</th>
                <th>Contractor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSprinklers.length > 0 ? (
                filteredSprinklers.map(sprinkler => (
                  <tr key={sprinkler.id}>
                    <td>{sprinkler.id}</td>
                    <td>
                      <div className="type-cell">
                        {getTypeIcon(sprinkler.type)}
                        <span>{sprinkler.type}</span>
                      </div>
                    </td>
                    <td>{sprinkler.location}</td>
                    <td>{new Date(sprinkler.lastInspection).toLocaleDateString()}</td>
                    <td>{new Date(sprinkler.nextInspection).toLocaleDateString()}</td>
                    <td>{getStatusBadge(sprinkler.status)}</td>
                    <td>{sprinkler.contractor}</td>
                    <td className="actions-cell">
                      <button className="action-btn view" title="View Details">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="action-btn edit" title="Edit System">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        className="action-btn inspect" 
                        title="Log Inspection"
                        onClick={() => handleLogInspection(sprinkler)}
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
                  <td colSpan="8" className="no-results">No sprinkler systems found matching your criteria</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card-container">
          {filteredSprinklers.length > 0 ? (
            filteredSprinklers.map(sprinkler => (
              <div key={sprinkler.id} className="sprinkler-card">
                <div className="card-header">
                  <div className="card-title">
                    <h3>{sprinkler.id}</h3>
                    {getStatusIcon(sprinkler.status)}
                  </div>
                  <div className="card-actions">
                    <button className="action-btn view" title="View Details">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="action-btn edit" title="Edit System">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                      className="action-btn inspect" 
                      title="Log Inspection"
                      onClick={() => handleLogInspection(sprinkler)}
                    >
                      <FontAwesomeIcon icon={faClipboardCheck} />
                    </button>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="card-info">
                    <div className="info-item">
                      <span className="info-label">Type:</span>
                      <span className="info-value">
                        <div className="type-cell">
                          {getTypeIcon(sprinkler.type)}
                          <span>{sprinkler.type}</span>
                        </div>
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Location:</span>
                      <span className="info-value">{sprinkler.location}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Contractor:</span>
                      <span className="info-value">{sprinkler.contractor}</span>
                    </div>
                  </div>
                  
                  <div className="card-dates">
                    <div className="date-item">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>Last Inspection: {new Date(sprinkler.lastInspection).toLocaleDateString()}</span>
                    </div>
                    <div className="date-item">
                      <FontAwesomeIcon icon={faClock} />
                      <span>Next Inspection: {new Date(sprinkler.nextInspection).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="card-status">
                    {getStatusBadge(sprinkler.status)}
                  </div>
                  
                  {sprinkler.notes && (
                    <div className="card-notes">
                      <p>{sprinkler.notes}</p>
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
            <div className="no-results">No sprinkler systems found matching your criteria</div>
          )}
        </div>
      )}

      {showInspectionModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Log Inspection</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="inspection-info">
                <h3>{selectedSprinkler.id} - {selectedSprinkler.location}</h3>
                <p>Type: {selectedSprinkler.type}</p>
              </div>
              
              <form onSubmit={handleInspectionSubmit}>
                <div className="form-group">
                  <label>Inspection Date</label>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <input type="date" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Inspected By</label>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faUser} />
                    <select required>
                      <option value="">Select Inspector</option>
                      <option value="1">John Smith (Internal)</option>
                      <option value="2">Sarah Johnson (Internal)</option>
                      <option value="3">FireTech Solutions (External)</option>
                      <option value="4">SafetyFirst Systems (External)</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Status</label>
                  <select required>
                    <option value="operational">Operational</option>
                    <option value="maintenance">Maintenance Needed</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Notes</label>
                  <textarea rows="4" placeholder="Enter inspection notes..."></textarea>
                </div>
                
                <div className="form-group">
                  <label>Upload Files</label>
                  <div className="file-upload">
                    <button type="button" className="btn btn-secondary">
                      <FontAwesomeIcon icon={faUpload} /> Choose Files
                    </button>
                    <span className="file-hint">Upload images, PDF reports, or certificates</span>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Inspection
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

export default Sprinklers; 