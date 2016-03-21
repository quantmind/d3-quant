import {test} from 'tape';
import {timeSeries} from '../';


test('test random path', (t) => {
    var s = timeSeries.randomPath();
    t.equal(s.mode, 'time');
    t.equal(s.length, 300);
    t.end();
});
