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
---
# Deployment is part of the product

Dokploy receives a tested artifact, injects protected configuration, and keeps the data volume. Redeploy runs only after `main` successfully publishes an image.

## Exercise

Define the environment variables, volume, and health check.

## Check

Return to a previous SHA image without touching the database.

## Common mistake

Giving runtime write access to GHCR or using administrator credentials.
