import {Serie, indexValue} from './serie';
import {self} from './utils';
import {isArray, isFunction, isString, assign} from 'd3-let';


/**
 * A serie build on a crossfilter dimension
 */
export class CrossfilterSerie extends Serie {

    constructor (opts) {
        super(opts);
        if (opts) {
            var o = self.get(this);
            o.crossfilter = opts.crossfilter;
            o.dimension = opts.dimension;
        }
    }

    crossfilter (_) {
        var o = self.get(this);
        if (arguments.length === 0) return o.crossfilter;
        if (_ && !isFunction(_.dimension))
            _ = crossfilterSerie.crossfilter(_);
        o.crossfilter = _;
        o.dimension = null;
        return this;
    }

    /**
     * Crate a new crossfilter dimension and return a new serie
     *
     * @param f
     * @returns {CrossfilterSerie.dimension|*|dimension|o|null}
     */
    dimension (f, opts) {
        if (arguments.length === 0) return self.get(this).dimension;
        var cf = this.crossfilter();
        if (!cf) throw Error('crossfilter not available');
        if (isString(f)) f = indexValue(f);
        return crossfilterSerie(this, assign({dimension: cf.dimension(f)}, opts));
    }

    /**
     * Apply a new filter to this crossfilter dimension
     *
     * A dimension must be available
     *
     * @param f
     */
    filter (f) {
        var dim = this.dimension();
        if (!dim) throw Error('dimension not available');
        dim.filter(f);
        return this;
    }

    group (f) {
        var dim = this.dimension();
        if (!dim) throw Error('dimension not available');
        if (f && !isFunction(f)) f = indexValue(f);
        return dim.group(f);
    }

    data () {
        if (arguments.length > 0) return this;
        var dim = this.dimension();
        return dim ? dim.top(Infinity) : undefined;
    }
}


function crossfilterSerie (data, opts) {
    if (!crossfilterSerie.crossfilter) throw Error('crossfilterSerie requires crossfilter');
    if (data instanceof crossfilterSerie)
        return data.serie(opts, CrossfilterSerie);

    if (arguments.length === 1 && !isArray(data))
        return new CrossfilterSerie(data);
    else
        return new CrossfilterSerie(opts).crossfilter(data);
}


crossfilterSerie.prototype = Serie.prototype;


export default crossfilterSerie;
