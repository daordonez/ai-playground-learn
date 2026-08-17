---
id: foundry
module: 7
order: 7
title: Azure Foundry as a model gateway
duration: 60 min
prerequisites: [FastAPI, Secrets]
objectives: [Abstract providers, Design SSE streaming]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: "Microsoft Learn - Azure AI Foundry", description: "Architecture and model usage in Azure AI Foundry.", url: https://learn.microsoft.com/azure/ai-foundry/, provider: "Microsoft Learn" }, { type: video, title: "Azure AI Foundry overview", description: "Visual context for Foundry components.", url: https://www.youtube.com/watch?v=vRZFQj5O3Yc, provider: "Microsoft Azure" }]
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
