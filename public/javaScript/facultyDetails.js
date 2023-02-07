var names = document.getElementsByClassName('faculty-name-row');
var empIds = document.getElementsByClassName('faculty-empid-row');
var faculty_row = document.getElementsByClassName('faculty-row');

const input = document.querySelector('.input');
input.addEventListener('keyup', function (e) {
  var text = e.target.value.toLowerCase();
  console.log(text);

  for (i = 0; i < names.length; i++) {
    if (
      names[i].innerHTML.toLowerCase().includes(text) ||
      empIds[i].innerHTML.toLowerCase().includes(text)
    ) {
      faculty_row[i].style.display = 'visible';
    } else {
      faculty_row[i].style.display = 'none';
    }
  }

  if (text === '') {
    window.location.reload();
  }
});
