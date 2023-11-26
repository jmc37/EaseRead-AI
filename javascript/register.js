// import { response } from "express";


const register_route = registerStrings.apiRoutes.register;

const http_error = registerStrings.messages.httpError;
const email_error = registerStrings.messages.emailError;
const password_error = registerStrings.messages.passwordError;
const username_error = registerStrings.messages.usernameError;
const name_error = registerStrings.messages.nameError;
const error_message = registerStrings.messages.error;
const server_error = registerStrings.messages.serverError;
const register_error = registerStrings.messages.registerError;

const post_method = registerStrings.methods.post;

const content_type = registerStrings.contentType;
const application_json = registerStrings.applicationJSON;
const regex = registerStrings.regex;

function registerUser(event) {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  // Validate email format using a regular expression
  let emailRegex = regex;
  if (!emailRegex.test(email)) {
    alert(email_error);
    return;
  }

  // Validate password length
  if (!password) {
    alert(password_error);
    return;
  }

  // Validate username is not empty
  if (!username.trim()) {
    alert(username_error);
    return;
  }

  // Validate name is not empty
  if (!name.trim()) {
    alert(name_error);
    return;
  }

  let data = {
    username: username,
    name: name,
    email: email,
    password: password,
  };

  // Make an API call to register the user
  fetch(register_route, {
    method: post_method,
    headers: {
      content_type: application_json,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${http_error}${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.log(response)
      console.error(error_message, error);
    

      // Display an error message to the user
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        alert(server_error);
      } else {
        alert(registerError);
      }
    });
}
