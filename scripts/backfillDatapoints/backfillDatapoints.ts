const { PrismaClient } = require("@prisma/client");
const { setTimeout: setTimeoutPromise } = require("timers/promises");

const prisma = new PrismaClient();

const SCRIPT_JUDGE_ID = 6969;

async function getCurrentProjectValues(): Promise<
  Map<string, Map<string, number>>
> {
  // Map of category name to project values
  const categoryMaps = new Map<string, Map<string, number>>();

  try {
    // Get all categories
    const categories = await prisma.category.findMany();

    // For each category, get all projects and their values
    for (const category of categories) {
      const projectMap = new Map<string, number>();

      const projectCategories = await prisma.projectCategory.findMany({
        where: {
          categoryId: category.id,
        },
        include: {
          project: true,
        },
      });

      // Store project values in map
      for (const pc of projectCategories) {
        projectMap.set(pc.projectId, pc.investmentAmount);
      }

      categoryMaps.set(category.name, projectMap);
    }

    return categoryMaps;
  } catch (error) {
    console.error("Error getting project values:", error);
    return new Map();
  }
}

async function recordInvestmentHistory(
  categoryMaps: Map<string, Map<string, number>>
) {
  const now = new Date();

  try {
    // For each category
    categoryMaps.forEach((projectMap, categoryName) => {
      projectMap.forEach(async (value, projectId) => {
        // Check if entry exists for current timestamp
        const existingEntry = await prisma.investmentHistory.findFirst({
          where: {
            projectId: projectId,
            createdAt: {
              gte: new Date(now.getTime() - 5000), // Within last 5 seconds
              lte: now,
            },
          },
        });

        // If no entry exists, create one
        if (!existingEntry) {
          await prisma.investmentHistory.create({
            data: {
              projectValue: value,
              projectId: projectId,
              judgeId: SCRIPT_JUDGE_ID,
              createdAt: now,
            },
          });
        }
      });
    });
  } catch (error) {
    console.error("Error recording investment history:", error);
  }
}

async function backfillDatapoints() {
  try {
    while (true) {
      const now = new Date();
      const minutesToNext = 5 - (now.getMinutes() % 5);
      var msToNext =
        minutesToNext * 60 * 1000 -
        (now.getSeconds() * 1000 + now.getMilliseconds());
      // Debug only
      msToNext = 5000;
      console.log(
        `Waiting ${minutesToNext} minutes and ${Math.floor((msToNext / 1000) % 60)} seconds until next recording...`
      );
      await setTimeoutPromise(msToNext);

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
