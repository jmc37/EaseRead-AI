function registerUser(event) {
  let username = document.getElementById("uname").value;
  let password = document.getElementById("password").value;

  let data = {
    username: username,
    password: password,
  };

  // Make an API call to register the user
  fetch("https://easeread-ai-backend.onrender.com/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the API
      console.log(data);
      // Do something with the response, such as displaying a success message
    })
    .catch((error) => {
      // Handle any errors that occurred during the API call
      console.error("Error:", error);
      // Display an error message to the user
    });
}
