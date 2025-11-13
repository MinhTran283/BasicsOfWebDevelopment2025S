document.addEventListener('DOMContentLoaded', () => {
  const $ = (s) => document.querySelector(s);

  const form = $('#enroll-form');
  const tsInput = $('#ts');
  const nameInput = $('#fullname');
  const emailInput = $('#email');
  const phoneInput = $('#phone');
  const birthInput = $('#birth');
  const termsInput = $('#terms');
  const tbody = $('#rows');

  const errName = $('#err-fullname');
  const errEmail = $('#err-email');
  const errPhone = $('#err-phone');
  const errBirth = $('#err-birth');
  const errTerms = $('#err-terms');

  const clearBtn = $('#clear-btn');

  function clearErrors() {
    errName.textContent = '';
    errEmail.textContent = '';
    errPhone.textContent = '';
    errBirth.textContent = '';
    errTerms.textContent = '';
  }

  function validateFullName(value) {
    if (!value || !value.trim()) return 'Please enter your full name (first and last).';
    const parts = value.trim().split(/\s+/);
    if (parts.length < 2) return 'Please provide at least first and last name.';
    if (parts.some(p => p.length < 2)) return 'Each name part should be at least 2 characters.';
    return '';
  }

  function validateEmail(value) {
    if (!value || !value.trim()) return 'Please enter your email address.';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value.trim())) return 'Please provide a valid email address.';
    return '';
  }

  function validatePhone(value) {
    if (!value || !value.trim()) return 'Please enter your phone number.';
    const re = /^\+358\d{7,12}$/;
    if (!re.test(value.trim())) return 'Use Finnish format: +358 followed by 7–12 digits.';
    return '';
  }

  function validateBirth(value) {
    if (!value) return 'Please select your birth date.';
    const today = new Date();
    const d = new Date(value + 'T00:00:00');
    if (d > today) return 'Birth date cannot be in the future.';
    const age = today.getFullYear() - d.getFullYear() -
      ((today.getMonth() < d.getMonth() || (today.getMonth() === d.getMonth() && today.getDate() < d.getDate())) ? 1 : 0);
    if (age < 13) return 'You must be at least 13 years old.';
    return '';
  }

  function validateTerms(checked) {
    return checked ? '' : 'You must accept the terms to continue.';
  }

  function timestamp() {
    const now = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())} ${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())}`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const nameErr = validateFullName(nameInput.value);
    const emailErr = validateEmail(emailInput.value);
    const phoneErr = validatePhone(phoneInput.value);
    const birthErr = validateBirth(birthInput.value);
    const termsErr = validateTerms(termsInput.checked);

    let invalid = false;
    if (nameErr) { errName.textContent = nameErr; invalid = true; }
    if (emailErr) { errEmail.textContent = emailErr; invalid = true; }
    if (phoneErr) { errPhone.textContent = phoneErr; invalid = true; }
    if (birthErr) { errBirth.textContent = birthErr; invalid = true; }
    if (termsErr) { errTerms.textContent = termsErr; invalid = true; }

    if (invalid) return;

    const ts = timestamp();
    tsInput.value = ts;

    const tr = document.createElement('tr');
    [
      ts,
      nameInput.value.trim(),
      emailInput.value.trim(),
      phoneInput.value.trim(),
      birthInput.value,
      termsInput.checked ? '✅' : '❌'
    ].forEach(val => {
      const td = document.createElement('td');
      td.textContent = val;
      td.className = 'px-4 py-2';
      tr.appendChild(td);
    });

    tbody.appendChild(tr);

    form.reset();
    clearErrors();
    nameInput.focus();
  });

  clearBtn.addEventListener('click', () => {
    form.reset();
    clearErrors();
    nameInput.focus();
  });
});
