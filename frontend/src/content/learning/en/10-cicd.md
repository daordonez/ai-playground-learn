---
id: cicd
module: 10
order: 10
title: CI/CD and GitHub Container Registry
duration: 60 min
prerequisites: [Git, Docker]
objectives: [Understand CI, Publish immutable images]
translation_status: published
visibility: learning
---
# A commit reaches the container

A pull request validates quality. A push to `main` publishes an image tagged with the commit SHA. This lets you know exactly what code Dokploy is running without relying on `latest`.

## Exercise

Trace a pull request to an image named `ghcr.io/...:sha-abc123`.

## Check

Know which permission Actions needs to publish and which Dokploy needs to read.

## Common mistake

Always deploying `latest` and losing traceability and precise rollback.
