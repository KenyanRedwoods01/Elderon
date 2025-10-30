import { pool } from './client';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const client = await pool.connect();

  try {
    console.log('🌱 Starting database seed...');

    // Create admin user
    const passwordHash = await bcrypt.hash('admin123', 10);
    const adminResult = await client.query(
      `INSERT INTO users (email, password_hash, name, role, email_verified)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      ['admin@elderon.ai', passwordHash, 'Admin User', 'admin', true]
    );

    const adminId = adminResult.rows[0]?.id;

    if (adminId) {
      console.log('✅ Admin user created');

      // Create demo organization
      const orgResult = await client.query(
        `INSERT INTO organizations (name, slug, plan)
         VALUES ($1, $2, $3)
         ON CONFLICT (slug) DO NOTHING
         RETURNING id`,
        ['Demo Organization', 'demo', 'pro']
      );

      const orgId = orgResult.rows[0]?.id;

      if (orgId) {
        console.log('✅ Demo organization created');

        // Add admin as owner of demo organization
        await client.query(
          `INSERT INTO organization_members (organization_id, user_id, role)
           VALUES ($1, $2, $3)
           ON CONFLICT DO NOTHING`,
          [orgId, adminId, 'owner']
        );

        console.log('✅ Admin added to organization');

        // Create sample project
        await client.query(
          `INSERT INTO projects (organization_id, name, description, language, framework, status)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT DO NOTHING`,
          [
            orgId,
            'Sample Project',
            'A demo project for testing',
            'TypeScript',
            'React',
            'active',
          ]
        );

        console.log('✅ Sample project created');
      }
    }

    console.log('🎉 Database seeding completed!');
    console.log('\n📝 Admin credentials:');
    console.log('   Email: admin@elderon.ai');
    console.log('   Password: admin123');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
