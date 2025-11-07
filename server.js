const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/healthz') { res.writeHead(200); res.end('ok'); return; }
  res.writeHead(200); res.end('signaling alive');
});

const wss = new WebSocket.Server({ server });
wss.on('connection', (socket) => {
  // TODO: your signaling logic
  socket.on('message', (msg) => {/* ... */});
});

server.listen(PORT, () => console.log('listening on', PORT));
