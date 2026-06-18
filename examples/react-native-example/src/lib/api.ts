import { Platform } from 'react-native';

// Handle Android Emulator localhost mapping
export const API_BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:4000/api'
  : 'http://localhost:4000/api';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = undefined; // We'll manage this in AsyncStorage or context later if needed
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint.replace('/api', '')}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'API Request Failed');
  }

  return data;
}
