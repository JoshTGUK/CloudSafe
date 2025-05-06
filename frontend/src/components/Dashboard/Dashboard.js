import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MainHeader from '../common/MainHeader/MainHeader.js';
import './Dashboard.css';
import allSafeLogo from '../../assets/ALL-Safe-logo.png';
import placeholderImage from '../../assets/placeholder.png';
import AddPropertyForm from '../Add Property Dashboard/AddPropertyForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropertyCard from '../PropertyCard/PropertyCard';
import { 
  FaSearch,
  FaPlus,
  FaMapMarkerAlt,
  FaExclamationTriangle, 
  FaCalendarCheck, 
  FaCheckCircle, 
  FaFileAlt,
  FaBell,
  FaTasks
} from 'react-icons/fa';
import { FaQuestionCircle, FaUserCircle } from 'react-icons/fa';
import NotificationPopup from '../NotificationPopup/NotificationPopup';
import SearchPopup from '../SearchPopup/SearchPopup';

// eslint-disable-next-line no-unused-vars
const API_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, index: null });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [recentProperties, setRecentProperties] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [complianceStats, setComplianceStats] = useState({
    overdueIssues: 8,
    inspectionsDue: 5,
    complianceRate: 92,
    expiringDocs: 12
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);

  // Add this helper function at the start of the Dashboard component
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return placeholderImage;
    if (imageUrl.startsWith('http')) return imageUrl;
    
    // If the URL already contains 'uploads/', use it as is
    if (imageUrl.includes('uploads/')) {
      return `${process.env.REACT_APP_API_URL}/api/${imageUrl}`;
    }
    // Otherwise, add 'uploads/' to the path
    return `${process.env.REACT_APP_API_URL}/api/uploads/${imageUrl}`;
  };

  // Load properties and recent properties
  useEffect(() => {
    fetchProperties(); // Add this back to load properties initially
    
    const loadRecentProperties = () => {
      const storedRecent = localStorage.getItem('recentProperties');
      if (storedRecent) {
        const recentProps = JSON.parse(storedRecent);
        setRecentProperties(recentProps);
      }
    };

    loadRecentProperties();
    
    // Set up an interval to check for updates
    const checkInterval = setInterval(() => {
      loadRecentProperties();
    }, 100);

    return () => clearInterval(checkInterval);
  }, []);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch properties');

      const data = await response.json();
      // Debug log to see exact data structure
      console.log('Raw properties data:', {
        allProperties: data,
        firstProperty: data[0],
        imageFields: data.map(p => ({
          id: p.id,
          image_url: p.image_url,
          constructedUrl: `${process.env.REACT_APP_API_URL}/api/uploads/${p.image_url}`
        }))
      });

      setProperties(data);
      
      if (recentProperties.length === 0) {
        setRecentProperties(data.slice(0, 3));
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      toast.error('Failed to load properties');
    } finally {
      setIsLoading(false);
    }
  };

  const addProperty = async (propertyData) => {
    try {
        // propertyData is now the response data from AddPropertyForm
        setProperties(prevProperties => [...prevProperties, propertyData.property]);
        toast.success('Property added successfully');
        setShowAddPropertyForm(false);
    } catch (error) {
        console.error('Error adding property:', error);
        toast.error(error.message || 'Failed to add property');
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${propertyId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete property');
        }

        setProperties(properties.filter(p => p.id !== propertyId));
        toast.success('Property deleted successfully');
    } catch (error) {
        console.error('Error deleting property:', error);
        toast.error(error.message || 'Failed to delete property');
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
    // For example: clear local storage, reset state, redirect to login page
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  // Add search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = properties.filter(property => 
      property.name.toLowerCase().includes(term) ||
      property.address.toLowerCase().includes(term)
    );
    setFilteredProperties(filtered);
  };

  // Update the handlePropertyClick function
  const handlePropertyClick = async (propertyId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${propertyId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch property details');

      const propertyData = await response.json();
      console.log('Property click data:', {
        raw: propertyData,
        imageUrl: propertyData.image_url,
        constructedUrl: `${process.env.REACT_APP_API_URL}/api/uploads/${propertyData.image_url}`
      });

      const propertyToStore = {
        id: propertyData.id,
        name: propertyData.name,
        address: propertyData.address,
        image_url: propertyData.image_url // Store the raw image URL
      };

      // Log what we're storing
      console.log('Storing in recent:', propertyToStore);

      const storedRecent = localStorage.getItem('recentProperties');
      let recentProps = storedRecent ? JSON.parse(storedRecent) : [];
      recentProps = recentProps.filter(p => p.id !== propertyId);
      recentProps.unshift(propertyToStore);
      recentProps = recentProps.slice(0, 3);
      
      localStorage.setItem('recentProperties', JSON.stringify(recentProps));
      setRecentProperties(recentProps);

      navigate(`/propertydashboard/${propertyId}`);
    } catch (error) {
      console.error('Error updating recent properties:', error);
      navigate(`/propertydashboard/${propertyId}`);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className='main-container'>
      <MainHeader />
      <main className="dashboard-content">
        <div className="welcome-section">
          <div>
            <h1>Welcome back, Sam 👋</h1>
            <p>Here's what's happening across your properties</p>
          </div>
          <button className="add-property-btn" onClick={() => setShowAddPropertyForm(true)}>
            <FaPlus /> Add New Property
          </button>
        </div>

        <div className="search-container" onClick={() => setShowSearchPopup(true)}>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search properties by name or address..."
              readOnly
              value=""
            />
          </div>
        </div>

        <div className="compliance-summary">
          <div className="summary-card red">
            <h3>{complianceStats.overdueIssues}</h3>
            <p>Overdue Issues</p>
          </div>
          <div className="summary-card orange">
            <h3>{complianceStats.inspectionsDue}</h3>
            <p>Inspections Due</p>
          </div>
          <div className="summary-card green">
            <h3>{complianceStats.complianceRate}%</h3>
            <p>Properties Compliant</p>
          </div>
          <div className="summary-card blue">
            <h3>{complianceStats.expiringDocs}</h3>
            <p>Documents Expiring</p>
          </div>
        </div>

        <div className="recently-viewed-section">
          <h2>Recently Viewed Properties</h2>
          <div className="recent-properties">
            {recentProperties.map(property => (
              <div 
                key={property.id} 
                className="recent-property-card"
                onClick={() => handlePropertyClick(property.id)}
              >
                <img 
                  src={getImageUrl(property.image_url)}
                  alt={property.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImage;
                  }}
                  className="recent-property-image"
                />
                <div className="property-info">
                  <h3>{property.name}</h3>
                  <p>{property.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="actions-panel">
          <h2><FaTasks /> My Actions</h2>
          <div className="action-items">
            <div className="action-item">
              <div className="action-content">
                <h4>Complete Fire Safety Inspection</h4>
                <p>Avalon House</p>
              </div>
              <span className="due-date">Due Today</span>
            </div>
          </div>
        </div>

        <div className="properties-overview">
          <h2>Properties Overview</h2>
          <div className="properties-grid">
            {(searchTerm ? filteredProperties : properties).map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onDelete={handleDeleteProperty}
                onPropertyClick={handlePropertyClick}
              />
            ))}
          </div>
        </div>

        {showAddPropertyForm && (
          <AddPropertyForm 
            onClose={() => setShowAddPropertyForm(false)} 
            onAddProperty={addProperty} 
          />
        )}
        {deleteConfirmation.show && (
          <div className='delete-confirmation-modal'>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this property?</p>
            <div className='delete-confirmation-actions'>
              <button className='delete-confirm-btn' onClick={() => handleDeleteProperty(properties[deleteConfirmation.index].id)}>Confirm Deletion</button>
              <button className='delete-cancel-btn' onClick={() => setDeleteConfirmation({ show: false, index: null })}>Cancel</button>
            </div>
          </div>
        )}

        <SearchPopup 
          isOpen={showSearchPopup}
          onClose={() => setShowSearchPopup(false)}
          properties={properties}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onPropertyClick={handlePropertyClick}
        />
      </main>
    </div>
  );
};

export default Dashboard;
