import {period} from '../index';



test("Test period years", (t) => {
    var a = period('5y');
    t.equal(a.years, 5);
    t.equal(a.months, 0);
    t.end();
});


test("Test period months", (t) => {
    var a = period('5m');
    t.equal(a.years, 0);
    t.equal(a.months, 5);
    t.end();
});


test("Test period months & years", (t) => {
    var a = period('10y5m');
    t.equal(a.years, 10);
    t.equal(a.months, 5);
    t.end();
});


test("Test negative period", (t) => {
    var a = period('-10y5m3d');
    t.equal(a.years, -10);
    t.equal(a.months, -5);
    t.equal(a.days, -3);
    t.end();
});


test("Test totalDays", (t) => {
    var a = period('3d');
    t.equal(a.totalDays, 3);
    a = period('1w3d');
    t.equal(a.totalDays, 10);
    a = period('1y1m1w');
    t.equal(a.totalDays, 12*30+30+7);
    t.end();
});
