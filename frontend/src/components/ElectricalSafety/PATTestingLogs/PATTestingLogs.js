import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faPlug,
    faCheckCircle,
    faExclamationTriangle,
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import './PATTestingLogs.css';

const PATTestingLogs = () => {
    const [showAddTest, setShowAddTest] = useState(false);
    const [tests, setTests] = useState([
        {
            id: 1,
            date: '2024-03-20',
            applianceId: 'PAT-001',
            applianceName: 'Desktop Computer',
            location: 'Office 101',
            department: 'Administration',
            manufacturer: 'Dell',
            model: 'OptiPlex 7090',
            serialNumber: 'DLL2024-001',
            category: 'IT Equipment',
            visualCheck: 'Pass',
            earthContinuity: '0.2 Ω',
            insulationResistance: '> 2 MΩ',
            result: 'Pass',
            notes: 'All tests within acceptable limits',
            nextTestDue: '2025-03-20',
            tester: 'John Smith'
        },
        {
            id: 2,
            date: '2024-03-15',
            applianceId: 'PAT-002',
            applianceName: 'Microwave Oven',
            location: 'Break Room',
            department: 'Common Area',
            manufacturer: 'Samsung',
            model: 'MS23K3513',
            serialNumber: 'SMG2023-445',
            category: 'Kitchen Appliance',
            visualCheck: 'Pass',
            earthContinuity: '0.3 Ω',
            insulationResistance: '1.8 MΩ',
            result: 'Fail',
            notes: 'Insulation resistance below minimum requirement',
            nextTestDue: '2024-04-15',
            tester: 'Sarah Wilson'
        }
    ]);

    const [newTest, setNewTest] = useState({
        date: '',
        applianceId: '',
        applianceName: '',
        location: '',
        department: '',
        manufacturer: '',
        model: '',
        serialNumber: '',
        category: '',
        visualCheck: 'Pass',
        earthContinuity: '',
        insulationResistance: '',
        result: 'Pass',
        notes: '',
        nextTestDue: '',
        tester: ''
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
            applianceId: '',
            applianceName: '',
            location: '',
            department: '',
            manufacturer: '',
            model: '',
            serialNumber: '',
            category: '',
            visualCheck: 'Pass',
            earthContinuity: '',
            insulationResistance: '',
            result: 'Pass',
            notes: '',
            nextTestDue: '',
            tester: ''
        });
    };

    return (
        <div className="pat-testing">
            <div className="page-header">
                <div className="header-content">
                    <h1>PAT Testing Logs</h1>
                    <p>Track portable appliance testing records and compliance</p>
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
                        <h3>Total Appliances</h3>
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
                    <FontAwesomeIcon icon={faCalendarAlt} className="card-icon primary" />
                    <div className="card-content">
                        <h3>Due for Testing</h3>
                        <p className="card-value">
                            {tests.filter(test => new Date(test.nextTestDue) <= new Date()).length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="tests-table-container">
                <table className="tests-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Appliance ID</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Category</th>
                            <th>Visual Check</th>
                            <th>Earth Continuity</th>
                            <th>Insulation</th>
                            <th>Result</th>
                            <th>Next Due</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map(test => (
                            <tr key={test.id}>
                                <td>{test.date}</td>
                                <td>{test.applianceId}</td>
                                <td>{test.applianceName}</td>
                                <td>{test.location}</td>
                                <td>{test.category}</td>
                                <td>{test.visualCheck}</td>
                                <td>{test.earthContinuity}</td>
                                <td>{test.insulationResistance}</td>
                                <td>
                                    <span className={`status-badge ${test.result.toLowerCase()}`}>
                                        {test.result}
                                    </span>
                                </td>
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
                        <h2>Add New PAT Test</h2>
                        <form onSubmit={handleAddTest}>
                            <div className="form-grid">
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
                                    <label>Appliance ID</label>
                                    <input
                                        type="text"
                                        value={newTest.applianceId}
                                        onChange={(e) => setNewTest({...newTest, applianceId: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Appliance Name</label>
                                    <input
                                        type="text"
                                        value={newTest.applianceName}
                                        onChange={(e) => setNewTest({...newTest, applianceName: e.target.value})}
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
                                    <label>Department</label>
                                    <input
                                        type="text"
                                        value={newTest.department}
                                        onChange={(e) => setNewTest({...newTest, department: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        value={newTest.category}
                                        onChange={(e) => setNewTest({...newTest, category: e.target.value})}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="IT Equipment">IT Equipment</option>
                                        <option value="Kitchen Appliance">Kitchen Appliance</option>
                                        <option value="Power Tools">Power Tools</option>
                                        <option value="Office Equipment">Office Equipment</option>
                                        <option value="Cleaning Equipment">Cleaning Equipment</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Visual Check</label>
                                    <select
                                        value={newTest.visualCheck}
                                        onChange={(e) => setNewTest({...newTest, visualCheck: e.target.value})}
                                    >
                                        <option value="Pass">Pass</option>
                                        <option value="Fail">Fail</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Earth Continuity (Ω)</label>
                                    <input
                                        type="text"
                                        value={newTest.earthContinuity}
                                        onChange={(e) => setNewTest({...newTest, earthContinuity: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Insulation Resistance (MΩ)</label>
                                    <input
                                        type="text"
                                        value={newTest.insulationResistance}
                                        onChange={(e) => setNewTest({...newTest, insulationResistance: e.target.value})}
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
                            </div>
                            <div className="form-group full-width">
                                <label>Notes</label>
                                <textarea
                                    value={newTest.notes}
                                    onChange={(e) => setNewTest({...newTest, notes: e.target.value})}
                                    placeholder="Add any additional notes or observations..."
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
                            <div className="form-group">
                                <label>Tester</label>
                                <input
                                    type="text"
                                    value={newTest.tester}
                                    onChange={(e) => setNewTest({...newTest, tester: e.target.value})}
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

export default PATTestingLogs; 