import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './PropertyCard.css';
import placeholderImage from '../../assets/placeholder.png';

const PropertyCard = ({ property, onDelete, onPropertyClick, onEdit }) => {
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
    if (e.target.closest('.delete-button') || e.target.closest('.confirmation-modal')) {
      return;
    }
    onPropertyClick(property.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(property);
    } else {
      navigate(`/editproperty/${property.id}`);
    }
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
        </div>
        <div className="property-info property-info-left">
          <h3 className="property-name">{property.name}</h3>
          <p className="property-address">{property.address}</p>
        </div>
        <div className="property-actions">
          <button 
            className="action-button edit"
            onClick={handleEdit}
            title="Edit Property"
          >
            <FaEdit />
          </button>
          <button 
            className="action-button delete"
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmDelete(true);
            }}
            title="Delete Property"
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