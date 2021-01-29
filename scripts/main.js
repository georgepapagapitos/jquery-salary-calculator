console.log('js');

$(onReady);

function onReady() {
  console.log('jq');
  $(document).on('click', '#submit-button', onSubmit);
}

function onSubmit(event) {
  event.preventDefault();
  console.log('submit');

  const employee = {
    firstName: $('#first-name-input').val(),
    lastName: $('#last-name-input').val(),
    id: $('#id-input').val(),
    title: $('#title-input').val(),
    annualSalary: Number($('#salary-input').val()),
  };

  console.log(employee);
}
