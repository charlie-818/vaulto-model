import axios from 'axios';
import { ModelInputs, ModelResults } from './types';
import localModel from './localModel';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 second timeout
});

// Check if API is available
const isApiAvailable = async (): Promise<boolean> => {
  try {
    await api.get('/health');
    return true;
  } catch (error) {
    console.warn('API not available, using local calculations:', error);
    return false;
  }
};

export const calculateModel = async (inputs: ModelInputs): Promise<ModelResults> => {
  try {
    const apiAvailable = await isApiAvailable();
    if (apiAvailable) {
      const response = await api.post('/calculate', inputs);
      return response.data.data;
    }
  } catch (error) {
    console.warn('API call failed, falling back to local calculations:', error);
  }
  
  // Fallback to local calculations
  return localModel.calculate(inputs);
};

export const getScenario = async (scenario: string): Promise<ModelInputs> => {
  try {
    const apiAvailable = await isApiAvailable();
    if (apiAvailable) {
      const response = await api.post('/scenario', { scenario });
      return response.data.data;
    }
  } catch (error) {
    console.warn('API call failed, falling back to local scenarios:', error);
  }
  
  // Fallback to local scenarios
  const scenarios = localModel.getScenarios();
  if (scenario in scenarios) {
    return scenarios[scenario as keyof typeof scenarios];
  }
  throw new Error(`Scenario ${scenario} not found`);
};

export const exportCSV = async (inputs: ModelInputs): Promise<Blob> => {
  try {
    const apiAvailable = await isApiAvailable();
    if (apiAvailable) {
      const response = await api.post('/export/csv', inputs, {
        responseType: 'blob',
      });
      return response.data;
    }
  } catch (error) {
    console.warn('API export failed, using local export:', error);
  }
  
  // Fallback to local CSV generation
  const results = localModel.calculate(inputs);
  const csvContent = generateCSV(results);
  return new Blob([csvContent], { type: 'text/csv' });
};

export const exportJSON = async (inputs: ModelInputs): Promise<Blob> => {
  try {
    const apiAvailable = await isApiAvailable();
    if (apiAvailable) {
      const response = await api.post('/export/json', inputs, {
        responseType: 'blob',
      });
      return response.data;
    }
  } catch (error) {
    console.warn('API export failed, using local export:', error);
  }
  
  // Fallback to local JSON generation
  const results = localModel.calculate(inputs);
  const jsonContent = JSON.stringify(results, null, 2);
  return new Blob([jsonContent], { type: 'application/json' });
};

// Helper function to generate CSV from results
const generateCSV = (results: ModelResults): string => {
  const { monthly_data } = results;
  const headers = Object.keys(monthly_data);
  const rows = monthly_data.Month.map((_, index) => 
    headers.map(header => monthly_data[header as keyof typeof monthly_data][index]).join(',')
  );
  
  return [headers.join(','), ...rows].join('\n');
};

export default api;



