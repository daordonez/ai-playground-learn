---
id: dokploy
module: 11
order: 11
title: Despliegue automático con Dokploy
duration: 60 min
prerequisites: [Docker, CI/CD]
objectives: [Desplegar una imagen, Configurar persistencia]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: Dokploy Documentation, description: Consulta despliegues, variables y volúmenes en Dokploy., url: https://docs.dokploy.com/, provider: Dokploy }, { type: video, title: Docker deployment overview, description: Refuerza el modelo operativo de una imagen publicada., url: https://www.youtube.com/watch?v=0qotVMX-J5s, provider: TechWorld with Nana }]
---
# Entregable: Un despliegue que ejecuta una imagen inmutable, conserva datos y no expone secretos al navegador.
Este módulo acerca el repositorio a un único objetivo: un cliente de AI Playground que conversa con un modelo de Azure AI Foundry a través de FastAPI.

## Conceptos clave
- **Artefacto verificable:** cambio que puedes abrir, ejecutar o revisar.
- **Límite de seguridad:** el navegador no posee secretos ni decide el proveedor de IA.

## Paso a paso
1. Crea el servicio desde la imagen de GHCR y selecciona una etiqueta SHA.
2. Define secretos de Foundry en el entorno de Dokploy, no en el repositorio.
3. Monta el volumen de datos y configura `/api/health` como health check.

## Ejemplo práctico
```text
FOUNDRY_PROJECT_ENDPOINT=https://<resource>.services.ai.azure.com/api/projects/<project>
MODEL_DEPLOYMENT_NAME=<deployment-name>
```
En producción, la identidad administrada o la credencial de aplicación debe obtener permisos mínimos sobre Foundry. El código nunca versiona valores secretos.

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
