import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch, 
    faFilter, 
    faPlus, 
    faEdit, 
    faTrash, 
    faFileDownload,
    faCheck,
    faTimes,
    faClock
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import './Inductions.css';

const Inductions = ({ propertyId }) => {
    const [inductions, setInductions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        status: 'all',
        type: 'all',
        dateRange: 'all'
    });
    const [showFilters, setShowFilters] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedInduction, setSelectedInduction] = useState(null);
    const [newInduction, setNewInduction] = useState({
        staff_name: '',
        induction_type: '',
        conducted_by: '',
        completion_date: '',
        expiry_date: '',
        status: 'completed',
        notes: '',
        document_file: null
    });

    useEffect(() => {
        fetchInductionRecords();
    }, [propertyId]);

    const fetchInductionRecords = async () => {
        try {
            // TODO: Replace with actual API call
            // Simulated data for now
            const mockData = [
                {
                    id: 1,
                    staff_name: 'John Smith',
                    induction_type: 'Site Safety',
                    conducted_by: 'Safety Officer',
                    completion_date: '2023-01-10',
                    expiry_date: '2024-01-10',
                    status: 'completed',
                    notes: 'Standard site safety induction',
                    document_file: 'site_safety_induction.pdf'
                },
                {
                    id: 2,
                    staff_name: 'Sarah Johnson',
                    induction_type: 'Contractor',
                    conducted_by: 'Site Manager',
                    completion_date: '2023-02-15',
                    expiry_date: '2024-02-15',
                    status: 'completed',
                    notes: 'Contractor safety protocols',
                    document_file: 'contractor_induction.pdf'
                },
                {
                    id: 3,
                    staff_name: 'Michael Brown',
                    induction_type: 'Equipment',
                    conducted_by: 'Equipment Specialist',
                    completion_date: '2023-03-20',
                    expiry_date: '2024-03-20',
                    status: 'completed',
                    notes: 'Heavy machinery operation',
                    document_file: 'equipment_induction.pdf'
                },
                {
                    id: 4,
                    staff_name: 'Emily Davis',
                    induction_type: 'Site Safety',
                    conducted_by: 'Safety Officer',
                    completion_date: '2023-04-05',
                    expiry_date: '2024-04-05',
                    status: 'completed',
                    notes: 'Refresher induction',
                    document_file: 'site_safety_refresh.pdf'
                },
                {
                    id: 5,
                    staff_name: 'David Wilson',
                    induction_type: 'Contractor',
                    conducted_by: 'Site Manager',
                    completion_date: '2023-05-10',
                    expiry_date: '2024-05-10',
                    status: 'completed',
                    notes: 'New contractor protocols',
                    document_file: 'contractor_induction.pdf'
                },
                {
                    id: 6,
                    staff_name: 'Lisa Anderson',
                    induction_type: 'Equipment',
                    conducted_by: 'Equipment Specialist',
                    completion_date: '2023-06-15',
                    expiry_date: '2024-06-15',
                    status: 'completed',
                    notes: 'New equipment training',
                    document_file: 'equipment_induction.pdf'
                },
                {
                    id: 7,
                    staff_name: 'Robert Taylor',
                    induction_type: 'Site Safety',
                    conducted_by: 'Safety Officer',
                    completion_date: '2023-07-20',
                    expiry_date: '2024-07-20',
                    status: 'completed',
                    notes: 'Annual refresher',
                    document_file: 'site_safety_annual.pdf'
                },
                {
                    id: 8,
                    staff_name: 'Jennifer White',
                    induction_type: 'Contractor',
                    conducted_by: 'Site Manager',
                    completion_date: '2023-08-25',
                    expiry_date: '2024-08-25',
                    status: 'in_progress',
                    notes: 'Induction in progress',
                    document_file: null
                }
            ];
            
            setInductions(mockData);
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

    const handleAddInduction = () => {
        setSelectedInduction(null);
        setNewInduction({
            staff_name: '',
            induction_type: '',
            conducted_by: '',
            completion_date: '',
            expiry_date: '',
            status: 'completed',
            notes: '',
            document_file: null
        });
        setShowAddModal(true);
    };

    const handleEditInduction = (induction) => {
        setSelectedInduction(induction);
        setNewInduction({
            staff_name: induction.staff_name,
            induction_type: induction.induction_type,
            conducted_by: induction.conducted_by,
            completion_date: induction.completion_date,
            expiry_date: induction.expiry_date,
            status: induction.status,
            notes: induction.notes,
            document_file: null
        });
        setShowEditModal(true);
    };

    const handleDeleteInduction = async (id) => {
        if (window.confirm('Are you sure you want to delete this induction record?')) {
            try {
                // TODO: Replace with actual API call
                // Simulated API call
                setInductions(prev => prev.filter(induction => induction.id !== id));
                toast.success('Induction record deleted successfully');
            } catch (err) {
                toast.error('Failed to delete induction record');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewInduction(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setNewInduction(prev => ({
            ...prev,
            document_file: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // TODO: Replace with actual API call
            // Simulated API call
            if (selectedInduction) {
                // Update existing induction
                setInductions(prev => prev.map(induction => 
                    induction.id === selectedInduction.id 
                        ? { ...induction, ...newInduction } 
                        : induction
                ));
                toast.success('Induction record updated successfully');
            } else {
                // Add new induction
                const newId = Math.max(...inductions.map(i => i.id)) + 1;
                const newInductionRecord = {
                    id: newId,
                    ...newInduction
                };
                setInductions(prev => [...prev, newInductionRecord]);
                toast.success('Induction record added successfully');
            }
            
            setShowAddModal(false);
            setShowEditModal(false);
        } catch (err) {
            toast.error(selectedInduction ? 'Failed to update induction record' : 'Failed to add induction record');
        }
    };

    const filteredInductions = inductions.filter(induction => {
        // Apply search filter
        const matchesSearch = 
            induction.staff_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            induction.induction_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            induction.conducted_by.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Apply status filter
        const matchesStatus = filters.status === 'all' || induction.status === filters.status;
        
        // Apply type filter
        const matchesType = filters.type === 'all' || induction.induction_type === filters.type;
        
        // Apply date range filter
        let matchesDateRange = true;
        if (filters.dateRange !== 'all') {
            const today = new Date();
            const expiryDate = new Date(induction.expiry_date);
            const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            
            if (filters.dateRange === 'expiring_soon' && daysUntilExpiry > 30) {
                matchesDateRange = false;
            } else if (filters.dateRange === 'expired' && daysUntilExpiry > 0) {
                matchesDateRange = false;
            }
        }
        
        return matchesSearch && matchesStatus && matchesType && matchesDateRange;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return <span className="status-badge completed"><FontAwesomeIcon icon={faCheck} /> Completed</span>;
            case 'in_progress':
                return <span className="status-badge in-progress"><FontAwesomeIcon icon={faClock} /> In Progress</span>;
            case 'expired':
                return <span className="status-badge expired"><FontAwesomeIcon icon={faTimes} /> Expired</span>;
            default:
                return <span className="status-badge">{status}</span>;
        }
    };

    if (loading) return <div className="loading">Loading induction records...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="inductions">
            <div className="inductions-header">
                <h2>Inductions</h2>
                <button className="add-button" onClick={handleAddInduction}>
                    <FontAwesomeIcon icon={faPlus} /> Add Induction Record
                </button>
            </div>

            <div className="inductions-filters">
                <div className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by staff name, induction type, or conductor..."
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
                            <option value="completed">Completed</option>
                            <option value="in_progress">In Progress</option>
                            <option value="expired">Expired</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Induction Type:</label>
                        <select name="type" value={filters.type} onChange={handleFilterChange}>
                            <option value="all">All Types</option>
                            <option value="Site Safety">Site Safety</option>
                            <option value="Contractor">Contractor</option>
                            <option value="Equipment">Equipment</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Date Range:</label>
                        <select name="dateRange" value={filters.dateRange} onChange={handleFilterChange}>
                            <option value="all">All Dates</option>
                            <option value="expiring_soon">Expiring Soon (30 days)</option>
                            <option value="expired">Expired</option>
                        </select>
                    </div>
                </div>
            )}

            <div className="inductions-table-container">
                <table className="inductions-table">
                    <thead>
                        <tr>
                            <th>Staff Name</th>
                            <th>Induction Type</th>
                            <th>Conducted By</th>
                            <th>Completion Date</th>
                            <th>Expiry Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInductions.length > 0 ? (
                            filteredInductions.map(induction => (
                                <tr key={induction.id}>
                                    <td>{induction.staff_name}</td>
                                    <td>{induction.induction_type}</td>
                                    <td>{induction.conducted_by}</td>
                                    <td>{new Date(induction.completion_date).toLocaleDateString()}</td>
                                    <td>{new Date(induction.expiry_date).toLocaleDateString()}</td>
                                    <td>{getStatusBadge(induction.status)}</td>
                                    <td className="actions">
                                        <button 
                                            className="action-button edit" 
                                            onClick={() => handleEditInduction(induction)}
                                            title="Edit"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button 
                                            className="action-button delete" 
                                            onClick={() => handleDeleteInduction(induction.id)}
                                            title="Delete"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        {induction.document_file && (
                                            <button 
                                                className="action-button download" 
                                                onClick={() => window.open(`/api/inductions/${induction.id}/document`, '_blank')}
                                                title="Download Document"
                                            >
                                                <FontAwesomeIcon icon={faFileDownload} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="no-records">No induction records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Induction Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Add Induction Record</h3>
                            <button className="close-button" onClick={() => setShowAddModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Staff Name:</label>
                                <input
                                    type="text"
                                    name="staff_name"
                                    value={newInduction.staff_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Induction Type:</label>
                                <select
                                    name="induction_type"
                                    value={newInduction.induction_type}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Induction Type</option>
                                    <option value="Site Safety">Site Safety</option>
                                    <option value="Contractor">Contractor</option>
                                    <option value="Equipment">Equipment</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Conducted By:</label>
                                <input
                                    type="text"
                                    name="conducted_by"
                                    value={newInduction.conducted_by}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Completion Date:</label>
                                    <input
                                        type="date"
                                        name="completion_date"
                                        value={newInduction.completion_date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date:</label>
                                    <input
                                        type="date"
                                        name="expiry_date"
                                        value={newInduction.expiry_date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Status:</label>
                                <select
                                    name="status"
                                    value={newInduction.status}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="completed">Completed</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="expired">Expired</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Notes:</label>
                                <textarea
                                    name="notes"
                                    value={newInduction.notes}
                                    onChange={handleInputChange}
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Document File:</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-button" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="submit" className="submit-button">Add Induction Record</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Induction Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Edit Induction Record</h3>
                            <button className="close-button" onClick={() => setShowEditModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Staff Name:</label>
                                <input
                                    type="text"
                                    name="staff_name"
                                    value={newInduction.staff_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Induction Type:</label>
                                <select
                                    name="induction_type"
                                    value={newInduction.induction_type}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Induction Type</option>
                                    <option value="Site Safety">Site Safety</option>
                                    <option value="Contractor">Contractor</option>
                                    <option value="Equipment">Equipment</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Conducted By:</label>
                                <input
                                    type="text"
                                    name="conducted_by"
                                    value={newInduction.conducted_by}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Completion Date:</label>
                                    <input
                                        type="date"
                                        name="completion_date"
                                        value={newInduction.completion_date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date:</label>
                                    <input
                                        type="date"
                                        name="expiry_date"
                                        value={newInduction.expiry_date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Status:</label>
                                <select
                                    name="status"
                                    value={newInduction.status}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="completed">Completed</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="expired">Expired</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Notes:</label>
                                <textarea
                                    name="notes"
                                    value={newInduction.notes}
                                    onChange={handleInputChange}
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Document File:</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                                {selectedInduction.document_file && (
                                    <div className="current-file">
                                        Current file: {selectedInduction.document_file}
                                    </div>
                                )}
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-button" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="submit-button">Update Induction Record</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inductions; 