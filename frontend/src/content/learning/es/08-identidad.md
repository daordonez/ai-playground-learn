---
id: identidad
module: 8
order: 8
title: OIDC, Keycloak y autorización
duration: 50 min
prerequisites: [JWT, HTTP]
objectives: [Separar identidad y permisos, Preparar roles intercambiables]
translation_status: published
visibility: learning
---
# Identidad no es autorización

OIDC responde quién es la persona; tu dominio decide qué puede hacer. El backend transforma claims del proveedor en un usuario interno con roles `student` o `editor`, sin conocer detalles de Keycloak.

## Ejercicio

Decide qué pantalla debería ocultarse al rol alumno y dónde debe aplicarse esa regla.

## Verificación

Puedes cambiar Keycloak por Entra ID sin reescribir los servicios de lecciones.

## Error frecuente

Comprobar roles solo en React y confiar en que eso protege una API.
