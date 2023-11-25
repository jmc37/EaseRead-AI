function login(event) {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // Validate username format (ensure it's not empty)
  if (!username.trim()) {
    alert("Please enter a valid username. It must not be empty.");
    return;
  }

  // Validate password format
  if (!password) {
    alert("Please enter a valid password");
    return;
  }

  let data = {
    username: username,
    password: password,
  };

  fetch("https://easeread-ai-backend.onrender.com/API/v1/login", {
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
      // Redirect to userDashboard.html on a successful server response
      window.location.href = "../html/userDashboard.html";
    })
    .catch((error) => {
      console.error("Error during login", error);
    });
}

function checkAdminAccess() {
  const jwtToken = getCookie("access_token");

  if (jwtToken) {
    // Send a request to your server to validate the token
    fetch("https://easeread-ai-backend.onrender.com/API/v1/admin-dashboard", {
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
  const jwtToken = getCookie("access_token");

  if (jwtToken) {
    // Send a request to your server to validate the token
    fetch("https://easeread-ai-backend.onrender.com/API/v1/logout", {
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
        console.log("Logout successful:", data);

        // Delete the token cookie
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly";
        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  } else {
    console.error("No JWT token found for logout");
  }
}


function redirectToAdminDashboard() {
  window.location.href = "../html/adminDashboard.html";
}

function redirectToRegister() {
  window.location.href = "../html/registration.html";
}

// Function to get the value of a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
