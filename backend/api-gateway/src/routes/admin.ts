import express from 'express';
import { pool } from '@elderonai/database';
import { requireAuth, requireRole } from '@elderonai/auth';

const router = express.Router();

// All routes require admin role
router.use(requireAuth);
router.use(requireRole(['admin']));

// GET /api/admin/stats
router.get('/stats', async (req, res, next) => {
  try {
    const [users, organizations, projects, analyses] = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM users'),
      pool.query('SELECT COUNT(*) as count FROM organizations'),
      pool.query('SELECT COUNT(*) as count FROM projects'),
      pool.query("SELECT COUNT(*) as count FROM code_analysis WHERE status IN ('running', 'pending')"),
    ]);

    res.json({
      success: true,
      total_users: parseInt(users.rows[0].count),
      total_organizations: parseInt(organizations.rows[0].count),
      total_projects: parseInt(projects.rows[0].count),
      active_analyses: parseInt(analyses.rows[0].count),
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/users
router.get('/users', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = `
      SELECT id, email, name, role, email_verified, created_at, last_login_at
      FROM users
    `;
    const params: any[] = [];

    if (search) {
      query += ` WHERE email ILIKE $1 OR name ILIKE $1`;
      params.push(`%${search}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(Number(limit), offset);

    const result = await pool.query(query, params);

    // Get total
    let countQuery = 'SELECT COUNT(*) FROM users';
    const countParams: any[] = [];
    if (search) {
      countQuery += ` WHERE email ILIKE $1 OR name ILIKE $1`;
      countParams.push(`%${search}%`);
    }
    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      data: result.rows,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/health
router.get('/health', async (req, res, next) => {
  try {
    // Check database
    const dbHealth = await pool.query('SELECT NOW()');

    res.json({
      success: true,
      api_gateway: 'healthy',
      database: dbHealth.rows.length > 0 ? 'healthy' : 'unhealthy',
      redis: 'not_configured',
      services: {
        code_analyzer: 'not_started',
        ai_orchestrator: 'not_started',
        migration_engine: 'not_started',
        realtime_service: 'not_started',
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
