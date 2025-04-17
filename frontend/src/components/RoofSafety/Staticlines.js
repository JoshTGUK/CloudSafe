import React, { useState, useEffect } from 'react';
import './Staticlines.css';
import { toast } from 'react-toastify';

export default function StaticLines({ propertyId }) {
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

  const fetchStaticLinesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/static-lines`, {
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
              location_description: 'North Wing Rooftop',
              type: 'Horizontal',
              status: 'Pass',
              last_inspection_date: '2024-02-15',
              next_inspection_date: '2024-08-15',
              length: '30m',
              material: 'Stainless Steel',
              notes: 'Annual inspection required'
            },
            {
              id: 2,
              property_id: propertyId,
              location_description: 'South Wing Edge',
              type: 'Vertical',
              status: 'Pending',
              last_inspection_date: '2024-01-20',
              next_inspection_date: '2024-07-20',
              length: '15m',
              material: 'Galvanized Steel',
              notes: 'Tension check needed'
            }
          ];

          const formattedData = mockData.map(line => ({
            id: line.id,
            propertyId: line.property_id,
            location: line.location_description,
            type: line.type,
            status: line.status,
            lastTestDate: new Date(line.last_inspection_date).toLocaleDateString(),
            nextTestDate: new Date(line.next_inspection_date).toLocaleDateString(),
            length: line.length,
            material: line.material,
            notes: line.notes
          }));

          setStaticlines(formattedData);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch static lines: ${response.status}`);
        }

        const data = await response.json();
        const staticLinesArray = Array.isArray(data) ? data : [data];
        
        const formattedData = staticLinesArray.map(line => ({
          id: line.id,
          propertyId: line.property_id,
          location: line.location_description,
          type: line.type,
          status: line.status,
          lastTestDate: new Date(line.last_inspection_date).toLocaleDateString(),
          nextTestDate: new Date(line.next_inspection_date).toLocaleDateString(),
          length: line.length,
          material: line.material,
          notes: line.notes
        }));

        setStaticlines(formattedData);

      } catch (error) {
        console.error('Error fetching static lines:', error);
        throw error;
      }
    } catch (err) {
      console.error('Error in fetchStaticLinesData:', err);
      setError(err.message);
      toast.error(err.message || 'Failed to fetch static lines');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchStaticLinesData();
    }
  }, [propertyId]);

  const handleStatusUpdate = async (lineId, newStatus) => {
    try {
      const updatedStaticlines = staticlines.map(line =>
        line.id === lineId ? { ...line, status: newStatus } : line
      );
      setStaticlines(updatedStaticlines);
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

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
                <th>Length</th>
                <th>Material</th>
                <th>Actions</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {staticlines.map((line) => (
                <tr key={line.id}>
                  <td>{line.id}</td>
                  <td>{line.location}</td>
                  <td>{line.type}</td>
                  <td>
                    <select
                      value={line.status}
                      onChange={(e) => handleStatusUpdate(line.id, e.target.value)}
                      className={`status-select ${line.status.toLowerCase()}`}
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Pass">Pass</option>
                      <option value="Fail">Fail</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  <td>{line.lastTestDate}</td>
                  <td>{line.nextTestDate}</td>
                  <td>{line.length}</td>
                  <td>{line.material}</td>
                  <td>
                    <button className="btn btn-secondary">
                      View Test Data
                    </button>
                  </td>
                  <td>
                    <button 
                      className="edit-btn"
                      onClick={() => {
                        setEditingStaticline(line);
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
