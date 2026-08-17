---
id: infra-producto
module: 1
order: 1
title: De infraestructura a producto
duration: 50 min
prerequisites: [Docker, Git]
objectives: [Definir el MVP, Identificar límites de responsabilidad]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: GitHub Docs - Planning and tracking work, description: Convierte una necesidad de usuario en un alcance verificable., url: https://docs.github.com/en/issues/tracking-your-work-with-issues, provider: GitHub }, { type: video, title: MVP explained, description: Repasa cómo reducir una idea a su primera versión útil., url: https://www.youtube.com/watch?v=1hHMwLxN6EM, provider: Y Combinator }]
---
# Entregable: Un documento `docs/mvp.md` con el flujo de chat, una métrica y exclusiones.
Este módulo acerca el repositorio a un único objetivo: un cliente de AI Playground que conversa con un modelo de Azure AI Foundry a través de FastAPI.

## Conceptos clave
- **Artefacto verificable:** cambio que puedes abrir, ejecutar o revisar.
- **Límite de seguridad:** el navegador no posee secretos ni decide el proveedor de IA.

## Paso a paso
1. Define al usuario: persona que prueba un modelo y necesita ver una respuesta.
2. Escribe el recorrido completo: mensaje → API → Foundry → respuesta.
3. Declara fuera de alcance el historial remoto y el login hasta validar el chat.

## Ejemplo práctico
```text
Criterio de éxito: una persona envía un mensaje y recibe una respuesta o un error accionable en menos de una interacción.
```
Este criterio evita medir actividad técnica en lugar de utilidad. Cada módulo posterior debe mantener este flujo funcionando.

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
