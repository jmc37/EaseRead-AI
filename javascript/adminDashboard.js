const all_users = adminDashboardStrings.apiRoutes.allUsers;
const single_user = adminDashboardStrings.apiRoutes.singleUser;

const http_error = adminDashboardStrings.messages.httpError;
const user_list_error = adminDashboardStrings.messages.userListError;
const admin_error = adminDashboardStrings.messages.adminError;
const admin_remove_error = adminDashboardStrings.messages.adminRemovError;
const deleting_user_error = adminDashboardStrings.messages.deletingUserError;

const get_method = adminDashboardStrings.methods.get;
const put_method = adminDashboardStrings.methods.put;
const patch_method = adminDashboardStrings.methods.patch;
const delete_method = adminDashboardStrings.methods.delete;

const content_type = adminDashboardStrings.contentType;
const access_token = adminDashboardStrings.accessToken;
const application_json = adminDashboardStrings.applicationJSON;
const bearer = adminDashboardStrings.bearer;


function getUsersList() {
  // Retrieve the JWT token from cookies
  const jwtToken = getCookie(access_token);

  // Check if the token is present
  if (jwtToken) {
    // Send a request to your server to get the list of users
    fetch(all_users, {
      method: get_method,
      headers: {
        Authorization: `${bearer} ${jwtToken}`,
        content_type: application_json,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${http_error}${response.status}`);
        }
        return response.json();
      })
      .then((users) => {
        // Display the list of users
        displayUsers(users);
      })
      .catch((error) => {
        console.error(user_list_error, error);
      });
  }
}

// Rest of the code remains unchanged

// Function to get the value of a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  
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
  const jwtToken = localStorage.getItem(access_token);

  // Check if the token is present
  if (jwtToken) {
    // Send a request to your server to make the user an admin
    fetch(`${single_user}${userId}`, {
      method: put_method,
      headers: {
        Authorization: `${bearer} ${jwtToken}`,
        content_type: application_json,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${http_error}${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        // After making the user an admin, refresh the users list
        getUsersList();
      })
      .catch((error) => {
        console.error(admin_error, error);
      });
  }
}

function removeAdmin(userId) {
  // Retrieve the JWT token from localStorage
  const jwtToken = localStorage.getItem(access_token);

  // Check if the token is present
  if (jwtToken) {
    // Send a request to your server to remove admin status from the user
    fetch(`${single_user}${userId}`, {
      method: patch_method,
      headers: {
        Authorization: `${bearer} ${jwtToken}`,
        content_type: application_json,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${http_error}${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        // After removing admin status, refresh the users list
        getUsersList();
      })
      .catch((error) => {
        console.error(admin_remove_error, error);
      });
  }
}
function deleteUser(userId) {
  // Retrieve the JWT token from localStorage
  const jwtToken = localStorage.getItem(access_token);

  // Check if the token is present
  if (jwtToken) {
    // Send a request to your server to delete the user
    fetch(`${single_user}${userId}`, {
      method: delete_method,
      headers: {
        Authorization: `${bearer} ${jwtToken}`,
        content_type: application_json,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${http_error}${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        // After deleting the user, refresh the users list
        getUsersList();
      })
      .catch((error) => {
        console.error(deleting_user_error, error);
      });
  }
}

window.onload = getUsersList();
