// src/scripts/login.js

export function setupLogin(showSection) {
    const form = document.getElementById("login-form");
    const message = document.getElementById("login-message");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const username = form.username.value.trim();
      const role = form.role.value.trim();
      const password = form.password.value;
  
      if (username && role && password) {
        // You could validate password here or check hardcoded demo credentials
        const userData = { username, role };
        localStorage.setItem("userData", JSON.stringify(userData));
  
        // Now show welcome section
        showSection("welcome");
        message.textContent = ""; // clear message
        form.reset();
      } else {
        message.textContent = "Please fill all fields.";
      }
    });
  }
  