// API Configuration
export const API_VERSION = 'v1';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Password Requirements
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;

// Session
export const SESSION_EXPIRY_DAYS = 7;

// Analysis
export const ANALYSIS_TIMEOUT_MS = 300000; // 5 minutes

// Rate Limiting
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 100;

// File Upload
export const MAX_FILE_SIZE_MB = 10;
export const ALLOWED_FILE_TYPES = [
  'application/json',
  'text/plain',
  'application/javascript',
  'text/javascript',
  'application/typescript',
  'text/x-python',
  'text/x-java-source',
];

// Organization
export const MAX_ORG_NAME_LENGTH = 100;
export const MAX_ORG_SLUG_LENGTH = 50;

// Project
export const MAX_PROJECT_NAME_LENGTH = 100;
export const MAX_PROJECT_DESCRIPTION_LENGTH = 500;
