import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import allSafeLogo from '../../../assets/cloudsafe-logo.png';
import './ResetPassword.css';

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    validateResetToken();
  }, [token]);

  const validateResetToken = async () => {
    // Comment out the API call for testing
    /*try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/validate-reset-token/${token}`);
      if (response.ok) {
        setIsTokenValid(true);
      } else {
        toast.error('Invalid or expired reset link');
        navigate('/login');
      }
    } catch (error) {
      console.error('Token validation error:', error);
      toast.error('Failed to validate reset link');
      navigate('/login');
    }*/
    
    // Always set token as valid for testing
    setIsTokenValid(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (passwords.password !== passwords.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwords.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: passwords.password
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to reset password');
      }

      toast.success('Password has been reset successfully');
      navigate('/login');
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isTokenValid) {
    return <div>Validating reset link...</div>;
  }

  return (
    <div className="main-container">
      <header className="header">
        <img src={allSafeLogo} alt="ALL Safe Logo" className="logo" />
        <div className="header-right">
          <span className="back-to-login">Remember your password?</span>
          <Link to="/login" className="login-link-btn">Back to login</Link>
        </div>
      </header>

      <div className="reset-password-content">
        <div className="depth-frame">
          <h1 className="reset-password-title">Create New Password</h1>
          <p className="reset-password-subtitle">
            Please enter your new password below.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">New Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  className="input-field"
                  placeholder="Enter new password"
                  value={passwords.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(prev => ({
                    ...prev,
                    password: !prev.password
                  }))}
                >
                  {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Confirm New Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="input-field"
                  placeholder="Confirm new password"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(prev => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword
                  }))}
                >
                  {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="password-requirements">
              <p>Password must:</p>
              <ul>
                <li>Be at least 8 characters long</li>
                <li>Include at least one uppercase letter</li>
                <li>Include at least one number</li>
                <li>Include at least one special character</li>
              </ul>
            </div>

            <button 
              type="submit" 
              className="reset-button"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 