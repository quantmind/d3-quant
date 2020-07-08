const OFF = 0;
const ERROR = 2;

module.exports = {
  parser: "@typescript-eslint/parser",

  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },

  parserOptions: {
    sourceType: "module",
  },

  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    //'plugin:jest/recommended'
    "plugin:@typescript-eslint/recommended",
  ],

  rules: {
    "@typescript-eslint/no-explicit-any": OFF,
    "@typescript-eslint/explicit-function-return-type": OFF,
    "@typescript-eslint/no-use-before-define": OFF,
    "@typescript-eslint/camelcase": OFF,
    "@typescript-eslint/explicit-module-boundary-types": OFF,
    "@typescript-eslint/ban-ts-comment": OFF,
    "no-cond-assign": OFF,
    "no-floating-decimal": ERROR,
    "no-trailing-spaces": ERROR,
    "no-multiple-empty-lines": [ERROR, { max: 2, maxEOF: 0 }],
    "eol-last": ERROR,
    semi: ERROR,
    complexity: [ERROR, { max: 15 }],
    // prevent lint errors if you don't use some function arguments
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "none" },
    ],
  },
};
