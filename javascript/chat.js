
const chat_route = chatStrings.apiRoutes.chat;
const logout_route = chatStrings.apiRoutes.logout;
const processing_error = chatStrings.messages.processingError;

const load = chatStrings.load;
const loading_wheel = chatStrings.bigHTML;


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
window.addEventListener(load, function () {
    console.log("Checking admin access")
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
        console.log("response: ", response)
        return response.json(); // This returns a promise
      })
      .then((data) => {
        // Handle the JSON data here
        console.log("data: ", data)
        localStorage.removeItem("access_token");
        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.error("Error logging out", error);
      });
  }
}
