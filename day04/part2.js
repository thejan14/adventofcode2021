const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

// split by double line feed to separate draw and boards
const data = input.split("\n\n");

const whitespacesRegex = / +/;
const draw = data[0].split(",").map((n) => Number(n));
const boards = data.slice(1).map((board) =>
  board.split("\n").map((line) =>
    line
      .trim()
      .split(whitespacesRegex)
      .map((n) => ({ number: Number(n), marked: false }))
  )
);

let answer;
const columns = [...Array(boards[0][0].length).keys()];
const winners = [];
for (const number of draw) {
  boards.forEach((board, i) => {
    if (!winners.includes(i)) {
      board.forEach((line) =>
        line
          .filter((n) => !n.marked)
          .forEach((n) => (n.marked = number === n.number))
      );
    }
  });

  boards.forEach((board, i) => {
    if (
      !winners.includes(i) &&
      (someLineIsMarked(board) || someColumnIsMarked(board))
    ) {
      winners.push(i);
    }
  });

  if (winners.length === boards.length) {
    const lastWinner = boards[winners[winners.length - 1]];
    const score = lastWinner
      .flatMap((line) => line.filter((n) => !n.marked))
      .map((n) => n.number)
      .reduce((a, b) => a + b);
    answer = number * score;
    break;
  }
}

function someLineIsMarked(board) {
  return board.some((line) => line.every((n) => n.marked));
}

function someColumnIsMarked(board) {
  return columns
    .map((i) => board.map((line) => line[i]))
    .some((column) => column.every((n) => n.marked));
}

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
