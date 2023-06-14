const ctrlBtns = document.querySelectorAll(".ctrl-btn button");
const timerArea = document.querySelector(".timer");

let minute = 60;
let hour = 10;
let clearIntervalId;
let condition = false;

const stopTimer = (x) => {
  clearInterval(x);
};

const setTimer = () => {
    clearIntervalId = setInterval(() => {
      minute--;
      if (minute <= 0) {
        hour--;
        minute = 60;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      timerArea.innerHTML = `${hour} : ${minute === 60 ? 0 : minute}`;
    }, 1000);
};

ctrlBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btnType = e.currentTarget.getAttribute("data-btn-type");
    if (btnType === "start") {
      setTimer();
    } else if (btnType === "stop") {
      stopTimer(clearIntervalId);
    } else if (btnType === "reset") {
      minute = 60;
      hour = 10;
      timerArea.innerHTML = `${hour} : ${minute === 60 ? '00' : minute}`;
      stopTimer(clearIntervalId)
    }
  });
});
