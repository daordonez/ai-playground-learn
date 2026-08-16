# Despliegue de AI Playground Learn en PVE con Dokploy y GHCR

Esta guía lleva la aplicación desde un nodo Proxmox VE (PVE) vacío hasta producción. Está diseñada para el repositorio `daordonez/ai-playground-learn` y evita compilar en el servidor: GitHub Actions valida, construye y publica una imagen inmutable en GHCR; Dokploy solo descarga y ejecuta esa imagen.

## 1. Qué se está desplegando

No se despliega una SPA estática aislada. La imagen definida en `Dockerfile` contiene dos componentes:

| Componente | Implementación | Puerto/ruta | Estado |
| --- | --- | --- | --- |
| Interfaz SPA | React/Vite compilado | `/` | Archivos estáticos dentro de la imagen |
| API | FastAPI/Uvicorn | `8000`, rutas `/api/*` | Mismo contenedor |
| Datos | SQLite | `/app/data/learning.db` | Deben persistir fuera del ciclo de vida del contenedor |
| Comprobación de salud | FastAPI | `GET /api/health` | Responde `200` con `{"status":"ok"}` |

Por ello, Dokploy debe publicar el dominio hacia el puerto interno `8000`, montar almacenamiento persistente en `/app/data` y mantener **una sola réplica**. SQLite es un fichero local; dos réplicas contra el mismo volumen no constituyen una topología soportada y pueden provocar bloqueos o corrupción.

El flujo final es:

```text
push a main
  -> GitHub Actions: validación, pruebas y build
  -> GHCR: ghcr.io/daordonez/ai-playground-learn:sha-<SHA completa>
  -> API de Dokploy: actualiza la imagen configurada y despliega
  -> Traefik de Dokploy: HTTPS -> contenedor:8000
  -> volumen persistente: /app/data/learning.db
```

## 2. Decisiones de arquitectura antes de crear recursos

### 2.1 VM frente a LXC

Para producción, crea una **VM KVM de Ubuntu Server 24.04 LTS** dedicada a Dokploy. Docker Swarm, su red overlay y Traefik funcionan de forma más predecible que Docker dentro de LXC; además se evita convertir un contenedor LXC en privilegiado para resolver restricciones del kernel y cgroups.

Dokploy detecta LXC de Proxmox y aplica `dnsrr`, pero úsalo únicamente si aceptas esa restricción y has validado Docker en tu versión concreta de PVE. No migres servicios existentes a la VM durante este despliegue.

### 2.2 Dimensionamiento inicial

| Recurso | Mínimo funcional | Recomendado para esta aplicación |
| --- | ---: | ---: |
| vCPU | 2 | 2 |
| RAM | 2 GB | 4 GB |
| Disco | 30 GB | 40 GB o más |
| Red | IP fija o reserva DHCP | Una NIC en la VLAN de servidores |

La construcción se realiza en GitHub, por lo que 4 GB son suficientes para Dokploy, Traefik, la aplicación y margen de operación. Configura alertas de disco: las capas de imágenes y las copias de seguridad pueden crecer sin que la base SQLite sea grande.

### 2.3 Direccionamiento, DNS y exposición

Define estos valores antes de continuar; sustituye los ejemplos en toda la guía:

| Variable | Ejemplo | Uso |
| --- | --- | --- |
| `DOKPLOY_VM_IP` | `192.168.20.30` | IP estable de la VM |
| `DOKPLOY_FQDN` | `dokploy.example.com` | Panel de administración |
| `APP_FQDN` | `learn.example.com` | Aplicación pública |
| `ADMIN_CIDR` | `192.168.20.0/24` | Red desde la que se administra |

Crea registros `A` o `AAAA` públicos para `DOKPLOY_FQDN` y `APP_FQDN` que alcancen la IP pública que termina en la VM. Si PVE está detrás de un router, redirige TCP 80 y 443 hacia `DOKPLOY_VM_IP`. Para el alta inicial, limita TCP 3000 al `ADMIN_CIDR` y redirígelo solo temporalmente si administras desde fuera por VPN.

No publiques TCP 8000: Traefik es el único punto de entrada de la aplicación.

## 3. Crear y endurecer la VM en PVE

1. En PVE, crea la VM con la ISO de Ubuntu Server 24.04 LTS, tipo de máquina `q35`, BIOS OVMF o SeaBIOS según tu estándar, controlador SCSI VirtIO y NIC VirtIO conectada a la VLAN de servidores.
2. Asigna 2 vCPU, 4096 MiB de RAM y 40 GB de disco. Habilita el agente QEMU y, tras instalar el sistema, instala y activa `qemu-guest-agent`.
3. Establece IP fija o una reserva DHCP. Comprueba que la VM resuelve DNS, llega a Internet y recibe conexiones SSH desde `ADMIN_CIDR`.
4. Activa el firewall de PVE en la VM, con política de entrada denegada y reglas explícitas: TCP 22 desde `ADMIN_CIDR`; TCP 3000 desde `ADMIN_CIDR` mientras se realiza el alta; TCP 80 y 443 desde Internet. Si usas IPv6, replica las reglas.
5. Instala Ubuntu con un usuario administrativo que use una clave SSH. Deshabilita el acceso SSH por contraseña y el acceso directo de `root` después de verificar una segunda sesión SSH.
6. Aplica actualizaciones y reinicia antes de instalar Dokploy:

```bash
sudo apt update
sudo apt full-upgrade -y
sudo reboot
```

7. Configura copias de seguridad de la VM desde PVE hacia un almacenamiento separado. Una instantánea no sustituye una copia: deja que PVE ejecute copias consistentes y prueba una restauración en una VM aislada.

Para un futuro clúster Swarm, no abras sus puertos hacia Internet. Entre nodos de la misma VLAN o red VPN permite únicamente TCP 2377, TCP/UDP 7946 y UDP 4789. En esta instalación de nodo único no hacen falta reglas Swarm adicionales.

## 4. Instalar Dokploy de forma controlada

Conéctate a la VM y valida que ningún servicio existente ocupa los puertos de Dokploy:

```bash
sudo ss -ltnp '( sport = :80 or sport = :443 or sport = :3000 )'
ip -4 addr show
```

Los tres puertos deben estar libres. El instalador crea Docker, inicializa Docker Swarm, crea su red overlay y despliega Dokploy con Traefik. No lo ejecutes en una máquina que ya pertenezca a un Swarm: el instalador fuerza la salida y reinicialización del Swarm.

Usa la IP privada de la VM como dirección anunciada del Swarm, no la IP pública del router:

```bash
curl -sSL https://dokploy.com/install.sh | sudo ADVERTISE_ADDR=192.168.20.30 sh
```

Para máxima reproducibilidad, sustituye el instalador genérico por el activo de una versión concreta validada en las notas de versión de Dokploy. La documentación actual muestra el patrón siguiente; actualiza `v0.26.6` solo después de revisar su changelog:

```bash
curl -sL https://github.com/Dokploy/dokploy/releases/download/v0.26.6/install.sh | sudo ADVERTISE_ADDR=192.168.20.30 sh
```

Tras finalizar, valida el plano de control:

```bash
sudo docker service ls
sudo docker node ls
sudo docker network ls
curl --fail http://127.0.0.1:3000
```

Abre `http://DOKPLOY_VM_IP:3000` desde `ADMIN_CIDR` y crea la cuenta administrativa. Usa un gestor de contraseñas y habilita 2FA si la edición instalada lo ofrece.

## 5. Publicar el panel con HTTPS y cerrar el puerto 3000

1. En Dokploy, configura el dominio `DOKPLOY_FQDN` para el propio panel y solicita el certificado TLS de Let's Encrypt.
2. Comprueba desde una red externa que `https://DOKPLOY_FQDN` carga con un certificado válido antes de tocar el puerto 3000.
3. Elimina la redirección WAN de TCP 3000 y conserva solo la regla temporal del firewall si aún la necesitas para contingencia local.
4. Finalmente retira la publicación del puerto 3000 del servicio Dokploy:

```bash
sudo docker service update --publish-rm 'published=3000,target=3000,mode=host' dokploy
```

No ejecutes este paso hasta haber comprobado el acceso HTTPS por dominio: en caso contrario se pierde el acceso al panel.

## 6. Preparar GHCR con mínimo privilegio

El repositorio ya contiene `.github/workflows/ci.yml`. En `main`, su trabajo `publish` usa `GITHUB_TOKEN` con `packages: write`, por lo que GitHub Actions publica la imagen sin almacenar una credencial de escritura adicional.

Primero haz un push a `main` que complete correctamente el flujo. En GitHub aparecerá el paquete de contenedor `ai-playground-learn` bajo el perfil `daordonez` o en la sección **Packages** del repositorio.

Después crea un token dedicado para Dokploy, distinto de tu token personal de administración:

1. Crea una cuenta técnica de GitHub si quieres aislar también la identidad humana. Si no, crea un PAT clásico exclusivo para este uso.
2. Concede solo el scope `read:packages`. No selecciones `repo`, `write:packages` ni `delete:packages`.
3. Si el paquete es privado, comprueba en **Package settings** que la cuenta o equipo del token tiene permiso **Read**. Para un paquete heredado del repositorio, confirma también el vínculo y las reglas de acceso.
4. Guarda el token en el gestor de secretos. GitHub solo lo mostrará una vez.

Prueba la credencial desde una estación de administración, sin dejar el secreto en el historial:

```bash
printf '%s' "$GHCR_READ_TOKEN" | docker login ghcr.io --username daordonez --password-stdin
docker pull ghcr.io/daordonez/ai-playground-learn:sha-<SHA_COMPLETA>
docker logout ghcr.io
```

## 7. Registrar GHCR en Dokploy

En **Settings → Registry**, crea el registro:

| Campo | Valor |
| --- | --- |
| Nombre | `ghcr-ai-playground-read` |
| Registry URL | `https://ghcr.io` |
| Username | `daordonez` o la cuenta técnica |
| Password | PAT clásico con `read:packages` |
| Image Prefix | vacío |

Guarda y prueba la conexión si la interfaz ofrece esa opción. Esta configuración central evita poner el token de GHCR dentro de cada aplicación o en el repositorio.

## 8. Crear el proyecto y la aplicación en Dokploy

1. Crea un proyecto, por ejemplo `learning`.
2. Crea el entorno `production`.
3. Dentro de él crea una **Application** denominada `ai-playground-learn`.
4. En **General**, selecciona `Docker` como `Source Type`; no selecciones GitHub ni Dockerfile porque la imagen ya se construye y valida en Actions.
5. Selecciona el registro `ghcr-ai-playground-read` y configura inicialmente una imagen ya existente:

```text
ghcr.io/daordonez/ai-playground-learn:sha-<SHA_COMPLETA>
```

6. En **Environment**, define `DATA_DIR=/app/data`. `WEB_DIR=/app/web` ya viene definido en la imagen; no hace falta repetirlo.
7. En **Volumes**, crea un volumen nombrado, por ejemplo `ai-playground-learn-data`, y móntalo en `/app/data`. No marques el volumen como de solo lectura.
8. En **Domains**, añade `APP_FQDN`, selecciona el puerto de destino `8000`, habilita HTTPS y fuerza redirección HTTP a HTTPS. No crees una exposición de puerto público adicional.
9. En **Advanced → Resources**, establece inicialmente límite de `512 MB`, reserva de `128 MB`, límite de `1.0` CPU y reserva de `0.25` CPU. Ajusta con métricas reales.
10. En **Advanced → Cluster/Swarm settings**, establece `replicas: 1`.

El usuario de ejecución de la imagen es el UID `10001`. Un volumen nombrado es la opción más sencilla: Docker inicializa el directorio de la imagen con sus permisos. Si decides usar un bind mount para que PVE vea el fichero directamente, crea el directorio en la VM y asígnalo antes de desplegar:

```bash
sudo install --directory --owner=10001 --group=10001 --mode=0750 /srv/ai-playground-learn/data
```

Monta entonces exactamente `/srv/ai-playground-learn/data` en `/app/data`. No uses un directorio compartido por varias réplicas.

## 9. Salud, actualización segura y persistencia

La imagen ya declara un `HEALTHCHECK` que llama a `http://127.0.0.1:8000/api/health` usando la librería estándar de Python. Replica esa intención en el health check Swarm de Dokploy; no uses `curl`, porque la imagen final no lo instala.

En el campo JSON de comprobación de salud configura:

```json
{
  "Test": [
    "CMD",
    "python",
    "-c",
    "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/api/health')"
  ],
  "Interval": 30000000000,
  "Timeout": 5000000000,
  "StartPeriod": 10000000000,
  "Retries": 3
}
```

En la configuración de actualización utiliza:

```json
{
  "Parallelism": 1,
  "Delay": 10000000000,
  "FailureAction": "rollback",
  "Order": "stop-first"
}
```

`stop-first` es intencionado: con SQLite y una única réplica no existe una estrategia `start-first` segura que comparta el mismo fichero de base de datos. Habrá una interrupción breve durante cada actualización. Si el requisito cambia a cero interrupción o alta disponibilidad, migra el estado a PostgreSQL antes de aumentar réplicas.

Despliega una primera vez desde Dokploy y verifica:

```bash
curl --fail --silent --show-error https://APP_FQDN/api/health
curl --fail --silent --show-error -I https://APP_FQDN/
```

En la interfaz, cambia el idioma y completa una lección; reinicia o redespliega la misma imagen y comprueba que la preferencia y el progreso siguen presentes. Así se valida el volumen y no solo la disponibilidad HTTP.

## 10. Corregir el CD para etiquetas SHA inmutables

El workflow actual construye y publica correctamente `ghcr.io/daordonez/ai-playground-learn:sha-${{ github.sha }}`. Sin embargo, su último paso solo hace `POST` a `DOKPLOY_DEPLOY_WEBHOOK`. Si Dokploy conserva la etiqueta anterior, ese webhook redespliega la imagen anterior: no conoce automáticamente la nueva SHA.

Sustituye el paso `Trigger Dokploy deployment` de `.github/workflows/ci.yml` por los dos pasos siguientes. El primero fija en Dokploy la imagen exacta que acaba de publicarse; el segundo la despliega. El registro ya guardado en Dokploy aporta las credenciales de lectura de GHCR, por lo que el workflow no las transmite.

```yaml
      - name: Select immutable image in Dokploy
        env:
          DOKPLOY_API_KEY: ${{ secrets.DOKPLOY_API_KEY }}
          DOKPLOY_APPLICATION_ID: ${{ secrets.DOKPLOY_APPLICATION_ID }}
          DOKPLOY_URL: ${{ secrets.DOKPLOY_URL }}
          IMAGE: ghcr.io/daordonez/ai-playground-learn:sha-${{ github.sha }}
        run: |
          curl --fail --show-error --silent \
            --request POST "$DOKPLOY_URL/api/application.saveDockerProvider" \
            --header "x-api-key: $DOKPLOY_API_KEY" \
            --header "Content-Type: application/json" \
            --data "{\"applicationId\":\"$DOKPLOY_APPLICATION_ID\",\"dockerImage\":\"$IMAGE\",\"username\":null,\"password\":null,\"registryUrl\":null}"
      - name: Deploy immutable image in Dokploy
        env:
          DOKPLOY_API_KEY: ${{ secrets.DOKPLOY_API_KEY }}
          DOKPLOY_APPLICATION_ID: ${{ secrets.DOKPLOY_APPLICATION_ID }}
          DOKPLOY_URL: ${{ secrets.DOKPLOY_URL }}
        run: |
          curl --fail --show-error --silent \
            --request POST "$DOKPLOY_URL/api/application.deploy" \
            --header "x-api-key: $DOKPLOY_API_KEY" \
            --header "Content-Type: application/json" \
            --data "{\"applicationId\":\"$DOKPLOY_APPLICATION_ID\"}"
```

Crea los siguientes secretos de repositorio en GitHub:

| Secreto | Valor | Observación |
| --- | --- | --- |
| `DOKPLOY_URL` | `https://DOKPLOY_FQDN` | Sin barra final |
| `DOKPLOY_API_KEY` | Clave API creada en Dokploy | Alcance mínimo que permita actualizar y desplegar esta aplicación |
| `DOKPLOY_APPLICATION_ID` | Identificador de la aplicación | Obtenido desde la URL o la API de Dokploy |

Retira `DOKPLOY_DEPLOY_WEBHOOK` de los secretos y de `.env.example` cuando el cambio esté fusionado; ya no forma parte del flujo. No uses una cookie de sesión del panel como clave API y no añadas el PAT de GHCR a GitHub Actions.

## 11. Primera publicación de producción

1. Confirma que el job `verify` de GitHub Actions ha pasado: valida contenido, lint, build del frontend, pruebas de FastAPI y build de la imagen.
2. Fusiona el cambio en `main`.
3. En **Actions**, verifica que el job `publish` ha publicado `sha-<SHA completa>` y que las dos llamadas a la API de Dokploy devuelven éxito.
4. En **Deployments** de Dokploy, confirma que la imagen indicada es exactamente la SHA del commit fusionado.
5. Valida desde fuera de la red administrativa `https://APP_FQDN/` y `https://APP_FQDN/api/health`.
6. Confirma que `https://DOKPLOY_FQDN/` funciona, que TCP 3000 no está accesible desde Internet y que el token de GHCR no aparece en los logs ni en las variables de la aplicación.

## 12. Operación, backup y rollback

### Backup

La copia crítica es el volumen que contiene `learning.db`; la imagen puede volver a descargarse de GHCR. Usa dos capas:

1. Copia programada del volumen desde Dokploy hacia un destino S3 compatible, si dispones de uno; cifra el destino y aplica retención.
2. Copia de seguridad programada de la VM desde PVE hacia almacenamiento separado.

Antes de confiar en el plan, restaura una copia en una VM aislada, despliega la misma imagen y verifica que la API devuelve perfil y progreso. Si eliges bind mount, incluye `/srv/ai-playground-learn/data` de forma explícita en las copias; si eliges volumen nombrado, valida que el backup de Dokploy o el backup de la VM lo contiene.

### Rollback de aplicación

Para una regresión funcional, en Dokploy cambia la imagen a una etiqueta anterior `sha-<SHA completa>` que exista en GHCR y despliega. El volumen no se toca. Para un fallo durante la actualización, el health check y `FailureAction: rollback` devuelven el servicio a la versión inmediatamente anterior.

No ejecutes rollback de la VM ni restaures SQLite sin una razón clara: eso puede perder el progreso creado desde la copia. Toma una copia actual del volumen antes de recuperar datos.

### Mantenimiento

Antes de actualizar Dokploy, haz backup de la VM, revisa las notas de versión y ensaya en una VM de laboratorio. La actualización estándar es:

```bash
curl -sSL https://dokploy.com/install.sh | sudo sh -s update
```

Mantén las actualizaciones de Ubuntu y el control de espacio de Docker como tareas programadas. No apliques `docker system prune --volumes` en producción: elimina volúmenes no usados y puede destruir datos recuperables.

## 13. Diagnóstico dirigido

| Síntoma | Comprobación | Corrección |
| --- | --- | --- |
| El pipeline publica pero la aplicación sigue en la versión anterior | Revisa la imagen visible en Dokploy | Aplica el paso 10: el webhook por sí solo no actualiza una etiqueta SHA |
| `pull access denied` o `unauthorized` | Verifica paquete privado y PAT `read:packages` | Corrige el acceso del paquete y el registro GHCR de Dokploy; no eleves a escritura |
| Certificado no se emite | Comprueba DNS público y entrada TCP 80 | Corrige DNS/NAT/firewall y vuelve a solicitar TLS |
| Error de SQLite al inicio | Revisa permisos y montaje en `/app/data` | Usa volumen nombrado o asigna el bind mount al UID/GID `10001` |
| Se pierde progreso tras redeploy | Comprueba el volumen en la aplicación | Monta el volumen exactamente en `/app/data`; no en `/app` ni en otra ruta |
| La SPA abre pero las llamadas API fallan | Comprueba `https://APP_FQDN/api/health` | El dominio debe enrutar al mismo contenedor por el puerto 8000, no a un hosting estático separado |
| Dokploy deja de ser accesible | Verifica que el dominio TLS funciona antes de retirar 3000 | Restaura temporalmente la publicación de 3000 solo desde `ADMIN_CIDR` y corrige el dominio |

## Referencias operativas

- [Instalación y opciones de PVE/LXC de Dokploy](https://docs.dokploy.com/docs/core/installation)
- [Instalación manual y advertencia sobre Swarm existente](https://docs.dokploy.com/docs/core/manual-installation)
- [Despliegue de imágenes externas y automatización](https://docs.dokploy.com/docs/core/applications/going-production)
- [Configuración de registros en Dokploy](https://docs.dokploy.com/docs/core/registry)
- [API de aplicaciones de Dokploy](https://docs.dokploy.com/docs/api/application)
- [Autenticación y permisos del Container Registry de GitHub](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
