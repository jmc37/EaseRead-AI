function login(event) {
  event.preventDefault();

  let username = document.getElementById("username").value;
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
function checkAdminAccess() {
  const jwtToken = localStorage.getItem("access_token");

  // Check if the token is present
  if (jwtToken) {
    // Send a request to your server to validate the token
    fetch("https://easeread-ai-backend.onrender.com/admin-dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // If the server response indicates admin access, display the button
        if (data.is_admin) {
          document.getElementById("adminButton").style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Error checking admin access:", error);
      });
  }
}
function redirectToAdminDashboard() {
  // Redirect to admindashboard.html
  window.location.href = "./admindashboard.html";
}
function redirectToRegister() {
  window.location.href = "./registration.html"; // Update with the actual registration page URL
}
window.onload = checkAdminAccess();
