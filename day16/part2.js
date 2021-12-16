const path = require("path");
const fs = require("fs");
let { performance } = require("perf_hooks");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const execStart = performance.now();

/* begin solution */

const transmission = [...input.trim().matchAll(/.{2}/g)]
  .map((m) => parseInt(m, 16).toString(2).padStart(8, "0"))
  .join("");

const packageValues = [];
parsePacket(0, packageValues);

const answer = packageValues[0];

function parsePacket(from, values) {
  const type = parseInt(transmission.substring(from + 3, from + 6), 2);
  if (type === 4) {
    return parseLiteral(from + 6, values);
  } else {
    return parseOperator(from + 6, type, values);
  }
}

function parseOperator(from, type, values) {
  let advance = from;
  const operatorValues = [];
  const lengthType = transmission[from];
  if (lengthType === "0") {
    const subStart = from + 16;
    const length = parseInt(transmission.substring(from + 1, subStart), 2);
    advance = subStart;
    while (advance - subStart < length) {
      advance = parsePacket(advance, operatorValues);
    }
  } else {
    const subStart = from + 12;
    const count = parseInt(transmission.substring(from + 1, subStart), 2);
    advance = subStart;
    for (let i = 0; i < count; i++) {
      advance = parsePacket(advance, operatorValues);
    }
  }

  switch (type) {
    case 0:
      values.push(operatorValues.reduce((a, b) => a + b));
      break;
    case 1:
      values.push(operatorValues.reduce((a, b) => a * b));
      break;
    case 2:
      values.push(Math.min(...operatorValues));
      break;
    case 3:
      values.push(Math.max(...operatorValues));
      break;
    case 5:
      values.push(Number(operatorValues[0] > operatorValues[1]));
      break;
    case 6:
      values.push(Number(operatorValues[0] < operatorValues[1]));
      break;
    case 7:
      values.push(Number(operatorValues[0] === operatorValues[1]));
      break;
  }

  return advance;
}

function parseLiteral(from, values) {
  let value = transmission.substring(from + 1, from + 5);
  while (transmission[from] !== "0") {
    from += 5;
    value += transmission.substring(from + 1, from + 5);
  }

  values.push(parseInt(value, 2));
  return from + 5;
}

/* end solution */

const execEnd = performance.now();
const micros = (execEnd - execStart) * 1000;
console.log(`${answer} (${micros.toFixed(2)} µs)`);
