const BITS = 52,
  SCALE = 2 << 51,
  COEFFICIENTS = [
    "d       s       a       m_i",
    "2       1       0       1",
    "3       2       1       1 3",
    "4       3       1       1 3 1",
    "5       3       2       1 1 1",
    "6       4       1       1 1 3 3",
    "7       4       4       1 3 5 13",
    "8       5       2       1 1 5 5 17",
    "9       5       4       1 1 5 5 5",
    "10      5       7       1 1 7 11 1",
  ];

interface Sobol {
  generate: (num: number) => number[];
  next: () => number[];
  dimension: number;
  count: number;
}

const Sobol = function (this: Sobol, dimension: number) {
  if (dimension < 1 || dimension > COEFFICIENTS.length)
    throw new Error("Out of range dimension");
  const tmp = [],
    direction: Array<Array<number>> = [],
    zero: number[] = [],
    x: number[] = [],
    lines = COEFFICIENTS;

  let count = 0;

  Object.defineProperties(this, {
    dimension: {
      get() {
        return dimension;
      },
    },
    count: {
      get() {
        return count;
      },
    },
  });

  this.next = next;

  let i;
  for (i = 0; i <= BITS; i++) tmp.push(0);
  for (i = 0; i < dimension; i++) {
    direction[i] = tmp.slice();
    x[i] = 0;
    zero[i] = 0;
  }

  for (i = 1; i <= BITS; i++) direction[0][i] = 1 << (BITS - i);
  for (let d = 1; d < dimension; d++) {
    const cells = lines[d].split(/\s+/);
    const s = +cells[1];
    const a = +cells[2];
    const m = [0];
    for (i = 0; i < s; i++) m.push(+cells[3 + i]);
    for (i = 1; i <= s; i++) direction[d][i] = m[i] << (BITS - i);
    for (i = s + 1; i <= BITS; i++) {
      direction[d][i] = direction[d][i - s] ^ (direction[d][i - s] >> s);
      for (let k = 1; k <= s - 1; k++)
        direction[d][i] ^= ((a >> (s - 1 - k)) & 1) * direction[d][i - k];
    }
  }

  function next() {
    if (count === 0) {
      count++;
      return zero.slice();
    }
    const v = [];
    let c = 1,
      value = count - 1;
    while ((value & 1) == 1) {
      value >>= 1;
      c++;
    }
    for (i = 0; i < dimension; i++) {
      x[i] ^= direction[i][c];
      v[i] = x[i] / SCALE;
    }
    count++;
    return v;
  }
};

Sobol.prototype = {
  generate(num: number) {
    const draws = [];
    for (let i = 0; i < num; ++i) draws.push(this.next());
    return draws;
  },
};

//@ts-ignore
export default (dim: number): Sobol => new Sobol(dim);
