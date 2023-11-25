function registerUser(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  let data = {
    username: username,
    name: name,
    email: email,
    password: password,
  };

  // Make an API call to register the user
  fetch("https://easeread-ai-backend.onrender.com/API/v1/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Error:", error);

      // Display an error message to the user
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        alert("Failed to connect to the server. Please try again later.");
      } else {
        alert("Registration failed. Please try again.");
      }
    });
}
