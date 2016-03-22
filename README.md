# d3-quant

[![Build Status](https://travis-ci.org/quantmind/d3-quant.svg?branch=master)](https://travis-ci.org/quantmind/d3-quant)
[![Dependency Status](https://david-dm.org/quantmind/d3-quant.svg)](https://david-dm.org/quantmind/d3-quant)
[![devDependency Status](https://david-dm.org/quantmind/d3-quant/dev-status.svg)](https://david-dm.org/quantmind/d3-quant#info=devDependencies)

**PRE ALPHA - DONT USE IT**

This is a [d3 plugin](https://bost.ocks.org/mike/d3-plugin/) for quantitative
data analysis, quantitative finance and more.

## Installing

If you use [NPM](https://www.npmjs.com/package/d3-quant),
``npm install d3-quant``. Otherwise, download the
[latest release](https://github.com/quantmind/d3-quant/releases/latest).
The released bundle supports AMD, CommonJS, and vanilla environments.
Create a custom build using [Rollup](https://github.com/rollup/rollup) or
your preferred bundler.
You can also load directly from https://assets.quantmind.com:
```html
<script src="https://assets.quantmind.com/d3-quant/0.1.0/d3-quant.js"></script>
<script src="https://assets.quantmind.com/d3-quant/0.1.0/d3-quant.min.js"></script>
```
In a vanilla environment, a ``d3_quant`` global is exported.
Try [d3-quant](https://tonicdev.com/npm/d3-quant) in your browser.

## API Reference

* [Series]
* [Random Numbers]
* [Periods


### Series

The serie object is a wrapper around a data array:
```javascript
var s = d3.serie([
        {date: '2016-03-01', price: 300},
        {date: '2016-03-02', price: 400},
        {date: '2016-03-03', price: 350}]).timeField('date');

s.length;               // 3
s.fields;               // ['date', 'price']
s.range('price');       // [300, 400]
s.range('date');        // [ Tue Mar 01 2016 ..., Thu Mar 03 2016 ... ]
```

### Random Numbers

Two random number generators for multiple dimension


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

[Series]: #series
[Random Numbers]: #random-numbers
[Periods]: #periods

