/**
 * Superhero Help Portal - Storage Layer
 * Manages localStorage persistence for emergency help requests,
 * status updates, metric aggregations, and mock demo data.
 */

const STORAGE_KEY_REQUESTS = "superhero_portal_help_requests";

// Initial seed requests to ensure Admin & My Requests views have realistic data on initial load
const SEED_REQUESTS = [
  {
    ticketId: "HERO-4821-A",
    fullName: "Chief Marcus Brody",
    contactNumber: "+1-555-019-2834",
    email: "brody.m@metrocivic.org",
    location: "Metropolis Core - 5th Ave Suspension Bridge",
    category: "Disaster",
    urgency: "High",
    description: "Structural cable rupture following sudden seismic tremor. Multiple commuter vehicles stranded on central span.",
    preferredHero: "Titan Vanguard",
    status: "Pending", // "Pending" | "In Progress" | "Resolved"
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 mins ago
    assignedHero: "Titan Vanguard"
  },
  {
    ticketId: "HERO-9204-B",
    fullName: "Dr. Sarah Jenkins",
    contactNumber: "+1-555-014-9981",
    email: "s.jenkins@biolab.corp",
    location: "Neo-Tokyo Sector - Sub-Level 4 Research Lab",
    category: "Other",
    urgency: "High",
    description: "Cryogenic containment unit failure in high-containment biohazard chamber. Risk of atmospheric release.",
    preferredHero: "Glacier Queen",
    status: "In Progress",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    assignedHero: "Glacier Queen"
  },
  {
    ticketId: "HERO-3319-C",
    fullName: "Officer Ray Castillo",
    contactNumber: "+1-555-017-4322",
    email: "rcastillo@starlingpd.gov",
    location: "Starling Bay - Harbor Warehouse 12",
    category: "Crime",
    urgency: "Medium",
    description: "Armed syndicate breach intercepted. Hostages safely extracted to dockside perimeter; scene secured.",
    preferredHero: "Shadow Phantom",
    status: "Resolved",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    assignedHero: "Shadow Phantom"
  },
  {
    ticketId: "HERO-1087-D",
    fullName: "Amanda Vance",
    contactNumber: "+1-555-012-7744",
    email: "amanda.v@coastsun.net",
    location: "Coast City - Marina District Wharf",
    category: "Rescue",
    urgency: "Low",
    description: "Civilian pleasure craft stranded in deep channel during sudden offshore gale. Tow assistance dispatched.",
    preferredHero: "Solaris Prime",
    status: "Resolved",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    assignedHero: "Solaris Prime"
  }
];

/**
 * Generates a unique comic-style ticket ID (e.g., HERO-7492-X).
 */
function generateTicketId() {
  const num = Math.floor(1000 + Math.random() * 9000);
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const letter = chars.charAt(Math.floor(Math.random() * chars.length));
  return `HERO-${num}-${letter}`;
}

/**
 * Initializes storage with seed data if currently empty.
 */
function initStorage() {
  const existing = localStorage.getItem(STORAGE_KEY_REQUESTS);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(SEED_REQUESTS));
  }
}

/**
 * Retrieve all requests from localStorage.
 * @returns {Array} Array of request objects
 */
function getRequests() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REQUESTS);
    if (!raw) {
      initStorage();
      return JSON.parse(localStorage.getItem(STORAGE_KEY_REQUESTS)) || [];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read requests from localStorage", err);
    return [];
  }
}

/**
 * Save a new help request to localStorage.
 * @param {Object} requestData
 * @returns {Object} Newly created request with ticketId & metadata
 */
function saveRequest(requestData) {
  const requests = getRequests();
  const newRequest = {
    ticketId: generateTicketId(),
    fullName: requestData.fullName.trim(),
    contactNumber: requestData.contactNumber.trim(),
    email: requestData.email.trim().toLowerCase(),
    location: requestData.location.trim(),
    category: requestData.category,
    urgency: requestData.urgency || "Medium",
    description: requestData.description.trim(),
    preferredHero: requestData.preferredHero || "Any Available Hero",
    status: "Pending",
    createdAt: new Date().toISOString(),
    assignedHero: requestData.preferredHero && requestData.preferredHero !== "Any Available Hero"
      ? requestData.preferredHero
      : "Hero Auto-Dispatching"
  };

  requests.unshift(newRequest);
  localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(requests));
  return newRequest;
}

/**
 * Update request status (e.g., "Pending" <-> "Resolved" or "In Progress").
 * @param {string} ticketId
 * @param {string} newStatus
 * @returns {boolean} True if updated successfully
 */
function updateRequestStatus(ticketId, newStatus) {
  const requests = getRequests();
  const index = requests.findIndex(r => r.ticketId === ticketId);
  if (index !== -1) {
    requests[index].status = newStatus;
    if (newStatus === "Resolved") {
      requests[index].resolvedAt = new Date().toISOString();
    }
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(requests));
    return true;
  }
  return false;
}

/**
 * Delete a request by ticket ID.
 * @param {string} ticketId
 */
function deleteRequest(ticketId) {
  const requests = getRequests();
  const filtered = requests.filter(r => r.ticketId !== ticketId);
  localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(filtered));
  return true;
}

/**
 * Calculate request counts for admin KPI dashboard.
 */
function getRequestStats() {
  const requests = getRequests();
  const total = requests.length;
  const pending = requests.filter(r => r.status === "Pending").length;
  const inProgress = requests.filter(r => r.status === "In Progress").length;
  const resolved = requests.filter(r => r.status === "Resolved").length;
  return { total, pending, inProgress, resolved };
}

/**
 * Resets localStorage back to the default seed dataset.
 */
function resetMockRequests() {
  localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(SEED_REQUESTS));
  return SEED_REQUESTS;
}

// Ensure storage is initialized on script evaluation
initStorage();
