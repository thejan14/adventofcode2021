const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

const data = input
  .split("\n")
  .map((line) =>
    line.split(" -> ").map((coord) => coord.split(",").map((n) => Number(n)))
  );

// remember coordinates where vents occur
const vents = {};
let overlaps = 0;
data.forEach(([[x1, y1], [x2, y2]]) => {
  let xChange = 0;
  let yChange = 0;
  if (x1 !== x2) {
    xChange = (x1 - x2) / Math.abs(x1 - x2);
  }

  if (y1 !== y2) {
    yChange = (y1 - y2) / Math.abs(y1 - y2);
  }

  const length = xChange !== 0 ? Math.abs(x1 - x2) + 1 : Math.abs(y1 - y2) + 1;
  for (let i = 0; i < length; i++) {
    const a = x1 - xChange * i;
    const b = y1 - yChange * i;

    // use a pairing function (Cantor) to uniquely encode coordinates
    const coord = 0.5 * (a + b) * (a + b + 1) + b;
    if (!vents[coord]) {
      vents[coord] = 1;
    } else if (vents[coord] === 1) {
      vents[coord] = 2;
      overlaps += 1;
    }
  }
});

const answer = overlaps;

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
