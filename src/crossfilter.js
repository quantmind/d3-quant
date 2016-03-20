import {Serie} from './serie';
import {isArray, isFunction, self} from './utils';


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
        return this;
    }

    dimension (f) {
        var o = self.get(this);
        if (arguments.length === 0) return o.dimension;
        var cf = this.crossfilter();
        if (!cf) throw Error('crossfilter not available');
        return crossfilterSerie({
            name: this.name,
            crossfilter: cf,
            dimension: cf.dimension(f)
        });
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

    data () {
        var dim = this.dimension();
        return dim ? dim.top(Infinity) : undefined;
    }
}


function crossfilterSerie (data, opts) {
    if (!crossfilterSerie.crossfilter) throw Error('crossfilterSerie requires crossfilter');
    if (arguments.length === 1 && !isArray(data))
        return new CrossfilterSerie(data);
    else
        return new CrossfilterSerie(opts).crossfilter(data);
}


crossfilterSerie.prototype = Serie.prototype;


export default crossfilterSerie;
