import express from 'express';
import { pool } from '@elderonai/database';
import { requireAuth } from '@elderonai/auth';
import { slugify } from '@elderonai/utils';
import { AppError } from '../middleware/error';

const router = express.Router();

router.use(requireAuth);

// GET /api/organizations
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user!.userId;

    const result = await pool.query(
      `SELECT o.*, om.role as user_role
       FROM organizations o
       JOIN organization_members om ON o.id = om.organization_id
       WHERE om.user_id = $1
       ORDER BY o.created_at DESC`,
      [userId]
    );

    res.json({
      success: true,
      organizations: result.rows,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/organizations/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    // Check if user is member
    const memberCheck = await pool.query(
      'SELECT role FROM organization_members WHERE organization_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (memberCheck.rows.length === 0) {
      throw new AppError('Access denied', 403);
    }

    const result = await pool.query('SELECT * FROM organizations WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      throw new AppError('Organization not found', 404);
    }

    res.json({
      success: true,
      organization: result.rows[0],
      role: memberCheck.rows[0].role,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
