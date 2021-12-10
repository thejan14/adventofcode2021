const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

const batchSize = 3;
let lineNumber = 0;
let totalIncreases = 0;
let depthsBatch = Array(3);
let lastBatchSum = undefined;
input.split("\n").forEach((line) => {
  depthsBatch[lineNumber % batchSize] = Number(line);
  if (lineNumber >= batchSize) {
    const batchSum = depthsBatch.reduce((a, b) => a + b, 0);
    if (lastBatchSum !== undefined && lastBatchSum < batchSum) {
      totalIncreases += 1;
    }

    lastBatchSum = batchSum;
  }

  lineNumber += 1;
});

const answer = totalIncreases;

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
