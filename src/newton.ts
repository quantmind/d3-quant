const defaults = {
  tolerance: 1e-6,
  epsilon: 1e-12,
  maxIterations: 20,
};

export default (f: any, fprime: any, guess: number, options: any) => {
  options = options || {};
  let tolerance = options.tolerance || defaults.tolerance,
    epsilon = options.epsilon || defaults.epsilon,
    maxIterations = options.maxIterations || defaults.maxIterations,
    result = guess,
    denominator;

  for (let i = 0; i < maxIterations; ++i) {
    denominator = fprime(guess);
    if (Math.abs(denominator) < epsilon) {
      return result;
    }

    result = guess - f(guess) / denominator;

    if (Math.abs(result - guess) < tolerance) {
      return result;
    }

    guess = result;
  }

  return result;
};
