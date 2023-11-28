const all_users = adminDashboardStrings.apiRoutes.allUsers;
const single_user = adminDashboardStrings.apiRoutes.singleUser;
const logout_route = adminDashboardStrings.apiRoutes.logout;

const http_error = adminDashboardStrings.messages.httpError;
const user_list_error = adminDashboardStrings.messages.userListError;
const admin_error = adminDashboardStrings.messages.adminError;
const admin_remove_error = adminDashboardStrings.messages.adminRemovError;
const deleting_user_error = adminDashboardStrings.messages.deletingUserError;
const logoutSuccess = adminDashboardStrings.messages.logoutSuccess;
const logout_error = adminDashboardStrings.messages.logoutError;

const get_method = adminDashboardStrings.methods.get;
const put_method = adminDashboardStrings.methods.put;
const patch_method = adminDashboardStrings.methods.patch;
const delete_method = adminDashboardStrings.methods.delete;
const post_method = adminDashboardStrings.methods.post;

const admin_text = adminDashboardStrings.userListItem.adminText;
const yes_text = adminDashboardStrings.userListItem.yes;
const no_text = adminDashboardStrings.userListItem.no;
const make_admin_button_text =
  adminDashboardStrings.userListItem.makeAdminButton;
const remove_admin_button_text =
  adminDashboardStrings.userListItem.removeAdminButton;
const delete_user_button_text =
  adminDashboardStrings.userListItem.deleteUserButton;

const content_type = adminDashboardStrings.contentType;
const access_token = adminDashboardStrings.accessToken;
const application_json = adminDashboardStrings.applicationJSON;
const bearer = adminDashboardStrings.bearer;

function getUsersList() {
  // Retrieve the JWT token from cookies
  const jwtToken = localStorage.getItem("access_token");

  // Check if the token is present
  if (jwtToken) {
    // Send a request to your server to get the list of users
    fetch(all_users, {
      method: get_method,
      headers: {
        Authorization: `${bearer} ${jwtToken}`,
        "Content-Type": "application/json",
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
function displayUsers(users) {
  const usersListContainer = document.getElementById("usersList");

  const userListHTML =
    "<ul class='user-list'>" +
    users
      .map(
        (user) => `
          <li class='user-item'>
            <span class='username'>${user.username}</span>
            <span class='admin-status'>${admin_text} ${
          user.admin ? yes_text : no_text
        }</span>
            <span class='requests'>Requests: ${user.requests}</span>
            <button class='admin-button' onclick="makeAdmin(${
              user.id
            })">${make_admin_button_text}</button>
            <button class='admin-button' onclick="removeAdmin(${
              user.id
            })">${remove_admin_button_text}</button>
            <button class='delete-button' onclick="deleteUser(${
              user.id
            })">${delete_user_button_text}</button>
          </li>`
      )
      .join("") +
    "</ul>";

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
        "Content-Type": "application/json",
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
        "Content-Type": "application/json",
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
        "Content-Type": "application/json",
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
function logout() {
  const jwtToken = localStorage.getItem("access_token");
  console.log(jwtToken);
  if (jwtToken) {
    // Send a request to your server to validate the token
    fetch(logout_route, {
      method: post_method,
      headers: {
        Authorization: `${bearer} ${jwtToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${http_error}${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(logoutSuccess, data);

        // Delete the token cookie
        localStorage.removeItem("access_token");
        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.error(logout_error, error);
      });
  } else {
    console.error(jwt_error);
  }
}
// Async function to fetch and populate API data
async function fetchDataAndPopulateTable() {
  const jwtToken = localStorage.getItem("access_token");

  try {
    // Fetch API data from the server
    const response = await fetch(
      "https://easeread-ai-backend.onrender.com/API/v1/allapi",
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    // Call the function to populate the table with the retrieved data
    populateTable(data);
  } catch (error) {
    console.error("Error fetching or populating data:", error);
  }
}

// Function to dynamically populate the table
function populateTable(data) {
  var tableBody = document
    .getElementById("apiTable")
    .getElementsByTagName("tbody")[0];

  // Clear existing rows
  tableBody.innerHTML = "";

  // Loop through the API data and create a row for each entry
  for (var i = 0; i < data.length; i++) {
    var row = tableBody.insertRow(i);
    var cellEndpoint = row.insertCell(0);
    var cellId = row.insertCell(1);
    var cellMethod = row.insertCell(2);
    var cellRequests = row.insertCell(3);

    cellEndpoint.innerHTML = data[i].endpoint;
    cellId.innerHTML = data[i].id;
    cellMethod.innerHTML = data[i].method;
    cellRequests.innerHTML = data[i].requests;
  }
}

// Call the asynchronous function to fetch and populate API data
window.onload = fetchDataAndPopulateTable();
window.onload = getUsersList();
