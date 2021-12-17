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

let vx = 1;
let vy = 1;
let optimalVx = 0;
let optimalVy = 0;
let optimalYMax = 0;

let answer;
while (!answer) {
  const { isIn, isBelow, isBehind, yMax } = checkVelocity(vx, vy);
  if (isIn) {
    if (optimalYMax < yMax) {
      optimalYMax = yMax;
      optimalVx = vx;
      optimalVy = vy;
    }

    vy += 1; // if we have a hit, see if we can go higher
  } else {
    if (isBehind) {
      if (optimalVx >= vx) {
        vy += 1; // if we overshoot increase the height to hit the target again
      }
    } else if (isBelow) {
      if (optimalVy !== 0 && optimalVy <= vy) {
        if (vy > optimalVy * 2) {
          answer = optimalYMax; // heuristic exit
        } else {
          vy += 1; // if we overshoot due to too much horizontal velocity increase height to reach the target (below behind target)
        }
      } else {
        vx += 1; // if we have not enough horizontal velocity yet to reach the target, add more (below in front of target)
      }
    }

    if (optimalVx > 0 && vx < optimalVx && vy < optimalVy) {
      break;
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
