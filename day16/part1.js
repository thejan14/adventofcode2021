const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

let answer = 0;
const transmission = [...input.trim().matchAll(/.{2}/g)]
  .map((m) => parseInt(m, 16).toString(2).padStart(8, "0"))
  .join("");

parsePacket(0);

function parsePacket(from) {
  answer += parseInt(transmission.substring(from, from + 3), 2);
  const type = parseInt(transmission.substring(from + 3, from + 6), 2);
  if (type === 4) {
    return parseLiteral(from + 6);
  } else {
    return parseOperator(from + 6);
  }
}

function parseOperator(from) {
  let advance = from;
  const lengthType = transmission[from];
  if (lengthType === "0") {
    const subStart = from + 16;
    const length = parseInt(transmission.substring(from + 1, subStart), 2);
    advance = subStart;
    while (advance - subStart < length) {
      advance = parsePacket(advance);
    }
  } else {
    const subStart = from + 12;
    const count = parseInt(transmission.substring(from + 1, subStart), 2);
    advance = subStart;
    for (let i = 0; i < count; i++) {
      advance = parsePacket(advance);
    }
  }

  return advance;
}

function parseLiteral(from) {
  let i = from;
  while (transmission[i] !== "0") {
    i += 5;
  }

  return i + 5;
}

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
