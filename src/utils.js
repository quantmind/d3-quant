'use strict';

// Simulate a WeekMap for now
export const self = {
    get: function (obj) {
        return obj._self;
    },
    set: function (obj, value) {
        obj._self = value;
    }
};


export function round (x, n) {
    return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
}
