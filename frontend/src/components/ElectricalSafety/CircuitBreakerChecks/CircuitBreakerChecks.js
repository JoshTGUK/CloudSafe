import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faCircleNodes,
    faCheckCircle,
    faExclamationTriangle,
    faClipboardList
} from '@fortawesome/free-solid-svg-icons';
import './CircuitBreakerChecks.css';

const CircuitBreakerChecks = () => {
    const [showAddCheck, setShowAddCheck] = useState(false);
    const [checks, setChecks] = useState([
        {
            id: 1,
            date: '2024-03-18',
            circuitId: 'CB-001',
            location: 'Main Distribution Panel',
            type: 'MCCB',
            rating: '100A',
            tripTest: 'Pass',
            mechanicalOperation: 'Good',
            contactWear: 'Normal',
            notes: 'Regular maintenance performed',
            nextCheckDue: '2024-06-18',
            technician: 'Mike Anderson'
        },
        {
            id: 2,
            date: '2024-03-15',
            circuitId: 'CB-002',
            location: 'Sub Panel A',
            type: 'MCB',
            rating: '32A',
            tripTest: 'Fail',
            mechanicalOperation: 'Sticky',
            contactWear: 'Heavy',
            notes: 'Replacement recommended',
            nextCheckDue: '2024-04-15',
            technician: 'Sarah Wilson'
        }
    ]);

    const [newCheck, setNewCheck] = useState({
        date: '',
        circuitId: '',
        location: '',
        type: '',
        rating: '',
        tripTest: 'Pass',
        mechanicalOperation: 'Good',
        contactWear: 'Normal',
        notes: '',
        nextCheckDue: '',
        technician: ''
    });

    const handleAddCheck = (e) => {
        e.preventDefault();
        const check = {
            id: checks.length + 1,
            ...newCheck
        };
        setChecks([...checks, check]);
        setShowAddCheck(false);
        setNewCheck({
            date: '',
            circuitId: '',
            location: '',
            type: '',
            rating: '',
            tripTest: 'Pass',
            mechanicalOperation: 'Good',
            contactWear: 'Normal',
            notes: '',
            nextCheckDue: '',
            technician: ''
        });
    };

    return (
        <div className="circuit-breaker-checks">
            <div className="page-header">
                <div className="header-content">
                    <h1>Circuit Breaker Checks</h1>
                    <p>Monitor and maintain circuit breaker systems</p>
                </div>
                <button className="add-check-btn" onClick={() => setShowAddCheck(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add New Check
                </button>
            </div>

            <div className="overview-section">
                <div className="overview-card">
                    <FontAwesomeIcon icon={faCircleNodes} className="card-icon" />
                    <div className="card-content">
                        <h3>Total Circuit Breakers</h3>
                        <p className="card-value">{checks.length}</p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faCheckCircle} className="card-icon success" />
                    <div className="card-content">
                        <h3>Passed Checks</h3>
                        <p className="card-value">
                            {checks.filter(check => check.tripTest === 'Pass').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="card-icon warning" />
                    <div className="card-content">
                        <h3>Failed Checks</h3>
                        <p className="card-value">
                            {checks.filter(check => check.tripTest === 'Fail').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faClipboardList} className="card-icon primary" />
                    <div className="card-content">
                        <h3>Pending Maintenance</h3>
                        <p className="card-value">
                            {checks.filter(check => check.mechanicalOperation === 'Sticky' || check.contactWear === 'Heavy').length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="checks-table-container">
                <table className="checks-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Circuit ID</th>
                            <th>Location</th>
                            <th>Type</th>
                            <th>Rating</th>
                            <th>Trip Test</th>
                            <th>Mechanical</th>
                            <th>Contact Wear</th>
                            <th>Technician</th>
                            <th>Next Due</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checks.map(check => (
                            <tr key={check.id}>
                                <td>{check.date}</td>
                                <td>{check.circuitId}</td>
                                <td>{check.location}</td>
                                <td>{check.type}</td>
                                <td>{check.rating}</td>
                                <td>
                                    <span className={`status-badge ${check.tripTest.toLowerCase()}`}>
                                        {check.tripTest}
                                    </span>
                                </td>
                                <td>{check.mechanicalOperation}</td>
                                <td>{check.contactWear}</td>
                                <td>{check.technician}</td>
                                <td>{check.nextCheckDue}</td>
                                <td>
                                    <button className="view-btn">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddCheck && (
                <div className="modal-overlay">
                    <div className="add-check-modal">
                        <h2>Add New Circuit Breaker Check</h2>
                        <form onSubmit={handleAddCheck}>
                            <div className="form-group">
                                <label>Check Date</label>
                                <input
                                    type="date"
                                    value={newCheck.date}
                                    onChange={(e) => setNewCheck({...newCheck, date: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Circuit ID</label>
                                <input
                                    type="text"
                                    value={newCheck.circuitId}
                                    onChange={(e) => setNewCheck({...newCheck, circuitId: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    value={newCheck.location}
                                    onChange={(e) => setNewCheck({...newCheck, location: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select
                                    value={newCheck.type}
                                    onChange={(e) => setNewCheck({...newCheck, type: e.target.value})}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="MCB">MCB</option>
                                    <option value="MCCB">MCCB</option>
                                    <option value="RCCB">RCCB</option>
                                    <option value="ACB">ACB</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Rating</label>
                                <input
                                    type="text"
                                    value={newCheck.rating}
                                    onChange={(e) => setNewCheck({...newCheck, rating: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Trip Test Result</label>
                                <select
                                    value={newCheck.tripTest}
                                    onChange={(e) => setNewCheck({...newCheck, tripTest: e.target.value})}
                                >
                                    <option value="Pass">Pass</option>
                                    <option value="Fail">Fail</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Mechanical Operation</label>
                                <select
                                    value={newCheck.mechanicalOperation}
                                    onChange={(e) => setNewCheck({...newCheck, mechanicalOperation: e.target.value})}
                                >
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                    <option value="Sticky">Sticky</option>
                                    <option value="Poor">Poor</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Contact Wear</label>
                                <select
                                    value={newCheck.contactWear}
                                    onChange={(e) => setNewCheck({...newCheck, contactWear: e.target.value})}
                                >
                                    <option value="Normal">Normal</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="Heavy">Heavy</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Notes</label>
                                <textarea
                                    value={newCheck.notes}
                                    onChange={(e) => setNewCheck({...newCheck, notes: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Next Check Due</label>
                                <input
                                    type="date"
                                    value={newCheck.nextCheckDue}
                                    onChange={(e) => setNewCheck({...newCheck, nextCheckDue: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Technician</label>
                                <input
                                    type="text"
                                    value={newCheck.technician}
                                    onChange={(e) => setNewCheck({...newCheck, technician: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowAddCheck(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Add Check
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CircuitBreakerChecks; 