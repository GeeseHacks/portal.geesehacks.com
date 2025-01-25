import prisma from "../../lib/prisma";

const SCRIPT_JUDGE_ID = 6969;

const PROJECT_IDS = [
  "11111111-1111-1111-1111-111111111111",
  "22222222-2222-2222-2222-222222222222",
  "33333333-3333-3333-3333-333333333333",
  "44444444-4444-4444-4444-444444444444",
  "55555555-5555-5555-5555-555555555555",
];

async function generateSampleDatapoints() {
  try {
    // Set start time to 12 PM today
    const startTime = new Date();
    startTime.setHours(12, 0, 0, 0);

    // Set end time to 3 PM today
    const endTime = new Date(startTime);
    endTime.setHours(15, 0, 0, 0);

    // Loop through each 5-minute interval
    for (
      let currentTime = startTime;
      currentTime <= endTime;
      currentTime = new Date(currentTime.getTime() + 5 * 60000)
    ) {
      for (const projectId of PROJECT_IDS) {
        const value = Math.floor(Math.random() * 5001);

        await prisma.investmentHistory.create({
          data: {
            projectValue: value,
            projectId: projectId,
            judgeId: SCRIPT_JUDGE_ID,
            createdAt: currentTime,
          },
        });
        console.log(
          `Recorded value ${value} for project ${projectId} at ${currentTime.toISOString()}`
        );
      }
    }

    console.log("Finished generating sample data");
  } catch (error) {
    console.error("Error generating sample data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

generateSampleDatapoints().catch(console.error);
