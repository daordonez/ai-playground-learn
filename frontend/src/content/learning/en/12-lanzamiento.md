---
id: lanzamiento
module: 12
order: 12
title: MVP launch and operations
duration: 40 min
prerequisites: [Dokploy, CI/CD]
objectives: [Define acceptance, Prepare operations]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: "Google SRE Workbook", description: "Choose service signals and operating practices.", url: https://sre.google/workbook/monitoring/, provider: "Google SRE" }, { type: video, title: "SRE explained", description: "Relate reliability, users, and continuous operation.", url: https://www.youtube.com/watch?v=uTEL8Ff1Zvk, provider: "Google Cloud Tech" }]
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
## Common mistakes
- Declaring the release successful without testing a complete conversation from the browser.
- Failing to document rollback to a known SHA image before making a production change.
## Next step
Use this decision as the input to the next module.
