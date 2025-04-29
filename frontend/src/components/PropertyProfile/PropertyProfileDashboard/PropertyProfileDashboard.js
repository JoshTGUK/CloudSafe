import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaFileAlt, FaUserTie, FaShieldAlt } from 'react-icons/fa';
import './PropertyProfileDashboard.css';

function PropertyProfileDashboard() {
  return (
    <div className="profile-dashboard">
      <h1>Property Profile</h1>
      
      <div className="quick-info-card">
        <div className="quick-info-header">
          <FaBuilding className="quick-info-icon" />
          <h2>123 Business Center</h2>
        </div>
        <div className="quick-info-details">
          <p>123 Main Street, City, Country</p>
          <p>Commercial Building • Built 2010</p>
          <p>Total Area: 50,000 sq ft</p>
        </div>
      </div>

      <div className="profile-cards">
        <Link to="basic-info" className="profile-card">
          <div className="card-header">
            <FaBuilding className="card-icon" />
            <h3>Basic Information</h3>
          </div>
          <p>View and manage property details, address, and building type</p>
        </Link>

        <Link to="ownership" className="profile-card">
          <div className="card-header">
            <FaUserTie className="card-icon" />
            <h3>Ownership Details</h3>
          </div>
          <p>Manage ownership information and contact details</p>
        </Link>

        <Link to="insurance" className="profile-card">
          <div className="card-header">
            <FaShieldAlt className="card-icon" />
            <h3>Insurance Information</h3>
          </div>
          <p>View insurance policies and certificates</p>
        </Link>

        <div className="profile-card documents-card">
          <div className="card-header">
            <FaFileAlt className="card-icon" />
            <h3>Linked Documents</h3>
          </div>
          <ul className="documents-list">
            <li>Property Certificate</li>
            <li>Insurance Policy</li>
            <li>Building Plans</li>
            <li>Safety Certificates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PropertyProfileDashboard; 