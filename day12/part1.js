const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

let graph = {};
input
  .split("\n")
  .map((line) => line.split("-"))
  .forEach(([from, to]) => {
    if (graph[from]) {
      graph[from].push(to);
    } else {
      graph[from] = [to];
    }

    if (graph[to]) {
      graph[to].push(from);
    } else {
      graph[to] = [from];
    }
  });

let paths = 0;
findPaths("start", []);

const answer = paths;

function findPaths(cave, visited) {
  if (cave === cave.toLowerCase()) {
    visited.push(cave);
  }

  graph[cave].forEach((c) => {
    if (c === "end") {
      paths += 1;
    } else if (!visited.includes(c)) {
      findPaths(c, [...visited]);
    }
  });
}

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
