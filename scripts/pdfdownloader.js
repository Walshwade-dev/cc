// Function to generate the summary content for the PDF
function generateSummary() {
    const officerNameInput = document.querySelector('input[name="officerName"]');
    const remarksInput = document.querySelector('textarea[name="remarks"]');
    const timestamp = new Date().toLocaleString();
    
    if (!officerNameInput.value.trim()) {
      alert("Please enter your full name before downloading the PDF.");
      return null; // Return null if validation fails
    }
    
    // Fill in verification time
    document.getElementById('verificationTime').value = timestamp;
    document.getElementById('timestampDisplay').textContent = `Verified on: ${timestamp}`;
    
    // Generate the summary content
    const summaryContent = `
      <hr>
      <p><strong>Verified by:</strong> Assistant Manager</p>
      <p><strong>Name:</strong> ${officerNameInput.value}</p>
      <p><strong>Remarks:</strong> ${remarksInput.value}</p>
      <p><strong>Verification Time:</strong> ${timestamp}</p>
      <p><strong>Totals:</strong></p>
      <ul>
        ${getTotalCounts().map(count => `<li>${count}</li>`).join('')}
      </ul>
    `;
    
    // Inject into PDF summary section
    const summaryDiv = document.getElementById('pdfSummary');
    summaryDiv.innerHTML = summaryContent;
    
    return true; // Indicating the process succeeded
  }
  
  // Function to gather the total counts of vehicles
  function getTotalCounts() {
    const totalsRow = document.querySelectorAll('#totals-row td');
    return [
      `Buses: ${totalsRow[1]?.textContent || 0}`,
      `Mini Trucks: ${totalsRow[2]?.textContent || 0}`,
      `Heavy Trucks: ${totalsRow[3]?.textContent || 0}`
    ];
  }
  
  // Function to initiate the PDF download
  function downloadPDF() {
    // Check if the summary was successfully generated
    if (!generateSummary()) return; // Abort if validation fails
    
    const element = document.getElementById('pdfContent');
    if (!element) {
      alert("PDF content section not found. Make sure you're on the tally page.");
      return;
    }
    
    const now = new Date();
    const opt = {
      margin: 0.5,
      filename: `vehicle-tally-${now.toISOString().split("T")[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };
    
    html2pdf().set(opt).from(element).save().then(() => {
      // Show form again after PDF is downloaded
      document.getElementById('verifyForm').style.display = '';
    });
  }
  
  // Set up event listener for PDF download button
  document.getElementById('downloadPDF').addEventListener('click', downloadPDF);
  