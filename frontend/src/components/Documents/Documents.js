import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MainHeader from '../common/MainHeader/MainHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faTable, faThLarge, faSyncAlt, faFilter, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './Documents.css';

export default function Documents() {
  const { id: propertyId } = useParams();
  const location = useLocation();
  // Use property name/address if present, otherwise fallback
  const propertyName = propertyId ? 'Sample Property' : 'All Properties';
  const propertyAddress = propertyId ? '111 Harley St, London W1G 6AW, UK' : '';
  const lastUpdated = '2024-04-01 14:32';

  // State for filters, view mode, and search
  const [viewMode, setViewMode] = useState('table');
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [zone, setZone] = useState('');

  // Placeholder document data
  const documents = [
    {
      id: 1,
      name: 'Fire Safety Certificate',
      summary: 'Annual fire safety compliance',
      zone: 'Fire Exit Zone',
      type: 'Fire Safety',
      status: 'Active',
      uploadedBy: 'Jane Doe',
      uploadDate: '2024-03-01',
      expiryDate: '2025-03-01',
    },
    // ...more docs
  ];

  const filteredDocs = documents.filter(doc =>
    (!type || doc.type === type) &&
    (!status || doc.status === status) &&
    (!zone || doc.zone === zone) &&
    (!search || doc.name.toLowerCase().includes(search.toLowerCase()))
  );

  // Status pill color
  const statusColor = (status) => {
    if (status === 'Active') return 'status-pill active';
    if (status === 'Expired') return 'status-pill expired';
    if (status === 'Missing') return 'status-pill missing';
    return 'status-pill';
  };

  // Document stats (placeholder)
  const expiringSoon = 1;

  return (
    <div className="property-documents-page">
      <MainHeader />
      <div className="documents-header-bar">
        <div>
          <div className="documents-title-row">
            <FontAwesomeIcon icon={faFileAlt} className="doc-title-icon" />
            <h1>Documents – {propertyName}</h1>
          </div>
          {propertyAddress && <div className="property-address">{propertyAddress}</div>}
          <div className="documents-meta-row">
            <span className="last-updated"><FontAwesomeIcon icon={faSyncAlt} /> Last updated: {lastUpdated}</span>
            <span className="doc-summary">{filteredDocs.length} documents • <span className="expiring-soon">{expiringSoon} expiring soon</span></span>
          </div>
        </div>
        <div className="upload-btn-group">
          <button className="upload-doc-btn">+ Upload Document</button>
          {/* <button className="upload-doc-btn secondary">Bulk Upload</button> */}
        </div>
      </div>

      <div className="documents-filters-bar">
        <select value={propertyId || ''} disabled={!propertyId} title="Property">
          <option>{propertyName}</option>
        </select>
        <select value={type} onChange={e => setType(e.target.value)} title="Document Type">
          <option value="">All Types</option>
          <option value="Fire Safety">Fire Safety</option>
          <option value="Electrical">Electrical</option>
          <option value="Roof Safety">Roof Safety</option>
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} title="Status">
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Missing">Missing</option>
        </select>
        <select value={zone} onChange={e => setZone(e.target.value)} title="Zone/Area">
          <option value="">All Zones</option>
          <option value="Roof Zone">Roof Zone</option>
          <option value="Fire Exit Zone">Fire Exit Zone</option>
        </select>
        <input
          type="text"
          placeholder="Search by document name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          title="Search by document name"
        />
        <button className="clear-filters-btn" onClick={() => { setType(''); setStatus(''); setZone(''); setSearch(''); }} title="Clear Filters">
          <FontAwesomeIcon icon={faTimesCircle} /> Clear
        </button>
        <div className="view-toggle" title="Switch view">
          <button className={viewMode === 'table' ? 'active' : ''} onClick={() => setViewMode('table')} title="Table View">
            <FontAwesomeIcon icon={faTable} />
          </button>
          <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')} title="Grid View">
            <FontAwesomeIcon icon={faThLarge} />
          </button>
        </div>
      </div>

      <div className="documents-main-content">
        {filteredDocs.length === 0 ? (
          <div className="no-documents-state">
            <FontAwesomeIcon icon={faFileAlt} className="no-doc-icon" />
            <div className="no-doc-title">No documents found</div>
            <div className="no-doc-desc">Try adjusting your filters or upload a new document.</div>
          </div>
        ) : viewMode === 'table' ? (
          <table className="documents-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Summary</th>
                <th>Zone</th>
                <th>Type</th>
                <th>Status</th>
                <th>Uploaded By</th>
                <th>Upload Date</th>
                <th>Expiry Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map(doc => (
                <tr key={doc.id}>
                  <td><FontAwesomeIcon icon={faFileAlt} className="doc-table-icon" /> {doc.name}</td>
                  <td>{doc.summary}</td>
                  <td>{doc.zone}</td>
                  <td>{doc.type}</td>
                  <td><span className={statusColor(doc.status)}>{doc.status}</span></td>
                  <td>{doc.uploadedBy}</td>
                  <td>{doc.uploadDate}</td>
                  <td>{doc.expiryDate}</td>
                  <td>
                    <button title="View"><span role="img" aria-label="View">👁️</span></button>
                    <button title="Download"><span role="img" aria-label="Download">⬇️</span></button>
                    <button title="Edit"><span role="img" aria-label="Edit">✏️</span></button>
                    <button title="Delete"><span role="img" aria-label="Delete">🗑️</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="documents-grid">
            {filteredDocs.map(doc => (
              <div key={doc.id} className="document-card">
                <div className="doc-icon"><FontAwesomeIcon icon={faFileAlt} /></div>
                <div className="doc-info">
                  <h3>{doc.name}</h3>
                  <div>{doc.type} – <span className={statusColor(doc.status)}>{doc.status}</span></div>
                  <div>{doc.zone}</div>
                  <div className="doc-actions">
                    <button title="View"><span role="img" aria-label="View">👁️</span></button>
                    <button title="Download"><span role="img" aria-label="Download">⬇️</span></button>
                    <button title="Edit"><span role="img" aria-label="Edit">✏️</span></button>
                    <button title="Delete"><span role="img" aria-label="Delete">🗑️</span></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="documents-footer">
        <span>{filteredDocs.length} documents</span>
        {/* Pagination and upcoming expiries tag can go here */}
      </div>
    </div>
  );
}
