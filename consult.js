/* consult.js
   Behavior:
   - If invalid: show message "plz fill the details." and stay on page.
   - If valid: redirect to ./404.html
   - Keeps mobile nav toggle and footer year nicety.
*/

(function () {
  // Mobile nav toggle (hamburger)
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('active');
    });
    document.addEventListener('click', (ev) => {
      if (!nav.contains(ev.target) && !hamburger.contains(ev.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Footer year
  const yearEl = document.getElementById('alt-footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Form handling
  const form = document.querySelector('.consult-form');
  if (!form) return;
  const submitBtn = form.querySelector('button[type="submit"]');

  // Utility: get/create top form message
  function getFormMessageEl() {
    let el = form.querySelector('.form-message');
    if (!el) {
      el = document.createElement('div');
      el.className = 'form-message';
      form.insertBefore(el, form.firstElementChild);
    }
    return el;
  }

  function showTopError(text) {
    const el = getFormMessageEl();
    el.textContent = text;
    el.className = 'form-message show error';
    el.setAttribute('role', 'alert');
    // auto-hide after 6s
    clearTimeout(el._t);
    el._t = setTimeout(() => {
      el.className = 'form-message';
      el.textContent = '';
    }, 6000);
  }

  function clearTopError() {
    const el = form.querySelector('.form-message');
    if (el) { el.className = 'form-message'; el.textContent = ''; }
  }

  // Inline error helpers (keeps your classes)
  function getErrorEl(field) {
    const row = field.closest('.form-row') || field.parentElement;
    let e = row.querySelector('.error-message');
    if (!e) {
      e = document.createElement('div');
      e.className = 'error-message';
      e.setAttribute('role', 'alert');
      row.appendChild(e);
    }
    return e;
  }
  function setFieldError(field, msg) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    getErrorEl(field).textContent = msg;
  }
  function clearFieldError(field) {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    const row = field.closest('.form-row') || field.parentElement;
    const e = row.querySelector('.error-message');
    if (e) e.textContent = '';
  }

  // Clear inline errors on input/change
  Array.from(form.querySelectorAll('.input, .select, .textarea, input[type="checkbox"]')).forEach(f => {
    f.addEventListener('input', () => clearFieldError(f));
    f.addEventListener('change', () => clearFieldError(f));
  });

  // Basic phone validator (optional field)
  function validatePhone(v) {
    if (!v) return true;
    return /^[+\d\s().-]{7,20}$/.test(v.trim());
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // clear previous top message and inline errors
    clearTopError();
    Array.from(form.querySelectorAll('.input, .select, .textarea, input[type="checkbox"]')).forEach(clearFieldError);

    // perform validation
    let valid = true;
    const name = form.elements['name'];
    const email = form.elements['email'];
    const service = form.elements['service'];
    const phone = form.elements['phone'];
    const consent = form.elements['consent'];

    if (!name || !name.value.trim()) { setFieldError(name, 'Please enter your full name.'); valid = false; }
    if (!email || !email.value.trim()) { setFieldError(email, 'Please enter your email.'); valid = false; }
    else if (!email.checkValidity()) { setFieldError(email, 'Please enter a valid email.'); valid = false; }
    if (!service || !service.value) { setFieldError(service, 'Please select a service.'); valid = false; }
    if (phone && phone.value && !validatePhone(phone.value)) { setFieldError(phone, 'Please enter a valid phone number.'); valid = false; }
    if (!consent || !consent.checked) { setFieldError(consent, 'Please agree to be contacted.'); valid = false; }

    if (!valid) {
      // focus first invalid field
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) try { firstInvalid.focus({preventScroll: true}); } catch (err) {}
      // show the exact message requested
      showTopError('plz fill the details.');
      return;
    }

    // If valid -> redirect to 404.html as requested
    // (You can change this path if needed)
    window.location.href = './404.html';
  });
})();
