---
id: infra-producto
module: 1
order: 1
title: De infraestructura a producto
duration: 35 min
prerequisites: [Docker, Git]
objectives: [Definir el MVP, Identificar límites de responsabilidad]
translation_status: published
visibility: learning
---
# El cambio de mentalidad

Un servicio útil no termina cuando el contenedor arranca. Tiene usuarios, una interfaz, datos, errores y una forma repetible de evolucionar. Tu ventaja como SRE es pensar desde el inicio en límites, secretos, despliegue y operación.

## Ejercicio

Dibuja el flujo Browser → FastAPI → Azure Foundry y marca qué secretos no pueden salir del backend.

## Verificación

Puedes explicar por qué el navegador nunca llama directamente a Azure Foundry.

## Error frecuente

Intentar resolver autenticación, base de datos y UI antes de escribir el criterio de éxito del MVP.
