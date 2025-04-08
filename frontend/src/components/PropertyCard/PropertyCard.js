import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './PropertyCard.css';
import placeholderImage from '../../assets/placeholder.png';

const PropertyCard = ({ property, onDelete }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.closest('.delete-button')) return;
    navigate(`/propertydashboard/${property.id}`);
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return placeholderImage;
    if (imageUrl.startsWith('http')) return imageUrl;
    
    // Remove any leading slashes and construct the full URL
    const cleanImagePath = imageUrl.replace(/^\/+/, '');
    return `${process.env.REACT_APP_API_URL}/api/${cleanImagePath}`;
  };

  return (
    <>
      <div className="property-card" onClick={handleClick}>
        <div className={`property-image ${imageLoading ? 'loading' : ''}`}>
          <img
            src={imageError ? placeholderImage : getImageUrl(property.image_url)}
            alt={property.name}
            onError={() => {
              console.error('Image failed to load:', property.image_url);
              setImageError(true);
              setImageLoading(false);
            }}
            onLoad={() => setImageLoading(false)}
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