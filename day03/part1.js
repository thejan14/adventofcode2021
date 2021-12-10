const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

// add or substract on 0 or 1 bit per column to find the most common one
// e.g. bitBalance[0] is negative => most common bit in the first column is 0
const bitBalance = Array(12).fill(0);
input.split("\n").forEach((line) => {
  for (let i = 0; i < line.length; i++) {
    if (line.charAt(i) === "1") {
      bitBalance[i] += 1;
    } else {
      bitBalance[i] -= 1;
    }
  }
});

const binaryGammaRate = bitBalance.map((i) => (i > 0 ? "1" : "0")).join("");
const binaryEpsilonRate = bitBalance.map((i) => (i > 0 ? "0" : "1")).join("");

const answer =
  Number.parseInt(binaryGammaRate, 2) * Number.parseInt(binaryEpsilonRate, 2);

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
