import run from "aocrunner";
import { getLines } from "../utils/index.js";
const parseInput = (rawInput: string) => rawInput;

function isSafe(sequence: number[]) {
  const increasing = sequence.every(
    (_, i) => i === 0 || sequence[i] > sequence[i - 1],
  );
  const decreasing = sequence.every(
    (_, i) => i === 0 || sequence[i] < sequence[i - 1],
  );
  const monotonic = increasing || decreasing;

  const validDifferences = sequence.every(
    (_, i) =>
      i === 0 ||
      (Math.abs(sequence[i] - sequence[i - 1]) >= 1 &&
        Math.abs(sequence[i] - sequence[i - 1]) <= 3),
  );

  return monotonic && validDifferences;
}

// Function to check if removing one level can make the sequence safe
function canBeMadeSafe(sequence: number[]) {
  for (let i = 0; i < sequence.length; i++) {
    const modifiedSequence = sequence.slice(0, i).concat(sequence.slice(i + 1));
    if (isSafe(modifiedSequence)) {
      return true;
    }
  }
  return false;
}

// Function to validate sequences with the updated rules
function countSafeOrFixableSequences(sequences: number[][]) {
  return sequences.reduce((count, seq) => {
    if (isSafe(seq) || canBeMadeSafe(seq)) {
      count++;
    }
    return count;
  }, 0);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const levelsPerLine = getLines(input).map((s) => s.split(/\s+/g).map(Number));

  return levelsPerLine.filter(isSafe).length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const levelsPerLine = getLines(input).map((s) => s.split(/\s+/g).map(Number));

  return countSafeOrFixableSequences(levelsPerLine);
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
