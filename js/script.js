// All interactions run locally in the browser. No external services are used.
const themeButton = document.querySelector('.theme-toggle');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#nav-links');
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
const form = document.querySelector('#contact-form');
const feedback = document.querySelector('#form-feedback');
const dialog = document.querySelector('#project-dialog');

function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeButton.textContent = dark ? 'Light mode' : 'Dark mode';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  themeButton.setAttribute('aria-pressed', String(dark));
  document.querySelector('meta[name="theme-color"]').content = dark ? '#131c32' : '#f9f9fd';
}

try {
  applyTheme(localStorage.getItem('alex-styles-theme') === 'dark');
} catch {
  applyTheme(false);
}

themeButton.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark');
  applyTheme(dark);
  try {
    localStorage.setItem('alex-styles-theme', dark ? 'dark' : 'light');
  } catch {
    // The theme still works if storage is disabled in the browser.
  }
});

function closeMenu() {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });

  let count = 0;
  cards.forEach(card => {
    const visible = category === 'all' || card.dataset.category === category;
    card.hidden = !visible;
    if (visible) count += 1;
  });
  document.querySelector('#filter-status').textContent =
    `${count} project${count === 1 ? '' : 's'} shown`;
}));

// A static, fictional project dictionary powers the accessible details modal.
const projects = {
  landing: {
    type: 'WEB DESIGN / RESPONSIVE',
    title: 'Studio Landing Page',
    description: 'A practice landing page for an imaginary creative studio, designed to make its main message and next action easy to understand.',
    highlights: [
      'Visual hierarchy built with clear typography and generous spacing.',
      'Responsive sections that rearrange for tablet and mobile widths.',
      'Accessible navigation and strong contrast for key calls to action.'
    ]
  },
  tracker: {
    type: 'JAVASCRIPT / INTERACTION',
    title: 'Task Tracker',
    description: 'An interactive concept exploring how small interface decisions help people track their daily priorities.',
    highlights: [
      'Clear states for pending and completed tasks.',
      'Interaction feedback that makes each change noticeable.',
      'A simple card layout that remains readable on narrow screens.'
    ]
  },
  recipes: {
    type: 'UI DESIGN / CSS GRID',
    title: 'Recipe Collection',
    description: 'A visual exploration of a recipe catalog that groups related information into flexible, easy-to-scan cards.',
    highlights: [
      'Consistent spacing and typography across repeated card elements.',
      'A flexible grid that scales from mobile to desktop.',
      'Descriptive imagery and sensible content grouping.'
    ]
  }
};

function openProject(key) {
  const project = projects[key];
  if (!project) return;

  document.querySelector('#dialog-type').textContent = project.type;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-description').textContent = project.description;
  const highlights = document.querySelector('#dialog-highlights');
  highlights.replaceChildren();
  for (const detail of project.highlights) {
    const item = document.createElement('li');
    item.textContent = detail;
    highlights.append(item);
  }
  dialog.showModal();
  dialog.querySelector('.modal-close').focus();
}

document.querySelectorAll('.project-detail').forEach(button => {
  button.addEventListener('click', () => openProject(button.dataset.project));
});
dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());

// Click on the backdrop to dismiss, while preserving clicks inside the dialog.
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || dialog.open || !menu.classList.contains('open')) return;

  closeMenu();
  if (menuButton.getClientRects().length > 0) menuButton.focus();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.elements.namedItem('name').value.trim();
  const email = form.elements.namedItem('email').value.trim();
  const message = form.elements.namedItem('message').value.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (name.length < 2 || !validEmail || message.length < 10) {
    feedback.textContent = 'Please enter your name, a valid email address, and a message of at least 10 characters.';
    feedback.className = 'form-feedback error';
    return;
  }

  feedback.textContent = `Thanks, ${name}! This is a demo form, so no message was sent.`;
  feedback.className = 'form-feedback success';
  form.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();
