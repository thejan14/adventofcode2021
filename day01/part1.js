const path = require("path");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
    crlfDelay: Infinity
});

let totalIncreases = 0;
let lastDepth = undefined;
rl.on("line", (line) => {
    const depth = Number(line);
    if (lastDepth !== undefined && lastDepth < depth) {
        totalIncreases += 1;
    }

    lastDepth = depth;
});

rl.on("close", () => console.log(totalIncreases))