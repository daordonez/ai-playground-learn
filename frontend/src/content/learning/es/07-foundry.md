---
id: foundry
module: 7
order: 7
title: Azure Foundry como gateway de modelos
duration: 70 min
prerequisites: [FastAPI, Secretos]
objectives: [Abstraer proveedores, Diseñar streaming SSE]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: Microsoft Learn - Azure AI Foundry, description: Arquitectura y uso de modelos en Azure AI Foundry., url: https://learn.microsoft.com/azure/ai-foundry/, provider: Microsoft Learn }, { type: video, title: Azure AI Foundry overview, description: Contexto visual de los componentes de Foundry., url: https://www.youtube.com/watch?v=vRZFQj5O3Yc, provider: Microsoft Azure }]
---
# Entregable: FastAPI obtiene una respuesta de un modelo desplegado en Azure AI Foundry usando identidad gestionada o credenciales de servidor.
Este módulo acerca el repositorio a un único objetivo: un cliente de AI Playground que conversa con un modelo de Azure AI Foundry a través de FastAPI.

## Conceptos clave
- **Artefacto verificable:** cambio que puedes abrir, ejecutar o revisar.
- **Límite de seguridad:** el navegador no posee secretos ni decide el proveedor de IA.

## Paso a paso
1. En Foundry, despliega un modelo y copia su nombre de despliegue; no confundas nombre de modelo con deployment.
2. Configura `FOUNDRY_PROJECT_ENDPOINT` y `MODEL_DEPLOYMENT_NAME` solo en el entorno backend.
3. Concede al principal de ejecución el rol mínimo necesario y prueba primero con `az login` en desarrollo.

## Ejemplo práctico
```text
project = AIProjectClient(
    endpoint=os.environ["FOUNDRY_PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential(),
)
client = project.get_openai_client()
response = client.responses.create(model=os.environ["MODEL_DEPLOYMENT_NAME"], input=message)
```
El navegador nunca recibe endpoint privilegiado ni token. `DefaultAzureCredential` usa Azure CLI localmente y una identidad administrada al desplegar, según la cadena de credenciales disponible.

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
