const chat_route = chatStrings.apiRoutes.chat;
const logout_route = chatStrings.apiRoutes.logout;
const processing_error = chatStrings.messages.processingError;
const api_route = chatStrings.apiRoutes.api
const admin_access = chatStrings.apiRoutes.admin_access
const load = chatStrings.load;
const GET = chatStrings.methods.get
const POST = chatStrings.methods.post
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
  apiRequests();
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
      method: POST,
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

  fetch(logout_route, {
    method: POST,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the JSON data here
      console.log("data: ", data);
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Error logging out", error);
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
  // Make a request to the API
  fetch(api_route, {
    method: GET,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
      const apiRequestsElement = document.getElementById("apicalls");
      const currentApiRequests = data.length > 0 ? data[0].requests : 0;

      // Display the results on the page
      apiRequestsElement.innerText = `API Requests: ${currentApiRequests}`;

      // Check if the number of API requests has reached 20
      if (currentApiRequests >= 20) {
        // Display a warning
        apiRequestsElement.innerHTML +=
          "<br><span style='color: red;'>Warning: 20 requests reached!</span>";
      }
    })
    .catch((error) => console.error("Error:", error));
}


window.onload = apiRequests();
//admin access Set was working with ------->
function checkAdminAccess() {
  // Send a request to your server to validate the token
  fetch(admin_access, {
    method: GET,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("response:", data);
      if (data.is_admin) {
        document.getElementById("adminButton").style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error checking admin access:", error);
    });

}
