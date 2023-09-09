let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let currScore = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
  document.addEventListener("touchstart", function () {
    if (started == false) {
      started = true;
      levelUp();
    }
  });
} else {
  document.addEventListener("keypress", function () {
    if (started == false) {
      started = true;
      levelUp();
    }
  });
}

// document.addEventListener("keypress", function () {
//   if (started == false) {
//     console.log("Game has been started");
//     started = true;
//     levelUp();
//   }
// });

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 100);
}
function userFlash(btn) {
  btn.classList.add("user-flash");
  setTimeout(function () {
    btn.classList.remove("user-flash");
  }, 100);
}

function levelUp() {
  userSeq = [];
  level++;
  currScore ++;
  h2.innerText = `Level ${level}`;
  let ranIdx = Math.floor(Math.random() * 4);
  let randomClr = btns[ranIdx];
  let randomBtn = document.querySelector(`.${randomClr}`);
  //   console.log(ranIdx);
  //   console.log(randomClr);
  //   console.log(randomBtn);
  gameSeq.push(randomClr);
  console.log(gameSeq);
  gameFlash(randomBtn);
}

function checkAns(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over!  Your Score was <b> ${level} </b> <br>
        Press any Key to Start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 100);

    reset();

    if(highestScore < currScore){
      highestScore = currScore;
      console.log(highestScore);
      h3.innerText = `Highest Score: ${highestScore}`;
    }
    
    currScore = 0;

  }
}

function btnPress() {
  //   console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
  
}
