const path = require("path");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, "input.txt")),
  crlfDelay: Infinity,
});

// add or substract on 0 or 1 bit per column to find the most common one
// e.g. bitBalance[0] is negative => most common bit in the first column is 0
const bitBalance = Array(12).fill(0);
rl.on("line", (line) => {
  for (let i = 0; i < line.length; i++) {
    if (line.charAt(i) === "1") {
      bitBalance[i] += 1;
    } else {
      bitBalance[i] -= 1;
    }
  }
});

rl.on("close", () => {
  const binaryGammaRate = bitBalance.map((i) => (i > 0 ? "1" : "0")).join("");
  const binaryEpsilonRate = bitBalance.map((i) => (i > 0 ? "0" : "1")).join("");
  console.log(
    Number.parseInt(binaryGammaRate, 2) * Number.parseInt(binaryEpsilonRate, 2)
  );
});
