function submitForm(event) {
  event.preventDefault();

  let question = document.getElementById("question").value;
  let fileInput = document.getElementById("file");
  let file = fileInput.files[0];

  console.log(file)
  // Create a plain JavaScript object
  let requestData = {
      question: question,
      file: file
  };

  // Convert the object to a JSON string
  let jsonData = JSON.stringify(requestData);

  console.log(jsonData);

  fetch("https://easeread-ai-backend.onrender.com/API/v1/document_qa", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: jsonData
  })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(responseData => {
          console.log("Response from backend:", responseData);

          // Check if the server response indicates successful processing
          if (responseData && responseData.result) {
              // Display the result in the frontend
              document.getElementById("result").innerText = responseData.result;
          } else {
              console.error("Result not received in the server response");
          }
      })
      .catch(error => {
          console.error("Error during processing", error);
          // Handle processing error, e.g., show an error message
      });
}
