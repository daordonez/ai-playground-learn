---
id: integracion
module: 6
order: 6
title: Frontend-backend integration
duration: 50 min
prerequisites: [React, FastAPI]
objectives: [Consume HTTP contracts, Handle loading and errors]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: "MDN - Using the Fetch API", description: "Handle HTTP requests from the browser.", url: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch, provider: "MDN" }, { type: video, title: "Fetch API Course", description: "A practical review of loading, errors, and responses.", url: https://www.youtube.com/watch?v=cuEtnrL9-H0, provider: "Web Dev Simplified" }]
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
- Treating an HTTP request as successful without checking `response.ok`.
- Clearing the draft or leaving the button disabled when the API returns a recoverable error.
## Next step
Use this decision as the input to the next module.
