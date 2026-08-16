---
id: foundry
module: 7
order: 7
title: Azure Foundry como gateway de modelos
duration: 60 min
prerequisites: [FastAPI, Secretos]
objectives: [Abstraer proveedores, Diseñar streaming SSE]
translation_status: published
visibility: learning
---
# El backend decide el modelo

El playground no debe acoplar la interfaz a un proveedor. FastAPI recibe una intención de chat, elige una configuración permitida y transmite la respuesta. SSE es suficiente para mostrar tokens sin introducir WebSockets al MVP.

## Ejercicio

Define qué metadatos registrarías por respuesta: modelo, latencia, tokens y resultado.

## Verificación

Puedes indicar dónde vive la credencial de Azure y por qué nunca aparece en JavaScript.

## Error frecuente

Exponer una API key para que el navegador llame al proveedor directamente.
