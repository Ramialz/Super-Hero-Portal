# 🦸‍♂️ Aegis Superhero Help Portal

[![Status](https://img.shields.io/badge/Status-Complete-success.svg)](#)
[![Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blue.svg)](#)
[![Storage](https://img.shields.io/badge/Storage-LocalStorage%20Persistent-yellow.svg)](#)
[![Design](https://img.shields.io/badge/Theme-Modern%20Comic%20Pop-critical.svg)](#)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-orange.svg)](#)

A fully responsive, modern, comic-inspired **Superhero Help Portal** (Aegis Hero Network). The application connects civilians in crisis with registered superhuman defenders across metropolitan zones, featuring real-time search and filtering, animated tactical hero dossiers, client-side validated distress transmissions, dynamic ticket tracking, and a dispatcher command dashboard.

---

## ⚡ Live Demo & Hosting Options

This project is 100% static with **zero build dependencies** and can be deployed instantly:

- **GitHub Pages**: Go to **Settings > Pages > Branch: `main` / `root`** and click Save.
- **Vercel**: Run `npx vercel` or import repository to Vercel (Root directory: `./`).
- **Netlify**: Drag & drop the project folder into Netlify Drop or connect GitHub repository (Publish directory: `.`).

---

## 🚀 Features Implemented

### 1. Home Page (`index.html`)
- **Hero Banner**: Bold comic aesthetic with punchy typography, action sunburst graphic, and direct CTAs: *"Find a Hero"* and *"Report an Emergency"*.
- **Live Stats Strip**: Real-time counter cards for Active Operatives (`12+`), Crises Neutralized (`1,482`), Average Response Time (`3.2m`), and Guarded City Sectors (`8`).
- **Mission Protocol**: 3-step comic panel sequence explaining the civilian dispatch lifecycle:
  1. *Report Your Emergency*
  2. *AI Hero Matching*
  3. *Immediate Resolution*
- **Featured Operatives Showcase**: Dynamic preview cards displaying top standby heroes with direct dossier and request actions.
- **Omega Emergency Callout Banner**: High-visibility crisis hotline trigger.

### 2. Heroes Roster Page (`pages/heroes.html`)
- **Interactive Card Grid**: Displays 9 distinct superhero profiles (exceeds minimum of 8), each featuring custom vector illustrations, secret codenames, superpower definitions, operational city zones, and availability status pills.
- **Live Keyword Search**: Instant searching across superhero moniker, civilian name, power description, or city.
- **Dynamic Filters**:
  - Filter by Operational City Zone (*Metropolis Core*, *Gotham Heights*, *Coast City*, *Starling Bay*, *Keystone Sector*, *Arctic Enclave*, *Neo-Tokyo Sector*).
  - Filter by Availability Status (*Available*, *On Mission*, *Off Duty*).
- **Filter Reset & Counter**: One-click reset with live counter badge updating matches in real-time.
- **Empty State**: Comic-styled "No Heroes Found" fallback with quick reset button.

### 3. Hero Tactical Dossier (`pages/hero-detail.html`)
- **Full Dossier Breakdown**: Detailed backstory, secret identity, operational equipment, and threat handling clearance.
- **Animated Power Bar Chart**: Visualized progress bars with smooth fill animations and tactical ranks:
  - 💥 Physical Strength & Kinetic Impact
  - ⚡ Hypersonic Velocity & Reflexes
  - 🛡️ Invulnerability & Shield Durability
  - 🧠 Tactical IQ & Crisis Resolution
- **Missions Completed Counter**: Logged deployment records and tactical statistics.
- **"Request This Hero" CTA**: Automatically routes to the emergency dispatch form, pre-populating the operative into the request.
- **Operative Carousel**: Fast switcher to inspect neighboring superhero dossiers.

### 4. Emergency Distress Form (`pages/report.html`)
- **Form Fields**:
  - *Full Name* (required, minimum 2 characters)
  - *Contact Number* (required, phone number format validation)
  - *Email Address* (required, RFC standard email format validation)
  - *Incident Location / Sector* (required, landmark/street validation)
  - *Issue Category* (Rescue / Crime / Disaster / Other)
  - *Urgency Level Dial* (interactive visual selector: Low, Medium, High, Omega Critical)
  - *Incident Description* (required textarea, minimum 10 characters)
  - *Preferred Hero* (optional, auto-dispatch or hero prefill)
- **Client-Side Validation**:
  - Inline error feedback on field blur and submit.
  - Visual color cues (red invalid borders vs. green valid borders).
- **Confirmation Modal**:
  - Generates unique comic-style ticket IDs (e.g., `#HERO-7492-X`).
  - Displays instant transmission summary card with assigned target and threat level.
- **"My Requests" Live Transponder Table**:
  - Reads directly from `localStorage`.
  - Displays ticket ID, category, location, urgency pill, assigned hero, status badge, and timestamp.
  - Option to withdraw/cancel active distress calls.

### 5. Admin / Dispatcher Command Dashboard (`pages/admin.html`)
- **Real-Time KPI Counters**: Dynamically aggregated cards calculating:
  - Total Signals Logged
  - Pending / Unresolved Incidents
  - Crises Neutralized / Resolved
- **Incident Management Table**:
  - Comprehensive listing of all citizen distress signals.
  - Interactive Action: Toggle status between **"Mark Resolved"** and **"Mark Pending"** directly in the table with instant metric updates.
  - Option to purge/delete records.
- **Table Filters & Search**: Filter by status (*All*, *Pending*, *In Progress*, *Resolved*) or search by citizen name, location, category, or ticket ID.
- **Reset Demo Data**: One-click restore to sample scenario incidents for evaluation.

### 6. About & Inquiries Page (`pages/about-contact.html`)
- **Superhuman Defense Charter**: Mission overview and the Three Core Accords (Civilian Priority Rule, Minimal Collateral Force, Encrypted Citizen Privacy).
- **Administrative Contact Form**: Validated submission for municipal liaisons, press, and registration inquiries.
- **Central Headquarters Info**: Terrestrial base details, sub-orbital frequencies, and administrative hotline.

### 7. Design System & Responsiveness
- **Comic-Inspired Aesthetic**:
  - Bold primary palette: Hero Crimson (`#d90429`), Comic Cobalt (`#1d3557`), Action Gold (`#ffb703`), and Jet Black (`#111827`).
  - Bold borders (`2.5px solid #111827`), hard drop shadows (`4px 4px 0px #111827`), and angled badges.
  - Google Fonts: `Bangers` for headers + `Plus Jakarta Sans` for clean data legibility.
- **Fully Responsive**:
  - Tested across Mobile (375px), Tablet (768px), and Desktop (1440px+).
  - Accessible hamburger drawer menu on viewports below 768px with ARIA attributes and keyboard esc/outside click handling.
  - Horizontal scrolling tables wrapped in responsive containers to prevent page overflow.

---

## 📁 Project Architecture

```
d:/Internship/
├── index.html                  # Home Overview (Banner, Stats, Steps, Featured Heroes)
├── README.md                   # Complete Documentation & Deployment Manual
├── assets/
│   ├── favicon.svg             # Custom Superhero Shield Vector Favicon
│   └── images/                 # Standalone vector assets
├── css/
│   ├── main.css                # Design tokens, comic theme, buttons, navbar, modal, toasts
│   ├── home.css                # Hero banner, stats strip, 3-step cards, callouts
│   ├── heroes.css              # Hero cards grid, search/filter toolbar, dossier view
│   ├── forms.css               # Help request form, urgency dial, "My Requests" table
│   └── admin.css               # Admin KPI metrics, table management, status chips
├── js/
│   ├── data.js                 # 9 Detailed Superhero Profiles & Vector Avatars
│   ├── storage.js              # LocalStorage CRUD, Ticket Generator, KPI Aggregations
│   ├── navbar.js               # Responsive Hamburger Menu & Toast Notification Utility
│   ├── heroes.js               # Live Search, City & Status Filter Controller
│   ├── hero-detail.js          # Dossier Controller & Animated Stat Progress Bars
│   ├── request.js              # Form Validation, Ticket Generator, "My Requests" Controller
│   ├── admin.js                # Dispatcher KPI Dashboard & Status Toggle Controller
│   └── contact.js              # Contact Form Validation & Confirmation Banner
└── pages/
    ├── heroes.html             # Superhero Directory & Filters
    ├── hero-detail.html        # Individual Hero Tactical Dossier View
    ├── report.html             # Emergency Distress Form & Transponder Log
    ├── admin.html              # Admin / Dispatcher Command Console
    └── about-contact.html      # About Network, Protocols & Liaison Form
```

---

## 🛠️ Tech Stack

- **Markup**: HTML5 (Semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<dialog>`)
- **Styling**: CSS3 (CSS Custom Properties, CSS Grid, Flexbox, Keyframe Animations, clamp font sizing)
- **Scripting**: Vanilla JavaScript (ES6+, DOM API, URLSearchParams, Event Delegation)
- **Persistence**: Web Storage API (`localStorage`) with initial seed simulation data
- **Fonts**: Google Fonts (`Bangers`, `Plus Jakarta Sans`)
- **Icons**: Custom scalable vector inline SVGs (no external icon library dependencies or broken links)

---

## 💻 Setup & Local Development

No Node.js or build steps required. You can run the project in any browser:

### Option 1: Direct File Opening
1. Double-click `index.html` to open directly in Chrome, Edge, Firefox, or Safari.

### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
# In project root (d:/Internship)
python -m http.server 8000
```
Then visit `http://localhost:8000`.

Using VS Code:
- Install the **Live Server** extension and click **"Go Live"**.

---

## 🧪 Testing & Quality Assurance

| Test Case | Procedure | Expected Result |
|---|---|---|
| **Empty Form Submission** | Submit the distress form with all fields blank | Submit blocked; red error messages displayed beneath all required fields; first invalid input focused |
| **Invalid Email Format** | Enter `notanemail` in email field | Inline error: "Please enter a valid email address" |
| **Invalid Phone Format** | Enter `123` in contact number | Inline error: "Please enter a valid phone number (7-15 digits)" |
| **Description Minimum Length** | Enter "Help" (4 characters) | Inline error: "Please provide at least 10 characters detailing the incident" |
| **Distress Ticket Generation** | Fill valid inputs and submit distress form | Unique Ticket ID generated (e.g. `#HERO-XXXX-X`); confirmation modal pop-up displayed; form resets |
| **LocalStorage Persistence** | Refresh `report.html` or navigate to `admin.html` | Submitted tickets persist across pages and reloads under "My Distress Signals" and Admin table |
| **Admin Status Toggle** | Click "Mark Resolved" on an incident in Admin dashboard | Status switches to "Resolved"; Pending KPI count decrements; Resolved KPI count increments |
| **Roster Live Search** | Type "Sonic" or "Metropolis" in Heroes search bar | Grid filters down immediately to matching operatives |
| **City / Status Filter** | Select "Coast City" & "Available" | Shows only operatives matching both conditions |
| **Mobile Drawer (375px)** | Click hamburger button on mobile viewport | Navigation drawer smoothly slides down; closes on link click, outside tap, or Esc key |
| **Console Errors** | Open Browser Developer Tools (F12) | Zero runtime JavaScript exceptions or 404 network errors |

---

## 🌐 Deployment Instructions

### Deploy to GitHub Pages
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete superhero help portal"
   git remote add origin https://github.com/<your-username>/superhero-help-portal.git
   git branch -M main
   git push -u origin main
   ```
2. Navigate to your repository on GitHub.
3. Click **Settings > Pages**.
4. Under **Branch**, select `main` and `/ (root)`.
5. Click **Save**. Your site will be live at `https://<your-username>.github.io/superhero-help-portal/`.

### Deploy to Vercel
```bash
npx vercel
```
Follow the interactive prompts (defaults are all pre-configured for static HTML/CSS/JS).

### Deploy to Netlify
- Drag the project directory into [app.netlify.com/drop](https://app.netlify.com/drop), or link your GitHub repository. No build command needed.

---

## 📜 License & Accreditation
Built for superhero emergency dispatch and civilian defense. Free to use and customize under the MIT License.
