import run from "aocrunner";
import { log } from "console";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputArray = input
    .split("\n")
    .map((line) =>
      line.split("").filter((char) => !Number.isNaN(Number(char))),
    );
  const numbers = [];
  inputArray.forEach((line) => {
    numbers.push(Number(line[0] + line[line.length - 1]));
  });

  return numbers.reduce((acc, curr) => acc + curr, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");
  const numberWords = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  let sum = 0;
  for (const line of lines) {
    let first = null;
    let last = null;
    for (let index = 0; index < line.length; index++) {
      const char = line[index];
      let currentNumber = null;
      if (char >= "0" && char <= "9") {
        currentNumber = Number(char);
      } else {
        for (const num of numberWords) {
          if (line.substring(index, index + num.length) === num) {
            currentNumber = numberWords.indexOf(num) + 1;
            break;
          }
        }
      }

      if (currentNumber) {
        if (first === null) {
          first = Number(currentNumber);
        }
        last = Number(currentNumber);
      }
    }
    sum += first * 10 + last;
   
  }
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
        expected: 281,
      },
      {
        input: `9dlvndqbddghpxc
rtkrbtthree8sixfoureight6`,
        expected: 135,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
