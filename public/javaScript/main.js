const selectBox = document.querySelector('.select-box');
const selected = document.querySelector('.selected');
const optionsContainer = document.querySelector('.options-container');
const searchBox = document.querySelector('.search-box input');
const optionsList = document.querySelectorAll('.option');

selected.addEventListener('click', () => {
  optionsContainer.classList.toggle('active');
  // searchBox.value = "";
  filterList('');
  if (optionsContainer.classList.contains('active')) {
    searchBox.focus();
  }
});
optionsList.forEach((o) => {
  o.addEventListener('click', () => {
    selected.innerHTML = o.querySelector('label').innerHTML;
    // console.log(o.querySelector("label").innerHTML);
    searchBox.value = o.querySelector('label').innerHTML;
    console.log(searchBox.value);
    optionsContainer.classList.remove('active');
  });
});
searchBox.addEventListener('keyup', function (e) {
  filterList(e.target.value);
  optionsContainer.classList.add('active');
});
const filterList = (searchTerm) => {
  searchTerm = searchTerm.toLowerCase();
  optionsList.forEach((option) => {
    let label =
      option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (label.indexOf(searchTerm) != -1) {
      option.style.display = 'block';
    } else {
      option.style.display = 'none';
    }
  });
};

const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTAwYTExZmYtNDE0NS00YzRhLWJhM2ItNTlhNzZmYjBmYmE3IiwidHlwZSI6ImFwaV90b2tlbiJ9.4aVI7VKnsnnl2KwpWE3zg7qb1aaSfFATsjDk_05hpxU',
  },
  body: JSON.stringify({
    response_as_dict: true,
    attributes_as_list: false,
    show_original_response: false,
    providers: 'amazon',
    text: 'worst faculty',
    language: 'en',
  }),
};

fetch('https://api.edenai.run/v2/text/sentiment_analysis', options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

//negative 0.30 acceptable
