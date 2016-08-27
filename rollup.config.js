import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
    entry: 'index.js',
    format: 'umd',
    moduleName: 'd3',
    plugins: [
        json(),
        babel({
            babelrc: false,
            presets: ['es2015-rollup']
        })
    ],
    dest: 'dist/d3-quant.js',
    globals: {
        'd3-array': 'd3',
        'd3-collection': 'd3',
        'd3-let': 'd3',
        'd3-random': 'd3'
    }
};
