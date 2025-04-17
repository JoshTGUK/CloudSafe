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
import './TrainingRecords.css';

const TrainingRecords = ({ propertyId }) => {
    const [trainings, setTrainings] = useState([]);
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
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [newTraining, setNewTraining] = useState({
        staff_name: '',
        training_type: '',
        provider: '',
        completion_date: '',
        expiry_date: '',
        status: 'completed',
        notes: '',
        certificate_file: null
    });

    useEffect(() => {
        fetchTrainingRecords();
    }, [propertyId]);

    const fetchTrainingRecords = async () => {
        try {
            // TODO: Replace with actual API call
            // Simulated data for now
            const mockData = [
                {
                    id: 1,
                    staff_name: 'John Smith',
                    training_type: 'Fire Safety',
                    provider: 'Safety First Ltd',
                    completion_date: '2023-01-15',
                    expiry_date: '2024-01-15',
                    status: 'completed',
                    notes: 'Passed with distinction',
                    certificate_file: 'fire_safety_cert.pdf'
                },
                {
                    id: 2,
                    staff_name: 'Sarah Johnson',
                    training_type: 'Manual Handling',
                    provider: 'Health & Safety Training',
                    completion_date: '2023-03-20',
                    expiry_date: '2024-03-20',
                    status: 'completed',
                    notes: 'Standard pass',
                    certificate_file: 'manual_handling_cert.pdf'
                },
                {
                    id: 3,
                    staff_name: 'Michael Brown',
                    training_type: 'First Aid',
                    provider: 'Red Cross',
                    completion_date: '2023-06-10',
                    expiry_date: '2024-06-10',
                    status: 'completed',
                    notes: 'Advanced first aid certification',
                    certificate_file: 'first_aid_cert.pdf'
                },
                {
                    id: 4,
                    staff_name: 'Emily Davis',
                    training_type: 'Working at Heights',
                    provider: 'Height Safety Training',
                    completion_date: '2023-09-05',
                    expiry_date: '2024-09-05',
                    status: 'completed',
                    notes: 'Includes harness training',
                    certificate_file: 'heights_cert.pdf'
                },
                {
                    id: 5,
                    staff_name: 'David Wilson',
                    training_type: 'Asbestos Awareness',
                    provider: 'Environmental Safety Ltd',
                    completion_date: '2023-11-15',
                    expiry_date: '2024-11-15',
                    status: 'completed',
                    notes: 'Online course completion',
                    certificate_file: 'asbestos_cert.pdf'
                },
                {
                    id: 6,
                    staff_name: 'Lisa Anderson',
                    training_type: 'Fire Safety',
                    provider: 'Safety First Ltd',
                    completion_date: '2023-12-01',
                    expiry_date: '2024-12-01',
                    status: 'completed',
                    notes: 'Refresher course',
                    certificate_file: 'fire_safety_refresh.pdf'
                },
                {
                    id: 7,
                    staff_name: 'Robert Taylor',
                    training_type: 'Manual Handling',
                    provider: 'Health & Safety Training',
                    completion_date: '2024-01-10',
                    expiry_date: '2025-01-10',
                    status: 'completed',
                    notes: 'Includes practical assessment',
                    certificate_file: 'manual_handling_cert.pdf'
                },
                {
                    id: 8,
                    staff_name: 'Jennifer White',
                    training_type: 'First Aid',
                    provider: 'Red Cross',
                    completion_date: '2024-02-15',
                    expiry_date: '2025-02-15',
                    status: 'in_progress',
                    notes: 'Course in progress',
                    certificate_file: null
                }
            ];
            
            setTrainings(mockData);
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

    const handleAddTraining = () => {
        setSelectedTraining(null);
        setNewTraining({
            staff_name: '',
            training_type: '',
            provider: '',
            completion_date: '',
            expiry_date: '',
            status: 'completed',
            notes: '',
            certificate_file: null
        });
        setShowAddModal(true);
    };

    const handleEditTraining = (training) => {
        setSelectedTraining(training);
        setNewTraining({
            staff_name: training.staff_name,
            training_type: training.training_type,
            provider: training.provider,
            completion_date: training.completion_date,
            expiry_date: training.expiry_date,
            status: training.status,
            notes: training.notes,
            certificate_file: null
        });
        setShowEditModal(true);
    };

    const handleDeleteTraining = async (id) => {
        if (window.confirm('Are you sure you want to delete this training record?')) {
            try {
                // TODO: Replace with actual API call
                // Simulated API call
                setTrainings(prev => prev.filter(training => training.id !== id));
                toast.success('Training record deleted successfully');
            } catch (err) {
                toast.error('Failed to delete training record');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTraining(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setNewTraining(prev => ({
            ...prev,
            certificate_file: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // TODO: Replace with actual API call
            // Simulated API call
            if (selectedTraining) {
                // Update existing training
                setTrainings(prev => prev.map(training => 
                    training.id === selectedTraining.id 
                        ? { ...training, ...newTraining } 
                        : training
                ));
                toast.success('Training record updated successfully');
            } else {
                // Add new training
                const newId = Math.max(...trainings.map(t => t.id)) + 1;
                const newTrainingRecord = {
                    id: newId,
                    ...newTraining
                };
                setTrainings(prev => [...prev, newTrainingRecord]);
                toast.success('Training record added successfully');
            }
            
            setShowAddModal(false);
            setShowEditModal(false);
        } catch (err) {
            toast.error(selectedTraining ? 'Failed to update training record' : 'Failed to add training record');
        }
    };

    const filteredTrainings = trainings.filter(training => {
        // Apply search filter
        const matchesSearch = 
            training.staff_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            training.training_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            training.provider.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Apply status filter
        const matchesStatus = filters.status === 'all' || training.status === filters.status;
        
        // Apply type filter
        const matchesType = filters.type === 'all' || training.training_type === filters.type;
        
        // Apply date range filter
        let matchesDateRange = true;
        if (filters.dateRange !== 'all') {
            const today = new Date();
            const expiryDate = new Date(training.expiry_date);
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

    if (loading) return <div className="loading">Loading training records...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="training-records">
            <div className="training-records-header">
                <h2>Training Records</h2>
                <button className="add-button" onClick={handleAddTraining}>
                    <FontAwesomeIcon icon={faPlus} /> Add Training Record
                </button>
            </div>

            <div className="training-records-filters">
                <div className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by staff name, training type, or provider..."
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
                        <label>Training Type:</label>
                        <select name="type" value={filters.type} onChange={handleFilterChange}>
                            <option value="all">All Types</option>
                            <option value="Fire Safety">Fire Safety</option>
                            <option value="Manual Handling">Manual Handling</option>
                            <option value="First Aid">First Aid</option>
                            <option value="Working at Heights">Working at Heights</option>
                            <option value="Asbestos Awareness">Asbestos Awareness</option>
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

            <div className="training-records-table-container">
                <table className="training-records-table">
                    <thead>
                        <tr>
                            <th>Staff Name</th>
                            <th>Training Type</th>
                            <th>Provider</th>
                            <th>Completion Date</th>
                            <th>Expiry Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTrainings.length > 0 ? (
                            filteredTrainings.map(training => (
                                <tr key={training.id}>
                                    <td>{training.staff_name}</td>
                                    <td>{training.training_type}</td>
                                    <td>{training.provider}</td>
                                    <td>{new Date(training.completion_date).toLocaleDateString()}</td>
                                    <td>{new Date(training.expiry_date).toLocaleDateString()}</td>
                                    <td>{getStatusBadge(training.status)}</td>
                                    <td className="actions">
                                        <button 
                                            className="action-button edit" 
                                            onClick={() => handleEditTraining(training)}
                                            title="Edit"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button 
                                            className="action-button delete" 
                                            onClick={() => handleDeleteTraining(training.id)}
                                            title="Delete"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        {training.certificate_file && (
                                            <button 
                                                className="action-button download" 
                                                onClick={() => window.open(`/api/trainings/${training.id}/certificate`, '_blank')}
                                                title="Download Certificate"
                                            >
                                                <FontAwesomeIcon icon={faFileDownload} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="no-records">No training records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Training Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Add Training Record</h3>
                            <button className="close-button" onClick={() => setShowAddModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Staff Name:</label>
                                <input
                                    type="text"
                                    name="staff_name"
                                    value={newTraining.staff_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Training Type:</label>
                                <select
                                    name="training_type"
                                    value={newTraining.training_type}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Training Type</option>
                                    <option value="Fire Safety">Fire Safety</option>
                                    <option value="Manual Handling">Manual Handling</option>
                                    <option value="First Aid">First Aid</option>
                                    <option value="Working at Heights">Working at Heights</option>
                                    <option value="Asbestos Awareness">Asbestos Awareness</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Provider:</label>
                                <input
                                    type="text"
                                    name="provider"
                                    value={newTraining.provider}
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
                                        value={newTraining.completion_date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date:</label>
                                    <input
                                        type="date"
                                        name="expiry_date"
                                        value={newTraining.expiry_date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Status:</label>
                                <select
                                    name="status"
                                    value={newTraining.status}
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
                                    value={newTraining.notes}
                                    onChange={handleInputChange}
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Certificate File:</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-button" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="submit" className="submit-button">Add Training Record</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Training Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Edit Training Record</h3>
                            <button className="close-button" onClick={() => setShowEditModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Staff Name:</label>
                                <input
                                    type="text"
                                    name="staff_name"
                                    value={newTraining.staff_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Training Type:</label>
                                <select
                                    name="training_type"
                                    value={newTraining.training_type}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Training Type</option>
                                    <option value="Fire Safety">Fire Safety</option>
                                    <option value="Manual Handling">Manual Handling</option>
                                    <option value="First Aid">First Aid</option>
                                    <option value="Working at Heights">Working at Heights</option>
                                    <option value="Asbestos Awareness">Asbestos Awareness</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Provider:</label>
                                <input
                                    type="text"
                                    name="provider"
                                    value={newTraining.provider}
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
                                        value={newTraining.completion_date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date:</label>
                                    <input
                                        type="date"
                                        name="expiry_date"
                                        value={newTraining.expiry_date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Status:</label>
                                <select
                                    name="status"
                                    value={newTraining.status}
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
                                    value={newTraining.notes}
                                    onChange={handleInputChange}
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Certificate File:</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                                {selectedTraining.certificate_file && (
                                    <div className="current-file">
                                        Current file: {selectedTraining.certificate_file}
                                    </div>
                                )}
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-button" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="submit-button">Update Training Record</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainingRecords; 