export interface User {
  id: string;
  workspaceId: string;
  role: string;
  email?: string; // If we can infer it or we just show role
}

export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('kavach_token');
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('kavach_token');
    window.location.reload();
  }
};
