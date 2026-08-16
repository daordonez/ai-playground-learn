# AI Playground Learn

Plataforma bilingüe para aprender, paso a paso, a construir un AI Playground con React, FastAPI, SQLite, Azure Foundry, Keycloak, GHCR y Dokploy.

## Qué incluye

- 12 lecciones docentes en español e inglés, versionadas en Markdown.
- Guiones y sugerencias audiovisuales en español para TikTok y YouTube, visibles en modo editor.
- Progreso persistente en SQLite y preferencia de idioma.
- API FastAPI y SPA React en una sola imagen de contenedor.
- Validación de contenido, pruebas de API y pipeline para GHCR y Dokploy.

## Desarrollo local

Necesitas Python 3.13+ y Node.js 22+.

```bash
python -m venv .venv
. .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn app.main:app --app-dir backend --reload
```

En otra terminal:

```bash
cd frontend
npm ci
npm run dev
```

La SPA se abre en `http://localhost:5173` y usa el proxy de Vite para hablar con FastAPI en el puerto 8000.

## Validación

```bash
cd frontend && npm run validate-content && npm run lint && npm run build
python -m pytest backend/tests
docker compose up --build
```

## Dokploy

1. Crea un registro de imagen privado que lea `ghcr.io/daordonez/ai-playground-learn` con una credencial de solo lectura.
2. Configura el puerto de aplicación `8000`, un volumen persistente montado en `/app/data` y el health check `/api/health`.
3. Añade `DOKPLOY_DEPLOY_WEBHOOK` como secreto de GitHub para que cada push correcto a `main` active el redeploy.
4. Despliega una etiqueta inmutable `sha-<commit>`; evita usar `latest` como referencia de producción.

## Traducciones

El contenido de aprendizaje se mantiene en `frontend/src/content/learning/es` y `frontend/src/content/learning/en`. La traducción se genera y revisa antes del merge. Los materiales en `frontend/src/content/editorial` son siempre españoles y no se traducen.

Para generar un borrador inglés con Azure AI Translator, exporta `AZURE_TRANSLATOR_KEY` y, si aplica, `AZURE_TRANSLATOR_REGION`. Después ejecuta:

```bash
python scripts/translate_lesson.py frontend/src/content/learning/es/01-infra-producto.md frontend/src/content/learning/en/01-infra-producto.md
```

El borrador queda con estado `draft`; revísalo y cambia su estado a `published` antes de integrarlo.
