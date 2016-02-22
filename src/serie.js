'use strict';
import {self, assert, isArray} from './utils'


var default_x = indexValue(0);
var default_y = indexValue(1);


export class Serie {

    constructor (mode) {
        self.set(this, {mode: mode || 'xy'});
        this.x(default_x).y(default_y);
    }

    get length () {
        var data = this.data();
        return data ? data.length : 0;
    }

    get mode () {
        return self.get(this).mode;
    }

    x (_) {
        if (arguments.length === 0) return self.get(this).x;
        self.get(this).x = _;
        return this;
    }

    y (_) {
        if (arguments.length === 0) return self.get(this).y;
        self.get(this).y = _;
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


function serie () {
    return new Serie();
}

export function multiSerie () {
    return new MultiSerie();
}


export default serie;


export function indexValue (idx) {
    return function (d) {
        return d[idx];
    };
}


function getRange (data, get) {
    return data.reduce((prev, current) => {
        current = get(current);
        prev[0] = Math.min(current, prev[0]);
        prev[1] = Math.max(current, prev[1]);
        return prev;
    }, [Infinity, -Infinity]);
}
