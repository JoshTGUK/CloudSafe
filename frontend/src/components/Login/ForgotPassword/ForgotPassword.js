import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEnvelope } from 'react-icons/fa';
import allSafeLogo from '../../../assets/ALL-Safe-logo.png';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send reset email');
      }

      setResetSent(true);
      toast.success('Password reset instructions have been sent to your email');
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <img src={allSafeLogo} alt="ALL Safe Logo" className="logo" />
        <div className="header-right">
          <span className="back-to-login">Remember your password?</span>
          <Link to="/login" className="login-link-btn">Back to login</Link>
        </div>
      </header>

      <div className="forgot-password-content">
        <div className="depth-frame">
          <h1 className="forgot-password-title">Reset Password</h1>
          <p className="forgot-password-subtitle">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          {!resetSent ? (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    className="input-field"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="reset-button"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </form>
          ) : (
            <div className="success-message">
              <p>Check your email</p>
              <p className="success-details">
                We've sent password reset instructions to your email address. 
                Please check your inbox and follow the instructions to reset your password.
              </p>
              <Link to="/login" className="back-to-login-btn">
                Return to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 