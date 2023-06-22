const prompt=require('prompt-sync')();
const { MongoClient } = require('mongodb');

// Create a MongoDB connection string
const uri = 'mongodb+srv://shravanbsc22:shravan123@cluster0.mdroez0.mongodb.net/see?retryWrites=true&w=majority';

async function createStudent(name) {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('school');
    const collection = database.collection('students');

    const student = { name };
    const result = await collection.insertOne(student);
    console.log('Student created:', result.insertedId);
  } catch (error) {
    console.error('Error creating student:', error);
  } finally {
    client.close();
  }
}

async function readStudents() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('school');
    const collection = database.collection('students');

    const students = await collection.find().toArray();
    console.log('Students:');
    students.forEach((student) => {
      console.log(student);
    });
  } catch (error) {
    console.error('Error reading students:', error);
  } finally {
    client.close();
  }
}

async function updateStudent(oldName, newName) {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('school');
    const collection = database.collection('students');

    const result = await collection.updateMany(
      { name: oldName },
      { $set: { name: newName } }
    );
    console.log('Students updated:', result.modifiedCount);
  } catch (error) {
    console.error('Error updating students:', error);
  } finally {
    client.close();
  }
}

async function deleteStudent(name) {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('school');
    const collection = database.collection('students');

    const result = await collection.deleteMany({ name });
    console.log('Students deleted:', result.deletedCount);
  } catch (error) {
    console.error('Error deleting students:', error);
  } finally {
    client.close();
  }
}

async function main() {
  // Create a student
  await createStudent('John Doe');

  // Read all students
  await readStudents();

  // Update a student's name
  await updateStudent('John Doe', 'Jane Smith');

  // Read all students again
  await readStudents();

  // Delete a student
  await deleteStudent('Jane Smith');

  // Read all students after deletion
  await readStudents();
}

main();