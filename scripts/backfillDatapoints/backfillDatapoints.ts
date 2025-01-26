const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { setTimeout: setTimeoutPromise } = require("timers/promises");

const SCRIPT_JUDGE_ID = 6969;

async function getCurrentProjectValues(): Promise<Map<string, number>> {
  try {
    const projectMap = new Map<string, number>();

    const projectCategories = await prisma.projectCategory.findMany({
      where: {
        categoryId: 5,
      },
      include: {
        project: true,
      },
    });

    // Store project values in map
    for (const pc of projectCategories) {
      projectMap.set(pc.projectId, pc.investmentAmount);
    }

    return projectMap;
  } catch (error) {
    console.error("Error getting project values:", error);
    return new Map();
  }
}

async function recordInvestmentHistory(categoryMaps: Map<string, number>) {
  // Round current time to nearest minute
  const now = new Date();
  now.setSeconds(0, 0); // Set seconds and milliseconds to 0

  try {
    const promises = Array.from(categoryMaps.entries()).map(
      async ([projectId, investmentValue]) => {
        // Get the latest entry for this project
        const latestEntry = await prisma.investmentHistory.findFirst({
          where: {
            projectId: projectId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        // If no entry exists at all, create the first one
        if (!latestEntry) {
          await prisma.investmentHistory.create({
            data: {
              projectValue: investmentValue,
              projectId: projectId,
              judgeId: SCRIPT_JUDGE_ID,
              createdAt: now,
            },
          });
          return;
        }

        // Round the latest entry time to nearest minute for comparison
        const latestEntryTime = new Date(latestEntry.createdAt);
        latestEntryTime.setSeconds(0, 0);

        // Check if the latest entry is older than 5 minutes
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
        if (latestEntryTime <= fiveMinutesAgo) {
          // Create new entry with updated timestamp
          await prisma.investmentHistory.create({
            data: {
              projectValue: investmentValue,
              projectId: projectId,
              judgeId: SCRIPT_JUDGE_ID,
              createdAt: now,
            },
          });
        }
        // If latest entry is within the last 5 minutes, do nothing
      }
    );

    // Wait for all operations to complete
    await Promise.all(promises);
  } catch (error) {
    console.error("Error recording investment history:", error);
  }
}

async function backfillDatapoints() {
  try {
    while (true) {
      const now = new Date();
      // Round down to the last 5-minute mark
      const lastInterval = new Date(
        Math.floor(now.getTime() / (5 * 60 * 1000)) * (5 * 60 * 1000)
      );
      // Add 5 minutes to get the next interval
      const nextInterval = new Date(lastInterval.getTime() + 5 * 60 * 1000);
      // Calculate milliseconds until next interval
      const msToNext = nextInterval.getTime() - now.getTime();

      console.log(
        `Waiting ${Math.floor(msToNext / 60000)} minutes and ${Math.floor((msToNext / 1000) % 60)} seconds until next recording (${nextInterval.toISOString()})...`
      );
      await setTimeoutPromise(msToNext);

      // Record exactly at the interval time
      console.log("Recording datapoints...");
      const categoryMaps = await getCurrentProjectValues();
      await recordInvestmentHistory(categoryMaps);
    }
  } catch (error) {
    console.error("Error in main loop:", error);
  } finally {
    await prisma.$disconnect();
  }
}

backfillDatapoints().catch(console.error);
