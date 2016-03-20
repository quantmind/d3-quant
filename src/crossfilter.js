import {Serie} from './serie';
import {isArray} from './utils';


export class CrossfilterSerie extends Serie {


}


function crossfilterSerie (data, opts) {
    if (!window.crossfilter) throw Error('crossfilterSerie requires crossfilter');
    if (arguments.length === 1 && !isArray(data))
        return new CrossfilterSerie(data);
    else
        return new CrossfilterSerie(opts).data(data);
}


crossfilterSerie.prototype = Serie.prototype;


export default crossfilterSerie;
