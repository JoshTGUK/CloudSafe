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
  faFireExtinguisher,
  faWater,
  faSnowflake,
  faFlask,
  faSprayCan,
  faTint,
  faClock,
  faPlus,
  faXmark,
  faQuestionCircle,
  faStickyNote,
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';
import './FireExtinguishers.css';

const FireExtinguishers = () => {
  const [extinguishers, setExtinguishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedExtinguisher, setSelectedExtinguisher] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [filters, setFilters] = useState({
    property: '',
    extinguisherType: '',
    status: '',
    lastServiceDate: ''
  });

  // Mock data for fire extinguishers
  const mockExtinguishers = [
    {
      id: 'FE-001',
      tag: 'FE-001',
      location: 'Main Building - Lobby',
      type: 'Water',
      lastServiceDate: '2023-12-10',
      nextServiceDate: '2024-06-10',
      status: 'in-date',
      assignedContractor: 'FireTech Solutions',
      notes: 'Fully operational, pressure gauge in green zone',
      hasCertificate: true,
      size: '9L'
    },
    {
      id: 'FE-002',
      tag: 'FE-002',
      location: 'North Wing - Kitchen',
      type: 'CO₂',
      lastServiceDate: '2023-11-15',
      nextServiceDate: '2024-05-15',
      status: 'needs-service',
      assignedContractor: 'SafetyFirst Ltd',
      notes: 'Pressure gauge showing yellow zone, needs refill',
      hasCertificate: true,
      size: '5kg'
    },
    {
      id: 'FE-003',
      tag: 'FE-003',
      location: 'South Wing - Server Room',
      type: 'Foam',
      lastServiceDate: '2023-10-20',
      nextServiceDate: '2024-04-20',
      status: 'expired',
      assignedContractor: 'FireTech Solutions',
      notes: 'Certificate expired, needs immediate service',
      hasCertificate: false,
      size: '6L'
    },
    {
      id: 'FE-004',
      tag: 'FE-004',
      location: 'East Building - Workshop',
      type: 'Powder',
      lastServiceDate: '2023-12-01',
      nextServiceDate: '2024-06-01',
      status: 'in-date',
      assignedContractor: 'SafetyFirst Ltd',
      notes: 'All systems operational',
      hasCertificate: true,
      size: '9kg'
    },
    {
      id: 'FE-005',
      tag: 'FE-005',
      location: 'West Building - Floor 3',
      type: 'Wet Chemical',
      lastServiceDate: '2023-09-05',
      nextServiceDate: '2024-03-05',
      status: 'expired',
      assignedContractor: 'FireTech Solutions',
      notes: 'Overdue for service, needs immediate attention',
      hasCertificate: false,
      size: '6L'
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch fire extinguishers
    const fetchExtinguishers = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/fire-safety/extinguishers');
        // const data = await response.json();
        
        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 1000));
        setExtinguishers(mockExtinguishers);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch fire extinguishers');
        setLoading(false);
      }
    };

    fetchExtinguishers();
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

  const handleLogService = (extinguisher) => {
    setSelectedExtinguisher(extinguisher);
    setShowServiceModal(true);
  };

  const handleCloseModal = () => {
    setShowServiceModal(false);
    setSelectedExtinguisher(null);
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // In a real app, this would make an API call to save the service record
    console.log('Service logged for:', selectedExtinguisher.id);
    handleCloseModal();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in-date':
        return <span className="status-badge in-date">In Date</span>;
      case 'needs-service':
        return <span className="status-badge needs-service">Needs Service</span>;
      case 'expired':
        return <span className="status-badge expired">Expired</span>;
      default:
        return <span className="status-badge unknown">Unknown</span>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-date':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon in-date" />;
      case 'needs-service':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="status-icon needs-service" />;
      case 'expired':
        return <FontAwesomeIcon icon={faTimesCircle} className="status-icon expired" />;
      default:
        return <FontAwesomeIcon icon={faQuestionCircle} className="status-icon unknown" />;
    }
  };

  const getExtinguisherTypeIcon = (type) => {
    switch (type) {
      case 'Water':
        return <FontAwesomeIcon icon={faWater} className="type-icon water" />;
      case 'CO₂':
        return <FontAwesomeIcon icon={faSnowflake} className="type-icon co2" />;
      case 'Foam':
        return <FontAwesomeIcon icon={faFlask} className="type-icon foam" />;
      case 'Powder':
        return <FontAwesomeIcon icon={faSprayCan} className="type-icon powder" />;
      case 'Wet Chemical':
        return <FontAwesomeIcon icon={faTint} className="type-icon wet-chemical" />;
      default:
        return <FontAwesomeIcon icon={faFireExtinguisher} className="type-icon unknown" />;
    }
  };

  const isOverdue = (lastServiceDate) => {
    const today = new Date();
    const serviceDate = new Date(lastServiceDate);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    return serviceDate < sixMonthsAgo;
  };

  const filteredExtinguishers = extinguishers.filter(extinguisher => {
    // Apply search filter
    if (searchQuery && !extinguisher.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !extinguisher.tag.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !extinguisher.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !extinguisher.assignedContractor.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply other filters
    if (filters.property && extinguisher.location.split(' - ')[0] !== filters.property) {
      return false;
    }
    
    if (filters.extinguisherType && extinguisher.type !== filters.extinguisherType) {
      return false;
    }
    
    if (filters.status && extinguisher.status !== filters.status) {
      return false;
    }
    
    // Last service date filter would be implemented here
    
    return true;
  });

  if (loading) {
    return <div className="loading">Loading fire extinguishers...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="fire-extinguishers-container">
      <div className="page-header">
        <div className="header-content">
          <h1>Fire Extinguishers</h1>
          <p>Track and inspect all fire extinguishers across your properties to ensure compliance with safety regulations.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} /> Add Fire Extinguisher
          </button>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search by ID, tag, location, or contractor..."
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
            <label>Extinguisher Type</label>
            <select 
              name="extinguisherType" 
              value={filters.extinguisherType} 
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="Water">Water</option>
              <option value="CO₂">CO₂</option>
              <option value="Foam">Foam</option>
              <option value="Powder">Powder</option>
              <option value="Wet Chemical">Wet Chemical</option>
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
              <option value="in-date">In Date</option>
              <option value="needs-service">Needs Service</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Last Service Date</label>
            <select 
              name="lastServiceDate" 
              value={filters.lastServiceDate} 
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
          <table className="extinguishers-table">
            <thead>
              <tr>
                <th>Tag/ID</th>
                <th>Location</th>
                <th>Type</th>
                <th>Last Service Date</th>
                <th>Status</th>
                <th>Assigned Contractor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExtinguishers.length > 0 ? (
                filteredExtinguishers.map(extinguisher => (
                  <tr 
                    key={extinguisher.id} 
                    className={isOverdue(extinguisher.lastServiceDate) ? 'overdue' : ''}
                  >
                    <td>{extinguisher.tag}</td>
                    <td>{extinguisher.location}</td>
                    <td>
                      <div className="type-cell">
                        {getExtinguisherTypeIcon(extinguisher.type)}
                        <span>{extinguisher.type}</span>
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">
                        {new Date(extinguisher.lastServiceDate).toLocaleDateString()}
                        {isOverdue(extinguisher.lastServiceDate) && (
                          <span className="overdue-badge">Overdue</span>
                        )}
                      </div>
                    </td>
                    <td>{getStatusBadge(extinguisher.status)}</td>
                    <td>{extinguisher.assignedContractor}</td>
                    <td className="actions-cell">
                      <button className="action-btn view" title="View Details">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="action-btn edit" title="Edit Extinguisher">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        className="action-btn inspect" 
                        title="Log Service"
                        onClick={() => handleLogService(extinguisher)}
                      >
                        <FontAwesomeIcon icon={faClipboardCheck} />
                      </button>
                      <button className="action-btn download" title="Download Certificate">
                        <FontAwesomeIcon icon={faDownload} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-results">No fire extinguishers found matching your criteria</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card-container">
          {filteredExtinguishers.length > 0 ? (
            filteredExtinguishers.map(extinguisher => (
              <div 
                key={extinguisher.id} 
                className={`extinguisher-card ${isOverdue(extinguisher.lastServiceDate) ? 'overdue' : ''}`}
              >
                <div className="card-header">
                  <div className="card-title">
                    <h3>{extinguisher.tag}</h3>
                    {getStatusIcon(extinguisher.status)}
                  </div>
                  <div className="card-actions">
                    <button className="action-btn view" title="View Details">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="action-btn edit" title="Edit Extinguisher">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                      className="action-btn inspect" 
                      title="Log Service"
                      onClick={() => handleLogService(extinguisher)}
                    >
                      <FontAwesomeIcon icon={faClipboardCheck} />
                    </button>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="card-info">
                    <div className="info-item">
                      <span className="info-label">Location:</span>
                      <span className="info-value">{extinguisher.location}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Type:</span>
                      <span className="info-value">
                        <div className="type-cell">
                          {getExtinguisherTypeIcon(extinguisher.type)}
                          <span>{extinguisher.type}</span>
                        </div>
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Size:</span>
                      <span className="info-value">{extinguisher.size}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Assigned Contractor:</span>
                      <span className="info-value">{extinguisher.assignedContractor}</span>
                    </div>
                  </div>
                  
                  <div className="card-dates">
                    <div className="date-item">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>Last Service: {new Date(extinguisher.lastServiceDate).toLocaleDateString()}</span>
                    </div>
                    <div className="date-item">
                      <FontAwesomeIcon icon={faCalendarCheck} />
                      <span>
                        Next Due: {new Date(extinguisher.nextServiceDate).toLocaleDateString()}
                        {isOverdue(extinguisher.lastServiceDate) && (
                          <span className="overdue-badge">Overdue</span>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-status">
                    {getStatusBadge(extinguisher.status)}
                  </div>
                  
                  {extinguisher.notes && (
                    <div className="card-notes">
                      <p>{extinguisher.notes}</p>
                    </div>
                  )}
                  
                  <div className="card-certificate">
                    <FontAwesomeIcon icon={faStickyNote} />
                    <span>Certificate: {extinguisher.hasCertificate ? 'Present' : 'Missing'}</span>
                  </div>
                </div>
                
                <div className="card-footer">
                  <button className="btn btn-secondary">
                    <FontAwesomeIcon icon={faDownload} /> Download Certificate
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No fire extinguishers found matching your criteria</div>
          )}
        </div>
      )}

      {showServiceModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Log Service</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="service-info">
                <h3>{selectedExtinguisher.tag} - {selectedExtinguisher.location}</h3>
                <p>Type: {selectedExtinguisher.type} | Size: {selectedExtinguisher.size}</p>
              </div>
              
              <form onSubmit={handleServiceSubmit}>
                <div className="form-group">
                  <label>Service Date</label>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <input type="date" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Service Provider</label>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faUser} />
                    <select required>
                      <option value="">Select Provider</option>
                      <option value="1">FireTech Solutions</option>
                      <option value="2">SafetyFirst Ltd</option>
                      <option value="3">FireGuard Systems</option>
                      <option value="4">Emergency Response Ltd</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Status After Service</label>
                  <select required>
                    <option value="in-date">In Date</option>
                    <option value="needs-service">Needs Service</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Next Service Date</label>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faCalendarCheck} />
                    <input type="date" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Service Notes</label>
                  <textarea rows="4" placeholder="Enter service notes..."></textarea>
                </div>
                
                <div className="form-group checkbox-group">
                  <input type="checkbox" id="certificatePresent" />
                  <label htmlFor="certificatePresent">Certificate Issued</label>
                </div>
                
                <div className="form-group">
                  <label>Upload Certificate / Evidence</label>
                  <div className="file-upload">
                    <button type="button" className="btn btn-secondary">
                      <FontAwesomeIcon icon={faUpload} /> Choose Files
                    </button>
                    <span className="file-hint">Upload service certificate, photos of extinguisher</span>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Service Record
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

export default FireExtinguishers; 