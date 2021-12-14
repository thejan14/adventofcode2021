const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

let [template, instructionData] = input.split("\n\n");

const characterCount = {};
const instructions = {};
instructionData.split("\n").forEach((line) => {
  const from = line.substring(0, 2);
  const to = line.substring(6);
  instructions[from] = to;
  characterCount[to] = 0;
});

for (let i = 0; i < 10; i++) {
  template = [...template].reduce((acc, char, i) => {
    if (i < template.length - 1) {
      const insertion = instructions[char + template[i + 1]];
      if (insertion) {
        characterCount[insertion]
          ? (characterCount[insertion] += 1)
          : (characterCount[insertion] = 1);
        return acc + char + insertion;
      }
    }

    return acc + char;
  }, "");
}

const counts = Object.values(characterCount);
const answer = Math.max(...counts) - Math.min(...counts);

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
