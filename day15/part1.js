const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const riskMap = input
  .split("\n")
  .map((line) => line.split("").map((n) => Number(n)));

const frontier = [[0, 0]];
const costs = Array.from(Array(riskMap.length), () => Array(riskMap[0].length));
costs[0][0] = 0;

while (frontier.length > 0) {
  const [x, y] = frontier.shift();
  for (const [i, j] of directions) {
    const a = x + i;
    const b = y + j;
    if (riskMap[a] && riskMap[a][b]) {
      const currRisk = costs[x][y] + riskMap[a][b];
      const prevRisk = costs[a][b];
      if (!prevRisk || currRisk < prevRisk) {
        frontier.push([a, b]);
        costs[a][b] = currRisk;
      }
    }
  }
}

const answer = costs[riskMap.length - 1][riskMap[0].length - 1];

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
