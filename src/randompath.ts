import { range } from "d3-array";
import { randomNormal } from "d3-random";

interface PathInputs {
  sigma: number;
  drift: number;
}

export default function (size: number, options?: PathInputs) {
  const { sigma = 0.1, drift = 0 } = options || {};
  const t = range(0, +size, 1),
    data = [{ x: 0, y: 0 }],
    norm = randomNormal(0, 1);
  let dx: number;

  for (let i = 1; i < t.length; i++) {
    dx = drift + sigma * norm();
    data[i] = {
      x: i,
      y: data[i - 1].y + dx,
    };
  }

  return data;
}
