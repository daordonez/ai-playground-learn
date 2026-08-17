---
id: git-flujo
module: 2
order: 2
title: Project engineering with Git
duration: 40 min
prerequisites: [Cloned repository, Git]
objectives: [Use a pull request workflow, Separate small changes]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: "GitHub Docs - About pull requests", description: "Learn the review and integration contract.", url: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests, provider: "GitHub" }, { type: video, title: "Git and GitHub for beginners", description: "A visual review of branches, commits, and pull requests.", url: https://www.youtube.com/watch?v=RGOj5yH7evk, provider: "freeCodeCamp" }]
---
# Learn by building
Each module connects a technical decision to a concrete outcome in the AI Playground.
## Key concepts
- **Boundary:** the place where a responsibility is owned.
- **Contract:** the expected shape of a collaboration.
## Step by step
1. Identify the user-facing outcome.
2. Put one responsibility in each layer.
3. Verify the result before moving on.
## Practical example
Apply the module decision to the playground and keep the implementation small, explicit, and testable.
## Exercise
Write the decision you would make for this module and the evidence that proves it works.
## Check
You can explain the boundary, its contract, and the failure it prevents.
## Common mistake
Changing several responsibilities at once and losing a clear source of truth.
## Next step
Use this decision as the input to the next module.
