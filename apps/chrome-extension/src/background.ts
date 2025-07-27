console.log('[EXT] Background script iniciado');

setInterval(() => {
  console.log('[EXT] Enviando ping (simulado)');
}, 5000);

//Creando instancia del websocket apuntando al Gateway
const socket = new WebSocket("ws: //localhost:3000/events");

//Escuchando mensajes eniados dsde el content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "user-event") {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message.payload));
      console.log("[WebSocket] Evento enviado:", message.payload);
    } else {
      console.warn
    }
  }
})

//cuando se conecte exitosamente
socket.addEventListener("open", () => {
  console.log("[WebSocket] Conectado al Gateway");
})

//Si ocurre un error de conexión
socket.addEventListener("error", (err) => {
  console.log("[WebSocket] Error de conexión", err);
});

//Si se cierra la conexión
socket.addEventListener("close", () => {
  console.warn("[WebSocket] Conexión cerrada");
});