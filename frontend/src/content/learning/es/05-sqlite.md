---
id: sqlite
module: 5
order: 5
title: Persistencia con SQLite
duration: 45 min
prerequisites: [FastAPI, Datos relacionales]
objectives: [Modelar progreso, Proteger datos con un volumen]
translation_status: published
visibility: learning
---
# Datos pequeños, diseño serio

SQLite es apropiado para pocos usuarios y una instancia. El archivo de base de datos debe vivir en un volumen, nunca solo en la capa efímera del contenedor. Diseña tablas con migración futura en mente.

## Ejercicio

Relaciona una lección con su estado de finalización y explica qué clave evita duplicados.

## Verificación

Puedes reiniciar un contenedor sin perder progreso porque conoces el directorio montado.

## Error frecuente

Guardar el archivo `.db` dentro de la imagen de contenedor.
