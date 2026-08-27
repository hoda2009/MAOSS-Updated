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

// Prevent browsers from jumping to scroll positions on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector(".steam-hero");

  if (!heroSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add class to trigger animation when scrolled into view
          entry.target.classList.add("in-view");
        } else {
          // Remove class when user scrolls away, resetting it for next time
          entry.target.classList.remove("in-view");
        }
      });
    },
    {
      /* rootMargin ensures it ONLY animates 
         when the section is 100px inside the visible viewport */
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.1
    }
  );

  observer.observe(heroSection);
});





/* ==========================FOUNDATIONS SECTION==================================*/
document.addEventListener("DOMContentLoaded", () => {
  const foundationsSection = document.querySelector(".foundations");

  if (!foundationsSection) return;

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observerInstance.unobserve(entry.target); // Runs ONLY ONCE
        }
      });
    },
    {
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.15
    }
  );

  observer.observe(foundationsSection);
});

function resetLocationNoteAnimation() {
  const noteLabel = document.querySelector('.location-note .note-label');
  const noteInner = document.querySelector('.location-note-inner');
  [noteLabel, noteInner].forEach((el) => {
    if (!el) return;
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
}

window.addEventListener('pageshow', resetLocationNoteAnimation);
window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    resetLocationNoteAnimation();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const locationNote = document.querySelector('.location-note');
  if (!locationNote) return;

  const noteInner = locationNote.querySelector('.location-note-inner');
  const noteLabel = locationNote.querySelector('.note-label');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        noteInner?.classList.add('in-view');
        noteLabel?.classList.add('in-view');
      } else {
        noteInner?.classList.remove('in-view');
        noteLabel?.classList.remove('in-view');
      }
    });
  }, {
    threshold: 0.25
  });

  observer.observe(locationNote);
});

document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll(
    '.block-head, .split .panel, .objective-card, .teaching-grid .card, .block .grid .card, .activity-list li'
  );

  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -80px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});



/*=======================================Staff=======================*/
/* =========================================================
   TEACHER LANGUAGE TOGGLE
   ========================================================= */

document.querySelectorAll(".teacher-language-toggle").forEach(button => {

  button.addEventListener("click", function () {

    const card = this.closest(".teacher-card");
    const description = card.querySelector(".teacher-description");

    if (this.textContent.trim() === "العربية") {

      // Save English text
      description.dataset.english = description.textContent.trim();

      // Replace with Arabic
      description.textContent = description.dataset.arabic;

      // Arabic direction
      description.setAttribute("dir", "rtl");

      // Change button
      this.textContent = "English";

    } else {

      // Replace with English
      description.textContent = description.dataset.english;

      // Back to normal direction
      description.removeAttribute("dir");

      // Change button
      this.textContent = "العربية";

    }

  });

});

document.addEventListener("DOMContentLoaded", function () {

  const educatorsSection = document.querySelector(".educators-section");

  if (!educatorsSection) return;

  const teacherCards =
    educatorsSection.querySelectorAll(".teacher-card");

  const observer = new IntersectionObserver(
    function (entries, observer) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {

          teacherCards.forEach(function (card) {
            card.classList.add("animate-in");
          });

          // IMPORTANT:
          // Stop watching after the first appearance.
          // The animation will NOT replay.
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.15
    }
  );

  observer.observe(educatorsSection);

});
