import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import placeholderImage from '../../assets/placeholder.png';
import './PropertyDashboard.css';
import MainHeader from '../common/MainHeader/MainHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function PropertyDashboard() {
  const [roofSafetyIssues, setRoofSafetyIssues] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    name: '',
    address: '',
    imageUrl: null
  });
  const [activeSection, setActiveSection] = useState('overview');
  const [propertyImage, setPropertyImage] = useState(null);
  const [imageError, setImageError] = useState(false);

  // Split the menu items into two parts
  const mainMenuItems = [
    { id: 'overview', icon: '👁️', label: 'Overview' },
    { id: 'fire', icon: '🔥', label: 'Fire Safety' },
    { id: 'roof', icon: '🏠', label: 'Roof Safety' },
    { id: 'staff', icon: '👥', label: 'Staff Safety' },
    { id: 'equipment', icon: '⚙️', label: 'Equipment Safety' },
    { id: 'electrical', icon: '⚡', label: 'Electrical Safety' },
    { id: 'building', icon: '🏗️', label: 'Building Maintenance' },
    { id: 'emergency', icon: '🚨', label: 'Emergency Preparedness' }
  ];

  const bottomMenuItems = [
    { id: 'inspection', icon: '📋', label: 'New Inspection', isAction: true },
    { id: 'profile', icon: '📝', label: 'Property Profile' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ];

  // Safety categories data
  const safetyCategories = [
    { name: 'Fire Safety', issues: 3 },
    { name: 'Roof Safety', issues: roofSafetyIssues },
    { name: 'Staff Safety', issues: 0 },
    { name: 'Equipment Safety', issues: 1 },
    { name: 'Electrical Safety', issues: 0 },
    { name: 'Health & Hygiene', issues: 0 },
    { name: 'Building Maintenance', issues: 2 },
    { name: 'Security & Access Control', issues: 1 },
    { name: 'Environmental Safety', issues: 0 }
  ];

  useEffect(() => {
    const fetchFailedCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3006/api/properties/${id}/anchor-points/failed-count`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 404) {
          // Silently handle 404 - this just means no failed anchor points
          setRoofSafetyIssues(0);
          return;
        }

        if (!response.ok) {
          console.error('Error fetching failed count:', response.statusText);
          setRoofSafetyIssues(0);
          return;
        }

        const data = await response.json();
        setRoofSafetyIssues(data.count || 0);
      } catch (error) {
        console.error('Error fetching failed count:', error);
        setRoofSafetyIssues(0);
      }
    };

    fetchFailedCount();

    // Add event listener for status updates
    const handleStatusChange = () => fetchFailedCount();
    window.addEventListener('anchorPointStatusChanged', handleStatusChange);
    
    return () => {
      window.removeEventListener('anchorPointStatusChanged', handleStatusChange);
    };
  }, [id]);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Failed to fetch property details');

        const data = await response.json();
        
        // Update property state
        setProperty({
          name: data.name,
          address: data.address,
          imageUrl: data.image_url ? `${process.env.REACT_APP_API_URL}/api/${data.image_url}` : null
        });

        // Update recently viewed properties immediately
        const propertyToStore = {
          id: parseInt(id),
          name: data.name,
          address: data.address,
          imageUrl: data.image_url // Store just the path, not the full URL
        };

        // Get current recent properties
        const storedRecent = localStorage.getItem('recentProperties');
        let recentProps = storedRecent ? JSON.parse(storedRecent) : [];
        
        // Remove this property if it exists
        recentProps = recentProps.filter(p => p.id !== parseInt(id));
        
        // Add to start of list
        recentProps.unshift(propertyToStore);
        
        // Keep only most recent 3
        recentProps = recentProps.slice(0, 3);
        
        // Save to localStorage
        localStorage.setItem('recentProperties', JSON.stringify(recentProps));

        // Force a refresh by setting a flag in localStorage
        localStorage.setItem('recentPropertiesUpdated', Date.now().toString());

      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  const recentInspections = [
    {
      icon: '🏠',
      title: 'Roof Safety',
      issues: roofSafetyIssues,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  ];

  const handleNavigation = (path) => {
    // Use the same URL pattern as the current page
    const baseUrl = window.location.pathname.includes('propertydashboard') 
      ? '/propertydashboard' 
      : '/properties';
    
    switch (path) {
      case 'roof':
        navigate(`/properties/${id}/roof-safety`);
        break;
      case 'fire':
        navigate(`/properties/${id}/fire-safety`);
        break;
      case 'staff':
        navigate(`/properties/${id}/staff-safety`);
        break;
      case 'building':
        navigate(`/properties/${id}/building-maintenance`);
        break;
      case 'equipment':
        navigate('/equipment-safety');
        break;
      case 'electrical':
        navigate('/electrical-safety');
        break;
      case 'emergency':
        navigate(`/properties/${id}/emergency-preparedness`);
        break;
      case 'profile':
        navigate(`${baseUrl}/${id}/profile`);
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        setActiveSection(path);
    }
  };

  return (
    <div className="property-dashboard">
      <MainHeader />
      
      <div className="property-image-container">
        <img 
          src={imageError ? placeholderImage : propertyImage || placeholderImage}
          onError={() => {
            console.log('Image failed to load, using placeholder');
            setImageError(true);
          }}
          alt={property.name}
          className="property-image"
        />
      </div>
      
      {/* Sidebar */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavigation(item.id)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-property-image">
            <img 
              src={imageError ? placeholderImage : propertyImage || placeholderImage}
              onError={() => {
                console.log('Image failed to load, using placeholder');
                setImageError(true);
              }}
              alt={property.name}
            />
          </div>

          {bottomMenuItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${activeSection === item.id ? 'active' : ''} ${item.isAction ? 'action-item' : ''}`}
              onClick={() => handleNavigation(item.id)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-header">
          <div>
            <h1>{property.name}</h1>
            <p className="address">{property.address}</p>
          </div>
          <button className="start-inspection-btn">Start New Inspection</button>
        </div>

        {/* Safety Categories Grid */}
        <div className="safety-grid">
          {safetyCategories.slice(0, 5).map((category, index) => (
            <div key={index} className="safety-card">
              <h3>{category.name}</h3>
              <p className="issues-count">
                {category.issues} {category.issues === 1 ? 'issue' : 'issues'}
              </p>
            </div>
          ))}
        </div>
        <div className="safety-grid">
          {safetyCategories.slice(5).map((category, index) => (
            <div key={index} className="safety-card">
              <h3>{category.name}</h3>
              <p className="issues-count">
                {category.issues} {category.issues === 1 ? 'issue' : 'issues'}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Inspections */}
        <section className="recent-inspections">
          <h2>Recent Inspections</h2>
          <div className="inspection-list">
            {recentInspections.map((inspection, index) => (
              <div key={index} className="inspection-item">
                <div className="inspection-icon">
                  <span>{inspection.icon}</span>
                </div>
                <div className="inspection-info">
                  <div className="inspection-title">
                    {inspection.title} ({inspection.issues} {inspection.issues === 1 ? 'Issue' : 'Issues'})
                  </div>
                  <div className="inspection-date">{inspection.date}</div>
                </div>
                <div className="inspection-arrow">›</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
