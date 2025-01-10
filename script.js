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
    { id: "dollar100", entry: "entry.620449416" }, //1
    { id: "dollar50", entry: "entry.1257815732" }, //2
    { id: "dollar20", entry: "entry.1364637093" }, //3
    { id: "dollar10", entry: "entry.430719215" }, //4
    { id: "dollar5", entry: "entry.301685711" }, //5
    { id: "dollar2", entry: "entry.1092902415" }, //6
    { id: "dollar1", entry: "entry.2079235495" }, //7 
    { id: "quarter", entry: "entry.306064341" }, //8
    { id: "dime", entry: "entry.192192234" }, //9
    { id: "nickel", entry: "entry.1789237795" }, //10 
    { id: "penny", entry: "entry.1270358826" }, //11
  ];

  denominations.forEach(({ id, entry }) => {
    formData.append(entry, getInputValue(id));
  });

  const otherFields = [
    { id: "totalCash", entry: "entry.1226012656" }, //12
    { id: "cashTips", entry: "entry.642661969" }, //13
    { id: "creditCardTips", entry: "entry.1970204850" }, //14
    { id: "totalTips", entry: "entry.1109905648" }, //15
    { id: "totalHours", entry: "entry.1394990260" }, //16
    { id: "tipsPerHours", entry: "entry.4514394" }, //17
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
        name: "entry.327614031", //18
        hour: "entry.149025361", //19
        tip: "entry.457081833", //20
      },
    },
    {
      name: "employee2",
      hour: "employee2Hour",
      tip: "employee2Tip",
      entries: {
        name: "entry.985937245", //21
        hour: "entry.139079485", //22
        tip: "entry.2029080166", //23
      },
    },
    {
      name: "employee3",
      hour: "employee3Hour",
      tip: "employee3Tip",
      entries: {
        name: "entry.32268275", //24
        hour: "entry.588489638", //25
        tip: "entry.1419105835", //26
      },
    },
    {
      name: "employee4",
      hour: "employee4Hour",
      tip: "employee4Tip",
      entries: {
        name: "entry.677445114", //27
        hour: "entry.1718511892", //28
        tip: "entry.2062698025", //29
      },
    },
    {
      name: "employee5",
      hour: "employee5Hour",
      tip: "employee5Tip",
      entries: {
        name: "entry.186781676", //30
        hour: "entry.2135084544", //31
        tip: "entry.1866013795", //32
      },
    },
    {
      name: "employee6",
      hour: "employee6Hour",
      tip: "employee6Tip",
      entries: {
        name: "entry.90846170", //33
        hour: "entry.1904667002", //34
        tip: "entry.1859071159", //35
      },
    },
    {
      name: "employee7",
      hour: "employee7Hour",
      tip: "employee7Tip",
      entries: {
        name: "entry.939478897", //36
        hour: "entry.1651459784", //37
        tip: "entry.1384862999", //38
      },
    },
    {
      name: "employee8",
      hour: "employee8Hour",
      tip: "employee8Tip",
      entries: {
        name: "entry.1967954126", //39
        hour: "entry.611891140", //40
        tip: "entry.173505653", //41
      },
    },
    {
      name: "employee9",
      hour: "employee9Hour",
      tip: "employee9Tip",
      entries: {
        name: "entry.326229070", //42
        hour: "entry.1664580093", //43
        tip: "entry.406033651", //44
      },
    },
    {
      name: "employee10",
      hour: "employee10Hour",
      tip: "employee10Tip",
      entries: {
        name: "entry.642011690", //45
        hour: "entry.93211156", //46
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
    "https://docs.google.com/forms/d/e/1FAIpQLSdO8nn0cdQuDbwIrRoiS_XtpLa5jY7E0GiwE_m2tlKVmGC72g/formResponse";
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
    showToast("Form submitted successfully, and email sent!", "success");
    resetForm();
  } catch (error) {
    showToast("Failed to submit the form. Please try again.", "error");
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

function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toastContainer");

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <span class="close-btn">&times;</span>
  `;

  // Add close functionality
  const closeBtn = toast.querySelector(".close-btn");
  closeBtn.onclick = () => {
    toastContainer.removeChild(toast);
  };

  // Append toast to container
  toastContainer.appendChild(toast);

  // Remove toast after 4 seconds
  setTimeout(() => {
    if (toast.parentNode === toastContainer) {
      toastContainer.removeChild(toast);
    }
  }, 4000);
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