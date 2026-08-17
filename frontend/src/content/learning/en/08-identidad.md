---
id: identidad
module: 8
order: 8
title: OIDC, Keycloak, and authorization
duration: 50 min
prerequisites: [JWT, HTTP]
objectives: [Separate identity and permissions, Prepare interchangeable roles]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: "Keycloak Guides", description: "Configure OIDC identity and clients from primary documentation.", url: https://www.keycloak.org/guides, provider: "Keycloak" }, { type: video, title: "OAuth 2.0 and OpenID Connect", description: "Separate authentication, authorization, and tokens.", url: https://www.youtube.com/watch?v=996OiexHze0, provider: "Okta" }]
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
- Trusting claims sent by the SPA without validating token signature, issuer, audience, and expiry.
- Mapping an OIDC provider role directly to internal permissions without an authorization layer.
## Next step
Use this decision as the input to the next module.
