import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Cradles({ propertyId }) {
  const [cradles, setCradles] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCradle, setEditingCradle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCradle, setNewCradle] = useState({
    location: '',
    type: 'Standard',
    lastTestDate: new Date().toISOString().split('T')[0],
    status: 'Unknown'
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3006';

  const fetchCradlesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/cradles`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const responseData = await response.text();
      console.log('Raw response data:', responseData);
      
      if (response.status === 404) {
        console.log('No cradles found for this property');
        setCradles([]);
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch cradles: ${response.status}`);
      }

      const data = JSON.parse(responseData);
      const cradlesArray = Array.isArray(data) ? data : [data];
      setCradles(cradlesArray);
    } catch (err) {
      console.error('Error fetching cradles data:', err);
      setError(err.message);
      toast.error(err.message || 'Failed to fetch cradles');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCradle = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/cradles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCradle)
      });

      if (!response.ok) {
        throw new Error('Failed to create cradle');
      }

      toast.success('Cradle created successfully');
      setShowCreateModal(false);
      fetchCradlesData();
    } catch (error) {
      console.error('Error creating cradle:', error);
      toast.error(error.message || 'Failed to create cradle');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/cradles/${editingCradle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingCradle)
      });

      if (!response.ok) {
        throw new Error('Failed to update cradle');
      }

      toast.success('Cradle updated successfully');
      setShowEditModal(false);
      fetchCradlesData();
    } catch (error) {
      console.error('Error updating cradle:', error);
      toast.error(error.message || 'Failed to update cradle');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this cradle?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/cradles/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete cradle');
        }

        toast.success('Cradle deleted successfully');
        fetchCradlesData();
      } catch (error) {
        console.error('Error deleting cradle:', error);
        toast.error(error.message || 'Failed to delete cradle');
      }
    }
  };

  const handleStatusUpdate = async (cradleId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/cradles/${cradleId}/status`, {
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

  const handleViewTestData = (cradle) => {
    console.log('Viewing test data for cradle:', cradle);
    if (cradle.test_report_url) {
      let url = cradle.test_report_url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `${API_BASE_URL}/${url}`;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      toast.info('No test data available for this cradle');
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchCradlesData();
    }
  }, [propertyId]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="cradles-section">
      <h1>Cradles</h1>
      
      <div className="search-controls">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search cradles" />
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
            Create Cradle
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
              {cradles.map((cradle) => (
                <tr key={cradle.id}>
                  <td>{cradle.id}</td>
                  <td>{cradle.location}</td>
                  <td>{cradle.type}</td>
                  <td>
                    <select
                      value={cradle.status}
                      onChange={(e) => handleStatusUpdate(cradle.id, e.target.value)}
                      className={`status-select ${cradle.status.toLowerCase()}`}
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Passed">Passed</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </td>
                  <td>{cradle.lastTestDate}</td>
                  <td>{cradle.nextTestDate}</td>
                  <td>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleViewTestData(cradle)}
                    >
                      View Test Data
                    </button>
                  </td>
                  <td>
                    <button 
                      className="edit-btn"
                      onClick={() => {
                        setEditingCradle(cradle);
                        setShowEditModal(true);
                      }}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Cradle</h2>
            <form onSubmit={handleCreateCradle}>
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
                  <option value="Heavy Duty">Heavy Duty</option>
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

      {/* Edit Modal */}
      {showEditModal && editingCradle && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Cradle</h2>
            <form onSubmit={handleEditSubmit}>
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
                  <option value="Heavy Duty">Heavy Duty</option>
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
                  onClick={() => handleDelete(editingCradle.id)}
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
    </div>
  );
} 