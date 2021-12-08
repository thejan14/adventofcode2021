const path = require("path");
const fs = require("fs");

const codeLengths = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split("\n")
  .map((line) => line.split(" | "))
  .flatMap(([, outputs]) => outputs.split(" ").map((code) => code.length));

console.log(
  codeLengths.filter((n) => n === 2 || n === 3 || n === 4 || n === 7).length
);
