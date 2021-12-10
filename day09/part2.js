const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const heightMap = input
  .split("\n")
  .map((line) =>
    line.split("").map((n) => ({ height: Number(n), visited: false }))
  );

const results = [];
for (let i = 0; i < heightMap.length; i++) {
  for (let j = 0; j < heightMap[i].length; j++) {
    const point = heightMap[i][j];
    if (!point.visited && point.height !== 9) {
      results.push(getBasinSizeFrom(i, j));
    }
  }
}

const answer = results
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a * b);

function getBasinSizeFrom(i, j) {
  heightMap[i][j].visited = true;
  return (
    1 +
    directions
      .map(([x, y]) => [i + x, j + y])
      .map(([x, y]) => {
        if (
          heightMap[x] !== undefined &&
          heightMap[x][y] !== undefined &&
          !heightMap[x][y].visited &&
          heightMap[x][y].height !== 9
        ) {
          return getBasinSizeFrom(x, y);
        } else {
          return 0;
        }
      })
      .reduce((a, b) => a + b)
  );
}

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
