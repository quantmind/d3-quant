var tape = require("tape"),
    quant = require('../');


tape('test kmeans constructor', function(test) {
    var kmeans = quant.kmeans();
    test.equal(kmeans.maxIters(), 300);
    test.ok(kmeans.distance());
    test.end();
});
