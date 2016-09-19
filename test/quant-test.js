import {test} from 'tape';

import {quantVersion} from '../';


test('quant version', (t) => {
    t.ok(quantVersion);
    t.equal(typeof(quantVersion), 'string');
    t.end();
});
