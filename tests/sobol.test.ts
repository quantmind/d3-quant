import { round, sobol } from "../src";

test("test sobol constructor", () => {
  const so = sobol(1);
  expect(so.dimension).toEqual(1);
  expect(so.count).toBe(0);
});

test("test sobol next", () => {
  const so = sobol(1),
    v = so.next();
  expect(v).toBeTruthy();
  expect(so.count).toBe(1);
  expect(v).not.toEqual(so.next());
});

test("test Pi approximation", () => {
  const so = sobol(2),
    precision = 4,
    target = round(Math.PI, precision);

  let pi = 0,
    circle = 0,
    xy = [0, 0],
    x = 0,
    y = 0;

  for (let n = 1; n < 1000; ++n) {
    xy = so.next();
    x = 2 * (xy[0] - 0.5);
    y = 2 * (xy[1] - 0.5);
    if (x * x + y * y <= 1) circle += 1;
    pi = round((4 * circle) / n, precision);
    if (pi === target) break;
  }
  expect(pi).toBe(target);
});

test("test draws", () => {
  const so = sobol(2),
    draws = so.generate(1000);
  expect(draws.length).toBe(1000);
});
