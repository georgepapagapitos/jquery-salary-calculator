$(onReady);

const employees = [];
let total = 0;

function onReady() {
  $(document).on('click', '#submit-button', onSubmit);
  $(document).on('click', '.delete-button', deleteMe);
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
  displayEmployeeData();
  total += employee.annualSalary;
  $('#monthly-total').text(total);
  $('input').val('');
}

function displayEmployeeData() {
  for (let employee of employees) {
    $('#employee-table').append(`
    <tr>
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>${employee.id}</td>
      <td>${employee.title}</td>
      <td>$<span>${employee.annualSalary}</span></td>
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
  let salaryColumn = Number(currentRow.find('td:eq(4)').children().text());
  total -= salaryColumn;
  $('#monthly-total').text(total);
  employees.splice(currentRow.index(), 1);
  currentRow.remove();
}
