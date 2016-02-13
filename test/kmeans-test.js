'use strict';
var tape = require("tape"),
    quant = require('../');
//d3 = require('d3-array');


tape('test kmeans constructor', function(test) {
    var kmeans = quant.kmeans();
    test.equal(kmeans.maxIters(), 300);
    test.ok(kmeans.distance());
    test.end();
});

tape('test euclidean distance', function(test) {
    var kmeans = quant.kmeans(),
        distance = kmeans.distance();
    test.equal(typeof(distance), 'function');
    test.equal(distance([1, 1], [1, 1]), 0);
    test.equal(distance([1, 0], [0, 0]), 1);
    test.end();
});
