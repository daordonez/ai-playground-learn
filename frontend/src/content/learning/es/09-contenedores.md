---
id: contenedores
module: 9
order: 9
title: Contenedores y operación local
duration: 45 min
prerequisites: [Docker]
objectives: [Crear una imagen reproducible, Añadir health checks]
translation_status: published
visibility: learning
---
# Empaquetar la aplicación completa

Una imagen multi-stage compila React y entrega sus archivos a FastAPI. La configuración llega por variables de entorno, el estado por volumen y la disponibilidad se mide con un endpoint de salud.

## Ejercicio

Lista qué pertenece a la imagen, qué pertenece a un volumen y qué debe ser una variable de entorno.

## Verificación

El mismo artefacto puede ejecutarse localmente y en Dokploy con valores distintos.

## Error frecuente

Construir imágenes diferentes para desarrollo y producción.
