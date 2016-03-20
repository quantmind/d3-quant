import {test} from 'tape';
import {kmeans} from '../';


test('test kmeans constructor', (t) => {
    var km = kmeans();
    t.equal(km.maxIters(), 300);
    t.ok(km.distance());
    t.end();
});

test('test euclidean distance', (t) => {
    var km = kmeans(),
        distance = km.distance();
    t.equal(typeof(distance), 'function');
    t.equal(distance([1, 1], [1, 1]), 0);
    t.equal(distance([1, 0], [0, 0]), 1);
    t.end();
});
