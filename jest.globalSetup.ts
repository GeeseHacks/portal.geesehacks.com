// This file runs once before all tests
// It applies the Prisma migrations to the test database and clears the database

import { execSync } from 'child_process';

module.exports = async () => {
  console.log('Running Prisma migrations...');

  try {
    // Reset and migrate the database
    execSync('npx prisma migrate reset --force', {
      stdio: 'inherit',
    });

    console.log('Prisma migrations applied successfully.');

    // Generate the Prisma Client
    console.log('Generating Prisma Client...');
    execSync('npx prisma generate', {
      stdio: 'inherit',
    });

    console.log('Prisma Client generated successfully.');
  } catch (error) {
    console.error('Error applying Prisma migrations:', error);
    process.exit(1); // Exit with an error if migrations fail
  }
};
