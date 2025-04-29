import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaBuilding, FaLayerGroup, FaHome, FaWarehouse } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './BuildingDetails.css';

function BuildingDetails() {
  const [formData, setFormData] = useState({
    numberOfFloors: '',
    totalUnits: '',
    mainConstruction: '',
    roofType: '',
    hasBasement: false,
    totalArea: '',
    parkingSpaces: '',
    buildingClass: 'A'
  });

  const constructionTypes = [
    'Brick and Block',
    'Steel Frame',
    'Concrete',
    'Timber Frame',
    'Mixed Construction'
  ];

  const roofTypes = [
    'Flat Roof',
    'Pitched Roof',
    'Metal Roof',
    'Green Roof',
    'Tiled Roof'
  ];

  const buildingClasses = [
    { value: 'A', label: 'Class A - Premium' },
    { value: 'B', label: 'Class B - Good Quality' },
    { value: 'C', label: 'Class C - Fair Quality' }
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // TODO: Implement API call
      console.log('Saving building details:', formData);
      toast.success('Building details updated successfully');
    } catch (error) {
      console.error('Error saving building details:', error);
      toast.error('Failed to update building details');
    }
  };

  return (
    <div className="building-details">
      <button className="sidebar-back-btn" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <h1>Building Details</h1>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Structure Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="numberOfFloors">
                  <FaLayerGroup className="input-icon" />
                  Number of Floors
                </label>
                <input
                  type="number"
                  id="numberOfFloors"
                  name="numberOfFloors"
                  value={formData.numberOfFloors}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Enter number of floors"
                />
              </div>

              <div className="form-group">
                <label htmlFor="totalUnits">
                  <FaHome className="input-icon" />
                  Total Units
                </label>
                <input
                  type="number"
                  id="totalUnits"
                  name="totalUnits"
                  value={formData.totalUnits}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Enter total units"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mainConstruction">
                  <FaBuilding className="input-icon" />
                  Main Construction
                </label>
                <select
                  id="mainConstruction"
                  name="mainConstruction"
                  value={formData.mainConstruction}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select construction type</option>
                  {constructionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="roofType">
                  <FaWarehouse className="input-icon" />
                  Roof Type
                </label>
                <select
                  id="roofType"
                  name="roofType"
                  value={formData.roofType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select roof type</option>
                  {roofTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Additional Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="totalArea">Total Area (sq ft)</label>
                <input
                  type="number"
                  id="totalArea"
                  name="totalArea"
                  value={formData.totalArea}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Enter total area"
                />
              </div>

              <div className="form-group">
                <label htmlFor="parkingSpaces">Parking Spaces</label>
                <input
                  type="number"
                  id="parkingSpaces"
                  name="parkingSpaces"
                  value={formData.parkingSpaces}
                  onChange={handleChange}
                  min="0"
                  placeholder="Enter number of parking spaces"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="buildingClass">Building Class</label>
                <select
                  id="buildingClass"
                  name="buildingClass"
                  value={formData.buildingClass}
                  onChange={handleChange}
                  required
                >
                  {buildingClasses.map(cls => (
                    <option key={cls.value} value={cls.value}>
                      {cls.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="hasBasement"
                    checked={formData.hasBasement}
                    onChange={handleChange}
                  />
                  <span>Has Basement</span>
                </label>
              </div>
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

export default BuildingDetails; 