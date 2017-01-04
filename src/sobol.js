var
    BITS = 52,
    SCALE = 2 << 51,
    COEFFICIENTS = [
        'd       s       a       m_i',
        '2       1       0       1',
        '3       2       1       1 3',
        '4       3       1       1 3 1',
        '5       3       2       1 1 1',
        '6       4       1       1 1 3 3',
        '7       4       4       1 3 5 13',
        '8       5       2       1 1 5 5 17',
        '9       5       4       1 1 5 5 5',
        '10      5       7       1 1 7 11 1'
    ];


export default function sobol(dim) {
    return new Sobol(dim);
}


function Sobol(dimension) {
    if (dimension < 1 || dimension > COEFFICIENTS.length) throw new Error("Out of range dimension");
    var tmp = [],
        direction = [],
        zero = [],
        x = [],
        lines = COEFFICIENTS,
        count = 0,
        i;

    Object.defineProperties(this, {
        dimension: {
            get () {
                return dimension;
            }
        },
        count: {
            get () {
                return count;
            }
        }
    });

    this.next = next;

    for (i = 0; i <= BITS; i++) tmp.push(0);
    for (i = 0; i < dimension; i++) {
        direction[i] = tmp.slice();
        x[i] = 0;
        zero[i] = 0;
    }

    for (i = 1; i <= BITS; i++) direction[0][i] = 1 << (BITS - i);
    for (var d = 1; d < dimension; d++) {
        var cells = lines[d].split(/\s+/);
        var s = +cells[1];
        var a = +cells[2];
        var m = [0];
        for (i = 0; i < s; i++) m.push(+cells[3 + i]);
        for (i = 1; i <= s; i++) direction[d][i] = m[i] << (BITS - i);
        for (i = s + 1; i <= BITS; i++) {
            direction[d][i] = direction[d][i - s] ^ (direction[d][i - s] >> s);
            for (var k = 1; k <= s - 1; k++)
                direction[d][i] ^= ((a >> (s - 1 - k)) & 1) * direction[d][i - k];
        }
    }

    function next () {
        if (count === 0) {
            count++;
            return zero.slice();
        }
        var v = [],
            c = 1,
            value = count - 1;
        while ((value & 1) == 1) {
            value >>= 1;
            c++;
        }
        for (i = 0; i < dimension; i++) {
            x[i] ^= direction[i][c];
            v[i] = x[i] / SCALE;
        }
        count++;
        return v;
    }
}

Sobol.prototype = {
    generate (num) {
        var draws = [];
        for (let i=0; i<num; ++i) draws.push(this.next());
        return draws;
    }
};
