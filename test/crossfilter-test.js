import {test} from 'tape';
import {crossfilterSerie, isFunction, mapFields} from '../';
import {default as crossfilter} from 'crossfilter';
import fixture from './fixture';
import fixture2 from './fixture2';

crossfilterSerie.crossfilter = crossfilter;


test('test crossfilterSerie constructor', (t) => {
    var s = crossfilterSerie(fixture);
    t.equal(s.data(), undefined);
    t.ok(s instanceof crossfilterSerie);
    t.ok(isFunction(s.crossfilter().dimension));
    t.end();
});


test('test crossfilterSerie.dimension', (t) => {
    var s = crossfilterSerie(fixture);
    t.ok(s.crossfilter());
    var b = s.dimension('type');
    t.equal(s.crossfilter(), b.crossfilter());
    t.ok(b.dimension());
    t.ok(isFunction(b.dimension().filter));
    t.ok(b.data());
    t.equal(b.length, s.crossfilter().size());
    t.end();
});


test('test crossfilterSerie.filter', (t) => {
    var s = crossfilterSerie(fixture);
    t.ok(s.crossfilter());
    var b = s.dimension(function (d) {
        return d.type;
    });
    var data1 = b.data();
    var serie = b.filter('cash');
    t.equal(serie, b);
    var data2 = serie.data();
    t.ok(data2.length > 0);
    t.ok(data2.length < data1.length);
    t.equal(data2.length, serie.length);
    t.end();
});


test('test crossfilterSerie copy constructor', (t) => {
    var s = crossfilterSerie(fixture);
    t.ok(s.crossfilter());
    var s2 = crossfilterSerie(s);
    t.notEqual(s, s2);
    t.equal(s.crossfilter(), s2.crossfilter(), 'series should share the same crossfilter');
    t.end();
});


test('test crossfilter integer', (t) => {
    var data = mapFields(['year', 'country', 'debt'], fixture2);
    t.equal(data.length, fixture2.length);
    var s = crossfilterSerie(data).dimension('year');
    t.equal(s.data().length, fixture2.length);
    // Apply filter
    t.equal(s, s.filter(2013));
    t.equal(s.data().length, fixture2.length/2);
    t.end();
});
