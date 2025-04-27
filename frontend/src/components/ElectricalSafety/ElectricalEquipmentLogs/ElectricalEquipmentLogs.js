import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faToolbox,
    faCheckCircle,
    faExclamationTriangle,
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import './ElectricalEquipmentLogs.css';

const ElectricalEquipmentLogs = () => {
    const [showAddLog, setShowAddLog] = useState(false);
    const [logs, setLogs] = useState([
        {
            id: 1,
            date: '2024-03-20',
            equipmentId: 'EE-001',
            equipmentName: 'Main Generator',
            category: 'Power Generation',
            location: 'Plant Room A',
            manufacturer: 'PowerGen Ltd',
            model: 'PG-2000',
            serialNumber: 'PG2024-001',
            maintenanceType: 'Scheduled',
            condition: 'Good',
            workPerformed: 'Full service and oil change',
            findings: 'No issues found',
            nextMaintenanceDue: '2024-06-20',
            technician: 'John Smith'
        },
        {
            id: 2,
            date: '2024-03-15',
            equipmentId: 'EE-002',
            equipmentName: 'Distribution Panel',
            category: 'Power Distribution',
            location: 'Main Switch Room',
            manufacturer: 'ElectroPro',
            model: 'DP-500',
            serialNumber: 'EP2023-445',
            maintenanceType: 'Emergency',
            condition: 'Fair',
            workPerformed: 'Thermal imaging and connection check',
            findings: 'Loose connection on circuit 3 fixed',
            nextMaintenanceDue: '2024-04-15',
            technician: 'Sarah Wilson'
        }
    ]);

    const [newLog, setNewLog] = useState({
        date: '',
        equipmentId: '',
        equipmentName: '',
        category: '',
        location: '',
        manufacturer: '',
        model: '',
        serialNumber: '',
        maintenanceType: 'Scheduled',
        condition: 'Good',
        workPerformed: '',
        findings: '',
        nextMaintenanceDue: '',
        technician: ''
    });

    const handleAddLog = (e) => {
        e.preventDefault();
        const log = {
            id: logs.length + 1,
            ...newLog
        };
        setLogs([...logs, log]);
        setShowAddLog(false);
        setNewLog({
            date: '',
            equipmentId: '',
            equipmentName: '',
            category: '',
            location: '',
            manufacturer: '',
            model: '',
            serialNumber: '',
            maintenanceType: 'Scheduled',
            condition: 'Good',
            workPerformed: '',
            findings: '',
            nextMaintenanceDue: '',
            technician: ''
        });
    };

    return (
        <div className="equipment-logs">
            <div className="page-header">
                <div className="header-content">
                    <h1>Electrical Equipment Logs</h1>
                    <p>Track and manage electrical equipment maintenance records</p>
                </div>
                <button className="add-log-btn" onClick={() => setShowAddLog(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add New Log
                </button>
            </div>

            <div className="overview-section">
                <div className="overview-card">
                    <FontAwesomeIcon icon={faToolbox} className="card-icon" />
                    <div className="card-content">
                        <h3>Total Equipment</h3>
                        <p className="card-value">{logs.length}</p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faCheckCircle} className="card-icon success" />
                    <div className="card-content">
                        <h3>Good Condition</h3>
                        <p className="card-value">
                            {logs.filter(log => log.condition === 'Good').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="card-icon warning" />
                    <div className="card-content">
                        <h3>Needs Attention</h3>
                        <p className="card-value">
                            {logs.filter(log => log.condition === 'Fair' || log.condition === 'Poor').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faCalendarAlt} className="card-icon primary" />
                    <div className="card-content">
                        <h3>Maintenance Due</h3>
                        <p className="card-value">
                            {logs.filter(log => new Date(log.nextMaintenanceDue) <= new Date()).length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="logs-table-container">
                <table className="logs-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Equipment ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Maintenance Type</th>
                            <th>Condition</th>
                            <th>Technician</th>
                            <th>Next Due</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => (
                            <tr key={log.id}>
                                <td>{log.date}</td>
                                <td>{log.equipmentId}</td>
                                <td>{log.equipmentName}</td>
                                <td>{log.category}</td>
                                <td>{log.location}</td>
                                <td>{log.maintenanceType}</td>
                                <td>
                                    <span className={`status-badge ${log.condition.toLowerCase()}`}>
                                        {log.condition}
                                    </span>
                                </td>
                                <td>{log.technician}</td>
                                <td>{log.nextMaintenanceDue}</td>
                                <td>
                                    <button className="view-btn">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddLog && (
                <div className="modal-overlay">
                    <div className="add-log-modal">
                        <h2>Add New Equipment Log</h2>
                        <form onSubmit={handleAddLog}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        value={newLog.date}
                                        onChange={(e) => setNewLog({...newLog, date: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Equipment ID</label>
                                    <input
                                        type="text"
                                        value={newLog.equipmentId}
                                        onChange={(e) => setNewLog({...newLog, equipmentId: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Equipment Name</label>
                                    <input
                                        type="text"
                                        value={newLog.equipmentName}
                                        onChange={(e) => setNewLog({...newLog, equipmentName: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        value={newLog.category}
                                        onChange={(e) => setNewLog({...newLog, category: e.target.value})}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Power Generation">Power Generation</option>
                                        <option value="Power Distribution">Power Distribution</option>
                                        <option value="Lighting">Lighting</option>
                                        <option value="HVAC">HVAC</option>
                                        <option value="Safety Systems">Safety Systems</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        value={newLog.location}
                                        onChange={(e) => setNewLog({...newLog, location: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Manufacturer</label>
                                    <input
                                        type="text"
                                        value={newLog.manufacturer}
                                        onChange={(e) => setNewLog({...newLog, manufacturer: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Model</label>
                                    <input
                                        type="text"
                                        value={newLog.model}
                                        onChange={(e) => setNewLog({...newLog, model: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Serial Number</label>
                                    <input
                                        type="text"
                                        value={newLog.serialNumber}
                                        onChange={(e) => setNewLog({...newLog, serialNumber: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Maintenance Type</label>
                                    <select
                                        value={newLog.maintenanceType}
                                        onChange={(e) => setNewLog({...newLog, maintenanceType: e.target.value})}
                                    >
                                        <option value="Scheduled">Scheduled</option>
                                        <option value="Emergency">Emergency</option>
                                        <option value="Preventive">Preventive</option>
                                        <option value="Corrective">Corrective</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Condition</label>
                                    <select
                                        value={newLog.condition}
                                        onChange={(e) => setNewLog({...newLog, condition: e.target.value})}
                                    >
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group full-width">
                                <label>Work Performed</label>
                                <textarea
                                    value={newLog.workPerformed}
                                    onChange={(e) => setNewLog({...newLog, workPerformed: e.target.value})}
                                    placeholder="Describe the maintenance work performed..."
                                    required
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Findings</label>
                                <textarea
                                    value={newLog.findings}
                                    onChange={(e) => setNewLog({...newLog, findings: e.target.value})}
                                    placeholder="Document any issues or findings..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Next Maintenance Due</label>
                                <input
                                    type="date"
                                    value={newLog.nextMaintenanceDue}
                                    onChange={(e) => setNewLog({...newLog, nextMaintenanceDue: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Technician</label>
                                <input
                                    type="text"
                                    value={newLog.technician}
                                    onChange={(e) => setNewLog({...newLog, technician: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowAddLog(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Add Log
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ElectricalEquipmentLogs; 