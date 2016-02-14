'use strict';
import {test} from 'tape';
import {version} from '../';


test('quant version', (t) => {
    t.ok(version);
    t.equal(typeof(version), 'string');
    t.end();
});
