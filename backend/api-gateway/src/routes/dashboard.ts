import express from 'express';
import { pool } from '@elderonai/database';
import { requireAuth } from '@elderonai/auth';
import { AppError } from '../middleware/error';

const router = express.Router();

router.use(requireAuth);

// GET /api/dashboard/stats
router.get('/stats', async (req, res, next) => {
  try {
    const orgId = req.user!.organizationId;

    if (!orgId) {
      throw new AppError('Organization not found', 404);
    }

    // Get projects count
    const projectsResult = await pool.query(
      'SELECT COUNT(*) as count FROM projects WHERE organization_id = $1',
      [orgId]
    );

    // Get active analyses count
    const analysesResult = await pool.query(
      `SELECT COUNT(*) as count FROM code_analysis ca
       JOIN projects p ON ca.project_id = p.id
       WHERE p.organization_id = $1 AND ca.status IN ('pending', 'running')`,
      [orgId]
    );

    // Get completed migrations count
    const migrationsResult = await pool.query(
      `SELECT COUNT(*) as count FROM migrations_history mh
       JOIN projects p ON mh.project_id = p.id
       WHERE p.organization_id = $1 AND mh.status = 'completed'`,
      [orgId]
    );

    // Get team members count
    const membersResult = await pool.query(
      'SELECT COUNT(*) as count FROM organization_members WHERE organization_id = $1',
      [orgId]
    );

    res.json({
      success: true,
      projects_count: parseInt(projectsResult.rows[0].count),
      active_analyses: parseInt(analysesResult.rows[0].count),
      completed_migrations: parseInt(migrationsResult.rows[0].count),
      team_members: parseInt(membersResult.rows[0].count),
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/dashboard/activity
router.get('/activity', async (req, res, next) => {
  try {
    const orgId = req.user!.organizationId;
    const { limit = 10 } = req.query;

    if (!orgId) {
      throw new AppError('Organization not found', 404);
    }

    const result = await pool.query(
      `SELECT al.*, u.name as user_name, u.email as user_email
       FROM audit_logs al
       LEFT JOIN users u ON al.user_id = u.id
       WHERE al.organization_id = $1
       ORDER BY al.created_at DESC
       LIMIT $2`,
      [orgId, Number(limit)]
    );

    res.json({
      success: true,
      activity: result.rows,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
