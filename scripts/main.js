$(onReady);

const employees = [];

function onReady() {
  $(document).on('click', '#submit-button', onSubmit);
  $(document).on('click', '.delete-button', deleteMe);
  monthlyTotal();
  deleteMe();
}

function onSubmit(event) {
  event.preventDefault();
  $('#employee-table').empty();
  const employee = {
    firstName: $('#first-name-input').val(),
    lastName: $('#last-name-input').val(),
    id: $('#id-input').val(),
    title: $('#title-input').val(),
    annualSalary: Number($('#salary-input').val()),
  };

  employees.push(employee);
  displayEmployees();
  monthlyTotal();
  $('input').val('');
}

function displayEmployees() {
  for (let employee of employees) {
    $('#employee-table').append(`
    <tr>
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>${employee.id}</td>
      <td>${employee.title}</td>
      <td id="emp-salary">$${employee.annualSalary}</td>
      <td>
      <button type="button" class="delete-button">
        Delete
      </button>
      </td>
  </tr>
  `);
  }
}

function monthlyTotal() {
  let total = 0;
  for (let i = 0; i < employees.length; i++) {
    total += employees[i].annualSalary;
  }
  $('#monthly-total').text(total);
}

function deleteMe() {
  $(this).closest('tr').remove();
}
