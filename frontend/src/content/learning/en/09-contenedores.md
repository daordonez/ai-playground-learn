---
id: contenedores
module: 9
order: 9
title: Containers and local operations
duration: 45 min
prerequisites: [Docker]
objectives: [Create a reproducible image, Add health checks]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: "Docker Compose", description: "Official reference for multi-container applications.", url: https://docs.docker.com/compose/, provider: "Docker" }, { type: video, title: "Docker in 100 Seconds", description: "A recap of images, containers, and isolation.", url: https://www.youtube.com/watch?v=Gjnup-PuquQ, provider: "Fireship" }]
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
- Including `.env` files, credentials, or the SQLite database in the published image.
- Running as a privileged user and without persistent storage for `/app/data`.
## Next step
Use this decision as the input to the next module.
