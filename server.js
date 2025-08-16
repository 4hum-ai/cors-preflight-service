const http = require('http');

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const ALLOW_ORIGIN = process.env.CORS_ALLOW_ORIGIN || '*';
const ALLOW_METHODS = process.env.CORS_ALLOW_METHODS || 'GET,POST,PUT,PATCH,DELETE,OPTIONS';
const ALLOW_HEADERS = process.env.CORS_ALLOW_HEADERS || 'Content-Type,Authorization,X-Requested-With';
const ALLOW_CREDENTIALS = process.env.CORS_ALLOW_CREDENTIALS || 'true';
const MAX_AGE = process.env.CORS_MAX_AGE || '600';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Credentials', ALLOW_CREDENTIALS);
  res.setHeader('Access-Control-Allow-Methods', ALLOW_METHODS);
  res.setHeader('Access-Control-Allow-Headers', ALLOW_HEADERS);
  res.setHeader('Access-Control-Max-Age', MAX_AGE);

  const origin = req.headers['origin'] || '-';

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    // eslint-disable-next-line no-console
    console.log(`[cors-preflight-service] 204 OPTIONS ${req.url} origin=${origin}`);
    return;
  }

  if (req.url === '/healthz' || req.url === '/readyz') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'ok' }));
    // eslint-disable-next-line no-console
    console.log(`[cors-preflight-service] 200 ${req.method} ${req.url}`);
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'cors-preflight-service running', method: req.method, path: req.url }));
  // eslint-disable-next-line no-console
  console.log(`[cors-preflight-service] 200 ${req.method} ${req.url} origin=${origin}`);
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`cors-preflight-service listening on :${PORT}`);
});


