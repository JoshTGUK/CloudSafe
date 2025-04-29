import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './BasicInformation.css';

function BasicInformation() {
  const [formData, setFormData] = useState({
    propertyName: '',
    address: '',
    city: '',
    postcode: '',
    country: 'UK',
    buildingType: 'commercial',
    yearBuilt: ''
  });

  const buildingTypes = [
    { value: 'commercial', label: 'Commercial' },
    { value: 'residential', label: 'Residential' },
    { value: 'mixed', label: 'Mixed Use' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'retail', label: 'Retail' }
  ];

  const countries = [
    { value: 'UK', label: 'United Kingdom' },
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' }
    // Add more countries as needed
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
      console.log('Saving property details:', formData);
      toast.success('Property details updated successfully');
    } catch (error) {
      console.error('Error saving property details:', error);
      toast.error('Failed to update property details');
    }
  };

  return (
    <div className="basic-information">
      <h1>Basic Information</h1>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="propertyName">Property Name</label>
            <input
              type="text"
              id="propertyName"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              required
              placeholder="Enter property name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter full address"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Enter city"
              />
            </div>

            <div className="form-group">
              <label htmlFor="postcode">Postcode</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                required
                placeholder="Enter postcode"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                {countries.map(country => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="buildingType">Building Type</label>
              <select
                id="buildingType"
                name="buildingType"
                value={formData.buildingType}
                onChange={handleChange}
                required
              >
                {buildingTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="yearBuilt">Year Built</label>
            <input
              type="number"
              id="yearBuilt"
              name="yearBuilt"
              value={formData.yearBuilt}
              onChange={handleChange}
              placeholder="Enter year built"
              min="1800"
              max={new Date().getFullYear()}
            />
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

export default BasicInformation; 