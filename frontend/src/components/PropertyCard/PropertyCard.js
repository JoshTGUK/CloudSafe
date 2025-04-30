import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './PropertyCard.css';
import placeholderImage from '../../assets/placeholder.png';

const PropertyCard = ({ property, onDelete, onPropertyClick }) => {
  const [imageError, setImageError] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const getImageUrl = (imageUrl) => {
    if (!imageUrl || imageError) return placeholderImage;
    if (imageUrl.startsWith('http')) return imageUrl;
    console.log('Property image data:', {
      imageUrl,
      fullUrl: `${process.env.REACT_APP_API_URL}/api/${imageUrl}`
    });
    return `${process.env.REACT_APP_API_URL}/api/${imageUrl}`;
  };

  const handleClick = (e) => {
    if (e.target.closest('.delete-button') || e.target.closest('.confirmation-modal')) {
      return;
    }
    onPropertyClick(property.id);
  };

  console.log('Property in card:', property);

  return (
    <>
      <div className="property-card" onClick={handleClick}>
        <div className="property-image">
          <img
            src={getImageUrl(property.image_url)}
            alt={property.name}
            onError={(e) => {
              console.error('Image failed to load:', property.image_url);
              setImageError(true);
              e.target.src = placeholderImage;
            }}
          />
        </div>
        <div className="property-info">
          <h3>{property.name}</h3>
          <p>{property.address}</p>
        </div>
        <div className="property-actions">
          <button 
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmDelete(true);
            }}
          >
            <FaTrash />
          </button>
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