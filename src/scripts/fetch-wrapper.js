export { fetchWrapperFileTest, FetchWrapper }
// test export to make sure it is connected.
const fetchWrapperFileTest = "fetch-wrapper.js is connected.";

class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get = (endpoint = "") => {
    console.log("get");
    return this._fetchHelper(endpoint);
  }
  post = (endpoint = "", body = {}) => {
    return this._fetchHelper(endpoint, body, "POST");
  }
  put = (endpoint = "", body = {}) => {
    return this._fetchHelper(endpoint, body, "PUT");
  }
  delete = (endpoint = "", body = {}) => {
    return this._fetchHelper(endpoint, body, "DELETE");
  }

  _fetchHelper = (endpoint, body, method) => {
    return fetch(this.baseURL + endpoint, {
      method, // object shorthand
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (!response.ok) {
        throw new Error("There was a problem with the server.");
      }
      return response.json();
    });
  }
}



