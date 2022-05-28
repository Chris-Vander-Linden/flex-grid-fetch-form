import { FetchWrapper } from './scripts/fetch-wrapper.js';
import './scripts/nav-bar.js';

// create new instance of FetchWrapper for getting and posting data
const API = new FetchWrapper("https://jsonplaceholder.typicode.com/");

// elements for book search form
const resultArea = document.querySelector("#result-area ul");
const searchBookInput = document.querySelector(`#result-area [type="search"]`);
const searchBookForm = document.querySelector(`#result-area form`);

// elements for create book form
const createBookTitle = document.querySelector(`#create-form-container [type="text"]`);
const createBookBody = document.querySelector(`#create-form-container textarea`);
const createBookForm = document.querySelector(`#create-form-container form`);
const createBookButton = document.querySelector(`#create-form-container button`);
const createBookResponse = document.querySelector(`#create-form-container #response`);

/* render function used for displaying items in results section */
const render = (search) => {

  API.get("posts").then(books => {
    if (!search) {
      resultArea.innerHTML = "";
      // if search is blank get all results
      books.forEach(book => {
        resultArea.insertAdjacentHTML("beforeend", `<li><h3><i class="fa-solid fa-book"></i> ${book.title}</h3>${book.body}</li>`);
      });
    } else {
      resultArea.innerHTML = "";
      // if search is not blank filter results
      books.filter(book => {
        book.title.toUpperCase().includes(search.toUpperCase()) ? resultArea.insertAdjacentHTML("beforeend",
          `<li><h3><i class="fa-solid fa-book"></i> ${book.title}</h3>${book.body}</li>`) : "";
      });
    }
  }).catch(error => {
    console.error(error);
    // if there is a server problem, write message
    resultArea.innerHTML = "<li>We are having a problem fetching the results...</li>"
  }).finally(() => {
    // if there are no matches display default message
    if (resultArea.innerHTML === "") {
      resultArea.innerHTML = `<li><i class="fa-solid fa-triangle-exclamation"></i> Sorry, we couldn\'t find any books based off of the title: "${search
        }".</li>`;
    }
  });
}




/* add event listeners to search book form elements */
// get search book value after keyup
searchBookInput.addEventListener("keyup", event => {
  // pass value to render function, so results can be filtered
  render(event.currentTarget.value);
});

// get search book value after search event/clicking the "x" in search field
searchBookInput.addEventListener("search", event => {
  event.preventDefault();
  // pass value to render function, so results can be filtered
  render(event.currentTarget.value);
});

searchBookForm.addEventListener("submit", event => {
  // prevent page refresh on submit for search form
  event.preventDefault();
});





/* add event listener to create book form elements */
createBookForm.addEventListener("submit", event => {
  event.preventDefault();
  // disable submit button until after response
  createBookButton.setAttribute("disabled", "");
  createBookButton.textContent = "working..."
  API.post("posts",
    {
      title: createBookTitle.value,
      body: createBookBody.value
    }).then(data => {
      createBookResponse.textContent = `The book ${data.title} has been created!`;
    }).catch(error => console.error(error)).finally(() => {
      render();
      createBookButton.removeAttribute("disabled");
      createBookButton.innerHTML = `<i class="fa-solid fa-plus"></i> Create New Book`
    });
});

render();