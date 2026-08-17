---
id: sqlite
module: 5
order: 5
title: Persistencia con SQLite
duration: 60 min
prerequisites: [SQL básico, FastAPI]
objectives: [Modelar datos, Mantener progreso persistente]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: SQLite Documentation, description: Referencia primaria de SQL y transacciones SQLite., url: https://www.sqlite.org/docs.html, provider: SQLite }, { type: video, title: SQLite in 100 Seconds, description: Repaso del motor embebido y sus casos de uso., url: https://www.youtube.com/watch?v=f5e8F9QFz8Y, provider: Fireship }]
---
# Entregable: Persistencia local limitada a perfil, progreso e historial opcional, sin secretos.
Este módulo acerca el repositorio a un único objetivo: un cliente de AI Playground que conversa con un modelo de Azure AI Foundry a través de FastAPI.

## Conceptos clave
- **Artefacto verificable:** cambio que puedes abrir, ejecutar o revisar.
- **Límite de seguridad:** el navegador no posee secretos ni decide el proveedor de IA.

## Paso a paso
1. Mantén `lesson_progress` como estado de aprendizaje.
2. Si añades conversaciones, usa una tabla `chat_messages` con usuario, rol, texto y fecha.
3. Añade índices solo cuando una consulta real lo justifique.

## Ejemplo práctico
```text
CREATE TABLE chat_messages (
  id TEXT PRIMARY KEY, conversation_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('user','assistant')), content TEXT NOT NULL
);
```
SQLite almacena estado del producto, no configuración de Azure. El endpoint y el nombre de despliegue pertenecen al entorno del backend.

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
