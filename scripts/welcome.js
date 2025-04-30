// src/scripts/welcome.js

export function setupWelcome(showSection) {
    const user = JSON.parse(localStorage.getItem("userData"));
  
    if (!user) {
      showSection('login');
      return;
    }
  
    const greetingEl = document.getElementById("greeting");
    const roleEl = document.getElementById("user-role");
    const shiftEl = document.getElementById("shift-info");
  
    // Determine greeting
    const now = new Date();
    const hour = now.getHours();
    let greeting = "Hello";
  
    if (hour >= 5 && hour < 12) {
      greeting = "Good morning";
    } else if (hour >= 12 && hour < 17) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }
  
    // Determine shift
    let shift = "";
    let shiftCode = "";
  
    if (hour >= 7 && hour < 18) {
      shift = "Shift A (0700hrs – 1800hrs)";
      shiftCode = "A";
    } else {
      shift = "Shift B (1800hrs – 0700hrs)";
      shiftCode = "B";
    }
  
    // Store in localStorage
    localStorage.setItem("activeShift", shift);
    localStorage.setItem("userShift", shiftCode);
  
    // Update DOM
    greetingEl.textContent = `${greeting}, ${user.username}`;
    roleEl.textContent = `Role: ${user.role}`;
    shiftEl.textContent = `Welcome to ${shift}, to start tallying click next.`;
  
    // Set up "next" button
    const nextBtn = document.getElementById("go-to-tally");
    nextBtn.addEventListener("click", () => {
      showSection('tally');
    });
  }
  