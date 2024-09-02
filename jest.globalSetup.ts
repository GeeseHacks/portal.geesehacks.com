// This file runs once before all tests
// It applies the Prisma migrations to the test database

import { execSync } from 'child_process';

module.exports = async () => {
  console.log('Running Prisma migrations...');

  try {
    // Run the migrations once before all tests
    execSync('npx prisma migrate reset --force', {
      stdio: 'inherit',
    });

    console.log('Prisma migrations applied successfully.');
  } catch (error) {
    console.error('Error applying Prisma migrations:', error);
    process.exit(1); // Exit with an error if migrations fail
  }
};
