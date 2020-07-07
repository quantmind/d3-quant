export const euclidean = (v1, v2) => {
  var total = 0;
  for (let i = 0; i < v1.length; i++) total += Math.pow(v2[i] - v1[i], 2);
  return Math.sqrt(total);
};
