let frameCount = 0;
// Get the current time
let lastTime = performance.now();

// event listener for messages from the script.js
self.onmessage = function (event) {
  const message = event.data;

  if (message.type === "update") {
    frameCount++;
    let currentTime = performance.now();
    // time elapsed since the last update
    let timeElapsed = currentTime - lastTime;

    if (timeElapsed >= 1000) {
      let fps = Math.round((frameCount / timeElapsed) * 1000);
      self.postMessage({ type: "fps", fps: fps });

      // Reset the frame count and last time
      frameCount = 0;
      lastTime = currentTime;
    }

    self.postMessage({ type: "counter-log", value: message.value });
  }
};
