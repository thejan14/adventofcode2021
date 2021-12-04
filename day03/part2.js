const path = require("path");
const fs = require("fs");

const data = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split("\n");

const oxyGenRating = findRating(data, 0, (bitBalance) => bitBalance >= 0);
const co2GenRating = findRating(data, 0, (bitBalance) => bitBalance < 0);

console.log(oxyGenRating * co2GenRating);

function findRating(currRange, bitPosition, bitCriteria) {
  const bitBalance = getBitBalanceInPosition(currRange, bitPosition);
  let newRange;
  if (bitCriteria(bitBalance)) {
    newRange = currRange.filter((l) => l.charAt(bitPosition) === "1");
  } else {
    newRange = currRange.filter((l) => l.charAt(bitPosition) === "0");
  }

  if (newRange.length === 1) {
    return Number.parseInt(newRange[0], 2);
  } else {
    return findRating(newRange, bitPosition + 1, bitCriteria);
  }
}

function getBitBalanceInPosition(range, bitPosition) {
  return range.reduce(
    (acc, line) => (acc += line.charAt(bitPosition) === "1" ? 1 : -1),
    0
  );
}
