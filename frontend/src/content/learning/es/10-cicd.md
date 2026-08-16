---
id: cicd
module: 10
order: 10
title: CI/CD y GitHub Container Registry
duration: 60 min
prerequisites: [Git, Docker]
objectives: [Entender CI, Publicar imágenes inmutables]
translation_status: published
visibility: learning
---
# El commit llega hasta el contenedor

Una pull request valida calidad. Un push a `main` publica una imagen con la SHA del commit. Esta etiqueta permite responder qué código está ejecutando Dokploy sin depender de `latest`.

## Ejercicio

Traza el recorrido desde una pull request hasta la imagen `ghcr.io/...:sha-abc123`.

## Verificación

Sabes qué permiso requiere GitHub Actions para publicar en GHCR y cuál necesita Dokploy para leer.

## Error frecuente

Desplegar siempre `latest` y perder trazabilidad y rollback preciso.
