# cors-preflight-service

A minimal Node.js service that responds to all CORS preflight (HTTP OPTIONS) requests with 204 No Content and permissive CORS headers. Useful when upstream targets (e.g., Google Cloud Workflows) do not handle OPTIONS requests.

## What it does

- Always replies to `OPTIONS` with `204` and CORS headers
- Adds the same CORS headers to all responses
- Provides simple health endpoints: `/healthz`, `/readyz`

## Configuration

Environment variables (see `env.example`):

- `PORT` (default: `8080`)
- `CORS_ALLOW_ORIGIN` (default: `*`)
- `CORS_ALLOW_METHODS` (default: `GET,POST,PUT,PATCH,DELETE,OPTIONS`)
- `CORS_ALLOW_HEADERS` (default: `Content-Type,Authorization,X-Requested-With`)
- `CORS_ALLOW_CREDENTIALS` (default: `true`)
- `CORS_MAX_AGE` (default: `600` seconds)

## Local development

```bash
node services/cors-preflight-service/server.js
```

Test an OPTIONS request:

```bash
curl -i -X OPTIONS http://localhost:8080/
```

## Docker

```bash
docker build -t cors-preflight-service ./services/cors-preflight-service
docker run -p 8080:8080 cors-preflight-service
```

## Notes

- This service is intended as a lightweight preflight responder in front of services that do not implement OPTIONS.

