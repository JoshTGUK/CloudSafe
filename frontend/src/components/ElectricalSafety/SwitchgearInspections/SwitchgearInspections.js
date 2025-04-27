import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faIndustry,
    faCheckCircle,
    faExclamationTriangle,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import './SwitchgearInspections.css';

const SwitchgearInspections = () => {
    const [showAddInspection, setShowAddInspection] = useState(false);
    const [inspections, setInspections] = useState([
        {
            id: 1,
            date: '2024-03-20',
            type: 'Low Voltage Switchgear',
            findings: 'Minor wear on contacts, within acceptable limits',
            status: 'OK',
            technician: 'David Chen'
        },
        {
            id: 2,
            date: '2024-03-15',
            type: 'Medium Voltage Switchgear',
            findings: 'Insulation deterioration detected in compartment B',
            status: 'Repair Needed',
            technician: 'Sarah Johnson'
        }
    ]);

    const [newInspection, setNewInspection] = useState({
        date: '',
        type: '',
        findings: '',
        status: 'OK',
        technician: ''
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
            type: '',
            findings: '',
            status: 'OK',
            technician: ''
        });
    };

    return (
        <div className="switchgear-inspections">
            <div className="page-header">
                <div className="header-content">
                    <h1>Switchgear Inspections</h1>
                    <p>Track and manage switchgear maintenance and inspections</p>
                </div>
                <button className="add-inspection-btn" onClick={() => setShowAddInspection(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add New Inspection
                </button>
            </div>

            <div className="info-panel">
                <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                <div className="info-content">
                    <h3>What is Switchgear?</h3>
                    <p>
                        Switchgear is the combination of electrical disconnect switches, fuses, or circuit breakers 
                        used to control, protect and isolate electrical equipment. Regular inspection ensures safe 
                        and reliable operation of electrical systems.
                    </p>
                </div>
            </div>

            <div className="overview-section">
                <div className="overview-card">
                    <FontAwesomeIcon icon={faIndustry} className="card-icon" />
                    <div className="card-content">
                        <h3>Total Inspections</h3>
                        <p className="card-value">{inspections.length}</p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faCheckCircle} className="card-icon success" />
                    <div className="card-content">
                        <h3>Systems OK</h3>
                        <p className="card-value">
                            {inspections.filter(inspection => inspection.status === 'OK').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="card-icon warning" />
                    <div className="card-content">
                        <h3>Repairs Needed</h3>
                        <p className="card-value">
                            {inspections.filter(inspection => inspection.status === 'Repair Needed').length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="inspections-table-container">
                <table className="inspections-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Switchgear Type</th>
                            <th>Findings</th>
                            <th>Status</th>
                            <th>Technician</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inspections.map(inspection => (
                            <tr key={inspection.id}>
                                <td>{inspection.date}</td>
                                <td>{inspection.type}</td>
                                <td>{inspection.findings}</td>
                                <td>
                                    <span className={`status-badge ${inspection.status === 'OK' ? 'ok' : 'repair'}`}>
                                        {inspection.status}
                                    </span>
                                </td>
                                <td>{inspection.technician}</td>
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
                        <h2>Add New Inspection</h2>
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
                                <label>Switchgear Type</label>
                                <select
                                    value={newInspection.type}
                                    onChange={(e) => setNewInspection({...newInspection, type: e.target.value})}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="Low Voltage Switchgear">Low Voltage Switchgear</option>
                                    <option value="Medium Voltage Switchgear">Medium Voltage Switchgear</option>
                                    <option value="High Voltage Switchgear">High Voltage Switchgear</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Findings</label>
                                <textarea
                                    value={newInspection.findings}
                                    onChange={(e) => setNewInspection({...newInspection, findings: e.target.value})}
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    value={newInspection.status}
                                    onChange={(e) => setNewInspection({...newInspection, status: e.target.value})}
                                >
                                    <option value="OK">OK</option>
                                    <option value="Repair Needed">Repair Needed</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Technician</label>
                                <input
                                    type="text"
                                    value={newInspection.technician}
                                    onChange={(e) => setNewInspection({...newInspection, technician: e.target.value})}
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

export default SwitchgearInspections; 