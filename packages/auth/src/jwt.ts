import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  organizationId?: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate a JWT token
 * @param payload - Token payload
 * @param expiresIn - Token expiration (default: 7d)
 * @returns JWT token string
 */
export function generateToken(payload: Omit<TokenPayload, 'iat' | 'exp'>, expiresIn: string = JWT_EXPIRES_IN): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verify and decode a JWT token
 * @param token - JWT token string
 * @returns Decoded token payload or null if invalid
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Refresh a JWT token (generate new token from existing if not expired)
 * @param token - Existing JWT token
 * @returns New JWT token or null if original is invalid
 */
export function refreshToken(token: string): string | null {
  const decoded = verifyToken(token);
  if (!decoded) return null;

  // Remove iat and exp from payload to generate fresh token
  const { iat, exp, ...payload } = decoded;
  return generateToken(payload);
}
