---
id: integracion
module: 6
order: 6
title: Integración frontend y backend
duration: 50 min
prerequisites: [React, FastAPI]
objectives: [Consumir contratos HTTP, Gestionar carga y error]
translation_status: published
visibility: learning
---
# Una frontera explícita

El frontend conoce el contrato público, no detalles de SQLite ni secretos. Para cada petición representa carga, éxito y error; son estados reales del sistema, no excepciones visuales.

## Ejercicio

Modela los tres estados al guardar el progreso de una lección.

## Verificación

La UI no marca una lección como completada hasta recibir la confirmación del backend.

## Error frecuente

Optimismo sin rollback: mostrar éxito aunque el servidor haya fallado.
