import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropertyProfileSidebar from './PropertyProfileSidebar/PropertyProfileSidebar';
import PropertyProfileDashboard from './PropertyProfileDashboard/PropertyProfileDashboard';
import BasicInformation from './BasicInformation/BasicInformation';
import OwnershipDetails from './OwnershipDetails/OwnershipDetails';
import BuildingDetails from './BuildingDetails/BuildingDetails';
import InsuranceInformation from './InsuranceInformation/InsuranceInformation';
import AssociatedStaff from './AssociatedStaff/AssociatedStaff';
import MainHeader from '../common/MainHeader/MainHeader';
import './PropertyProfile.css';

function PropertyProfile() {
  return (
    <div className="property-profile-layout">
      <MainHeader />
      <div className="property-profile-container">
        <PropertyProfileSidebar />
        <main className="property-profile-content">
          <Routes>
            <Route index element={<PropertyProfileDashboard />} />
            <Route path="basic-info" element={<BasicInformation />} />
            <Route path="ownership" element={<OwnershipDetails />} />
            <Route path="building-details" element={<BuildingDetails />} />
            <Route path="insurance" element={<InsuranceInformation />} />
            <Route path="staff" element={<AssociatedStaff />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default PropertyProfile; 