const path = require("path");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, "input.txt")),
  crlfDelay: Infinity,
});

const batchSize = 3;
let lineNumber = 0;
let totalIncreases = 0;
let depthsBatch = Array(3);
let lastBatchSum = undefined;
rl.on("line", (line) => {
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

rl.on("close", () => console.log(totalIncreases));
