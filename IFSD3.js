const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

// Define the schema for the Student entity
const studentSchema = new mongoose.Schema({
  ID: { type: String, required: true },
  Name: { type: String, required: true },
  GPA: { type: Number, default: 0.0 },
});

// Create the Mongoose model for the Student collection
const Student = mongoose.model('Student', studentSchema);

// MongoDB connection string
const uri = 'mongodb+srv://shravanbsc22:shravan123@cluster0.mdroez0.mongodb.net/see?retryWrites=true&w=majority';

async function connectToDatabase() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');
}

async function createStudent() {
    
  const ID = prompt('Enter student ID: ');
  const name = prompt('Enter student name: ');
  const GPA = parseFloat(prompt('Enter student GPA: '));

  const student = new Student({ ID, Name: name, GPA });

  try {
    const createdStudent = await student.save();
    console.log('Student created:', createdStudent);
  } catch (error) {
    console.error('Error creating student:', error);
  }
}

async function readStudents() {
  try {
    const students = await Student.find();
    console.log('Students:');
    students.forEach((student) => {
      console.log(student);
    });
  } catch (error) {
    console.error('Error reading students:', error);
  }
}

async function updateStudent() {
  const ID = prompt('Enter student ID to update: ');
  const name = prompt('Enter updated student name: ');

  try {
    const updatedStudent = await Student.findOneAndUpdate({ ID }, { Name: name }, { new: true });
    console.log('Student updated:', updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
  }
}

async function deleteStudent() {
  const ID = prompt('Enter student ID to delete: ');

  try {
    const deletedStudent = await Student.findOneAndDelete({ ID });
    console.log('Student deleted:', deletedStudent);
  } catch (error) {
    console.error('Error deleting student:', error);
  }
}

async function main() {
  await connectToDatabase();

  const operation = prompt('Choose an operation (create, read, update, delete): ');

  switch (operation) {
    case 'create':
      await createStudent();
      break;
    case 'read':
      await readStudents();
      break;
    case 'update':
      await updateStudent();
      break;
    case 'delete':
      await deleteStudent();
      break;
    default:
      console.log('Invalid operation');
  }

  mongoose.connection.close();
}

main();