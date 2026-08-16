---
id: fastapi
module: 4
order: 4
title: FastAPI y contratos HTTP
duration: 55 min
prerequisites: [Python básico, HTTP]
objectives: [Diseñar endpoints, Validar entradas con Pydantic]
translation_status: published
visibility: learning
---
# El endpoint no es el dominio

Un endpoint recibe HTTP, valida el contrato, llama a un servicio y devuelve una respuesta. La lógica de negocio no debe crecer dentro de la función de ruta: así puedes probarla sin servidor y sustituir la interfaz mañana.

## Ejercicio

Diseña `PUT /api/profile`: entrada de idioma, usuario actual, servicio de perfil y respuesta validada.

## Verificación

Explica qué ocurre si llega un idioma no permitido y por qué la base de datos no se llama en ese caso.

## Error frecuente

Mezclar SQL, autorización y serialización de HTTP en un endpoint largo.
