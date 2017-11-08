# d3-quant

[![NPM](https://badge.fury.io/js/d3-quant.svg)](https://www.npmjs.com/package/d3-quant)

[![CircleCI](https://circleci.com/gh/quantmind/d3-quant.svg?style=svg)](https://circleci.com/gh/quantmind/d3-quant)
[![Dependency Status](https://david-dm.org/quantmind/d3-quant.svg)](https://david-dm.org/quantmind/d3-quant)
[![devDependency Status](https://david-dm.org/quantmind/d3-quant/dev-status.svg)](https://david-dm.org/quantmind/d3-quant#info=devDependencies)

This is a [d3 plugin](https://bost.ocks.org/mike/d3-plugin/) for quantitative
data analysis, quantitative finance and more.

## Installing

If you use [NPM](https://www.npmjs.com/package/d3-quant), ``npm install d3-quant``.
Otherwise, download the [latest release](https://github.com/quantmind/d3-quant/releases).
You can also load directly from [giottojs.org](https://giottojs.org),
as a [standalone library](https://giottojs.org/latest/d3-quant.js) or
[unpkg](https://unpkg.com/d3-quant/).
AMD, CommonJS, and vanilla environments are supported. In vanilla, a **d3** global is exported.
Try [d3-quant](https://runkit.com/npm/d3-quant) in your browser.
```html
<script src="https://d3js.org/d3-array.v1.min.js"></script>
<script src="https://giottojs.org/latest/d3-quant.min.js"></script>
```

## API Reference

* [Binary Tree]
* [Random Numbers]
* [Periods]


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
tree.traverse(function (node) {
});
```

**In order traversal**
```javascript
tree.traverseInOrder(function (node) {
});
```

### Random Numbers

Two random number generators for multiple dimension.


### Periods

Manipulate periods:
```javascript
var p = d3.period('5y');
p.years;        // 5
p.months;       // 0
var p = d3.period('5y2m');
p.years;        // 5
p.months;       // 2
p.days;         // 0
var p = d3.period('5y2m9d');
p.years;        // 5
p.months;       // 2
p.weeks;        // 1
p.days;         // 2
```

[Binary Tree]: #binary-tree
[Random Numbers]: #random-numbers
[Periods]: #periods
