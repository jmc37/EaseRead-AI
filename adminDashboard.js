function getUsersList() {
  // Retrieve the JWT token from localStorage (you should implement your own secure way to store tokens)
  const jwtToken = localStorage.getItem("access_token");

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

function displayUsers(users) {
  const usersListContainer = document.getElementById("usersList");

  // Create an HTML list to display the users
  const userListHTML =
    "<ul>" +
    users
      .map(
        (user) => `
                    <li>
                    ${user.username} - Admin: ${user.admin ? "Yes" : "No"}
                    <button onclick="makeAdmin(${user.id})">Make Admin</button>
                    <button onclick="removeAdmin(${user.id})">Remove Admin</button>
                    <button onclick="deleteUser(${user.id})">Delete User</button>
                    </li>`
      )
      .join("") +
    "</ul>";

  // Append the HTML list to the container
  usersListContainer.innerHTML = userListHTML;
}

function makeAdmin(userId) {
  // Retrieve the JWT token from localStorage
  const jwtToken = localStorage.getItem("access_token");

  // Check if the token is present
  if (jwtToken) {
    // Send a request to your server to make the user an admin
    fetch(`https://easeread-ai-backend.onrender.com/user/${userId}`, {
      method: "PUT",
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
        console.log(data.message);
        // After making the user an admin, refresh the users list
        getUsersList();
      })
      .catch((error) => {
        console.error("Error making user admin:", error);
      });
  }
}

function removeAdmin(userId) {
  // Retrieve the JWT token from localStorage
  const jwtToken = localStorage.getItem("access_token");

  // Check if the token is present
  if (jwtToken) {
    // Send a request to your server to remove admin status from the user
    fetch(`https://easeread-ai-backend.onrender.com/user/${userId}`, {
      method: "PATCH",
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
        console.log(data.message);
        // After removing admin status, refresh the users list
        getUsersList();
      })
      .catch((error) => {
        console.error("Error removing admin status from user:", error);
      });
  }
}
function deleteUser(userId) {
  // Retrieve the JWT token from localStorage
  const jwtToken = localStorage.getItem("access_token");

  // Check if the token is present
  if (jwtToken) {
    // Send a request to your server to delete the user
    fetch(`https://easeread-ai-backend.onrender.com/${userId}/delete`, {
      method: "DELETE",
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
        console.log(data.message);
        // After deleting the user, refresh the users list
        getUsersList();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }
}

window.onload = getUsersList();
