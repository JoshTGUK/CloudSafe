import React, { useState } from 'react';
import MainHeader from '../../common/MainHeader/MainHeader';
import { FaUpload, FaExclamationTriangle, FaCheck, FaSpinner, FaTools } from 'react-icons/fa';
import '../shared/MaintenanceStyles.css';
import './DefectsReporting.css';

const DefectsReporting = ({ hideHeader }) => {
  const [defects] = useState([
    {
      id: 1,
      title: 'Ceiling Water Stain',
      location: '3rd Floor Meeting Room',
      description: 'Water stain appearing on ceiling tiles',
      priority: 'high',
      reported: '2024-03-10',
      status: 'investigating',
      assignedTo: 'Maintenance Team'
    },
    {
      id: 2,
      title: 'Loose Door Handle',
      location: 'Ground Floor Kitchen',
      description: 'Door handle becoming loose and difficult to operate',
      priority: 'medium',
      reported: '2024-03-08',
      status: 'scheduled',
      assignedTo: 'John Smith'
    }
  ]);

  const [newDefect, setNewDefect] = useState({
    title: '',
    location: '',
    description: '',
    priority: 'medium',
    images: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle defect submission
    console.log('Submitting defect:', newDefect);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewDefect(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  return (
    <div className="maintenance-page">
      {!hideHeader && <MainHeader />}
      <div className="maintenance-content">
        <div className="content-header">
          <h1>Defects Reporting</h1>
        </div>

        {/* Report Defect Form */}
        <section className="report-section">
          <h2>Report New Defect</h2>
          <form onSubmit={handleSubmit} className="defect-form">
            <div className="form-group">
              <label htmlFor="title">Defect Title</label>
              <input
                type="text"
                id="title"
                value={newDefect.title}
                onChange={(e) => setNewDefect(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of the defect"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={newDefect.location}
                onChange={(e) => setNewDefect(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Where is the defect located?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Detailed Description</label>
              <textarea
                id="description"
                value={newDefect.description}
                onChange={(e) => setNewDefect(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide more details about the defect"
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority Level</label>
              <select
                id="priority"
                value={newDefect.priority}
                onChange={(e) => setNewDefect(prev => ({ ...prev, priority: e.target.value }))}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Attach Images</label>
              <div className="upload-area">
                <div className="upload-box">
                  <FaUpload />
                  <p>Drop images here or click to upload</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="file-input"
                  />
                </div>
              </div>
              {newDefect.images.length > 0 && (
                <div className="image-preview">
                  {newDefect.images.map((file, index) => (
                    <div key={index} className="preview-item">
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="submit-button">
              Submit Defect Report
            </button>
          </form>
        </section>

        {/* Active Defects */}
        <section className="defects-section">
          <h2>Active Defects</h2>
          <div className="defects-grid">
            {defects.map(defect => (
              <div key={defect.id} className="defect-card">
                <div className="defect-header">
                  <div className="defect-title">
                    <FaTools />
                    <h3>{defect.title}</h3>
                  </div>
                  <span className={`priority-pill ${defect.priority}`}>
                    {defect.priority}
                  </span>
                </div>
                <div className="defect-details">
                  <p><strong>Location:</strong> {defect.location}</p>
                  <p><strong>Description:</strong> {defect.description}</p>
                  <p><strong>Reported:</strong> {new Date(defect.reported).toLocaleDateString()}</p>
                  <p><strong>Assigned To:</strong> {defect.assignedTo}</p>
                  <p><strong>Status:</strong> 
                    <span className={`status-pill ${defect.status}`}>
                      {defect.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DefectsReporting; 