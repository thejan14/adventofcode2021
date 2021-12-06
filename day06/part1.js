const path = require("path");
const fs = require("fs");

const lanternFish = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split(",")
  .map((n) => Number(n));

for (let i = 0; i < 80; i++) {
  processDay();
}

console.log(lanternFish.length);

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
