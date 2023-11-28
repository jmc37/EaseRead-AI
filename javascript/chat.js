const chat_route = chatStrings.apiRoutes.chat;
const logout_route = chatStrings.apiRoutes.logout;
const processing_error = chatStrings.messages.processingError;

const load = chatStrings.load;
const loading_wheel = chatStrings.bigHTML;

window.addEventListener(load, function () {
  console.log("Checking admin access");
  checkAdminAccess();
});
function redirectToAdminDashboard() {
  window.location.href = "../html/adminDashboard.html";
}
async function submitForm(event) {
  event.preventDefault();
  console.log("Form was submitted");
  let question = document.getElementById("question").value;

  // Create the request data object with user input
  let requestData = {
    question: question,
  };

  // Display the loading Hamster spinner
  document.getElementById("result").innerHTML = loading_wheel;

  try {
    console.log("sending req");
    // Make the POST request to your Flask backend
    const response = await fetch(chat_route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    // Check if the request was successful (status code 200)
    if (response.ok) {
      const result = await response.json();

      // Display the result in the frontend
      const resultContainer = document.getElementById("result");

      resultContainer.innerHTML = result.answer;

      // Show the result container
      document.getElementById("resultContainer").classList.remove("hidden");
    } else {
      // Handle non-successful response (e.g., show an error message)
      console.error(processing_error, response.statusText);
    }
  } catch (error) {
    console.error(processing_error, error);
    // Handle processing error, e.g., show an error message
  }
}

function logout() {
  const jwtToken = localStorage.getItem("access_token");

  // Check if the token is present
  if (jwtToken) {
    console.log("jwt token present, ", jwtToken);
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
          throw new Error(`HTTP error! Status: ${response}`);
        }
        console.log("response: ", response);
        return response.json(); // This returns a promise
      })
      .then((data) => {
        // Handle the JSON data here
        console.log("data: ", data);
        localStorage.removeItem("access_token");
        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.error("Error logging out", error);
      });
  }
}
function checkAdminAccess() {
  const jwtToken = localStorage.getItem("access_token");
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
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  var parsedToken = JSON.parse(jsonPayload);
  var username = parsedToken.username;

  return username;
}

function apiRequests() {
  console.log("Called");
  // Retrieve the username from local storage
  const jwtToken = localStorage.getItem("access_token");
  username = parseJwt(jwtToken);
  console.log(username);
  if (username) {
    // Make a request to the API
    fetch(`https://easeread-ai-backend.onrender.com/API/v1/user/${username}`)
      .then((response) => response.json())
      .then((data) => {
        // Display the results on the page
        document.getElementById(
          "apicalls"
        ).innerText = `API Requests for ${username}: ${data.api_requests}`;
      })
      .catch((error) => console.error("Error:", error));
  } else {
    console.error("Username not found in local storage");
  }
}
window.onload = apiRequests();
//admin access Set was working with ------->
// function checkAdminAccess() {
//   // Send a request to your server to validate the token
//   fetch("https://easeread-ai-backend.onrender.com/API/v1/admin-dashboard", {
//     method: "GET",
//     headers: {
//       credentials: "include",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       console.log("response: ", response.json())
//       return response.json();
//     })
//     .then((data) => {
//       if (data.is_admin) {
//         document.getElementById("adminButton").style.display = "block";
//       }
//     })
//     .catch((error) => {
//       console.error("Error checking admin access:", error);
//     });

// }
