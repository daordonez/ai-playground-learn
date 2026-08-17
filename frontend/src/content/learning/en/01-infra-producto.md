---
id: infra-producto
module: 1
order: 1
title: From infrastructure to product
duration: 35 min
prerequisites: [Docker, Git]
objectives: [Define the MVP, Identify responsibility boundaries]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: "GitHub Docs - Planning and tracking work", description: "Turn a user need into a verifiable scope.", url: https://docs.github.com/en/issues/tracking-your-work-with-issues, provider: "GitHub" }, { type: video, title: "MVP explained", description: "Learn how to reduce an idea to its first useful version.", url: https://www.youtube.com/watch?v=1hHMwLxN6EM, provider: "Y Combinator" }]
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
- Turning the MVP into an unprioritized feature list instead of validating the minimum chat flow.
- Letting React call Foundry directly and exposing backend decisions or secrets.
## Next step
Use this decision as the input to the next module.
