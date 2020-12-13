// Реализовать программу, в которой происходят следующие действия:
// Происходит вывод целых чисел от 1 до 10 с задержками в 2 секунды.
// После этого происходит вывод от 11 до 20 с задержками в 1 секунду.
// Потом опять происходит вывод чисел от 1 до 10 с задержками в 2 секунды.
// После этого происходит вывод от 11 до 20 с задержками в 1 секунду.
// Это должно происходить циклически

class Counter {
    constructor() {
        this.count = 0;
    }

    getValue() {
        return this.count;
    }

    print() {
        console.log(this.count);
    }

    calcNextValue() {
        if (this.count < 20) {
            this.count++;
        } else {
            this.count = 1;
        }
    }
};

class Timer {
    constructor() {
        this.counter = new Counter();
        this.timerId = null;
        this.tick = this.tick.bind(this);
    }

    getDelay() {
        const counterValue = this.counter.getValue();
        const delay = counterValue >= 10 && counterValue < 20 ? 1000 : 2000;
        return delay;
    }

    tick() {
        this.counter.calcNextValue();
        this.counter.print();
        this.timerId = setTimeout(this.tick, this.getDelay());
    }

    // рекурсивный setTimeout позволяет точно реализовать функционал
    tickRecursion() {
        this.timerId = setTimeout(this.tick, this.getDelay());
    }
}

const timer = new Timer();
timer.tickRecursion();