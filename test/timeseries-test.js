import {test} from 'tape';
import {timeSeries} from '../';


test('test Serie constructor', (t) => {
    var s = timeSeries();
    t.equal(s.data(), undefined);
    t.ok(s.x());
    t.ok(s.y());
    t.end();
});


test('test random path', (t) => {
    var s = timeSeries.randomPath();
    t.equal(s.mode, 'time');
    t.equal(s.length, 300);
    t.end();
});
