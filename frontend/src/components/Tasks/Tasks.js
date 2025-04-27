import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faPlus, faSearch, faCheckCircle, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import MainHeader from '../common/MainHeader/MainHeader';
import './Tasks.css';

export default function Tasks() {
  const { id: propertyId } = useParams();
  const propertyName = propertyId ? 'Sample Property' : 'All Properties';
  const propertyAddress = propertyId ? '111 Harley St, London W1G 6AW, UK' : '';

  // State for filters, view mode, and search
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [assigned, setAssigned] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [overdueOnly, setOverdueOnly] = useState(false);

  // Placeholder staff list
  const staffList = ['Jane Doe', 'John Smith', 'Alex Lee'];

  // Placeholder task data
  const tasks = [
    {
      id: 1,
      name: 'Check Fire Extinguishers',
      assignedTo: 'Jane Doe',
      priority: 'High',
      status: 'Pending',
      dueDate: '2024-04-10',
    },
    {
      id: 2,
      name: 'Update Safety Manual',
      assignedTo: 'John Smith',
      priority: 'Medium',
      status: 'In Progress',
      dueDate: '2024-04-15',
    },
    {
      id: 3,
      name: 'Roof Inspection',
      assignedTo: 'Alex Lee',
      priority: 'Low',
      status: 'Completed',
      dueDate: '2024-03-30',
    },
    // ...more
  ];

  const filteredTasks = tasks.filter(t =>
    (!priority || t.priority === priority) &&
    (!status || t.status === status) &&
    (!assigned || t.assignedTo === assigned) &&
    (!search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description?.toLowerCase().includes(search.toLowerCase())) &&
    (!overdueOnly || t.status === 'Overdue')
    // Due date filter can be added here
  );

  // Priority badge color
  const priorityBadge = (priority) => {
    if (priority === 'High') return 'priority-badge high';
    if (priority === 'Medium') return 'priority-badge medium';
    if (priority === 'Low') return 'priority-badge low';
    return 'priority-badge';
  };
  // Status badge color
  const statusBadge = (status) => {
    if (status === 'Completed') return 'status-badge completed';
    if (status === 'In Progress') return 'status-badge progress';
    if (status === 'Overdue') return 'status-badge overdue';
    if (status === 'Pending') return 'status-badge pending';
    return 'status-badge';
  };

  return (
    <div className="tasks-page">
      <MainHeader />
      <div className="tasks-header-bar">
        <div>
          <div className="tasks-title-row">
            <FontAwesomeIcon icon={faTasks} className="tasks-title-icon" />
            <h1>Tasks – {propertyName}</h1>
          </div>
          {propertyAddress && <div className="property-address">{propertyAddress}</div>}
          <div className="tasks-subtitle">Assign, track, and manage property-related safety tasks.</div>
        </div>
        <button className="add-task-btn">
          <FontAwesomeIcon icon={faPlus} /> Add Task
        </button>
      </div>

      <div className="tasks-filters-bar">
        <select value={propertyId || ''} disabled={!propertyId} title="Property">
          <option>{propertyName}</option>
        </select>
        <select value={priority} onChange={e => setPriority(e.target.value)} title="Priority">
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} title="Status">
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
        </select>
        <select value={assigned} onChange={e => setAssigned(e.target.value)} title="Assigned Staff">
          <option value="">All Staff</option>
          {staffList.map(staff => <option key={staff} value={staff}>{staff}</option>)}
        </select>
        <input
          type="text"
          placeholder="Due Date (e.g. 2024-04-01 to 2024-04-30)"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          title="Due Date Range"
        />
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            title="Search by title or description"
          />
        </div>
        <button className={overdueOnly ? 'overdue-toggle active' : 'overdue-toggle'} onClick={() => setOverdueOnly(v => !v)} title="View Overdue Only">
          Overdue Only
        </button>
      </div>

      <div className="tasks-main-content">
        {filteredTasks.length === 0 ? (
          <div className="no-tasks-state">
            <FontAwesomeIcon icon={faTasks} className="no-tasks-icon" />
            <div className="no-tasks-title">No tasks found</div>
            <div className="no-tasks-desc">Try adjusting your filters or add a new task.</div>
          </div>
        ) : (
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(t => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.assignedTo}</td>
                  <td><span className={priorityBadge(t.priority)}>{t.priority}</span></td>
                  <td><span className={statusBadge(t.status)}>{t.status}</span></td>
                  <td>{t.dueDate}</td>
                  <td>
                    <button title="View Details"><FontAwesomeIcon icon={faEye} /></button>
                    <button title="Edit Task"><FontAwesomeIcon icon={faEdit} /></button>
                    <button title="Mark as Complete"><FontAwesomeIcon icon={faCheckCircle} /></button>
                    <button title="Delete Task"><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="tasks-footer">
        <span>Showing {filteredTasks.length} of {tasks.length} Tasks</span>
        {/* Pagination controls can go here */}
      </div>
    </div>
  );
} 