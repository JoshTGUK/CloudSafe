import React, { useState } from 'react';
import MainHeader from '../../common/MainHeader/MainHeader';
import { FaPlus, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import './GeneralMaintenance.css';

const GeneralMaintenance = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Annual Building Inspection',
      description: 'Complete annual building safety and maintenance inspection',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-04-15',
      assignedTo: 'John Smith'
    },
    {
      id: 2,
      title: 'Lobby Renovation',
      description: 'Paint and repair lobby walls, replace floor tiles',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-05-01',
      assignedTo: 'Sarah Johnson'
    },
    // Add more sample tasks as needed
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignedTo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: 'pending'
    };
    setTasks([...tasks, task]);
    setShowForm(false);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      assignedTo: ''
    });
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="maintenance-page">
      <MainHeader />
      <div className="maintenance-content">
        <div className="general-maintenance-header">
          <h1>General Maintenance</h1>
          <button 
            className="add-task-btn"
            onClick={() => setShowForm(true)}
          >
            <FaPlus /> Add New Task
          </button>
        </div>

        {showForm && (
          <div className="task-form-container">
            <form onSubmit={handleSubmit} className="task-form">
              <h2>New Maintenance Task</h2>
              
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Assigned To</label>
                <input
                  type="text"
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">Create Task</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="tasks-container">
          {tasks.map(task => (
            <div key={task.id} className={`task-card priority-${task.priority}`}>
              <div className="task-header">
                <h3>{task.title}</h3>
                <div className="task-actions">
                  <button onClick={() => handleStatusChange(task.id, 'completed')} title="Mark as Complete">
                    <FaCheck />
                  </button>
                  <button onClick={() => handleDelete(task.id)} title="Delete Task">
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <p className="task-description">{task.description}</p>
              
              <div className="task-details">
                <span className={`status-badge status-${task.status}`}>
                  {task.status}
                </span>
                <span className={`priority-badge priority-${task.priority}`}>
                  {task.priority}
                </span>
                <span className="due-date">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
                <span className="assigned-to">
                  Assigned to: {task.assignedTo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneralMaintenance; 