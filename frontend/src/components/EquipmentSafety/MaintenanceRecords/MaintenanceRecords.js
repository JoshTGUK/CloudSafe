import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch,
    faFilter,
    faPlus,
    faWrench,
    faCalendarAlt,
    faUserCog,
    faCheckCircle,
    faSpinner,
    faBell,
    faFileUpload,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import './MaintenanceRecords.css';

const MaintenanceRecords = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const maintenanceRecords = [
        {
            id: 1,
            equipment: 'Forklift #1',
            type: 'Scheduled Maintenance',
            date: '2024-03-20',
            dueDate: '2024-03-25',
            technician: 'Mike Wilson',
            status: 'completed',
            description: 'Regular maintenance check and oil change',
            cost: '$350',
            nextService: '2024-06-20',
            reports: ['inspection_report.pdf'],
            priority: 'medium',
            isOverdue: false
        },
        {
            id: 2,
            equipment: 'Crane System',
            type: 'Repair',
            date: '2024-03-18',
            dueDate: '2024-03-20',
            technician: 'Robert Brown',
            status: 'in-progress',
            description: 'Hydraulic system repair and testing',
            cost: '$800',
            nextService: '2024-04-18',
            reports: [],
            priority: 'high',
            isOverdue: true
        }
        // Add more maintenance records as needed
    ];

    const notifications = [
        {
            id: 1,
            type: 'overdue',
            message: 'Crane System maintenance is overdue',
            date: '2024-03-20'
        },
        {
            id: 2,
            type: 'upcoming',
            message: 'Forklift #1 maintenance due in 5 days',
            date: '2024-03-25'
        }
    ];

    const getStatusIcon = (status) => {
        switch(status) {
            case 'completed':
                return <FontAwesomeIcon icon={faCheckCircle} className="status-icon completed" />;
            case 'in-progress':
                return <FontAwesomeIcon icon={faSpinner} className="status-icon in-progress" spin />;
            default:
                return null;
        }
    };

    const handleFileUpload = (recordId, event) => {
        const file = event.target.files[0];
        // Handle file upload logic here
        console.log(`Uploading file for record ${recordId}:`, file);
    };

    const assignTask = (record, technician) => {
        // Handle task assignment logic here
        console.log(`Assigning task ${record.id} to ${technician}`);
        setShowAssignModal(false);
    };

    const renderMaintenanceCard = (record) => (
        <div key={record.id} className="maintenance-card">
            <div className="card-header">
                <div className="equipment-info">
                    <FontAwesomeIcon icon={faWrench} />
                    <h3>{record.equipment}</h3>
                </div>
                <div className="status-container">
                    {record.isOverdue && (
                        <FontAwesomeIcon 
                            icon={faExclamationTriangle} 
                            className="overdue-icon" 
                            title="Overdue"
                        />
                    )}
                    {getStatusIcon(record.status)}
                </div>
            </div>
            <div className="card-content">
                <div className="info-row">
                    <span className="label">Type:</span>
                    <span>{record.type}</span>
                </div>
                <div className="info-row">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>{record.date}</span>
                </div>
                <div className="info-row">
                    <FontAwesomeIcon icon={faUserCog} />
                    <span>{record.technician}</span>
                </div>
                <div className="info-row">
                    <span className="label">Due Date:</span>
                    <span className={record.isOverdue ? 'overdue' : ''}>
                        {record.dueDate}
                    </span>
                </div>
                <div className="info-row">
                    <span className="label">Priority:</span>
                    <span className={`priority-tag ${record.priority}`}>
                        {record.priority}
                    </span>
                </div>
                <p className="description">{record.description}</p>
                
                <div className="reports-section">
                    <h4>Reports</h4>
                    {record.reports.map(report => (
                        <div key={report} className="report-item">
                            <span>{report}</span>
                            <button className="download-btn">Download</button>
                        </div>
                    ))}
                    <div className="upload-container">
                        <label className="upload-btn">
                            <FontAwesomeIcon icon={faFileUpload} />
                            Upload Report
                            <input
                                type="file"
                                hidden
                                onChange={(e) => handleFileUpload(record.id, e)}
                            />
                        </label>
                    </div>
                </div>

                <div className="card-footer">
                    <span className="cost">{record.cost}</span>
                    <div className="button-group">
                        <button 
                            className="assign-btn"
                            onClick={() => {
                                setSelectedRecord(record);
                                setShowAssignModal(true);
                            }}
                        >
                            Assign
                        </button>
                        <button className="details-btn">View Details</button>
                    </div>
                </div>
            </div>
            <div className="next-service">
                <span>Next Service: {record.nextService}</span>
            </div>
        </div>
    );

    return (
        <div className="maintenance-records-container">
            <div className="maintenance-header">
                <div className="header-content">
                    <h1>Maintenance Records</h1>
                    <p>Track equipment maintenance and servicing history</p>
                </div>
                <div className="header-actions">
                    <button 
                        className="notifications-btn"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <FontAwesomeIcon icon={faBell} />
                        {notifications.length > 0 && (
                            <span className="notification-badge">
                                {notifications.length}
                            </span>
                        )}
                    </button>
                    <button className="add-maintenance-btn">
                        <FontAwesomeIcon icon={faPlus} />
                        New Maintenance Record
                    </button>
                </div>
            </div>

            {showNotifications && (
                <div className="notifications-panel">
                    <h3>Notifications</h3>
                    {notifications.map(notification => (
                        <div 
                            key={notification.id} 
                            className={`notification-item ${notification.type}`}
                        >
                            <FontAwesomeIcon 
                                icon={notification.type === 'overdue' ? 
                                    faExclamationTriangle : faBell} 
                            />
                            <span>{notification.message}</span>
                            <span className="notification-date">
                                {notification.date}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            <div className="search-filter-bar">
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />
                    <input
                        type="text"
                        placeholder="Search maintenance records..."
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

            <div className="maintenance-grid">
                {maintenanceRecords.map(record => renderMaintenanceCard(record))}
            </div>

            {showAssignModal && selectedRecord && (
                <div className="assign-modal">
                    {/* Add assignment modal content here */}
                </div>
            )}
        </div>
    );
};

export default MaintenanceRecords; 