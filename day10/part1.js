const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

const subsystemCode = input.split("\n");

let result = 0;
for (const line of subsystemCode) {
  const bracketStack = [];
  for (const char of line) {
    if (isOpeningBracket(char)) {
      bracketStack.push(char);
    } else {
      const counterBracket = bracketStack.pop();
      if (char !== getClosingBracket(counterBracket)) {
        result += getCharacterScore(char);
      }
    }
  }
}

const answer = result;

function isOpeningBracket(bracketChar) {
  return (
    bracketChar === "(" ||
    bracketChar === "[" ||
    bracketChar === "{" ||
    bracketChar === "<"
  );
}

function getClosingBracket(bracketChar) {
  switch (bracketChar) {
    case "(":
      return ")";
    case "[":
      return "]";
    case "{":
      return "}";
    case "<":
      return ">";
    default:
      return "";
  }
}

function getCharacterScore(illegialChar) {
  switch (illegialChar) {
    case ")":
      return 3;
    case "]":
      return 57;
    case "}":
      return 1197;
    case ">":
      return 25137;
    default:
      return 0;
  }
}

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
