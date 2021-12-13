const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

let dimensions = [0, 0];
const [dotsData, foldInstructionData] = input.split("\n\n");
const dotCoords = dotsData.split("\n").map((line) => {
  const comma = line.indexOf(",");
  const x = Number(line.substring(0, comma));
  const y = Number(line.substring(comma + 1));
  if (dimensions[0] < x) {
    dimensions[0] = x;
  }
  if (dimensions[1] < y) {
    dimensions[1] = y;
  }
  return [x, y];
});

// dimension starts from 0
dimensions[0] += 1;
dimensions[1] += 1;

const folds = foldInstructionData.split("\n").map((line) => {
  const equalSign = line.indexOf("=");
  return {
    axis: line.charAt(equalSign - 1) === "x" ? 0 : 1,
    pos: Number(line.substring(equalSign + 1)),
  };
});

// only consider the first fold
for (const { axis, pos } of folds) {
  // folding axis also drops out
  dimensions[axis] -= pos + 1;
  for (let i = 0; i < dotCoords.length; i++) {
    if (dotCoords[i][axis] > dimensions[axis]) {
      dotCoords[i][axis] = dimensions[axis] - (dotCoords[i][axis] - pos);
    }
  }
}

const uniqueCoords = new Set(dotCoords.map(([x, y]) => `${x},${y}`));
const answer =
  "read:\n" +
  Array.from({ length: dimensions[1] }, (_, y) =>
    Array.from({ length: dimensions[0] }, (_, x) =>
      uniqueCoords.has(`${x},${y}`) ? "#" : " "
    ).join("")
  ).join("\n");

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
