import axios from 'axios';
import { ModelInputs, ModelResults } from './types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const calculateModel = async (inputs: ModelInputs): Promise<ModelResults> => {
  const response = await api.post('/calculate', inputs);
  return response.data.data;
};

export const getScenario = async (scenario: string): Promise<ModelInputs> => {
  const response = await api.post('/scenario', { scenario });
  return response.data.data;
};

export const exportCSV = async (inputs: ModelInputs): Promise<Blob> => {
  const response = await api.post('/export/csv', inputs, {
    responseType: 'blob',
  });
  return response.data;
};

export const exportJSON = async (inputs: ModelInputs): Promise<Blob> => {
  const response = await api.post('/export/json', inputs, {
    responseType: 'blob',
  });
  return response.data;
};

export default api;



