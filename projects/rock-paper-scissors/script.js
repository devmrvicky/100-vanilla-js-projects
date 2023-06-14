const choicesBtn = document.querySelectorAll(".choices-btn button");
const playerScoreEl = document.querySelector('.player-score')
const computerScoreEl = document.querySelector('.computer-score')

// global variables
let computerScore = 0,
  playerScore = 0;

// compute choose the move
const computerChoice = () => {
  const choices = ["rock", "paper", "scissors"];
  const randomChoice = choices[Math.floor(Math.random() * choices.length)];
  return randomChoice;
};

// get the result
const playRound = (computerChoice, playerChoice) => {
  console.log(computerChoice, playerChoice);
  if (computerChoice === playerChoice) {
    return `It's tie because both chooses ${computerChoice}`
  } else if (
    (computerChoice === "rock" && playerChoice === "scissors") ||
    (computerChoice === "paper" && playerChoice === "rock") ||
    (computerChoice === "scissors" && playerChoice === "paper")
  ) {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    return `You lose! ${computerChoice} beats ${playerChoice}`
  }else{
    playerScore++;
    playerScoreEl.textContent = playerScore;
    return `You win! ${playerChoice} beats ${computerChoice}`
  }
};

choicesBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    for(let choiceBtn of choicesBtn){
      if(choiceBtn.classList.contains('hover')){
        choiceBtn.classList.remove('hover')
      }
    }
    btn.classList.add('hover')
    let playerChoice = e.currentTarget.getAttribute("data-choice");
    const result = document.querySelector(".result");
    result.textContent = playRound(computerChoice(), playerChoice);
    result.classList.add("pop-up")
    setTimeout(() => {
      result.classList.remove('pop-up')
    }, 2000)
  });
});
