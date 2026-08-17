---
id: git-flujo
module: 2
order: 2
title: Ingeniería del proyecto con Git
duration: 50 min
prerequisites: [Terminal, Git]
objectives: [Crear cambios aislados, Revisar antes de integrar]
translation_status: published
visibility: learning
resources: [{ type: official_docs, title: GitHub Docs - About pull requests, description: Aprende el contrato de revisión e integración., url: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests, provider: GitHub }, { type: video, title: Git and GitHub for beginners, description: Revisión visual de ramas, commits y pull requests., url: https://www.youtube.com/watch?v=RGOj5yH7evk, provider: freeCodeCamp }]
---
# Entregable: Un repositorio con una rama por módulo y una pull request revisable.
Este módulo acerca el repositorio a un único objetivo: un cliente de AI Playground que conversa con un modelo de Azure AI Foundry a través de FastAPI.

## Conceptos clave
- **Artefacto verificable:** cambio que puedes abrir, ejecutar o revisar.
- **Límite de seguridad:** el navegador no posee secretos ni decide el proveedor de IA.

## Paso a paso
1. Crea una issue por entregable, no por tecnología.
2. Abre `feature/chat-shell` desde la rama principal.
3. Haz commits pequeños: estructura, estilos, prueba y documentación.

## Ejemplo práctico
```text
git switch -c feature/chat-shell
git commit -m "Add chat shell layout"
```
Una pull request es la evidencia de cómo cambió el producto. El título describe el resultado, y la descripción contiene cómo probarlo.

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
