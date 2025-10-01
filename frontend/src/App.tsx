import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ControlPanel from './components/ControlPanel';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { ModelInputs, ModelResults } from './types';
import { calculateModel, getScenario } from './api';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<ModelInputs>({
    InitialUsers: 1000,
    MonthlyGrowthRate: 15.0,
    ChurnRate: 5.0,
    CAC: 50.0,
    ARPU_Free: 0.0,
    ARPU_Premium: 7.0,
    ARPU_StablecoinYield: 2.5,
    ARPU_AssetFee: 3.0,
    ARPU_API: 1.5,
    PremiumConversionRate: 20.0,
    AvgTransactionVolume: 500.0,
    AverageLifetimeMonths: 24.0,
    FixedCosts_Payroll: 50000.0,
    FixedCosts_RnD: 30000.0,
    FixedCosts_Operations: 20000.0,
    VariableCost_KYC: 5.0,
    VariableCost_Infrastructure: 0.5,
    ProjectionMonths: 36,
  });

  const [results, setResults] = useState<ModelResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentScenario, setCurrentScenario] = useState<string>('base');

  const handleCalculate = useCallback(async () => {
    setLoading(true);
    try {
      const data = await calculateModel(inputs);
      setResults(data);
    } catch (error) {
      console.error('Error calculating model:', error);
    } finally {
      setLoading(false);
    }
  }, [inputs]);

  // Calculate on mount and when inputs change
  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  const handleInputChange = (key: keyof ModelInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleScenarioChange = async (scenario: string) => {
    setCurrentScenario(scenario);
    setLoading(true);
    try {
      const scenarioInputs = await getScenario(scenario);
      setInputs(scenarioInputs);
    } catch (error) {
      console.error('Error loading scenario:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Navbar 
        currentScenario={currentScenario} 
        onScenarioChange={handleScenarioChange}
        inputs={inputs}
      />
      <div className="app-container">
        <ControlPanel 
          inputs={inputs} 
          onInputChange={handleInputChange}
        />
        <Dashboard 
          results={results} 
          loading={loading}
        />
      </div>
    </div>
  );
};

export default App;



