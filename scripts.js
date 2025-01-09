async function submitForm(event) {
  event.preventDefault();

  // Collect form values
  const dollar100 = document.getElementById("dollar100").value;
  const dollar50 = document.getElementById("dollar50").value;
  const dollar20 = document.getElementById("dollar20").value;
  const dollar10 = document.getElementById("dollar10").value;
  const dollar5 = document.getElementById("dollar5").value;
  const dollar2 = document.getElementById("dollar2").value;
  const dollar1 = document.getElementById("dollar1").value;
  const quarter = document.getElementById("quarter").value;
  const dime = document.getElementById("dime").value;
  const nickel = document.getElementById("nickel").value;
  const penny = document.getElementById("penny").value;
  const totalCash = document.getElementById("totalCash").value;
  const cashTips = document.getElementById("cashTips").value;
  const creditCardTips = document.getElementById("creditCardTips").value;
  const totalTips = document.getElementById("totalTips").value;
  const totalHours = document.getElementById("totalHours").value;
  const tipsPerHours = document.getElementById("tipsPerHours").value;
  const employee1 = document.getElementById("employee1").value;

  const employee2Element = document.getElementById("employee2");
  const employee2 = employee2Element ? employee2Element.value : "";
  const employee3Element = document.getElementById("employee3");
  const employee3 = employee3Element ? employee3Element.value : "";
  const employee4Element = document.getElementById("employee4"); 
  const employee4 = employee4Element ? employee4Element.value : "";
  const employee5Element = document.getElementById("employee5");
  const employee5 = employee5Element ? employee5Element.value : "";
  const employee6Element = document.getElementById("employee6");
  const employee6 = employee6Element ? employee6Element.value : "";
  const employee7Element = document.getElementById("employee7");
  const employee7 = employee7Element ? employee7Element.value : "";
  const employee8Element = document.getElementById("employee8");
  const employee8 = employee8Element ? employee8Element.value : "";
  const employee9Element = document.getElementById("employee9");
  const employee9 = employee9Element ? employee9Element.value : "";
  const employee10Element = document.getElementById("employee10");
  const employee10 = employee10Element ? employee10Element.value : "";

  // Google Form URL and Entry IDs
  const formURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSeyHEKMM3bey-CI6SZ9NFvggHdL-mE6m82Nrrtm_OYe_l8qfg/formResponse";
  const formData = new FormData();
  formData.append("entry.620449416", dollar100); // 1
  formData.append("entry.1257815732", dollar50); //2
  formData.append("entry.1364637093", dollar20); //3
  formData.append("entry.430719215", dollar10); //4
  formData.append("entry.301685711", dollar5); //5
  formData.append("entry.1092902415", dollar2); //6
  formData.append("entry.2079235495", dollar1); //7
  formData.append("entry.306064341", quarter); //8
  formData.append("entry.192192234", dime); //9
  formData.append("entry.1789237795", nickel); //10
  formData.append("entry.1270358826", penny); //11
  formData.append("entry.1226012656", totalCash); //12
  formData.append("entry.642661969", cashTips); //13
  formData.append("entry.1970204850", creditCardTips); //14
  formData.append("entry.1109905648", totalTips); //15
  formData.append("entry.1394990260", totalHours); //16
  formData.append("entry.4514394", tipsPerHours); //17
  formData.append("entry.327614031", employee1); //18
  formData.append("entry.985937245", employee2); //19
  formData.append("entry.32268275", employee3); //20
  formData.append("entry.677445114", employee4); //21
  formData.append("entry.186781676", employee5); //22
  formData.append("entry.90846170", employee6); //23
  formData.append("entry.939478897", employee7); //24
  formData.append("entry.1967954126", employee8); //25
  formData.append("entry.326229070", employee9); //26
  formData.append("entry.642011690", employee10); //27

  try {
    // Submit form data
    await fetch(formURL, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });

    // Call Apps Script function to send email
    google.script.run.sendSummaryEmail({
      dollar100,
      dollar50,
      dollar20,
      dollar10,
      dollar5,
      dollar2,
      dollar1,
      quarter,
      dime,
      nickel,
      penny,
      totalCash,
      cashTips,
      creditCardTips,
      totalTips,
      totalHours,
      tipsPerHours,
      employee1,
      employee2,
      employee3,
      employee4,
      employee5,
      employee6,
      employee7,
      employee8,
      employee9,
      employee10,
    });

    showAlert("Form submitted successfully, and email sent!");
    resetForm();
  } catch (error) {
    showAlert("Failed to submit the form. Please try again.");
    console.error("Error submitting form:", error);
  }
}

// Track how many employee rows have been added
let employeeRowCount = 1;

function addEmployeeRow() {

  if (employeeRowCount >= 10) {
    showAlert("You’ve reached the maximum of 10 employees.");
    return;
  }
  employeeRowCount++;


  const tableBody = document.querySelector("#employeeTable tbody");
  const newRow = document.createElement("tr");
  const employeeCell = document.createElement("td");
  employeeCell.innerHTML = `
    <label></label>
    <input type="text" id="employee${employeeRowCount}" placeholder="Employee ${employeeRowCount}" />
  `;

  const hoursCell = document.createElement("td");
  hoursCell.innerHTML = `
    <label></label>
    <input type="text"/>
  `;

  const tipsCell = document.createElement("td");
  tipsCell.innerHTML = `
    <label></label>
    <input type="text"/>
  `;

  newRow.appendChild(employeeCell);
  newRow.appendChild(hoursCell);
  newRow.appendChild(tipsCell);

  tableBody.appendChild(newRow);
}

function calculateTotal() {
  const dollar100 = parseFloat(document.getElementById("dollar100").value) || 0;
  const dollar50 = parseFloat(document.getElementById("dollar50").value) || 0;
  const dollar20 = parseFloat(document.getElementById("dollar20").value) || 0;
  const dollar10 = parseFloat(document.getElementById("dollar10").value) || 0;
  const dollar5 = parseFloat(document.getElementById("dollar5").value) || 0;
  const dollar2 = parseFloat(document.getElementById("dollar2").value) || 0;
  const dollar1 = parseFloat(document.getElementById("dollar1").value) || 0;
  const quarter = parseFloat(document.getElementById("quarter").value) || 0;
  const dime = parseFloat(document.getElementById("dime").value) || 0;
  const nickel = parseFloat(document.getElementById("nickel").value) || 0;
  const penny = parseFloat(document.getElementById("penny").value) || 0;

  const dollar100Total = dollar100 * 100;
  document.getElementById("dollar100Total").value = dollar100Total;
  const dollar50Total = dollar50 * 50;
  document.getElementById("dollar50Total").value = dollar50Total;
  const dollar20Total = dollar20 * 20;
  document.getElementById("dollar20Total").value = dollar20Total;
  const dollar10Total = dollar10 * 10;
  document.getElementById("dollar10Total").value = dollar10Total;
  const dollar5Total = dollar5 * 5;
  document.getElementById("dollar5Total").value = dollar5Total;
  const dollar2Total = dollar2 * 2;
  document.getElementById("dollar2Total").value = dollar2Total;
  const dollar1Total = dollar1;
  document.getElementById("dollar1Total").value = dollar1Total;
  const quarterTotal = 0.25 * quarter;
  document.getElementById("quarterTotal").value = quarterTotal.toFixed(2);
  const dimeTotal = 0.1 * dime;
  document.getElementById("dimeTotal").value = dimeTotal.toFixed(2);
  const nickelTotal = 0.05 * nickel;
  document.getElementById("nickelTotal").value = nickelTotal.toFixed(2);
  const pennyTotal = 0.01 * penny;
  document.getElementById("pennyTotal").value = pennyTotal.toFixed(2);

  const totalCash =
    dollar100Total +
    dollar50Total +
    dollar20Total +
    dollar10Total +
    dollar5Total +
    dollar2Total +
    dollar1Total +
    quarterTotal +
    dimeTotal +
    nickelTotal +
    pennyTotal;
  document.getElementById("totalCash").value = totalCash.toFixed(2);
}

function calculateTip() {
  const cashTips = parseFloat(document.getElementById("cashTips").value) || 0;
  const creditCardTips =
    parseFloat(document.getElementById("creditCardTips").value) || 0;
  const totalHours =
    parseFloat(document.getElementById("totalHours").value) || 0;

  const totalTips = cashTips + creditCardTips;
  document.getElementById("totalTips").value = totalTips.toFixed(2);

  const tipsPerHours = totalHours > 0 ? totalTips / totalHours : 0;
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
  employeeRowCount = 1;
  const tableBody = document.querySelector("#employeeTable tbody");

  while (tableBody.rows.length > 1) {
    tableBody.deleteRow(tableBody.rows.length - 1);
  }

  document.getElementById("dollar100").value = "";
  document.getElementById("dollar50").value = "";
  document.getElementById("dollar20").value = "";
  document.getElementById("dollar10").value = "";
  document.getElementById("dollar5").value = "";
  document.getElementById("dollar2").value = "";
  document.getElementById("dollar1").value = "";
  document.getElementById("quarter").value = "";
  document.getElementById("dime").value = "";
  document.getElementById("nickel").value = "";
  document.getElementById("penny").value = "";
  document.getElementById("totalCash").value = "";
  document.getElementById("totalTips").value = "";
  document.getElementById("tipsPerHours").value = "";
  document.getElementById("cashTips").value = "";
  document.getElementById("creditCardTips").value = "";
  document.getElementById("totalHours").value = "";
  document.getElementById("employee1").value = "";
}

//Enter key to move focus to the next input field in the form

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent default behavior
    const focusableElements = Array.from(
      document.querySelectorAll("input:not([readonly]):not([disabled])")
    );
    const activeElement = document.activeElement;
    const currentIndex = focusableElements.indexOf(activeElement);

    // Move to the next element or loop back to the first
    const nextIndex = (currentIndex + 1) % focusableElements.length;
    focusableElements[nextIndex].focus();
  }
});

document.querySelectorAll("#dynamicForm input[readonly]").forEach((field) => {
  field.setAttribute("tabindex", "-1");
});

// Display the current date on the page
document.addEventListener("DOMContentLoaded", function () {
  const currentDateElement = document.getElementById("currentDate");
  const today = new Date();

  // Format the date as needed (e.g., "January 4, 2025")
  const options = { year: "numeric", month: "long", day: "numeric" };
  currentDateElement.textContent = today.toLocaleDateString(undefined, options);
});
