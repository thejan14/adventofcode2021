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

const inputLines = input.split("\n");
const dimension = inputLines.length;

const riskMap = Array.from(Array(dimension * 5), () => Array(dimension * 5));
inputLines.forEach((line, y) =>
  line.split("").forEach((n, x) => {
    const number = Number(n);
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        let newNum = number + i + j;
        if (newNum > 9) {
          newNum = 1 + (newNum % 10);
        }

        riskMap[y + j * dimension][x + i * dimension] = newNum;
      }
    }
  })
);

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

const [targetX, targetY] = [dimension * 5 - 1, dimension * 5 - 1];
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
