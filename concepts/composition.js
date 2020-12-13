// Композиция классов

"use strict";

class SumFinder {
    init(a, b) {
        this.a = a;
        this.b = b;
    }

    getResult() {
        return this.a + this.b;
    }
}

class MultTwoFinder {
    init(k) {
        this.k = k;
    }

    getResult() {
        return this.k * 2;
    }
}

class PerimeterFinder {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.sumFinderObj = new SumFinder();
        this.multTwoFinderObj = new MultTwoFinder();
    }

    getPerimeter() {
        this.sumFinderObj.init(this.a, this.b);
        const sum = this.sumFinderObj.getResult();
        this.multTwoFinderObj.init(sum);
        const res = this.multTwoFinderObj.getResult();
        return res;
    }
}

const pf = new PerimeterFinder(10, 20);
console.log(pf.getPerimeter());
