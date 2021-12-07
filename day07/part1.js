const path = require("path");
const fs = require("fs");

const crabPositions = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split(",")
  .map((n) => Number(n))
  .sort((a, b) => a - b);

const median = crabPositions[Math.floor(crabPositions.length / 2)];
const totalFuelCost = crabPositions
  .map((n) => Math.abs(median - n))
  .reduce((a, b) => a + b);
console.log(totalFuelCost);
