import React, { useState, useEffect } from 'react';
import './Walkways.css';
import { toast } from 'react-toastify';

export default function Walkways({ propertyId }) {
  const [walkways, setWalkways] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingWalkway, setEditingWalkway] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newWalkway, setNewWalkway] = useState({
    location: '',
    type: 'Standard',
    lastTestDate: new Date().toISOString().split('T')[0],
    status: 'Unknown'
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3006';

  const fetchWalkwaysData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/walkways`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 404) {
          console.log('Using mock data as endpoint is not available yet');
          // Mock data for development
          const mockData = [
            {
              id: 1,
              property_id: propertyId,
              location_description: 'Main Roof Access Path',
              type: 'Non-Slip',
              status: 'Pass',
              last_inspection_date: '2024-02-15',
              next_inspection_date: '2024-08-15',
              width: '1.2m',
              material: 'Aluminum',
              surface: 'Grated',
              notes: 'Regular cleaning required'
            },
            {
              id: 2,
              property_id: propertyId,
              location_description: 'Plant Room Access',
              type: 'Standard',
              status: 'Pending',
              last_inspection_date: '2024-01-20',
              next_inspection_date: '2024-07-20',
              width: '0.9m',
              material: 'Steel',
              surface: 'Checker Plate',
              notes: 'Anti-slip coating needed'
            }
          ];

          const formattedData = mockData.map(walkway => ({
            id: walkway.id,
            propertyId: walkway.property_id,
            location: walkway.location_description,
            type: walkway.type,
            status: walkway.status,
            lastTestDate: new Date(walkway.last_inspection_date).toLocaleDateString(),
            nextTestDate: new Date(walkway.next_inspection_date).toLocaleDateString(),
            width: walkway.width,
            material: walkway.material,
            surface: walkway.surface,
            notes: walkway.notes
          }));

          setWalkways(formattedData);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch walkways: ${response.status}`);
        }

        const data = await response.json();
        const walkwaysArray = Array.isArray(data) ? data : [data];
        
        const formattedData = walkwaysArray.map(walkway => ({
          id: walkway.id,
          propertyId: walkway.property_id,
          location: walkway.location_description,
          type: walkway.type,
          status: walkway.status,
          lastTestDate: new Date(walkway.last_inspection_date).toLocaleDateString(),
          nextTestDate: new Date(walkway.next_inspection_date).toLocaleDateString(),
          width: walkway.width,
          material: walkway.material,
          surface: walkway.surface,
          notes: walkway.notes
        }));

        setWalkways(formattedData);

      } catch (error) {
        console.error('Error fetching walkways:', error);
        throw error;
      }
    } catch (err) {
      console.error('Error in fetchWalkwaysData:', err);
      setError(err.message);
      toast.error(err.message || 'Failed to fetch walkways');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchWalkwaysData();
    }
  }, [propertyId]);

  const handleStatusUpdate = async (walkwayId, newStatus) => {
    try {
      const updatedWalkways = walkways.map(walkway =>
        walkway.id === walkwayId ? { ...walkway, status: newStatus } : walkway
      );
      setWalkways(updatedWalkways);
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="walkways-section">
      <h1>Walkways</h1>
      
      <div className="search-controls">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search walkways" />
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
            Create Walkway
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
                <th>Width</th>
                <th>Material</th>
                <th>Surface</th>
                <th>Actions</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {walkways.map((walkway) => (
                <tr key={walkway.id}>
                  <td>{walkway.id}</td>
                  <td>{walkway.location}</td>
                  <td>{walkway.type}</td>
                  <td>
                    <select
                      value={walkway.status}
                      onChange={(e) => handleStatusUpdate(walkway.id, e.target.value)}
                      className={`status-select ${walkway.status.toLowerCase()}`}
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Pass">Pass</option>
                      <option value="Fail">Fail</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  <td>{walkway.lastTestDate}</td>
                  <td>{walkway.nextTestDate}</td>
                  <td>{walkway.width}</td>
                  <td>{walkway.material}</td>
                  <td>{walkway.surface}</td>
                  <td>
                    <button className="btn btn-secondary">
                      View Test Data
                    </button>
                  </td>
                  <td>
                    <button 
                      className="edit-btn"
                      onClick={() => {
                        setEditingWalkway(walkway);
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

      {/* Add your modal components here */}
    </div>
  );
}
