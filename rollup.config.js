import babel from 'rollup-plugin-babel';

export default {
    entry: 'index.js',
    format: 'umd',
    moduleName: 'd3_quant',
    plugins: [
        babel({
            babelrc: false,
            presets: ['es2015-rollup']
        })
    ],
    dest: 'build/d3-quant.js',
    globals: {
        'd3-array': 'd3_array'
    }
};
