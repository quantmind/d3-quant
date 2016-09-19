import {assign, isArray, isFunction} from 'd3-let';
import {extent} from 'd3-array';

import {self, forEach} from './utils';


export class Serie {

    constructor(opts) {
        (opts || (opts = {}));
        self.set(this, {
            mode: opts.mode || 'xy',
            name: opts.name || 'default'
        });
    }

    get length() {
        var data = this.data();
        return data ? data.length : 0;
    }

    get fields () {
        var data = this.top(1);
        if (data) {
            var keys = [];
            forEach(data[0], (v, key) => {
                keys.push(key);
            });
            return keys;
        }
    }

    get mode() {
        return self.get(this).mode;
    }

    get name() {
        return self.get(this).name;
    }

    hasField (field) {
        var data = this.top(1);
        return data && data.length ? data[0].hasOwnProperty(field) : false;
    }


    range(field) {
        var data = this.data();
        if (!data) return [undefined, undefined];
        if (!isFunction(field)) field = indexValue(field);
        return extent(data, field);
    }

    data(_) {
        if (arguments.length === 0) return self.get(this).data;
        self.get(this).data = _;
        return this;
    }

    top (number) {
        var data = this.data();
        if (data) return data.slice(0, number);
    }

    each (f) {
        var self = this,
            data = this.data();
        if (data) data.forEach((d, i) => {
            f(d, i, self);
        });
        return this;
    }

    /** extract an array from a given field
     *
     * The field can be an accessor function or a field name
     * @param field
     */
    column (field) {
        var data = this.data();
        if (!data) return;
        if (!isFunction(field)) field = indexValue(field);
        return data.map((d) => {
            return field(d);
        });
    }

    /**
     * Create a new serie from this serie data
     *
     * @param opts
     * @returns {*}
     */
    serie(opts, Constructor) {
        (opts || (opts = {}));
        if (!Constructor) Constructor = Serie;
        var s = new Constructor(assign({}, self.get(this), opts));
        return s.data(this.data());
    }

    labels (_) {
        if (arguments.length === 0) return self.get(this).labels;
        self.get(this).labels = _;
        return this;
    }

    /**
     * Convert a field into Date values
     * @param field
     */
    timeField (field) {
        var data = this.data();
        if (!data) return;
        var d;
        data.forEach((cross) => {
            d = cross[field];
            if (!(d instanceof Date)) cross[field] = new Date(d);
        });
        return this;
    }
}


export default function serie (data, opts) {
    if (data instanceof Serie)
        return data.serie(opts);
    if (arguments.length === 1 && !isArray(data))
        return new Serie(data);
    else
        return new Serie(opts).data(data);
}

serie.prototype = Serie.prototype;


export function indexValue (idx) {
    return function (d) {
        return d[idx];
    };
}


export function constantValue (value) {
    return function () {
        return value;
    };
}
