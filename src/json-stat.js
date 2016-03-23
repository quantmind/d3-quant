import {forEach} from './utils';
import serie from './serie';
import crossfilterSerie from './crossfilter';

/**
 *
 * https://json-stat.org/
 */
export default function (data, opts) {
    if (data.class !== 'dataset')
        throw new Error('Expected a dataset got ' + data.class);

    var dimensions = [],
        dserie = {
            data: [],
            labels: {}
        };

    // Collect dimensions with size greater than one
    data.id.forEach(function (name, i) {
        if (data.size[i] > 1) {
            var dim = data.dimension[name],
                entries = new Array(data.size[i]),
                labels = {};

            dserie.labels[name] = labels;

            forEach(dim.category.index, function (index, code) {
                entries[index] = {
                    dim: name,
                    value: code
                };
                labels[code] = dim.category.label[code];
            });
            dimensions.push(entries);
        }
    });
    if (!dimensions.length)
        throw new Error('No dimensions');

    fillDimension(data.value, dserie, dimensions, 0, []);

    if (opts && opts.crossfilter) {
        var s = crossfilterSerie(dserie.data).labels(dserie.labels);

        if(opts.clean) {
            var c = s.dimension(function (d) {
                    if (d.value === undefined) return d[opts.clean];
                }).dimension(),
                m = c.group().all().reduce((o, e) => {
                    o[e.key] = e.value;
                    return o;
                }, {});

            c.dispose();

            return s.dimension(opts.clean).filter(function (value) {
                return !m[value];
            });
        }

        return s;
    } else
        return serie(dserie.data).labels(dserie.labels);

}


function fillDimension(values, dserie, dimensions, index, entry0) {
    var dim = dimensions[index],
        N = dimensions.length - 1,
        entry;
    dim.forEach(function (e) {
        entry = entry0.slice();
        entry.push(e);
        if (index < N)
            fillDimension(values, dserie, dimensions, index+1, entry);
        else {
            entry = entry.reduce(zip, {});
            entry['value'] = values[dserie.data.length];
            dserie.data.push(entry);
        }
    });
}

function zip(o, e) {
    o[e.dim] = e.value;
    return o;
}
