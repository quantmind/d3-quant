import {test} from 'tape';
import {serie} from '../';
import fixture from './fixture';


test('test Serie constructor', (t) => {
    var s = serie();
    t.equal(s.data(), undefined);
    t.equal(s.length, 0);
    t.equal(s.mode, 'xy');
    t.end();
});


test('test Serie.range()', (t) => {
    var data = [1,-4,3,-8,10];
    var s = serie().data(data);
    t.equal(s.data(), data);
    t.equal(s.length, 5);
    var xrange = s.range(simple);
    t.equal(xrange[0], -8);
    t.equal(xrange[1], 10);
    t.end();
});


test('test serie.serie', (t) => {
    var s = serie(fixture);
    t.ok(s.data());
    var s2 = s.serie();
    t.notEqual(s, s2);
    t.equal(s.data(), s2.data());
    t.end();
});


function simple (d) {
    return d;
}
