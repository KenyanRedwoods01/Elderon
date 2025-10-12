import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Config {
  DATABASE_URL: string;
  JWT_SECRET: string;
  MISTRAL_API_KEY: string;
  CODESTRAL_API_KEY: string;
  REDIS_URL: string;
  NODE_ENV: string;
  PORT?: number;
}

function validateEnv(): Config {
  const requiredVars = [
    'DATABASE_URL',
    'JWT_SECRET',
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env file or environment configuration.'
    );
  }

  return {
    DATABASE_URL: process.env.DATABASE_URL!,
    JWT_SECRET: process.env.JWT_SECRET!,
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || '',
    CODESTRAL_API_KEY: process.env.CODESTRAL_API_KEY || '',
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
  };
}

export const config = validateEnv();
