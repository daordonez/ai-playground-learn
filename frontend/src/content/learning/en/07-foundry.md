---
id: foundry
module: 7
order: 7
title: Azure Foundry as a model gateway
duration: 60 min
prerequisites: [FastAPI, Secrets]
objectives: [Abstract providers, Design SSE streaming]
translation_status: published
visibility: learning
---
# The backend selects the model

The playground must not couple its UI to one provider. FastAPI receives a chat intent, selects an allowed configuration, and streams the result. SSE is enough for an MVP without WebSockets.

## Exercise

Define response metadata: model, latency, token usage, and outcome.

## Check

Identify where the Azure credential lives and why it never appears in JavaScript.

## Common mistake

Exposing an API key so the browser can call a provider directly.
