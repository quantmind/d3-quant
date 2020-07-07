import { range } from "d3-array";
import { randomNormal } from "d3-random";

const defaults = {
  sigma: 0.1,
  drift: 0,
};

export default function (size, options) {
  options = { ...defaults, ...options };
  var t = range(0, +size, 1),
    S = options.sigma,
    drift = options.drift,
    data = [{ x: 0, y: 0 }],
    norm = randomNormal(0, 1),
    dx;

  for (var i = 1; i < t.length; i++) {
    dx = drift + S * norm();
    data[i] = {
      x: i,
      y: data[i - 1].y + dx,
    };
  }

  return data;
}
