const M = {
    'Y': 'Years',
    'M': 'Months',
    'W': 'Weeks',
    'D': 'Days'
};


class Period {

    constructor (months, days) {
        this.$months = months || 0;
        this.$days = days || 0;
    }

    get years () {
        return Math.trunc(this.$months/12);
    }

    get months () {
        return this.$months % 12;
    }

    get weeks () {
        return Math.trunc(this.$days/7);
    }

    get days () {
        return this.$days % 7;
    }

    get totalDays () {
        return 30 * this.$months + this.$days;
    }

    addTenure (pstr) {
        if (pstr instanceof period) {
            this.$months += pstr.$months;
            this.$days += pstr.$days;
        } else {
            var st = ('' + pstr).toUpperCase(),
                search = 'DWMY',
                s = 0,
                S = search[s],
                sign = 1,
                ip, l;

            if (st[0] === '-') {
                sign = -1;
                st = st.substring(1);
            }

            while (st.length) {
                if (!S) throw new Error('Unknown period "' + pstr + '"');
                ip = st.indexOf(S);
                if (ip == -1) {
                    S = search[++s];
                    continue;
                }
                l = 0;
                while (ip - l - 1 >= 0 && +st[ip - l - 1] === +st[ip - l - 1]) l++;
                if (!l) throw new Error('Unknown period "' + pstr + '"');
                this['add' + M[S]](sign * st.substring(ip-l, ip));
                st = st.substring(0, ip-l) + st.substring(ip+1);
            }
        }
        return this;
    }

    addDays (days) {
        this.$days += days;
    }

    addWeeks (weeks) {
        this.$days += 7*weeks;
    }

    addMonths (months) {
        this.$months += months;
    }

    addYears (years) {
        this.$months += 12*years;
    }

}


function period (pstr) {
    if (pstr instanceof period) return pstr;
    return new Period().addTenure(pstr);
}

period.prototype = Period.prototype;


export default period;
