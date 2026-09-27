let isRunning = false;
let timerId = null;

self.onmessage = function (event) {
  console.log("Timer worker received message:", event.data);

  if (isRunning) return;
  isRunning = true;

  const state = event.data;
  const { activeTask, secondsRemaining } = state;
  const endDate = activeTask.startDate + secondsRemaining * 1000;

  let countDownSeconds = Math.ceil((endDate - Date.now()) / 1000);

  function tick() {
    if (countDownSeconds <= 0) {
      self.postMessage(0);
      clearTimeout(timerId);
      isRunning = false;
      return;
    }

    self.postMessage(countDownSeconds);
    console.log("Timer worker tick:", countDownSeconds);

    countDownSeconds = Math.floor((endDate - Date.now()) / 1000);
    timerId = setTimeout(tick, 1000);
  }

  tick();
};
