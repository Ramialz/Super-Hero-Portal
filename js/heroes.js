/**
 * Superhero Help Portal - Heroes Roster Module
 * Handles hero card rendering, live keyword searching, city & status filtering,
 * and navigation to detail views.
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeroesPage();
});

function initHeroesPage() {
  const searchInput = document.getElementById("heroSearchInput");
  const cityFilter = document.getElementById("cityFilter");
  const statusFilter = document.getElementById("statusFilter");
  const resetBtn = document.getElementById("resetFiltersBtn");
  const heroesGrid = document.getElementById("heroesGrid");
  const resultsCount = document.getElementById("heroesResultCount");

  if (!heroesGrid) return;

  // Populate city filter dropdown dynamically
  if (cityFilter) {
    const cities = getUniqueCities();
    cityFilter.innerHTML = cities.map(city => 
      `<option value="${city}">${city}</option>`
    ).join("");
  }

  // Initial render
  renderFilteredHeroes();

  // Search input with debounce / instant reaction
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderFilteredHeroes();
    });
  }

  // Filter dropdown changes
  if (cityFilter) {
    cityFilter.addEventListener("change", () => {
      renderFilteredHeroes();
    });
  }

  if (statusFilter) {
    statusFilter.addEventListener("change", () => {
      renderFilteredHeroes();
    });
  }

  // Reset button
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (cityFilter) cityFilter.value = "All Cities";
      if (statusFilter) statusFilter.value = "All Statuses";
      renderFilteredHeroes();
      showToast("Filters reset to default roster view", "info");
    });
  }

  /**
   * Filter and render hero cards
   */
  function renderFilteredHeroes() {
    const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
    const selectedCity = cityFilter ? cityFilter.value : "All Cities";
    const selectedStatus = statusFilter ? statusFilter.value : "All Statuses";

    const allHeroes = getAllHeroes();

    const filtered = allHeroes.filter(hero => {
      // Keyword match on moniker, real name, superpower, or city
      const matchesQuery = !query || 
        hero.alias.toLowerCase().includes(query) ||
        hero.name.toLowerCase().includes(query) ||
        hero.power.toLowerCase().includes(query) ||
        hero.city.toLowerCase().includes(query);

      // City filter
      const matchesCity = selectedCity === "All Cities" || hero.city === selectedCity;

      // Status filter
      const matchesStatus = selectedStatus === "All Statuses" || hero.status === selectedStatus;

      return matchesQuery && matchesCity && matchesStatus;
    });

    // Update count display
    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} of ${allHeroes.length} Heroes`;
    }

    if (filtered.length === 0) {
      heroesGrid.innerHTML = `
        <div class="empty-state-panel">
          <div class="empty-icon">🔍💥</div>
          <h3 class="empty-title">NO HEROES FOUND</h3>
          <p class="empty-desc">No active superheroes match your search criteria. Try modifying your keywords or clearing the filters.</p>
          <button class="btn btn-primary" onclick="document.getElementById('resetFiltersBtn').click()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    // Render cards
    heroesGrid.innerHTML = filtered.map(hero => createHeroCardHTML(hero)).join("");
  }
}

/**
 * Generate HTML string for an individual hero card
 * @param {Object} hero 
 * @returns {string} HTML markup
 */
function createHeroCardHTML(hero) {
  // Status badge class
  const statusSlug = hero.status.toLowerCase().replace(/\s+/g, "-");
  const detailUrl = window.location.pathname.includes("/pages/") 
    ? `hero-detail.html?id=${hero.id}` 
    : `pages/hero-detail.html?id=${hero.id}`;
  const requestUrl = window.location.pathname.includes("/pages/")
    ? `report.html?hero=${encodeURIComponent(hero.alias)}`
    : `pages/report.html?hero=${encodeURIComponent(hero.alias)}`;

  return `
    <article class="hero-card" data-hero-id="${hero.id}">
      <div class="hero-card-banner" style="background: ${hero.avatarBg};">
        <div class="hero-card-avatar">
          ${hero.avatarIcon}
        </div>
        <span class="status-badge status-${statusSlug}" aria-label="Status: ${hero.status}">
          <span class="status-dot"></span>
          ${hero.status}
        </span>
      </div>

      <div class="hero-card-body">
        <div class="hero-card-header">
          <h3 class="hero-alias">${escapeHTML(hero.alias)}</h3>
          <span class="hero-real-name">Codename: ${escapeHTML(hero.name)}</span>
        </div>

        <div class="hero-card-power">
          <span class="power-label">⚡ Superpower:</span>
          <p class="power-text">${escapeHTML(hero.power)}</p>
        </div>

        <div class="hero-meta-row">
          <span class="hero-city-tag">
            <span class="meta-icon">📍</span> ${escapeHTML(hero.city)}
          </span>
          <span class="hero-response-time">
            <span class="meta-icon">⏱️</span> ${escapeHTML(hero.responseTime)}
          </span>
        </div>

        <div class="hero-stats-mini">
          <div class="mini-stat">
            <span class="mini-stat-val">${hero.stats.strength}%</span>
            <span class="mini-stat-lbl">STR</span>
          </div>
          <div class="mini-stat">
            <span class="mini-stat-val">${hero.stats.speed}%</span>
            <span class="mini-stat-lbl">SPD</span>
          </div>
          <div class="mini-stat">
            <span class="mini-stat-val">${hero.stats.durability}%</span>
            <span class="mini-stat-lbl">DUR</span>
          </div>
          <div class="mini-stat">
            <span class="mini-stat-val">${hero.missionsCompleted}</span>
            <span class="mini-stat-lbl">WINS</span>
          </div>
        </div>

        <div class="hero-card-actions">
          <a href="${detailUrl}" class="btn btn-secondary btn-sm" aria-label="View profile of ${hero.alias}">View Profile</a>
          <a href="${requestUrl}" class="btn btn-primary btn-sm" aria-label="Request ${hero.alias}">Request Hero</a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Basic XSS safety utility
 */
function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
