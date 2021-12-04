const path = require("path");
const fs = require("fs");

// split by double line feed to separate draw and boards
const data = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split("\n\n");

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

const columns = [...Array(boards[0][0].length).keys()];
for (const number of draw) {
  boards.forEach((board) =>
    board.forEach((line) =>
      line
        .filter((n) => !n.marked)
        .forEach((n) => (n.marked = number === n.number))
    )
  );

  const winner = boards.find(
    (board) =>
      board.some((line) => line.every((n) => n.marked)) ||
      columns
        .map((i) => board.map((line) => line[i]))
        .some((column) => column.every((n) => n.marked))
  );

  if (winner) {
    const score = winner
      .flatMap((line) => line.filter((n) => !n.marked))
      .map((n) => n.number)
      .reduce((a, b) => a + b);
    console.log(number * score);
    return;
  }
}
