'use strict';

// Simulate a WeekMap for now
const self = {
    get: function (obj) {
        return obj._self;
    },
    set: function (obj, value) {
        obj._self = value;
    }
};

export default self;
