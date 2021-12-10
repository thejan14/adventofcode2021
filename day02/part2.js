const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

let depth = 0;
let horizontalPos = 0;
let aim = 0;
input.split("\n").forEach((line) => {
  const value = Number(line.charAt(line.length - 1));
  const direction = line.charAt(0);
  switch (direction) {
    case "f":
      horizontalPos += value;
      depth += aim * value;
      break;
    case "d":
      aim += value;
      break;
    case "u":
      aim -= value;
      break;
  }
});

const answer = depth * horizontalPos;

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
