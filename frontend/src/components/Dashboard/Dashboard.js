import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  FaMapMarkerAlt
} from 'react-icons/fa';
import { FaQuestionCircle, FaBell, FaUserCircle } from 'react-icons/fa';

// eslint-disable-next-line no-unused-vars
const API_URL = process.env.REACT_APP_API_URL;

const UserAvatar = () => (
    <div className="user-avatar">
        <i className="fas fa-user"></i>
    </div>
);

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

  // Add this helper function
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return placeholderImage;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${process.env.REACT_APP_API_URL}/api/${imageUrl.replace(/^\/+/, '')}`;
  };

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
      console.log('Fetched properties:', data); // Debug log to see the data structure
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
      // Fetch the full property details
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${propertyId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch property details');

      const propertyData = await response.json();
      
      // Create the property object to store
      const propertyToStore = {
        id: propertyData.id,
        name: propertyData.name,
        address: propertyData.address,
        imageUrl: propertyData.image_url ? `${process.env.REACT_APP_API_URL}/api/${propertyData.image_url}` : null
      };

      // Get current recent properties
      const storedRecent = localStorage.getItem('recentProperties');
      let recentProps = storedRecent ? JSON.parse(storedRecent) : [];
      
      // Remove this property if it exists
      recentProps = recentProps.filter(p => p.id !== propertyId);
      
      // Add to start of list
      recentProps.unshift(propertyToStore);
      
      // Keep only most recent 3
      recentProps = recentProps.slice(0, 3);
      
      // Save to localStorage
      localStorage.setItem('recentProperties', JSON.stringify(recentProps));
      
      // Update state immediately
      setRecentProperties(recentProps);

      // Navigate to property dashboard
      navigate(`/propertydashboard/${propertyId}`);
    } catch (error) {
      console.error('Error updating recent properties:', error);
      // Still navigate even if updating recent properties fails
      navigate(`/propertydashboard/${propertyId}`);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className='main-container'>
      <header className='dashboard-header'>
        <img src={allSafeLogo} alt="ALL Safe Logo" className='logo' />
        <div className='header-right'>
          <nav className='nav-links'>
            <Link to="/dashboard" className='nav-link active'>Dashboard</Link>
            <Link to="/documents" className='nav-link'>Documents</Link>
            <Link to="/inspections" className='nav-link'>Inspections</Link>
            <Link to="/tasks" className='nav-link'>Tasks</Link>
          </nav>
          <div className='header-icons'>
            <div className='icon'><i className='fas fa-search'></i></div>
            <div className='icon'><i className='fas fa-bell'></i></div>
            <div className='icon'><i className='fas fa-question-circle'></i></div>
            <div className='user-avatar-container' onClick={() => setShowUserMenu(!showUserMenu)}>
              <UserAvatar />
              {showUserMenu && (
                <div className='user-menu'>
                  <Link to="/account-settings" onClick={() => setShowUserMenu(false)}>Account</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className='dashboard-content'>
        <div className='dashboard-header'>
          <div>
            <h1 className='dashboard-title'>Dashboard</h1>
            <p className='dashboard-subtitle'>Your portfolio at a glance</p>
          </div>
          <button className='add-property-btn' onClick={() => setShowAddPropertyForm(true)}>
            Add New Property
          </button>
        </div>
        <div className="search-container">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search properties by name or address..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="recent-properties">
          <div className="recent-properties-header">
            <h2 className="recent-properties-title">Recently Viewed Properties</h2>
          </div>
          <div className="recent-properties-grid">
            {recentProperties.map((property) => (
              <div 
                key={property.id} 
                className="recent-property-card"
                onClick={() => handlePropertyClick(property.id)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={getImageUrl(property.imageUrl)} 
                  alt={property.name}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = placeholderImage;
                  }}
                  className="recent-property-image" 
                />
                <div className="recent-property-info">
                  <h3 className="recent-property-name">{property.name}</h3>
                  <p className="recent-property-address">{property.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <h2 className='overview-title'>Overview</h2>
        {properties.length === 0 ? (
          <div className="no-properties">
            <h3>No Properties Yet</h3>
            <p>Add your first property to get started</p>
          </div>
        ) : (
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
        )}
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
      </main>
    </div>
  );
};

export default Dashboard;
