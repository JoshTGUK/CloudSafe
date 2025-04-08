import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = ({ error }) => {
  return (
    <div className="error-page">
      <h1>Oops! Something went wrong</h1>
      <p>{error?.message || 'An unexpected error occurred'}</p>
      <Link to="/" className="back-link">Return to Home</Link>
    </div>
  );
};

export default ErrorPage; 