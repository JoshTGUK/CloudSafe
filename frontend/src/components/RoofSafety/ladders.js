import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faEye, 
  faEdit, 
  faClipboardCheck, 
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  faDownload,
  faUpload,
  faCalendarAlt,
  faUser,
  faBuilding,
  faLadder,
  faClock,
  faPlus,
  faXmark,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import './Ladders.css';
import { toast } from 'react-toastify';

export default function Ladders({ propertyId }) {
  const [ladders, setLadders] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLadder, setEditingLadder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newLadder, setNewLadder] = useState({
    location: '',
    type: 'Fixed',
    lastTestDate: new Date().toISOString().split('T')[0],
    status: 'Unknown'
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3006';

  const fetchLaddersData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/ladders`, {
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
              location_description: 'North Wing Roof Access',
              type: 'Fixed',
              status: 'Pass',
              last_inspection_date: '2024-02-15',
              next_inspection_date: '2024-08-15',
              height: '20ft',
              material: 'Aluminum',
              notes: 'Regular maintenance required'
            },
            {
              id: 2,
              property_id: propertyId,
              location_description: 'South Emergency Exit',
              type: 'Cage',
              status: 'Pending',
              last_inspection_date: '2024-01-20',
              next_inspection_date: '2024-07-20',
              height: '15ft',
              material: 'Steel',
              notes: 'Anti-slip coating needed'
            }
          ];

          const formattedData = mockData.map(ladder => ({
            id: ladder.id,
            propertyId: ladder.property_id,
            location: ladder.location_description,
            type: ladder.type,
            status: ladder.status,
            lastTestDate: new Date(ladder.last_inspection_date).toLocaleDateString(),
            nextTestDate: new Date(ladder.next_inspection_date).toLocaleDateString(),
            height: ladder.height,
            material: ladder.material,
            notes: ladder.notes
          }));

          setLadders(formattedData);
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch ladders: ${response.status}`);
        }

        const data = await response.json();
        const laddersArray = Array.isArray(data) ? data : [data];
        
        const formattedData = laddersArray.map(ladder => ({
          id: ladder.id,
          propertyId: ladder.property_id,
          location: ladder.location_description,
          type: ladder.type,
          status: ladder.status,
          lastTestDate: new Date(ladder.last_inspection_date).toLocaleDateString(),
          nextTestDate: new Date(ladder.next_inspection_date).toLocaleDateString(),
          height: ladder.height,
          material: ladder.material,
          notes: ladder.notes
        }));

        setLadders(formattedData);

      } catch (error) {
        console.error('Error fetching ladders:', error);
        // If the endpoint is not available, use mock data
        if (error.message.includes('Failed to fetch')) {
          console.log('Using mock data as endpoint is not available');
          const mockData = [
            {
              id: 1,
              property_id: propertyId,
              location_description: 'North Wing Roof Access',
              type: 'Fixed',
              status: 'Pass',
              last_inspection_date: '2024-02-15',
              next_inspection_date: '2024-08-15',
              height: '20ft',
              material: 'Aluminum',
              notes: 'Regular maintenance required'
            },
            {
              id: 2,
              property_id: propertyId,
              location_description: 'South Emergency Exit',
              type: 'Cage',
              status: 'Pending',
              last_inspection_date: '2024-01-20',
              next_inspection_date: '2024-07-20',
              height: '15ft',
              material: 'Steel',
              notes: 'Anti-slip coating needed'
            }
          ];

          const formattedData = mockData.map(ladder => ({
            id: ladder.id,
            propertyId: ladder.property_id,
            location: ladder.location_description,
            type: ladder.type,
            status: ladder.status,
            lastTestDate: new Date(ladder.last_inspection_date).toLocaleDateString(),
            nextTestDate: new Date(ladder.next_inspection_date).toLocaleDateString(),
            height: ladder.height,
            material: ladder.material,
            notes: ladder.notes
          }));

          setLadders(formattedData);
          return;
        }
        throw error;
      }
    } catch (err) {
      console.error('Error in fetchLaddersData:', err);
      setError(err.message);
      toast.error(err.message || 'Failed to fetch ladders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (ladderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/ladders/${ladderId}/status`, {
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

      const updatedLadder = await response.json();
      setLadders(ladders.map(ladder => 
        ladder.id === updatedLadder.id ? updatedLadder : ladder
      ));

      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.message || 'Failed to update status');
    }
  };

  const handleViewTestData = (ladder) => {
    console.log('Viewing test data for ladder:', ladder);
    if (ladder.test_report_url) {
      let url = ladder.test_report_url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `${API_BASE_URL}/${url}`;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      toast.info('No test data available for this ladder');
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchLaddersData();
    }
  }, [propertyId]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="ladders-section">
      <div className="page-header">
        <div className="header-content">
          <h1>Ladders</h1>
          <p>Monitor and maintain the safety of all ladders across your properties.</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Ladder
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
              {ladders.map((ladder) => (
                <tr key={ladder.id}>
                  <td>{ladder.id}</td>
                  <td>{ladder.location}</td>
                  <td>{ladder.type}</td>
                  <td>
                    <select
                      value={ladder.status}
                      onChange={(e) => handleStatusUpdate(ladder.id, e.target.value)}
                      className={`status-select ${ladder.status.toLowerCase()}`}
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Passed">Passed</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </td>
                  <td>{ladder.lastTestDate}</td>
                  <td>{ladder.nextTestDate}</td>
                  <td>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleViewTestData(ladder)}
                    >
                      <FontAwesomeIcon icon={faEye} /> View Test Data
                    </button>
                  </td>
                  <td>
                    <button 
                      className="edit-btn"
                      onClick={() => {
                        setEditingLadder(ladder);
                        setShowEditModal(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
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
