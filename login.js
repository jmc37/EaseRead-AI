function login(event) {
  event.preventDefault();
  let uname = document.getElementById("uname").value;
  let password = document.getElementById("password").value;
  let data = {
    uname: uname,
    password: password,
  };
  console.log("Data", data);
  let jsonData = JSON.stringify(data);
  const xhttp = newXMLHTTPRequest();
}
