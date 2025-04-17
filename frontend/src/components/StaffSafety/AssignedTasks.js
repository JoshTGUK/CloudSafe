import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch, 
    faFilter, 
    faPlus, 
    faEdit, 
    faTrash, 
    faCheck,
    faClock,
    faExclamationTriangle,
    faUser,
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import './AssignedTasks.css';

const AssignedTasks = ({ propertyId }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        priority: 'all',
        status: 'all',
        assignee: 'all'
    });
    const [showFilters, setShowFilters] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, [propertyId]);

    const fetchTasks = async () => {
        try {
            // TODO: Replace with actual API call
            const mockData = [
                {
                    id: 1,
                    title: 'Safety Equipment Inspection',
                    description: 'Conduct monthly inspection of all safety equipment',
                    assignee: 'John Smith',
                    due_date: '2024-04-30',
                    priority: 'High',
                    status: 'In Progress',
                    category: 'Equipment'
                },
                {
                    id: 2,
                    title: 'Update Emergency Procedures',
                    description: 'Review and update emergency evacuation procedures',
                    assignee: 'Sarah Johnson',
                    due_date: '2024-05-15',
                    priority: 'Medium',
                    status: 'Pending',
                    category: 'Documentation'
                }
            ];
            setTasks(mockData);
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

    const handleAddTask = () => {
        setShowAddModal(true);
    };

    const getPriorityBadge = (priority) => {
        const classes = {
            Low: 'low',
            Medium: 'medium',
            High: 'high'
        };
        return <span className={`priority-badge ${classes[priority]}`}>{priority}</span>;
    };

    const getStatusBadge = (status) => {
        const icons = {
            'Completed': faCheck,
            'In Progress': faClock,
            'Pending': faExclamationTriangle
        };
        return (
            <span className={`status-badge ${status.toLowerCase().replace(' ', '-')}`}>
                <FontAwesomeIcon icon={icons[status] || faExclamationTriangle} /> {status}
            </span>
        );
    };

    if (loading) return <div className="loading">Loading tasks...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="assigned-tasks">
            <div className="assigned-tasks-header">
                <h2>Assigned Safety Tasks</h2>
                <button className="add-button" onClick={handleAddTask}>
                    <FontAwesomeIcon icon={faPlus} /> Assign New Task
                </button>
            </div>

            <div className="assigned-tasks-filters">
                <div className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
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
                        <label>Priority:</label>
                        <select name="priority" value={filters.priority} onChange={handleFilterChange}>
                            <option value="all">All Priorities</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Status:</label>
                        <select name="status" value={filters.status} onChange={handleFilterChange}>
                            <option value="all">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Assignee:</label>
                        <select name="assignee" value={filters.assignee} onChange={handleFilterChange}>
                            <option value="all">All Assignees</option>
                            <option value="John Smith">John Smith</option>
                            <option value="Sarah Johnson">Sarah Johnson</option>
                        </select>
                    </div>
                </div>
            )}

            <div className="tasks-grid">
                {tasks.map(task => (
                    <div key={task.id} className="task-card">
                        <div className="task-card-header">
                            <h3>{task.title}</h3>
                            {getPriorityBadge(task.priority)}
                        </div>
                        <p className="task-description">{task.description}</p>
                        <div className="task-meta">
                            <div className="task-meta-item">
                                <FontAwesomeIcon icon={faUser} />
                                <span>{task.assignee}</span>
                            </div>
                            <div className="task-meta-item">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="task-footer">
                            {getStatusBadge(task.status)}
                            <div className="task-actions">
                                <button className="action-button edit">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button className="action-button delete">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssignedTasks; 