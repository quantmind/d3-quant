# d3-quant

[![NPM](https://badge.fury.io/js/d3-quant.svg)](https://www.npmjs.com/package/d3-quant)

This is a [d3 plugin](https://bost.ocks.org/mike/d3-plugin/) for quantitative
data analysis, quantitative finance and more.

```
yarn add d3-quant
```

## API Reference

- [Binary Tree]
- [Random Numbers]
- [Periods]

### Binary Tree

A binary tree data-structure which implements the [red-black](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)
self balancing algorithm.

```javascript
var tree = d3.binaryTree();
tree.insert(0.5);
tree.size()         \\  1
tree.maxDepth()     \\  0
tree.insert(0.8);
tree.size()         \\  2
tree.maxDepth()     \\  1
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

### Random Numbers

Two random number generators for multiple dimension.

### Periods

Manipulate periods:

```javascript
var p = d3.period("5y");
p.years; // 5
p.months; // 0
var p = d3.period("5y2m");
p.years; // 5
p.months; // 2
p.days; // 0
var p = d3.period("5y2m9d");
p.years; // 5
p.months; // 2
p.weeks; // 1
p.days; // 2
```

[binary tree]: #binary-tree
[random numbers]: #random-numbers
[periods]: #periods
