import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://elderonai:password@localhost:5432/elderonai_dev';

const pool = new Pool({
  connectionString: DATABASE_URL,
  min: 2,
  max: 10,
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 10000,
});

export const db = drizzle(pool);

export async function testConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

export { pool };
