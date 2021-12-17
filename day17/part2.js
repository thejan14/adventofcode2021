const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

const targetAreaRegex =
  /^target area: x=(?<xFrom>-?\d+)\.\.(?<xTo>-?\d+), y=(?<yFrom>-?\d+)\.\.(?<yTo>-?\d+)$/;
const {
  groups: { xFrom, xTo, yFrom, yTo },
} = input.trim().match(targetAreaRegex);

let boundsX = Math.abs(Number(xTo)) + 1;
let boundsY = Math.abs(Number(yFrom)) + 1;

let answer = 0;
for (let vy = -boundsY; vy < boundsY; vy++) {
  for (let vx = 1; vx < boundsX; vx++) {
    const { isIn } = checkVelocity(vx, vy);
    if (isIn) {
      answer += 1;
    }
  }
}

function checkVelocity(vx, vy) {
  let xPos = 0;
  let yPos = 0;
  let result = { isIn: false, isBelow: false, isBehind: false, yMax: 0 };
  while (!result.isBehind && !result.isBelow) {
    xPos += vx;
    yPos += vy;
    vy -= 1;
    if (vx !== 0) {
      vx += vx > 0 ? -1 : 1;
    }

    result.yMax = Math.max(result.yMax, yPos);
    result.isIn = isInTarget(xPos, yPos);
    result.isBehind = isBehindTarget(xPos);
    result.isBelow = isBelowTarget(yPos);
    if (result.isIn) {
      return result;
    }
  }

  return result;
}

function isInTarget(xPos, yPos) {
  return xPos >= xFrom && xPos <= xTo && yPos >= yFrom && yPos <= yTo;
}

function isBehindTarget(xPos) {
  return xPos > xTo;
}

function isBelowTarget(yPos) {
  return yPos < yFrom;
}

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
