// Get the form element
const serviceForm = document.getElementById("service-form");

serviceForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Get the selected values from the form fields
  const serviceType = document.getElementById("service-type").value;
  const serviceDate = document.getElementById("service-date").value;
  const additionalInfo = document.getElementById("additional-info").value;

  // Display an alert with the submitted information
  alert(`Your service request has been submitted:
  Service Type: ${serviceType}
  Preferred Date: ${serviceDate}
  Additional Information: ${additionalInfo}`);
});
