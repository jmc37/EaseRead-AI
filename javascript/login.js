const login_route = loginStrings.apiRoutes.login;
const admin_dashboard_route = loginStrings.apiRoutes.adminDashboard;
const logout_route = loginStrings.apiRoutes.logout;

const empty_username = loginStrings.messages.emptyUsername;
const valid_password = loginStrings.messages.validPassword;
const http_error = loginStrings.messages.httpError;
const token_error = loginStrings.messages.tokenError;
const login_error = loginStrings.messages.loginError;
const admin_error = loginStrings.messages.adminError;
const logout_error = loginStrings.messages.logoutError;
const jwt_error = loginStrings.messages.jwtError;
const logoutSuccess = loginStrings.messages.logoutSuccess;

const get_method = loginStrings.methods.get;
const post_method = loginStrings.methods.post;

const content_type = loginStrings.contentType;
const application_json = loginStrings.applicationJSON;
const bearer = loginStrings.bearer;
const access_token = loginStrings.accessToken;
const document_cookie = loginStrings.documentCookie;


function login(event) {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // Validate username format (ensure it's not empty)
  if (!username.trim()) {
    alert(empty_username);
    return;
  }


  if (!password) {
    alert(valid_password);
    return;
  }

  let data = {
    username: username,
    password: password,
  };

  fetch(login_route, {
    method: post_method,
    headers: {
      content_type: application_json,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${http_error}${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      if (responseData && responseData.access_token) {
        // Set the token as an HTTP cookie
        document.cookie = `access_token=${responseData.access_token}; Secure; HttpOnly`;

        // Redirect to userdashboard.html
        window.location.href = "../html/userDashboard.html";
      } else {
        console.error(token_error);
      }
      // Redirect to userDashboard.html on a successful server response
      window.location.href = "../html/userDashboard.html";
    })
    .catch((error) => {
      console.error(login_error, error);
    });
}

function checkAdminAccess() {
  const jwtToken = getCookie(access_token);

  if (jwtToken) {
    // Send a request to your server to validate the token
    fetch(admin_dashboard_route, {
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
      .then((data) => {
        if (data.is_admin) {
          document.getElementById("adminButton").style.display = "block";
        }
      })
      .catch((error) => {
        console.error(admin_error, error);
      });
  }
}
function logout() {
  const jwtToken = getCookie(access_token);

  if (jwtToken) {
    // Send a request to your server to validate the token
    fetch(logout_route, {
      method: post_method,
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
        console.log(logoutSuccess, data);

        // Delete the token cookie
        document.cookie = document_cookie;
        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.error(logout_error, error);
      });
  } else {
    console.error(jwt_error);
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
