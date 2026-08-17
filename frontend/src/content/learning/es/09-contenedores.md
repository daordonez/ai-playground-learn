---
id: contenedores
module: 9
order: 9
title: Contenedores y operación local
duration: 65 min
prerequisites: [Docker, FastAPI]
objectives: [Crear imágenes, Operar con Compose]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: Docker Compose, description: Referencia oficial para aplicaciones multicontenedor., url: https://docs.docker.com/compose/, provider: Docker }, { type: video, title: Docker in 100 Seconds, description: Repaso de imágenes, contenedores y aislamiento., url: https://www.youtube.com/watch?v=Gjnup-PuquQ, provider: Fireship }]
---
# Entregable: Un contenedor reproducible que ejecuta la SPA y FastAPI sin incluir secretos ni SQLite en la imagen.
Este módulo acerca el repositorio a un único objetivo: un cliente de AI Playground que conversa con un modelo de Azure AI Foundry a través de FastAPI.

## Conceptos clave
- **Artefacto verificable:** cambio que puedes abrir, ejecutar o revisar.
- **Límite de seguridad:** el navegador no posee secretos ni decide el proveedor de IA.

## Paso a paso
1. Compila Vite en una etapa de build y copia solo `dist` al runtime.
2. Inyecta endpoint, modelo y credenciales como variables o identidad del entorno.
3. Monta `/app/data` como volumen para progreso e historial.

## Ejemplo práctico
```text
services:
  app:
    image: ghcr.io/example/ai-playground:sha-<commit>
    volumes: ["playground-data:/app/data"]
    environment: ["FOUNDRY_PROJECT_ENDPOINT", "MODEL_DEPLOYMENT_NAME"]
```
La imagen es el artefacto inmutable; los valores que cambian por entorno se proporcionan al iniciar el contenedor.

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
