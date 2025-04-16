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
  faDoorClosed,
  faDoorClosed as faDoorFront,
  faDoorOpen,
  faDoorOpen as faDoorHanger,
  faClock,
  faPlus,
  faXmark,
  faQuestionCircle,
  faStickyNote
} from '@fortawesome/free-solid-svg-icons';
import './FireDoors.css';

const FireDoors = () => {
  const [doors, setDoors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [filters, setFilters] = useState({
    property: '',
    doorType: '',
    status: '',
    lastInspected: ''
  });

  // Mock data for fire doors
  const mockDoors = [
    {
      id: 'FD-001',
      location: 'Main Building - Stairwell A',
      type: 'Single',
      lastInspection: '2023-12-10',
      status: 'compliant',
      assignedInspector: 'John Smith',
      notes: 'Door functioning properly, self-closing mechanism working',
      hasSticker: true,
      fireResistance: 'FD30'
    },
    {
      id: 'FD-002',
      location: 'North Wing - Corridor 2',
      type: 'Double',
      lastInspection: '2023-11-15',
      status: 'needs-repair',
      assignedInspector: 'Sarah Johnson',
      notes: 'Door closer needs adjustment',
      hasSticker: true,
      fireResistance: 'FD60'
    },
    {
      id: 'FD-003',
      location: 'South Wing - Fire Exit 1',
      type: 'Glazed',
      lastInspection: '2023-10-20',
      status: 'failed',
      assignedInspector: 'Mike Wilson',
      notes: 'Intumescent strip damaged',
      hasSticker: false,
      fireResistance: 'FD30'
    },
    {
      id: 'FD-004',
      location: 'East Building - Lobby',
      type: 'Steel',
      lastInspection: '2023-12-01',
      status: 'compliant',
      assignedInspector: 'John Smith',
      notes: 'All systems operational',
      hasSticker: true,
      fireResistance: 'FD90'
    },
    {
      id: 'FD-005',
      location: 'West Building - Floor 3',
      type: 'Timber',
      lastInspection: '2023-09-05',
      status: 'needs-repair',
      assignedInspector: 'Sarah Johnson',
      notes: 'Door warped, needs replacement',
      hasSticker: true,
      fireResistance: 'FD30'
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch fire doors
    const fetchDoors = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/fire-safety/doors');
        // const data = await response.json();
        
        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDoors(mockDoors);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch fire doors');
        setLoading(false);
      }
    };

    fetchDoors();
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

  const handleLogInspection = (door) => {
    setSelectedDoor(door);
    setShowInspectionModal(true);
  };

  const handleCloseModal = () => {
    setShowInspectionModal(false);
    setSelectedDoor(null);
  };

  const handleInspectionSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // In a real app, this would make an API call to save the inspection
    console.log('Inspection logged for:', selectedDoor.id);
    handleCloseModal();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'compliant':
        return <span className="status-badge compliant">Compliant</span>;
      case 'needs-repair':
        return <span className="status-badge needs-repair">Needs Repair</span>;
      case 'failed':
        return <span className="status-badge failed">Failed</span>;
      default:
        return <span className="status-badge unknown">Unknown</span>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon compliant" />;
      case 'needs-repair':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="status-icon needs-repair" />;
      case 'failed':
        return <FontAwesomeIcon icon={faTimesCircle} className="status-icon failed" />;
      default:
        return <FontAwesomeIcon icon={faQuestionCircle} className="status-icon unknown" />;
    }
  };

  const getDoorTypeIcon = (type) => {
    switch (type) {
      case 'Single':
        return <FontAwesomeIcon icon={faDoorFront} className="type-icon single" />;
      case 'Double':
        return <FontAwesomeIcon icon={faDoorOpen} className="type-icon double" />;
      case 'Glazed':
        return <FontAwesomeIcon icon={faDoorHanger} className="type-icon glazed" />;
      case 'Steel':
        return <FontAwesomeIcon icon={faDoorClosed} className="type-icon steel" />;
      case 'Timber':
        return <FontAwesomeIcon icon={faDoorFront} className="type-icon timber" />;
      default:
        return <FontAwesomeIcon icon={faQuestionCircle} className="type-icon unknown" />;
    }
  };

  const isOverdue = (lastInspection) => {
    const today = new Date();
    const inspectionDate = new Date(lastInspection);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    return inspectionDate < sixMonthsAgo;
  };

  const filteredDoors = doors.filter(door => {
    // Apply search filter
    if (searchQuery && !door.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !door.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !door.assignedInspector.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply other filters
    if (filters.property && door.location.split(' - ')[0] !== filters.property) {
      return false;
    }
    
    if (filters.doorType && door.type !== filters.doorType) {
      return false;
    }
    
    if (filters.status && door.status !== filters.status) {
      return false;
    }
    
    // Last inspected filter would be implemented here
    
    return true;
  });

  if (loading) {
    return <div className="loading">Loading fire doors...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="fire-doors-container">
      <div className="page-header">
        <div className="header-content">
          <h1>Fire Doors</h1>
          <p>Log inspections, upload documentation, and monitor the status of all fire doors across your properties.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} /> Add Fire Door
          </button>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search by ID, location, or inspector..."
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
            <label>Door Type</label>
            <select 
              name="doorType" 
              value={filters.doorType} 
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Glazed">Glazed</option>
              <option value="Steel">Steel</option>
              <option value="Timber">Timber</option>
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
              <option value="compliant">Compliant</option>
              <option value="needs-repair">Needs Repair</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Last Inspected</label>
            <select 
              name="lastInspected" 
              value={filters.lastInspected} 
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
          <table className="doors-table">
            <thead>
              <tr>
                <th>Door ID</th>
                <th>Location</th>
                <th>Type</th>
                <th>Last Inspection</th>
                <th>Status</th>
                <th>Assigned Inspector</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoors.length > 0 ? (
                filteredDoors.map(door => (
                  <tr 
                    key={door.id} 
                    className={isOverdue(door.lastInspection) ? 'overdue' : ''}
                  >
                    <td>{door.id}</td>
                    <td>{door.location}</td>
                    <td>
                      <div className="type-cell">
                        {getDoorTypeIcon(door.type)}
                        <span>{door.type}</span>
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">
                        {new Date(door.lastInspection).toLocaleDateString()}
                        {isOverdue(door.lastInspection) && (
                          <span className="overdue-badge">Overdue</span>
                        )}
                      </div>
                    </td>
                    <td>{getStatusBadge(door.status)}</td>
                    <td>{door.assignedInspector}</td>
                    <td className="actions-cell">
                      <button className="action-btn view" title="View Details">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="action-btn edit" title="Edit Door">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        className="action-btn inspect" 
                        title="Log Inspection"
                        onClick={() => handleLogInspection(door)}
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
                  <td colSpan="7" className="no-results">No fire doors found matching your criteria</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card-container">
          {filteredDoors.length > 0 ? (
            filteredDoors.map(door => (
              <div 
                key={door.id} 
                className={`door-card ${isOverdue(door.lastInspection) ? 'overdue' : ''}`}
              >
                <div className="card-header">
                  <div className="card-title">
                    <h3>{door.id}</h3>
                    {getStatusIcon(door.status)}
                  </div>
                  <div className="card-actions">
                    <button className="action-btn view" title="View Details">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="action-btn edit" title="Edit Door">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                      className="action-btn inspect" 
                      title="Log Inspection"
                      onClick={() => handleLogInspection(door)}
                    >
                      <FontAwesomeIcon icon={faClipboardCheck} />
                    </button>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="card-info">
                    <div className="info-item">
                      <span className="info-label">Location:</span>
                      <span className="info-value">{door.location}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Type:</span>
                      <span className="info-value">
                        <div className="type-cell">
                          {getDoorTypeIcon(door.type)}
                          <span>{door.type}</span>
                        </div>
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Fire Resistance:</span>
                      <span className="info-value">{door.fireResistance}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Assigned Inspector:</span>
                      <span className="info-value">{door.assignedInspector}</span>
                    </div>
                  </div>
                  
                  <div className="card-dates">
                    <div className="date-item">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>Last Inspection: {new Date(door.lastInspection).toLocaleDateString()}</span>
                    </div>
                    <div className="date-item">
                      <FontAwesomeIcon icon={faClock} />
                      <span>
                        Next Due: {new Date(new Date(door.lastInspection).setMonth(new Date(door.lastInspection).getMonth() + 6)).toLocaleDateString()}
                        {isOverdue(door.lastInspection) && (
                          <span className="overdue-badge">Overdue</span>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-status">
                    {getStatusBadge(door.status)}
                  </div>
                  
                  {door.notes && (
                    <div className="card-notes">
                      <p>{door.notes}</p>
                    </div>
                  )}
                  
                  <div className="card-sticker">
                    <FontAwesomeIcon icon={faStickyNote} />
                    <span>Fire Door Sticker: {door.hasSticker ? 'Present' : 'Missing'}</span>
                  </div>
                </div>
                
                <div className="card-footer">
                  <button className="btn btn-secondary">
                    <FontAwesomeIcon icon={faDownload} /> Download Report
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No fire doors found matching your criteria</div>
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
                <h3>{selectedDoor.id} - {selectedDoor.location}</h3>
                <p>Type: {selectedDoor.type} | Fire Resistance: {selectedDoor.fireResistance}</p>
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
                  <label>Inspector</label>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faUser} />
                    <select required>
                      <option value="">Select Inspector</option>
                      <option value="1">John Smith (Internal)</option>
                      <option value="2">Sarah Johnson (Internal)</option>
                      <option value="3">Mike Wilson (Internal)</option>
                      <option value="4">FireTech Solutions (External)</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Status After Inspection</label>
                  <select required>
                    <option value="compliant">Compliant</option>
                    <option value="needs-repair">Needs Repair</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Inspection Notes</label>
                  <textarea rows="4" placeholder="Enter inspection notes..."></textarea>
                </div>
                
                <div className="form-group checkbox-group">
                  <input type="checkbox" id="stickerPresent" />
                  <label htmlFor="stickerPresent">Fire Door Sticker Present</label>
                </div>
                
                <div className="form-group">
                  <label>Upload Evidence</label>
                  <div className="file-upload">
                    <button type="button" className="btn btn-secondary">
                      <FontAwesomeIcon icon={faUpload} /> Choose Files
                    </button>
                    <span className="file-hint">Upload photos of door tag, hinges, signage, gaps</span>
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

export default FireDoors; 