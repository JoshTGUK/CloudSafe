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

  const fetchHandrailsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/handrails`, {
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
              location_description: 'Roof Edge - North Side',
              type: 'Fixed',
              status: 'Pass',
              last_inspection_date: '2024-02-15',
              next_inspection_date: '2024-08-15',
              height: '1.1m',
              material: 'Galvanized Steel',
              length: '45m',
              notes: 'Annual inspection completed'
            },
            {
              id: 2,
              property_id: propertyId,
              location_description: 'Plant Room Perimeter',
              type: 'Collapsible',
              status: 'Pending',
              last_inspection_date: '2024-01-20',
              next_inspection_date: '2024-07-20',
              height: '1.0m',
              material: 'Aluminum',
              length: '30m',
              notes: 'Hinge mechanism needs lubrication'
            }
          ];

          const formattedData = mockData.map(handrail => ({
            id: handrail.id,
            propertyId: handrail.property_id,
            location: handrail.location_description,
            type: handrail.type,
            status: handrail.status,
            lastTestDate: new Date(handrail.last_inspection_date).toLocaleDateString(),
            nextTestDate: new Date(handrail.next_inspection_date).toLocaleDateString(),
            height: handrail.height,
            material: handrail.material,
            length: handrail.length,
            notes: handrail.notes
          }));

          setHandrails(formattedData);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch handrails: ${response.status}`);
        }

        const data = await response.json();
        const handrailsArray = Array.isArray(data) ? data : [data];
        
        const formattedData = handrailsArray.map(handrail => ({
          id: handrail.id,
          propertyId: handrail.property_id,
          location: handrail.location_description,
          type: handrail.type,
          status: handrail.status,
          lastTestDate: new Date(handrail.last_inspection_date).toLocaleDateString(),
          nextTestDate: new Date(handrail.next_inspection_date).toLocaleDateString(),
          height: handrail.height,
          material: handrail.material,
          length: handrail.length,
          notes: handrail.notes
        }));

        setHandrails(formattedData);

      } catch (error) {
        console.error('Error fetching handrails:', error);
        throw error;
      }
    } catch (err) {
      console.error('Error in fetchHandrailsData:', err);
      setError(err.message);
      toast.error(err.message || 'Failed to fetch handrails');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchHandrailsData();
    }
  }, [propertyId]);

  const handleStatusUpdate = async (handrailId, newStatus) => {
    try {
      const updatedHandrails = handrails.map(handrail =>
        handrail.id === handrailId ? { ...handrail, status: newStatus } : handrail
      );
      setHandrails(updatedHandrails);
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

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
                <th>Height</th>
                <th>Material</th>
                <th>Length</th>
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
                      onChange={(e) => handleStatusUpdate(handrail.id, e.target.value)}
                      className={`status-select ${handrail.status.toLowerCase()}`}
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Pass">Pass</option>
                      <option value="Fail">Fail</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  <td>{handrail.lastTestDate}</td>
                  <td>{handrail.nextTestDate}</td>
                  <td>{handrail.height}</td>
                  <td>{handrail.material}</td>
                  <td>{handrail.length}</td>
                  <td>
                    <button className="btn btn-secondary">
                      View Test Data
                    </button>
                  </td>
                  <td>
                    <button 
                      className="edit-btn"
                      onClick={() => {
                        setEditingHandrail(handrail);
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
