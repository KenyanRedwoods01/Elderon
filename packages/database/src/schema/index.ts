import { pgTable, uuid, varchar, text, boolean, timestamp, integer, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'enterprise']);
export const planTypeEnum = pgEnum('plan_type', ['free', 'pro', 'enterprise']);
export const memberRoleEnum = pgEnum('member_role', ['owner', 'admin', 'member']);
export const projectStatusEnum = pgEnum('project_status', ['active', 'analyzing', 'migrating', 'completed', 'archived']);
export const analysisStatusEnum = pgEnum('analysis_status', ['pending', 'running', 'completed', 'failed']);
export const migrationStatusEnum = pgEnum('migration_status', ['planning', 'in_progress', 'testing', 'completed', 'failed']);

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password_hash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  avatar_url: text('avatar_url'),
  role: userRoleEnum('role').default('user').notNull(),
  email_verified: boolean('email_verified').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
  last_login_at: timestamp('last_login_at'),
});

// Organizations table
export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  logo_url: text('logo_url'),
  plan: planTypeEnum('plan').default('free').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Organization members table
export const organization_members = pgTable('organization_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  organization_id: uuid('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  user_id: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: memberRoleEnum('role').default('member').notNull(),
  joined_at: timestamp('joined_at').defaultNow().notNull(),
});

// Projects table
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  organization_id: uuid('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  repository_url: text('repository_url'),
  language: varchar('language', { length: 50 }),
  framework: varchar('framework', { length: 50 }),
  status: projectStatusEnum('status').default('active').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Code analysis table
export const code_analysis = pgTable('code_analysis', {
  id: uuid('id').defaultRandom().primaryKey(),
  project_id: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  analysis_type: varchar('analysis_type', { length: 50 }).notNull(),
  results: jsonb('results').notNull(),
  ai_model: varchar('ai_model', { length: 50 }).notNull(),
  started_at: timestamp('started_at').defaultNow().notNull(),
  completed_at: timestamp('completed_at'),
  status: analysisStatusEnum('status').default('pending').notNull(),
});

// Migrations history table
export const migrations_history = pgTable('migrations_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  project_id: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  source_framework: varchar('source_framework', { length: 50 }).notNull(),
  target_framework: varchar('target_framework', { length: 50 }).notNull(),
  migration_strategy: jsonb('migration_strategy'),
  progress: integer('progress').default(0).notNull(),
  status: migrationStatusEnum('status').default('planning').notNull(),
  started_at: timestamp('started_at').defaultNow().notNull(),
  completed_at: timestamp('completed_at'),
  ai_recommendations: jsonb('ai_recommendations'),
});

// Sessions table
export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 500 }).notNull().unique(),
  expires_at: timestamp('expires_at').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  ip_address: varchar('ip_address', { length: 45 }),
  user_agent: text('user_agent'),
});

// Audit logs table
export const audit_logs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  organization_id: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }),
  action: varchar('action', { length: 100 }).notNull(),
  resource_type: varchar('resource_type', { length: 50 }),
  resource_id: uuid('resource_id'),
  details: jsonb('details'),
  ip_address: varchar('ip_address', { length: 45 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
});
