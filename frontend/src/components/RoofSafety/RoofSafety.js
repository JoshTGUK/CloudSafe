import React, { useState, useEffect } from 'react';
import './RoofSafety.css';
import { useParams, useNavigate } from 'react-router-dom';
import MainHeader from '../common/MainHeader/MainHeader';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faAnchor,
  faToolbox,
  faWrench,
  faStairs,
  faGripLines,
  faShield,
  faChevronRight,
  faChevronDown,
  faArrowLeft,
  faLink,
  faCrane,
  faRuler
} from '@fortawesome/free-solid-svg-icons';
import { getAuthHeader, clearToken } from '../../utils/auth';

// Import all safety components
import Cradles from './Cradles';
import Ladders from './ladders';
import Walkways from './Walkways';
import Handrails from './Handrails';
import StaticLines from './Staticlines';
import AnchorPoints from './AnchorPoints';
import RoofSafetyDashboard from './RoofSafetyDashboard';
import DavitBases from './DavitBases';

const sidebarSections = [
  {
    id: 'dashboard',
    title: 'Roof Dashboard',
    icon: faChartLine,
    component: RoofSafetyDashboard
  },
  {
    id: 'anchorPoints',
    title: 'Anchor Points',
    icon: faAnchor,
    component: AnchorPoints
  },
  {
    id: 'cradles',
    title: 'Cradles',
    icon: faToolbox,
    component: Cradles
  },
  {
    id: 'davitBases',
    title: 'Davit Bases',
    icon: faWrench,
    component: DavitBases
  },
  {
    id: 'ladders',
    title: 'Ladders',
    icon: faStairs,
    component: Ladders
  },
  {
    id: 'staticLines',
    title: 'Static Lines',
    icon: faGripLines,
    component: StaticLines
  },
  {
    id: 'handrails',
    title: 'Handrails',
    icon: faShield,
    component: Handrails
  }
];

export default function RoofSafety() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [anchorPoints, setAnchorPoints] = useState([]);
  const [cradles, setCradles] = useState([]);
  const [newAnchorPoint, setNewAnchorPoint] = useState({
    name: '',
    location: '',
    type: 'Fall Arrest',
    lastTestDate: new Date().toISOString().split('T')[0],
    status: 'Unknown'
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAnchorPoint, setEditingAnchorPoint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCradle, setNewCradle] = useState({
    location: '',
    type: 'Standard',
    lastTestDate: new Date().toISOString().split('T')[0],
    status: 'Unknown'
  });
  const [editingCradle, setEditingCradle] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3006';

  const checkServerConnectivity = async () => {
    try {
      const headers = getAuthHeader();
      if (!Object.keys(headers).length) {
        navigate('/login');
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/api/properties/${id}`, {
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        clearToken();
        navigate('/login');
        return false;
      }

      return response.ok;
    } catch (error) {
      console.error('Server connectivity error:', error);
      return false;
    }
  };

  const handleCreateAnchorPoint = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Using token:', token.substring(0, 20) + '...');

      const requestData = {
        name: newAnchorPoint.name,
        location: newAnchorPoint.location,
        type: newAnchorPoint.type,
        lastTestDate: newAnchorPoint.lastTestDate,
        status: 'Unknown'
      };

      console.log('Creating anchor point:', {
        url: `${API_BASE_URL}/api/properties/${id}/anchor-points`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: requestData
      });

      const response = await fetch(`${API_BASE_URL}/api/properties/${id}/anchor-points`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });

      const responseData = await response.text();
      console.log('Response details:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseData,
        url: response.url
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = JSON.parse(responseData);
          errorMessage = errorData.message || `Failed to create anchor point: ${response.status} ${response.statusText}`;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}. Response: ${responseData}`;
        }
        throw new Error(errorMessage);
      }

      let createdPoint;
      try {
        createdPoint = JSON.parse(responseData);
      } catch (e) {
        console.error('Error parsing response:', e);
        throw new Error(`Invalid response format from server. Raw response: ${responseData}`);
      }

      console.log('Successfully created anchor point:', createdPoint);
      
      // Update the UI with the new point
      setAnchorPoints(prev => [...prev, {
        ...createdPoint,
        lastTestDate: createdPoint.last_inspection_date,
        propertyId: createdPoint.property_id,
        location: createdPoint.location_description
      }]);
      
      setShowCreateModal(false);
      setNewAnchorPoint({
        name: '',
        location: '',
        type: 'Fall Arrest',
        lastTestDate: new Date().toISOString().split('T')[0],
        status: 'Unknown'
      });
      toast.success('Anchor point created successfully');

      // Refresh the list after creation
      fetchRoofSafetyData();
    } catch (error) {
      console.error('Error creating anchor point:', error);
      toast.error(error.message || 'Failed to create anchor point');
    }
  };

  const handleEditClick = (point) => {
    try {
      // Parse the date string and create a valid date object
      const dateParts = point.lastTestDate.split('/');
      const formattedDate = `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`;
      
      setEditingAnchorPoint({
        ...point,
        lastTestDate: formattedDate
      });
      setShowEditModal(true);
    } catch (error) {
      console.error('Error formatting date:', error);
      toast.error('Error opening edit form. Please try again.');
    }
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/properties/${id}/anchor-points/${editingAnchorPoint.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editingAnchorPoint.name,
          location: editingAnchorPoint.location,
          type: editingAnchorPoint.type,
          lastTestDate: editingAnchorPoint.lastTestDate,
          status: editingAnchorPoint.status
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to update anchor point' }));
        throw new Error(errorData.message || 'Failed to update anchor point');
      }

      const updatedPoint = await response.json();
      setAnchorPoints(anchorPoints.map(point => 
        point.id === updatedPoint.id ? updatedPoint : point
      ));
      setShowEditModal(false);
      setEditingAnchorPoint(null);
      toast.success('Anchor point updated successfully');
    } catch (error) {
      console.error('Error updating anchor point:', error);
      toast.error(error.message || 'Failed to update anchor point');
    }
  };

  const handleDeleteAnchorPoint = async (pointId) => {
    if (window.confirm('Are you sure you want to delete this anchor point?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/properties/${id}/anchor-points/${pointId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to delete anchor point' }));
          throw new Error(errorData.message || 'Failed to delete anchor point');
        }

        setAnchorPoints(anchorPoints.filter(point => point.id !== pointId));
        setShowEditModal(false);
        setEditingAnchorPoint(null);
        toast.success('Anchor point deleted successfully');
      } catch (error) {
        console.error('Error deleting anchor point:', error);
        toast.error(error.message || 'Failed to delete anchor point');
      }
    }
  };

  const handleStatusUpdate = async (pointId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/properties/${id}/anchor_points/${pointId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to update status' }));
        throw new Error(errorData.message || 'Failed to update status');
      }

      const updatedPoint = await response.json();
      setAnchorPoints(anchorPoints.map(point => 
        point.id === updatedPoint.id ? updatedPoint : point
      ));

      // Dispatch event to update dashboard
      window.dispatchEvent(new Event('anchorPointStatusChanged'));
    } catch (error) {
      console.error('Error updating status:', error);
      setError(error.message);
    }
  };

  const handleViewTestData = (point) => {
    console.log('Viewing test data for point:', point);
    console.log('Test report URL:', point.test_report_url);
    
    if (point.test_report_url) {
      // Check if the URL starts with http:// or https://
      let url = point.test_report_url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `${API_BASE_URL}/${url}`;
      }
      console.log('Opening URL:', url);
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.log('No test report URL available');
      toast.info('No test data available for this anchor point');
    }
  };

  const handleSectionClick = (section) => {
    setExpandedSection(section);
    setError(null);
    if (section === 'dashboard') {
      // Dashboard doesn't need to fetch specific data as it will fetch its own
      setAnchorPoints([]);
      setCradles([]);
    } else if (section === 'anchorPoints') {
      fetchRoofSafetyData();
    } else if (section === 'cradles') {
      fetchCradlesData();
    } else if (section === 'davitBases') {
      // The DavitBases component will handle its own data fetching
      setAnchorPoints([]);
      setCradles([]);
    } else if (section === 'ladders') {
      // The Ladders component will handle its own data fetching
      setAnchorPoints([]);
      setCradles([]);
    } else if (section === 'walkways') {
      // The Walkways component will handle its own data fetching
      setAnchorPoints([]);
      setCradles([]);
    } else if (section === 'handrails') {
      // The Handrails component will handle its own data fetching
      setAnchorPoints([]);
      setCradles([]);
    } else if (section === 'staticLines') {
      // The StaticLines component will handle its own data fetching
      setAnchorPoints([]);
      setCradles([]);
    } else {
      setAnchorPoints([]);
      setCradles([]);
      toast.info(`${section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} section is coming soon!`);
    }
  };

  const fetchRoofSafetyData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/api/properties/${id}/anchor-points`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 404) {
        console.log('No anchor points found for this property');
        setAnchorPoints([]);
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch anchor points: ${response.status}`);
      }

      const data = await response.json();
      const anchorPointsArray = Array.isArray(data) ? data : [data];
      
      const formattedData = anchorPointsArray.map(point => ({
        id: point.id,
        propertyId: point.property_id,
        name: point.name,
        location: point.location_description,
        latitude: point.latitude,
        longitude: point.longitude,
        status: point.status,
        type: point.type || 'Fall Arrest',
        installationDate: new Date(point.installation_date).toLocaleDateString(),
        lastTestDate: new Date(point.last_inspection_date).toLocaleDateString(),
        nextTestDate: new Date(point.next_inspection_date).toLocaleDateString(),
        notes: point.notes,
        test_report_url: point.test_report_url,
        createdAt: new Date(point.created_at).toLocaleDateString(),
        updatedAt: new Date(point.updated_at).toLocaleDateString()
      }));

      console.log('Formatted anchor points:', formattedData);
      setAnchorPoints(formattedData);

    } catch (err) {
      console.error('Error fetching roof safety data:', err);
      setError(err.message);
      toast.error(err.message || 'Failed to fetch anchor points');
    } finally {
      setLoading(false);
    }
  };

  const fetchCradlesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/api/properties/${id}/cradles`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 404) {
        console.log('No cradles found for this property');
        setCradles([]);
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch cradles: ${response.status}`);
      }

      const data = await response.json();
      const cradlesArray = Array.isArray(data) ? data : [data];
      
      const formattedData = cradlesArray.map(cradle => ({
        id: cradle.id,
        propertyId: cradle.property_id,
        location: cradle.location_description,
        type: cradle.type || 'Standard',
        status: cradle.status,
        lastTestDate: new Date(cradle.last_inspection_date).toLocaleDateString(),
        nextTestDate: new Date(cradle.next_inspection_date).toLocaleDateString(),
        test_report_url: cradle.test_report_url
      }));

      console.log('Formatted cradles:', formattedData);
      setCradles(formattedData);

    } catch (err) {
      console.error('Error fetching cradles data:', err);
      setError(err.message);
      toast.error(err.message || 'Failed to fetch cradles');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCradle = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const requestData = {
        location: newCradle.location,
        type: newCradle.type,
        lastTestDate: newCradle.lastTestDate,
        status: 'Unknown'
      };

      const response = await fetch(`${API_BASE_URL}/api/properties/${id}/cradles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Failed to create cradle');
      }

      const createdCradle = await response.json();
      
      setCradles(prev => [...prev, {
        ...createdCradle,
        lastTestDate: createdCradle.last_inspection_date,
        propertyId: createdCradle.property_id,
        location: createdCradle.location_description
      }]);
      
      setShowCreateModal(false);
      setNewCradle({
        location: '',
        type: 'Standard',
        lastTestDate: new Date().toISOString().split('T')[0],
        status: 'Unknown'
      });
      toast.success('Cradle created successfully');
      fetchCradlesData();
    } catch (error) {
      console.error('Error creating cradle:', error);
      toast.error(error.message || 'Failed to create cradle');
    }
  };

  const handleEditCradle = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/properties/${id}/cradles/${editingCradle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          location: editingCradle.location,
          type: editingCradle.type,
          lastTestDate: editingCradle.lastTestDate,
          status: editingCradle.status
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update cradle');
      }

      const updatedCradle = await response.json();
      setCradles(cradles.map(cradle => 
        cradle.id === updatedCradle.id ? updatedCradle : cradle
      ));
      setShowEditModal(false);
      setEditingCradle(null);
      toast.success('Cradle updated successfully');
    } catch (error) {
      console.error('Error updating cradle:', error);
      toast.error(error.message || 'Failed to update cradle');
    }
  };

  const handleDeleteCradle = async (cradleId) => {
    if (window.confirm('Are you sure you want to delete this cradle?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/properties/${id}/cradles/${cradleId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete cradle');
        }

        setCradles(cradles.filter(cradle => cradle.id !== cradleId));
        setShowEditModal(false);
        setEditingCradle(null);
        toast.success('Cradle deleted successfully');
      } catch (error) {
        console.error('Error deleting cradle:', error);
        toast.error(error.message || 'Failed to delete cradle');
      }
    }
  };

  const handleCradleStatusUpdate = async (cradleId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/properties/${id}/cradles/${cradleId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedCradle = await response.json();
      setCradles(cradles.map(cradle => 
        cradle.id === updatedCradle.id ? updatedCradle : cradle
      ));

      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.message || 'Failed to update status');
    }
  };

  const handleRowClick = (point) => {
    setSelectedPoint(point);
    setShowDetailModal(true);
  };

  // Add server connectivity check on component mount
  useEffect(() => {
    const checkServer = async () => {
      const isConnected = await checkServerConnectivity();
      if (!isConnected) {
        setError('Cannot connect to the server. Please check if the server is running.');
      }
    };
    checkServer();
  }, []);

  useEffect(() => {
    if (id) {
      fetchRoofSafetyData();
    }
  }, [id]);

  const renderContent = () => {
    const section = sidebarSections.find(s => s.id === expandedSection);
    if (!section) return null;
    const Component = section.component;
    return <Component propertyId={id} />;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="roof-safety-container">
      <MainHeader />
      <div className="roof-safety-content">
        <div className="roof-safety-sidebar">
          <button className="sidebar-back-btn" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
          <div className="roof-safety-menu">
            {sidebarSections.map((section) => (
              <div
                key={section.id}
                className={`roof-safety-menu-item ${expandedSection === section.id ? 'active' : ''}`}
                onClick={() => handleSectionClick(section.id)}
              >
                <div className="roof-safety-menu-item-header">
                  <FontAwesomeIcon icon={section.icon} className="roof-safety-menu-icon" />
                  <span>{section.title}</span>
                  <FontAwesomeIcon 
                    icon={expandedSection === section.id ? faChevronDown : faChevronRight} 
                    className="roof-safety-menu-arrow"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="roof-safety-main">
          {renderContent()}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && expandedSection === 'anchorPoints' && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Anchor Point</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleCreateAnchorPoint();
            }}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newAnchorPoint.name}
                  onChange={(e) => setNewAnchorPoint({
                    ...newAnchorPoint,
                    name: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={newAnchorPoint.location}
                  onChange={(e) => setNewAnchorPoint({
                    ...newAnchorPoint,
                    location: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={newAnchorPoint.type}
                  onChange={(e) => setNewAnchorPoint({
                    ...newAnchorPoint,
                    type: e.target.value
                  })}
                  required
                >
                  <option value="Fall Arrest">Fall Arrest</option>
                  <option value="Rope Access">Rope Access</option>
                  <option value="Abseil">Abseil</option>
                </select>
              </div>
              <div className="form-group">
                <label>Last Test Date</label>
                <input
                  type="date"
                  value={newAnchorPoint.lastTestDate}
                  onChange={(e) => setNewAnchorPoint({
                    ...newAnchorPoint,
                    lastTestDate: e.target.value
                  })}
                  required
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && editingAnchorPoint && expandedSection === 'anchorPoints' && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Anchor Point</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEditSubmit();
            }}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editingAnchorPoint.name}
                  onChange={(e) => setEditingAnchorPoint({
                    ...editingAnchorPoint,
                    name: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={editingAnchorPoint.location}
                  onChange={(e) => setEditingAnchorPoint({
                    ...editingAnchorPoint,
                    location: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={editingAnchorPoint.type}
                  onChange={(e) => setEditingAnchorPoint({
                    ...editingAnchorPoint,
                    type: e.target.value
                  })}
                >
                  <option value="Fall Arrest">Fall Arrest</option>
                  <option value="Rope Access">Rope Access</option>
                  <option value="Abseil">Abseil</option>
                </select>
              </div>
              <div className="form-group">
                <label>Last Test Date</label>
                <input
                  type="date"
                  value={editingAnchorPoint.lastTestDate}
                  onChange={(e) => setEditingAnchorPoint({
                    ...editingAnchorPoint,
                    lastTestDate: e.target.value
                  })}
                  required
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={() => handleDeleteAnchorPoint(editingAnchorPoint.id)}
                >
                  Delete
                </button>
                <div>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingAnchorPoint(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Modal for Cradles */}
      {showCreateModal && expandedSection === 'cradles' && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Cradle</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleCreateCradle();
            }}>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={newCradle.location}
                  onChange={(e) => setNewCradle({
                    ...newCradle,
                    location: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={newCradle.type}
                  onChange={(e) => setNewCradle({
                    ...newCradle,
                    type: e.target.value
                  })}
                  required
                >
                  <option value="Standard">Standard</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
              <div className="form-group">
                <label>Last Test Date</label>
                <input
                  type="date"
                  value={newCradle.lastTestDate}
                  onChange={(e) => setNewCradle({
                    ...newCradle,
                    lastTestDate: e.target.value
                  })}
                  required
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal for Cradles */}
      {showEditModal && editingCradle && expandedSection === 'cradles' && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Cradle</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEditCradle();
            }}>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={editingCradle.location}
                  onChange={(e) => setEditingCradle({
                    ...editingCradle,
                    location: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={editingCradle.type}
                  onChange={(e) => setEditingCradle({
                    ...editingCradle,
                    type: e.target.value
                  })}
                >
                  <option value="Standard">Standard</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
              <div className="form-group">
                <label>Last Test Date</label>
                <input
                  type="date"
                  value={editingCradle.lastTestDate}
                  onChange={(e) => setEditingCradle({
                    ...editingCradle,
                    lastTestDate: e.target.value
                  })}
                  required
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={() => handleDeleteCradle(editingCradle.id)}
                >
                  Delete
                </button>
                <div>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingCradle(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal for Anchor Points */}
      {showDetailModal && selectedPoint && (
        <div className="modal-overlay">
          <div className="modal detail-modal" style={{ width: '80%', maxWidth: '1000px', maxHeight: '90vh', overflow: 'auto' }}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
              <h2>Anchor Point Details</h2>
              <button 
                className="close-btn"
                onClick={() => setShowDetailModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            <div className="modal-content" style={{ padding: '20px' }}>
              <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="info-section">
                  <h3>General Information</h3>
                  <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
                    <strong>ID:</strong> <span>{selectedPoint.id}</span>
                    <strong>Name:</strong> <span>{selectedPoint.name}</span>
                    <strong>Location:</strong> <span>{selectedPoint.location}</span>
                    <strong>Type:</strong> <span>{selectedPoint.type}</span>
                    <strong>Status:</strong> 
                    <select
                      value={selectedPoint.status}
                      onChange={(e) => handleStatusUpdate(selectedPoint.id, e.target.value)}
                      className={`status-select ${selectedPoint.status.toLowerCase()}`}
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Pass">Pass</option>
                      <option value="Fail">Fail</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div className="dates-section">
                  <h3>Important Dates</h3>
                  <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
                    <strong>Installation Date:</strong> <span>{selectedPoint.installationDate}</span>
                    <strong>Last Test Date:</strong> <span>{selectedPoint.lastTestDate}</span>
                    <strong>Next Test Date:</strong> <span>{selectedPoint.nextTestDate}</span>
                    <strong>Created:</strong> <span>{selectedPoint.createdAt}</span>
                    <strong>Last Updated:</strong> <span>{selectedPoint.updatedAt}</span>
                  </div>
                </div>

                <div className="location-section" style={{ gridColumn: '1 / -1' }}>
                  <h3>Location Details</h3>
                  <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
                    <strong>Latitude:</strong> <span>{selectedPoint.latitude}</span>
                    <strong>Longitude:</strong> <span>{selectedPoint.longitude}</span>
                  </div>
                  <div className="map-placeholder" style={{ 
                    height: '300px', 
                    background: '#f0f0f0', 
                    margin: '20px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}>
                    Map will be integrated here
                  </div>
                </div>

                <div className="notes-section" style={{ gridColumn: '1 / -1' }}>
                  <h3>Notes</h3>
                  <p style={{ margin: '10px 0', padding: '10px', background: '#f9f9f9', borderRadius: '4px' }}>
                    {selectedPoint.notes || 'No notes available'}
                  </p>
                </div>

                <div className="actions-section" style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleViewTestData(selectedPoint)}
                  >
                    View Test Data
                  </button>
                  <button 
                    className="btn"
                    onClick={() => {
                      handleEditClick(selectedPoint);
                      setShowDetailModal(false);
                    }}
                  >
                    Edit Anchor Point
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 