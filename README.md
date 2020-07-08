# d3-quant

[![build](https://github.com/quantmind/d3-quant/workflows/build/badge.svg)](https://github.com/quantmind/d3-quant/actions?query=workflow%3Abuild)
[![codecov](https://codecov.io/gh/quantmind/d3-quant/branch/master/graph/badge.svg)](https://codecov.io/gh/quantmind/d3-quant)
[![NPM](https://badge.fury.io/js/d3-quant.svg)](https://www.npmjs.com/package/d3-quant)

This is a [d3 plugin](https://bost.ocks.org/mike/d3-plugin/) for quantitative
data analysis, quantitative finance and more.

```
yarn add d3-quant
```

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Reference**

- [Binary Tree](#binary-tree)
- [Sobol low-discrepancy sequence](#sobol-low-discrepancy-sequence)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Binary Tree

A binary tree data-structure which implements the [red-black](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)
self balancing algorithm.

```javascript
var tree = d3.binaryTree();
tree.insert(0.5);
tree.size           \\  1
tree.maxDepth       \\  0
tree.insert(0.8);
tree.size           \\  2
tree.maxDepth       \\  1
```

Traversing the tree can be done with in order or root to leaf.

**Root to leaf traversal**

```javascript
tree.traverse(function (node) {});
```

**In order traversal**

```javascript
tree.traverseInOrder(function (node) {});
```

## Sobol low-discrepancy sequence

Generate a [Sobol sequence](https://en.wikipedia.org/wiki/Sobol_sequence) for N dimensions.

```javascript
const sobol = d3.sobol(5);
sobol.next()  \\ [ 0, 0, 0, 0, 0 ]
sobol.next()  \\ [ 0.5, 0.5, 0.5, 0.5, 0.5 ]
```
