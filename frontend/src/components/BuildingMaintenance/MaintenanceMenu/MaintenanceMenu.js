import React from 'react';
import { NavLink } from 'react-router-dom';
import './MaintenanceMenu.css';

const MaintenanceMenu = () => {
  return (
    <nav className="maintenance-menu">
      <ul>
        <li>
          <NavLink to="plumbing">Plumbing Systems</NavLink>
        </li>
        <li>
          <NavLink to="heating-cooling">Heating & Cooling</NavLink>
        </li>
        <li>
          <NavLink to="lift">Lift Maintenance</NavLink>
        </li>
        <li>
          <NavLink to="roof">Roof & Gutters</NavLink>
        </li>
        <li>
          <NavLink to="facade">Façade & Walls</NavLink>
        </li>
        <li>
          <NavLink to="doors-windows">Doors & Windows</NavLink>
        </li>
        <li>
          <NavLink to="lighting">Lighting & Electrical</NavLink>
        </li>
        <li>
          <NavLink to="pest-control">Pest Control</NavLink>
        </li>
        <li>
          <NavLink to="painting">Painting & Repairs</NavLink>
        </li>
        <li>
          <NavLink to="defects">Defects Reporting</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MaintenanceMenu; 