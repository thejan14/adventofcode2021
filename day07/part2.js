const path = require("path");
const fs = require("fs");

const crabPositions = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split(",")
  .map((n) => Number(n));

const avg = crabPositions.reduce((a, b) => a + b) / crabPositions.length;
const lowerAvg = Math.floor(avg);

const totalFuelCost = crabPositions
  .map((n) => getFuelCost(Math.abs(lowerAvg - n)))
  .reduce((a, b) => a + b);
console.log(totalFuelCost);

function getFuelCost(distance) {
  return (distance * (distance + 1)) / 2;
}