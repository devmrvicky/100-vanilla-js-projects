const btns = document.querySelectorAll(".counter-container button");
const resultArea = document.querySelector(".result");
let num = 0,
  counter = 0;

const scroll = (btnType) => {
  const slider = resultArea.querySelectorAll(".slider");
  // console.log(slider
  btnType === "increase"
    ? (resultArea.scrollTop += slider[counter].scrollHeight)
    : (resultArea.scrollTop -= slider[counter].scrollHeight);
  counter++;
};

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const numSlider = document.createElement("div");
    numSlider.classList.add("slider");
    const btnType = e.currentTarget.dataset.btnType;
    // let temp;
    if (btnType === "increase") {
      num++;
    } else {
      num--;
    }
    numSlider.textContent = num;
    resultArea.append(numSlider);
    setTimeout(() => {
      scroll(btnType);
    }, 500);
  });
});
