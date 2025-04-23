import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch,
    faFilter,
    faPlus,
    faExclamationTriangle,
    faWrench,
    faUserCog,
    faCalendarAlt,
    faClock,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import './DefectReporting.css';

const DefectReporting = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);

    const defectReports = [
        {
            id: 1,
            equipment: 'Forklift #1',
            reportedBy: 'James Wilson',
            date: '2024-03-22',
            priority: 'high',
            status: 'pending',
            description: 'Unusual noise from hydraulic system during lifting',
            assignedTo: 'Mike Brown',
            photos: 2
        },
        {
            id: 2,
            equipment: 'Crane System',
            reportedBy: 'Sarah Johnson',
            date: '2024-03-21',
            priority: 'medium',
            status: 'in-progress',
            description: 'Control panel showing intermittent errors',
            assignedTo: 'Robert Smith',
            photos: 1
        }
    ];

    const getPriorityClass = (priority) => {
        switch(priority) {
            case 'high': return 'priority-high';
            case 'medium': return 'priority-medium';
            case 'low': return 'priority-low';
            default: return '';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'pending':
                return <FontAwesomeIcon icon={faClock} className="status-icon pending" />;
            case 'in-progress':
                return <FontAwesomeIcon icon={faWrench} className="status-icon in-progress" />;
            case 'completed':
                return <FontAwesomeIcon icon={faCheckCircle} className="status-icon completed" />;
            default:
                return null;
        }
    };

    return (
        <div className="defect-reporting-container">
            <div className="defect-header">
                <div className="header-content">
                    <h1>Equipment Defect Reports</h1>
                    <p>Report and track equipment defects and repairs</p>
                </div>
                <button className="report-defect-btn">
                    <FontAwesomeIcon icon={faPlus} />
                    Report Defect
                </button>
            </div>

            <div className="search-filter-bar">
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />
                    <input
                        type="text"
                        placeholder="Search defect reports..."
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

            <div className="defect-reports-grid">
                {defectReports.map((report) => (
                    <div key={report.id} className="defect-card">
                        <div className="card-header">
                            <div className="equipment-info">
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                <h3>{report.equipment}</h3>
                            </div>
                            <span className={`priority-badge ${getPriorityClass(report.priority)}`}>
                                {report.priority}
                            </span>
                        </div>
                        <div className="card-content">
                            <div className="info-row">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                <span>{report.date}</span>
                            </div>
                            <div className="info-row">
                                <FontAwesomeIcon icon={faUserCog} />
                                <span>Reported by: {report.reportedBy}</span>
                            </div>
                            <p className="description">{report.description}</p>
                            <div className="assignment-info">
                                <span>Assigned to: {report.assignedTo}</span>
                                {getStatusIcon(report.status)}
                            </div>
                            <div className="card-footer">
                                <button className="photos-btn">
                                    Photos ({report.photos})
                                </button>
                                <button className="update-btn">
                                    Update Status
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DefectReporting; 