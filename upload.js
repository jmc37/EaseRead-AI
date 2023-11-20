function submitForm(event) {
    event.preventDefault();
  
    let question = document.getElementById("question").value;
    let fileInput = document.getElementById("file");
    let file = fileInput.files[0];
  
    let formData = new FormData();
    formData.append("question", question);
    formData.append("file", file);
    console.log(formData)
  
    fetch("https://easeread-ai-backend.onrender.com/document_qa", {
      method: "POST",
      body: formData
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
  
          // Optionally display the image
          if (responseData.image) {
            let imgElement = document.createElement("img");
            imgElement.src = responseData.image;
            imgElement.alt = "Uploaded Image";
            document.body.appendChild(imgElement);
          }
        } else {
          console.error("Result not received in the server response");
        }
      })
      .catch(error => {
        console.error("Error during processing", error);
        // Handle processing error, e.g., show an error message
      });
  }
  