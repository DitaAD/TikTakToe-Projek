// Simple Tic Tac Toe
const boardEl = document.getElementById("board");
const turnEl = document.getElementById("turn");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const resetScoresBtn = document.getElementById("reset-scores");
const xWinsEl = document.getElementById("x-wins");
const oWinsEl = document.getElementById("o-wins");
const drawsEl = document.getElementById("draws");

let board = Array(9).fill(null);
let turn = "X";
let running = true;
let scores = { X: 0, O: 0, D: 0 };

function loadScores() {
  try {
    const s = JSON.parse(localStorage.getItem("ttt-scores") || "{}");
    scores = { X: s.X || 0, O: s.O || 0, D: s.D || 0 };
  } catch {
    scores = { X: 0, O: 0, D: 0 };
  }
  renderScores();
}

function saveScores() {
  localStorage.setItem("ttt-scores", JSON.stringify(scores));
}

function renderScores() {
  xWinsEl.textContent = scores.X;
  oWinsEl.textContent = scores.O;
  drawsEl.textContent = scores.D;
}

function createBoard() {
  boardEl.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const btn = document.createElement("button");
    btn.className = "cell";
    btn.setAttribute("role", "gridcell");
    btn.dataset.index = i;
    btn.addEventListener("click", onCellClick);
    boardEl.appendChild(btn);
  }
  updateBoard();
}

function updateBoard() {
  const cells = boardEl.querySelectorAll(".cell");
  cells.forEach((c, i) => {
    c.textContent = board[i] || "";
    c.setAttribute("aria-disabled", board[i] ? "true" : "false");
    c.classList.remove("win");
  });
  turnEl.textContent = turn;
}

function checkWinner(b) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b1, c] of lines) {
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
      return { winner: b[a], line: [a, b1, c] };
    }
  }
  if (b.every(Boolean)) return { winner: null }; // draw
  return null;
}

function onCellClick(e) {
  if (!running) return;
  const idx = Number(e.currentTarget.dataset.index);
  if (board[idx]) return;
  board[idx] = turn;

  e.currentTarget.classList.add("active");

  const res = checkWinner(board);
  if (res) {
    running = false;
    if (res.winner) {
      highlightLine(res.line);
      statusEl.textContent = `Winner: ${res.winner}`;
      scores[res.winner] = (scores[res.winner] || 0) + 1;
    } else {
      statusEl.textContent = `Draw`;
      scores.D = (scores.D || 0) + 1;
    }
    saveScores();
    renderScores();
  } else {
    turn = turn === "X" ? "O" : "X";
    statusEl.textContent = `Turn: ${turn}`;
  }
  updateBoard();
}

// NEW highlightLine with diagonal fix
function highlightLine(line) {
  // remove existing stripe
  const existing = boardEl.querySelector(".stripe");
  if (existing) existing.remove();

  // mark winning cells visually
  const cells = boardEl.querySelectorAll(".cell");
  line.forEach((i) => cells[i].classList.add("win"));

  // compute pixel centers of the first and last cell
  const startCell = cells[line[0]];
  const endCell = cells[line[2]];
  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();
  const boardRect = boardEl.getBoundingClientRect();

  const x1 = startRect.left - boardRect.left + startRect.width / 2;
  const y1 = startRect.top - boardRect.top + startRect.height / 2;
  const x2 = endRect.left - boardRect.left + endRect.width / 2;
  const y2 = endRect.top - boardRect.top + endRect.height / 2;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) * 1.05;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const stripe = document.createElement("div");
  stripe.className = "stripe";
  stripe.style.width = `${length}px`;
  stripe.style.height = "8px"; // match CSS
  const centerX = (x1 + x2) / 2;
  const centerY = (y1 + y2) / 2;
  stripe.style.left = `${centerX - length / 2}px`;
  stripe.style.top = `${centerY - 4}px`; // half of stripe height
  stripe.style.opacity = "1";
  stripe.style.transform = `rotate(${angle}deg) scaleX(0)`;

  boardEl.appendChild(stripe);

  // animate into view
  requestAnimationFrame(() => {
    stripe.style.transform = `rotate(${angle}deg) scaleX(1)`;
  });
}

resetBtn.addEventListener("click", () => {
  board = Array(9).fill(null);
  turn = "X";
  running = true;
  statusEl.textContent = `Turn: ${turn}`;

  const oldStripe = boardEl.querySelector(".stripe");
  if (oldStripe) oldStripe.remove();
  updateBoard();
});

resetScoresBtn.addEventListener("click", () => {
  scores = { X: 0, O: 0, D: 0 };
  saveScores();
  renderScores();
});

loadScores();
createBoard();
statusEl.textContent = `Turn: ${turn}`;
