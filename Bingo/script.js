const allPrompts = [
  "Racist All Chat",
  "Enemy FF",
  "Autofilled Jungler",
  "Someone Recognizes You",
  "Inter",
  "Dodged Lobby",
  "0/10 Teammate",
  "First Timing",
  "One of us Crashes out",
  "Top laner inting",
  "ADC refuses to farm",
  "Support steals kill",
  "Jungle steals your camps",
  "Top complains all game",
  "Random Baron steal",
  "Teammate DC mid game",
  "Jungle camps mid lane",
  "Everyone dies at dragon",
  "First Blood by enemy",
  "Triple kill on the other team",
  "Someone Steals a Penta",
  "Tower dive gone wrong",
  "20-minute surrender vote",
  "Vision score Less than 10",
  "Lane gets ganked 3 times in a row",
  "Spam Pinged",
  "Teammate rage quits",
  "Jungler smites Cannon",
  "ADC overextends",
  "Jungle smite steal",
  "Teammate flames after death",
  "Lane loses tower first",
  "Dragon stolen by enemy",
  "Baron fight disaster",
  "Teammate inting for fun",
  "Random surrender vote",
  "Ally refuses to group",
  "Teammate Flashes and still dies"
];

const bingoSound = new Audio("Winner.mp3"); 


function shuffleArray(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildBoard() {
  const board = document.getElementById("bingo-board");
  board.innerHTML = ""; 

  const selected = shuffleArray(allPrompts).slice(0, 24);
  selected.splice(12, 0, "Free Space");

  const squares = [];

  selected.forEach((text, index) => {
    const square = document.createElement("div");
    square.className = "square";
    square.innerText = text;

    if (text === "Free Space") {
  square.style.backgroundColor = "#6a0d1e";
  square.style.color = "#fff";
  square.style.fontStyle = "italic";
  square.classList.add("clicked"); 
  square.style.textDecoration = "none"; 
} else {
  square.addEventListener("click", () => {
    square.classList.toggle("clicked");
    checkBingo();
  });
}


    squares.push(square);
    board.appendChild(square);
  });

  function checkBingo() {
    // Clear previous glows
    squares.forEach(s => s.classList.remove("bingo-glow"));

    const grid = [];
    for (let i = 0; i < 5; i++) {
      grid[i] = [];
      for (let j = 0; j < 5; j++) {
        grid[i][j] = squares[i * 5 + j].classList.contains("clicked");
      }
    }

    let bingoFound = false;

    // Check rows
    for (let i = 0; i < 5; i++) {
      if (grid[i].every(Boolean)) {
        bingoFound = true;
        for (let j = 0; j < 5; j++) squares[i * 5 + j].classList.add("bingo-glow");
      }
    }

    // Check columns
    for (let j = 0; j < 5; j++) {
      if ([0,1,2,3,4].every(i => grid[i][j])) {
        bingoFound = true;
        for (let i = 0; i < 5; i++) squares[i * 5 + j].classList.add("bingo-glow");
      }
    }

    // Check diagonals
    if ([0,1,2,3,4].every(i => grid[i][i])) {
      bingoFound = true;
      for (let i = 0; i < 5; i++) squares[i * 5 + i].classList.add("bingo-glow");
    }

    if ([0,1,2,3,4].every(i => grid[i][4-i])) {
      bingoFound = true;
      for (let i = 0; i < 5; i++) squares[i * 5 + (4-i)].classList.add("bingo-glow");
    }

    if (bingoFound) bingoSound.play();
    
  }
}

document.getElementById("refresh").addEventListener("click", buildBoard);
buildBoard();

