const diceFace = document.querySelector(".dice-2d .dice-face");
const rollBtn = document.querySelector(".roll-btn");
const result = document.querySelector(".result");
const dice3DBtn = document.querySelector(".dice-3d-btn");

// 3d dice
const dice3d = document.querySelector(".dice-3d");

dice3DBtn.addEventListener("click", () => {
  dice3d.classList.toggle("show");
  dice3d.classList.contains("show")
    ? (dice3DBtn.textContent = "Hide 3d dice")
    : (dice3DBtn.textContent = "show 3d dice");
});

// get random num
const getRandomNum = (max, min = 0) => Math.floor(Math.random() * max + min);

// let diceArr = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
const diceArr = [
  "&#9856;",
  "&#9857;",
  "&#9858;",
  "&#9859;",
  "&#9860;",
  "&#9861;",
];

// dice history
const diceHis = [];

const getHistory = (selectedDice) => {
  result.innerHTML = "";
  diceHis.push(selectedDice);
  diceHis.forEach(
    (dice, index) =>
      (result.innerHTML += `<div class="dice-roll-history">Roll ${
        index + 1
      } : <span>${dice}</span></div>`)
  );
};

// Get dice face
const getDiceFace = () => {
  const selectedDice = diceArr[getRandomNum(diceArr.length)];
  getHistory(selectedDice);
  diceFace.innerHTML = selectedDice;
};

window.addEventListener("DOMContentLoaded", () => {
  const selectedDice = diceArr[getRandomNum(diceArr.length)];
  diceFace.innerHTML = selectedDice;
});

rollBtn.addEventListener("click", () => {
  diceFace.classList.add("roll-animation");
  setTimeout(() => {
    getDiceFace();
    diceFace.classList.remove("roll-animation");
  }, 1000);
});
