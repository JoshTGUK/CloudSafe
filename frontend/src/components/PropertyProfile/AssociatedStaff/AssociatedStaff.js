import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaUser, FaPhone, FaEnvelope, FaUserTie, FaPlus, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './AssociatedStaff.css';

function AssociatedStaff() {
  const [showModal, setShowModal] = useState(false);
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      name: 'John Smith',
      role: 'Property Manager',
      email: 'john.smith@example.com',
      phone: '020 7123 4567'
    }
  ]);

  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    email: '',
    phone: ''
  });

  const roles = [
    'Property Manager',
    'Maintenance Manager',
    'Security Manager',
    'Facility Manager',
    'Building Engineer',
    'Health & Safety Officer'
  ];

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    
    try {
      // TODO: Implement API call
      const newStaffMember = {
        id: Date.now(),
        ...newStaff
      };
      
      setStaffList(prev => [...prev, newStaffMember]);
      setNewStaff({ name: '', role: '', email: '', phone: '' });
      setShowModal(false);
      toast.success('Staff member added successfully');
    } catch (error) {
      toast.error('Failed to add staff member');
    }
  };

  const handleRemoveStaff = (id) => {
    try {
      setStaffList(prev => prev.filter(staff => staff.id !== id));
      toast.success('Staff member removed successfully');
    } catch (error) {
      toast.error('Failed to remove staff member');
    }
  };

  return (
    <div className="associated-staff">
      <button className="sidebar-back-btn" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <div className="staff-header">
        <h1>Associated Staff</h1>
        <button className="add-staff-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Staff Member
        </button>
      </div>

      <div className="staff-list">
        {staffList.map(staff => (
          <div key={staff.id} className="staff-card">
            <div className="staff-info">
              <div className="staff-main">
                <FaUserTie className="staff-icon" />
                <div>
                  <h3>{staff.name}</h3>
                  <p className="staff-role">{staff.role}</p>
                </div>
              </div>
              <button 
                className="remove-staff-btn"
                onClick={() => handleRemoveStaff(staff.id)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="staff-contact">
              <p><FaEnvelope /> {staff.email}</p>
              <p><FaPhone /> {staff.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Staff Member</h2>
              <button className="close-modal" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddStaff}>
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser className="input-icon" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newStaff.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter staff member's name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={newStaff.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope className="input-icon" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newStaff.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  <FaPhone className="input-icon" />
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={newStaff.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  Add Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssociatedStaff; 