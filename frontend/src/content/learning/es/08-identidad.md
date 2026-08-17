---
id: identidad
module: 8
order: 8
title: OIDC, Keycloak y autorización
duration: 70 min
prerequisites: [HTTP, FastAPI]
objectives: [Entender OIDC, Separar identidad y permisos]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: Keycloak Guides, description: Configura identidad y clientes OIDC con la documentación primaria., url: https://www.keycloak.org/guides, provider: Keycloak }, { type: video, title: OAuth 2.0 and OpenID Connect, description: Diferencia autenticación, autorización y tokens., url: https://www.youtube.com/watch?v=996OiexHze0, provider: Okta }]
---
# Entregable: Una frontera de autorización que identifica al usuario antes de permitir chat o administración editorial.
Este módulo acerca el repositorio a un único objetivo: un cliente de AI Playground que conversa con un modelo de Azure AI Foundry a través de FastAPI.

## Conceptos clave
- **Artefacto verificable:** cambio que puedes abrir, ejecutar o revisar.
- **Límite de seguridad:** el navegador no posee secretos ni decide el proveedor de IA.

## Paso a paso
1. Registra un cliente OIDC con redirecciones exactas para la SPA.
2. Valida firma, emisor, audiencia y expiración del token en FastAPI.
3. Mapea claims a permisos propios como `lesson:read` y `editorial:read`.

## Ejemplo práctico
```text
def require_permission(permission: str):
    def dependency(user: CurrentUser = Depends(current_user)):
        if permission not in user.permissions: raise HTTPException(403)
        return user
    return dependency
```
Autenticarse no autoriza automáticamente. La aplicación debe decidir qué permiso es necesario para cada endpoint.

## Ejercicio
Implementa el entregable, arranca frontend y backend, y anota la evidencia: captura, prueba automatizada o respuesta HTTP que demuestra el comportamiento.

## Verificación
- El flujo funciona desde la interfaz, no solo desde una consola.
- El backend conserva la responsabilidad de secretos, políticas y proveedor.
- Puedes describir el siguiente cambio sin romper el contrato actual.

## Errores frecuentes
- Confiar en los claims enviados por la SPA sin validar firma, emisor, audiencia y expiración.
- Convertir un rol del proveedor OIDC directamente en permisos internos sin una capa de autorización.

## Siguiente paso
Confirma el entregable con un commit y usa su resultado como punto de partida del módulo siguiente.
