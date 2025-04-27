import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faServer,
    faCheckCircle,
    faExclamationTriangle,
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import './FuseBoardInspections.css';

const FuseBoardInspections = () => {
    const [showAddInspection, setShowAddInspection] = useState(false);
    const [inspections, setInspections] = useState([
        {
            id: 1,
            date: '2024-03-20',
            boardId: 'FB-001',
            location: 'Ground Floor East',
            boardType: 'Distribution Board',
            numberOfWays: 24,
            condition: 'Good',
            labelingStatus: 'Complete',
            thermalScan: 'Pass',
            fuseRatings: 'All Correct',
            issues: 'None',
            recommendations: 'Regular maintenance sufficient',
            nextInspectionDue: '2024-09-20',
            inspector: 'John Smith'
        },
        {
            id: 2,
            date: '2024-03-15',
            boardId: 'FB-002',
            location: 'First Floor West',
            boardType: 'Consumer Unit',
            numberOfWays: 16,
            condition: 'Fair',
            labelingStatus: 'Incomplete',
            thermalScan: 'Attention Required',
            fuseRatings: 'Two oversized',
            issues: 'Thermal hotspot detected on circuit 5',
            recommendations: 'Replace oversized fuses, investigate hotspot',
            nextInspectionDue: '2024-04-15',
            inspector: 'Sarah Wilson'
        }
    ]);

    const [newInspection, setNewInspection] = useState({
        date: '',
        boardId: '',
        location: '',
        boardType: '',
        numberOfWays: '',
        condition: 'Good',
        labelingStatus: 'Complete',
        thermalScan: 'Pass',
        fuseRatings: '',
        issues: '',
        recommendations: '',
        nextInspectionDue: '',
        inspector: ''
    });

    const handleAddInspection = (e) => {
        e.preventDefault();
        const inspection = {
            id: inspections.length + 1,
            ...newInspection
        };
        setInspections([...inspections, inspection]);
        setShowAddInspection(false);
        setNewInspection({
            date: '',
            boardId: '',
            location: '',
            boardType: '',
            numberOfWays: '',
            condition: 'Good',
            labelingStatus: 'Complete',
            thermalScan: 'Pass',
            fuseRatings: '',
            issues: '',
            recommendations: '',
            nextInspectionDue: '',
            inspector: ''
        });
    };

    return (
        <div className="fuse-board-inspections">
            <div className="page-header">
                <div className="header-content">
                    <h1>Fuse Board Inspections</h1>
                    <p>Track and manage fuse board maintenance records</p>
                </div>
                <button className="add-inspection-btn" onClick={() => setShowAddInspection(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add New Inspection
                </button>
            </div>

            <div className="overview-section">
                <div className="overview-card">
                    <FontAwesomeIcon icon={faServer} className="card-icon" />
                    <div className="card-content">
                        <h3>Total Boards</h3>
                        <p className="card-value">{inspections.length}</p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faCheckCircle} className="card-icon success" />
                    <div className="card-content">
                        <h3>Passed Inspections</h3>
                        <p className="card-value">
                            {inspections.filter(insp => insp.condition === 'Good').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="card-icon warning" />
                    <div className="card-content">
                        <h3>Attention Required</h3>
                        <p className="card-value">
                            {inspections.filter(insp => insp.condition === 'Fair' || insp.condition === 'Poor').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faCalendarAlt} className="card-icon primary" />
                    <div className="card-content">
                        <h3>Due for Inspection</h3>
                        <p className="card-value">
                            {inspections.filter(insp => new Date(insp.nextInspectionDue) <= new Date()).length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="inspections-table-container">
                <table className="inspections-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Board ID</th>
                            <th>Location</th>
                            <th>Type</th>
                            <th>Condition</th>
                            <th>Labeling</th>
                            <th>Thermal Scan</th>
                            <th>Inspector</th>
                            <th>Next Due</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inspections.map(inspection => (
                            <tr key={inspection.id}>
                                <td>{inspection.date}</td>
                                <td>{inspection.boardId}</td>
                                <td>{inspection.location}</td>
                                <td>{inspection.boardType}</td>
                                <td>
                                    <span className={`status-badge ${inspection.condition.toLowerCase()}`}>
                                        {inspection.condition}
                                    </span>
                                </td>
                                <td>{inspection.labelingStatus}</td>
                                <td>{inspection.thermalScan}</td>
                                <td>{inspection.inspector}</td>
                                <td>{inspection.nextInspectionDue}</td>
                                <td>
                                    <button className="view-btn">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddInspection && (
                <div className="modal-overlay">
                    <div className="add-inspection-modal">
                        <h2>Add New Fuse Board Inspection</h2>
                        <form onSubmit={handleAddInspection}>
                            <div className="form-group">
                                <label>Inspection Date</label>
                                <input
                                    type="date"
                                    value={newInspection.date}
                                    onChange={(e) => setNewInspection({...newInspection, date: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Board ID</label>
                                <input
                                    type="text"
                                    value={newInspection.boardId}
                                    onChange={(e) => setNewInspection({...newInspection, boardId: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    value={newInspection.location}
                                    onChange={(e) => setNewInspection({...newInspection, location: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Board Type</label>
                                <select
                                    value={newInspection.boardType}
                                    onChange={(e) => setNewInspection({...newInspection, boardType: e.target.value})}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="Distribution Board">Distribution Board</option>
                                    <option value="Consumer Unit">Consumer Unit</option>
                                    <option value="Sub-Main Board">Sub-Main Board</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Number of Ways</label>
                                <input
                                    type="number"
                                    value={newInspection.numberOfWays}
                                    onChange={(e) => setNewInspection({...newInspection, numberOfWays: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Condition</label>
                                <select
                                    value={newInspection.condition}
                                    onChange={(e) => setNewInspection({...newInspection, condition: e.target.value})}
                                >
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                    <option value="Poor">Poor</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Labeling Status</label>
                                <select
                                    value={newInspection.labelingStatus}
                                    onChange={(e) => setNewInspection({...newInspection, labelingStatus: e.target.value})}
                                >
                                    <option value="Complete">Complete</option>
                                    <option value="Incomplete">Incomplete</option>
                                    <option value="Needs Update">Needs Update</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Thermal Scan Result</label>
                                <select
                                    value={newInspection.thermalScan}
                                    onChange={(e) => setNewInspection({...newInspection, thermalScan: e.target.value})}
                                >
                                    <option value="Pass">Pass</option>
                                    <option value="Attention Required">Attention Required</option>
                                    <option value="Fail">Fail</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Fuse Ratings Check</label>
                                <textarea
                                    value={newInspection.fuseRatings}
                                    onChange={(e) => setNewInspection({...newInspection, fuseRatings: e.target.value})}
                                    placeholder="Document any issues with fuse ratings..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Issues Found</label>
                                <textarea
                                    value={newInspection.issues}
                                    onChange={(e) => setNewInspection({...newInspection, issues: e.target.value})}
                                    placeholder="List any issues found during inspection..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Recommendations</label>
                                <textarea
                                    value={newInspection.recommendations}
                                    onChange={(e) => setNewInspection({...newInspection, recommendations: e.target.value})}
                                    placeholder="Enter recommendations for maintenance or improvements..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Next Inspection Due</label>
                                <input
                                    type="date"
                                    value={newInspection.nextInspectionDue}
                                    onChange={(e) => setNewInspection({...newInspection, nextInspectionDue: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Inspector</label>
                                <input
                                    type="text"
                                    value={newInspection.inspector}
                                    onChange={(e) => setNewInspection({...newInspection, inspector: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowAddInspection(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Add Inspection
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FuseBoardInspections; 