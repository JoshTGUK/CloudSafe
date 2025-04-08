import React, { useState, useEffect } from 'react';
import './Staticlines.css';
import { toast } from 'react-toastify';

export default function Staticlines({ propertyId }) {
  const [staticlines, setStaticlines] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStaticline, setEditingStaticline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStaticline, setNewStaticline] = useState({
    location: '',
    type: 'Standard',
    lastTestDate: new Date().toISOString().split('T')[0],
    status: 'Unknown'
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3006';

  // Add your fetch, create, edit, delete functions here

  useEffect(() => {
    if (propertyId) {
      // Add your fetch function call here
    }
  }, [propertyId]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="staticlines-section">
      <h1>Static Lines</h1>
      
      <div className="search-controls">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search static lines" />
        </div>
        <div className="table-buttons">
          <button className="filter-btn">
            <i className="fas fa-filter"></i>
            Filter
          </button>
          <button 
            className="btn"
            onClick={() => setShowCreateModal(true)}
          >
            Create Static Line
          </button>
        </div>
      </div>

      <div className="table-section">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Location</th>
                <th>Type</th>
                <th>Status</th>
                <th>Last Test Date</th>
                <th>Next Test Date</th>
                <th>Actions</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {staticlines.map((staticline) => (
                <tr key={staticline.id}>
                  <td>{staticline.id}</td>
                  <td>{staticline.location}</td>
                  <td>{staticline.type}</td>
                  <td>
                    <select
                      value={staticline.status}
                      className={`status-select ${staticline.status.toLowerCase()}`}
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Passed">Passed</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </td>
                  <td>{staticline.lastTestDate}</td>
                  <td>{staticline.nextTestDate}</td>
                  <td>
                    <button className="btn btn-secondary">
                      View Test Data
                    </button>
                  </td>
                  <td>
                    <button className="edit-btn">
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add your modal components here */}
    </div>
  );
}
