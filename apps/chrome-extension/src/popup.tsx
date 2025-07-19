import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import  { io }  from 'socket.io-client';

const ConnectionStatus: React.FC = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
  const socket = io('http://localhost:3000/events', {
    transports: ['websocket'],
  });

  socket.on('connect', () => setConnected(true));
  socket.on('disconnect', () => setConnected(false));
  socket.on('connect_error', () => setConnected(false));

  return () => {
    socket.disconnect();
  };
}, []);

  return (
    <div style={{ fontSize: '1.2em', padding: '1em' }}>
      {connected ? '🟢 Conectado' : '🔴 Desconectado'}
    </div>
  );
};

// Monta el componente en el div#root de popup.html
const root = createRoot(document.getElementById('root')!);
root.render(<ConnectionStatus />);

