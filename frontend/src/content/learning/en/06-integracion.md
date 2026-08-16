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
---
# An explicit boundary

The frontend knows the public contract, not SQLite details or secrets. Every request represents loading, success, and failure; those are real system states.

## Exercise

Model the three states when saving lesson progress.

## Check

The UI does not mark a lesson complete before server confirmation.

## Common mistake

Showing success despite a failed server request.
