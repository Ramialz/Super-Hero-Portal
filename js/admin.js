/**
 * Superhero Help Portal - Admin Command Dashboard Module
 * Handles dispatcher queue overview, real-time KPI metric counts,
 * status transitions (Pending <-> Resolved), request filtering, and demo data reset.
 */

document.addEventListener("DOMContentLoaded", () => {
  initAdminDashboard();
});

function initAdminDashboard() {
  const adminTableBody = document.getElementById("adminTableBody");
  const adminSearch = document.getElementById("adminSearch");
  const filterBtns = document.querySelectorAll(".admin-filter-btn");
  const resetDemoBtn = document.getElementById("resetDemoDataBtn");

  let currentStatusFilter = "all";

  // Initial render
  updateDashboard();

  // Search input filter
  if (adminSearch) {
    adminSearch.addEventListener("input", () => {
      renderRequestsTable();
    });
  }

  // Filter button clicks
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentStatusFilter = btn.getAttribute("data-status");
      renderRequestsTable();
    });
  });

  // Reset demo data button
  if (resetDemoBtn) {
    resetDemoBtn.addEventListener("click", () => {
      if (confirm("Reset emergency requests back to default seed data?")) {
        resetMockRequests();
        updateDashboard();
        showToast("Emergency dispatch queue reset to default simulation data.", "info");
      }
    });
  }

  /**
   * Updates KPI summary numbers and refreshes table
   */
  function updateDashboard() {
    renderKPIs();
    renderRequestsTable();
  }

  /**
   * Render top stat counter cards
   */
  function renderKPIs() {
    const stats = getRequestStats();
    const elTotal = document.getElementById("statTotalCount");
    const elPending = document.getElementById("statPendingCount");
    const elResolved = document.getElementById("statResolvedCount");

    if (elTotal) elTotal.textContent = stats.total;
    if (elPending) elPending.textContent = stats.pending;
    if (elResolved) elResolved.textContent = stats.resolved;
  }

  /**
   * Filter and render admin table rows
   */
  function renderRequestsTable() {
    if (!adminTableBody) return;

    const searchTerm = (adminSearch ? adminSearch.value : "").trim().toLowerCase();
    const allRequests = getRequests();

    const filtered = allRequests.filter(req => {
      // Status filter
      const matchesStatus = currentStatusFilter === "all" || 
        req.status.toLowerCase().replace(/\s+/g, "") === currentStatusFilter.toLowerCase().replace(/\s+/g, "");

      // Search match
      const matchesSearch = !searchTerm ||
        req.ticketId.toLowerCase().includes(searchTerm) ||
        req.fullName.toLowerCase().includes(searchTerm) ||
        req.location.toLowerCase().includes(searchTerm) ||
        req.category.toLowerCase().includes(searchTerm) ||
        (req.preferredHero && req.preferredHero.toLowerCase().includes(searchTerm));

      return matchesStatus && matchesSearch;
    });

    if (filtered.length === 0) {
      adminTableBody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-5">
            <div class="empty-admin-state">
              <span class="empty-icon">🛡️</span>
              <p>No incidents match the selected filter or search term.</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    adminTableBody.innerHTML = filtered.map(req => {
      const urgencySlug = (req.urgency || "medium").toLowerCase();
      const statusSlug = (req.status || "pending").toLowerCase().replace(/\s+/g, "-");
      const isResolved = req.status === "Resolved";
      const dateFormatted = new Date(req.createdAt).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      return `
        <tr class="admin-row ${isResolved ? 'is-resolved-row' : ''}">
          <td class="admin-ticket-col">
            <strong class="comic-ticket-badge">${req.ticketId}</strong>
          </td>
          <td>
            <div class="citizen-info">
              <strong class="citizen-name">${escapeHTML(req.fullName)}</strong>
              <small class="citizen-contact">${escapeHTML(req.contactNumber)}</small>
            </div>
          </td>
          <td>
            <span class="location-text" title="${escapeHTML(req.location)}">📍 ${escapeHTML(req.location)}</span>
          </td>
          <td>
            <span class="category-chip cat-${req.category.toLowerCase()}">${req.category}</span>
          </td>
          <td>
            <span class="urgency-pill urgency-${urgencySlug}">${req.urgency}</span>
          </td>
          <td>
            <span class="status-chip status-${statusSlug}">
              <span class="status-dot"></span>
              ${req.status}
            </span>
          </td>
          <td class="text-muted"><small>${dateFormatted}</small></td>
          <td class="admin-actions-col">
            ${isResolved ? `
              <button class="btn btn-secondary btn-xs" onclick="handleToggleStatus('${req.ticketId}', 'Pending')">
                ↩️ Mark Pending
              </button>
            ` : `
              <button class="btn btn-success btn-xs" onclick="handleToggleStatus('${req.ticketId}', 'Resolved')">
                ✓ Mark Resolved
              </button>
            `}
            <button class="btn btn-danger-outline btn-xs" onclick="handleDeleteAdminRequest('${req.ticketId}')" title="Delete request">
              ✕
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  // Global toggle status handler
  window.handleToggleStatus = function(ticketId, newStatus) {
    const success = updateRequestStatus(ticketId, newStatus);
    if (success) {
      updateDashboard();
      showToast(`Ticket #${ticketId} updated to [${newStatus}]`, "success");
    }
  };

  // Global delete handler
  window.handleDeleteAdminRequest = function(ticketId) {
    if (confirm(`Permanently remove ticket #${ticketId} from records?`)) {
      deleteRequest(ticketId);
      updateDashboard();
      showToast(`Ticket #${ticketId} purged from dispatch records.`, "info");
    }
  };
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
