// ChildrenInfoStore - хранилище в оперативной памяти для хранения информации о детях
// { sirname, age } - информация о ребенке: фамилия и возраст

class ChildrenInfoStore {
    constructor() {
        this.children = [];
    }

    // CREATE READ UPDATE DELETE для детей в хранилище
    // используется глубокое копирование, обеспечивает безопасность API
    create(children) {
        this.children = children.map(child => ({ sirname: child.sirname, age: child.age }));
    }

    delete() {
        this.children = [];
    }

    read() {
        return this.children.map(child => ({ sirname: child.sirname, age: child.age }));
    }

    update(child) {
        this.children.push({ sirname: child.sirname, age: child.age });
    }

    // Получение среднего возраста детей
    getAverageAge() {
        const sum = this.children.reduce((acc, child) => acc + child.age, 0);
        return sum / this.children.length;
    }

    // Получение информации о самом старшем ребенке
    getOldestChild() {
        let oldestChild = this.children[0];

        this.children.forEach(child => {
            if (child.age > oldestChild.age) {
                oldestChild = child;
            }
        })

        return oldestChild;
    }

    // Получение информации о детях, возраст которых входит в заданный отрезок
    getRangeChildren(minAge, maxAge) {
        const rangeChildren = this.children.filter(child => {
            return child.age >= minAge && child.age <= maxAge;
        })

        return rangeChildren;
    }

    // Получение информации о детях, фамилия которых начинается с заданной буквы
    getChildrenByFirstLetter(letter) {
        const childrenByFirstLetter = this.children.filter(child => {
            const firstLetter = child.sirname.charAt(0);
            return firstLetter.toUpperCase() === letter.toUpperCase();
        });

        return childrenByFirstLetter
    }

    // Получение информации о детях, фамилия которых длиннее заданного количества символов
    getChildrenByLongerSirname(number) {
        const childrenByLongerSirname = this.children.filter(child => {
            return child.sirname.length > number;
        });

        return childrenByLongerSirname;
    }

    // Получение информации о детях, фамилия которых начинается с гласной буквы
    getChildrenByFirstLetterVowel() {
        const vowels = ['a', 'e', 'u', 'i', 'o', 'y'];
        const childrenByFirstLetterVowel = this.children.filter(child => {
            const firstLetter = child.sirname.charAt(0).toLowerCase();
            return vowels.includes(firstLetter);
        });

        return childrenByFirstLetterVowel;
    }
}

const cis = new ChildrenInfoStore();
const children = [
    { sirname: 'Ivanov', age: 12 }, { sirname: 'Smirnov', age: 11 },
    { sirname: 'Kuznetsov', age: 13 }, { sirname: 'Popov', age: 12 },
    { sirname: 'Vasilyev', age: 9 }, { sirname: 'Petrov', age: 8 },
    { sirname: 'Sokolov', age: 14 }, { sirname: 'Michailov', age: 13 },
    { sirname: 'Novicov', age: 14 }, { sirname: 'Fedorov', age: 11 }];

cis.create(children);
console.log('result of "create" / "read" operation:', cis.read());

cis.update({ sirname: 'Egorov', age: 10 });
console.log('result of "update" operation:', cis.read());

cis.delete();
console.log('result of "delete" operation:', cis.read());

cis.create(children);

const averageAge = cis.getAverageAge();
console.log('result of "getAverageAge" operation:', averageAge);

const oldestChild = cis.getOldestChild();
console.log('result of "getOldestChild" operation:', oldestChild);

const rangeChildren = cis.getRangeChildren(10, 12);
console.log('result of "getRangeChildren" operation:', rangeChildren);

const childrenByFirstLetter = cis.getChildrenByFirstLetter('P');
console.log('result of "getChildrenByFirstLetter" operation:', childrenByFirstLetter);

const childrenByLongerSirname = cis.getChildrenByLongerSirname(6);
console.log('result of "getChildrenByLongerSirname" operation:', childrenByLongerSirname);

const childrenByFirstLetterVowel = cis.getChildrenByFirstLetterVowel();
console.log('result of "getChildrenByFirstLetterVowel" operation:', childrenByFirstLetterVowel);