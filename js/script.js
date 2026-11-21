const themeButton = document.querySelector('.theme-toggle');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#nav-links');
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
const form = document.querySelector('#contact-form');
const feedback = document.querySelector('#form-feedback');

themeButton.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  themeButton.textContent = dark ? 'Light mode' : 'Dark mode';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  themeButton.setAttribute('aria-pressed', String(dark));
});

menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

filters.forEach(button => button.addEventListener('click', () => {
  const type = button.dataset.filter;
  filters.forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  cards.forEach(card => {
    const visible = type === 'all' || card.dataset.category === type;
    card.hidden = !visible;
    if (visible) count += 1;
  });
  document.querySelector('#filter-status').textContent = `${count} projects shown`;
}));

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (name.length < 2 || !validEmail || message.length < 10) {
    feedback.textContent = 'Please enter a name, a valid email, and a message of at least 10 characters.';
    feedback.className = 'form-feedback error';
    return;
  }
  feedback.textContent = `Thanks, ${name}! This demo form works, but no message was sent.`;
  feedback.className = 'form-feedback success';
  form.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();
