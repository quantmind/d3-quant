var tape = require("tape"),
    quant = require('../');


tape('quant version', function(test) {
    test.ok(quant.version);
    test.end();
});
