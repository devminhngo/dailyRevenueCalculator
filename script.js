// Utility to get input values as a number
function getInputValue(id) {
  return parseFloat(document.getElementById(id).value) || 0;
}

// Utility to set input values
function setInputValue(id, value) {
  document.getElementById(id).value = value;
}

// Submit the form to Google Forms and Google Apps Script
async function submitForm(event) {
  event.preventDefault();
  const formData = new FormData();

  const denominations = [
    { id: "dollar100", entry: "entry.620449416" },
    { id: "dollar50", entry: "entry.1257815732" },
    { id: "dollar20", entry: "entry.1364637093" },
    { id: "dollar10", entry: "entry.430719215" },
    { id: "dollar5", entry: "entry.301685711" },
    { id: "dollar2", entry: "entry.1092902415" },
    { id: "dollar1", entry: "entry.2079235495" },
    { id: "quarter", entry: "entry.306064341" },
    { id: "dime", entry: "entry.192192234" },
    { id: "nickel", entry: "entry.1789237795" },
    { id: "penny", entry: "entry.1270358826" },
  ];

  denominations.forEach(({ id, entry }) => {
    formData.append(entry, getInputValue(id));
  });

  const otherFields = [
    { id: "totalCash", entry: "entry.1226012656" },
    { id: "cashTips", entry: "entry.642661969" },
    { id: "creditCardTips", entry: "entry.1970204850" },
    { id: "totalTips", entry: "entry.1109905648" },
    { id: "totalHours", entry: "entry.1394990260" },
    { id: "tipsPerHours", entry: "entry.4514394" },
  ];

  otherFields.forEach(({ id, entry }) => {
    formData.append(entry, getInputValue(id));
  });

  const employees = [
    {
      name: "employee1",
      hour: "employee1Hour",
      tip: "employee1Tip",
      entries: {
        name: "entry.327614031",
        hour: "entry.149025361",
        tip: "entry.457081833",
      },
    },
    {
      name: "employee2",
      hour: "employee2Hour",
      tip: "employee2Tip",
      entries: {
        name: "entry.985937245",
        hour: "entry.139079485",
        tip: "entry.2029080166",
      },
    },
    {
      name: "employee3",
      hour: "employee3Hour",
      tip: "employee3Tip",
      entries: {
        name: "entry.32268275",
        hour: "entry.588489638",
        tip: "entry.1419105835",
      },
    },
    {
      name: "employee4",
      hour: "employee4Hour",
      tip: "employee4Tip",
      entries: {
        name: "entry.677445114",
        hour: "entry.1718511892",
        tip: "entry.2062698025",
      },
    },
    {
      name: "employee5",
      hour: "employee5Hour",
      tip: "employee5Tip",
      entries: {
        name: "entry.186781676",
        hour: "entry.2135084544",
        tip: "entry.1866013795",
      },
    },
    {
      name: "employee6",
      hour: "employee6Hour",
      tip: "employee6Tip",
      entries: {
        name: "entry.90846170",
        hour: "entry.1904667002",
        tip: "entry.1859071159",
      },
    },
    {
      name: "employee7",
      hour: "employee7Hour",
      tip: "employee7Tip",
      entries: {
        name: "entry.939478897",
        hour: "entry.1651459784",
        tip: "entry.1384862999",
      },
    },
    {
      name: "employee8",
      hour: "employee8Hour",
      tip: "employee8Tip",
      entries: {
        name: "entry.1967954126",
        hour: "entry.611891140",
        tip: "entry.173505653",
      },
    },
    {
      name: "employee9",
      hour: "employee9Hour",
      tip: "employee9Tip",
      entries: {
        name: "entry.326229070",
        hour: "entry.1664580093",
        tip: "entry.406033651",
      },
    },
    {
      name: "employee10",
      hour: "employee10Hour",
      tip: "employee10Tip",
      entries: {
        name: "entry.642011690",
        hour: "entry.93211156",
        tip: "entry.1836842277",
      },
    },
  ];

  employees.forEach(({ name, hour, tip, entries }) => {
    formData.append(entries.name, document.getElementById(name).value);
    formData.append(entries.hour, document.getElementById(hour).value);
    formData.append(entries.tip, document.getElementById(tip).value);
  });

  const formURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSeyHEKMM3bey-CI6SZ9NFvggHdL-mE6m82Nrrtm_OYe_l8qfg/formResponse";
    try {
      // Submit to Google Form
      await fetch(formURL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
      
    // Prepare data for Apps Script
    const scriptData = {
      dollar100: getInputValue("dollar100"),
      dollar50: getInputValue("dollar50"),
      dollar20: getInputValue("dollar20"),
      dollar10: getInputValue("dollar10"),
      dollar5: getInputValue("dollar5"),
      dollar2: getInputValue("dollar2"),
      dollar1: getInputValue("dollar1"),
      quarter: getInputValue("quarter"),
      dime: getInputValue("dime"),
      nickel: getInputValue("nickel"),
      penny: getInputValue("penny"),
      totalCash: getInputValue("totalCash"),
      cashTips: getInputValue("cashTips"),
      creditCardTips: getInputValue("creditCardTips"),
      totalTips: getInputValue("totalTips"),
      tipsPerHours: getInputValue("tipsPerHours"),
      employees: employees.map(({ name, hour, tip }) => ({
        name: document.getElementById(name).value,
        hours: getInputValue(hour),
        tips: getInputValue(tip),
      })),
    };

    // Send data to Apps Script for email
    google.script.run.sendSummaryEmail(scriptData);
    alert("Form submitted successfully, and email sent!");
    resetForm();
  } catch (error) {
    alert("Failed to submit the form. Please try again.");
    console.error("Error submitting form:", error);
  }
}

function calculateTotal() {
  const denominations = [
    { id: "dollar100", multiplier: 100 },
    { id: "dollar50", multiplier: 50 },
    { id: "dollar20", multiplier: 20 },
    { id: "dollar10", multiplier: 10 },
    { id: "dollar5", multiplier: 5 },
    { id: "dollar2", multiplier: 2 },
    { id: "dollar1", multiplier: 1 },
    { id: "quarter", multiplier: 0.25 },
    { id: "dime", multiplier: 0.1 },
    { id: "nickel", multiplier: 0.05 },
    { id: "penny", multiplier: 0.01 },
  ];

  let totalCash = 0;

  denominations.forEach(({ id, multiplier }) => {
    const total = getInputValue(id) * multiplier;
    setInputValue(`${id}Total`, total.toFixed(2));
    totalCash += total;
  });

  setInputValue("totalCash", totalCash.toFixed(2));
}

function calculateTip() {
  const cashTips = getInputValue("cashTips");
  const creditCardTips = getInputValue("creditCardTips");
  const totalTips = cashTips + creditCardTips;

  setInputValue("totalTips", totalTips.toFixed(2));

  const rows = document.querySelectorAll(
    "#employeeTable tbody tr:not(.hidden)"
  );
  let totalHours = 0;

  rows.forEach((row) => {
    const hours = getInputValue(row.querySelector("input[id$='Hour']").id);
    totalHours += hours;
  });

  setInputValue("totalHours", totalHours.toFixed(2));

  const tipsPerHours = totalHours > 0 ? totalTips / totalHours : 0;
  setInputValue("tipsPerHours", tipsPerHours.toFixed(2));

  rows.forEach((row) => {
    const hours = getInputValue(row.querySelector("input[id$='Hour']").id);
    const tips = hours * tipsPerHours;
    setInputValue(row.querySelector("input[id$='Tip']").id, tips.toFixed(2));
  });
}

function resetForm() {
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  employeeRowCount = 1;

  document.querySelectorAll("#employeeTable tbody tr").forEach((row, index) => {
    if (index > 0) row.classList.add("hidden");
  });
}

// Add a new employee row
let employeeRowCount = 1;

function addEmployeeRow() {
  const maxRows = 10;
  if (employeeRowCount >= maxRows) {
    showAlert("You’ve reached the maximum of 10 employees.");
    return;
  }

  employeeRowCount++;
  const nextRow = document.querySelector(`#employeeTable tbody tr.hidden`);
  if (nextRow) {
    nextRow.classList.remove("hidden");
  }
}

// Navigate with Enter key
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const focusableElements = Array.from(
      document.querySelectorAll("input:not([readonly]):not([disabled])")
    );
    const currentIndex = focusableElements.indexOf(document.activeElement);
    const nextIndex = (currentIndex + 1) % focusableElements.length;
    focusableElements[nextIndex].focus();
  }
});

// Display current date
document.addEventListener("DOMContentLoaded", function () {
  const currentDateElement = document.getElementById("currentDate");
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  currentDateElement.textContent = today.toLocaleDateString(undefined, options);
});