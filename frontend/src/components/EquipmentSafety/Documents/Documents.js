import React, { useState, useEffect } from 'react';
import MainHeader from '../../common/MainHeader/MainHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFileAlt,
    faSearch,
    faFilter,
    faPlus,
    faUpload
} from '@fortawesome/free-solid-svg-icons';
import './Documents.css';

const Documents = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/equipment/documents`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch documents');
            const data = await response.json();
            setDocuments(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="equipment-documents">
            <MainHeader />
            <div className="documents-content">
                <div className="documents-header">
                    <div className="header-content">
                        <h1>Documents & Certificates</h1>
                        <p>Manage equipment documentation and certification records</p>
                    </div>
                    <button className="upload-doc-btn">
                        <FontAwesomeIcon icon={faUpload} />
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
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <FontAwesomeIcon icon={faFilter} />
                        Filters
                    </button>
                </div>

                {/* Documents grid/list will go here */}
            </div>
        </div>
    );
};

export default Documents; 