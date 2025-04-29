import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import BuildingMaintenanceSidebar from './BuildingMaintenanceSidebar/BuildingMaintenanceSidebar';
import './BuildingMaintenance.css';
import MainHeader from '../common/MainHeader/MainHeader';
import PlumbingSystems from './PlumbingSystems/PlumbingSystems';
import HeatingCooling from './HeatingCooling/HeatingCooling';
import LiftMaintenance from './LiftMaintenance/LiftMaintenance';
import RoofMaintenance from './RoofMaintenance/RoofMaintenance';
import FacadeMaintenance from './FacadeMaintenance/FacadeMaintenance';
import DoorsWindows from './DoorsWindows/DoorsWindows';
import LightingElectrical from './LightingElectrical/LightingElectrical';
import PestControl from './PestControl/PestControl';
import PaintingRepairs from './PaintingRepairs/PaintingRepairs';
import DefectsReporting from './DefectsReporting/DefectsReporting';
import Dashboard from './Dashboard/Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Placeholder component for unimplemented sections
const PlaceholderComponent = ({ title }) => (
  <div className="maintenance-page">
    <MainHeader />
    <div className="maintenance-content">
      <h1>{title}</h1>
      <p>This section is under development.</p>
    </div>
  </div>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('BuildingMaintenance Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>Something went wrong.</h1>
          <p>{this.state.error.message}</p>
          <button onClick={() => window.history.back()}>Go Back</button>
        </div>
      );
    }

    return this.props.children;
  }
}

const BuildingMaintenance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        if (location.pathname.endsWith('/building-maintenance')) {
          navigate('dashboard');
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    initializeComponent();
  }, [id, location, navigate]);

  if (!id) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <div className="app-container">
        <MainHeader />
        <div className="building-maintenance-container">
          <BuildingMaintenanceSidebar />
          <div className="building-maintenance-content">
            <button 
              className="sidebar-back-btn"
              onClick={() => navigate(`/propertydashboard/${id}`)}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Property
            </button>
            <div className="maintenance-content-area">
              <Routes>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard hideHeader />} />
                <Route path="plumbing" element={<PlumbingSystems hideHeader />} />
                <Route path="heating-cooling" element={<HeatingCooling hideHeader />} />
                <Route path="lift" element={<LiftMaintenance hideHeader />} />
                <Route path="roof" element={<RoofMaintenance hideHeader />} />
                <Route path="facade" element={<FacadeMaintenance hideHeader />} />
                <Route path="doors-windows" element={<DoorsWindows hideHeader />} />
                <Route path="lighting" element={<LightingElectrical hideHeader />} />
                <Route path="pest-control" element={<PestControl hideHeader />} />
                <Route path="painting" element={<PaintingRepairs hideHeader />} />
                <Route path="defects" element={<DefectsReporting hideHeader />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default BuildingMaintenance; 