var uuid = require('uuid');

// PointsInfoStore - хранилище в оперативной памяти для хранения точек
// { name, x, y } - информация о точке: имя точки, позиция X и позиция Y

class PointsInfoStore {
    constructor() {
        this.points = [];
    }

    // universally unique IDentifier (UUID) - получение уникального идентификатора
    // обеспечивает уникальность имен точек
    createUniquePoint(point) {
        const uniquePoint = {
            name: uuid.v4(),
            x: point.x,
            y: point.y
        };

        return uniquePoint;
    }

    createCopyPoint(point) {
        return { ...point };
    }

    // CREATE READ UPDATE DELETE для студентов в хранилище
    // используется глубокое копирование, обеспечивает безопасность API
    create(points) {
        this.points = points.map(point => this.createUniquePoint(point));
    }

    delete() {
        this.points = [];
    }

    read() {
        return this.points.map(point => this.createCopyPoint(point));
    }

    update(point) {
        this.points.push(this.createUniquePoint(point));
    }

    findDistance(p1, p2) {
        return Math.sqrt(((p2.x - p1.x) ** 2) + ((p2.y - p1.y) ** 2));
    }

    // Получение двух точек, между которыми наибольшее расстояние
    getPointsGratestDistance() {
        const n = this.points.length;
        let pointsGratestDistance = [this.points[0], this.points[1]];
        let pointsGratestDistanceValue = this.findDistance(this.points[0], this.points[1]);

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const distance = this.findDistance(this.points[i], this.points[j]);

                if (distance > pointsGratestDistanceValue) {
                    pointsGratestDistance = [this.points[i], this.points[j]];
                    pointsGratestDistanceValue = distance;
                }
            }
        }

        return pointsGratestDistance;
    }

    // Получение точек, находящихся от заданной точки на расстоянии, не превышающем заданную константу
    getPointsConstDistance(number) {
        const n = this.points.length;
        const pointsConstDistance = [];

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const distance = this.findDistance(this.points[i], this.points[j]);

                if (distance <= number) {
                    pointsConstDistance.push([this.points[i], this.points[j]]);
                }
            }
        }

        return pointsConstDistance;
    }

    // Получение точек, находящихся выше / ниже / правее / левее заданной оси координат
    getPointsSelectedArea(location) {
        const predicats = {
            area_t: point => point.y >= 0,
            area_b: point => point.y <= 0,
            area_r: point => point.x >= 0,
            area_l: point => point.x <= 0,
            area_default: point => true
        };

        const selectPredicat = () => {
            if (location === 'top') {
                return predicats.area_t;
            } else if (location === 'bottom') {
                return predicats.area_b;
            } else if (location === 'right') {
                return predicats.area_r;
            } else if (location === 'left') {
                return predicats.area_l;
            } else {
                return predicats.area_default;
            }
        }

        const predicat = selectPredicat();
        const pointsSelectedArea = this.points.filter(point => predicat(point));

        return pointsSelectedArea;
    }

    // Получение точек, входящих внутрь заданной прямоугольной зоны
    getPointsInsideRectangle(rectangle) {
        const [ plt, prb ] = [ rectangle.plt, rectangle.prb ];

        const pointsInsideRectangle = this.points.filter(point => {
            const [ x, y ] = [ point.x, point.y ];
            return x >= plt.x && x <= prb.x && y <= plt.y && y >= prb.y;
        })

        return pointsInsideRectangle;
    }
}

const pis = new PointsInfoStore();
const points = [
    { x: 12.4, y: 11 }, { x: 4.5, y: -3.7 },
    { x: 3.7, y: 14 }, { x: -80, y: -5 },
    { x: 17, y: -8.9 }, { x: 4.5, y: 44.7 },
    { x: 1.4, y: 16 }, { x: 6, y: 5.5 },
    { x: 24.5, y: 10 }, { x: 34.3, y: 7 }];

pis.create(points);
console.log('result of "create" / "read" operation:', pis.read());

pis.update({ x: 25, y: 25 });
console.log('result of "update" operation:', pis.read());

pis.delete();
console.log('result of "delete" operation:', pis.read());

pis.create(points);

const pointsGratestDistance = pis.getPointsGratestDistance();
console.log('result of "getPointsGratestDistance" operation:', pointsGratestDistance);

const pointsConstDistance = pis.getPointsConstDistance(5);
console.log('result of "getPointsConstDistance" operation:', pointsConstDistance);

const pointsSelectedArea = pis.getPointsSelectedArea('bottom');
console.log('result of "getPointsSelectedArea" operation:', pointsSelectedArea);

const rectangle = { plt: { x: -15, y: 15 }, prb: { x: 15, y: -15 } };
const pointsInsideRectangle = pis.getPointsInsideRectangle(rectangle);
console.log('result of "getPointsInsideRectangle" operation:', pointsInsideRectangle);