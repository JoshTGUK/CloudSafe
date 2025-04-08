import React, { useState } from 'react';
import MainHeader from '../common/MainHeader/MainHeader';
import './Documents.css';

export default function Documents() {
  // eslint-disable-next-line no-unused-vars
  const [documents, setDocuments] = useState([]);

  return (
    <div className="main-container">
      <MainHeader />
      <div className="documents-container">
        <h1>Documents</h1>
        <div className="documents-content">
          {/* Documents content will go here */}
        </div>
      </div>
    </div>
  );
}
