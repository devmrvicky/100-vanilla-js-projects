const progressLineStatus = document.querySelector(".progress-line-status");
const progressBtns = document.querySelectorAll(".btns button");
const progressSteps = document.querySelectorAll(".progress-step");

let completedStatus = 0;
let tracker = 0;

// decrement
const goPrevStep = (rate) => {
  if(completedStatus <= 0){
    alert('You are on the first step')
    return
  }else{
    if(tracker >= 4) tracker = 3
    progressSteps[tracker]?.children[0]?.classList.remove('fa-beat-fade')
    progressSteps[tracker].children[0].style.color = '#e6e6e6';
    tracker--;
    setTimeout(() => {
      progressSteps[tracker].children[0].style.color = '#e6e6e6';
      progressSteps[tracker]?.children[0]?.classList.add('fa-beat-fade')
    }, 1200)
    // console.log('left ' + tracker)
    completedStatus -= rate;
    if(completedStatus < 0) completedStatus = 0;
    progressLineStatus.style.width = completedStatus + "%"
  }
}
// increment
const goNextStep = (rate) => {
  if(tracker > 3){
    alert('You have completed all steps')
    return
  }else{
    const checkboxIcon = progressSteps[tracker]?.children[0];
    // console.log(checkboxIcon)
    checkboxIcon.style.color = 'rgb(1, 221, 1)'
    checkboxIcon.classList.remove('fa-beat-fade')
    tracker++;
    setTimeout(() => {
      progressSteps[tracker]?.children[0]?.classList.add('fa-beat-fade')
    }, 1200)
    // console.log('right ' + tracker)
    completedStatus += rate;
    if(completedStatus > 100) completedStatus = 100;
    progressLineStatus.style.width = completedStatus + "%"
  }
}

progressBtns.forEach((progressBtn) => {
  progressBtn.addEventListener("click", (e) => {
    const btn = e.currentTarget.getAttribute("data-dir");
    let rate = 100 / (progressSteps.length - 1)
    if(btn === 'left'){
      goPrevStep(rate)
    }else{
      goNextStep(rate)
    }
  });
});
