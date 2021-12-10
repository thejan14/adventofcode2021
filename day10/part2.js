const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

const subsystemCode = input.split("\n");

let scores = [];
for (const line of subsystemCode) {
  const bracketStack = [];
  let corrupted = false;
  let i = 0;
  while (i < line.length && !corrupted) {
    const char = line.charAt(i);
    i += 1;
    if (isOpeningBracket(char)) {
      bracketStack.push(getClosingBracket(char));
    } else {
      const counterBracket = bracketStack.pop();
      if (char !== counterBracket) {
        corrupted = true;
      }
    }
  }

  if (!corrupted && bracketStack.length) {
    scores.push(
      bracketStack
        .reverse()
        .reduce((score, char) => score * 5 + getCharacterScore(char), 0)
    );
  }
}

const answer = scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];

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

function getCharacterScore(completionChar) {
  switch (completionChar) {
    case ")":
      return 1;
    case "]":
      return 2;
    case "}":
      return 3;
    case ">":
      return 4;
    default:
      return 0;
  }
}

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
