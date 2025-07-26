// content.ts

type UserEvent =
  | { type: 'keydown'; key: string; timestamp: number }
  | { type: 'mousemove'; x: number; y: number; timestamp: number };

document.addEventListener('keydown', (e) => {
  const event: UserEvent = {
    type: 'keydown',
    key: e.key,
    timestamp: Date.now()
  };
  chrome.runtime.sendMessage(event);
});

let lastSent = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSent > 200) {
    const event: UserEvent = {
      type: 'mousemove',
      x: e.clientX,
      y: e.clientY,
      timestamp: now
    };
    chrome.runtime.sendMessage(event);
    lastSent = now;
  }
});