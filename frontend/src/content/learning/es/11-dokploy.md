---
id: dokploy
module: 11
order: 11
title: Despliegue automático con Dokploy
duration: 45 min
prerequisites: [Contenedores, GHCR]
objectives: [Configurar despliegue, Diseñar rollback]
translation_status: published
visibility: learning
---
# El despliegue es parte del producto

Dokploy recibe un artefacto ya probado, inyecta configuración protegida y conserva el volumen de datos. El redeploy se activa solo tras publicar con éxito una imagen desde `main`.

## Ejercicio

Define las variables de entorno, el volumen y la comprobación de salud de la aplicación.

## Verificación

Puedes volver a una imagen SHA anterior sin tocar la base de datos.

## Error frecuente

Conceder al runtime permisos de escritura en GHCR o usar credenciales de administrador.
