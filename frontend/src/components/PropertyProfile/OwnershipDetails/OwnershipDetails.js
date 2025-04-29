import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaBuilding, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import './OwnershipDetails.css';

function OwnershipDetails() {
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerCompany: '',
    phone: '',
    email: '',
    ownershipType: 'freehold',
    purchaseDate: '',
    leaseEndDate: ''
  });

  const ownershipTypes = [
    { value: 'freehold', label: 'Freehold' },
    { value: 'leasehold', label: 'Leasehold' },
    { value: 'rental', label: 'Rental' },
    { value: 'managed', label: 'Managed Property' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // TODO: Implement API call
      console.log('Saving ownership details:', formData);
      toast.success('Ownership details updated successfully');
    } catch (error) {
      console.error('Error saving ownership details:', error);
      toast.error('Failed to update ownership details');
    }
  };

  return (
    <div className="ownership-details">
      <h1>Ownership Details</h1>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Owner Information</h2>
            <div className="form-group">
              <label htmlFor="ownerName">
                <FaUser className="input-icon" />
                Owner Name
              </label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                placeholder="Enter owner's full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ownerCompany">
                <FaBuilding className="input-icon" />
                Company Name (Optional)
              </label>
              <input
                type="text"
                id="ownerCompany"
                name="ownerCompany"
                value={formData.ownerCompany}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">
                  <FaPhone className="input-icon" />
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter contact number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope className="input-icon" />
                  Contact Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Ownership Type</h2>
            <div className="form-group">
              <label htmlFor="ownershipType">Type of Ownership</label>
              <select
                id="ownershipType"
                name="ownershipType"
                value={formData.ownershipType}
                onChange={handleChange}
                required
              >
                {ownershipTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="purchaseDate">Purchase Date</label>
                <input
                  type="date"
                  id="purchaseDate"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {formData.ownershipType === 'leasehold' && (
                <div className="form-group">
                  <label htmlFor="leaseEndDate">Lease End Date</label>
                  <input
                    type="date"
                    id="leaseEndDate"
                    name="leaseEndDate"
                    value={formData.leaseEndDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OwnershipDetails; 