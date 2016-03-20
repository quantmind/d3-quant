import {self, extend, assert, isArray} from './utils'


var default_x = indexValue(0);
var default_y = indexValue(1);
//var default_size = constantValue(1);


export class Serie {

    constructor (opts) {
        (opts || (opts = {}));
        self.set(this, {
            mode: opts.mode || 'xy',
            name: opts.name || 'default'
        });
        this.x(default_x).y(default_y);
    }

    get length () {
        var data = this.data();
        return data ? data.length : 0;
    }

    get mode () {
        return self.get(this).mode;
    }

    get name () {
        return self.get(this).name;
    }

    get dataArray () {
        var data = this.data();
        if (data instanceof Serie) data = data.dataArray;
        return data;
    }

    x (_) {
        if (arguments.length === 0) return self.get(this).x;
        self.get(this).x = _;
        return this;
    }

    y(_) {
        if (arguments.length === 0) return self.get(this).y;
        self.get(this).y = _;
        return this;
    }

    size (_) {
        if (arguments.length === 0) return self.get(this).size;
        self.get(this).size = _;
        return this;
    }

    xscale (_) {
        if (arguments.length === 0) return self.get(this).xscale;
        self.get(this).xscale = _;
        return this;
    }

    yscale (_) {
        if (arguments.length === 0) return self.get(this).yscale;
        self.get(this).yscale = _;
        return this;
    }

    range (field) {
        field = field === 'y' ? this.y() : this.x();
        return getRange(this.data(), field, this.xscale());
    }

    xrange () {
        return getRange(this.data(), this.x(), this.xscale());
    }

    yrange () {
        return getRange(this.data(), this.y(), this.yscale());
    }

    data (_) {
        if (arguments.length === 0) return self.get(this).data;
        self.get(this).data = _;
        return this;
    }

    copy (opts) {
        (opts || (opts = {}));
        var serie = new this.__proto__.constructor(extend({}, self.get(this), opts));
        return serie
                    .x(opts.x || this.x())
                    .y(opts.y || this.y())
                    .size(opts.size || this.size())
                    .data(this.data());
    }

    forEach (callback) {
        var data = this.data();
        if (data) {
            var x = this.x(),
                y = this.y();
            data.forEach((d, n) => {
                callback([x(d), y(d)], n);
            });
        }
    }

    map (callback) {
        var data = this.data();
        if (data) {
            var x = this.x(),
                y = this.y();
            return data.map((d, n) => {
                callback([x(d), y(d)], n);
            });
        } else
            return [];
    }
}


export class MultiSerie extends Serie {

    fields (_) {
        if (arguments.length === 0) return self.get(this).fields;
        assert(isArray(_), "fields must be an array");
        self.get(this).fields = _;
        return this;
    }

    /**
     * Return a x,y serie from this multiSerie
     * @param x
     * @param y
     * @returns {*}
     */
    serie (x, y) {
        var s = serie(this.mode);
        if (arguments.length === 1)
            s.x(this.x()).y(indexValue(x));
        else
            s.x(indexValue(y)).y(indexValue(y));

        return s.data(this);
    }
}


export default function serie (data, opts) {
    if (data instanceof Serie)
        return data.copy(opts);
    if (arguments.length === 1 && !isArray(data))
        return new Serie(data);
    else
        return new Serie(opts).data(data);
}

serie.prototype = Serie.prototype;


export function multiSerie (opts) {
    return new MultiSerie(opts);
}

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

function getRange (data, getter) {
    return data.reduce((prev, current) => {
        current = getter(current);
        prev[0] = Math.min(current, prev[0]);
        prev[1] = Math.max(current, prev[1]);
        return prev;
    }, [Infinity, -Infinity]);
}
