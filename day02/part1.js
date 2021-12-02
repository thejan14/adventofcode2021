const path = require("path");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, "input.txt")),
  crlfDelay: Infinity,
});

let depth = 0;
let horizontalPos = 0;
rl.on("line", (line) => {
  const value = Number(line.charAt(line.length - 1));
  const direction = line.charAt(0);
  switch (direction) {
    case "f":
      horizontalPos += value;
      break;
    case "d":
      depth += value;
      break;
    case "u":
      depth -= value;
      break;
  }
});

rl.on("close", () => console.log(depth * horizontalPos));
