const ostring = Object.prototype.toString;


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


export function extend () {
    var length = arguments.length,
        object = arguments[0],
        index = 0,
        deep = false,
        obj;

    if (object === true) {
        deep = true;
        object = arguments[1];
        index++;
    }

    if (!object || length < index + 2)
        return object;

    while (++index < length) {
        obj = arguments[index];
        if (isObject(obj) && obj !== object) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (deep) {
                        if (isObject(obj[prop]))
                            if (isObject(object[prop]))
                                extend(true, object[prop], obj[prop]);
                            else
                                object[prop] = extend(true, {}, obj[prop]);
                        else
                            object[prop] = obj[prop];
                    } else
                        object[prop] = obj[prop];
                }
            }
        }
    }
    return object;
}


export function isObject (value) {
    return ostring.call(value) === '[object Object]';
}


export function isString (value) {
    return ostring.call(value) === '[object String]';
}


export function isFunction (value) {
    return ostring.call(value) === '[object Function]';
}


export function isArray (value) {
    return ostring.call(value) === '[object Array]';
}


export function isDate (value) {
    return ostring.call(value) === '[object Date]';
}

export function isNumber (value) {
    return ostring.call(value) === '[object Number]';
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
