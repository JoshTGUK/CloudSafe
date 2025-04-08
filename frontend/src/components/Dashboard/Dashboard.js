import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
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
      setProperties(data);
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

  const handlePropertyClick = (propertyId) => {
    navigate(`/propertydashboard/${propertyId}`);
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
        <div className='search-bar'>
          <i className='fas fa-search'></i>
          <input
            type="text"
            placeholder="Search properties by name or address..."
            value={searchTerm}
            onChange={handleSearch}
          />
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
