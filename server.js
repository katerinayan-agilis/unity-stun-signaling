const WebSocket = require('ws');
const PORT = process.env.PORT || 5000;
const wsServer = new WebSocket.Server({ port: PORT });

// 1) when a client connects
wsServer.on('connection', (socket) => {
  console.log('WS client connected');

  // 2) when a message arrives
  socket.on('message', (data) => {
    const msg = data.toString();
    console.log('WS message:', msg);

    // (optional) broadcast to others
    wsServer.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  // 3) when the socket closes
  socket.on('close', (code, reason) => {
    console.log('WS client disconnected', code, reason?.toString?.());
  });

  // 4) if there’s a socket error
  socket.on('error', (err) => {
    console.error('WS error:', err);
  });
});

// server started
console.log(new Date() + ' Server is listening on port ' + PORT);
