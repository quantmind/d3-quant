

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


export function forEach (obj, callback) {
    if (!obj) return;
    if (obj.forEach) return obj.forEach(callback);
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            callback(obj[key], key);
    }
}

export function mapFields(fields, data) {
    return data.map((cross) => {
        return cross.reduce((o, value, i) => {
            o[fields[i]] = value;
            return o;
        }, {});
    });
}

export function zip(keys, values) {
    return keys.reduce((o, key, i) => {
        o[key] = values[i];
    }, {});
}


export function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}
