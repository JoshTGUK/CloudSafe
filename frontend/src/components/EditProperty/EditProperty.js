import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EditProperty.css';

const EditProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [property, setProperty] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    image_url: ''
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        // If property was passed through navigation state, use it
        if (location.state?.property) {
          setProperty(location.state.property);
          setFormData({
            name: location.state.property.name,
            address: location.state.property.address,
            image_url: location.state.property.image_url
          });
          setIsLoading(false);
          return;
        }

        // Otherwise fetch from API
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch property');

        const data = await response.json();
        setProperty(data);
        setFormData({
          name: data.name,
          address: data.address,
          image_url: data.image_url
        });
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load property details');
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id, location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to update property');

      toast.success('Property updated successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update property');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!property) {
    return <div className="error">Property not found</div>;
  }

  return (
    <div className="edit-property-container">
      <div className="edit-property-header">
        <h1>Edit Property</h1>
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="edit-property-form">
        <div className="form-group">
          <label htmlFor="name">Property Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Image URL</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => navigate('/dashboard')}>
            Cancel
          </button>
          <button type="submit" className="save-button" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProperty; 