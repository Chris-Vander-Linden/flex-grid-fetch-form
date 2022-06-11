import FetchWrapper from './scripts/fetch-wrapper.js';
import './scripts/nav-bar.js';

// create new instance of FetchWrapper for getting and posting data
const API = new FetchWrapper("https://my-json-server.typicode.com/Chris-Vander-Linden/json-db/");

// elements for Person search form
const resultArea = document.querySelector("#result-area ul");
const searchPersonInput = document.querySelector(`#result-area [type="search"]`);
const searchPersonForm = document.querySelector(`#result-area form`);

// elements for create Person form
const createPersonName = document.querySelector(`#create-form-container [type="text"]`);
//const createPersonBody = document.querySelector(`#create-form-container textarea`);
const createPersonForm = document.querySelector(`#create-form-container form`);
const createPersonButton = document.querySelector(`#create-form-container button`);
const createPersonResponse = document.querySelector(`#create-form-container #response`);

/* render function used for displaying items in results section */
const render = (search) => {

  API.get("test").then(data => {
    if (!search) {
      resultArea.innerHTML = "";
      // if search is blank get all results
      data.forEach(person => {
        resultArea.insertAdjacentHTML("beforeend", `<li><i class="fa-solid ${person.icon} fa-lg"></i><div>Name: ${person.name}<br>Job: ${person.job}<br>Email: ${person.email}</div></li>`);
      });
    } else {
      resultArea.innerHTML = "";
      // if search is not blank filter results
      data.filter(person => {
        person.name.toUpperCase().includes(search.toUpperCase()) ? resultArea.insertAdjacentHTML("beforeend", `<li><i class="fa-solid ${person.icon} fa-lg"></i><div>Name: ${person.name}<br>Job: ${person.job}<br>Email: ${person.email}</div></li>`) : "";
      });
    }
  }).catch(error => {
    console.error(error);
    // if there is a server problem, write message
    resultArea.innerHTML = "<li>We are having a problem fetching the results.  Please Try later.</li>"
  }).finally(() => {
    // if there are no matches display default message
    if (resultArea.innerHTML === "") {
      resultArea.innerHTML = `<li><i class="fa-solid fa-triangle-exclamation"></i> Sorry, we couldn\'t find any data based off of the name: "${search
        }".</li>`;
    }
  });
}

// add event listeners to search Person form elements
// get search Person value after keyup
searchPersonInput.addEventListener("keyup", event => {
  // pass value to render function, so results can be filtered
  render(event.currentTarget.value);
});

// get search Person value after search event/clicking the "x" in search field
searchPersonInput.addEventListener("search", event => {
  event.preventDefault();
  // pass value to render function, so results can be filtered
  render(event.currentTarget.value);
});

searchPersonForm.addEventListener("submit", event => {
  // prevent page refresh on submit for search form
  // we only want to get the search value on keyup event
  event.preventDefault();
});

/* add event listener to create Person form elements */
createPersonForm.addEventListener("submit", event => {
  event.preventDefault();
  // disable submit button until after response
  createPersonButton.setAttribute("disabled", "");
  createPersonButton.textContent = "working..."
  API.post("test",
    {
      name: createPersonName.value,
      //body: createPersonBody.value,
    }).then(data => {
      console.log(data);
      createPersonResponse.textContent = `SUCCESS! The person with ID ${data.id} has been "fake created!"`;
    }).catch(error => console.error(error)).finally(() => {
      render();
      createPersonButton.removeAttribute("disabled");
      createPersonButton.innerHTML = `<i class="fa-solid fa-plus"></i> Create New Person`
    });
});

render();