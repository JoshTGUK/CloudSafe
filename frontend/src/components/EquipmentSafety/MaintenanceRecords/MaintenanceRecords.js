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
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import './MaintenanceRecords.css';

const MaintenanceRecords = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);

    const maintenanceRecords = [
        {
            id: 1,
            equipment: 'Forklift #1',
            type: 'Scheduled Maintenance',
            date: '2024-03-20',
            technician: 'Mike Wilson',
            status: 'completed',
            description: 'Regular maintenance check and oil change',
            cost: '$350',
            nextService: '2024-06-20'
        },
        {
            id: 2,
            equipment: 'Crane System',
            type: 'Repair',
            date: '2024-03-18',
            technician: 'Robert Brown',
            status: 'in-progress',
            description: 'Hydraulic system repair and testing',
            cost: '$800',
            nextService: '2024-04-18'
        }
        // Add more maintenance records as needed
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

    return (
        <div className="maintenance-records-container">
            <div className="maintenance-header">
                <div className="header-content">
                    <h1>Maintenance Records</h1>
                    <p>Track equipment maintenance and servicing history</p>
                </div>
                <button className="add-maintenance-btn">
                    <FontAwesomeIcon icon={faPlus} />
                    New Maintenance Record
                </button>
            </div>

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
                {maintenanceRecords.map((record) => (
                    <div key={record.id} className="maintenance-card">
                        <div className="card-header">
                            <div className="equipment-info">
                                <FontAwesomeIcon icon={faWrench} />
                                <h3>{record.equipment}</h3>
                            </div>
                            {getStatusIcon(record.status)}
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
                            <p className="description">{record.description}</p>
                            <div className="card-footer">
                                <span className="cost">{record.cost}</span>
                                <button className="details-btn">View Details</button>
                            </div>
                        </div>
                        <div className="next-service">
                            <span>Next Service: {record.nextService}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MaintenanceRecords; 