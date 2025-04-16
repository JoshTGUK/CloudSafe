import React, { useState, useEffect } from 'react';
import './RoofSafety.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import MainHeader from '../common/MainHeader/MainHeader';

export default function DavitBases() {
  const { id } = useParams();
  const [davitBases, setDavitBases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDavitBase, setNewDavitBase] = useState({
    location: '',
    type: 'Standard',
    lastTestDate: new Date().toISOString().split('T')[0],
    status: 'Unknown'
  });
  const [editingDavitBase, setEditingDavitBase] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3006';

  // Mock data for development
  const mockData = [
    {
      id: 1,
      location: 'North Roof Corner',
      type: 'Fixed Base',
      status: 'Pass',
      lastTestDate: '15/06/2023',
      nextTestDate: '15/06/2024'
    },
    {
      id: 2,
      location: 'East Roof Edge',
      type: 'Socket Mount',
      status: 'Unknown',
      lastTestDate: '10/05/2023',
      nextTestDate: '10/05/2024'
    },
    {
      id: 3,
      location: 'South Roof Corner',
      type: 'Plate Mount',
      status: 'Fail',
      lastTestDate: '20/07/2023',
      nextTestDate: '20/07/2024'
    }
  ];

  const fetchDavitBases = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // This endpoint would need to be created on the backend
      const response = await fetch(`${API_BASE_URL}/api/properties/${id}/davit-bases`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // For development, use mock data
      if (!response.ok) {
        console.log('Using mock data for davit bases');
        setDavitBases(mockData);
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      setDavitBases(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching davit bases:', error);
      // Use mock data for development
      console.log('Using mock data due to error');
      setDavitBases(mockData);
      setLoading(false);
    }
  };

  const handleCreateDavitBase = async () => {
    try {
      const token = localStorage.getItem('token');

      const requestData = {
        location: newDavitBase.location,
        type: newDavitBase.type,
        lastTestDate: newDavitBase.lastTestDate,
        status: 'Unknown'
      };

      // This endpoint would need to be created on the backend
      const response = await fetch(`${API_BASE_URL}/api/properties/${id}/davit-bases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Failed to create davit base');
      }

      const createdBase = await response.json();
      
      setDavitBases(prev => [...prev, createdBase]);
      setShowCreateModal(false);
      setNewDavitBase({
        location: '',
        type: 'Standard',
        lastTestDate: new Date().toISOString().split('T')[0],
        status: 'Unknown'
      });
      toast.success('Davit base created successfully');
      
      fetchDavitBases();
    } catch (error) {
      console.error('Error creating davit base:', error);
      toast.error('Failed to create davit base. Using mock data instead.');
      
      // For development without backend
      const mockNewBase = {
        id: davitBases.length + 1,
        location: newDavitBase.location,
        type: newDavitBase.type,
        status: 'Unknown',
        lastTestDate: new Date().toLocaleDateString('en-GB'),
        nextTestDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('en-GB')
      };
      
      setDavitBases(prev => [...prev, mockNewBase]);
      setShowCreateModal(false);
      setNewDavitBase({
        location: '',
        type: 'Standard',
        lastTestDate: new Date().toISOString().split('T')[0],
        status: 'Unknown'
      });
    }
  };

  const handleEditClick = (base) => {
    setEditingDavitBase(base);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/properties/${id}/davit-bases/${editingDavitBase.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          location: editingDavitBase.location,
          type: editingDavitBase.type,
          lastTestDate: editingDavitBase.lastTestDate,
          status: editingDavitBase.status
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update davit base');
      }

      const updatedBase = await response.json();
      setDavitBases(davitBases.map(base => 
        base.id === updatedBase.id ? updatedBase : base
      ));
      setShowEditModal(false);
      setEditingDavitBase(null);
      toast.success('Davit base updated successfully');
    } catch (error) {
      console.error('Error updating davit base:', error);
      toast.info('Using mock data for update operation');
      
      // For development without backend
      setDavitBases(davitBases.map(base => 
        base.id === editingDavitBase.id ? editingDavitBase : base
      ));
      setShowEditModal(false);
      setEditingDavitBase(null);
    }
  };

  const handleDeleteDavitBase = async (baseId) => {
    if (!window.confirm('Are you sure you want to delete this davit base?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/properties/${id}/davit-bases/${baseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete davit base');
      }

      setDavitBases(davitBases.filter(base => base.id !== baseId));
      toast.success('Davit base deleted successfully');
    } catch (error) {
      console.error('Error deleting davit base:', error);
      toast.info('Using mock data for delete operation');
      
      // For development without backend
      setDavitBases(davitBases.filter(base => base.id !== baseId));
    }
  };

  const handleStatusUpdate = async (baseId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/properties/${id}/davit-bases/${baseId}/status`, {
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

      const updatedBase = await response.json();
      setDavitBases(davitBases.map(base => 
        base.id === updatedBase.id ? updatedBase : base
      ));
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.info('Using mock data for status update');
      
      // For development without backend
      setDavitBases(davitBases.map(base => 
        base.id === baseId ? { ...base, status: newStatus } : base
      ));
    }
  };

  useEffect(() => {
    fetchDavitBases();
  }, [id]);

  return (
    <div className={window.location.pathname.includes('/davit-bases') ? "roof-safety-container" : "davit-bases-section"}>
      {window.location.pathname.includes('/davit-bases') && (
        <>
          <MainHeader />
          <div className="page-content">
            <div className="left-panel">
              <h2>Roof Safety</h2>
              <nav className="safety-nav">
                <button 
                  className="nav-item"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Dashboard</span>
                  <span className="arrow">›</span>
                </button>
                <button 
                  className="nav-item"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Anchor Points</span>
                  <span className="arrow">›</span>
                </button>
                <button 
                  className="nav-item"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Cradles</span>
                  <span className="arrow">›</span>
                </button>
                <button 
                  className="nav-item active"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Davit Bases</span>
                  <span className="arrow">›</span>
                </button>
                <button 
                  className="nav-item"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Ladders</span>
                  <span className="arrow">›</span>
                </button>
                <button 
                  className="nav-item"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Walkways</span>
                  <span className="arrow">›</span>
                </button>
                <button 
                  className="nav-item"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Handrails</span>
                  <span className="arrow">›</span>
                </button>
                <button 
                  className="nav-item"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Static Lines</span>
                  <span className="arrow">›</span>
                </button>
              </nav>
            </div>
            <div className="main-panel">
              <div className="davit-bases-section">
                <h1>Davit Bases</h1>
                
                <div className="search-controls">
                  <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input 
                      type="text" 
                      placeholder="Search davit bases"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="table-buttons">
                    <button className="filter-btn">
                      <i className="fas fa-filter"></i>
                      Filter
                    </button>
                    <button 
                      className="btn"
                      onClick={() => {
                        setNewDavitBase({
                          location: '',
                          type: 'Standard',
                          lastTestDate: new Date().toISOString().split('T')[0],
                          status: 'Unknown'
                        });
                        setShowCreateModal(true);
                      }}
                    >
                      Create Davit Base
                    </button>
                  </div>
                </div>

                {loading ? (
                  <div className="loading-spinner">Loading davit bases...</div>
                ) : (
                  <div className="table-section" style={{ width: '100%', overflow: 'hidden' }}>
                    <div className="table-container" style={{ width: '100%', overflowX: 'auto', maxHeight: 'calc(100vh - 300px)' }}>
                      <table style={{ minWidth: '1200px' }}>
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
                          {davitBases.filter(base =>
                            base.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            base.type.toLowerCase().includes(searchTerm.toLowerCase())
                          ).map((base) => (
                            <tr key={base.id}>
                              <td>{base.id}</td>
                              <td>{base.location}</td>
                              <td>{base.type}</td>
                              <td>
                                <select
                                  value={base.status}
                                  onChange={(e) => handleStatusUpdate(base.id, e.target.value)}
                                  className={`status-select ${base.status.toLowerCase()}`}
                                >
                                  <option value="Unknown">Unknown</option>
                                  <option value="Pass">Pass</option>
                                  <option value="Fail">Fail</option>
                                  <option value="Pending">Pending</option>
                                </select>
                              </td>
                              <td>{base.lastTestDate}</td>
                              <td>{base.nextTestDate}</td>
                              <td>
                                <button 
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteDavitBase(base.id)}
                                >
                                  Delete
                                </button>
                              </td>
                              <td>
                                <button 
                                  className="edit-btn"
                                  onClick={() => handleEditClick(base)}
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
                )}

                {/* Create Modal */}
                {showCreateModal && (
                  <div className="modal">
                    <div className="modal-content">
                      <span className="close" onClick={() => setShowCreateModal(false)}>&times;</span>
                      <h2>Create Davit Base</h2>
                      <div className="form-group">
                        <label>Location:</label>
                        <input 
                          type="text" 
                          value={newDavitBase.location}
                          onChange={(e) => setNewDavitBase({...newDavitBase, location: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Type:</label>
                        <select 
                          value={newDavitBase.type}
                          onChange={(e) => setNewDavitBase({...newDavitBase, type: e.target.value})}
                        >
                          <option value="Standard">Standard</option>
                          <option value="Fixed Base">Fixed Base</option>
                          <option value="Socket Mount">Socket Mount</option>
                          <option value="Plate Mount">Plate Mount</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Last Test Date:</label>
                        <input 
                          type="date" 
                          value={newDavitBase.lastTestDate}
                          onChange={(e) => setNewDavitBase({...newDavitBase, lastTestDate: e.target.value})}
                        />
                      </div>
                      <div className="form-actions">
                        <button 
                          className="btn cancel"
                          onClick={() => setShowCreateModal(false)}
                        >
                          Cancel
                        </button>
                        <button 
                          className="btn submit"
                          onClick={handleCreateDavitBase}
                          disabled={!newDavitBase.location}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Edit Modal */}
                {showEditModal && editingDavitBase && (
                  <div className="modal">
                    <div className="modal-content">
                      <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
                      <h2>Edit Davit Base</h2>
                      <div className="form-group">
                        <label>Location:</label>
                        <input 
                          type="text" 
                          value={editingDavitBase.location}
                          onChange={(e) => setEditingDavitBase({...editingDavitBase, location: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Type:</label>
                        <select 
                          value={editingDavitBase.type}
                          onChange={(e) => setEditingDavitBase({...editingDavitBase, type: e.target.value})}
                        >
                          <option value="Standard">Standard</option>
                          <option value="Fixed Base">Fixed Base</option>
                          <option value="Socket Mount">Socket Mount</option>
                          <option value="Plate Mount">Plate Mount</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Status:</label>
                        <select 
                          value={editingDavitBase.status}
                          onChange={(e) => setEditingDavitBase({...editingDavitBase, status: e.target.value})}
                        >
                          <option value="Unknown">Unknown</option>
                          <option value="Pass">Pass</option>
                          <option value="Fail">Fail</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                      <div className="form-actions">
                        <button 
                          className="btn cancel"
                          onClick={() => setShowEditModal(false)}
                        >
                          Cancel
                        </button>
                        <button 
                          className="btn submit"
                          onClick={handleEditSubmit}
                          disabled={!editingDavitBase.location}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {!window.location.pathname.includes('/davit-bases') && (
        <>
          <h1>Davit Bases</h1>
          
          <div className="search-controls">
            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search davit bases"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="table-buttons">
              <button className="filter-btn">
                <i className="fas fa-filter"></i>
                Filter
              </button>
              <button 
                className="btn"
                onClick={() => {
                  setNewDavitBase({
                    location: '',
                    type: 'Standard',
                    lastTestDate: new Date().toISOString().split('T')[0],
                    status: 'Unknown'
                  });
                  setShowCreateModal(true);
                }}
              >
                Create Davit Base
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading-spinner">Loading davit bases...</div>
          ) : (
            <div className="table-section" style={{ width: '100%', overflow: 'hidden' }}>
              <div className="table-container" style={{ width: '100%', overflowX: 'auto', maxHeight: 'calc(100vh - 300px)' }}>
                <table style={{ minWidth: '1200px' }}>
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
                    {davitBases.filter(base =>
                      base.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      base.type.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((base) => (
                      <tr key={base.id}>
                        <td>{base.id}</td>
                        <td>{base.location}</td>
                        <td>{base.type}</td>
                        <td>
                          <select
                            value={base.status}
                            onChange={(e) => handleStatusUpdate(base.id, e.target.value)}
                            className={`status-select ${base.status.toLowerCase()}`}
                          >
                            <option value="Unknown">Unknown</option>
                            <option value="Pass">Pass</option>
                            <option value="Fail">Fail</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </td>
                        <td>{base.lastTestDate}</td>
                        <td>{base.nextTestDate}</td>
                        <td>
                          <button 
                            className="btn btn-danger"
                            onClick={() => handleDeleteDavitBase(base.id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <button 
                            className="edit-btn"
                            onClick={() => handleEditClick(base)}
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
          )}
        </>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowCreateModal(false)}>&times;</span>
            <h2>Create Davit Base</h2>
            <div className="form-group">
              <label>Location:</label>
              <input 
                type="text" 
                value={newDavitBase.location}
                onChange={(e) => setNewDavitBase({...newDavitBase, location: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <select 
                value={newDavitBase.type}
                onChange={(e) => setNewDavitBase({...newDavitBase, type: e.target.value})}
              >
                <option value="Standard">Standard</option>
                <option value="Fixed Base">Fixed Base</option>
                <option value="Socket Mount">Socket Mount</option>
                <option value="Plate Mount">Plate Mount</option>
              </select>
            </div>
            <div className="form-group">
              <label>Last Test Date:</label>
              <input 
                type="date" 
                value={newDavitBase.lastTestDate}
                onChange={(e) => setNewDavitBase({...newDavitBase, lastTestDate: e.target.value})}
              />
            </div>
            <div className="form-actions">
              <button 
                className="btn cancel"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn submit"
                onClick={handleCreateDavitBase}
                disabled={!newDavitBase.location}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingDavitBase && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
            <h2>Edit Davit Base</h2>
            <div className="form-group">
              <label>Location:</label>
              <input 
                type="text" 
                value={editingDavitBase.location}
                onChange={(e) => setEditingDavitBase({...editingDavitBase, location: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <select 
                value={editingDavitBase.type}
                onChange={(e) => setEditingDavitBase({...editingDavitBase, type: e.target.value})}
              >
                <option value="Standard">Standard</option>
                <option value="Fixed Base">Fixed Base</option>
                <option value="Socket Mount">Socket Mount</option>
                <option value="Plate Mount">Plate Mount</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select 
                value={editingDavitBase.status}
                onChange={(e) => setEditingDavitBase({...editingDavitBase, status: e.target.value})}
              >
                <option value="Unknown">Unknown</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="form-actions">
              <button 
                className="btn cancel"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn submit"
                onClick={handleEditSubmit}
                disabled={!editingDavitBase.location}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 