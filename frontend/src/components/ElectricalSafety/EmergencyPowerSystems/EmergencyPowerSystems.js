import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faPowerOff,
    faCheckCircle,
    faExclamationTriangle,
    faCalendarAlt,
    faBatteryFull,
    faGasPump
} from '@fortawesome/free-solid-svg-icons';
import './EmergencyPowerSystems.css';

const EmergencyPowerSystems = () => {
    const [showAddTest, setShowAddTest] = useState(false);
    const [systems, setSystems] = useState([
        {
            id: 1,
            date: '2024-03-20',
            systemId: 'EPS-001',
            systemName: 'Main Backup Generator',
            location: 'Plant Room A',
            type: 'Diesel Generator',
            capacity: '500 kVA',
            fuelLevel: '95%',
            batteryHealth: 'Good',
            transferSwitchTest: 'Pass',
            loadTest: 'Pass',
            startupTime: '12 seconds',
            runTime: '4 hours',
            oilPressure: 'Normal',
            coolantTemp: 'Normal',
            maintenanceStatus: 'Up to Date',
            nextServiceDue: '2024-09-20',
            notes: 'All parameters within normal range',
            technician: 'John Smith'
        },
        {
            id: 2,
            date: '2024-03-15',
            systemId: 'EPS-002',
            systemName: 'UPS System',
            location: 'Server Room',
            type: 'Battery UPS',
            capacity: '60 kVA',
            batteryHealth: 'Fair',
            transferSwitchTest: 'Pass',
            loadTest: 'Pass',
            runTime: '30 minutes',
            maintenanceStatus: 'Service Required',
            nextServiceDue: '2024-04-15',
            notes: 'Battery replacement recommended within 3 months',
            technician: 'Sarah Wilson'
        }
    ]);

    const [newSystem, setNewSystem] = useState({
        date: '',
        systemId: '',
        systemName: '',
        location: '',
        type: '',
        capacity: '',
        fuelLevel: '',
        batteryHealth: 'Good',
        transferSwitchTest: 'Pass',
        loadTest: 'Pass',
        startupTime: '',
        runTime: '',
        oilPressure: '',
        coolantTemp: '',
        maintenanceStatus: 'Up to Date',
        nextServiceDue: '',
        notes: '',
        technician: ''
    });

    const handleAddSystem = (e) => {
        e.preventDefault();
        const system = {
            id: systems.length + 1,
            ...newSystem
        };
        setSystems([...systems, system]);
        setShowAddTest(false);
        setNewSystem({
            date: '',
            systemId: '',
            systemName: '',
            location: '',
            type: '',
            capacity: '',
            fuelLevel: '',
            batteryHealth: 'Good',
            transferSwitchTest: 'Pass',
            loadTest: 'Pass',
            startupTime: '',
            runTime: '',
            oilPressure: '',
            coolantTemp: '',
            maintenanceStatus: 'Up to Date',
            nextServiceDue: '',
            notes: '',
            technician: ''
        });
    };

    return (
        <div className="emergency-power">
            <div className="page-header">
                <div className="header-content">
                    <h1>Emergency Power Systems</h1>
                    <p>Monitor and maintain backup power systems</p>
                </div>
                <button className="add-test-btn" onClick={() => setShowAddTest(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add New System Check
                </button>
            </div>

            <div className="overview-section">
                <div className="overview-card">
                    <FontAwesomeIcon icon={faPowerOff} className="card-icon" />
                    <div className="card-content">
                        <h3>Total Systems</h3>
                        <p className="card-value">{systems.length}</p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faCheckCircle} className="card-icon success" />
                    <div className="card-content">
                        <h3>Systems Ready</h3>
                        <p className="card-value">
                            {systems.filter(sys => sys.maintenanceStatus === 'Up to Date').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="card-icon warning" />
                    <div className="card-content">
                        <h3>Needs Service</h3>
                        <p className="card-value">
                            {systems.filter(sys => sys.maintenanceStatus === 'Service Required').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faCalendarAlt} className="card-icon primary" />
                    <div className="card-content">
                        <h3>Due for Service</h3>
                        <p className="card-value">
                            {systems.filter(sys => new Date(sys.nextServiceDue) <= new Date()).length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="status-indicators">
                <div className="status-card">
                    <FontAwesomeIcon icon={faGasPump} className="status-icon" />
                    <div className="status-content">
                        <h3>Generator Fuel Levels</h3>
                        <div className="fuel-levels">
                            {systems
                                .filter(sys => sys.type.includes('Generator'))
                                .map(sys => (
                                    <div key={sys.id} className="fuel-indicator">
                                        <span>{sys.systemName}</span>
                                        <div className="fuel-bar">
                                            <div 
                                                className="fuel-level" 
                                                style={{width: sys.fuelLevel}}
                                            ></div>
                                        </div>
                                        <span>{sys.fuelLevel}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="status-card">
                    <FontAwesomeIcon icon={faBatteryFull} className="status-icon" />
                    <div className="status-content">
                        <h3>UPS Battery Health</h3>
                        <div className="battery-status">
                            {systems
                                .filter(sys => sys.type.includes('UPS'))
                                .map(sys => (
                                    <div key={sys.id} className="battery-indicator">
                                        <span>{sys.systemName}</span>
                                        <span className={`health-badge ${sys.batteryHealth.toLowerCase()}`}>
                                            {sys.batteryHealth}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="systems-table-container">
                <table className="systems-table">
                    <thead>
                        <tr>
                            <th>System ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Location</th>
                            <th>Capacity</th>
                            <th>Last Test</th>
                            <th>Status</th>
                            <th>Next Service</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {systems.map(system => (
                            <tr key={system.id}>
                                <td>{system.systemId}</td>
                                <td>{system.systemName}</td>
                                <td>{system.type}</td>
                                <td>{system.location}</td>
                                <td>{system.capacity}</td>
                                <td>{system.date}</td>
                                <td>
                                    <span className={`status-badge ${system.maintenanceStatus.toLowerCase().replace(' ', '-')}`}>
                                        {system.maintenanceStatus}
                                    </span>
                                </td>
                                <td>{system.nextServiceDue}</td>
                                <td>
                                    <button className="view-btn">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddTest && (
                <div className="modal-overlay">
                    <div className="add-system-modal">
                        <h2>Add New System Check</h2>
                        <form onSubmit={handleAddSystem}>
                            <div className="form-grid">
                                {/* Basic Information */}
                                <div className="form-group">
                                    <label>Check Date</label>
                                    <input
                                        type="date"
                                        value={newSystem.date}
                                        onChange={(e) => setNewSystem({...newSystem, date: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>System ID</label>
                                    <input
                                        type="text"
                                        value={newSystem.systemId}
                                        onChange={(e) => setNewSystem({...newSystem, systemId: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>System Name</label>
                                    <input
                                        type="text"
                                        value={newSystem.systemName}
                                        onChange={(e) => setNewSystem({...newSystem, systemName: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        value={newSystem.location}
                                        onChange={(e) => setNewSystem({...newSystem, location: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>System Type</label>
                                    <select
                                        value={newSystem.type}
                                        onChange={(e) => setNewSystem({...newSystem, type: e.target.value})}
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Diesel Generator">Diesel Generator</option>
                                        <option value="Gas Generator">Gas Generator</option>
                                        <option value="Battery UPS">Battery UPS</option>
                                        <option value="Flywheel UPS">Flywheel UPS</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Capacity</label>
                                    <input
                                        type="text"
                                        value={newSystem.capacity}
                                        onChange={(e) => setNewSystem({...newSystem, capacity: e.target.value})}
                                        required
                                    />
                                </div>

                                {/* System-specific fields */}
                                {newSystem.type.includes('Generator') && (
                                    <>
                                        <div className="form-group">
                                            <label>Fuel Level</label>
                                            <input
                                                type="text"
                                                value={newSystem.fuelLevel}
                                                onChange={(e) => setNewSystem({...newSystem, fuelLevel: e.target.value})}
                                                placeholder="e.g., 95%"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Oil Pressure</label>
                                            <select
                                                value={newSystem.oilPressure}
                                                onChange={(e) => setNewSystem({...newSystem, oilPressure: e.target.value})}
                                            >
                                                <option value="Normal">Normal</option>
                                                <option value="Low">Low</option>
                                                <option value="High">High</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Coolant Temperature</label>
                                            <select
                                                value={newSystem.coolantTemp}
                                                onChange={(e) => setNewSystem({...newSystem, coolantTemp: e.target.value})}
                                            >
                                                <option value="Normal">Normal</option>
                                                <option value="High">High</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {/* Common test fields */}
                                <div className="form-group">
                                    <label>Battery Health</label>
                                    <select
                                        value={newSystem.batteryHealth}
                                        onChange={(e) => setNewSystem({...newSystem, batteryHealth: e.target.value})}
                                    >
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Transfer Switch Test</label>
                                    <select
                                        value={newSystem.transferSwitchTest}
                                        onChange={(e) => setNewSystem({...newSystem, transferSwitchTest: e.target.value})}
                                    >
                                        <option value="Pass">Pass</option>
                                        <option value="Fail">Fail</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Load Test</label>
                                    <select
                                        value={newSystem.loadTest}
                                        onChange={(e) => setNewSystem({...newSystem, loadTest: e.target.value})}
                                    >
                                        <option value="Pass">Pass</option>
                                        <option value="Fail">Fail</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Startup Time</label>
                                    <input
                                        type="text"
                                        value={newSystem.startupTime}
                                        onChange={(e) => setNewSystem({...newSystem, startupTime: e.target.value})}
                                        placeholder="e.g., 12 seconds"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Run Time</label>
                                    <input
                                        type="text"
                                        value={newSystem.runTime}
                                        onChange={(e) => setNewSystem({...newSystem, runTime: e.target.value})}
                                        placeholder="e.g., 4 hours"
                                    />
                                </div>
                            </div>

                            {/* Full width fields */}
                            <div className="form-group full-width">
                                <label>Notes</label>
                                <textarea
                                    value={newSystem.notes}
                                    onChange={(e) => setNewSystem({...newSystem, notes: e.target.value})}
                                    placeholder="Enter any additional notes or observations..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Maintenance Status</label>
                                <select
                                    value={newSystem.maintenanceStatus}
                                    onChange={(e) => setNewSystem({...newSystem, maintenanceStatus: e.target.value})}
                                >
                                    <option value="Up to Date">Up to Date</option>
                                    <option value="Service Required">Service Required</option>
                                    <option value="Out of Service">Out of Service</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Next Service Due</label>
                                <input
                                    type="date"
                                    value={newSystem.nextServiceDue}
                                    onChange={(e) => setNewSystem({...newSystem, nextServiceDue: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Technician</label>
                                <input
                                    type="text"
                                    value={newSystem.technician}
                                    onChange={(e) => setNewSystem({...newSystem, technician: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowAddTest(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Add System Check
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmergencyPowerSystems; 