import {range} from 'd3-array';
import {randomNormal} from 'd3-random';
import {extend} from 'd3-let';
import {Serie} from './serie';
import {assert, mapFields} from './utils';


export class TimeSeries extends Serie {
    /**
     * Get a serie from a field
     * @param field
     * @returns {*}
     */
    get mode () {
        return 'time'
    }
}


function timeSeries () {
    return new TimeSeries();
}

export default timeSeries;

/**
 * Create a multi-timeserie from a random work
 *
 * dx = D*dt + S*dW_t
 *
 * @param options
 */
timeSeries.randomPath = function (options) {
    options = extend({}, timeSeries.randomPath.defaults, options);
    assert(options.fields.length > 0, "There must be two or more fields")
    var t = range(0, options.size, 1),
        S = options.sigma,
        drift = options.drift,
        data = [[0, 0]],
        norm = randomNormal(0, 1),
        dx;

    for (var i = 1; i < t.length; i++) {
        dx = drift + S * norm();
        data[i] = [i, data[i - 1][1] + dx];
    }

    return timeSeries().data(mapFields(options.fields, data));
};


timeSeries.randomPath.defaults = {
    fields: ['x', 'y'],
    size: 300,
    sigma: 0.1,
    drift: 0
};
