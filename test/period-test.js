import {test} from 'tape';
import * as d3 from '../';



test("Test period years", (t) => {
    var a = d3.period('5y');
    t.equal(a.years, 5);
    t.equal(a.months, 0);
    t.end();
});


test("Test period months", (t) => {
    var a = d3.period('5m');
    t.equal(a.years, 0);
    t.equal(a.months, 5);
    t.end();
});


test("Test period months & years", (t) => {
    var a = d3.period('10y5m');
    t.equal(a.years, 10);
    t.equal(a.months, 5);
    t.end();
});


test("Test negative period", (t) => {
    var a = d3.period('-10y5m3d');
    t.equal(a.years, -10);
    t.equal(a.months, -5);
    t.equal(a.days, -3);
    t.end();
});


test("Test totalDays", (t) => {
    var a = d3.period('3d');
    t.equal(a.totalDays, 3);
    a = d3.period('1w3d');
    t.equal(a.totalDays, 10);
    a = d3.period('1y1m1w');
    t.equal(a.totalDays, 12*30+30+7);
    t.end();
});
