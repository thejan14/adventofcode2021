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

let frontier = [{ pos: [0, 0], prio: riskMap[0][0] }];
const enqueue = (pos, prio) => {
  const index = frontier.findIndex((i) => i.prio > prio);
  if (index !== -1) {
    frontier.splice(index, 0, { pos, prio });
  } else {
    frontier.push({ pos, prio });
  }
};

const costs = Array.from(Array(riskMap.length), () => Array(riskMap[0].length));
costs[0][0] = 0;

const [targetX, targetY] = [riskMap.length - 1, riskMap.length - 1];
let answer = 0;
search: while (frontier.length > 0) {
  const current = frontier.shift();
  const [x, y] = current.pos;
  for (const [i, j] of directions) {
    const a = x + i;
    const b = y + j;
    if (riskMap[a] && riskMap[a][b]) {
      const nextRisk = riskMap[a][b];
      const nextCosts = costs[x][y] + nextRisk;
      const prevCosts = costs[a][b];
      if (!prevCosts || nextCosts < prevCosts) {
        if (a === targetX && b === targetY) {
          answer = nextCosts;
          break search;
        } else {
          const priority =
            nextCosts + Math.abs(targetX - a) + Math.abs(targetY - b);
          enqueue([a, b], priority);
          costs[a][b] = nextCosts;
        }
      }
    }
  }
}

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
