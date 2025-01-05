async function submitForm(event) {
  event.preventDefault();

  // Collect form values
  const $100 = document.getElementById("$100").value;
  const $50 = document.getElementById("$50").value;
  const $20 = document.getElementById("$20").value;
  const $10 = document.getElementById("$10").value;
  const $5 = document.getElementById("$5").value;
  const $2 = document.getElementById("$2").value;
  const $1 = document.getElementById("$1").value;
  const quarter = document.getElementById("$0.25").value;
  const dime = document.getElementById("$0.1").value;
  const nickel = document.getElementById("$0.05").value;
  const totalCash = document.getElementById("totalCash").value;
  const cashTips = document.getElementById("cashTips").value;
  const creditCardTips = document.getElementById("creditCardTips").value;
  const totalTips = document.getElementById("totalTips").value;
  const hoursWorked = document.getElementById("hoursWorked").value;
  const tipsPerHours = document.getElementById("tipsPerHours").value;
  const employees = document.getElementById("employees").value;

  // Google Form URL and Entry IDs
  const formURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSeyHEKMM3bey-CI6SZ9NFvggHdL-mE6m82Nrrtm_OYe_l8qfg/formResponse";
  const formData = new FormData();
  formData.append("entry.620449416", $100); // Replace with correct IDs
  formData.append("entry.1257815732", $50);
  formData.append("entry.1364637093", $20);
  formData.append("entry.430719215", $10);
  formData.append("entry.301685711", $5);
  formData.append("entry.1092902415", $2);
  formData.append("entry.2079235495", $1);
  formData.append("entry.306064341", quarter);
  formData.append("entry.192192234", dime);
  formData.append("entry.1789237795", nickel);
  formData.append("entry.1226012656", totalCash);
  formData.append("entry.642661969", cashTips);
  formData.append("entry.1970204850", creditCardTips);
  formData.append("entry.1109905648", totalTips);
  formData.append("entry.1394990260", hoursWorked);
  formData.append("entry.4514394", tipsPerHours);
  formData.append("entry.327614031", employees);

  try {
    // Submit form data
    await fetch(formURL, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });

    // Call Apps Script function to send email
    google.script.run.sendSummaryEmail({
      $100,
      $50,
      $20,
      $10,
      $5,
      $2,
      $1,
      quarter,
      dime,
      nickel,
      totalCash,
      cashTips,
      creditCardTips,
      totalTips,
      hoursWorked,
      tipsPerHours,
      employees,
    });

    showAlert("Form submitted successfully, and email sent!");
    resetForm();
  } catch (error) {
    showAlert("Failed to submit the form. Please try again.");
    console.error("Error submitting form:", error);
  }
}

function calculateTotal() {
  const $100 = parseFloat(document.getElementById("$100").value) || 0;
  const $50 = parseFloat(document.getElementById("$50").value) || 0;
  const $20 = parseFloat(document.getElementById("$20").value) || 0;
  const $10 = parseFloat(document.getElementById("$10").value) || 0;
  const $5 = parseFloat(document.getElementById("$5").value) || 0;
  const $2 = parseFloat(document.getElementById("$2").value) || 0;
  const $1 = parseFloat(document.getElementById("$1").value) || 0;
  const quarter = parseFloat(document.getElementById("$0.25").value) || 0;
  const dime = parseFloat(document.getElementById("$0.1").value) || 0;
  const nickel = parseFloat(document.getElementById("$0.05").value) || 0;

  const totalCash =
    100 * $100 +
    50 * $50 +
    20 * $20 +
    10 * $10 +
    5 * $5 +
    2 * $2 +
    $1 +
    0.25 * quarter +
    0.1 * dime +
    0.05 * nickel;
  document.getElementById("totalCash").value = totalCash.toFixed(2);

  const cashTips =
    parseFloat(document.getElementById("cashTips").value) || 0;
  const creditCardTips =
    parseFloat(document.getElementById("creditCardTips").value) || 0;
  const totalTips = cashTips + creditCardTips;
  document.getElementById("totalTips").value = totalTips.toFixed(2);

  const hoursWorked =
    parseFloat(document.getElementById("hoursWorked").value) || 0;
  const tipsPerHours = hoursWorked > 0 ? totalTips / hoursWorked : 0;
  document.getElementById("tipsPerHours").value = tipsPerHours.toFixed(2);
}
function showAlert(message) {
  const modal = document.getElementById("alertModal");
  const messageElement = document.getElementById("alertMessage");
  const closeModal = document.getElementById("closeModal");

  messageElement.textContent = message;
  modal.style.display = "block";

  // Close the modal when the "X" is clicked
  closeModal.onclick = function () {
    modal.style.display = "none";
  };

  // Close the modal when clicking outside the content
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}
function resetForm() {
  document.getElementById("$100").value = '';
  document.getElementById("$50").value = '';
  document.getElementById("$20").value = '';
  document.getElementById("$10").value = '';
  document.getElementById("$5").value = '';
  document.getElementById("$2").value = '';
  document.getElementById("$1").value = '';
  document.getElementById("$0.25").value = '';
  document.getElementById("$0.1").value = '';
  document.getElementById("$0.05").value = '';
  document.getElementById("totalCash").value = '';
  document.getElementById("totalTips").value = '';
  document.getElementById("tipsPerHours").value = '';
  document.getElementById("cashTips").value = '';
  document.getElementById("creditCardTips").value = '';
  document.getElementById("hoursWorked").value = '';
  document.getElementById("employees").value = "";
}

//Enter key to move focus to the next input field in the form

document.getElementById("dynamicForm").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default behavior
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);
    if (form.elements[index + 1]) {
      form.elements[index + 1].focus(); // Focus the next field
    }
  }
});

// Display the current date on the page
document.addEventListener("DOMContentLoaded", function () {
  const currentDateElement = document.getElementById("currentDate");
  const today = new Date();

  // Format the date as needed (e.g., "January 4, 2025")
  const options = { year: "numeric", month: "long", day: "numeric" };
  currentDateElement.textContent = today.toLocaleDateString(undefined, options);
});






