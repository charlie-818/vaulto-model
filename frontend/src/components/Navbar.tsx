import React from 'react';
import './Navbar.css';
import { ModelInputs } from '../types';
import { exportCSV, exportJSON } from '../api';

interface NavbarProps {
  currentScenario: string;
  onScenarioChange: (scenario: string) => void;
  inputs: ModelInputs;
  isOfflineMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentScenario, onScenarioChange, inputs, isOfflineMode = false }) => {
  const handleExportCSV = async () => {
    try {
      const blob = await exportCSV(inputs);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vaulto_model_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Failed to export CSV');
    }
  };

  const handleExportJSON = async () => {
    try {
      const blob = await exportJSON(inputs);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vaulto_model_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting JSON:', error);
      alert('Failed to export JSON');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-content">
          <img src="/logo.png" alt="Vaulto Logo" className="navbar-logo" />
          <h1>Vaulto Financial Model</h1>
          {isOfflineMode && (
            <span className="offline-indicator" title="Running in offline mode with local calculations">
              🔄 Offline Mode
            </span>
          )}
        </div>
        <span className="navbar-subtitle">Real-time Scenario Analysis</span>
      </div>
      
      <div className="navbar-controls">
        <div className="scenario-selector">
          <label>Scenario:</label>
          <button
            className={`scenario-btn ${currentScenario === 'worst' ? 'active worst' : ''}`}
            onClick={() => onScenarioChange('worst')}
          >
            Worst Case
          </button>
          <button
            className={`scenario-btn ${currentScenario === 'base' ? 'active base' : ''}`}
            onClick={() => onScenarioChange('base')}
          >
            Base Case
          </button>
          <button
            className={`scenario-btn ${currentScenario === 'best' ? 'active best' : ''}`}
            onClick={() => onScenarioChange('best')}
          >
            Best Case
          </button>
        </div>
        
        <div className="export-buttons">
          <button className="export-btn" onClick={handleExportCSV}>
            📊 Export CSV
          </button>
          <button className="export-btn" onClick={handleExportJSON}>
            📄 Export JSON
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



