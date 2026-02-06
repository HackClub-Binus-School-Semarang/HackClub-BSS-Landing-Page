const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const sunIcon = '<circle cx="12" cy="12" r="5"/><g stroke="currentColor" stroke-linecap="round" stroke-width="2"><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></g>';
const moonIcon = '<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>';

function setIcon(isDark) {
  themeIcon.innerHTML = isDark ? sunIcon : moonIcon;
}

const userPref = localStorage.getItem('theme');
const systemPrefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const isStoredDark = userPref === 'dark' || (!userPref && systemPrefDark);
document.body.classList.add(isStoredDark ? 'dark-theme' : 'light-theme');
setIcon(isStoredDark);

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-theme');
  document.body.classList.toggle('dark-theme', !isDark);
  document.body.classList.toggle('light-theme', isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  setIcon(!isDark);
});

const faqButton = document.getElementById('faq-button');
const faqModal = document.getElementById('faq-modal');
faqButton.addEventListener('click', (e) => {
  e.preventDefault();
  faqModal.style.display = 'flex';
});
function closeFAQ() {
  faqModal.style.display = 'none';
}
faqModal.addEventListener('click', function (e) {
  if (e.target === faqModal) closeFAQ();
});

function buildMailto({ user, domain, plus, subject, body }) {
  const address = user + (plus ? `+${plus}` : '') + '@' + domain;
  return (
    'mailto:' +
    address +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body)
  );
}

const links = {
  register: "https://forms.gle/YEDzSUoqXq4NubB86",
  HackClub: "https://hackclub.com",
  Instagram: "https://instagram.com/hackclub.bss",
  email: buildMailto({
    user: 'hackclub.bss',
    plus: 'general',
    domain: 'gmail.com',
    subject: 'Hack Club Inquiry',
    body:
      "Hi Hack Club Organizers,\n\n" +
      "I'm interested in joining Hack Club or learning more about it. " +
      "Could you please share more information?\n\n" +
      "Thank you!"
  }),
  email_Brilliant: buildMailto({
    user: 'hackclub.bss',
    plus: 'brilliant',
    domain: 'gmail.com',
    subject: 'Brilliant Premium Access Request',
    body:
      "Hi Hack Club Organizers,\n\n" +
      "I would like to request access to Brilliant Premium.\n\n" +
      "Name:\nSchool Email:\nReason for Request:\n\n" +
      "Thanks!"
  }),
  COC: "https://hackclub.com/conduct"
};

document.querySelectorAll('[data-link]').forEach(el => {
  const key = el.getAttribute('data-link');
  const url = links[key];

  if (url) {
    el.setAttribute('href', url);
    if (url.startsWith('http') || url.startsWith('mailto')) {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && faqModal.style.display === 'flex') {
    closeFAQ();
  }
});
