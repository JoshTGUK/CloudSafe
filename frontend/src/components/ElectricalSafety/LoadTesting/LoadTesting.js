import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faWeightHanging,
    faCheck,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import './LoadTesting.css';

const LoadTesting = () => {
    const [showAddTest, setShowAddTest] = useState(false);
    const [loadTests, setLoadTests] = useState([
        {
            id: 1,
            date: '2024-03-15',
            equipment: 'Main Distribution Board',
            loadPercentage: 85,
            result: 'Pass',
            notes: 'All circuits within acceptable range'
        },
        {
            id: 2,
            date: '2024-03-10',
            equipment: 'Emergency Generator',
            loadPercentage: 95,
            result: 'Fail',
            notes: 'Exceeded maximum load threshold'
        }
    ]);

    const [newTest, setNewTest] = useState({
        date: '',
        equipment: '',
        loadPercentage: '',
        result: 'Pass',
        notes: ''
    });

    const handleAddTest = (e) => {
        e.preventDefault();
        const test = {
            id: loadTests.length + 1,
            ...newTest
        };
        setLoadTests([...loadTests, test]);
        setShowAddTest(false);
        setNewTest({
            date: '',
            equipment: '',
            loadPercentage: '',
            result: 'Pass',
            notes: ''
        });
    };

    return (
        <div className="load-testing">
            <div className="page-header">
                <div className="header-content">
                    <h1>Load Testing</h1>
                    <p>Monitor and record electrical load testing results</p>
                </div>
                <button className="add-test-btn" onClick={() => setShowAddTest(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Schedule New Load Test
                </button>
            </div>

            <div className="overview-section">
                <div className="overview-card">
                    <FontAwesomeIcon icon={faWeightHanging} className="card-icon" />
                    <div className="card-content">
                        <h3>Total Tests</h3>
                        <p className="card-value">{loadTests.length}</p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faCheck} className="card-icon success" />
                    <div className="card-content">
                        <h3>Passed Tests</h3>
                        <p className="card-value">
                            {loadTests.filter(test => test.result === 'Pass').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faTimes} className="card-icon danger" />
                    <div className="card-content">
                        <h3>Failed Tests</h3>
                        <p className="card-value">
                            {loadTests.filter(test => test.result === 'Fail').length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="tests-table-container">
                <table className="tests-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Equipment</th>
                            <th>Load %</th>
                            <th>Result</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadTests.map(test => (
                            <tr key={test.id}>
                                <td>{test.date}</td>
                                <td>{test.equipment}</td>
                                <td>
                                    <div className="load-percentage">
                                        <div 
                                            className={`progress-bar ${test.loadPercentage > 90 ? 'danger' : ''}`}
                                            style={{ width: `${test.loadPercentage}%` }}
                                        ></div>
                                        <span>{test.loadPercentage}%</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-badge ${test.result.toLowerCase()}`}>
                                        {test.result}
                                    </span>
                                </td>
                                <td>{test.notes}</td>
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
                        <h2>Schedule New Load Test</h2>
                        <form onSubmit={handleAddTest}>
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
                                <label>Equipment</label>
                                <input
                                    type="text"
                                    value={newTest.equipment}
                                    onChange={(e) => setNewTest({...newTest, equipment: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Load Percentage</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={newTest.loadPercentage}
                                    onChange={(e) => setNewTest({...newTest, loadPercentage: e.target.value})}
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
                                <label>Notes</label>
                                <textarea
                                    value={newTest.notes}
                                    onChange={(e) => setNewTest({...newTest, notes: e.target.value})}
                                ></textarea>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowAddTest(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Schedule Test
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoadTesting; 