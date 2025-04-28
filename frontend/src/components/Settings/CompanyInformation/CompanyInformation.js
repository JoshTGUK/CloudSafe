import React, { useState } from 'react';
import './CompanyInformation.css';

function CompanyInformation() {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    logo: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      logo: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement save functionality
    console.log('Form submitted:', formData);
  };

  return (
    <div className="company-info">
      <h1>Company Information</h1>
      <form onSubmit={handleSubmit} className="company-form">
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="logo">Company Logo</label>
          <input
            type="file"
            id="logo"
            name="logo"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Contact Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Contact Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Company Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default CompanyInformation; 