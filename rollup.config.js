const globals = {
  "d3-array": "d3",
  "d3-random": "d3",
};
const external = Object.keys(globals);

export default {
  input: "src/index.js",
  output: {
    file: "dist/d3-quant.js",
    format: "umd",
    name: "d3",
    extend: true,
    globals,
  },
  external,
};
