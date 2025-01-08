function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


function sendSummaryEmail(data) {
  const recipient = "shinerism@gmail.com";
  const subject = "Detailed Park Meadows Daily Revenue Summary";
  const body = `
    Daily Revenue Summary:
    
    Total Cash: $${data.totalCash}
    Cash Tips: $${data.cashTips}
    Credit Card Tips: $${data.creditCardTips}
    Total Tips: $${data.totalTips}
    Tips Per Hour: $${data.tipsPerHours}
    Employees: 
    ${data.employee1} ${data.employee1Hour} hours  $${data.employee1Tip}
    ${data.employee2} ${data.employee2Hour} hours  $${data.employee2Tip}
    ${data.employee3} ${data.employee3Hour} hours  $${data.employee3Tip}
    ${data.employee4} ${data.employee4Hour} hours  $${data.employee4Tip}
    ${data.employee5} ${data.employee5Hour} hours  $${data.employee5Tip}
    ${data.employee6} ${data.employee6Hour} hours  $${data.employee6Tip}
    ${data.employee7} ${data.employee7Hour} hours  $${data.employee7Tip}
    ${data.employee8} ${data.employee8Hour} hours  $${data.employee8Tip}
    ${data.employee9} ${data.employee9Hour} hours  $${data.employee9Tip}
    ${data.employee10} ${data.employee10Hour} hours  $${data.employee10Tip}

    Breakdown:
    $100 Bills: ${data.dollar100}
    $50 Bills: ${data.dollar50}
    $20 Bills: ${data.dollar20}
    $10 Bills: ${data.dollar10}
    $5 Bills: ${data.dollar5}
    $2 Bills: ${data.dollar2} 
    $1 Bills: ${data.dollar1}
    Quarters: ${data.quarter}
    Dimes: ${data.dime}
    Nickels: ${data.nickel}
    Pennys: ${data.penny}

    Submitted by: Park Meadows Revenue Tracker.
  `;
  MailApp.sendEmail(recipient, subject, body);
}

