/**
 * Superhero Help Portal - Contact & Inquiries Module
 * Handles client-side validation for citizen and municipal inquiries,
 * feedback feedback messages, and submission notifications.
 */

document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
});

function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const contactValidators = {
    contactName: (val) => {
      if (!val || val.trim().length < 2) return "Please enter your name (at least 2 characters).";
      return "";
    },
    contactEmail: (val) => {
      if (!val || !val.trim()) return "Email address is required.";
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(val.trim())) return "Please enter a valid email address.";
      return "";
    },
    contactSubject: (val) => {
      if (!val || !val.trim()) return "Please select or specify an inquiry topic.";
      return "";
    },
    contactMessage: (val) => {
      if (!val || val.trim().length < 15) return "Your message must be at least 15 characters long.";
      return "";
    }
  };

  // Setup input blur validation
  Object.keys(contactValidators).forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (!input) return;

    input.addEventListener("blur", () => {
      validateContactField(input, contactValidators[fieldId]);
    });

    input.addEventListener("input", () => {
      if (input.classList.contains("is-invalid")) {
        validateContactField(input, contactValidators[fieldId]);
      }
    });
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    let firstInvalid = null;

    Object.keys(contactValidators).forEach(fieldId => {
      const input = document.getElementById(fieldId);
      if (input) {
        const fieldValid = validateContactField(input, contactValidators[fieldId]);
        if (!fieldValid) {
          isValid = false;
          if (!firstInvalid) firstInvalid = input;
        }
      }
    });

    if (!isValid) {
      if (firstInvalid) firstInvalid.focus();
      showToast("Please correct highlighted errors in the contact form.", "error");
      return;
    }

    // Success response
    const nameVal = document.getElementById("contactName").value;
    contactForm.reset();
    contactForm.querySelectorAll(".is-valid, .is-invalid").forEach(el => el.classList.remove("is-valid", "is-invalid"));

    showToast(`Thank you, ${nameVal}! Your inquiry has been routed to Aegis Liaison HQ.`, "success", 5000);

    const successBanner = document.getElementById("contactSuccessBanner");
    if (successBanner) {
      successBanner.style.display = "block";
      setTimeout(() => {
        successBanner.style.display = "none";
      }, 7000);
    }
  });

  function validateContactField(input, validator) {
    const errorEl = document.getElementById(`${input.id}Error`);
    const msg = validator(input.value);

    if (msg) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      if (errorEl) {
        errorEl.textContent = msg;
        errorEl.style.display = "block";
      }
      return false;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.style.display = "none";
      }
      return true;
    }
  }
}
