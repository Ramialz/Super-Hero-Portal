/**
 * Superhero Help Portal - Help Request & Dispatch Module
 * Handles client-side form validation, ticket generation, localStorage submission,
 * confirmation modal display, and "My Requests" live status table.
 */

document.addEventListener("DOMContentLoaded", () => {
  initRequestPage();
});

function initRequestPage() {
  const form = document.getElementById("helpRequestForm");
  const preferredHeroSelect = document.getElementById("preferredHero");
  const myRequestsTableBody = document.getElementById("myRequestsTableBody");
  const emptyRequestsMsg = document.getElementById("emptyRequestsMsg");
  const confirmationModal = document.getElementById("confirmationModal");
  const closeModalBtn = document.getElementById("closeModalBtn");

  // Pre-populate preferred hero dropdown
  if (preferredHeroSelect) {
    const heroes = getAllHeroes();
    const heroOptions = heroes.map(h => 
      `<option value="${escapeHTML(h.alias)}">${escapeHTML(h.alias)} (${h.city} - ${h.status})</option>`
    ).join("");
    preferredHeroSelect.innerHTML = `<option value="Any Available Hero">-- Auto-Dispatch (Nearest Available Hero) --</option>${heroOptions}`;

    // Check if hero was passed in URL
    const params = new URLSearchParams(window.location.search);
    const heroParam = params.get("hero");
    if (heroParam) {
      preferredHeroSelect.value = heroParam;
      showToast(`Selected operative ${heroParam} for direct dispatch priority`, "info");
    }
  }

  // Render user's existing requests
  renderMyRequests();

  // Form submit handler
  if (form) {
    // Setup real-time blur validation
    setupInputValidation(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!validateFullForm(form)) {
        showToast("Please correct highlighted errors before sending distress signal.", "error");
        return;
      }

      // Collect form data
      const formData = {
        fullName: document.getElementById("fullName").value,
        contactNumber: document.getElementById("contactNumber").value,
        email: document.getElementById("email").value,
        location: document.getElementById("location").value,
        category: document.getElementById("category").value,
        urgency: form.querySelector('input[name="urgency"]:checked') ? form.querySelector('input[name="urgency"]:checked').value : "Medium",
        description: document.getElementById("description").value,
        preferredHero: preferredHeroSelect ? preferredHeroSelect.value : "Any Available Hero"
      };

      // Save via storage module
      const newTicket = saveRequest(formData);

      // Refresh My Requests list
      renderMyRequests();

      // Show Confirmation Modal
      showConfirmationModal(newTicket);

      // Reset form
      form.reset();
      clearValidationErrors(form);

      // Reset urgency to Medium
      const defaultUrgency = document.getElementById("urgencyMedium");
      if (defaultUrgency) defaultUrgency.checked = true;

      showToast(`Emergency Ticket #${newTicket.ticketId} successfully broadcast!`, "success");
    });
  }

  // Close modal event
  if (closeModalBtn && confirmationModal) {
    closeModalBtn.addEventListener("click", () => {
      confirmationModal.classList.remove("is-open");
    });

    confirmationModal.addEventListener("click", (e) => {
      if (e.target === confirmationModal) {
        confirmationModal.classList.remove("is-open");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && confirmationModal.classList.contains("is-open")) {
        confirmationModal.classList.remove("is-open");
      }
    });
  }

  /**
   * Render "My Requests" table from localStorage
   */
  function renderMyRequests() {
    if (!myRequestsTableBody) return;

    const allRequests = getRequests();

    if (allRequests.length === 0) {
      myRequestsTableBody.innerHTML = "";
      if (emptyRequestsMsg) emptyRequestsMsg.style.display = "block";
      return;
    }

    if (emptyRequestsMsg) emptyRequestsMsg.style.display = "none";

    myRequestsTableBody.innerHTML = allRequests.map(req => {
      const urgencySlug = (req.urgency || "medium").toLowerCase();
      const statusSlug = (req.status || "pending").toLowerCase().replace(/\s+/g, "-");
      const dateFormatted = new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + 
        ", " + new Date(req.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' });

      return `
        <tr class="request-row" data-ticket="${req.ticketId}">
          <td class="ticket-cell">
            <span class="comic-ticket-badge">${req.ticketId}</span>
          </td>
          <td class="cat-cell">
            <span class="category-chip cat-${req.category.toLowerCase()}">${req.category}</span>
          </td>
          <td class="loc-cell">
            <span class="truncate-cell" title="${escapeHTML(req.location)}">📍 ${escapeHTML(req.location)}</span>
          </td>
          <td class="urgency-cell">
            <span class="urgency-pill urgency-${urgencySlug}">${req.urgency}</span>
          </td>
          <td class="hero-assigned-cell">
            <span class="assigned-hero-badge">🦸 ${escapeHTML(req.assignedHero || req.preferredHero)}</span>
          </td>
          <td class="status-cell">
            <span class="status-chip status-${statusSlug}">
              <span class="status-dot"></span>
              ${req.status}
            </span>
          </td>
          <td class="time-cell">${dateFormatted}</td>
          <td class="action-cell">
            <button class="btn btn-danger-outline btn-xs" onclick="handleCancelRequest('${req.ticketId}')" title="Cancel distress call">
              Withdraw
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  // Expose delete handler globally
  window.handleCancelRequest = function(ticketId) {
    if (confirm(`Are you sure you wish to withdraw emergency dispatch for ticket #${ticketId}?`)) {
      deleteRequest(ticketId);
      renderMyRequests();
      showToast(`Ticket #${ticketId} withdrawn from emergency queue.`, "info");
    }
  };

  /**
   * Display comic confirmation popup with ticket details
   */
  function showConfirmationModal(ticket) {
    if (!confirmationModal) return;

    document.getElementById("modalTicketId").textContent = `#${ticket.ticketId}`;
    document.getElementById("modalHeroName").textContent = ticket.preferredHero;
    document.getElementById("modalLocation").textContent = ticket.location;
    document.getElementById("modalUrgency").textContent = ticket.urgency;
    document.getElementById("modalUrgency").className = `urgency-pill urgency-${ticket.urgency.toLowerCase()}`;

    confirmationModal.classList.add("is-open");
  }
}

/**
 * Validation rules and error messages
 */
const VALIDATORS = {
  fullName: (val) => {
    if (!val || val.trim().length < 2) return "Full name is required (minimum 2 characters).";
    return "";
  },
  contactNumber: (val) => {
    if (!val || !val.trim()) return "Emergency contact phone number is required.";
    // Basic international / local phone regex (digits, optional +, hyphens, parens, spaces, min 7 digits)
    const digitsOnly = val.replace(/\D/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return "Please enter a valid phone number (7-15 digits).";
    }
    return "";
  },
  email: (val) => {
    if (!val || !val.trim()) return "Email address is required.";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(val.trim())) {
      return "Please enter a valid email address (e.g., citizen@example.com).";
    }
    return "";
  },
  location: (val) => {
    if (!val || val.trim().length < 3) return "Incident location/landmark is required.";
    return "";
  },
  category: (val) => {
    if (!val) return "Please select an emergency category.";
    return "";
  },
  description: (val) => {
    if (!val || val.trim().length < 10) return "Please provide at least 10 characters detailing the incident.";
    return "";
  }
};

/**
 * Setup inline blur validation on form inputs
 */
function setupInputValidation(form) {
  Object.keys(VALIDATORS).forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (!input) return;

    input.addEventListener("blur", () => {
      validateSingleField(input, VALIDATORS[fieldId]);
    });

    input.addEventListener("input", () => {
      // Clear error as user types once it was invalid
      if (input.classList.contains("is-invalid")) {
        validateSingleField(input, VALIDATORS[fieldId]);
      }
    });
  });
}

/**
 * Validate a single field and toggle error message
 */
function validateSingleField(input, validatorFn) {
  const errorElement = document.getElementById(`${input.id}Error`);
  const errorMsg = validatorFn(input.value);

  if (errorMsg) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    if (errorElement) {
      errorElement.textContent = errorMsg;
      errorElement.style.display = "block";
    }
    return false;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
    return true;
  }
}

/**
 * Validate entire form on submit
 */
function validateFullForm(form) {
  let isValid = true;
  let firstInvalid = null;

  Object.keys(VALIDATORS).forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (input) {
      const fieldValid = validateSingleField(input, VALIDATORS[fieldId]);
      if (!fieldValid) {
        isValid = false;
        if (!firstInvalid) firstInvalid = input;
      }
    }
  });

  if (firstInvalid) {
    firstInvalid.focus();
  }

  return isValid;
}

/**
 * Clear validation classes and messages
 */
function clearValidationErrors(form) {
  form.querySelectorAll(".is-invalid, .is-valid").forEach(el => {
    el.classList.remove("is-invalid", "is-valid");
  });
  form.querySelectorAll(".field-error").forEach(el => {
    el.textContent = "";
    el.style.display = "none";
  });
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
