function login(event) {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let data = {
    username: username,
    password: password,
  };
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

function logout() {
  const jwtToken = localStorage.getItem("access_token");

  // Check if the token is present
  if (jwtToken) {
    // Send a request to your server to validate the token
    fetch("https://easeread-ai-backend.onrender.com/logout", {
      method: "POST",
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
        localStorage.removeItem("access_token")
        window.location.href = "index.html";

      })
      .catch((error) => {
        console.error("Error logging out", error);
      });
  }
}
function redirectToAdminDashboard() {
  // Redirect to admindashboard.html
  window.location.href = "adminDashboard.html";
}
function redirectToRegister() {
  window.location.href = "registration.html"; // Update with the actual registration page URL
}
