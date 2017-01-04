import {test} from 'tape';
import {sobol, round} from '../index';


test('test sobol constructor', (t) => {
    var so = sobol(1);
    t.equal(so.dimension, 1);
    t.equal(so.count, 0);
    t.end();
});

test('test sobol next', (t) => {
    var so = sobol(1);
    var v = so.next();
    t.ok(v);
    t.equal(so.count, 1);
    t.notEqual(v, so.next());
    t.end();
});

test('test Pi approximation', (t) => {
    var so = sobol(2),
        precision = 4,
        target = round(Math.PI, precision),
        pi = 0,
        circle = 0,
        xy, x, y;

    for (var n=1; n<1000; ++n) {
        xy = so.next();
        x = 2*(xy[0] - 0.5);
        y = 2*(xy[1] - 0.5);
        if (x*x + y*y <= 1) circle += 1;
        pi = round(4*circle/n, precision);
        if (pi === target)
            break;
    }
    t.equal(pi, target);
    t.end();
});


test('test draws', (t) => {
    var so = sobol(2),
        draws = so.generate(1000);
    t.equal(draws.length, 1000);
    t.end();
});
