---
id: integracion
module: 6
order: 6
title: Integración frontend y backend
duration: 60 min
prerequisites: [React, FastAPI]
objectives: [Consumir APIs, Gestionar estados remotos]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: MDN - Using the Fetch API, description: Maneja peticiones HTTP desde el navegador., url: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch, provider: MDN }, { type: video, title: Fetch API Course, description: Revisión práctica de carga, error y respuesta., url: https://www.youtube.com/watch?v=cuEtnrL9-H0, provider: Web Dev Simplified }]
---
# Entregable: La pantalla React llama a FastAPI y muestra carga, respuesta y error sin estados duplicados.
Este módulo acerca el repositorio a un único objetivo: un cliente de AI Playground que conversa con un modelo de Azure AI Foundry a través de FastAPI.

## Conceptos clave
- **Artefacto verificable:** cambio que puedes abrir, ejecutar o revisar.
- **Límite de seguridad:** el navegador no posee secretos ni decide el proveedor de IA.

## Paso a paso
1. Centraliza `fetch` en `api.ts` y tipa su respuesta.
2. Al enviar, bloquea el botón y añade el mensaje de usuario de forma controlada.
3. Si el servidor falla, conserva el borrador y muestra un error recuperable.

## Ejemplo práctico
```text
const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message }) });
if (!response.ok) throw new Error("Chat request failed");
```
La UI solo conoce `/api/chat`. Esto permite cambiar el proveedor, autenticación o streaming en el backend sin reescribir componentes.

## Ejercicio
Implementa el entregable, arranca frontend y backend, y anota la evidencia: captura, prueba automatizada o respuesta HTTP que demuestra el comportamiento.

## Verificación
- El flujo funciona desde la interfaz, no solo desde una consola.
- El backend conserva la responsabilidad de secretos, políticas y proveedor.
- Puedes describir el siguiente cambio sin romper el contrato actual.

## Error frecuente
Saltar al SDK de Azure desde React o mezclar el entregable actual con mejoras no necesarias para validar el flujo.

## Siguiente paso
Confirma el entregable con un commit y usa su resultado como punto de partida del módulo siguiente.
