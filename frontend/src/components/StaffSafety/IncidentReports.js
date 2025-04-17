import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch, 
    faFilter, 
    faPlus, 
    faEdit, 
    faTrash, 
    faFileDownload,
    faExclamationTriangle,
    faCheckCircle,
    faHourglass
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import './IncidentReports.css';

const IncidentReports = ({ propertyId }) => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        severity: 'all',
        status: 'all',
        dateRange: 'all'
    });
    const [showFilters, setShowFilters] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchIncidents();
    }, [propertyId]);

    const fetchIncidents = async () => {
        try {
            // TODO: Replace with actual API call
            const mockData = [
                {
                    id: 1,
                    date: '2024-04-15',
                    reporter: 'John Smith',
                    type: 'Near Miss',
                    severity: 'Low',
                    location: 'Loading Bay',
                    description: 'Slippery surface identified',
                    status: 'Resolved',
                    actions_taken: 'Area cleaned and warning signs placed'
                },
                {
                    id: 2,
                    date: '2024-04-14',
                    reporter: 'Sarah Johnson',
                    type: 'Injury',
                    severity: 'Medium',
                    location: 'Warehouse',
                    description: 'Minor cut while handling equipment',
                    status: 'Under Investigation',
                    actions_taken: 'First aid provided, investigating preventive measures'
                }
            ];
            setIncidents(mockData);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleAddIncident = () => {
        setShowAddModal(true);
    };

    const getSeverityBadge = (severity) => {
        const classes = {
            Low: 'low',
            Medium: 'medium',
            High: 'high'
        };
        return <span className={`severity-badge ${classes[severity]}`}>{severity}</span>;
    };

    const getStatusBadge = (status) => {
        const icons = {
            'Resolved': faCheckCircle,
            'Under Investigation': faHourglass,
            'Open': faExclamationTriangle
        };
        return (
            <span className={`status-badge ${status.toLowerCase().replace(' ', '-')}`}>
                <FontAwesomeIcon icon={icons[status] || faExclamationTriangle} /> {status}
            </span>
        );
    };

    if (loading) return <div className="loading">Loading incident reports...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="incident-reports">
            <div className="incident-reports-header">
                <h2>Incident Reports</h2>
                <button className="add-button" onClick={handleAddIncident}>
                    <FontAwesomeIcon icon={faPlus} /> Report Incident
                </button>
            </div>

            <div className="incident-reports-filters">
                <div className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by reporter, type, or location..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
                <button className="filter-button" onClick={toggleFilters}>
                    <FontAwesomeIcon icon={faFilter} /> Filters
                </button>
            </div>

            {showFilters && (
                <div className="filters-panel">
                    <div className="filter-group">
                        <label>Severity:</label>
                        <select name="severity" value={filters.severity} onChange={handleFilterChange}>
                            <option value="all">All Severities</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Status:</label>
                        <select name="status" value={filters.status} onChange={handleFilterChange}>
                            <option value="all">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="Under Investigation">Under Investigation</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Date Range:</label>
                        <select name="dateRange" value={filters.dateRange} onChange={handleFilterChange}>
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                    </div>
                </div>
            )}

            <div className="incident-reports-table-container">
                <table className="incident-reports-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Reporter</th>
                            <th>Type</th>
                            <th>Severity</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidents.map(incident => (
                            <tr key={incident.id}>
                                <td>{new Date(incident.date).toLocaleDateString()}</td>
                                <td>{incident.reporter}</td>
                                <td>{incident.type}</td>
                                <td>{getSeverityBadge(incident.severity)}</td>
                                <td>{incident.location}</td>
                                <td>{getStatusBadge(incident.status)}</td>
                                <td className="actions">
                                    <button className="action-button edit">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="action-button delete">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <button className="action-button download">
                                        <FontAwesomeIcon icon={faFileDownload} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IncidentReports; 