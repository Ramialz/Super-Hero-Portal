/**
 * Superhero Help Portal - Global Navigation & Utility Module
 * Handles mobile hamburger drawer, active page detection, accessible keyboard navigation,
 * and dynamic comic toast alerts.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  highlightActiveNavLink();
});

/**
 * Initialize responsive navbar hamburger toggle.
 */
function initNavbar() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");

  if (!hamburgerBtn || !navMenu) return;

  function toggleMenu() {
    const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
    hamburgerBtn.setAttribute("aria-expanded", String(!isExpanded));
    hamburgerBtn.classList.toggle("is-active");
    navMenu.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", !isExpanded);
  }

  function closeMenu() {
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.classList.remove("is-active");
    navMenu.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }

  hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("is-open") && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
      closeMenu();
      hamburgerBtn.focus();
    }
  });

  // Close when clicking nav links on mobile
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        closeMenu();
      }
    });
  });
}

/**
 * Highlight current page in navbar based on URL path.
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    const href = link.getAttribute("href").toLowerCase();
    
    // Check if link matches the current URL
    const isHome = (currentPath.endsWith("/") || currentPath.endsWith("index.html") || currentPath === "") && 
                   (href.endsWith("index.html") || href === "/" || href === "./index.html" || href === "../index.html");
    const isExact = currentPath.includes(href.replace("../", "").replace("./", ""));

    if (isHome || (isExact && !href.includes("index.html"))) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}

/**
 * Global comic toast alert notification.
 * @param {string} message 
 * @param {'success'|'error'|'info'|'warning'} type 
 * @param {number} duration 
 */
function showToast(message, type = "info", duration = 3500) {
  let toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toastContainer";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `comic-toast toast-${type}`;
  toast.setAttribute("role", "alert");
  
  const icon = type === "success" ? "⚡" : type === "error" ? "💥" : "🛡️";
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-msg">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}
