import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
    entry: 'index.js',
    "format": "umd",
    "moduleName": "d3_quant",
    plugins: [ json(), babel({"presets": ["es2015-rollup"]}) ],
    dest: 'build/d3-quant.js'
};
