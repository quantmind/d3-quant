'use strict';
var tape = require("tape"),
    quant = require('../');


tape('test sobol constructor', function(test) {
    var sobol = quant.sobol(1);
    test.equal(sobol.dimension, 1);
    test.equal(sobol.count, 0);
    test.end();
});

tape('test sobol next', function(test) {
    var sobol = quant.sobol(1);
    var v = sobol.next();
    test.ok(v);
    test.equal(sobol.count, 1);
    test.notEqual(v, sobol.next());
    test.end();
});

