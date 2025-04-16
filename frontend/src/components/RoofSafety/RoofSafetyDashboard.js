import React, { useState, useEffect } from 'react';
import './RoofSafety.css';
import { useParams, useNavigate } from 'react-router-dom';
import MainHeader from '../common/MainHeader/MainHeader';
import { toast } from 'react-toastify';

export default function RoofSafetyDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    anchorPoints: { total: 0, pass: 0, fail: 0, pending: 0, unknown: 0 },
    cradles: { total: 0, pass: 0, fail: 0, pending: 0, unknown: 0 },
    davitBases: { total: 0, pass: 0, fail: 0, pending: 0, unknown: 0 },
    ladders: { total: 0, pass: 0, fail: 0, pending: 0, unknown: 0 },
    walkways: { total: 0, pass: 0, fail: 0, pending: 0, unknown: 0 },
    staticLines: { total: 0, pass: 0, fail: 0, pending: 0, unknown: 0 },
    handrails: { total: 0, pass: 0, fail: 0, pending: 0, unknown: 0 }
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3006';

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch anchor points
      let anchorData = [];
      try {
        const anchorResponse = await fetch(`${API_BASE_URL}/api/properties/${id}/anchor-points`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (anchorResponse.ok) {
          anchorData = await anchorResponse.json();
        } else if (anchorResponse.status === 404) {
          console.log('No anchor points found for this property');
        } else {
          console.error('Failed to fetch anchor points:', anchorResponse.status);
        }
      } catch (error) {
        console.error('Error fetching anchor points:', error);
      }
      
      // Process stats for endpoints that might not exist yet
      // For cradles and other endpoints that return 404, we'll just use empty arrays
      const anchorStats = processStats(anchorData);
      
      // For development purposes - all other endpoints will show empty data or mock data
      setStats({
        anchorPoints: anchorStats,
        cradles: { total: 3, pass: 2, fail: 1, pending: 0, unknown: 0 },
        davitBases: { total: 4, pass: 3, fail: 0, pending: 1, unknown: 0 },
        ladders: { total: 5, pass: 3, fail: 1, pending: 0, unknown: 1 },
        walkways: { total: 2, pass: 2, fail: 0, pending: 0, unknown: 0 },
        staticLines: { total: 3, pass: 2, fail: 1, pending: 0, unknown: 0 },
        handrails: { total: 4, pass: 3, fail: 0, pending: 0, unknown: 1 }
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again later.');
      setLoading(false);
      toast.error('Failed to load dashboard data');
    }
  };
  
  const processStats = (items) => {
    // Ensure items is an array
    const itemArray = Array.isArray(items) ? items : [];
    const result = { total: itemArray.length, pass: 0, fail: 0, pending: 0, unknown: 0 };
    
    itemArray.forEach(item => {
      const status = item.status?.toLowerCase() || 'unknown';
      if (status === 'pass') result.pass++;
      else if (status === 'fail') result.fail++;
      else if (status === 'pending') result.pending++;
      else result.unknown++;
    });
    
    return result;
  };

  const getStatusSummary = (stats) => {
    if (stats.fail > 0) return 'alert';
    if (stats.pending > 0) return 'warning';
    if (stats.unknown > stats.total / 2) return 'unknown';
    if (stats.pass === stats.total && stats.total > 0) return 'good';
    return 'neutral';
  };

  const getEquipmentIcon = (type) => {
    switch(type) {
      case 'anchor-points': return '🔗';
      case 'cradles': return '🧺';
      case 'davit-bases': return '🏗️';
      case 'ladders': return '🪜';
      case 'walkways': return '🚶';
      case 'handrails': return '🛡️';
      case 'static-lines': return '📏';
      default: return '🔧';
    }
  };

  const handleCardClick = (section) => {
    if (window.location.pathname.includes('/dashboard')) {
      navigate(`/roof-safety/${id}`);
    } else {
      const parentElement = document.querySelector(`.nav-item[data-section="${section}"]`);
      if (parentElement) parentElement.click();
    }
  };
  
  useEffect(() => {
    fetchDashboardData();
  }, [id]);
  
  const equipmentItems = [
    { id: 'anchor-points', label: 'Anchor Points', stats: stats.anchorPoints },
    { id: 'cradles', label: 'Cradles', stats: stats.cradles },
    { id: 'davit-bases', label: 'Davit Bases', stats: stats.davitBases },
    { id: 'ladders', label: 'Ladders', stats: stats.ladders },
    { id: 'walkways', label: 'Walkways', stats: stats.walkways },
    { id: 'static-lines', label: 'Static Lines', stats: stats.staticLines },
    { id: 'handrails', label: 'Handrails', stats: stats.handrails }
  ];

  const renderEquipmentCard = (item) => {
    const status = getStatusSummary(item.stats);
    
    return (
      <div 
        key={item.id} 
        className={`equipment-card ${status}`}
        onClick={() => handleCardClick(item.id)}
      >
        <div className="equipment-icon">{getEquipmentIcon(item.id)}</div>
        <div className="equipment-info">
          <h3>{item.label}</h3>
          <div className="equipment-status">
            <div className="status-indicator"></div>
            <div className="status-details">
              <span className="total-count">{item.stats.total}</span>
              {status === 'alert' && <span className="status-message">Action Required</span>}
              {status === 'warning' && <span className="status-message">Pending Tests</span>}
              {status === 'good' && <span className="status-message">All Pass</span>}
              {status === 'unknown' && <span className="status-message">Needs Inspection</span>}
              {status === 'neutral' && <span className="status-message">Mixed Status</span>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboardContent = () => (
    <div className="dashboard-content modern">
      <div className="dashboard-header">
        <h2>Equipment Status</h2>
        <div className="dashboard-actions">
          <button className="btn-secondary">Download Report</button>
          <button className="btn-primary">Schedule Inspection</button>
        </div>
      </div>
      
      <div className="equipment-grid">
        {equipmentItems.map(item => renderEquipmentCard(item))}
      </div>
      
      <div className="dashboard-summary">
        <div className="summary-panel">
          <h3>Attention Required</h3>
          <ul className="attention-list">
            {equipmentItems.filter(item => getStatusSummary(item.stats) === 'alert').map(item => (
              <li key={item.id} onClick={() => handleCardClick(item.id)}>
                {item.label}: {item.stats.fail} failed test{item.stats.fail !== 1 ? 's' : ''}
              </li>
            ))}
            {equipmentItems.filter(item => getStatusSummary(item.stats) === 'warning').map(item => (
              <li key={item.id} onClick={() => handleCardClick(item.id)}>
                {item.label}: {item.stats.pending} pending test{item.stats.pending !== 1 ? 's' : ''}
              </li>
            ))}
            {equipmentItems.filter(item => 
              getStatusSummary(item.stats) !== 'alert' && 
              getStatusSummary(item.stats) !== 'warning' && 
              getStatusSummary(item.stats) !== 'good'
            ).length === 0 && equipmentItems.filter(item => 
              getStatusSummary(item.stats) === 'alert' || 
              getStatusSummary(item.stats) === 'warning'
            ).length === 0 && (
              <li className="no-issues">No immediate attention required</li>
            )}
          </ul>
        </div>
        
        <div className="summary-panel">
          <h3>Next Inspections</h3>
          <p className="next-inspection-message">
            No upcoming inspections scheduled. Click "Schedule Inspection" to set up the next round of tests.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={window.location.pathname.includes('/dashboard') ? "roof-safety-container" : "dashboard-section"}>
      {window.location.pathname.includes('/dashboard') && (
        <>
          <MainHeader />
          <div className="page-content">
            <div className="left-panel">
              <h2>Roof Safety</h2>
              <nav className="safety-nav">
                <button 
                  className="nav-item active"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Dashboard</span>
                  <span className="arrow">›</span>
                </button>
                <button 
                  className="nav-item"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Anchor Points</span>
                  <span className="arrow">›</span>
                </button>
                <button 
                  className="nav-item"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Cradles</span>
                  <span className="arrow">›</span>
                </button>
                <button 
                  className="nav-item"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Davit Bases</span>
                  <span className="arrow">›</span>
                </button>
                <button 
                  className="nav-item"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Ladders</span>
                  <span className="arrow">›</span>
                </button>
                <button 
                  className="nav-item"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Walkways</span>
                  <span className="arrow">›</span>
                </button>
                <button 
                  className="nav-item"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Handrails</span>
                  <span className="arrow">›</span>
                </button>
                <button 
                  className="nav-item"
                  onClick={() => window.location.href = `/roof-safety/${id}`}
                >
                  <span className="nav-label">Static Lines</span>
                  <span className="arrow">›</span>
                </button>
              </nav>
            </div>
            <div className="main-panel">
              <div className="dashboard-section">
                <h1>Roof Safety Dashboard</h1>
                
                {loading ? (
                  <div className="loading-spinner">Loading dashboard data...</div>
                ) : error ? (
                  <div className="error-message">{error}</div>
                ) : (
                  renderDashboardContent()
                )}
              </div>
            </div>
          </div>
        </>
      )}
      
      {!window.location.pathname.includes('/dashboard') && (
        <>
          <h1>Roof Safety Dashboard</h1>
          
          {loading ? (
            <div className="loading-spinner">Loading dashboard data...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            renderDashboardContent()
          )}
        </>
      )}
    </div>
  );
} 