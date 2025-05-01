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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BuildingMaintenanceDashboard from './BuildingMaintenanceDashboard/BuildingMaintenanceDashboard';

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
      <div className="building-maintenance-container">
        <MainHeader />
        <div className="building-maintenance-content">
          <BuildingMaintenanceSidebar />
          <main className="building-maintenance-main">
            <Routes>
              <Route index element={<BuildingMaintenanceDashboard propertyId={id} />} />
              <Route path="plumbing" element={<PlumbingSystems propertyId={id} />} />
              <Route path="heating-cooling" element={<HeatingCooling propertyId={id} />} />
              <Route path="lift" element={<LiftMaintenance propertyId={id} />} />
              <Route path="roof" element={<RoofMaintenance propertyId={id} />} />
              <Route path="facade" element={<FacadeMaintenance propertyId={id} />} />
              <Route path="doors-windows" element={<DoorsWindows propertyId={id} />} />
              <Route path="lighting" element={<LightingElectrical propertyId={id} />} />
              <Route path="pest-control" element={<PestControl propertyId={id} />} />
              <Route path="painting" element={<PaintingRepairs propertyId={id} />} />
              <Route path="defects" element={<DefectsReporting propertyId={id} />} />
            </Routes>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default BuildingMaintenance; 