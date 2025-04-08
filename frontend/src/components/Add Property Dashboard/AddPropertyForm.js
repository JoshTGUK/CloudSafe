import React, { useState, useEffect } from 'react';
import './AddPropertyForm.css';
import { toast } from 'react-toastify';
import { FaTimes, FaCloudUploadAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

// Use environment variable instead
const MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function AddPropertyForm({ onClose, onAddProperty }) {
  const [formData, setFormData] = useState({
    name: '',
    address: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addressValid, setAddressValid] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [mapsError, setMapsError] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (name === 'address') {
      setAddressValid(false);
    }
  };

  const onLoad = (autocomplete) => {
    if (autocomplete) {
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          setCoordinates({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });
          setFormData(prev => ({
            ...prev,
            address: place.formatted_address
          }));
          setAddressValid(true);
        }
      });
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      try {
        // Create a preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Process the image
        const processedImage = await processImage(file);
        setSelectedImage(processedImage);
      } catch (error) {
        console.error('Error processing image:', error);
        toast.error('Error processing image');
      }
    }
  };

  const processImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Set dimensions to match property card ratio (16:11)
          const targetWidth = 800; // Base width
          const targetHeight = (targetWidth * 11) / 16;

          canvas.width = targetWidth;
          canvas.height = targetHeight;

          // Calculate dimensions to maintain aspect ratio and center crop
          let sourceX = 0;
          let sourceY = 0;
          let sourceWidth = img.width;
          let sourceHeight = img.height;

          const targetRatio = targetWidth / targetHeight;
          const imageRatio = img.width / img.height;

          if (imageRatio > targetRatio) {
            // Image is wider than needed
            sourceWidth = img.height * targetRatio;
            sourceX = (img.width - sourceWidth) / 2;
          } else {
            // Image is taller than needed
            sourceHeight = img.width / targetRatio;
            sourceY = (img.height - sourceHeight) / 2;
          }

          // Fill with background color first
          ctx.fillStyle = '#f5f5f5';
          ctx.fillRect(0, 0, targetWidth, targetHeight);

          // Draw the image centered
          ctx.drawImage(
            img,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            targetWidth,
            targetHeight
          );

          // Convert to file
          canvas.toBlob((blob) => {
            const processedFile = new File([blob], 'property-image.jpg', {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(processedFile);
          }, 'image/jpeg', 0.9);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!addressValid) {
        toast.error('Please select a valid address from the suggestions');
        return;
    }
    
    setLoading(true);

    try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('address', formData.address);
        
        if (coordinates) {
            formDataToSend.append('latitude', coordinates.lat);
            formDataToSend.append('longitude', coordinates.lng);
        }
        
        if (selectedImage) {
            formDataToSend.append('image', selectedImage);
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formDataToSend
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to add property');
        }

        const data = await response.json();
        onAddProperty(data); // Pass the entire response data
        onClose();
        toast.success('Property added successfully');
    } catch (error) {
        console.error('Error adding property:', error);
        toast.error(error.message || 'Failed to add property');
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    // Verify API key is loaded
    if (!MAPS_API_KEY) {
        console.error('Google Maps API key is not configured');
        setMapsError(true);
    }

    // Cleanup function
    return () => {
        // Only remove scripts if they exist
        const scripts = document.querySelectorAll('script[src*="maps.googleapis.com"]');
        scripts.forEach(script => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        });

        // Only remove elements if they exist
        const elements = document.querySelectorAll('[id^="gmp-"]');
        elements.forEach(el => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });

        // Reset state
        setMapsLoaded(false);
        setMapsError(false);
    };
  }, []);

  return (
    <div className="add-property-overlay">
      <div className="add-property-form">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        
        <h2>Add New Property</h2>
        <p className="form-subtitle">Enter property details below</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Property Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter property name"
              required
              disabled={loading}
            />
          </div>

          <LoadScript
            googleMapsApiKey={MAPS_API_KEY}
            libraries={libraries}
            loadingElement={<div className="maps-loading">Loading Google Maps...</div>}
            onError={(error) => {
                console.error('Google Maps failed to load:', error);
                setMapsError(true);
                toast.error('Address autocomplete is currently unavailable');
            }}
            onLoad={() => {
                console.log('Google Maps script loaded successfully');
                setMapsLoaded(true);
            }}
          >
            {mapsLoaded ? (
                <div className="form-group">
                    <label htmlFor="address">Property Address</label>
                    <div className="address-input-container">
                        <FaMapMarkerAlt className="address-icon" />
                        <Autocomplete
                            onLoad={onLoad}
                            restrictions={{ country: "gb" }}
                        >
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter property address"
                                required
                                disabled={loading}
                                className={addressValid ? 'valid-address' : ''}
                            />
                        </Autocomplete>
                    </div>
                    {addressValid && (
                        <div className="validation-indicator">
                            <span>✓ Valid address</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="maps-loading">Loading address autocomplete...</div>
            )}
          </LoadScript>

          {mapsError && (
            <div className="form-group">
              <label htmlFor="address">Property Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter property address"
                required
                disabled={loading}
              />
              <small className="error-text">Address autocomplete is unavailable</small>
            </div>
          )}

          <div className="form-group file-upload">
            <label className="file-upload-label">
              <div className="upload-placeholder">
                {preview ? (
                  <img src={preview} alt="Preview" className="image-preview" />
                ) : (
                  <>
                    <FaCloudUploadAlt className="upload-icon" />
                    <span>Click to upload image</span>
                    <span className="upload-hint">Image will be automatically cropped to fit</span>
                  </>
                )}
              </div>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="file-input"
                disabled={loading}
              />
            </label>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading || !addressValid}
            >
              {loading ? 'Adding...' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
