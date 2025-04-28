import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { 
  FaWrench, FaHome, FaTint, FaTemperatureHigh, 
  FaArrowUp, FaWarehouse, FaBuilding, FaDoorOpen,
  FaLightbulb, FaBug, FaPaintRoller, FaExclamationTriangle,
  FaArrowLeft 
} from 'react-icons/fa';
import './BuildingMaintenanceSidebar.css';

const BuildingMaintenanceSidebar = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate(`/propertydashboard/${id}`);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <button className="sidebar-back-btn" onClick={handleBack}>
          <FaArrowLeft /> Back
        </button>
        <nav className="sidebar-menu">
          <NavLink to="dashboard" className="sidebar-item">
            <span className="sidebar-icon"><FaHome /></span>
            <span className="sidebar-label">Dashboard</span>
          </NavLink>
          
          <NavLink to="plumbing" className="sidebar-item">
            <span className="sidebar-icon"><FaTint /></span>
            <span className="sidebar-label">Plumbing Systems</span>
          </NavLink>

          <NavLink to="heating-cooling" className="sidebar-item">
            <span className="sidebar-icon"><FaTemperatureHigh /></span>
            <span className="sidebar-label">Heating & Cooling</span>
          </NavLink>

          <NavLink to="lift" className="sidebar-item">
            <span className="sidebar-icon"><FaArrowUp /></span>
            <span className="sidebar-label">Lift Maintenance</span>
          </NavLink>

          <NavLink to="roof" className="sidebar-item">
            <span className="sidebar-icon"><FaWarehouse /></span>
            <span className="sidebar-label">Roof & Gutters</span>
          </NavLink>

          <NavLink to="facade" className="sidebar-item">
            <span className="sidebar-icon"><FaBuilding /></span>
            <span className="sidebar-label">Façade & Walls</span>
          </NavLink>

          <NavLink to="doors-windows" className="sidebar-item">
            <span className="sidebar-icon"><FaDoorOpen /></span>
            <span className="sidebar-label">Doors & Windows</span>
          </NavLink>

          <NavLink to="lighting" className="sidebar-item">
            <span className="sidebar-icon"><FaLightbulb /></span>
            <span className="sidebar-label">Lighting & Electrical</span>
          </NavLink>

          <NavLink to="pest-control" className="sidebar-item">
            <span className="sidebar-icon"><FaBug /></span>
            <span className="sidebar-label">Pest Control</span>
          </NavLink>

          <NavLink to="painting" className="sidebar-item">
            <span className="sidebar-icon"><FaPaintRoller /></span>
            <span className="sidebar-label">Painting & Repairs</span>
          </NavLink>

          <NavLink to="defects" className="sidebar-item">
            <span className="sidebar-icon"><FaExclamationTriangle /></span>
            <span className="sidebar-label">Defects Reporting</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default BuildingMaintenanceSidebar; 