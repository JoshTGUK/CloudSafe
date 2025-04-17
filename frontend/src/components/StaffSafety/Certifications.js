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
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import './Certifications.css';

const Certifications = ({ propertyId }) => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        status: 'all',
        type: 'all',
        expiryRange: 'all'
    });
    const [showFilters, setShowFilters] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchCertifications();
    }, [propertyId]);

    const fetchCertifications = async () => {
        try {
            // TODO: Replace with actual API call
            const mockData = [
                {
                    id: 1,
                    employee_name: 'John Smith',
                    certification_type: 'First Aid',
                    issue_date: '2023-09-15',
                    expiry_date: '2024-09-15',
                    status: 'Valid',
                    issuing_authority: 'Red Cross',
                    certificate_number: 'FA-2023-001',
                    notes: 'Regular renewal required'
                },
                {
                    id: 2,
                    employee_name: 'Sarah Johnson',
                    certification_type: 'Working at Heights',
                    issue_date: '2023-06-01',
                    expiry_date: '2024-06-01',
                    status: 'Expiring Soon',
                    issuing_authority: 'SafeWork',
                    certificate_number: 'WAH-2023-045',
                    notes: 'Renewal notification sent'
                }
            ];
            setCertifications(mockData);
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

    const handleAddCertification = () => {
        setShowAddModal(true);
    };

    const getStatusBadge = (status) => {
        const classes = {
            'Valid': 'valid',
            'Expiring Soon': 'expiring',
            'Expired': 'expired'
        };
        const icons = {
            'Valid': faCheckCircle,
            'Expiring Soon': faExclamationTriangle,
            'Expired': faExclamationTriangle
        };
        return (
            <span className={`status-badge ${classes[status]}`}>
                <FontAwesomeIcon icon={icons[status]} /> {status}
            </span>
        );
    };

    if (loading) return <div className="loading">Loading certifications...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="certifications">
            <div className="certifications-header">
                <h2>Staff Certifications</h2>
                <button className="add-button" onClick={handleAddCertification}>
                    <FontAwesomeIcon icon={faPlus} /> Add Certification
                </button>
            </div>

            <div className="certifications-filters">
                <div className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by employee name or certification type..."
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
                        <label>Status:</label>
                        <select name="status" value={filters.status} onChange={handleFilterChange}>
                            <option value="all">All Statuses</option>
                            <option value="Valid">Valid</option>
                            <option value="Expiring Soon">Expiring Soon</option>
                            <option value="Expired">Expired</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Type:</label>
                        <select name="type" value={filters.type} onChange={handleFilterChange}>
                            <option value="all">All Types</option>
                            <option value="First Aid">First Aid</option>
                            <option value="Working at Heights">Working at Heights</option>
                            <option value="Fire Safety">Fire Safety</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Expiry Range:</label>
                        <select name="expiryRange" value={filters.expiryRange} onChange={handleFilterChange}>
                            <option value="all">All</option>
                            <option value="30days">Next 30 Days</option>
                            <option value="60days">Next 60 Days</option>
                            <option value="90days">Next 90 Days</option>
                        </select>
                    </div>
                </div>
            )}

            <div className="certifications-table-container">
                <table className="certifications-table">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Certification Type</th>
                            <th>Issue Date</th>
                            <th>Expiry Date</th>
                            <th>Status</th>
                            <th>Certificate Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {certifications.map(cert => (
                            <tr key={cert.id}>
                                <td>{cert.employee_name}</td>
                                <td>{cert.certification_type}</td>
                                <td>{new Date(cert.issue_date).toLocaleDateString()}</td>
                                <td>{new Date(cert.expiry_date).toLocaleDateString()}</td>
                                <td>{getStatusBadge(cert.status)}</td>
                                <td>{cert.certificate_number}</td>
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

export default Certifications; 