/**
 * Superhero Help Portal - Hero Detail View Module
 * Renders hero dossier, animated comic power stat bars, tactical specifications,
 * and passes the hero to the emergency request dispatcher.
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeroDetailPage();
});

function initHeroDetailPage() {
  const container = document.getElementById("heroDetailContainer");
  if (!container) return;

  // Extract hero id from URL
  const urlParams = new URLSearchParams(window.location.search);
  let heroId = urlParams.get("id");

  let hero = getHeroById(heroId);

  // Fallback to first hero if id not found
  if (!hero) {
    const all = getAllHeroes();
    hero = all[0];
  }

  // Update document title
  document.title = `${hero.alias} | Aegis Hero Dossier`;

  renderHeroDetail(hero, container);
}

function renderHeroDetail(hero, container) {
  const statusSlug = hero.status.toLowerCase().replace(/\s+/g, "-");
  const requestUrl = `report.html?hero=${encodeURIComponent(hero.alias)}`;

  // Render detail view
  container.innerHTML = `
    <div class="dossier-wrapper">
      <!-- Breadcrumb navigation -->
      <nav class="dossier-nav" aria-label="Breadcrumb">
        <a href="heroes.html" class="back-link">← Back to Hero Roster</a>
        <span class="dossier-id-tag">SECURITY CLEARANCE: TOP SECRET // DOSSIER #${hero.id.toUpperCase()}</span>
      </nav>

      <div class="dossier-grid">
        <!-- Left Column: Hero Visual & Key Tags -->
        <div class="dossier-visual-panel" style="border-top-color: ${hero.color};">
          <div class="dossier-avatar-box" style="background: ${hero.avatarBg};">
            ${hero.avatarIcon}
            <div class="dossier-status-pill status-${statusSlug}">
              <span class="status-dot"></span> ${hero.status}
            </div>
          </div>

          <div class="dossier-meta-card">
            <h2 class="dossier-alias">${escapeHTML(hero.alias)}</h2>
            <p class="dossier-realname">Real Name: <strong>${escapeHTML(hero.name)}</strong></p>
            <p class="dossier-tagline">“${escapeHTML(hero.tagline)}”</p>

            <div class="dossier-spec-list">
              <div class="spec-item">
                <span class="spec-label">Assigned Sector:</span>
                <span class="spec-value">📍 ${escapeHTML(hero.city)}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Avg. Response Time:</span>
                <span class="spec-value">⚡ ${escapeHTML(hero.responseTime)}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Missions Completed:</span>
                <span class="spec-value">🏆 ${hero.missionsCompleted} Successful Deployments</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Threat Classification:</span>
                <span class="spec-value">🛡️ ${escapeHTML(hero.threatHandling)}</span>
              </div>
            </div>

            <div class="dossier-cta-box">
              <a href="${requestUrl}" class="btn btn-primary btn-block btn-lg pulse-glow">
                🚨 Request ${escapeHTML(hero.alias)}
              </a>
              <p class="dossier-cta-note">Direct dispatch ticket will be automatically linked to this operative.</p>
            </div>
          </div>
        </div>

        <!-- Right Column: Biography, Powers, and Stats Bars -->
        <div class="dossier-info-panel">
          <!-- Power Overview -->
          <section class="dossier-section">
            <div class="section-badge-header">
              <span class="comic-badge">CORE ABILITIES</span>
              <h3 class="section-title">${escapeHTML(hero.power)}</h3>
            </div>
            <p class="dossier-bio-text">${escapeHTML(hero.bio)}</p>
          </section>

          <!-- Power Stat Bar Chart -->
          <section class="dossier-section">
            <div class="section-badge-header">
              <span class="comic-badge badge-alt">TACTICAL ATTRIBUTES</span>
              <h3 class="section-title">Combat & Defense Metrics</h3>
            </div>

            <div class="stat-bars-container">
              <!-- Strength -->
              <div class="stat-bar-group">
                <div class="stat-bar-header">
                  <span class="stat-name">💥 Physical Strength & Kinetic Impact</span>
                  <span class="stat-value">${hero.stats.strength}% (Rank ${getStatRank(hero.stats.strength)})</span>
                </div>
                <div class="stat-track">
                  <div class="stat-fill stat-strength" style="width: 0%;" data-width="${hero.stats.strength}%"></div>
                </div>
              </div>

              <!-- Speed -->
              <div class="stat-bar-group">
                <div class="stat-bar-header">
                  <span class="stat-name">⚡ Hypersonic Velocity & Reflexes</span>
                  <span class="stat-value">${hero.stats.speed}% (Rank ${getStatRank(hero.stats.speed)})</span>
                </div>
                <div class="stat-track">
                  <div class="stat-fill stat-speed" style="width: 0%;" data-width="${hero.stats.speed}%"></div>
                </div>
              </div>

              <!-- Durability -->
              <div class="stat-bar-group">
                <div class="stat-bar-header">
                  <span class="stat-name">🛡️ Invulnerability & Shield Durability</span>
                  <span class="stat-value">${hero.stats.durability}% (Rank ${getStatRank(hero.stats.durability)})</span>
                </div>
                <div class="stat-track">
                  <div class="stat-fill stat-durability" style="width: 0%;" data-width="${hero.stats.durability}%"></div>
                </div>
              </div>

              <!-- Tactical IQ -->
              <div class="stat-bar-group">
                <div class="stat-bar-header">
                  <span class="stat-name">🧠 Tactical IQ & Crisis Resolution</span>
                  <span class="stat-value">${hero.stats.tacticalIq}% (Rank ${getStatRank(hero.stats.tacticalIq)})</span>
                </div>
                <div class="stat-track">
                  <div class="stat-fill stat-iq" style="width: 0%;" data-width="${hero.stats.tacticalIq}%"></div>
                </div>
              </div>
            </div>
          </section>

          <!-- Equipment & Technology -->
          <section class="dossier-section">
            <div class="section-badge-header">
              <span class="comic-badge">TACTICAL GEAR</span>
              <h3 class="section-title">Standard Issue Arsenal</h3>
            </div>
            <div class="gear-tags">
              ${hero.equipment.split(',').map(item => `
                <span class="gear-chip">⚙️ ${escapeHTML(item.trim())}</span>
              `).join('')}
            </div>
          </section>

          <!-- Other Operatives Carousel / Quick Switcher -->
          <section class="dossier-section other-heroes-section">
            <h4 class="other-heroes-title">Explore Other Registered Operatives</h4>
            <div class="other-heroes-list">
              ${getAllHeroes().filter(h => h.id !== hero.id).slice(0, 4).map(other => `
                <a href="hero-detail.html?id=${other.id}" class="other-hero-pill" title="View ${other.alias}">
                  <span class="other-hero-avatar">${other.avatarIcon}</span>
                  <div class="other-hero-info">
                    <span class="other-name">${escapeHTML(other.alias)}</span>
                    <span class="other-city">${escapeHTML(other.city)}</span>
                  </div>
                </a>
              `).join('')}
            </div>
          </section>
        </div>
      </div>
    </div>
  `;

  // Animate stat bars smoothly on entry
  setTimeout(() => {
    const bars = container.querySelectorAll(".stat-fill");
    bars.forEach(bar => {
      bar.style.width = bar.getAttribute("data-width");
    });
  }, 100);
}

function getStatRank(val) {
  if (val >= 95) return "S+ (God-Tier)";
  if (val >= 85) return "S (Supreme)";
  if (val >= 75) return "A (Advanced)";
  return "B (Standard)";
}
