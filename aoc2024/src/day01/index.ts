import run from "aocrunner";
import { calcDifference, getLeftRight } from "./lib.js";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const { left, right } = getLeftRight(parseInput(rawInput));

  let sum = 0;

  const leftCopy = [...left];
  const rightCopy = [...right];

  // finde the smallest pairs in left and right and remove the values from the array
  for (let i = 0; i < left.length; i++) {
    const smallestLeft = Math.min(...leftCopy);
    const smallestRight = Math.min(...rightCopy);

    leftCopy.splice(leftCopy.indexOf(smallestLeft), 1);
    rightCopy.splice(rightCopy.indexOf(smallestRight), 1);

    sum += calcDifference(smallestLeft, smallestRight);
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const { left, right } = getLeftRight(parseInput(rawInput));

  return left.reduce((acc, curr) => {
    acc += curr * right.filter((r) => r === curr).length;
    return acc;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
