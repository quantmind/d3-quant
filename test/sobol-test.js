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

tape('test Pi approximation', function(test) {
    var sobol = quant.sobol(2),
        precision = 4,
        target = quant.round(Math.PI, precision),
        pi = 0,
        circle = 0,
        xy, x, y;

    for (var n=1; n<1000; ++n) {
        xy = sobol.next();
        x = 2*(xy[0] - 0.5);
        y = 2*(xy[1] - 0.5);
        if (x*x + y*y <= 1) circle += 1;
        pi = quant.round(4*circle/n, precision);
        if (pi === target)
            break
    }
    test.equal(pi, target);
    test.end();
});
