import newton from "./newton";

const defaults = {
  interestRate: 6.5,
  loanAmmount: 10000,
  feeRate: 2.0,
  deferred: 0,
  monthlyPayment: 0,
  term: 36,
};

export default function amortisation(options) {
  return new Amortization(options);
}

// Calculate the amortization schedule for a loan
function Amortization(options) {
  Object.assign(this, defaults, options);
}

Amortization.prototype = amortisation.prototype = {
  // Create amortization schedule from interest rate and term
  fromRate() {
    let schedule = [],
      discounter = discount(this),
      guess = this.loanAmmount / this.term;
    this.monthlyPayment = newton(discounter, fprime(discounter), guess);
    discounter(this.monthlyPayment, schedule);
    return schedule;
  },

  interest(amount) {
    return (0.01 * this.interestRate * amount) / 12;
  },
};

function discount(am) {
  // discount an amortization object
  return function (x, schedule) {
    let remaining = am.loanAmmount,
      deferredInterest = 0,
      interest,
      principal,
      totalInterest = 0;

    if (schedule) {
      // feeAmmount = 0.01*am.feeRate*am.loanAmmount,
      schedule.push(cash(0, remaining));
    }

    for (let period = 1; period <= am.term; ++period) {
      if (period > am.deferred) remaining += deferredInterest;

      interest = am.interest(remaining);

      if (period > am.deferred) principal = x - interest;
      else {
        deferredInterest += interest;
        principal = 0;
        interest = 0;
      }

      remaining -= principal;

      if (schedule) {
        totalInterest += interest;
        schedule.push(
          cash(period, remaining, totalInterest, principal, interest)
        );
      }
    }

    return remaining;
  };
}

function fprime(func) {
  return function (x) {
    var dx = 0.001 * x;
    return (0.5 * (func(x + dx) - func(x - dx))) / dx;
  };
}

function cash(period, outstanding, totalInterest, principal, interest) {
  return {
    period: period,
    outstanding: outstanding,
    totalInterest: totalInterest || 0,
    principal: principal || 0,
    interest: interest || 0,
    payment: (principal || 0) + (interest || 0),
  };
}
