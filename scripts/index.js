import { setupLogin } from './login.js';
import { setupWelcome } from './welcome.js';
import { setupTally } from './tally.js'; // 👈 Create this file next

function showSection(id) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });

  const section = document.getElementById(id);
  if (section) {
    section.style.display = 'block';

    if (id === 'welcome') {
      setupWelcome(showSection);
    }

    if (id === 'tally') {
      setupTally(); // 👈 Initialize tally logic
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  showSection('login');
  setupLogin(showSection);
});
