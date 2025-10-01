import React from 'react';
import './ControlPanel.css';
import { ModelInputs } from '../types';

interface ControlPanelProps {
  inputs: ModelInputs;
  onInputChange: (key: keyof ModelInputs, value: number) => void;
}

interface InputField {
  key: keyof ModelInputs;
  label: string;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ inputs, onInputChange }) => {
  const inputFields: { [category: string]: InputField[] } = {
    'User Growth & Acquisition': [
      { key: 'InitialUsers', label: 'Initial Users', min: 0, max: 50000, step: 100 },
      { key: 'MonthlyGrowthRate', label: 'Monthly Growth Rate', min: 0, max: 50, step: 0.5, suffix: '%' },
      { key: 'ChurnRate', label: 'Churn Rate', min: 0, max: 20, step: 0.5, suffix: '%' },
      { key: 'CAC', label: 'CAC per User', min: 0, max: 200, step: 5, prefix: '$' },
    ],
    'Revenue Drivers': [
      { key: 'ARPU_Premium', label: 'ARPU - Premium', min: 0, max: 50, step: 0.5, prefix: '$' },
      { key: 'ARPU_StablecoinYield', label: 'ARPU - Stablecoin Yield', min: 0, max: 20, step: 0.5, prefix: '$' },
      { key: 'ARPU_AssetFee', label: 'ARPU - Asset Fee', min: 0, max: 20, step: 0.5, prefix: '$' },
      { key: 'ARPU_API', label: 'ARPU - API/AI', min: 0, max: 10, step: 0.5, prefix: '$' },
      { key: 'PremiumConversionRate', label: 'Premium Conversion Rate', min: 0, max: 50, step: 1, suffix: '%' },
    ],
    'LTV Calculation': [
      { key: 'AverageLifetimeMonths', label: 'Avg Lifetime (Months)', min: 6, max: 60, step: 1 },
    ],
    'Cost Structure': [
      { key: 'FixedCosts_Payroll', label: 'Payroll (Monthly)', min: 0, max: 200000, step: 5000, prefix: '$' },
      { key: 'FixedCosts_RnD', label: 'R&D (Monthly)', min: 0, max: 100000, step: 5000, prefix: '$' },
      { key: 'FixedCosts_Operations', label: 'Operations (Monthly)', min: 0, max: 100000, step: 5000, prefix: '$' },
      { key: 'VariableCost_KYC', label: 'KYC Cost per User', min: 0, max: 20, step: 0.5, prefix: '$' },
      { key: 'VariableCost_Infrastructure', label: 'Infrastructure per User', min: 0, max: 5, step: 0.1, prefix: '$' },
    ],
    'Projection Settings': [
      { key: 'ProjectionMonths', label: 'Projection Period (Months)', min: 12, max: 60, step: 6 },
    ],
  };

  return (
    <div className="control-panel">
      <div className="control-panel-header">
        <h2>⚙️ Control Panel</h2>
        <p>Adjust assumptions to see real-time impact</p>
      </div>
      
      <div className="control-panel-content">
        {Object.entries(inputFields).map(([category, fields]) => (
          <div key={category} className="control-section">
            <h3>{category}</h3>
            {fields.map((field) => (
              <div key={field.key} className="input-group">
                <label>{field.label}</label>
                <div className="input-wrapper">
                  {field.prefix && <span className="input-prefix">{field.prefix}</span>}
                  <input
                    type="number"
                    value={inputs[field.key]}
                    onChange={(e) => onInputChange(field.key, parseFloat(e.target.value) || 0)}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                  />
                  {field.suffix && <span className="input-suffix">{field.suffix}</span>}
                </div>
                <input
                  type="range"
                  value={inputs[field.key]}
                  onChange={(e) => onInputChange(field.key, parseFloat(e.target.value))}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  className="slider"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;



