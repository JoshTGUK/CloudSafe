import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faPlug,
    faCheckCircle,
    faExclamationTriangle,
    faHistory
} from '@fortawesome/free-solid-svg-icons';
import './RCDTesting.css';

const RCDTesting = () => {
    const [showAddTest, setShowAddTest] = useState(false);
    const [tests, setTests] = useState([
        {
            id: 1,
            date: '2024-03-20',
            location: 'Main Distribution Board',
            rcdType: 'Type A',
            tripTime: '30ms',
            tripCurrent: '30mA',
            result: 'Pass',
            technician: 'John Smith',
            nextTestDue: '2024-09-20'
        },
        {
            id: 2,
            date: '2024-03-15',
            location: 'Sub Distribution Board 1',
            rcdType: 'Type AC',
            tripTime: '35ms',
            tripCurrent: '32mA',
            result: 'Fail',
            technician: 'Sarah Wilson',
            nextTestDue: '2024-04-15'
        }
    ]);

    const [newTest, setNewTest] = useState({
        date: '',
        location: '',
        rcdType: '',
        tripTime: '',
        tripCurrent: '',
        result: 'Pass',
        technician: '',
        nextTestDue: ''
    });

    const handleAddTest = (e) => {
        e.preventDefault();
        const test = {
            id: tests.length + 1,
            ...newTest
        };
        setTests([...tests, test]);
        setShowAddTest(false);
        setNewTest({
            date: '',
            location: '',
            rcdType: '',
            tripTime: '',
            tripCurrent: '',
            result: 'Pass',
            technician: '',
            nextTestDue: ''
        });
    };

    return (
        <div className="rcd-testing">
            <div className="page-header">
                <div className="header-content">
                    <h1>RCD Testing</h1>
                    <p>Manage and track Residual Current Device testing records</p>
                </div>
                <button className="add-test-btn" onClick={() => setShowAddTest(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add New Test
                </button>
            </div>

            <div className="overview-section">
                <div className="overview-card">
                    <FontAwesomeIcon icon={faPlug} className="card-icon" />
                    <div className="card-content">
                        <h3>Total RCDs</h3>
                        <p className="card-value">{tests.length}</p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faCheckCircle} className="card-icon success" />
                    <div className="card-content">
                        <h3>Passed Tests</h3>
                        <p className="card-value">
                            {tests.filter(test => test.result === 'Pass').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="card-icon warning" />
                    <div className="card-content">
                        <h3>Failed Tests</h3>
                        <p className="card-value">
                            {tests.filter(test => test.result === 'Fail').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faHistory} className="card-icon primary" />
                    <div className="card-content">
                        <h3>Due for Testing</h3>
                        <p className="card-value">2</p>
                    </div>
                </div>
            </div>

            <div className="tests-table-container">
                <table className="tests-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Location</th>
                            <th>RCD Type</th>
                            <th>Trip Time</th>
                            <th>Trip Current</th>
                            <th>Result</th>
                            <th>Technician</th>
                            <th>Next Test Due</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map(test => (
                            <tr key={test.id}>
                                <td>{test.date}</td>
                                <td>{test.location}</td>
                                <td>{test.rcdType}</td>
                                <td>{test.tripTime}</td>
                                <td>{test.tripCurrent}</td>
                                <td>
                                    <span className={`status-badge ${test.result.toLowerCase()}`}>
                                        {test.result}
                                    </span>
                                </td>
                                <td>{test.technician}</td>
                                <td>{test.nextTestDue}</td>
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
                    <div className="add-test-modal">
                        <h2>Add New RCD Test</h2>
                        <form onSubmit={handleAddTest}>
                            {/* Form fields */}
                            <div className="form-group">
                                <label>Test Date</label>
                                <input
                                    type="date"
                                    value={newTest.date}
                                    onChange={(e) => setNewTest({...newTest, date: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    value={newTest.location}
                                    onChange={(e) => setNewTest({...newTest, location: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>RCD Type</label>
                                <select
                                    value={newTest.rcdType}
                                    onChange={(e) => setNewTest({...newTest, rcdType: e.target.value})}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="Type A">Type A</option>
                                    <option value="Type AC">Type AC</option>
                                    <option value="Type B">Type B</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Trip Time (ms)</label>
                                <input
                                    type="text"
                                    value={newTest.tripTime}
                                    onChange={(e) => setNewTest({...newTest, tripTime: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Trip Current (mA)</label>
                                <input
                                    type="text"
                                    value={newTest.tripCurrent}
                                    onChange={(e) => setNewTest({...newTest, tripCurrent: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Result</label>
                                <select
                                    value={newTest.result}
                                    onChange={(e) => setNewTest({...newTest, result: e.target.value})}
                                >
                                    <option value="Pass">Pass</option>
                                    <option value="Fail">Fail</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Technician</label>
                                <input
                                    type="text"
                                    value={newTest.technician}
                                    onChange={(e) => setNewTest({...newTest, technician: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Next Test Due</label>
                                <input
                                    type="date"
                                    value={newTest.nextTestDue}
                                    onChange={(e) => setNewTest({...newTest, nextTestDue: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowAddTest(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Add Test
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RCDTesting; 