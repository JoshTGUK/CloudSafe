import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import './PropertyCard.css';
import placeholderImage from '../../assets/placeholder.png';

const PropertyCard = ({ property, onDelete, onPropertyClick }) => {
  const [imageError, setImageError] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const getImageUrl = (imageUrl) => {
    // If no image or error, return placeholder
    if (!imageUrl || imageError) return placeholderImage;
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http')) return imageUrl;
    
    // For image paths from the API
    if (imageUrl.startsWith('uploads/')) {
      return `${process.env.REACT_APP_API_URL}/api/${imageUrl}`;
    }
    
    // For any other case
    return `${process.env.REACT_APP_API_URL}/api/uploads/${imageUrl}`;
  };

  // Add debug logging
  useEffect(() => {
    console.log('Property Card Debug:', {
      propertyName: property.name,
      rawImageUrl: property.image_url,
      constructedUrl: getImageUrl(property.image_url)
    });
  }, [property]);

  const handleClick = (e) => {
    // Don't trigger click if clicking on action buttons or modal
    if (e.target.closest('.property-actions') || e.target.closest('.confirmation-modal')) {
      return;
    }
    onPropertyClick(property.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    // Navigate to the edit property page
    navigate(`/property/edit/${property.id}`, { 
      state: { property } // Pass the property data to the edit page
    });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowConfirmDelete(true);
  };

  return (
    <>
      <div className="property-card" onClick={handleClick}>
        <div className="property-image property-image-box">
          <img
            src={getImageUrl(property.image_url)}
            alt={property.name}
            onError={(e) => {
              setImageError(true);
              e.target.src = placeholderImage;
            }}
          />
          <div className="property-actions">
            <button 
              type="button"
              className="action-button edit"
              onClick={handleEdit}
              title="Edit Property"
            >
              <span className="icon-wrapper">
                <MdEdit size={24} />
              </span>
            </button>
            <button 
              type="button"
              className="action-button delete"
              onClick={handleDelete}
              title="Delete Property"
            >
              <span className="icon-wrapper">
                <MdDelete size={24} />
              </span>
            </button>
          </div>
        </div>
        <div className="property-info property-info-left">
          <h3 className="property-name">{property.name}</h3>
          <p className="property-address">{property.address}</p>
        </div>
      </div>

      {showConfirmDelete && (
        <div 
          className="confirmation-modal"
          onClick={(e) => {
            if (e.target.className === 'confirmation-modal') {
              setShowConfirmDelete(false);
            }
          }}
        >
          <div className="confirmation-content">
            <h3>Delete Property</h3>
            <p>Are you sure you want to delete "{property.name}"? This action cannot be undone.</p>
            <div className="confirmation-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancel
              </button>
              <button 
                className="delete-button"
                onClick={() => {
                  onDelete(property.id);
                  setShowConfirmDelete(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyCard; 