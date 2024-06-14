// Initialize counter
let counter = 0;
const fpsDisplay = document.getElementById("fps");

//new worker for fps calculation
const fpsWorker = new Worker("fpsWebWorker.js");

// listening for messages from the worker
fpsWorker.onmessage = function (event) {
  const message = event.data;

  if (message.type === "fps") {
    fpsDisplay.textContent = `FPS: ${message.fps}`;
  }

  if (message.type === "counter-log") {
    console.log(`Value: ${message.value}`);
  }
};

function update() {
  fpsWorker.postMessage({ type: "update", value: counter });
  counter++;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
