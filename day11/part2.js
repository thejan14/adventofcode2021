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

const energyLevels = input
  .split("\n")
  .map((row) => row.split("").map((n) => Number(n)));

let syncStep = -1;
let step = 0;
while (syncStep < 0) {
  step += 1;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (energyLevels[i][j] < 9) {
        energyLevels[i][j] += 1;
      } else if (energyLevels[i][j] === 9) {
        flash(i, j);
      }
    }
  }

  let synced = true;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (energyLevels[i][j] === 10) {
        energyLevels[i][j] = 0;
      } else {
        synced = false;
      }
    }
  }

  if (synced) {
    syncStep = step;
  }
}

const answer = syncStep;

function flash(i, j) {
  energyLevels[i][j] = 10;
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
