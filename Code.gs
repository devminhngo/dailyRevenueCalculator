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
    Employees: ${data.employee1} ${data.employee2} ${data.employee3} ${data.employee4} ${data.employee5} ${data.employee6} ${data.employee7} ${data.employee8} ${data.employee9} ${data.employee10} 

    Breakdown:
    $100 Bills: ${data.$100}
    $50 Bills: ${data.$50}
    $20 Bills: ${data.$20}
    $10 Bills: ${data.$10}
    $5 Bills: ${data.$5}
    $2 Bills: ${data.$2} 
    $1 Bills: ${data.$1}
    Quarters: ${data.quarter}
    Dimes: ${data.dime}
    Nickels: ${data.nickel}

    Submitted by: Park Meadows Revenue Tracker.
  `;
  MailApp.sendEmail(recipient, subject, body);
}

