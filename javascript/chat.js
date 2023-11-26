const chat_route = chatStrings.apiRoutes.chat;

const processing_error = chatStrings.messages.processingError;

const post_method = chatStrings.methods.post;

const load = chatStrings.load;
const content_type = chatStrings.contentType;
const application_json = chatStrings.applicationJSON;
const loading_wheel = chatStrings.bigHTML;

window.addEventListener(load, function () {
    checkAdminAccess();
});

async function submitForm(event) {
    event.preventDefault();
    console.log("Form was submitted")
    // let question = document.getElementById("question").value;

    // // Create the request data object with user input
    // let requestData = {
    //     question: question,
    // };

    // // Display the loading Hamster spinner
    // document.getElementById("result").innerHTML = loading_wheel;

    // try {
    //     console.log("sending req")
    //     // Make the POST request to your Flask backend
    //     const response = await fetch(chat_route, {
    //         method: post_method,
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(requestData),
    //     });

    //     // Check if the request was successful (status code 200)
    //     if (response.ok) {
    //         const result = await response.json();

    //         // Display the result in the frontend
    //         const resultContainer = document.getElementById("result");

    //         resultContainer.innerHTML = result.answer;

    //         // Show the result container
    //         document.getElementById("resultContainer").classList.remove('hidden');
    //     } else {
    //         // Handle non-successful response (e.g., show an error message)
    //         console.error(processing_error, response.statusText);
    //     }
    // } catch (error) {
    //     console.error(processing_error, error);
    //     // Handle processing error, e.g., show an error message
    // }
}
// console.log(document.cookie)