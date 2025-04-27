import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faTemperatureHigh,
    faCheckCircle,
    faExclamationTriangle,
    faCalendarAlt,
    faCamera
} from '@fortawesome/free-solid-svg-icons';
import './ThermalImagingReports.css';

const ThermalImagingReports = () => {
    const [showAddReport, setShowAddReport] = useState(false);
    const [reports, setReports] = useState([
        {
            id: 1,
            date: '2024-03-20',
            reportId: 'TIR-001',
            location: 'Main Distribution Panel',
            equipment: 'Circuit Breaker Panel A',
            inspector: 'John Smith',
            maxTemp: '45.2°C',
            ambientTemp: '23°C',
            tempDifferential: '22.2°C',
            findings: 'Elevated temperatures on breaker 3, within acceptable range',
            severity: 'Low',
            recommendations: 'Monitor during next inspection',
            nextInspectionDue: '2024-06-20',
            imageUrl: '/thermal-images/tir001.jpg'
        },
        {
            id: 2,
            date: '2024-03-15',
            reportId: 'TIR-002',
            location: 'Transformer Room',
            equipment: 'Transformer T1',
            inspector: 'Sarah Wilson',
            maxTemp: '78.5°C',
            ambientTemp: '25°C',
            tempDifferential: '53.5°C',
            findings: 'Hot spot detected on HV terminal connection',
            severity: 'High',
            recommendations: 'Immediate inspection and maintenance required',
            nextInspectionDue: '2024-03-22',
            imageUrl: '/thermal-images/tir002.jpg'
        }
    ]);

    const [newReport, setNewReport] = useState({
        date: '',
        reportId: '',
        location: '',
        equipment: '',
        inspector: '',
        maxTemp: '',
        ambientTemp: '',
        tempDifferential: '',
        findings: '',
        severity: 'Low',
        recommendations: '',
        nextInspectionDue: '',
        imageUrl: ''
    });

    const handleAddReport = (e) => {
        e.preventDefault();
        const report = {
            id: reports.length + 1,
            ...newReport
        };
        setReports([...reports, report]);
        setShowAddReport(false);
        setNewReport({
            date: '',
            reportId: '',
            location: '',
            equipment: '',
            inspector: '',
            maxTemp: '',
            ambientTemp: '',
            tempDifferential: '',
            findings: '',
            severity: 'Low',
            recommendations: '',
            nextInspectionDue: '',
            imageUrl: ''
        });
    };

    return (
        <div className="thermal-imaging">
            <div className="page-header">
                <div className="header-content">
                    <h1>Thermal Imaging Reports</h1>
                    <p>Track thermal imaging inspections and temperature anomalies</p>
                </div>
                <button className="add-report-btn" onClick={() => setShowAddReport(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add New Report
                </button>
            </div>

            <div className="overview-section">
                <div className="overview-card">
                    <FontAwesomeIcon icon={faCamera} className="card-icon" />
                    <div className="card-content">
                        <h3>Total Inspections</h3>
                        <p className="card-value">{reports.length}</p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faTemperatureHigh} className="card-icon warning" />
                    <div className="card-content">
                        <h3>High Severity Issues</h3>
                        <p className="card-value">
                            {reports.filter(report => report.severity === 'High').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="card-icon attention" />
                    <div className="card-content">
                        <h3>Medium Severity</h3>
                        <p className="card-value">
                            {reports.filter(report => report.severity === 'Medium').length}
                        </p>
                    </div>
                </div>
                <div className="overview-card">
                    <FontAwesomeIcon icon={faCalendarAlt} className="card-icon primary" />
                    <div className="card-content">
                        <h3>Due for Inspection</h3>
                        <p className="card-value">
                            {reports.filter(report => new Date(report.nextInspectionDue) <= new Date()).length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Reports Table */}
            <div className="reports-table-container">
                <table className="reports-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Report ID</th>
                            <th>Location</th>
                            <th>Equipment</th>
                            <th>Max Temp</th>
                            <th>Differential</th>
                            <th>Severity</th>
                            <th>Next Inspection</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map(report => (
                            <tr key={report.id}>
                                <td>{report.date}</td>
                                <td>{report.reportId}</td>
                                <td>{report.location}</td>
                                <td>{report.equipment}</td>
                                <td>{report.maxTemp}</td>
                                <td>{report.tempDifferential}</td>
                                <td>
                                    <span className={`severity-badge ${report.severity.toLowerCase()}`}>
                                        {report.severity}
                                    </span>
                                </td>
                                <td>{report.nextInspectionDue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Report Modal */}
            {showAddReport && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add New Thermal Imaging Report</h2>
                        <form onSubmit={handleAddReport}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        value={newReport.date}
                                        onChange={(e) => setNewReport({...newReport, date: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Report ID</label>
                                    <input
                                        type="text"
                                        value={newReport.reportId}
                                        onChange={(e) => setNewReport({...newReport, reportId: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        value={newReport.location}
                                        onChange={(e) => setNewReport({...newReport, location: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Equipment</label>
                                    <input
                                        type="text"
                                        value={newReport.equipment}
                                        onChange={(e) => setNewReport({...newReport, equipment: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Maximum Temperature</label>
                                    <input
                                        type="text"
                                        value={newReport.maxTemp}
                                        onChange={(e) => setNewReport({...newReport, maxTemp: e.target.value})}
                                        placeholder="e.g., 45.2°C"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ambient Temperature</label>
                                    <input
                                        type="text"
                                        value={newReport.ambientTemp}
                                        onChange={(e) => setNewReport({...newReport, ambientTemp: e.target.value})}
                                        placeholder="e.g., 23°C"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Temperature Differential</label>
                                    <input
                                        type="text"
                                        value={newReport.tempDifferential}
                                        onChange={(e) => setNewReport({...newReport, tempDifferential: e.target.value})}
                                        placeholder="e.g., 22.2°C"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Severity</label>
                                    <select
                                        value={newReport.severity}
                                        onChange={(e) => setNewReport({...newReport, severity: e.target.value})}
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group full-width">
                                <label>Findings</label>
                                <textarea
                                    value={newReport.findings}
                                    onChange={(e) => setNewReport({...newReport, findings: e.target.value})}
                                    placeholder="Describe the thermal imaging findings..."
                                    required
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Recommendations</label>
                                <textarea
                                    value={newReport.recommendations}
                                    onChange={(e) => setNewReport({...newReport, recommendations: e.target.value})}
                                    placeholder="Enter recommendations based on findings..."
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Next Inspection Due</label>
                                <input
                                    type="date"
                                    value={newReport.nextInspectionDue}
                                    onChange={(e) => setNewReport({...newReport, nextInspectionDue: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Inspector</label>
                                <input
                                    type="text"
                                    value={newReport.inspector}
                                    onChange={(e) => setNewReport({...newReport, inspector: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Image Upload</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        // Handle file upload logic here
                                        // For now, just store the file name
                                        setNewReport({
                                            ...newReport,
                                            imageUrl: `/thermal-images/${e.target.files[0].name}`
                                        });
                                    }}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowAddReport(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Add Report
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThermalImagingReports; 