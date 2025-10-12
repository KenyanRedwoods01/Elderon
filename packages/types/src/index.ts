// User types
export type UserRole = 'user' | 'admin' | 'enterprise';

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: UserRole;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
  last_login_at: Date | null;
}

// Organization types
export type PlanType = 'free' | 'pro' | 'enterprise';
export type MemberRole = 'owner' | 'admin' | 'member';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  plan: PlanType;
  created_at: Date;
  updated_at: Date;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: MemberRole;
  joined_at: Date;
}

// Project types
export type ProjectStatus = 'active' | 'analyzing' | 'migrating' | 'completed' | 'archived';

export interface Project {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  repository_url: string | null;
  language: string | null;
  framework: string | null;
  status: ProjectStatus;
  created_at: Date;
  updated_at: Date;
}

// Analysis types
export type AnalysisStatus = 'pending' | 'running' | 'completed' | 'failed';
export type AIModel = 'mistral' | 'codestral';

export interface CodeAnalysis {
  id: string;
  project_id: string;
  analysis_type: string;
  results: Record<string, any>;
  ai_model: AIModel;
  started_at: Date;
  completed_at: Date | null;
  status: AnalysisStatus;
}

// Migration types
export type MigrationStatus = 'planning' | 'in_progress' | 'testing' | 'completed' | 'failed';

export interface MigrationHistory {
  id: string;
  project_id: string;
  source_framework: string;
  target_framework: string;
  migration_strategy: Record<string, any> | null;
  progress: number;
  status: MigrationStatus;
  started_at: Date;
  completed_at: Date | null;
  ai_recommendations: Record<string, any> | null;
}

// Session types
export interface Session {
  id: string;
  user_id: string;
  token: string;
  expires_at: Date;
  created_at: Date;
  ip_address: string | null;
  user_agent: string | null;
}

// Audit log types
export interface AuditLog {
  id: string;
  user_id: string | null;
  organization_id: string | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  details: Record<string, any> | null;
  ip_address: string | null;
  created_at: Date;
}

// API response types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Dashboard types
export interface DashboardStats {
  projects_count: number;
  active_analyses: number;
  completed_migrations: number;
  team_members: number;
}
