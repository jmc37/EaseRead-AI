window.addEventListener('load', function () {
    checkAdminAccess();
});

async function submitForm(event) {
    event.preventDefault();

    let question = document.getElementById("question").value;

    // Create the request data object with user input
    let requestData = {
        question: question,
    };

    // Display the loading Hamster spinner
    document.getElementById("result").innerHTML = `<br>
    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
      <div class="wheel"></div>
      <div class="hamster">
        <div class="hamster__body">
          <div class="hamster__head">
            <div class="hamster__ear"></div>
            <div class="hamster__eye"></div>
            <div class="hamster__nose"></div>
          </div>
          <div class="hamster__limb hamster__limb--fr"></div>
          <div class="hamster__limb hamster__limb--fl"></div>
          <div class="hamster__limb hamster__limb--br"></div>
          <div class="hamster__limb hamster__limb--bl"></div>
          <div class="hamster__tail"></div>
        </div>
      </div>
      <div class="spoke"></div>
    </div>`;

    try {
        // Make the POST request to your Flask backend
        const response = await fetch('https://easeread-ai-backend.onrender.com/API/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
            document.getElementById("resultContainer").classList.remove('hidden');
        } else {
            // Handle non-successful response (e.g., show an error message)
            console.error('Error during processing:', response.statusText);
        }
    } catch (error) {
        console.error('Error during processing', error);
        // Handle processing error, e.g., show an error message
    }
}