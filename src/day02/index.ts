import run from "aocrunner";
import { log } from "console";

const parseInput = (rawInput: string) => rawInput;

type Round = {
  green: number;
  red: number;
  blue: number;
};

class Game {
  gameID: number;
  rounds: Round[];
  constructor(gameID: number) {
    this.gameID = gameID;
    this.rounds = [];
  }
}

const parseGame = (rawGame: string) => {
  const gameID = Number(rawGame.split(":")[0].split(" ")[1]);
  const gameData = rawGame.split(":")[1].trim();
  const rounds = gameData.split(";");
  const game = new Game(gameID);
  rounds.forEach((round, i) => {
    const roundData = round.split(",").map((cube) => cube.trim());
    const roundObj: Round = { red: 0, green: 0, blue: 0 };
    roundData.map((cube) => {
      const cubeColor = cube.split(" ")[1];
      const cubeCount = cube.split(" ")[0];
      roundObj[cubeColor] = Number(cubeCount);
    });
    game.rounds.push(roundObj);

    //log({ [i + 1]: roundData });
  });
  //log(game);
  // log({ gameID, gameData });
  return game;
};

const part1 = (rawInput: string) => {
  const validateGames = (games: Game[], cubeLoad: Round): Set<number> => {
    const validGames = new Set<number>();
    games.forEach((game) => {
      let isValidGame = true;
      game.rounds.forEach((round) => {
        if (
          round.red > cubeLoad.red ||
          round.green > cubeLoad.green ||
          round.blue > cubeLoad.blue
        ) {
          isValidGame = false;
        }
      });
      if (isValidGame) {
        validGames.add(game.gameID);
      }
    });
    log(validGames);
    return validGames;
  };
  const input = parseInput(rawInput);
  const inputArr = input.split("\n");
  const cubeLoad: Round = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const games = [];
  inputArr.forEach((line) => {
    games.push(parseGame(line));
  });
  return Array.from(validateGames(games, cubeLoad)).reduce((a, b) => a + b, 0);
};

const part2 = (rawInput: string) => {
  const validateGames = (games: Game[]): number => {
    let totalPower = 0;
    games.forEach((game) => {
      let minCubes = {
        red: 0,
        green: 0,
        blue: 0,
      };
      for (const round of game.rounds) {
        if (round.red > minCubes.red) {
          minCubes.red = round.red;
        }
        if (round.green > minCubes.green) {
          minCubes.green = round.green;
        }
        if (round.blue > minCubes.blue) {
          minCubes.blue = round.blue;
        }
      }
      totalPower += minCubes.red * minCubes.green * minCubes.blue;
    });
    return totalPower;
  };

  const input = parseInput(rawInput);
  const inputArr = input.split("\n");

  const games = [];
  inputArr.forEach((line) => {
    games.push(parseGame(line));
  });
  return validateGames(games);
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
