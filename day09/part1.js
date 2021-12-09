const path = require("path");
const fs = require("fs");

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const heightMap = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split("\n")
  .map((line) => line.split("").map((n) => Number(n)));

const results = [];
for (let i = 0; i < heightMap.length; i++) {
  for (let j = 0; j < heightMap[i].length; j++) {
    const height = heightMap[i][j];
    if (getAdjacent(i, j).every((adjHeight) => height < adjHeight)) {
      results.push(height);
    }
  }
}

console.log(
  results.map((height) => getRiskLevel(height)).reduce((a, b) => a + b)
);

function getAdjacent(i, j) {
  return directions
    .filter(([x]) => heightMap[i + x] !== undefined)
    .map(([x, y]) => heightMap[i + x][j + y])
    .filter((height) => height !== undefined);
}

function getRiskLevel(height) {
  return 1 + height;
}
