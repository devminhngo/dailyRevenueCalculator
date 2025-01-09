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
    <div style="font-family: 'Roboto', Arial, sans-serif; line-height: 1.5; color: #333;">
      <h1 style="color: #3498db; text-align: center;">Daily Revenue Summary</h1>
      <h3 style="text-align: center; color: #2c3e50;">Location: Park Meadows</h3>
      
      <div style="margin: 20px auto; max-width: 600px; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <p><strong>Total Cash:</strong> $${data.totalCash}</p>
        <p><strong>Cash Tips:</strong> $${data.cashTips}</p>
        <p><strong>Credit Card Tips:</strong> $${data.creditCardTips}</p>
        <p><strong>Total Tips:</strong> $${data.totalTips}</p>
        <p><strong>Tips Per Hour:</strong> $${data.tipsPerHours}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin: 20px auto; max-width: 600px; font-size: 14px;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #3498db; color: white;">Employee</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #3498db; color: white;">Hours Worked</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #3498db; color: white;">Total Tips</th>
          </tr>
        </thead>
        <tbody>
          ${generateEmployeeRows(data)}
        </tbody>
      </table>

      <h3 style="text-align: center; color: #2c3e50;">Breakdown</h3>

      <div style="margin: 20px auto; max-width: 600px; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <p><strong>$100 Bills:</strong> ${data.dollar100}</p>
      <p><strong>$50 Bills:</strong> ${data.dollar50}</p>
      <p><strong>$20 Bills:</strong> ${data.dollar20}</p>
      <p><strong>$10 Bills:</strong> ${data.dollar10}</p>
      <p><strong>$5 Bills:</strong> ${data.dollar5}</p>
      <p><strong>$1 Bills:</strong> ${data.dollar1}</p>
      <p><strong>Quarters:</strong> ${data.quarter}</p>
      <p><strong>Dimes:</strong> ${data.dime}</p>
      <p><strong>Nickels:</strong> ${data.nickel}</p>
      <p><strong>Pennies:</strong> ${data.penny}</p>
      <p><strong>$2 Bills:</strong> ${data.dollar2}</p>
      </div>
      
      <p style="text-align: center; color: #7f8c8d; font-size: 12px;">
        Submitted by: <strong>Minh Khoai To</strong>
      </p>
    </div>
  `;

  try {
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: body
    });
    Logger.log("Email sent successfully to %s", recipient);
  } catch (error) {
    Logger.log("Error sending email: %s", error.message);
  }
}

function generateEmployeeRows(data) {
  return data.employees
    .filter(emp => emp.name) // Only include employees with a name
    .map(
      emp => `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${emp.name}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${emp.hours}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">$${emp.tips}</td>
        </tr>
      `
    )
    .join("");
}

