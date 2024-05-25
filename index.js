const apiUrl = "https://api.globalphone.io/validate";

document.getElementById("validateBtn").addEventListener("click", () => {
  const phoneNumber = document.getElementById("phoneNumber").value.trim();

  if (phoneNumber === "") {
    showError("Please enter a phone number.");
    return;
  }

  fetch(`${apiUrl}?number=${phoneNumber}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.valid) {
        displayResult(data);
      } else {
        showError(
          "Invalid phone number. Please enter a valid international phone number."
        );
      }
    })
    .catch((error) => {
      console.error("Error validating phone number:", error);
      showError(
        "An error occurred while validating the phone number. Please try again later."
      );
    });
});

function displayResult(data) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
        <h2>Phone Number Information</h2>
        <ul>
            <li><strong>Country:</strong> ${data.country.name} (${data.country.iso2})</li>
            <li><strong>Location:</strong> ${data.location}</li>
            <li><strong>Carrier:</strong> ${data.carrier.name}</li>
            <li><strong>Line Type:</strong> ${data.line_type}</li>
        </ul>
    `;
}

function showError(message) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<div class="alert alert-danger">${message}</div>`;
}
