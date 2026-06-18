import { Platform } from 'react-native';

// In Expo, if we're on a physical device, localhost won't work.
// Use process.env.EXPO_PUBLIC_API_URL or fallback to computer's IP address.
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || (Platform.OS === 'android' 
  ? 'http://10.0.2.2:4000/api'
  : 'http://localhost:4000/api');

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

  let text = '';
  const data = await response.text().then(t => {
    text = t;
    try {
      return JSON.parse(t);
    } catch {
      return {};
    }
  }).catch(() => ({}));

  if (!response.ok) {
    const fallbackMessage = text ? `API Error (${response.status}): ${text.substring(0, 50)}` : `API Request Failed (${response.status})`;
    throw new Error(data.error || data.message || fallbackMessage);
  }

  return data;
}
