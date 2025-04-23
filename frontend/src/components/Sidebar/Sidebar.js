import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="sidebar">
            {/* ... other menu items */}
            <Link 
                to="/equipment-safety"
                className="sidebar-item"
            >
                <FontAwesomeIcon icon={faTools} />
                <span>Equipment Safety</span>
            </Link>
            {/* ... other menu items */}
        </nav>
    );
}; 