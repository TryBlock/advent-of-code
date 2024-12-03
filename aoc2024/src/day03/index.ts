import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const matches = input.matchAll(/mul\((\d+),(\d+)\)/g);

  const result = Array.from(matches).reduce((acc, [_, a, b]) => {
    return acc + Number(a) * Number(b);
  }, 0);

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const matches = input.matchAll(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g);

  let enabled = true;
  const result = Array.from(matches).reduce((acc, [keyword]) => {
    if (keyword === "do()") enabled = true;
    if (keyword === "don't()") enabled = false;

    if (enabled && keyword.includes("mul")) {
      const [_, a, b] = keyword.match(/mul\((\d+),(\d+)\)/)!;
      acc += Number(a) * Number(b);
    }
    return acc;
  }, 0);

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
