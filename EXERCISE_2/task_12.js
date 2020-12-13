// Point - класс точка
// {x, y} - поля класса Point (координаты точки)
class Point {
    // метод инициализации полей
    init(x, y) {
        this.x = x;
        this.y = y;
    }

    // метод вывода полей на экран
    print() {
        console.log(`point: x = ${this.x}, y = ${this.y}`);
    }
}

// Line - класс отрезка
// {p1, p2} - поля класса Line (точки концов отрезка)
class Line {
    init(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    // метод вывода полей на экран
    print() {
        console.log(`point 1: x = ${this.p1.x}, y = ${this.p1.y}}`);
        console.log(`point 2: x = ${this.p2.x}, y = ${this.p2.y}}`);
    }

    // Метод вычисления длины отрезка
    getLength() {
        const xsquared = ((this.p2.x - this.p1.x) ** 2);
        const ysquared = ((this.p2.y - this.p1.y) ** 2);
        return Math.sqrt(xsquared + ysquared);
    }
}

// Triangle - класс треугольника
// {l1, l2, l3} - поля класса Triangle (стороны треугольника)
class Triangle {
    init(l1, l2, l3) {
        this.l1 = l1;
        this.l2 = l2;
        this.l3 = l3;
    }

    // Метод вычисления длин сторон треугольника
    getLinesLength() {
        const a = this.l1.getLength();
        const b = this.l2.getLength();
        const c = this.l3.getLength();

        return [a, b, c];
    }

    // Метод проверки возможности существования треугольника с такими сторонами
    isTriangleExist() {
        const [a, b, c] = this.getLinesLength();
        let isTriangleExist = false;
        
        if (a > 0 && b > 0 && c > 0) {
            isTriangleExist = a + b > c && a + c > b && b + c > a;
        }

        return isTriangleExist;
    }

    // Метод получения периметра треугольника
    getTrianglePerimeter() {
        const [a, b, c] = this.getLinesLength();
        const trianglePerimeter = a + b + c;

        return trianglePerimeter;
    }

    // Метод получения площади треугольника
    getTriangleArea() {
        const [a, b, c] = this.getLinesLength();
        const p = (a + b + c) / 2;
        const triangleArea = Math.sqrt(p * (p - a) * (p - b) * (p - c));

        return triangleArea;
    }

    // Метод для проверки факта: является ли треугольник прямоугольным
    isTriangleRight() {
        const [a, b, c] = this.getLinesLength();
        const verify1 = (a**2 === b**2 + c**2);
        const verify2 = (b**2 === a**2 + c**2);
        const verify3 = (c**2 === b**2 + a**2);

        return verify1 || verify2 || verify3;
    }
}

// определяю 3 точки
const p1 = new Point();
p1.init(-3, -3);
p1.print();

const p2 = new Point();
p2.init(-3, 1);
p2.print();

const p3 = new Point();
p3.init(0, 1);
p3.print();

// определяю 3 отрезка
const l1 = new Line();
l1.init(p1, p2);
l1.print();

const l1_length = l1.getLength();
console.log(`длина отрезка l1: ${l1_length}`);

const l2 = new Line();
l2.init(p2, p3);
l2.print();

const l2_length = l2.getLength();
console.log(`длина отрезка l2: ${l2_length}`);

const l3 = new Line();
l3.init(p3, p1);
l3.print();

const l3_length = l3.getLength();
console.log(`длина отрезка l3: ${l3_length}`);

// определяю треугольник
const t = new Triangle();
t.init(l1, l2, l3);

const isTriangleExist = t.isTriangleExist();
console.log('result of "isTriangleExist" operation: ', isTriangleExist);

const trianglePerimeter = t.getTrianglePerimeter();
console.log('result of "getTrianglePerimeter" operation: ', trianglePerimeter);

const triangleArea = t.getTriangleArea();
console.log('result of "getTriangleArea" operation: ', triangleArea);

const triangleRight = t.isTriangleRight();
console.log('result of "isTriangleRight" operation: ', triangleRight);