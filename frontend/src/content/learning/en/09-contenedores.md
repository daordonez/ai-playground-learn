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
---
# Package the whole application

A multi-stage image compiles React and hands its files to FastAPI. Configuration comes from environment variables, state from a volume, and availability from a health endpoint.

## Exercise

List what belongs in the image, a volume, and an environment variable.

## Check

The same artifact runs locally and in Dokploy with different values.

## Common mistake

Building different images for development and production.
