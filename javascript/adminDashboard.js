function getUsersList() {
  // Retrieve the JWT token from cookies
  const jwtToken = getCookie("access_token");

  // Check if the token is present
  if (jwtToken) {
    // Send a request to your server to get the list of users
    fetch("https://easeread-ai-backend.onrender.com/users", {
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
      .then((users) => {
        // Display the list of users
        displayUsers(users);
      })
      .catch((error) => {
        console.error("Error getting users list:", error);
      });
  }
}

// Rest of the code remains unchanged

// Function to get the value of a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

window.onload = getUsersList();
