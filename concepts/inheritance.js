"use strict";

class SquareCounter {
    initAB(a, b) {
        this.a = a;
        this.b = b;
    }

    calcSquare() {
        return this.a * this.b;
    }
}

class VolumeCounter extends SquareCounter {
    initH(h) {
        this.h = h;
    }

    calcVolume() {
        return this.h * this.calcSquare();
    }
}

let obj = new VolumeCounter();
obj.initAB(2, 5);
obj.initH(7);
let v = obj.calcVolume();
console.log(v);