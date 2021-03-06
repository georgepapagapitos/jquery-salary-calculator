$(onReady);

// Initialize a global employee array
const employees = [];
// Initialize global variables for the monthly and annual total cost
let annualTotal = 0;
let monthlyTotal = 0;
// Set monthly budget variable
const monthlyBudget = 20000;

function onReady() {
  $(document).on('submit', '#input-form', onSubmit);
  $(document).on('click', '.delete-button', deleteMe);
}

// Function that creates an employee object and adds the employee the employees array
function onSubmit(event) {
  // Prevent refresh on click and clear existing data
  event.preventDefault();
  $('#employee-table').empty();
  // Create employee object based on inputs from user
  const employee = {
    firstName: $('#first-name-input').val(),
    lastName: $('#last-name-input').val(),
    id: $('#id-input').val(),
    title: $('#title-input').val(),
    annualSalary: Number($('#salary-input').val()),
  };
  // Push employee object to employees array
  employees.push(employee);
  // Call the displayEmployeeData function to display the employee
  displayEmployeeData();
  // Calculate the total annual salaries and divide by 12 to get the monthly cost
  annualTotal += employee.annualSalary;
  monthlyTotal = annualTotal / 12;
  $('#monthly-total').text(monthlyTotal.toFixed(2));
  checkMonthlyTotal();
  // Clear inputs
  $('input').val('');
}

// Function that displays the current employee data as a table
// Called within the onSubmit function
function displayEmployeeData() {
  // Loop through array of employees
  for (let employee of employees) {
    // Append each employee object as a row in the table with a delete button in the last column
    $('#employee-table').append(`
    <tr>
      <td class='first-name'>${employee.firstName}</td>
      <td class='last-name'>${employee.lastName}</td>
      <td>${employee.id}</td>
      <td>${employee.title}</td>
      <td>$<span class="annual-salary">${employee.annualSalary}</span></td>
      <td>
      <button type="button" class="delete-button">
        Delete
      </button>
      </td>
  </tr>
  `);
  }
}

// Function that deletes the employee from the table and the global employees array
function deleteMe() {
  // Find the current row of the delete button that was clicked
  let currentRow = $(this).closest('tr');
  // Extract the first name and the last name of the employee who's row is being deleted
  let firstName = currentRow.find('.first-name').text();
  let lastName = currentRow.find('.last-name').text();
  // Display an alert that asks user for confirmation of deletion
  if (confirm(`Are you sure you want to delete ${firstName} ${lastName}?`)) {
    // Find the salary of the employee who's row is being deleted
    let employeeSalary = Number(currentRow.find('.annual-salary').text());
    // Calculate the adjusted annual salaries and divide by 12 to get the monthly cost
    annualTotal -= employeeSalary;
    monthlyTotal = annualTotal / 12;
    // Update the monthly total amount on the DOM
    $('#monthly-total').text(monthlyTotal.toFixed(2));
    checkMonthlyTotal();
    // Remove the deleted employee from the global employees array
    employees.splice(currentRow.index(), 1);
    // Remove the employee from the table
    currentRow.remove();
  }
  return false;
}

function checkMonthlyTotal() {
  if (monthlyTotal > monthlyBudget) {
    $('#total').addClass('too-much-money');
  } else {
    $('#total').removeClass('too-much-money');
  }
}
