---
id: fastapi
module: 4
order: 4
title: FastAPI and HTTP contracts
duration: 55 min
prerequisites: [Basic Python, HTTP]
objectives: [Design endpoints, Validate input with Pydantic]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: "FastAPI Tutorial - Request Body", description: "Define and validate input contracts with Pydantic.", url: https://fastapi.tiangolo.com/tutorial/body/, provider: "FastAPI" }, { type: video, title: "FastAPI Course", description: "A practical introduction to routes and validation.", url: https://www.youtube.com/watch?v=7t2alSnE2-I, provider: "freeCodeCamp" }]
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
- Accepting unvalidated request bodies and leaving predictable input errors to the provider.
- Coupling the HTTP route to the Foundry SDK instead of isolating it behind a service.
## Next step
Use this decision as the input to the next module.
