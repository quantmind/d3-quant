import { kmeans } from "../src";

test("test kmeans constructor", () => {
  const km = kmeans();
  expect(km.maxIters()).toBe(300);
  expect(km.distance()).toBeTruthy();
});

test("test euclidean distance", () => {
  const km = kmeans(),
    distance = km.distance();
  expect(typeof distance).toBe("function");
  expect(distance([1, 1], [1, 1])).toBe(0);
  expect(distance([1, 0], [0, 0])).toBe(1);
});
