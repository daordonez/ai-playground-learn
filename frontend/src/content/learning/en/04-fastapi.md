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
---
# An endpoint is not the domain

An endpoint receives HTTP, validates the contract, calls a service, and returns a response. Business logic must not grow inside the route function: this keeps it testable without a server.

## Exercise

Design `PUT /api/profile`: locale input, current user, profile service, and validated response.

## Check

Explain what happens when an invalid locale arrives and why the database is not called.

## Common mistake

Mixing SQL, authorization, and HTTP serialization in a long endpoint.
