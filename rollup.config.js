import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const plugins = [
  typescript({
    typescript: require("typescript"),
  }),
];

const globals = {
  "d3-array": "d3",
  "d3-random": "d3",
};
const external = Object.keys(globals);

export default [
  {
    input: "src/index.ts",
    output: {
      file: pkg.main,
      format: "umd",
      name: "d3",
      extend: true,
      globals,
    },
    external,
    plugins,
    watch: {
      clearScreen: false,
    },
  },
  {
    input: "src/index.ts",
    output: {
      file: pkg.module,
      format: "esm",
      name: "d3",
      extend: true,
      globals,
    },
    external,
    plugins,
    watch: {
      clearScreen: false,
    },
  },
];
