import express from 'express';
import { z } from 'zod';
import { pool } from '@elderonai/database';
import { requireAuth } from '@elderonai/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/error';

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

const createProjectSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  repository_url: z.string().url().optional().or(z.literal('')),
  language: z.string().max(50).optional(),
  framework: z.string().max(50).optional(),
});

// GET /api/projects
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const orgId = req.user!.organizationId;
    if (!orgId) {
      throw new AppError('Organization not found', 404);
    }

    // Get projects with search
    let query = `
      SELECT id, organization_id, name, description, repository_url, language, framework, status, created_at, updated_at
      FROM projects
      WHERE organization_id = $1
    `;
    const params: any[] = [orgId];

    if (search) {
      query += ` AND (name ILIKE $2 OR description ILIKE $2)`;
      params.push(`%${search}%`);
    }

    query += ` ORDER BY updated_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(Number(limit), offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM projects WHERE organization_id = $1';
    const countParams: any[] = [orgId];
    if (search) {
      countQuery += ` AND (name ILIKE $2 OR description ILIKE $2)`;
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
      has_more: offset + result.rows.length < total,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/projects
router.post('/', validate(createProjectSchema), async (req, res, next) => {
  try {
    const { name, description, repository_url, language, framework } = req.body;
    const orgId = req.user!.organizationId;

    if (!orgId) {
      throw new AppError('Organization not found', 404);
    }

    const result = await pool.query(
      `INSERT INTO projects (organization_id, name, description, repository_url, language, framework, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
       RETURNING *`,
      [orgId, name, description || null, repository_url || null, language || null, framework || null, 'active']
    );

    res.status(201).json({
      success: true,
      project: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const orgId = req.user!.organizationId;

    const result = await pool.query(
      `SELECT * FROM projects WHERE id = $1 AND organization_id = $2`,
      [id, orgId]
    );

    if (result.rows.length === 0) {
      throw new AppError('Project not found', 404);
    }

    res.json({
      success: true,
      project: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/projects/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, repository_url, language, framework, status } = req.body;
    const orgId = req.user!.organizationId;

    // Check ownership
    const check = await pool.query(
      'SELECT id FROM projects WHERE id = $1 AND organization_id = $2',
      [id, orgId]
    );

    if (check.rows.length === 0) {
      throw new AppError('Project not found', 404);
    }

    const result = await pool.query(
      `UPDATE projects
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           repository_url = COALESCE($3, repository_url),
           language = COALESCE($4, language),
           framework = COALESCE($5, framework),
           status = COALESCE($6, status),
           updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [name, description, repository_url, language, framework, status, id]
    );

    res.json({
      success: true,
      project: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const orgId = req.user!.organizationId;

    const result = await pool.query(
      'DELETE FROM projects WHERE id = $1 AND organization_id = $2 RETURNING id',
      [id, orgId]
    );

    if (result.rows.length === 0) {
      throw new AppError('Project not found', 404);
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
