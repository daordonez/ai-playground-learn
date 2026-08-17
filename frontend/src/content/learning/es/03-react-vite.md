---
id: react-vite
module: 3
order: 3
title: React, TypeScript y Vite
duration: 70 min
prerequisites: [HTML básico, Git]
objectives: [Crear componentes, Modelar estado y rutas]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: React - Thinking in React, description: Diseña componentes desde los datos y la interacción., url: https://react.dev/learn/thinking-in-react, provider: React }, { type: official_docs, title: TypeScript Handbook, description: Consulta los contratos estáticos que usarás en componentes., url: https://www.typescriptlang.org/docs/handbook/intro.html, provider: TypeScript }, { type: video, title: React in 100 Seconds, description: Repaso corto para situar componentes y estado., url: https://www.youtube.com/watch?v=Tn6-PIqc4UM, provider: Fireship }]
---
# Entregable: Una pantalla de chat con entrada, selector de modelo e historial local tipado.
Este módulo acerca el repositorio a un único objetivo: un cliente de AI Playground que conversa con un modelo de Azure AI Foundry a través de FastAPI.

## Conceptos clave
- **Artefacto verificable:** cambio que puedes abrir, ejecutar o revisar.
- **Límite de seguridad:** el navegador no posee secretos ni decide el proveedor de IA.

## Paso a paso
1. Crea el tipo `ChatMessage` con `id`, `role` y `content`.
2. Haz que `ChatPage` sea propietario de `messages` y `draft`.
3. Pasa datos hacia abajo con props y acciones hacia arriba con callbacks.

## Ejemplo práctico
```text
type ChatMessage = { id: string; role: "user" | "assistant"; content: string };
const [messages, setMessages] = useState<ChatMessage[]>([]);
```
El estado vive donde varias piezas lo necesitan. `MessageInput` no conoce Azure ni HTTP: solo emite el texto que el usuario escribió.

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
