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


// function login(event) {
//   event.preventDefault();
//   console.log(login_route);

//   let username = document.getElementById("username").value;
//   let password = document.getElementById("password").value;

//   // Validate username format (ensure it's not empty)
//   if (!username.trim()) {
//     alert(empty_username);
//     return;
//   }


//   if (!password) {
//     alert(valid_password);
//     return;
//   }

//   let data = {
//     username: username,
//     password: password,
//   };

//   fetch("https://easeread-ai-backend.onrender.com/API/v1/login", {
//     method: post_method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`${http_error}${response.status}`);
//       }
//       // return response.json();
//     })
//     .then((responseData) => {
//       if (responseData && responseData.access_token) {
//         console.log("response.aceestoken:" ,responseData.access_token)
//         // Set the token as an HTTP cookie
//         document.cookie = `access_token=${responseData.access_token}; Secure; HttpOnly`;

//         // Redirect to userdashboard.html
//         window.location.href = "../html/userDashboard.html";
//       } else {
//         console.error(token_error);
//       }
//       // Redirect to userDashboard.html on a successful server response
//       window.location.href = "../html/userDashboard.html";
//     })
//     .catch((error) => {
//       console.error(login_error, error);
//     });
// }
function login(event) {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

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
      return response.json();
    })
    .then((responseData) => {
      if (responseData && responseData.access_token) {
        const accessToken = responseData.access_token;
        console.log("Access Token:", accessToken);
        // Access the access_token cookie
        const accessCookie = getCookie('access_token');
        console.log('cookie:', accessCookie);
        // Set the access token as an HTTP cookie
        // document.cookie = `access_token=${accessToken}; Secure; HttpOnly; path=/`;
        // Redirect to userdashboard.html
        // window.location.href = "../html/userDashboard.html";
      } else {
        console.error("Token not received in the server response");
      }
    })
    .catch((error) => {
      console.error("Error during login", error);
      // Handle login error, e.g., show an error message
    });
}


// function checkAdminAccess() {
//   const jwtToken = getCookie("access_token");

//   if (jwtToken) {
//     // Send a request to your server to validate the token
//     fetch(admin_dashboard_route, {
//       method: get_method,
//       headers: {
//         Authorization: `${bearer} ${jwtToken}`,
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`${http_error}${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data.is_admin) {
//           document.getElementById("adminButton").style.display = "block";
//         }
//       })
//       .catch((error) => {
//         console.error(admin_error, error);
//       });
//   }
// }

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
  console.log(jwtToken)
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

// Function to get the value of a specific cookie by name
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
      if (cookieName === name) {
          return decodeURIComponent(cookieValue);
      }
  }
  return null;
}
