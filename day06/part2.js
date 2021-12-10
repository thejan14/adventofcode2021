const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

const lanternFish = input.split(",").map((n) => Number(n));

// count fish with "age" at respective array position
let ageGroups = Array.from({ length: 9 }, () => 0);
lanternFish.forEach((age) => (ageGroups[age] += 1));

for (let i = 0; i < 256; i++) {
  const newAgeGroups = Array.from({ length: 9 }, () => 0);
  newAgeGroups[8] = ageGroups[0];
  newAgeGroups[6] = ageGroups[0];
  for (let age = 1; age < 9; age++) {
    newAgeGroups[age - 1] += ageGroups[age];
  }

  ageGroups = newAgeGroups;
}

const answer = ageGroups.reduce((a, b) => a + b);

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);