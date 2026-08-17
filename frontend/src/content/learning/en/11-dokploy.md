---
id: dokploy
module: 11
order: 11
title: Automatic deployment with Dokploy
duration: 45 min
prerequisites: [Containers, GHCR]
objectives: [Configure deployment, Design rollback]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: "Dokploy Documentation", description: "Consult deployments, variables, and volumes in Dokploy.", url: https://docs.dokploy.com/, provider: "Dokploy" }, { type: video, title: "Docker deployment overview", description: "Reinforce the operating model of a published image.", url: https://www.youtube.com/watch?v=0qotVMX-J5s, provider: "TechWorld with Nana" }]
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
- Configuring Dokploy with a mutable tag that does not identify the exact deployed artifact.
- Omitting persistent storage or the health check and discovering failures only after deployment.
## Next step
Use this decision as the input to the next module.
