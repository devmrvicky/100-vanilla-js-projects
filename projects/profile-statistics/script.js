const statsValues = document.querySelectorAll(".stats .stats-value");
const bars = document.querySelectorAll(".bar span");
const interval = 5000;

statsValues.forEach((statsValue) => {
  let startValue = 0;
  let startPercentage = 0;
  let endValue = parseInt(statsValue.dataset.value);
  let targetValue = parseInt(statsValue.dataset.targetValue);
  const endPercentage = (endValue * 100) / targetValue;
  const duration = Math.floor(interval / endValue);
  const counter = setInterval(function () {
    startValue += 1;
    statsValue.textContent = startValue;
    if (endValue === startValue) {
      clearInterval(counter);
    }
  }, duration);

  const counter2 = setInterval(() => {
    startPercentage += 1;
    statsValue.nextElementSibling.children[0].style.width =
      startPercentage + "%";
    statsValue.nextElementSibling.children[0].textContent =
      startPercentage + "%";
    if (endPercentage === startPercentage) {
      clearInterval(counter2);
      statsValue.nextElementSibling.children[0].style.backgroundColor = "green";
    }
  }, Math.floor(interval / endPercentage));
});

// bars.forEach((bar) => {
//   let targetElem = bar.parentElement.previousElementSibling;
//   let startPercentage = 0;
//   let endValue = parseInt(targetElem.dataset.value);
//   let targetValue = parseInt(targetElem.dataset.targetValue);
//   const endPercentage = (endValue * 100) / targetValue;
//   let duration = Math.floor(interval / endPercentage);
//   const counter = setInterval(() => {
//     startPercentage += 1;
//     bar.style.width = startPercentage + "%";
//     bar.textContent = startPercentage + "%";
//     if (startPercentage === endPercentage) {
//       clearInterval(counter);
//     }
//   }, duration);
// });
