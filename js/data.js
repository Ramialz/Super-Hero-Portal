/**
 * Superhero Help Portal - Core Hero Dataset
 * Contains profiles, powers, stats, locations, availability status, and vector avatars.
 */

const HEROES_DATA = [
  {
    id: "titan-vanguard",
    name: "Marcus Vance",
    alias: "Titan Vanguard",
    power: "Superhuman Strength & Kinetic Impact",
    city: "Gotham Heights",
    status: "Available", // "Available" | "On Mission" | "Off Duty"
    stats: {
      strength: 98,
      speed: 65,
      durability: 96,
      tacticalIq: 84
    },
    threatHandling: "Level 5 (Extinction Prevention)",
    missionsCompleted: 342,
    responseTime: "3.2 min",
    tagline: "The Unstoppable Kinetic Shield of Gotham Heights",
    bio: "A former aerospace materials engineer who underwent molecular bonding with a quantum stabilizer. Titan Vanguard can lift 80-ton freight trains, withstand sustained anti-matter artillery, and emit kinetic shockwaves to disperse falling debris and stabilize collapsing skyscrapers.",
    equipment: "Reinforced Vibranium Exoskeleton, Micro-Thruster Soles, Seismic Dampener",
    color: "#d90429",
    avatarBg: "#ffe3e3",
    avatarIcon: `<svg viewBox="0 0 100 100" class="hero-svg">
      <circle cx="50" cy="50" r="46" fill="#d90429" stroke="#111827" stroke-width="4"/>
      <!-- Fist / Shield glyph -->
      <path d="M50 18 L76 30 C76 60 62 76 50 82 C38 76 24 60 24 30 Z" fill="#ffb703" stroke="#111827" stroke-width="3.5"/>
      <path d="M42 38 L50 32 L58 38 L58 52 L50 58 L42 52 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5"/>
      <circle cx="50" cy="45" r="4" fill="#d90429"/>
    </svg>`
  },
  {
    id: "aero-strike",
    name: "Elena Rossi",
    alias: "Aero Strike",
    power: "Hypersonic Flight & Sonic Blasts",
    city: "Metropolis Core",
    status: "Available",
    stats: {
      strength: 72,
      speed: 99,
      durability: 74,
      tacticalIq: 89
    },
    threatHandling: "Level 4 (Rapid Aerial Intercept)",
    missionsCompleted: 418,
    responseTime: "1.8 min",
    tagline: "Faster Than the Thunder That Follows",
    bio: "Holder of multiple military hypersonic records, Elena commands aerodynamic compression fields. She breaks Mach 5 effortlessly, deploying non-lethal acoustic disruptors to disarm hostile strikes and rescue airborne passengers from free-falling aircraft.",
    equipment: "Aero-Dynamic Visor HUD, Sonic Compression Gauntlets, Winglet Stabilizers",
    color: "#0077b6",
    avatarBg: "#caf0f8",
    avatarIcon: `<svg viewBox="0 0 100 100" class="hero-svg">
      <circle cx="50" cy="50" r="46" fill="#0077b6" stroke="#111827" stroke-width="4"/>
      <!-- Wing / Bolt glyph -->
      <path d="M22 62 L46 22 L40 44 L78 28 L48 76 L52 54 Z" fill="#ffb703" stroke="#111827" stroke-width="3.5" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: "solaris-prime",
    name: "Kaelen Thorne",
    alias: "Solaris Prime",
    power: "Solar Radiation & Thermal Forcefields",
    city: "Coast City",
    status: "Available",
    stats: {
      strength: 88,
      speed: 84,
      durability: 92,
      tacticalIq: 91
    },
    threatHandling: "Level 5 (Stellar Hazard Containment)",
    missionsCompleted: 512,
    responseTime: "2.4 min",
    tagline: "Where Shadows Fall, Solaris Stands",
    bio: "Harnessing ambient solar flares, Solaris Prime can project thermonuclear barriers capable of shielding entire municipal grids from volcanic fallout, meteor storms, and electromagnetic blackouts while emitting restorative phototherapy.",
    equipment: "Solar Conduit Bracers, Luminescent Nanofiber Cape",
    color: "#fb8500",
    avatarBg: "#ffedd5",
    avatarIcon: `<svg viewBox="0 0 100 100" class="hero-svg">
      <circle cx="50" cy="50" r="46" fill="#fb8500" stroke="#111827" stroke-width="4"/>
      <!-- Sun burst glyph -->
      <circle cx="50" cy="50" r="18" fill="#ffd166" stroke="#111827" stroke-width="3"/>
      <path d="M50 14 L50 24 M50 76 L50 86 M14 50 L24 50 M76 50 L86 50 M24 24 L32 32 M68 68 L76 76 M24 76 L32 68 M68 32 L76 24" stroke="#111827" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "shadow-phantom",
    name: "Rook Mercer",
    alias: "Shadow Phantom",
    power: "Shadow Step & Phase Teleportation",
    city: "Starling Bay",
    status: "Available",
    stats: {
      strength: 68,
      speed: 94,
      durability: 68,
      tacticalIq: 97
    },
    threatHandling: "Level 4 (Infiltration & Hostage Extraction)",
    missionsCompleted: 289,
    responseTime: "2.1 min",
    tagline: "The Unseen Sentinel of the Night",
    bio: "Operating in the interstitial dark matter spectrum, Shadow Phantom passes through solid vaults and slips behind enemy lines. He specializes in hostage extraction from high-security collapse zones and neutralizing hazardous black-market bio-weapons.",
    equipment: "Phase-Shift Daggers, Camouflage Shroud, Echo-Goggles",
    color: "#6a0dad",
    avatarBg: "#f3e8ff",
    avatarIcon: `<svg viewBox="0 0 100 100" class="hero-svg">
      <circle cx="50" cy="50" r="46" fill="#4a0e78" stroke="#111827" stroke-width="4"/>
      <!-- Mask / Moon glyph -->
      <path d="M50 20 C66 20 80 34 80 50 C80 66 66 80 50 80 C60 72 64 58 64 50 C64 42 60 28 50 20 Z" fill="#ffb703" stroke="#111827" stroke-width="3"/>
      <circle cx="38" cy="46" r="6" fill="#ffffff" stroke="#111827" stroke-width="2.5"/>
      <path d="M30 62 Q45 74 60 62" stroke="#111827" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "volt-tempest",
    name: "Zara Okonjo",
    alias: "Volt Tempest",
    power: "Electrokinesis & Maglev Manipulation",
    city: "Keystone Sector",
    status: "On Mission",
    stats: {
      strength: 76,
      speed: 95,
      durability: 80,
      tacticalIq: 86
    },
    threatHandling: "Level 4 (Electrical & Grid Disaster Response)",
    missionsCompleted: 367,
    responseTime: "2.0 min",
    tagline: "Pure Energy. Absolute Surge Control.",
    bio: "An electromagnetic physicist who can absorb and redirect gigawatt energy loads. Currently active in Keystone Sector stabilizing a compromised nuclear transformer and clearing magnetic derailment tracks.",
    equipment: "Capacitor Rings, High-Amp Discharge Conduit, Maglev Hoverpack",
    color: "#0284c7",
    avatarBg: "#e0f2fe",
    avatarIcon: `<svg viewBox="0 0 100 100" class="hero-svg">
      <circle cx="50" cy="50" r="46" fill="#0284c7" stroke="#111827" stroke-width="4"/>
      <!-- Double lightning glyph -->
      <polygon points="56,16 32,50 48,50 40,84 68,46 50,46" fill="#ffd166" stroke="#111827" stroke-width="3.5" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: "glacier-queen",
    name: "Astrid Lindholm",
    alias: "Glacier Queen",
    power: "Cryokinesis & Thermal Absorption",
    city: "Arctic Enclave",
    status: "Off Duty",
    stats: {
      strength: 82,
      speed: 70,
      durability: 90,
      tacticalIq: 88
    },
    threatHandling: "Level 4 (Inferno & Chemical Blast Suppression)",
    missionsCompleted: 254,
    responseTime: "4.5 min",
    tagline: "Absolute Zero in the Face of Peril",
    bio: "Manipulates thermodynamic enthalpy to instantaneously drop ambient temperatures to sub-zero levels. Renowned for freezing chemical refinery blazes, stemming toxic radioactive leaks, and erecting crystalline ice ramps across collapsed ravines.",
    equipment: "Sub-Zero Cryo-Glaive, Frost-Weave Armor",
    color: "#0ea5e9",
    avatarBg: "#f0f9ff",
    avatarIcon: `<svg viewBox="0 0 100 100" class="hero-svg">
      <circle cx="50" cy="50" r="46" fill="#38bdf8" stroke="#111827" stroke-width="4"/>
      <!-- Snowflake crystal glyph -->
      <path d="M50 18 L50 82 M18 50 L82 50 M28 28 L72 72 M28 72 L72 28" stroke="#111827" stroke-width="4" stroke-linecap="round"/>
      <circle cx="50" cy="50" r="9" fill="#ffffff" stroke="#111827" stroke-width="2.5"/>
      <polygon points="50,22 45,28 55,28" fill="#ffffff"/>
      <polygon points="50,78 45,72 55,72" fill="#ffffff"/>
      <polygon points="22,50 28,45 28,55" fill="#ffffff"/>
      <polygon points="78,50 72,45 72,55" fill="#ffffff"/>
    </svg>`
  },
  {
    id: "cyber-sentinel",
    name: "Unit Zero / Dr. Kenji Sato",
    alias: "Cyber Sentinel",
    power: "Technopathy & Quantum Defense Shielding",
    city: "Neo-Tokyo Sector",
    status: "Available",
    stats: {
      strength: 74,
      speed: 82,
      durability: 88,
      tacticalIq: 100
    },
    threatHandling: "Level 5 (Global Cyberwarfare & AI Containment)",
    missionsCompleted: 490,
    responseTime: "0.9 min",
    tagline: "The Digital Bastion of Humanity",
    bio: "A cybernetically enhanced intelligence operating both in physical armor and the global neural grid. Specializes in disarming automated military drone swarms, neutralizing cyber attacks on power plants, and deciphering alien communication signals.",
    equipment: "Quantum Cyberdeck, Optical Projection Drone, Kinetic EMP emitter",
    color: "#059669",
    avatarBg: "#ecfdf5",
    avatarIcon: `<svg viewBox="0 0 100 100" class="hero-svg">
      <circle cx="50" cy="50" r="46" fill="#059669" stroke="#111827" stroke-width="4"/>
      <!-- Digital node / shield glyph -->
      <rect x="28" y="28" width="44" height="44" rx="8" fill="#ffffff" stroke="#111827" stroke-width="3.5"/>
      <circle cx="50" cy="50" r="12" fill="#059669" stroke="#111827" stroke-width="2.5"/>
      <path d="M50 20 L50 28 M50 72 L50 80 M20 50 L28 50 M72 50 L80 50" stroke="#ffb703" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "emerald-drake",
    name: "Damian Vance",
    alias: "Emerald Drake",
    power: "Draconic Armor & Mystic Energy Constructs",
    city: "Starling Bay",
    status: "On Mission",
    stats: {
      strength: 94,
      speed: 78,
      durability: 92,
      tacticalIq: 85
    },
    threatHandling: "Level 5 (Kaiju & Mystic Incursions)",
    missionsCompleted: 315,
    responseTime: "3.1 min",
    tagline: "Ancient Draconic Fire in the Modern World",
    bio: "Heir to an ancient order of astral wardens, Damian summons jade energy constructs, impenetrable dragon scale defenses, and draconic flame projection. Currently deployed offshore repelling a deep-sea leviathan breach.",
    equipment: "Jade Drake Talisman, Wyrmscale Vambraces",
    color: "#15803d",
    avatarBg: "#dcfce7",
    avatarIcon: `<svg viewBox="0 0 100 100" class="hero-svg">
      <circle cx="50" cy="50" r="46" fill="#15803d" stroke="#111827" stroke-width="4"/>
      <!-- Dragon crest glyph -->
      <path d="M50 18 C30 28 26 48 34 72 C42 66 50 62 50 62 C50 62 58 66 66 72 C74 48 70 28 50 18 Z" fill="#ffd166" stroke="#111827" stroke-width="3.5"/>
      <circle cx="44" cy="40" r="3" fill="#111827"/>
      <circle cx="56" cy="40" r="3" fill="#111827"/>
    </svg>`
  },
  {
    id: "pulse-healer",
    name: "Dr. Maya Lin",
    alias: "Pulse Healer",
    power: "Bio-Cellular Regeneration & Force Conduits",
    city: "Metropolis Core",
    status: "Available",
    stats: {
      strength: 62,
      speed: 76,
      durability: 84,
      tacticalIq: 98
    },
    threatHandling: "Level 4 (Mass Casualty & Biohazard Triage)",
    missionsCompleted: 620,
    responseTime: "1.5 min",
    tagline: "Every Heartbeat Can Be Preserved",
    bio: "Emergency chief trauma specialist endowed with cellular biokinesis. Dr. Lin creates restorative bio-spheres that halt life-threatening hemorrhages in seconds, purify toxic biohazards, and fortify first-responder teams under collapse zones.",
    equipment: "Vitality Scanner HUD, Bio-Force Field Generator, Trauma Vials",
    color: "#e11d48",
    avatarBg: "#ffe4e6",
    avatarIcon: `<svg viewBox="0 0 100 100" class="hero-svg">
      <circle cx="50" cy="50" r="46" fill="#e11d48" stroke="#111827" stroke-width="4"/>
      <!-- Medical cross & heart glyph -->
      <path d="M42 22 H58 V42 H78 V58 H58 V78 H42 V58 H22 V42 H42 Z" fill="#ffffff" stroke="#111827" stroke-width="3.5" stroke-linejoin="round"/>
      <circle cx="50" cy="50" r="6" fill="#ffb703"/>
    </svg>`
  }
];

/**
 * Returns all heroes in the dataset.
 */
function getAllHeroes() {
  return HEROES_DATA;
}

/**
 * Find hero by ID.
 * @param {string} id
 */
function getHeroById(id) {
  if (!id) return null;
  return HEROES_DATA.find(h => h.id.toLowerCase() === id.toLowerCase()) || null;
}

/**
 * Get distinct list of cities.
 */
function getUniqueCities() {
  const cities = HEROES_DATA.map(h => h.city);
  return ["All Cities", ...new Set(cities)];
}

/**
 * Get distinct list of statuses.
 */
function getUniqueStatuses() {
  return ["All Statuses", "Available", "On Mission", "Off Duty"];
}

/**
 * Global HTML escaping utility for XSS safety
 * @param {string} str
 */
function escapeHTML(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

