import React, { useState, useEffect } from 'react';
import './AnchorPoints.css';
import { toast } from 'react-toastify';

export default function AnchorPoints({ propertyId }) {
  const [anchorPoints, setAnchorPoints] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAnchorPoint, setEditingAnchorPoint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAnchorPoint, setNewAnchorPoint] = useState({
    location: '',
    type: 'Fall Arrest',
    lastTestDate: new Date().toISOString().split('T')[0],
    status: 'Unknown'
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3006';

  const fetchAnchorPoints = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/anchor-points`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch anchor points');
      }

      const data = await response.json();
      const formattedData = Array.isArray(data) ? data : [data];
      setAnchorPoints(formattedData.map(point => ({
        ...point,
        lastTestDate: point.last_inspection_date,
        propertyId: point.property_id,
        location: point.location_description
      })));
    } catch (error) {
      console.error('Error fetching anchor points:', error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (pointId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/anchor-points/${pointId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedPoint = await response.json();
      setAnchorPoints(anchorPoints.map(point => 
        point.id === updatedPoint.id ? updatedPoint : point
      ));

      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.message);
    }
  };

  const handleViewTestData = (point) => {
    if (point.test_report_url) {
      let url = point.test_report_url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `${API_BASE_URL}/${url}`;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      toast.info('No test data available for this anchor point');
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchAnchorPoints();
    }
  }, [propertyId]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="anchor-points-section">
      <h1>Anchor Points</h1>
      
      <div className="search-controls">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search anchor points" />
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
            Create Anchor Point
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
              {anchorPoints.map((point) => (
                <tr key={point.id}>
                  <td>{point.id}</td>
                  <td>{point.location}</td>
                  <td>{point.type}</td>
                  <td>
                    <select
                      value={point.status}
                      onChange={(e) => handleStatusUpdate(point.id, e.target.value)}
                      className={`status-select ${point.status.toLowerCase()}`}
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Passed">Passed</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </td>
                  <td>{point.lastTestDate}</td>
                  <td>{point.nextTestDate}</td>
                  <td>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleViewTestData(point)}
                    >
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