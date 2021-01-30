$(onReady);

// Initialize a global employee array
const employees = [];
// Initialize a global monthlyTotal variable
let monthlyTotal = 0;

function onReady() {
  $(document).on('click', '#submit-button', onSubmit);
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
  // Call the displayEmployeeData function to display the data as a table
  displayEmployeeData();
  // Calculate, update, and display the monthly total
  monthlyTotal += employee.annualSalary;
  $('#monthly-total').text(monthlyTotal);
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
      <td class="salary">$<span>${employee.annualSalary}</span></td>
      <td>
      <button type="button" class="delete-button">
        Delete
      </button>
      </td>
  </tr>
  `);
  }
}

// Function that deletes the employee from the table as well as from the global employees array
function deleteMe() {
  // Find the current row of the clicked delete button
  let currentRow = $(this).closest('tr');
  // Extract the first name and the last name of the employee who's row is being deleted
  let firstName = currentRow.find('.first-name').text();
  let lastName = currentRow.find('.last-name').text();
  // Display an alert that asks user for confirmation of deletion
  if (confirm(`Are you sure you want to delete ${firstName} ${lastName}?`)) {
    // Find the salary of the employee who's row is being deleted
    let employeeSalary = Number(currentRow.find('.salary').children().text());
    // Subtract their salary from the global monthlyTotal variable
    monthlyTotal -= employeeSalary;
    // Update the monthly total amount on the DOM
    $('#monthly-total').text(monthlyTotal);
    checkMonthlyTotal();
    // Remove the deleted from the global employees array
    employees.splice(currentRow.index(), 1);
    // Remove the employee from the table
    currentRow.remove();
  }
  return false;
}

function checkMonthlyTotal() {
  if (monthlyTotal > 20000) {
    $('#monthly-total').parent().addClass('too-much-money');
  } else {
    $('#monthly-total').parent().removeClass('too-much-money');
  }
}
