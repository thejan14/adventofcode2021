const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

const crabPositions = input
  .split(",")
  .map((n) => Number(n))
  .sort((a, b) => a - b);

const median = crabPositions[Math.floor(crabPositions.length / 2)];
const totalFuelCost = crabPositions
  .map((n) => Math.abs(median - n))
  .reduce((a, b) => a + b);

const answer = totalFuelCost;

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
