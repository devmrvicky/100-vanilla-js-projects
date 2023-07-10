const btns = document.querySelectorAll(".ctrl-btn");
const paginationWrapper = document.querySelector(".pagination-wrapper");
const carousel = document.querySelector(".carousel");
const imgs = carousel.querySelectorAll("img");

// global variables
let counter = 0;
// let isDragging = false;

// const draggable = () => {
//   isDragging = true
// }
// const noDraggable = () => {
//   isDragging = false;
// }

// show active img
const showActiveImg = () => {
  const paginationBtns = paginationWrapper.querySelectorAll(".pagination-btn");
  paginationBtns.forEach((btn) => btn.classList.remove("active"));
  paginationBtns[counter].classList.add("active");
};

const scroll = (scrollDir, scrollAmount) => {
  // if (!isDragging) return;
  if (scrollDir === "right") {
    carousel.scrollLeft += scrollAmount;
  } else {
    carousel.scrollLeft -= scrollAmount;
  }
  showActiveImg();
};

const handleClickOnPaginationBtn = (e) => {
  const scrollAmount = e - counter;
  const scrollDir = e - counter > 0 ? "right" : "left";
  counter = e;
  scroll(scrollDir, Math.abs(scrollAmount) * imgs[counter].scrollWidth);
};

for (var i = 0; i < imgs.length; i++) {
  let paginationBtn = document.createElement("span");
  paginationBtn.classList.add("pagination-btn");
  paginationBtn.setAttribute("data-btn-no", i);
  paginationBtn.onclick = (e) => {
    handleClickOnPaginationBtn(parseInt(e.currentTarget.dataset.btnNo));
  };
  paginationWrapper.append(paginationBtn);
}

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const scrollDir = e.currentTarget.title;
    const scrollAmount = imgs[counter].scrollWidth;
    scrollDir === "right" ? counter++ : counter--;
    scroll(scrollDir, scrollAmount);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  showActiveImg();
});
