const prompt = require('prompt-sync')();

class Student {
  constructor(ID, Name) {
    this.ID = ID;
    this.Name = Name;
    this.GPA = 0.0;
  }
}

class StudentManager {
  constructor() {
    this.students = [];
  }

  addStudent(student) {
    this.students.push(student);
  }

  calculateAverageGPA() {
    let totalGPA = 0.0;
    for (const student of this.students) {
      totalGPA += student.GPA;
    }
    return totalGPA / this.students.length;
  }
}

function main() {
  const n = parseInt(prompt("Enter the number of students: "));

  const manager = new StudentManager();

  for (let i = 0; i < n; i++) {
    const ID = prompt("Enter student ID: ");
    const name = prompt("Enter student name: ");

    const student = new Student(ID, name);
    student.GPA = parseFloat(prompt("Enter student GPA: "));

    manager.addStudent(student);
  }

  const averageGPA = manager.calculateAverageGPA();

  console.log("Average GPA of the students:", averageGPA);
}

main();