// This file runs once after all tests
// It clears the testing database

import { execSync } from 'child_process';

module.exports = async () => {
  console.log('Resetting the database...');

  try {
    // Use Prisma's db push with --force-reset flag to reset the database
    execSync('npx prisma db push --force-reset', {
      stdio: 'inherit',
    });

    console.log('Database reset successfully.');
  } catch (error) {
    console.error('Error resetting the database:', error);
    process.exit(1); // Exit with an error if the reset fails
  }
};
