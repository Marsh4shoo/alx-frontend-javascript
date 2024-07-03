// task_0/main.ts

// Define the Student interface

interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

// Create two student objects
const student1: Student = {
  firstName: "John",
  lastName: "Doe",
  age: 25,
  location: "New York",
};

const student2: Student = {
  firstName: "Jane",
  lastName: "Smith",
  age: 30,
  location: "London",
};

// Create an array of students
const studentsList: Student[] = [student1, student2];

// Function to render a table row (Vanilla JavaScript)
function renderTableRow(student: Student) {
  const tableBody = document.getElementById("student-table-body"); // Assuming you have a table with this ID
  if (!tableBody) {
    console.error("Table body element not found!");
    return;
  }

  const tableRow = document.createElement("tr");
  const firstNameCell = document.createElement("td");
  const locationCell = document.createElement("td");

  firstNameCell.textContent = student.firstName;
  locationCell.textContent = student.location;

  tableRow.appendChild(firstNameCell);
  tableRow.appendChild(locationCell);

  tableBody.appendChild(tableRow);
}

// Render table for each student
studentsList.forEach(renderTableRow);
