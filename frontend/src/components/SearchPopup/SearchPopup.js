import React, { useRef, useEffect } from 'react';
import { FaSearch, FaTimes, FaArrowLeft } from 'react-icons/fa';
import placeholderImage from '../../assets/placeholder.png';
import './SearchPopup.css';

const SearchPopup = ({ isOpen, onClose, properties, searchTerm, onSearchChange, onPropertyClick }) => {
  const popupRef = useRef(null);

  // Add helper function for image URLs
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return placeholderImage;
    if (imageUrl.startsWith('http')) return imageUrl;
    
    // If the URL already contains 'uploads/', use it as is
    if (imageUrl.includes('uploads/')) {
      return `${process.env.REACT_APP_API_URL}/api/${imageUrl}`;
    }
    // Otherwise, add 'uploads/' to the path
    return `${process.env.REACT_APP_API_URL}/api/uploads/${imageUrl}`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const filteredProperties = properties.filter(property => 
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    // Sort by closest match
    const aNameMatch = a.name.toLowerCase().indexOf(searchTerm.toLowerCase());
    const bNameMatch = b.name.toLowerCase().indexOf(searchTerm.toLowerCase());
    return aNameMatch - bNameMatch;
  });

  if (!isOpen) return null;

  return (
    <div className="search-popup-overlay">
      <div className="search-popup" ref={popupRef}>
        <div className="search-popup-header">
          <button className="back-button" onClick={onClose}>
            <FaArrowLeft /> Back
          </button>
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search properties by name or address..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <button 
                className="clear-search" 
                onClick={() => onSearchChange('')}
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
        
        <div className="search-results">
          {filteredProperties.length === 0 ? (
            <div className="no-results">
              <p>No properties found matching "{searchTerm}"</p>
              <button className="clear-search-button" onClick={() => onSearchChange('')}>
                Clear Search
              </button>
            </div>
          ) : (
            <>
              <div className="results-header">
                <span>{filteredProperties.length} properties found</span>
              </div>
              <div className="property-list">
                {filteredProperties.map(property => (
                  <div 
                    key={property.id}
                    className="property-list-item"
                    onClick={() => {
                      onPropertyClick(property.id);
                      onClose();
                    }}
                  >
                    <img 
                      src={getImageUrl(property.image_url)}
                      alt={property.name}
                      className="property-thumbnail"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderImage;
                      }}
                    />
                    <div className="property-details">
                      <h3>{property.name}</h3>
                      <p>{property.address}</p>
                    </div>
                    <button className="view-property-btn">View Property</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPopup; 