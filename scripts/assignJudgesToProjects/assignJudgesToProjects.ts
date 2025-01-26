const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function assignJudgesToProjects() {
  try {
    // Fetch all projects with their associated categories
    const projects = await prisma.project.findMany({
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    // Fetch all judges with their associated categories
    const judges = await prisma.judge.findMany({
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
    // Separate general track judges
    const generalJudges = judges.filter((judge: any) =>
      judge.categories.some(
        (jc: any) => jc.category.name.toLowerCase() === "general"
      )
    );
    for (const project of projects) {
      const projectCategoryIds = project.categories.map(
        (pc: any) => pc.categoryId
      );

      // Filter judges who have at least one matching category with the project (if not enough judges for that category, pull from general category)
      var eligibleJudges = judges.filter((judge: any) =>
        judge.categories.some((jc: any) =>
          projectCategoryIds.includes(jc.categoryId)
        )
      );

      const isGeneralProject = project.categories.some((pc: any) =>
        pc.category.name.toLowerCase().includes("general")
      );

      const numJudgesRequired = 2; //could either be judged 2 or 3 times

      // Add judges from the general track if not enough eligible judges are found
      if (eligibleJudges.length < numJudgesRequired) {
        const additionalJudges = generalJudges.filter(
          (judge: any) => !eligibleJudges.some((ej: any) => ej.id === judge.id)
        );
        eligibleJudges = eligibleJudges.concat(
          additionalJudges.slice(
            0,
            numJudgesRequired - eligibleJudges.length
          )
        );
      }

      // Randomly select 2–3 judges from the eligible pool
      const assignedJudges = eligibleJudges
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

      for (const judge of assignedJudges) {
        // Assign the judge to the project if not already assigned
        await prisma.judgeProject.upsert({
          where: {
            judgeId_projectId: {
              judgeId: judge.id,
              projectId: project.id,
            },
          },
          update: {},
          create: {
            judgeId: judge.id,
            projectId: project.id,
          },
        });
      }

      console.log(
        `Assigned ${assignedJudges.length} judges to project: ${project.name}`
      );
    }
  } catch (error) {
    console.error("Error assigning judges to projects:", error);
  } finally {
    await prisma.$disconnect();
  }
}

assignJudgesToProjects().catch(console.error);
