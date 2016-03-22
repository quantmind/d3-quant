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
    var fields = s.fields;
    t.equal(fields.length, 5);
    t.ok(fields.indexOf('date') > -1);
    t.ok(fields.indexOf('quantity') > -1);
    t.ok(fields.indexOf('total') > -1);
    t.ok(fields.indexOf('tip') > -1);
    t.ok(fields.indexOf('type') > -1);
    t.end();
});

test('test timeField', (t) => {
    var s = serie([
        {x: '2016-03-01', y: 300},
        {x: '2016-03-02', y: 400},
        {x: '2016-03-03', y: 350}]);
    t.equal(s.length, 3);
    t.equal(s.timeField('x'), s);
    var r = s.range('x');
    t.deepEqual(r[0], new Date('2016-03-01'));
    t.deepEqual(r[1], new Date('2016-03-03'));
    t.end();
});

test('hasField', (t) => {
    var s = serie();
    t.notOk(s.hasField('x'));

    s = serie([
        {x: '2016-03-01', y: 300},
        {x: '2016-03-02', y: 400},
        {x: '2016-03-03', y: 350}]);
    t.ok(s.hasField('x'));
    t.ok(s.hasField('y'));
    t.notOk(s.hasField('z'));
    t.end();
});

test('empty range', (t) => {
    var s = serie(),
        u = [undefined, undefined];
    t.deepEqual(s.range('foo'), u);
    s = serie([
        {x: '2016-03-01', y: 300},
        {x: '2016-03-02', y: 400},
        {x: '2016-03-03', y: 350}]);
    t.deepEqual(s.range('foo'), u);
    t.end();
});

function simple (d) {
    return d;
}
