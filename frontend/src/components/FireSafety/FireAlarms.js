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
  faBell,
  faBell as faAlarm,
  faClock,
  faPlus,
  faXmark,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import './FireAlarms.css';

const FireAlarms = () => {
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [filters, setFilters] = useState({
    property: '',
    systemType: '',
    status: '',
    dateRange: ''
  });

  // Mock data for fire alarm systems
  const mockAlarms = [
    {
      id: 'FA-001',
      type: 'Addressable',
      location: 'Main Building - Lobby',
      lastInspection: '2023-12-15',
      status: 'active',
      contractor: 'FireTech Solutions',
      notes: 'Annual inspection completed successfully',
      nextInspection: '2024-06-15'
    },
    {
      id: 'FA-002',
      type: 'Conventional',
      location: 'North Wing - Floor 2',
      lastInspection: '2023-11-20',
      status: 'maintenance',
      contractor: 'SafetyFirst Systems',
      notes: 'Battery replacement needed',
      nextInspection: '2024-05-20'
    },
    {
      id: 'FA-003',
      type: 'Wireless',
      location: 'South Wing - Floor 1',
      lastInspection: '2023-10-05',
      status: 'faulty',
      contractor: 'FireTech Solutions',
      notes: 'Sensor malfunction detected',
      nextInspection: '2024-04-05'
    },
    {
      id: 'FA-004',
      type: 'Addressable',
      location: 'East Building - Basement',
      lastInspection: '2023-12-01',
      status: 'active',
      contractor: 'SafetyFirst Systems',
      notes: 'All systems operational',
      nextInspection: '2024-06-01'
    },
    {
      id: 'FA-005',
      type: 'Conventional',
      location: 'West Building - Floor 3',
      lastInspection: '2023-09-15',
      status: 'maintenance',
      contractor: 'FireTech Solutions',
      notes: 'Control panel needs firmware update',
      nextInspection: '2024-03-15'
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch fire alarm systems
    const fetchAlarms = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/fire-safety/alarms');
        // const data = await response.json();
        
        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAlarms(mockAlarms);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch fire alarm systems');
        setLoading(false);
      }
    };

    fetchAlarms();
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

  const handleLogInspection = (alarm) => {
    setSelectedAlarm(alarm);
    setShowInspectionModal(true);
  };

  const handleCloseModal = () => {
    setShowInspectionModal(false);
    setSelectedAlarm(null);
  };

  const handleInspectionSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // In a real app, this would make an API call to save the inspection
    console.log('Inspection logged for:', selectedAlarm.id);
    handleCloseModal();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="status-badge active">Active</span>;
      case 'maintenance':
        return <span className="status-badge maintenance">Needs Maintenance</span>;
      case 'faulty':
        return <span className="status-badge faulty">Faulty</span>;
      default:
        return <span className="status-badge unknown">Unknown</span>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon active" />;
      case 'maintenance':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="status-icon maintenance" />;
      case 'faulty':
        return <FontAwesomeIcon icon={faTimesCircle} className="status-icon faulty" />;
      default:
        return <FontAwesomeIcon icon={faQuestionCircle} className="status-icon unknown" />;
    }
  };

  const filteredAlarms = alarms.filter(alarm => {
    // Apply search filter
    if (searchQuery && !alarm.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !alarm.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply other filters
    if (filters.property && alarm.location.split(' - ')[0] !== filters.property) {
      return false;
    }
    
    if (filters.systemType && alarm.type !== filters.systemType) {
      return false;
    }
    
    if (filters.status && alarm.status !== filters.status) {
      return false;
    }
    
    // Date range filter would be implemented here
    
    return true;
  });

  if (loading) {
    return <div className="loading">Loading fire alarm systems...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="fire-alarms-container">
      <div className="page-header">
        <div className="header-content">
          <h1>Fire Alarm Systems</h1>
          <p>Monitor and maintain the fire detection systems installed across your properties.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} /> Add New System
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
              <option value="Addressable">Addressable</option>
              <option value="Conventional">Conventional</option>
              <option value="Wireless">Wireless</option>
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
              <option value="active">Active</option>
              <option value="maintenance">Needs Maintenance</option>
              <option value="faulty">Faulty</option>
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
          <table className="alarms-table">
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
              {filteredAlarms.length > 0 ? (
                filteredAlarms.map(alarm => (
                  <tr key={alarm.id}>
                    <td>{alarm.id}</td>
                    <td>{alarm.type}</td>
                    <td>{alarm.location}</td>
                    <td>{new Date(alarm.lastInspection).toLocaleDateString()}</td>
                    <td>{new Date(alarm.nextInspection).toLocaleDateString()}</td>
                    <td>{getStatusBadge(alarm.status)}</td>
                    <td>{alarm.contractor}</td>
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
                        onClick={() => handleLogInspection(alarm)}
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
                  <td colSpan="8" className="no-results">No fire alarm systems found matching your criteria</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card-container">
          {filteredAlarms.length > 0 ? (
            filteredAlarms.map(alarm => (
              <div key={alarm.id} className="alarm-card">
                <div className="card-header">
                  <div className="card-title">
                    <h3>{alarm.id}</h3>
                    {getStatusIcon(alarm.status)}
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
                      onClick={() => handleLogInspection(alarm)}
                    >
                      <FontAwesomeIcon icon={faClipboardCheck} />
                    </button>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="card-info">
                    <div className="info-item">
                      <span className="info-label">Type:</span>
                      <span className="info-value">{alarm.type}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Location:</span>
                      <span className="info-value">{alarm.location}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Contractor:</span>
                      <span className="info-value">{alarm.contractor}</span>
                    </div>
                  </div>
                  
                  <div className="card-dates">
                    <div className="date-item">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>Last Inspection: {new Date(alarm.lastInspection).toLocaleDateString()}</span>
                    </div>
                    <div className="date-item">
                      <FontAwesomeIcon icon={faClock} />
                      <span>Next Inspection: {new Date(alarm.nextInspection).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="card-status">
                    {getStatusBadge(alarm.status)}
                  </div>
                  
                  {alarm.notes && (
                    <div className="card-notes">
                      <p>{alarm.notes}</p>
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
            <div className="no-results">No fire alarm systems found matching your criteria</div>
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
                <h3>{selectedAlarm.id} - {selectedAlarm.location}</h3>
                <p>Type: {selectedAlarm.type}</p>
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
                    <option value="active">Active</option>
                    <option value="maintenance">Needs Maintenance</option>
                    <option value="faulty">Faulty</option>
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

export default FireAlarms; 