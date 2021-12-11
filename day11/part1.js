const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

const directions = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

const width = 10;
const height = 10;
const steps = 100;

const energyLevels = input
  .split("\n")
  .map((row) => row.split("").map((n) => Number(n)));

let flashes = 0;
for (let s = 0; s < steps; s++) {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (energyLevels[i][j] < 9) {
        energyLevels[i][j] += 1;
      } else if (energyLevels[i][j] === 9) {
        flash(i, j);
      }
    }
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (energyLevels[i][j] === 10) {
        energyLevels[i][j] = 0;
      }
    }
  }
}

const answer = flashes;

function flash(i, j) {
  energyLevels[i][j] = 10;
  flashes += 1;
  directions.forEach(([a, b]) => {
    const x = i + a;
    const y = j + b;
    if (x > -1 && x < width && y > -1 && y < height) {
      if (energyLevels[x][y] < 9) {
        energyLevels[x][y] += 1;
      } else if (energyLevels[x][y] === 9) {
        flash(x, y);
      }
    }
  });
}

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
