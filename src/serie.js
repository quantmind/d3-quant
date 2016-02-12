'use strict';
import {default as self} from './utils'


export default class Serie {

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

    data (_) {
        if (arguments.length === 0) return self.get(this).data;
        self.get(this).data = _;
        return this;
    }

}


function default_x (d) {
    return d.x;
}

function default_y (d) {
    return d.y;
}
