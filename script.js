const navToggle = document.getElementById('navToggle');
const navPanel = document.getElementById('navPanel');
const navBackdrop = document.getElementById('navBackdrop');

function openNav(){
  navPanel.classList.add('is-open');
  navBackdrop.classList.add('is-open');
  navToggle.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close menu');
  navPanel.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeNav(){
  navPanel.classList.remove('is-open');
  navBackdrop.classList.remove('is-open');
  navToggle.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
  navPanel.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  navPanel.classList.contains('is-open') ? closeNav() : openNav();
});

navBackdrop.addEventListener('click', closeNav);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});

navPanel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

// Close the panel if the viewport grows back to desktop width
window.addEventListener('resize', () => {
  if (window.innerWidth >= 900) closeNav();
});

/* ============================================================
   Contact Form — Validation & Handling
   ============================================================ */
(function(){
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput    = document.getElementById('formName');
  const emailInput   = document.getElementById('formEmail');
  const phoneInput   = document.getElementById('formPhone');
  const subjectInput = document.getElementById('formSubject');
  const messageInput = document.getElementById('formMessage');
  const successMsg   = document.getElementById('formSuccess');

  const fields = [
    { el: nameInput,    errorId: 'nameError'    },
    { el: emailInput,   errorId: 'emailError'   },
    { el: subjectInput, errorId: 'subjectError'  },
    { el: messageInput, errorId: 'messageError'  },
  ];

  // Real-time validation on blur
  fields.forEach(({ el }) => {
    el.addEventListener('blur', () => validateField(el));
    el.addEventListener('input', () => {
      if (el.parentElement.classList.contains('has-error')) {
        validateField(el);
      }
    });
  });

  function validateField(el) {
    const group = el.parentElement;
    let valid = true;

    if (el.hasAttribute('required') && !el.value.trim()) {
      valid = false;
    }

    if (el.type === 'email' && el.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(el.value.trim())) valid = false;
    }

    if (valid) {
      group.classList.remove('has-error');
    } else if (el.hasAttribute('required') || el.type === 'email') {
      group.classList.add('has-error');
    }

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Hide any previous success message
    successMsg.classList.remove('is-visible');

    // Validate all required fields
    let allValid = true;
    fields.forEach(({ el }) => {
      if (!validateField(el)) allValid = false;
    });

    if (!allValid) {
      // Scroll to the first error
      const firstError = document.querySelector('.form-group.has-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.querySelector('input, select, textarea').focus();
      }
      return;
    }

// ── Send via EmailJS ──
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending…';
    submitBtn.disabled = true;

const templateParams = {
      from_name: document.getElementById('formName').value,
      from_email: document.getElementById('formEmail').value,
      reply_to: document.getElementById('formEmail').value,
      phone: document.getElementById('formPhone').value,
      subject: document.getElementById('formSubject').value,
      message: document.getElementById('formMessage').value,
    };

emailjs.send('service_gc2oufn', 'template_hcpvqgg', templateParams)
      .then(() => {
        successMsg.classList.add('is-visible');
        form.reset();
        document.querySelectorAll('.form-group.has-error').forEach(g => g.classList.remove('has-error'));
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch(() => {
alert('Oops! Something went wrong. Please try again or email us directly at info.maossaley@gmail.com.');
      })
      .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  });
})();
