console.log('js');

$(onReady);

const employees = [];

function onReady() {
  console.log('jq');
  $(document).on('click', '#submit-button', onSubmit);
}

function onSubmit(event) {
  event.preventDefault();
  const employee = {
    firstName: $('#first-name-input').val(),
    lastName: $('#last-name-input').val(),
    id: $('#id-input').val(),
    title: $('#title-input').val(),
    annualSalary: Number($('#salary-input').val()),
  };

  employees.push(employee);
  displayEmployees(employees);
  $('input').val('');
}

function displayEmployees(array) {
  for (let employee of array) {
    $('#employee-table').append(`
    <tr>
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>${employee.id}</td>
      <td>${employee.title}</td>
      <td>$${employee.annualSalary}</td>
      <td>
      <button type="button" class="delete-button">
        Delete
      </button>
      </td>
  </tr>
  `);
  }
}
