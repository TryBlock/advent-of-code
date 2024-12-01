export const getLeftRight = (input: string) => {
  // split input into left and right lines
  const lines = input.split("\n");

  const left = lines.map((line) => parseInt(line.split(/\s+/g)[0]));
  const right = lines.map((line) => parseInt(line.split(/\s+/g)[1]));

  return { left, right };
};

export const calcDifference = (a: number, b: number) => (a > b ? a - b : b - a);
