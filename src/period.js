var M = {
  Y: "Years",
  M: "Months",
  W: "Weeks",
  D: "Days",
};

export default function period(pstr) {
  if (pstr instanceof period) return pstr;
  return new Period().addTenure(pstr);
}

function Period() {
  this.$months = 0;
  this.$days = 0;

  Object.defineProperties(this, {
    years: {
      get() {
        return Math.trunc(this.$months / 12);
      },
    },
    months: {
      get() {
        return this.$months % 12;
      },
    },
    weeks: {
      get() {
        return Math.trunc(this.$days / 7);
      },
    },
    days: {
      get() {
        return this.$days % 7;
      },
    },
    totalDays: {
      get() {
        return 30 * this.$months + this.$days;
      },
    },
  });
}

Period.prototype = period.prototype = {
  addTenure(pstr) {
    if (pstr instanceof period) {
      this.$months += pstr.$months;
      this.$days += pstr.$days;
    } else {
      var st = ("" + pstr).toUpperCase(),
        search = "DWMY",
        s = 0,
        S = search[s],
        sign = 1,
        ip,
        l;

      if (st[0] === "-") {
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
        this["add" + M[S]](sign * st.substring(ip - l, ip));
        st = st.substring(0, ip - l) + st.substring(ip + 1);
      }
    }
    return this;
  },

  addDays(days) {
    this.$days += days;
  },

  addWeeks(weeks) {
    this.$days += 7 * weeks;
  },

  addMonths(months) {
    this.$months += months;
  },

  addYears(years) {
    this.$months += 12 * years;
  },
};
