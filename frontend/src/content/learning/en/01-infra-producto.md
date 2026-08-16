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
---
# The mindset shift

A useful service does not end when a container starts. It has users, interface, data, failures, and a repeatable way to evolve. Your SRE advantage is thinking about boundaries, secrets, deployment, and operations from day one.

## Exercise

Draw Browser → FastAPI → Azure Foundry and mark which secrets must never leave the backend.

## Check

Explain why the browser never calls Azure Foundry directly.

## Common mistake

Solving identity, database, and UI before writing the MVP success criteria.
