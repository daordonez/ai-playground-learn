---
id: fastapi
module: 4
order: 4
title: FastAPI y contratos HTTP
duration: 70 min
prerequisites: [Python básico, HTTP]
objectives: [Diseñar endpoints, Validar entradas con Pydantic]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: FastAPI Tutorial - Request Body, description: Define y valida contratos de entrada con Pydantic., url: https://fastapi.tiangolo.com/tutorial/body/, provider: FastAPI }, { type: video, title: FastAPI Course, description: Introducción práctica a rutas y validación., url: https://www.youtube.com/watch?v=7t2alSnE2-I, provider: freeCodeCamp }]
---
# Entregable: Un endpoint `POST /api/chat` que acepta un mensaje validado y devuelve un contrato estable.
Este módulo acerca el repositorio a un único objetivo: un cliente de AI Playground que conversa con un modelo de Azure AI Foundry a través de FastAPI.

## Conceptos clave
- **Artefacto verificable:** cambio que puedes abrir, ejecutar o revisar.
- **Límite de seguridad:** el navegador no posee secretos ni decide el proveedor de IA.

## Paso a paso
1. Define `ChatRequest` y `ChatResponse` antes de escribir la ruta.
2. Limita el tamaño del mensaje y rechaza texto vacío con Pydantic.
3. Haz que la ruta invoque un servicio `ChatService`, nunca el SDK directamente.

## Ejemplo práctico
```text
class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4_000)

@router.post("/api/chat")
def chat(request: ChatRequest) -> ChatResponse: ...
```
La validación ocurre antes de llamar a Foundry. Así el navegador recibe errores previsibles y la lógica puede probarse sin HTTP.

## Ejercicio
Implementa el entregable, arranca frontend y backend, y anota la evidencia: captura, prueba automatizada o respuesta HTTP que demuestra el comportamiento.

## Verificación
- El flujo funciona desde la interfaz, no solo desde una consola.
- El backend conserva la responsabilidad de secretos, políticas y proveedor.
- Puedes describir el siguiente cambio sin romper el contrato actual.

## Errores frecuentes
- Aceptar cuerpos sin validación y delegar en el proveedor los errores previsibles de entrada.
- Acoplar la ruta HTTP al SDK de Foundry en lugar de aislarlo detrás de un servicio.

## Siguiente paso
Confirma el entregable con un commit y usa su resultado como punto de partida del módulo siguiente.
