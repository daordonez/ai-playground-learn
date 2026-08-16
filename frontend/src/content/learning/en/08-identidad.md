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
---
# Identity is not authorization

OIDC answers who the person is; your domain decides what they can do. The backend turns provider claims into an internal user with `student` or `editor` roles without knowing Keycloak details.

## Exercise

Choose which screen should be hidden from a student and where that rule belongs.

## Check

You can replace Keycloak with Entra ID without rewriting lesson services.

## Common mistake

Checking roles only in React and treating that as API protection.
