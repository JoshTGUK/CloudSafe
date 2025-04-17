import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch, 
    faFilter, 
    faPlus, 
    faEdit, 
    faTrash, 
    faFileDownload,
    faCheckCircle,
    faExclamationTriangle,
    faCalendarAlt,
    faUser,
    faHardHat
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import './PPEIssuance.css';

const PPEIssuance = ({ propertyId }) => {
    const [ppeRecords, setPPERecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        ppeType: 'all',
        status: 'all',
        dateRange: 'all'
    });
    const [showFilters, setShowFilters] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchPPERecords();
    }, [propertyId]);

    const fetchPPERecords = async () => {
        try {
            // TODO: Replace with actual API call
            const mockData = [
                {
                    id: 1,
                    employee_name: 'John Smith',
                    ppe_type: 'Safety Helmet',
                    issue_date: '2024-01-15',
                    expiry_date: '2025-01-15',
                    status: 'Active',
                    condition: 'Good',
                    size: 'L',
                    notes: 'Regular inspection required'
                },
                {
                    id: 2,
                    employee_name: 'Sarah Johnson',
                    ppe_type: 'Safety Boots',
                    issue_date: '2024-02-01',
                    expiry_date: '2024-08-01',
                    status: 'Due for Replacement',
                    condition: 'Fair',
                    size: '39',
                    notes: 'Showing signs of wear'
                }
            ];
            setPPERecords(mockData);
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

    const handleAddPPE = () => {
        setShowAddModal(true);
    };

    const getStatusBadge = (status) => {
        const classes = {
            'Active': 'active',
            'Due for Replacement': 'due-replacement',
            'Replaced': 'replaced'
        };
        const icons = {
            'Active': faCheckCircle,
            'Due for Replacement': faExclamationTriangle,
            'Replaced': faHardHat
        };
        return (
            <span className={`status-badge ${classes[status]}`}>
                <FontAwesomeIcon icon={icons[status]} /> {status}
            </span>
        );
    };

    if (loading) return <div className="loading">Loading PPE records...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="ppe-issuance">
            <div className="ppe-issuance-header">
                <h2>PPE Issuance Logs</h2>
                <button className="add-button" onClick={handleAddPPE}>
                    <FontAwesomeIcon icon={faPlus} /> Issue PPE
                </button>
            </div>

            <div className="ppe-issuance-filters">
                <div className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by employee name or PPE type..."
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
                        <label>PPE Type:</label>
                        <select name="ppeType" value={filters.ppeType} onChange={handleFilterChange}>
                            <option value="all">All Types</option>
                            <option value="Safety Helmet">Safety Helmet</option>
                            <option value="Safety Boots">Safety Boots</option>
                            <option value="Safety Gloves">Safety Gloves</option>
                            <option value="Safety Goggles">Safety Goggles</option>
                            <option value="High-Vis Vest">High-Vis Vest</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Status:</label>
                        <select name="status" value={filters.status} onChange={handleFilterChange}>
                            <option value="all">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Due for Replacement">Due for Replacement</option>
                            <option value="Replaced">Replaced</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Date Range:</label>
                        <select name="dateRange" value={filters.dateRange} onChange={handleFilterChange}>
                            <option value="all">All Time</option>
                            <option value="last30">Last 30 Days</option>
                            <option value="last90">Last 90 Days</option>
                            <option value="last180">Last 180 Days</option>
                        </select>
                    </div>
                </div>
            )}

            <div className="ppe-issuance-table-container">
                <table className="ppe-issuance-table">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>PPE Type</th>
                            <th>Issue Date</th>
                            <th>Expiry Date</th>
                            <th>Status</th>
                            <th>Condition</th>
                            <th>Size</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ppeRecords.map(record => (
                            <tr key={record.id}>
                                <td>{record.employee_name}</td>
                                <td>{record.ppe_type}</td>
                                <td>{new Date(record.issue_date).toLocaleDateString()}</td>
                                <td>{new Date(record.expiry_date).toLocaleDateString()}</td>
                                <td>{getStatusBadge(record.status)}</td>
                                <td>{record.condition}</td>
                                <td>{record.size}</td>
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

export default PPEIssuance; 