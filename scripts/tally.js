import './pdfdownloader.js';

export function setupTally() {
  // --- Load Officer Info ---
  const user = JSON.parse(localStorage.getItem("userData"));
  const userName = user?.username || "Officer";
  const userRole = user?.role || "N/A";
  const userShift = localStorage.getItem("userShift") || "Unknown";

  document.getElementById("user-name").textContent = `${userName}`;
  document.getElementById("user-role").innerText = `${userRole}`;
  document.getElementById("user-shift").innerHTML = `${userShift}`;

  function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    document.getElementById('currentTime').innerHTML = `<strong>Time:</strong> ${timeString}`;
  }
  setInterval(updateTime, 1000);
  updateTime();

  function generateTimeSlots(shift) {
    const timeSlots = [];
    let startHour, endHour;

    if (shift === 'A') {
      startHour = 7;
      endHour = 18;
    } else if (shift === 'B') {
      startHour = 18;
      endHour = 7;
    } else {
      console.error("Invalid shift");
      return [];
    }

    let currentHour = startHour;
    while (currentHour !== endHour) {
      let nextHour = (currentHour + 1) % 24;
      const timeSlot = `${String(currentHour).padStart(2, '0')}:00 - ${String(nextHour).padStart(2, '0')}:59`;
      timeSlots.push(timeSlot);
      currentHour = nextHour;
    }

    return timeSlots;
  }

  const timeSlots = generateTimeSlots(userShift);
  const tableBody = document.querySelector("#tallyTable tbody");
  tableBody.innerHTML = ''; // Clear previous rows if reloading

  const totals = [0, 0, 0];

  timeSlots.forEach(slot => {
    const row = document.createElement('tr');

    const timeCell = document.createElement('td');
    timeCell.textContent = slot;
    row.appendChild(timeCell);

    for (let i = 0; i < 3; i++) {
      const countCell = document.createElement('td');
      countCell.classList.add('tally-cell');
      countCell.setAttribute('data-count', '0');
      countCell.innerHTML = `
        <div class="tally-wrapper"></div>
        <div class="count-indicator">0</div>
      `;
      row.appendChild(countCell);

      countCell.addEventListener('click', () => {
        let count = parseInt(countCell.getAttribute('data-count')) + 1;
        countCell.setAttribute('data-count', count);

        const wrapper = countCell.querySelector('.tally-wrapper');
        const countDisplay = countCell.querySelector('.count-indicator');

        wrapper.innerHTML = "";
        countDisplay.textContent = count;

        const bundles = Math.floor(count / 5);
        const remainder = count % 5;

        for (let j = 0; j < bundles; j++) {
          const img = document.createElement("img");
          img.src = "../../assets/images/tally5.png";
          img.alt = "tally5";
          img.classList.add("tally-img");
          wrapper.appendChild(img);
        }

        if (remainder > 0) {
          const span = document.createElement("span");
          span.classList.add("tally-lines");
          span.textContent = "|".repeat(remainder);
          wrapper.appendChild(span);
        }

        totals[i] += 1;
        document.querySelector(`#totals-row td[data-total-index="${i}"]`).textContent = totals[i];
      });
    }

    tableBody.appendChild(row);
  });

  // Totals row
  const totalsRow = document.createElement('tr');
  totalsRow.id = 'totals-row';
  const labelCell = document.createElement('td');
  labelCell.textContent = "TOTAL";
  totalsRow.appendChild(labelCell);

  for (let i = 0; i < 3; i++) {
    const totalCell = document.createElement('td');
    totalCell.classList.add('total-cell');
    totalCell.textContent = '0';
    totalCell.setAttribute('data-total-index', i);
    totalsRow.appendChild(totalCell);
  }

  tableBody.appendChild(totalsRow);
}
