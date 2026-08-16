---
id: sqlite
module: 5
order: 5
title: Persistence with SQLite
duration: 45 min
prerequisites: [FastAPI, Relational data]
objectives: [Model progress, Protect data with a volume]
translation_status: published
visibility: learning
---
# Small data, serious design

SQLite fits a few users and one instance. The database file belongs in a volume, never only in the ephemeral container layer. Design tables with a future migration in mind.

## Exercise

Relate a lesson to its completion state and explain which key prevents duplicates.

## Check

Restart a container without losing progress because you know the mounted directory.

## Common mistake

Keeping the `.db` file inside the container image.
