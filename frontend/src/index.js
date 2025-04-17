import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import PropertyDashboard from './components/PropertyDashboard/PropertyDashboard';
import RoofSafety from './components/RoofSafety/RoofSafety';
import FireSafety from './components/FireSafety/FireSafety';
import ErrorPage from './components/ErrorPage/ErrorPage';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import StaffSafety from './components/StaffSafety/StaffSafety';

// Define routes
const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
        errorElement: <ErrorPage />
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <ErrorPage />
      },
      {
        path: "register",
        element: <Register />,
        errorElement: <ErrorPage />
      },
      {
        path: "dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        errorElement: <ErrorPage />
      },
      {
        path: "propertydashboard/:id",
        element: <ProtectedRoute><PropertyDashboard /></ProtectedRoute>,
        errorElement: <ErrorPage />
      },
      {
        path: "properties/:id",
        element: <ProtectedRoute><PropertyDashboard /></ProtectedRoute>,
        errorElement: <ErrorPage />
      },
      {
        path: "properties/:id/roof-safety",
        element: <ProtectedRoute><RoofSafety /></ProtectedRoute>,
        errorElement: <ErrorPage />
      },
      {
        path: "properties/:id/fire-safety",
        element: <ProtectedRoute><FireSafety /></ProtectedRoute>,
        errorElement: <ErrorPage />
      },
      {
        path: "properties/:id/staff-safety",
        element: <ProtectedRoute><StaffSafety /></ProtectedRoute>,
        errorElement: <ErrorPage />
      }
    ]
  }
];

// Create router with future flags enabled
const router = createBrowserRouter(routes);

// Create root and render with React.Suspense for better loading handling
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>
);
