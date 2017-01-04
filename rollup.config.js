import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
    entry: 'index.js',
    format: 'umd',
    moduleName: 'd3',
    moduleId: 'd3-quant',
    plugins: [
        json(),
        babel({
            babelrc: false,
            presets: ['es2015-rollup']
        })
    ],
    dest: 'build/d3-quant.js',
    globals: {
        'd3-array': 'd3'
    }
};
