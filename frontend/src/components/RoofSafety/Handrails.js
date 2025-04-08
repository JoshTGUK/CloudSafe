import React, { useState, useEffect } from 'react';
import './Handrails.css';
import { toast } from 'react-toastify';

export default function Handrails({ propertyId }) {
  const [handrails, setHandrails] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingHandrail, setEditingHandrail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newHandrail, setNewHandrail] = useState({
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
    <div className="handrails-section">
      <h1>Handrails</h1>
      
      <div className="search-controls">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search handrails" />
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
            Create Handrail
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
              {handrails.map((handrail) => (
                <tr key={handrail.id}>
                  <td>{handrail.id}</td>
                  <td>{handrail.location}</td>
                  <td>{handrail.type}</td>
                  <td>
                    <select
                      value={handrail.status}
                      className={`status-select ${handrail.status.toLowerCase()}`}
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Passed">Passed</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </td>
                  <td>{handrail.lastTestDate}</td>
                  <td>{handrail.nextTestDate}</td>
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
