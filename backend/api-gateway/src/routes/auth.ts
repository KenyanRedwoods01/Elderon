import express from 'express';
import { z } from 'zod';
import { pool } from '@elderonai/database';
import { hashPassword, verifyPassword, generateToken, requireAuth } from '@elderonai/auth';
import { isValidEmail } from '@elderonai/utils';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/error';

const router = express.Router();

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// POST /api/auth/register
router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      throw new AppError('Email already registered', 409);
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, name, role, email_verified, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING id, email, name, role, email_verified, created_at`,
      [email, passwordHash, name, 'user', false]
    );

    const user = result.rows[0];

    // Create default organization
    const orgResult = await pool.query(
      `INSERT INTO organizations (name, slug, plan, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())
       RETURNING id`,
      [`${name}'s Organization`, email.split('@')[0], 'free']
    );

    const orgId = orgResult.rows[0].id;

    // Add user to organization as owner
    await pool.query(
      `INSERT INTO organization_members (organization_id, user_id, role, joined_at)
       VALUES ($1, $2, $3, NOW())`,
      [orgId, user.id, 'owner']
    );

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId: orgId,
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login
router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await pool.query(
      'SELECT id, email, password_hash, name, role FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      throw new AppError('Invalid email or password', 401);
    }

    const user = result.rows[0];

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Get user's organization
    const orgResult = await pool.query(
      `SELECT organization_id FROM organization_members WHERE user_id = $1 LIMIT 1`,
      [user.id]
    );

    const organizationId = orgResult.rows[0]?.organization_id;

    // Update last login
    await pool.query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [user.id]);

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId,
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT id, email, name, avatar_url, role, email_verified, created_at, updated_at, last_login_at
       FROM users WHERE id = $1`,
      [req.user!.userId]
    );

    if (result.rows.length === 0) {
      throw new AppError('User not found', 404);
    }

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/logout
router.post('/logout', requireAuth, async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
