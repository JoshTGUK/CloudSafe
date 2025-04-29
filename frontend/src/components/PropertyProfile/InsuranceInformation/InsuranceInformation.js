import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaShieldAlt, FaFileAlt, FaCalendarAlt, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './InsuranceInformation.css';

function InsuranceInformation() {
  const [formData, setFormData] = useState({
    insuranceProvider: '',
    policyNumber: '',
    coverageType: '',
    coverageAmount: '',
    expiryDate: '',
    certificate: null,
    renewalReminder: true
  });

  const coverageTypes = [
    'Commercial Property Insurance',
    'Public Liability Insurance',
    'Building Insurance',
    'Contents Insurance',
    'Combined Commercial Insurance'
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // TODO: Implement API call
      console.log('Saving insurance details:', formData);
      toast.success('Insurance information updated successfully');
    } catch (error) {
      console.error('Error saving insurance details:', error);
      toast.error('Failed to update insurance information');
    }
  };

  return (
    <div className="insurance-information">
      <button className="sidebar-back-btn" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <h1>Insurance Information</h1>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Insurance Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="insuranceProvider">
                  <FaBuilding className="input-icon" />
                  Insurance Provider
                </label>
                <input
                  type="text"
                  id="insuranceProvider"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleChange}
                  required
                  placeholder="Enter insurance provider"
                />
              </div>

              <div className="form-group">
                <label htmlFor="policyNumber">
                  <FaShieldAlt className="input-icon" />
                  Policy Number
                </label>
                <input
                  type="text"
                  id="policyNumber"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter policy number"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="coverageType">
                  <FaFileAlt className="input-icon" />
                  Coverage Type
                </label>
                <select
                  id="coverageType"
                  name="coverageType"
                  value={formData.coverageType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select coverage type</option>
                  {coverageTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="coverageAmount">Coverage Amount (£)</label>
                <input
                  type="number"
                  id="coverageAmount"
                  name="coverageAmount"
                  value={formData.coverageAmount}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Enter coverage amount"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">
                  <FaCalendarAlt className="input-icon" />
                  Expiry Date
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="certificate">Upload Certificate</label>
                <input
                  type="file"
                  id="certificate"
                  name="certificate"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="file-input"
                />
                <p className="help-text">Accepted formats: PDF, DOC, DOCX, JPG, PNG</p>
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="renewalReminder"
                  checked={formData.renewalReminder}
                  onChange={handleChange}
                />
                <span>Enable renewal reminders</span>
              </label>
              <p className="help-text">Receive notifications before policy expiry</p>
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

export default InsuranceInformation; 