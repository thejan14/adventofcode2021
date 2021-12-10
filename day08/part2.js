const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

const possibleCharacters = ["a", "b", "c", "d", "e", "f", "g"];

const data = input
  .split("\n")
  .map((line) => line.split(" | "))
  .map(([patterns, outputs]) => [patterns.split(" "), outputs.split(" ")]);

let sum = 0;
for (const [patterns, outputs] of data) {
  // map correct character to misaligned character in patterns
  const segmentAssignements = {};

  // deduce segments by their character occurence, see comment below
  const occurences = getCharOccurences(patterns);
  for (const [char, occ] of Object.entries(occurences)) {
    switch (occ) {
      case 4:
        segmentAssignements["e"] = char;
        break;
      case 6:
        segmentAssignements["b"] = char;
        break;
      case 9:
        segmentAssignements["f"] = char;
        break;
      default:
        break;
    }
  }

  const onePattern = patterns.find((p) => p.length === 2);
  const fourPattern = patterns.find((p) => p.length === 4);
  const sevenPattern = patterns.find((p) => p.length === 3);
  const eightPattern = patterns.find((p) => p.length === 7);

  // comparing 1 and 7 patterns, "a" must be the characer that does not appear in 7
  segmentAssignements["a"] = sevenPattern
    .split("")
    .find((c) => !onePattern.includes(c));

  // knowing "f" (by occurence) the other character in the 1 pattern must be "c"
  segmentAssignements["c"] = onePattern
    .split("")
    .find((c) => c !== segmentAssignements["f"]);

  // comparing 1 and 4 patterns and knowing "b" the remaining character in 4 must be "d"
  segmentAssignements["d"] = fourPattern
    .split("")
    .find((c) => !onePattern.includes(c) && c !== segmentAssignements["b"]);

  // knowing all other characters, the remaining character of the 8 pattern must be "g"
  segmentAssignements["g"] = eightPattern
    .split("")
    .find((c) => !Object.values(segmentAssignements).includes(c));

  sum += getOutputValue(outputs, segmentAssignements);
}

const answer = sum;

/*
 * Count the number of occurences for each character in all 10 patterns.
 * Counting the characters in the correctly aligned patterns yields:
 * 8*a, 6*b, 8*c, 7*d, 4*e, 9*f, 7*g (i.e. b, e and f are unique)
 */
function getCharOccurences(patterns) {
  const allCharacters = patterns.join("");
  const occurences = {};
  for (const char of possibleCharacters) {
    occurences[char] = allCharacters.match(new RegExp(char, "g")).length;
  }

  return occurences;
}

function getOutputValue(outputs, segmentAssignements) {
  // map misaligned character to correct character in patterns
  const correctionMap = {};
  Object.entries(segmentAssignements).forEach(
    ([correction, misalignement]) => (correctionMap[misalignement] = correction)
  );

  const outputValue = outputs
    .map((pattern) =>
      getNumberFromPattern(getCorrectedPattern(pattern, correctionMap))
    )
    .join("");

  return Number(outputValue);
}

function getCorrectedPattern(pattern, correctionMap) {
  return pattern
    .split("")
    .map((c) => correctionMap[c])
    .sort()
    .join("");
}

function getNumberFromPattern(pattern) {
  switch (pattern) {
    case "abcefg":
      return "0";
    case "cf":
      return "1";
    case "acdeg":
      return "2";
    case "acdfg":
      return "3";
    case "bcdf":
      return "4";
    case "abdfg":
      return "5";
    case "abdefg":
      return "6";
    case "acf":
      return "7";
    case "abcdefg":
      return "8";
    case "abcdfg":
      return "9";
    default:
      return "";
  }
}

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
