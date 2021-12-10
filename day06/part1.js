const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

const lanternFish = input.split(",").map((n) => Number(n));

for (let i = 0; i < 80; i++) {
  processDay();
}

const answer = lanternFish.length;

function processDay() {
  const newLanternFish = [];
  for (let i = 0; i < lanternFish.length; i++) {
    if (lanternFish[i] === 0) {
      lanternFish[i] = 6;
      newLanternFish.push(8);
    } else {
      lanternFish[i] -= 1;
    }
  }

  lanternFish.push(...newLanternFish);
}

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
