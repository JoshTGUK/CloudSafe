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
  const [notifications, setNotifications] = useState([]);
  const [complianceStats, setComplianceStats] = useState({
    overdueIssues: 8,
    inspectionsDue: 5,
    complianceRate: 92,
    expiringDocs: 12
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [userName, setUserName] = useState('');

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

  // Fetch user name on mount
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUserName(`${userData.firstName} ${userData.lastName}`.trim() || 'User');
        } else {
          setUserName('User');
        }
      } catch (error) {
        setUserName('User');
      }
    };
    fetchUserName();
  }, []);

  // Add this helper function
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
            <div 
              className='icon' 
              onClick={() => setShowSearchPopup(true)}
            >
              <FaSearch />
            </div>
            <div 
              className='icon' 
              onMouseEnter={() => setShowNotifications(true)}
              onMouseLeave={() => setShowNotifications(false)}
            >
              <i className='fas fa-bell'></i>
              <NotificationPopup isOpen={showNotifications} />
            </div>
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
        {/* Dashboard Title, Subtitle, and Add New Property Button */}
        <div className="dashboard-title-row">
          <div>
            <h1 className="dashboard-title">Welcome, {userName} 👋</h1>
            <p className="dashboard-subtitle">Here's an overview of your properties</p>
          </div>
          <button className="add-property-btn" onClick={() => setShowAddPropertyForm(true)}>
            Add New Property
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-container" onClick={() => setShowSearchPopup(true)}>
          <div className="search-bar search-bar-full-width">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by property"
              readOnly
              value=""
            />
          </div>
        </div>

        {/* Recently Viewed Properties (keep as is) */}
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
                  src={getImageUrl(property.image_url)}
                  alt={property.name}
                  onError={(e) => {
                    e.target.onerror = null;
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

        {/* Overview Section (Property Cards) */}
        <div className="properties-overview">
          <h2 className="section-title">Overview</h2>
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
