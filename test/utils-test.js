import {test} from 'tape';
import * as quant from '../'


test('test isObject', (t) => {
    t.ok(quant.isObject({}));
    t.notOk(quant.isObject([]));
    t.notOk(quant.isObject(''));
    t.notOk(quant.isObject(new Date));
    t.end();
});

test('test isArray', (t) => {
    t.ok(quant.isArray([]));
    t.notOk(quant.isArray({}));
    t.notOk(quant.isArray(''));
    t.notOk(quant.isArray(new Date));
    t.end();
});

test('test isDate', (t) => {
    t.ok(quant.isDate(new Date));
    t.notOk(quant.isDate({}));
    t.notOk(quant.isDate(''));
    t.notOk(quant.isDate([]));
    t.end();
});

test('test extend', (t) => {
    t.equal(quant.extend(), undefined);
    t.notEqual(quant.extend({}, undefined), {});
    t.deepEqual(quant.extend({}, undefined), {});
    t.deepEqual(quant.extend({}, {bla:'foo'}, undefined), {bla: 'foo'});
    t.end();
});
