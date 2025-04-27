import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faBolt,
    faCheckCircle,
    faExclamationTriangle,
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import './GroundingAndBonding.css';

const GroundingAndBonding = () => {
    const [showAddInspection, setShowAddInspection] = useState(false);
    const [inspections, setInspections] = useState([
        {
            id: 1,
            date: '2024-03-20',
            locationId: 'GND-001',
            location: 'Main Distribution Room',
            systemType: 'TN-S',
            groundResistance: '0.5 Ω',
            bondingContinuity: '0.2 Ω',
            electrodeCondition: 'Good',
            connectionTightness: 'Pass',
            corrosionStatus: 'None',
            soilCondition: 'Normal',
            result: 'Pass',
            recommendations: 'Continue regular maintenance',
            nextInspectionDue: '2024-09-20',
            inspector: 'John Smith'
        },
        {
            id: 2,
            date: '2024-03-15',
            locationId: 'GND-002',
            location: 'Secondary Distribution Panel',
            systemType: 'TT',
            groundResistance: '2.1 Ω',
            bondingContinuity: '0.4 Ω',
            electrodeCondition: 'Fair',
            connectionTightness: 'Attention Required',
            corrosionStatus: 'Minor',
            soilCondition: 'Damp',
            result: 'Attention Required',
            recommendations: 'Tighten connections, monitor corrosion',
            nextInspectionDue: '2024-04-15',
            inspector: 'Sarah Wilson'
        }
    ]);

    const [newInspection, setNewInspection] = useState({
        date: '',
        locationId: '',
        location: '',
        systemType: '',
        groundResistance: '',
        bondingContinuity: '',
        electrodeCondition: 'Good',
        connectionTightness: 'Pass',
        corrosionStatus: 'None',
        soilCondition: 'Normal',
        result: 'Pass',
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
            locationId: '',
            location: '',
            systemType: '',
            groundResistance: '',
            bondingContinuity: '',
            electrodeCondition: 'Good',
            connectionTightness: 'Pass',
            corrosionStatus: 'None',
            soilCondition: 'Normal',
            result: 'Pass',
            recommendations: '',
            nextInspectionDue: '',
            inspector: ''
        });
    };

    return (
        <div className="grounding-bonding">
            <div className="page-header">
                <div className="header-content">
                    <h1>Grounding and Bonding</h1>
                    <p>Monitor and maintain electrical grounding systems</p>
                </div>
                <button className="add-inspection-btn" onClick={() => setShowAddInspection(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add New Inspection
                </button>
            </div>

            <div className="overview-section">
                <div className="overview-card">
                    <FontAwesomeIcon icon={faBolt} className="card-icon" />
                    <div className="card-content">
                        <h3>Total Locations</h3>
                        <p className="card-value">{inspections.length}</p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faCheckCircle} className="card-icon success" />
                    <div className="card-content">
                        <h3>Passed Inspections</h3>
                        <p className="card-value">
                            {inspections.filter(insp => insp.result === 'Pass').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="card-icon warning" />
                    <div className="card-content">
                        <h3>Needs Attention</h3>
                        <p className="card-value">
                            {inspections.filter(insp => insp.result === 'Attention Required' || insp.result === 'Fail').length}
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
                            <th>Location ID</th>
                            <th>Location</th>
                            <th>System Type</th>
                            <th>Ground Resistance</th>
                            <th>Bonding Continuity</th>
                            <th>Electrode Condition</th>
                            <th>Result</th>
                            <th>Next Due</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inspections.map(inspection => (
                            <tr key={inspection.id}>
                                <td>{inspection.date}</td>
                                <td>{inspection.locationId}</td>
                                <td>{inspection.location}</td>
                                <td>{inspection.systemType}</td>
                                <td>{inspection.groundResistance}</td>
                                <td>{inspection.bondingContinuity}</td>
                                <td>{inspection.electrodeCondition}</td>
                                <td>
                                    <span className={`status-badge ${inspection.result.toLowerCase().replace(' ', '-')}`}>
                                        {inspection.result}
                                    </span>
                                </td>
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
                        <h2>Add New Grounding Inspection</h2>
                        <form onSubmit={handleAddInspection}>
                            <div className="form-grid">
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
                                    <label>Location ID</label>
                                    <input
                                        type="text"
                                        value={newInspection.locationId}
                                        onChange={(e) => setNewInspection({...newInspection, locationId: e.target.value})}
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
                                    <label>System Type</label>
                                    <select
                                        value={newInspection.systemType}
                                        onChange={(e) => setNewInspection({...newInspection, systemType: e.target.value})}
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="TN-S">TN-S</option>
                                        <option value="TN-C-S">TN-C-S</option>
                                        <option value="TT">TT</option>
                                        <option value="IT">IT</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Ground Resistance (Ω)</label>
                                    <input
                                        type="text"
                                        value={newInspection.groundResistance}
                                        onChange={(e) => setNewInspection({...newInspection, groundResistance: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Bonding Continuity (Ω)</label>
                                    <input
                                        type="text"
                                        value={newInspection.bondingContinuity}
                                        onChange={(e) => setNewInspection({...newInspection, bondingContinuity: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Electrode Condition</label>
                                    <select
                                        value={newInspection.electrodeCondition}
                                        onChange={(e) => setNewInspection({...newInspection, electrodeCondition: e.target.value})}
                                    >
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Connection Tightness</label>
                                    <select
                                        value={newInspection.connectionTightness}
                                        onChange={(e) => setNewInspection({...newInspection, connectionTightness: e.target.value})}
                                    >
                                        <option value="Pass">Pass</option>
                                        <option value="Attention Required">Attention Required</option>
                                        <option value="Fail">Fail</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Corrosion Status</label>
                                    <select
                                        value={newInspection.corrosionStatus}
                                        onChange={(e) => setNewInspection({...newInspection, corrosionStatus: e.target.value})}
                                    >
                                        <option value="None">None</option>
                                        <option value="Minor">Minor</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="Severe">Severe</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Soil Condition</label>
                                    <select
                                        value={newInspection.soilCondition}
                                        onChange={(e) => setNewInspection({...newInspection, soilCondition: e.target.value})}
                                    >
                                        <option value="Normal">Normal</option>
                                        <option value="Dry">Dry</option>
                                        <option value="Damp">Damp</option>
                                        <option value="Wet">Wet</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Result</label>
                                    <select
                                        value={newInspection.result}
                                        onChange={(e) => setNewInspection({...newInspection, result: e.target.value})}
                                    >
                                        <option value="Pass">Pass</option>
                                        <option value="Attention Required">Attention Required</option>
                                        <option value="Fail">Fail</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group full-width">
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

export default GroundingAndBonding; 