import {test} from 'tape';

import {quantVersion} from '../index';


test('quant version', (t) => {
    t.ok(quantVersion);
    t.equal(typeof(quantVersion), 'string');
    t.end();
});
