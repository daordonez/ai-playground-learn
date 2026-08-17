---
id: cicd
module: 10
order: 10
title: CI/CD y GitHub Container Registry
duration: 65 min
prerequisites: [Git, Docker]
objectives: [Entender CI, Publicar imágenes inmutables]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: GitHub Actions - Publishing Docker images, description: Publica imágenes en GHCR desde un flujo verificable., url: https://docs.github.com/actions/use-cases-and-examples/publishing-packages/publishing-docker-images, provider: GitHub }, { type: video, title: GitHub Actions Tutorial, description: Introducción al flujo de automatización CI/CD., url: https://www.youtube.com/watch?v=R8_veQiYBjI, provider: freeCodeCamp }]
---
# Entregable: Un pipeline que valida contenido y código, crea una imagen SHA y la publica en GHCR.
Este módulo acerca el repositorio a un único objetivo: un cliente de AI Playground que conversa con un modelo de Azure AI Foundry a través de FastAPI.

## Conceptos clave
- **Artefacto verificable:** cambio que puedes abrir, ejecutar o revisar.
- **Límite de seguridad:** el navegador no posee secretos ni decide el proveedor de IA.

## Paso a paso
1. Ejecuta pruebas de backend y frontend en cada pull request.
2. Construye y etiqueta solo tras integrar en `main`.
3. Publica `sha-<commit>` y conserva el digest para despliegue y rollback.

## Ejemplo práctico
```text
permissions:
  contents: read
  packages: write
# tag: ghcr.io/<owner>/ai-playground:sha-${{ github.sha }}
```
El permiso de publicación pertenece a GitHub Actions. Dokploy recibe una credencial separada de solo lectura para reducir el radio de impacto.

## Ejercicio
Implementa el entregable, arranca frontend y backend, y anota la evidencia: captura, prueba automatizada o respuesta HTTP que demuestra el comportamiento.

## Verificación
- El flujo funciona desde la interfaz, no solo desde una consola.
- El backend conserva la responsabilidad de secretos, políticas y proveedor.
- Puedes describir el siguiente cambio sin romper el contrato actual.

## Errores frecuentes
- Publicar una imagen mutable como `latest` sin conservar el digest o la etiqueta SHA.
- Desplegar antes de ejecutar validación de contenido, pruebas y compilación en la pull request.

## Siguiente paso
Confirma el entregable con un commit y usa su resultado como punto de partida del módulo siguiente.
