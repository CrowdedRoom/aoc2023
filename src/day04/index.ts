import run from "aocrunner";
import { log } from "console";

const parseInput = (rawInput: string) => rawInput;

class Card {
  cardNumber: number;
  winningNumbers: string[];
  myNumbers: string[];
  constructor(
    cardNumber: number,
    winningNumbers: string[],
    myNumbers: string[],
  ) {
    this.cardNumber = cardNumber;
    this.winningNumbers = winningNumbers;
    this.myNumbers = myNumbers;
  }
}

const scoreCard = (winningNumbers: string[], myNumbers: string[]) => {
  const winningNumbersSet = new Set(winningNumbers);
  const myNumbersSet = new Set(myNumbers);
  const intersection = new Set(
    [...winningNumbersSet].filter((x) => myNumbersSet.has(x)),
  );
  let score = null;
  for (let i = 0; i < intersection.size; i++) {
    if (i === 0) {
      score = 1;
    } else {
      score = score * 2;
    }
  }
  return score ? score : 0;
};

const winCards = (winningNumbers: string[], myNumbers: string[]) => {
  const winningNumbersSet = new Set(winningNumbers);
  const myNumbersSet = new Set(myNumbers);
  const intersection = new Set(
    [...winningNumbersSet].filter((x) => myNumbersSet.has(x)),
  );
  return intersection.size;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputArr = input.split("\n");
  const cards = inputArr
    .map((card, i) => {
      card = card.split(":")[1].trim();
      const winningNumbers = card
        .split("|")[0]
        .trim()
        .split(" ")
        .filter((x) => x !== "");
      const myNumbers = card
        .split("|")[1]
        .trim()
        .split(" ")
        .filter((x) => x !== "");
      return new Card(i + 1, winningNumbers, myNumbers);
    })
    .reduce((a, b) => a + scoreCard(b.winningNumbers, b.myNumbers), 0);
  return cards;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputArr = input.split("\n");
  const cardsWon: Card[] = [];
  const cards = inputArr.map((card, i) => {
    card = card.split(":")[1].trim();
    const winningNumbers = card
      .split("|")[0]
      .trim()
      .split(" ")
      .filter((x) => x !== "");
    const myNumbers = card
      .split("|")[1]
      .trim()
      .split(" ")
      .filter((x) => x !== "");
    return new Card(i + 1, winningNumbers, myNumbers);
  });

  const cardScoresMap = new Map();
  const cardCountMap = new Map();
  cards.forEach((card, j) => {
    const score = winCards(card.winningNumbers, card.myNumbers);
    cardScoresMap.set(card.cardNumber, score);
    let cardCount = cardCountMap.get(card.cardNumber) || 0;
    cardCountMap.set(card.cardNumber, cardCount + 1);
    cardCount = cardCountMap.get(card.cardNumber) || 0;
    for (let k = 1; k <= score; k++) {
      const nextCount = cardCountMap.get(card.cardNumber + k) || 0;
      cardCountMap.set(card.cardNumber + k, nextCount + cardCount);
    }
  });
  let total = Array.from(cardCountMap.values()).reduce((a, b) => a + b, 0);

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
