import { User } from '@elderonai/types';

const TOKEN_KEY = 'elderonai_token';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function getUser(): User | null {
  const token = getToken();
  if (!token) return null;

  try {
    // Decode JWT token (simple base64 decode, not validation)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.userId,
      email: payload.email,
      name: payload.name || null,
      avatar_url: null,
      role: payload.role,
      email_verified: true,
      created_at: new Date(),
      updated_at: new Date(),
      last_login_at: null,
    };
  } catch {
    return null;
  }
}
