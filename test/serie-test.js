import {test} from 'tape';
import {serie} from '../';


test('test Serie constructor', (t) => {
    var s = serie();
    t.equal(s.data(), undefined);
    t.equal(s.length, 0);
    t.equal(s.mode, 'xy');
    t.ok(s.x());
    t.ok(s.y());
    t.end();
});


test('test Serie.xrange()', (t) => {
    var data = [1,-4,3,-8,10];
    var s = serie().x(simple).data(data);
    t.equal(s.data(), data);
    t.equal(s.length, 5);
    var xrange = s.xrange();
    t.equal(xrange[0], -8);
    t.equal(xrange[1], 10);
    t.end();
});


test('test Serie.yrange()', (t) => {
    var data = [1,-4,3,-8,10];
    var s = serie().y(simple).data(data);
    t.equal(s.data(), data);
    var yrange = s.yrange();
    t.equal(yrange[0], -8);
    t.equal(yrange[1], 10);
    t.end();
});


function simple (d) {
    return d;
}
