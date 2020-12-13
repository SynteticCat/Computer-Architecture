var uuid = require('uuid');

// StudentsInfoStore - хранилище в оперативной памяти для хранения информации о студентах
// { group, card, grades } - информация о студенте: название группы, номер студенческого билета, оценки по программированию

class StudentsInfoStore {
    constructor() {
        this.students = [];
    }

    // universally unique IDentifier (UUID) - получение уникального идентификатора
    // обеспечивает уникальность номеров студенческих билетов
    createUniqueStudent(student) {
        const uniqueStudent = {
            group: student.group,
            card: uuid.v4(),
            grades: [...student.grades]
        };

        return uniqueStudent;
    }

    createCopyStudent(student) {
        const copyStudent = {
            group: student.group,
            card: student.card,
            grades: [...student.grades]
        };

        return copyStudent;
    }

    // CREATE READ UPDATE DELETE для студентов в хранилище
    // используется глубокое копирование, обеспечивает безопасность API
    create(students) {
        this.students = students.map(student => this.createUniqueStudent(student));
    }

    delete() {
        this.students = [];
    }

    read() {
        return this.students.map(student => this.createCopyStudent(student));
    }

    update(student) {
        this.students.push(this.createUniqueStudent(student));
    }

    // Получение информации о студентах в заданной группе
    getStudentsGroup(group) {
        return this.students.filter(student => student.group === group);
    }

    // Получение студента, у которого наибольшее количество оценок в заданной группе
    getStudentMostRatings() {
        let studentMostRatings = this.students[0];

        this.students.forEach(student => {
            if (student.grades.length > studentMostRatings.grades.length) {
                studentMostRatings = student;
            }
        })

        return studentMostRatings.card;
    }

    // Получение студента, у которого нет оценок
    gitStudentWithoutRatings() {
        const studentWithoutRatings = this.students.find(student => {
            return student.grades.length === 0;
        });

        return studentWithoutRatings.card;
    }

    // Получение средней оценки заданного студента
    getStudentAverageGrade(card) {
        const student = this.students.find(student => student.card === card);
        const studentGradesSum = student.grades.reduce((acc, grade) => acc + grade, 0);
        const studentAverageGrade = studentGradesSum / student.grades.length;

        return studentAverageGrade;
    }
}

const sis = new StudentsInfoStore();
const students = [
    { group: 'a', grades: [4, 5, 5] }, { group: 'b', grades: [4, 4, 5] },
    { group: 'c', grades: [4, 5, 3] }, { group: 'a', grades: [] },
    { group: 'a', grades: [4, 5, 5] }, { group: 'b', grades: [4, 4, 5, 5, 5] },
    { group: 'c', grades: [4, 5] }, { group: 'c', grades: [4, 4, 5] },
    { group: 'c', grades: [4] }, { group: 'a', grades: [5, 4, 5] }];

sis.create(students);
console.log('result of "create" / "read" operation:', sis.read());

sis.update({ group: 'b', grades: [5, 5, 5] });
console.log('result of "update" operation:', sis.read());

sis.delete();
console.log('result of "delete" operation:', sis.read());

sis.create(students);

const studentsGroup = sis.getStudentsGroup('c');
console.log('result of "getStudentsGroup" operation:', studentsGroup);

const studentMostRatings = sis.getStudentMostRatings();
console.log('result of "getStudentMostRatings" operation:', studentMostRatings);

const studentWithoutRatings = sis.gitStudentWithoutRatings();
console.log('result of "gitStudentWithoutRatings" operation:', studentWithoutRatings);

const studentAverageGrade = sis.getStudentAverageGrade(studentMostRatings);
console.log('result of "getStudentAverageGrade" operation:', studentAverageGrade);