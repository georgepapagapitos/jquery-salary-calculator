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
  // Clear inputs
  $('input').val('');
}

function displayEmployeeData() {
  for (let employee of employees) {
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

function deleteMe() {
  let currentRow = $(this).closest('tr');
  if (
    confirm(
      `Are you sure you want to delete ${currentRow
        .find('.first-name')
        .text()}?`
    )
  ) {
    let salaryColumn = Number(currentRow.find('.salary').children().text());
    monthlyTotal -= salaryColumn;
    $('#monthly-total').text(monthlyTotal);
    employees.splice(currentRow.index(), 1);
    currentRow.remove();
  }
  return false;
}
