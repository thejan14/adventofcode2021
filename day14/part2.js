const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

let [template, instructionData] = input.split("\n\n");

const instructions = {};
instructionData.split("\n").forEach((line) => {
  const from = line.substring(0, 2);
  const to = line.substring(6);
  instructions[from] = { char: to, pairs: [from[0] + to, to + from[1]] };
});

let pairs = {};
const characters = {};
characters[template[0]] = characters[template[0]] + 1 || 1;
for (let i = 0; i < template.length - 1; i++) {
  const pair = template.substring(i, i + 2);
  pairs[pair] = pairs[pair] + 1 || 1;
  characters[template[i + 1]] = characters[template[i + 1]] + 1 || 1;
}

for (let i = 0; i < 40; i++) {
  const newPairs = Object.assign({}, pairs);
  for (const [pair, count] of Object.entries(pairs)) {
    if (count > 0) {
      const insertion = instructions[pair];
      if (insertion) {
        newPairs[pair] -= count;
        characters[insertion.char] =
          characters[insertion.char] + count || count;
        insertion.pairs.forEach((p) => {
          newPairs[p] = newPairs[p] + count || count;
        });
      }
    }
  }

  Object.assign(pairs, newPairs);
}

const counts = Object.values(characters);
const answer = Math.max(...counts) - Math.min(...counts);

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
