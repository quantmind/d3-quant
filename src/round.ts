export default (x: number, n: number): number => {
  return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
};
