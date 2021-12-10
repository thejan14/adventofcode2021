const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

const codeLengths = input
  .split("\n")
  .map((line) => line.split(" | "))
  .flatMap(([, outputs]) => outputs.split(" ").map((code) => code.length));

const answer = codeLengths.filter(
  (n) => n === 2 || n === 3 || n === 4 || n === 7
).length;

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
