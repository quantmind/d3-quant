'use strict';
import {self} from './utils'


export class Serie {

    constructor () {
        self.set(this, {});
        this.x(default_x).y(default_y);
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


export default function serie () {
    return new Serie();
}

function default_x (d) {
    return d.x;
}

function default_y (d) {
    return d.y;
}

function getRange (data, get) {
    return data.reduce((prev, current) => {
        current = get(current);
        prev[0] = Math.min(current, prev[0]);
        prev[1] = Math.max(current, prev[1]);
        return prev;
    }, [Infinity, -Infinity]);
}
