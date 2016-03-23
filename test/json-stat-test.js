import {test} from 'tape';
import * as quant from '../';
import fs from 'fs';

var jdata = JSON.parse(fs.readFileSync('test/demo_pjangroup.json'));

test('test json data', (t) => {
    t.ok(jdata);
    t.end();
});


test('test parse data', (t) => {
    var serie = quant.jsonStat(jdata);
    t.ok(serie.length);
    t.equal(serie.fields.length, 3);
    t.ok(serie.hasField('age'));
    t.ok(serie.hasField('geo'));
    t.ok(serie.hasField('value'));
    t.end();
});


test('test crossfilter', (t) => {
    var cf = quant.jsonStat(jdata, {'crossfilter': true});
    var serie = cf.dimension('geo');
    var total = serie.length;
    t.ok(total);
    t.equal(serie.fields.length, 3);
    t.ok(serie.hasField('age'));
    t.ok(serie.hasField('geo'));
    t.ok(serie.hasField('value'));

    serie.filter('IT');
    t.ok(serie.length);
    t.ok(serie.length < total);

    serie.filter('dvdv');

    t.notOk(serie.length);
    t.end();
});


test('test crossfilter clean geo', (t) => {
    var serie = quant.jsonStat(jdata, {'crossfilter': true, clean: 'geo'});
    var total = serie.length;
    t.ok(total);
    t.equal(serie.fields.length, 3);
    t.ok(serie.hasField('age'));
    t.ok(serie.hasField('geo'));
    t.ok(serie.hasField('value'));

    var ok = true;
    serie.each((d) => {
        if (d === undefined) ok = false;
    });
    t.ok(ok);

    serie.filter('IT');
    t.ok(serie.length);
    t.ok(serie.length < total);

    serie.filter('dvdv');

    t.notOk(serie.length);
    t.end();
});




