const globals = {
  "d3-array": "d3",
  "d3-random": "d3",
};
const external = Object.keys(globals);

export default {
  input: {
    entry: "src/index.js",
  },
  output: {
    dest: "build/d3-quant.js",
    format: "umd",
    globals,
    name: "d3",
  },
  external,
};
