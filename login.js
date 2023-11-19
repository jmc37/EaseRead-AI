function login(event) {
  event.preventDefault();

  let username = document.getElementById("uname").value;
  let password = document.getElementById("password").value;

  let data = {
    username: username,
    password: password,
  };

  console.log("Data", data);

  fetch("https://easeread-ai-backend.onrender.com/login", {
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
    .then((responseData) => {
      console.log("Login successful", responseData);

      // Check if the server response indicates successful login
      if (responseData && responseData.access_token) {
        // Save the token in localStorage
        localStorage.setItem("access_token", responseData.access_token);

        // Redirect to userdashboard.html
        window.location.href = "userDashboard.html";
      } else {
        console.error("Token not received in the server response");
      }
    })
    .catch((error) => {
      console.error("Error during login", error);
      // Handle login error, e.g., show an error message
    });
}
