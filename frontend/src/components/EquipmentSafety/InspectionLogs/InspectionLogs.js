import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch,
    faFilter,
    faPlus,
    faCheckCircle,
    faExclamationTriangle,
    faTimesCircle,
    faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import './InspectionLogs.css';

const InspectionLogs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);

    const inspectionLogs = [
        {
            id: 1,
            equipment: 'Forklift #1',
            date: '2024-03-15',
            inspector: 'John Smith',
            status: 'passed',
            notes: 'All systems functioning normally',
            attachments: 2,
            nextInspection: '2024-06-15'
        },
        {
            id: 2,
            equipment: 'Crane System',
            date: '2024-03-10',
            inspector: 'Sarah Johnson',
            status: 'failed',
            notes: 'Hydraulic system requires maintenance',
            attachments: 3,
            nextInspection: '2024-04-10'
        }
        // Add more inspection logs as needed
    ];

    const getStatusIcon = (status) => {
        switch(status) {
            case 'passed':
                return <FontAwesomeIcon icon={faCheckCircle} className="status-icon passed" />;
            case 'failed':
                return <FontAwesomeIcon icon={faTimesCircle} className="status-icon failed" />;
            case 'pending':
                return <FontAwesomeIcon icon={faExclamationTriangle} className="status-icon pending" />;
            default:
                return null;
        }
    };

    return (
        <div className="inspection-logs-container">
            <div className="inspection-header">
                <h1>Inspection Logs</h1>
                <button className="add-inspection-btn">
                    <FontAwesomeIcon icon={faPlus} />
                    New Inspection
                </button>
            </div>

            <div className="search-filter-bar">
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />
                    <input
                        type="text"
                        placeholder="Search inspections..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button 
                    className="filter-btn"
                    onClick={() => setFilterOpen(!filterOpen)}
                >
                    <FontAwesomeIcon icon={faFilter} />
                    Filters
                </button>
            </div>

            <div className="inspection-table">
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Equipment</th>
                            <th>Date</th>
                            <th>Inspector</th>
                            <th>Notes</th>
                            <th>Attachments</th>
                            <th>Next Inspection</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inspectionLogs.map((log) => (
                            <tr key={log.id}>
                                <td>{getStatusIcon(log.status)}</td>
                                <td>{log.equipment}</td>
                                <td>{log.date}</td>
                                <td>{log.inspector}</td>
                                <td>{log.notes}</td>
                                <td>
                                    <span className="attachment-count">
                                        <FontAwesomeIcon icon={faFileAlt} />
                                        {log.attachments}
                                    </span>
                                </td>
                                <td>{log.nextInspection}</td>
                                <td>
                                    <button className="view-btn">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InspectionLogs; 