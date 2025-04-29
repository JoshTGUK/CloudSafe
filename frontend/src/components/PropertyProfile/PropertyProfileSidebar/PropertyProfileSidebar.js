import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { 
  FaArrowLeft, FaHome, FaBuilding, FaUserTie, 
  FaClipboardList, FaShieldAlt, FaUsers 
} from 'react-icons/fa';
import './PropertyProfileSidebar.css';

function PropertyProfileSidebar() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate(`/propertydashboard/${id}`);
  };

  return (
    <aside className="property-profile-sidebar">
      <div className="sidebar-nav">
        <button className="sidebar-back-btn" onClick={handleBack}>
          <FaArrowLeft /> Back
        </button>

        <NavLink 
          to="/property-profile"
          end
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <FaHome className="nav-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/property-profile/basic-info"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <FaBuilding className="nav-icon" />
          <span>Basic Information</span>
        </NavLink>

        <NavLink 
          to="/property-profile/ownership"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <FaUserTie className="nav-icon" />
          <span>Ownership Details</span>
        </NavLink>

        <NavLink 
          to="/property-profile/building-details"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <FaClipboardList className="nav-icon" />
          <span>Building Details</span>
        </NavLink>

        <NavLink 
          to="/property-profile/insurance"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <FaShieldAlt className="nav-icon" />
          <span>Insurance Information</span>
        </NavLink>

        <NavLink 
          to="/property-profile/staff"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <FaUsers className="nav-icon" />
          <span>Associated Staff</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default PropertyProfileSidebar; 