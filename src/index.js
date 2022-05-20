import { FetchWrapper, fetchWrapperFileTest } from "./scripts/fetch-wrapper.js"
console.log("JavaScript is working.")

// test import is woring from fetch-wrapper.js
console.log(fetchWrapperFileTest);


/*  API for testing
https://jsonplaceholder.typicode.com/guide/
*/

const API = new FetchWrapper("https://jsonplaceholder.typicode.com/");

const results = API.post("posts",
  {
    userId: 10,
    id: 100,
    title: 'Oatmeal',
    body: 'Butt'
  });

results.then(data => {
  console.log(data);
});

const results2 = API.get("posts");

results2.then(data => {

  data.forEach(data => {
    console.log(data);
  });

});