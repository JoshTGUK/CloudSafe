import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch,
    faFilter,
    faPlus,
    faFileAlt,
    faFilePdf,
    faFileImage,
    faDownload,
    faEye,
    faCalendarAlt,
    faUserEdit
} from '@fortawesome/free-solid-svg-icons';
import './Documentation.css';

const Documentation = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);

    const documents = [
        {
            id: 1,
            title: 'Forklift Operation Manual',
            type: 'manual',
            equipment: 'Forklift #1',
            uploadedBy: 'John Smith',
            uploadDate: '2024-02-15',
            fileType: 'pdf',
            size: '2.4 MB',
            lastViewed: '2024-03-20'
        },
        {
            id: 2,
            title: 'Crane System Certification',
            type: 'certification',
            equipment: 'Crane System',
            uploadedBy: 'Sarah Johnson',
            uploadDate: '2024-03-01',
            fileType: 'pdf',
            size: '1.8 MB',
            expiryDate: '2025-03-01'
        },
        {
            id: 3,
            title: 'Equipment Inspection Guidelines',
            type: 'procedure',
            equipment: 'All Equipment',
            uploadedBy: 'Mike Wilson',
            uploadDate: '2024-01-10',
            fileType: 'pdf',
            size: '3.1 MB',
            lastUpdated: '2024-03-15'
        }
    ];

    const getFileIcon = (fileType) => {
        switch(fileType) {
            case 'pdf':
                return <FontAwesomeIcon icon={faFilePdf} className="file-icon pdf" />;
            case 'image':
                return <FontAwesomeIcon icon={faFileImage} className="file-icon image" />;
            default:
                return <FontAwesomeIcon icon={faFileAlt} className="file-icon" />;
        }
    };

    return (
        <div className="documentation-container">
            <div className="documentation-header">
                <div className="header-content">
                    <h1>Documentation & Manuals</h1>
                    <p>Access and manage equipment documentation</p>
                </div>
                <button className="upload-doc-btn">
                    <FontAwesomeIcon icon={faPlus} />
                    Upload Document
                </button>
            </div>

            <div className="search-filter-bar">
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />
                    <input
                        type="text"
                        placeholder="Search documents..."
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

            <div className="documents-grid">
                {documents.map((doc) => (
                    <div key={doc.id} className="document-card">
                        <div className="doc-icon">
                            {getFileIcon(doc.fileType)}
                        </div>
                        <div className="doc-content">
                            <h3>{doc.title}</h3>
                            <div className="doc-info">
                                <span className="equipment">{doc.equipment}</span>
                                <span className="type">{doc.type}</span>
                            </div>
                            <div className="doc-meta">
                                <div className="meta-item">
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                    <span>{doc.uploadDate}</span>
                                </div>
                                <div className="meta-item">
                                    <FontAwesomeIcon icon={faUserEdit} />
                                    <span>{doc.uploadedBy}</span>
                                </div>
                            </div>
                            <div className="doc-actions">
                                <button className="view-btn">
                                    <FontAwesomeIcon icon={faEye} />
                                    View
                                </button>
                                <button className="download-btn">
                                    <FontAwesomeIcon icon={faDownload} />
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Documentation; 