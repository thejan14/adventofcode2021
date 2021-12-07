const path = require("path");
const fs = require("fs");

const crabPositions = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split(",")
  .map((n) => Number(n));

/*
 * The solution initialy worked for me by just flooring the average,
 * but it will not work for every case. See this awesome explanation:
 * https://www.reddit.com/r/adventofcode/comments/rawxad/2021_day_7_part_2_i_wrote_a_paper_on_todays/
 */

const avg = crabPositions.reduce((a, b) => a + b) / crabPositions.length;
const lowerAvg = Math.round(avg - 0.5);
const higherAvg = Math.round(avg + 0.5);

const totalFuelCostLower = crabPositions
  .map((n) => getFuelCost(Math.abs(lowerAvg - n)))
  .reduce((a, b) => a + b);

const totalFuelCostHigher = crabPositions
  .map((n) => getFuelCost(Math.abs(higherAvg - n)))
  .reduce((a, b) => a + b);

console.log(Math.min(totalFuelCostLower, totalFuelCostHigher));

function getFuelCost(distance) {
  return (distance * (distance + 1)) / 2;
}