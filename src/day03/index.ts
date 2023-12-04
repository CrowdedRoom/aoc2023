import run from "aocrunner";
import { log } from "console";

const parseInput = (rawInput: string) => rawInput;

const isSymbol = (char: string) =>
  !(char >= "0" && char <= "9") && !(char === ".");

const isGear = (char: string) => char === "*";

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputArr = input.split("\n");
  const engineMap = inputArr.map((row) => row.split(""));
  let partSum = 0;
  let numbersArr = [];
  for (let i = 0; i < engineMap.length; i++) {
    for (let j = 0; j < engineMap[i].length; j++) {
      let symbolFound = false;
      if (engineMap[i][j] === ".") {
        continue;
      }
      if (engineMap[i][j] >= "0" && engineMap[i][j] <= "9") {
        // look for adjacent symbol
        // left
        if (j > 0 && isSymbol(engineMap[i][j - 1])) {
          symbolFound = true;
        }
        // right
        if (j < engineMap[0].length - 1 && isSymbol(engineMap[i][j + 1])) {
          symbolFound = true;
        }
        // up
        if (i > 0 && isSymbol(engineMap[i - 1][j])) {
          symbolFound = true;
        }
        // down
        if (i < engineMap.length - 1 && isSymbol(engineMap[i + 1][j])) {
          symbolFound = true;
        }
        // up left
        if (i > 0 && j > 0 && isSymbol(engineMap[i - 1][j - 1])) {
          symbolFound = true;
        }
        // up right
        if (
          i > 0 &&
          j < engineMap[0].length - 1 &&
          isSymbol(engineMap[i - 1][j + 1])
        ) {
          symbolFound = true;
        }
        // down left
        if (
          i < engineMap.length - 1 &&
          j > 0 &&
          isSymbol(engineMap[i + 1][j - 1])
        ) {
          symbolFound = true;
        }
        // down right
        if (
          i < engineMap.length - 1 &&
          j < engineMap[0].length - 1 &&
          isSymbol(engineMap[i + 1][j + 1])
        ) {
          symbolFound = true;
        }

        // find the next number
        let index = j + 1;
        let number = engineMap[i][j];

        while (engineMap[i][index] >= "0" && engineMap[i][index] <= "9") {
          number += engineMap[i][index];
          // look for adjacent symbol
          // left
          if (index > 0 && isSymbol(engineMap[i][index - 1])) {
            symbolFound = true;
          }
          // right
          if (
            index < engineMap[0].length - 1 &&
            isSymbol(engineMap[i][index + 1])
          ) {
            symbolFound = true;
          }
          // up
          if (i > 0 && isSymbol(engineMap[i - 1][index])) {
            symbolFound = true;
          }
          // down
          if (i < engineMap.length - 1 && isSymbol(engineMap[i + 1][index])) {
            symbolFound = true;
          }
          // up left
          if (i > 0 && index > 0 && isSymbol(engineMap[i - 1][index - 1])) {
            symbolFound = true;
          }
          // up right
          if (
            i > 0 &&
            index < engineMap[0].length - 1 &&
            isSymbol(engineMap[i - 1][index + 1])
          ) {
            symbolFound = true;
          }
          // down left
          if (
            i < engineMap.length - 1 &&
            index > 0 &&
            isSymbol(engineMap[i + 1][index - 1])
          ) {
            symbolFound = true;
          }
          // down right
          if (
            i < engineMap.length - 1 &&
            index < engineMap[0].length - 1 &&
            isSymbol(engineMap[i + 1][index + 1])
          ) {
            symbolFound = true;
          }
          index++;
        }
        j = index;
        if (symbolFound) {
          partSum += parseInt(number);
          numbersArr.push(number);
        }
      }
    }
  }
  log(partSum);
  log(numbersArr);
  return partSum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputArr = input.split("\n");
  const engineMap = inputArr.map((row) => row.split(""));
  let gearRatioSum = 0;
  let gearRatioArr = [];
  const gearMap = new Map();
  for (let i = 0; i < engineMap.length; i++) {
    for (let j = 0; j < engineMap[i].length; j++) {
      let gearFound = false;
      let gearLocation = [];
      if (engineMap[i][j] === ".") {
        continue;
      }
      if (engineMap[i][j] >= "0" && engineMap[i][j] <= "9") {
        // look for adjacent gear
        // left
        if (j > 0 && isGear(engineMap[i][j - 1])) {
          gearFound = true;
          gearLocation = [i, j - 1];
        }
        // right
        if (j < engineMap[0].length - 1 && isGear(engineMap[i][j + 1])) {
          gearFound = true;
          gearLocation = [i, j + 1];
        }
        // up
        if (i > 0 && isGear(engineMap[i - 1][j])) {
          gearFound = true;
          gearLocation = [i - 1, j];
        }
        // down
        if (i < engineMap.length - 1 && isGear(engineMap[i + 1][j])) {
          gearFound = true;
          gearLocation = [i + 1, j];
        }
        // up left
        if (i > 0 && j > 0 && isGear(engineMap[i - 1][j - 1])) {
          gearFound = true;
          gearLocation = [i - 1, j - 1];
        }
        // up right
        if (
          i > 0 &&
          j < engineMap[0].length - 1 &&
          isGear(engineMap[i - 1][j + 1])
        ) {
          gearFound = true;
          gearLocation = [i - 1, j + 1];
        }
        // down left
        if (
          i < engineMap.length - 1 &&
          j > 0 &&
          isGear(engineMap[i + 1][j - 1])
        ) {
          gearFound = true;
          gearLocation = [i + 1, j - 1];
        }
        // down right
        if (
          i < engineMap.length - 1 &&
          j < engineMap[0].length - 1 &&
          isGear(engineMap[i + 1][j + 1])
        ) {
          gearFound = true;
          gearLocation = [i + 1, j + 1];
        }

        // find the next number
        let index = j + 1;
        let number = engineMap[i][j];

        while (engineMap[i][index] >= "0" && engineMap[i][index] <= "9") {
          number += engineMap[i][index];
          // look for adjacent symbol
          // left
          if (index > 0 && isGear(engineMap[i][index - 1])) {
            gearFound = true;
            gearLocation = [i, index - 1];
          }
          // right
          if (
            index < engineMap[0].length - 1 &&
            isGear(engineMap[i][index + 1])
          ) {
            gearFound = true;
            gearLocation = [i, index + 1];
          }
          // up
          if (i > 0 && isGear(engineMap[i - 1][index])) {
            gearFound = true;
            gearLocation = [i - 1, index];
          }
          // down
          if (i < engineMap.length - 1 && isGear(engineMap[i + 1][index])) {
            gearFound = true;
            gearLocation = [i + 1, index];
          }
          // up left
          if (i > 0 && index > 0 && isGear(engineMap[i - 1][index - 1])) {
            gearFound = true;
            gearLocation = [i - 1, index - 1];
          }
          // up right
          if (
            i > 0 &&
            index < engineMap[0].length - 1 &&
            isGear(engineMap[i - 1][index + 1])
          ) {
            gearFound = true;
            gearLocation = [i - 1, index + 1];
          }
          // down left
          if (
            i < engineMap.length - 1 &&
            index > 0 &&
            isGear(engineMap[i + 1][index - 1])
          ) {
            gearFound = true;
            gearLocation = [i + 1, index - 1];
          }
          // down right
          if (
            i < engineMap.length - 1 &&
            index < engineMap[0].length - 1 &&
            isGear(engineMap[i + 1][index + 1])
          ) {
            gearFound = true;
            gearLocation = [i + 1, index + 1];
          }
          index++;
        }
        j = index;
        if (gearFound) {
          const gearLocationStr = gearLocation.join(",");
          let n = gearMap.get(gearLocationStr);
          if (n) n.push(number);
          else n = [number];
          gearMap.set(gearLocationStr, n);
        }
      }
    }
  }
  Array.from(gearMap.values()).forEach((gearRatio) => {
    if (gearRatio.length > 1) {
      gearRatioSum += gearRatio.reduce((a, b) => parseInt(a) * parseInt(b));
      gearRatioArr.push(gearRatio);
    }
  });
  // log(gearRatioSum);
  // log(gearRatioArr);
  return gearRatioSum;
};

run({
  part1: {
    tests: [
      //       {
      //         input: `467..114..
      // ...*......
      // ..35..633.
      // ......#...
      // 617*......
      // .....+.58.
      // ..592.....
      // ......755.
      // ...$.*....
      // .664.598..`,
      //         expected: 4361,
      //       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
