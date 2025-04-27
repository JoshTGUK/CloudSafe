import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainHeader from '../common/MainHeader/MainHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faCalendarAlt, faList, faPlus, faSearch, faCheckCircle, faTimesCircle, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Inspections.css';

export default function Inspections() {
  const { id: propertyId } = useParams();
  const propertyName = propertyId ? 'Sample Property' : 'All Properties';
  const propertyAddress = propertyId ? '111 Harley St, London W1G 6AW, UK' : '';

  // State for filters, view mode, and search
  const [viewMode, setViewMode] = useState('list');
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [dateRange, setDateRange] = useState('');

  // Placeholder inspection data
  const inspections = [
    {
      id: 1,
      name: 'Annual Fire Safety',
      type: 'Fire Safety',
      zone: 'Fire Exit Zone',
      scheduledDate: '2024-04-10',
      status: 'Scheduled',
      inspector: 'Jane Doe',
    },
    {
      id: 2,
      name: 'Quarterly Electrical',
      type: 'Electrical',
      zone: 'Main Panel',
      scheduledDate: '2024-03-15',
      status: 'Completed',
      inspector: 'John Smith',
    },
    // ...more
  ];

  const filteredInspections = inspections.filter(i =>
    (!type || i.type === type) &&
    (!status || i.status === status) &&
    (!search || i.name.toLowerCase().includes(search.toLowerCase()))
    // Date range filter can be added here
  );

  // Status badge color
  const statusBadge = (status) => {
    if (status === 'Completed') return 'status-badge completed';
    if (status === 'Scheduled') return 'status-badge scheduled';
    if (status === 'Missed') return 'status-badge missed';
    if (status === 'In Progress') return 'status-badge progress';
    return 'status-badge';
  };

  return (
    <div className="inspections-page">
      <MainHeader />
      <div className="inspections-header-bar">
        <div>
          <div className="inspections-title-row">
            <FontAwesomeIcon icon={faClipboardList} className="inspections-title-icon" />
            <h1>Inspections – {propertyName}</h1>
          </div>
          {propertyAddress && <div className="property-address">{propertyAddress}</div>}
          <div className="inspections-subtitle">Track and manage your property inspections.</div>
        </div>
        <button className="new-inspection-btn">
          <FontAwesomeIcon icon={faPlus} /> New Inspection
        </button>
      </div>

      <div className="inspections-filters-bar">
        <select value={propertyId || ''} disabled={!propertyId} title="Property">
          <option>{propertyName}</option>
        </select>
        <select value={type} onChange={e => setType(e.target.value)} title="Inspection Type">
          <option value="">All Types</option>
          <option value="Fire Safety">Fire Safety</option>
          <option value="Electrical">Electrical</option>
          <option value="Roof Safety">Roof Safety</option>
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} title="Status">
          <option value="">All Statuses</option>
          <option value="Scheduled">Scheduled</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Missed">Missed</option>
        </select>
        <input
          type="text"
          placeholder="Date Range (e.g. 2024-04-01 to 2024-04-30)"
          value={dateRange}
          onChange={e => setDateRange(e.target.value)}
          title="Date Range"
        />
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search inspections..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            title="Search by keyword"
          />
        </div>
        <div className="view-toggle" title="Switch view">
          <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')} title="List View">
            <FontAwesomeIcon icon={faList} />
          </button>
          <button className={viewMode === 'calendar' ? 'active' : ''} onClick={() => setViewMode('calendar')} title="Calendar View">
            <FontAwesomeIcon icon={faCalendarAlt} />
          </button>
        </div>
      </div>

      <div className="inspections-main-content">
        {viewMode === 'calendar' ? (
          <div className="calendar-placeholder">Calendar View Coming Soon</div>
        ) : filteredInspections.length === 0 ? (
          <div className="no-inspections-state">
            <FontAwesomeIcon icon={faClipboardList} className="no-inspections-icon" />
            <div className="no-inspections-title">No inspections found</div>
            <div className="no-inspections-desc">Try adjusting your filters or schedule a new inspection.</div>
          </div>
        ) : (
          <table className="inspections-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Zone/Area</th>
                <th>Scheduled Date</th>
                <th>Status</th>
                <th>Inspector</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInspections.map(i => (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>{i.type}</td>
                  <td>{i.zone}</td>
                  <td>{i.scheduledDate}</td>
                  <td><span className={statusBadge(i.status)}>{i.status}</span></td>
                  <td>{i.inspector}</td>
                  <td>
                    <button title="View Details"><FontAwesomeIcon icon={faEye} /></button>
                    <button title="Edit Inspection"><FontAwesomeIcon icon={faEdit} /></button>
                    <button title="Mark as Complete"><FontAwesomeIcon icon={faCheckCircle} /></button>
                    <button title="Delete"><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="inspections-footer">
        <span>Displaying 1–{filteredInspections.length} of {inspections.length} Inspections</span>
        {/* Pagination controls can go here */}
      </div>
    </div>
  );
} 