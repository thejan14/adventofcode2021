const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

let totalIncreases = 0;
let lastDepth = undefined;
input.split("\n").forEach((line) => {
  const depth = Number(line);
  if (lastDepth !== undefined && lastDepth < depth) {
    totalIncreases += 1;
  }

  lastDepth = depth;
});

const answer = totalIncreases;

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
