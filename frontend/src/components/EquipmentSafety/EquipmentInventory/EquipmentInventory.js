import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch,
    faFilter,
    faPlus,
    faCircle
} from '@fortawesome/free-solid-svg-icons';
import './EquipmentInventory.css';

const EquipmentInventory = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);

    const equipmentList = [
        {
            id: 1,
            name: 'Forklift #1',
            type: 'Heavy Machinery',
            location: 'Warehouse A',
            status: 'active',
            serialNumber: 'FL-2023-001',
            lastInspection: '2024-03-01',
            nextInspection: '2024-04-15',
            responsible: 'John Smith'
        },
        // Add more equipment items
    ];

    return (
        <div className="inventory-container">
            <div className="inventory-header">
                <h1>Equipment Inventory</h1>
                <button className="add-equipment-btn">
                    <FontAwesomeIcon icon={faPlus} />
                    Add Equipment
                </button>
            </div>

            <div className="search-filter-bar">
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />
                    <input
                        type="text"
                        placeholder="Search equipment..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button 
                    className="filter-btn"
                    onClick={() => setFilterOpen(!filterOpen)}
                >
                    <FontAwesomeIcon icon={faFilter} />
                    Filters
                </button>
            </div>

            <div className="equipment-table">
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Location</th>
                            <th>Serial Number</th>
                            <th>Last Inspection</th>
                            <th>Next Inspection</th>
                            <th>Responsible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipmentList.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <FontAwesomeIcon 
                                        icon={faCircle} 
                                        className={`status-icon ${item.status}`}
                                    />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.location}</td>
                                <td>{item.serialNumber}</td>
                                <td>{item.lastInspection}</td>
                                <td>{item.nextInspection}</td>
                                <td>{item.responsible}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EquipmentInventory; 