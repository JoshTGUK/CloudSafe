import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import './Register.css';
import allSafeLogo from '../../assets/ALL-Safe-logo.png';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: 'viewer',
    companyName: '',
    acceptedTerms: false
  });

  const [errors, setErrors] = useState({});
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();

  // Move validateField outside of useCallback
  const validateField = (fieldName, value) => {
    let newErrors = { ...errors };

    switch (fieldName) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])/.test(value)) {
          newErrors.password = 'Password must contain at least one lowercase letter';
        } else if (!/(?=.*[A-Z])/.test(value)) {
          newErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/(?=.*\d)/.test(value)) {
          newErrors.password = 'Password must contain at least one number';
        } else if (!/(?=.*[!@#$%^&*])/.test(value)) {
          newErrors.password = 'Password must contain at least one special character';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case 'phoneNumber':
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(value)) {
          newErrors.phoneNumber = 'Please enter a valid phone number';
        } else {
          delete newErrors.phoneNumber;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Remove the useEffect that was causing the infinite loop
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Validate the field when it changes
    validateField(name, fieldValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (!captchaValue) {
            toast.error('Please complete the reCAPTCHA verification');
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                role: formData.role,
                captchaToken: captchaValue
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        toast.success('Registration successful!');
        navigate('/login');
    } catch (error) {
        console.error('Registration error:', error);
        toast.error(error.message || 'Failed to register');
    }
  };

  const handleCaptchaChange = (value) => {
    console.log('reCAPTCHA value:', value ? 'received' : 'not received');
    setCaptchaValue(value);
  };

  return (
    <div className='main-container'>
      <header className='header'>
        <img src={allSafeLogo} alt="ALL Safe Logo" className='logo' />
        <div className='header-right'>
          <span className='new-to-all-safe'>Already have an account?</span>
          <Link to="/login" className='create-account-link'>Sign In</Link>
        </div>
      </header>
      <div className='login-content'>
        <div className='depth-frame'>
          <h1 className='log-in'>Create an Account</h1>
          <p className='welcome-back'>
            Join All Safe and start managing your properties safely.
          </p>
          <form onSubmit={handleSubmit}>
            <div className='input-group'>
              <label className='input-label'>First Name</label>
              <input 
                type="text" 
                className={`input-field ${errors.firstName ? 'error' : ''}`}
                placeholder="First Name" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            <div className='input-group'>
              <label className='input-label'>Last Name</label>
              <input 
                type="text" 
                className='input-field' 
                placeholder="Last Name" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className='input-group'>
              <label className='input-label'>Email address</label>
              <input 
                type="email" 
                className='input-field' 
                placeholder="Email address" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="username"
              />
            </div>
            <div className='input-group'>
              <label className='input-label'>Phone Number</label>
              <input 
                type="tel" 
                className='input-field' 
                placeholder="Phone Number" 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className='input-group'>
              <label className='input-label'>Password</label>
              <input 
                type="password" 
                className='input-field' 
                placeholder="Password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
            <div className='input-group'>
              <label className='input-label'>Confirm Password</label>
              <input 
                type="password" 
                className='input-field' 
                placeholder="Confirm Password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="input-group">
              <label className='input-label'>Role</label>
              <select 
                name="role" 
                value={formData.role}
                onChange={handleChange}
                className={`input-field ${errors.role ? 'error' : ''}`}
              >
                <option value="viewer">Viewer</option>
                <option value="staff">Staff</option>
                <option value="contractor">Contractor</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <span className="error-text">{errors.role}</span>}
            </div>
            <div className='recaptcha-container'>
              <ReCAPTCHA
                sitekey="6LdrrrwqAAAAAP2Cu2n797N1vSH-flazlOiukshN"
                onChange={handleCaptchaChange}
              />
            </div>
            <button type="submit" className='sign-in-button'>Create Account</button>
          </form>
          <p className='terms-agreement'>
            By creating an account, you agree to our <Link to="/terms-of-service">Terms of Service</Link> and <Link to="/privacy-policy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
