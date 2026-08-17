---
id: lanzamiento
module: 12
order: 12
title: Lanzamiento y operación del MVP
duration: 55 min
prerequisites: [CI/CD, Despliegue]
objectives: [Definir señales, Operar una primera versión]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: Google SRE Workbook, description: Selecciona señales y prácticas operativas para un servicio real., url: https://sre.google/workbook/monitoring/, provider: Google SRE }, { type: video, title: SRE explained, description: Relaciona fiabilidad, usuario y operación continua., url: https://www.youtube.com/watch?v=uTEL8Ff1Zvk, provider: Google Cloud Tech }]
---
# Entregable: Un playground desplegado con un checklist de aceptación, señales operativas y un rollback probado.
Este módulo acerca el repositorio a un único objetivo: un cliente de AI Playground que conversa con un modelo de Azure AI Foundry a través de FastAPI.

## Conceptos clave
- **Artefacto verificable:** cambio que puedes abrir, ejecutar o revisar.
- **Límite de seguridad:** el navegador no posee secretos ni decide el proveedor de IA.

## Paso a paso
1. Prueba una conversación real desde el navegador sin abrir DevTools a secretos.
2. Observa tasa de error, latencia del endpoint y consumo de tokens en el backend.
3. Documenta el cambio de etiqueta SHA necesario para volver a la versión anterior.

## Ejemplo práctico
```text
Aceptación: enviar un mensaje devuelve texto o un error útil; la API registra correlación, latencia y modelo sin registrar credenciales.
```
Un lanzamiento correcto no es solo HTTP 200. Debe ser útil para el usuario, observable para operaciones y reversible para el equipo.

## Ejercicio
Implementa el entregable, arranca frontend y backend, y anota la evidencia: captura, prueba automatizada o respuesta HTTP que demuestra el comportamiento.

## Verificación
- El flujo funciona desde la interfaz, no solo desde una consola.
- El backend conserva la responsabilidad de secretos, políticas y proveedor.
- Puedes describir el siguiente cambio sin romper el contrato actual.

## Errores frecuentes
- Declarar el lanzamiento correcto sin probar una conversación completa desde el navegador.
- No documentar un rollback a una imagen SHA conocida antes de introducir un cambio en producción.

## Siguiente paso
Confirma el entregable con un commit y usa su resultado como punto de partida del módulo siguiente.
