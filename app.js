// Friendly Hackathon Explainer & Prototype Sandbox Application Logic

// Sandbox Demos Data (Incorporating Friend's Ground Reality Feedback)
const sandboxDemos = {
  pothole: {
    title: 'Nerul & Taloja MIDC Pothole AI Survey',
    locationBadge: '📍 Nerul MIDC / Taloja MIDC Google Map View',
    image: 'assets/nerul_pothole_map.jpg',
    features: [
      '<strong>Google Map GIS Integration:</strong> Full spatial drone & satellite mapping of Nerul & Taloja industrial road corridors.',
      '<strong>AI Image Detection & Bounding Boxes:</strong> Auto-identifies potholes, classifies depth severity, and calculates repair material costs.',
      '<strong>Day vs Night Traffic Dispatcher:</strong> Recommends repair schedules based on peak truck traffic vs low foot-traffic hours to prevent industrial gridlock.',
      '<strong>Remediation Cost & Fix Timeline:</strong> Estimated repair time: 3.5 hours | Estimated Cost: ₹1,45,680 (using rapid cold-mix polymer).'
    ]
  },
  fire: {
    title: 'AI Safety & Fire Sentinel Emergency Radar',
    locationBadge: '🚨 Direct Local Fire Department Integration',
    image: 'assets/fire_sentinel_map.jpg',
    features: [
      '<strong>Direct Fire Station Alerting:</strong> Camera feeds automatically push real-time alerts to the local fire department radar upon detecting fire or chemical smoke.',
      '<strong>Chemical Inventory & PPE Dispatch:</strong> Instantly displays factory chemical list (e.g. Toluene, Hydrochloric Acid) and exact PPE required (Level A HAZMAT, SCBA).',
      '<strong>Traffic Clearance Alert:</strong> Automatically alerts neighboring factories when fire trucks leave, clearing emergency route pathways.',
      '<strong>Manual Override & Kill Switch:</strong> Allows human operators to override AI tools with mandatory logging of WHO killed it and WHY.'
    ]
  },
  carbon: {
    title: 'Thermal Drone Chimney Emission Audit',
    locationBadge: '📍 Dombivli & Rabale MIDC Smoke Stacks',
    image: 'assets/hero_banner.jpg',
    features: [
      '<strong>Thermal & RGB Drone Inspection:</strong> Scans factory stacks for illegal off-hour venting and filter bypasses.',
      '<strong>Regulatory Compliance Timing:</strong> Verifies emission timestamps against permitted government schedules (incorporating Ajinkya’s compliance rules).',
      '<strong>Filter Activity Verification:</strong> Detects whether advanced scrubbers are active or disabled during peak factory shifts.',
      '<strong>Automated ESG Flagging:</strong> Directly updates factory compliance ratings on the MIDC central portal.'
    ]
  },
  water: {
    title: 'Taloja River & Industrial Lake Water Inspector',
    locationBadge: '📍 Taloja River & Chemical Drain Basins',
    image: 'assets/friends_collaboration.jpg',
    features: [
      '<strong>Spectral Pollution Heatmap:</strong> Color-codes industrial drain networks comparing heavily polluted chemical zones vs safe zones.',
      '<strong>Automated MIDC Notice Generator:</strong> One-click generation of formal MIDC inspection notices sent directly to non-compliant factory owners.',
      '<strong>Biological Filter Shield:</strong> Alerts central CETPs 40 minutes before toxic effluent reaches biological treatment beds.'
    ]
  },
  solar: {
    title: 'Drone Rooftop Solar Coverage & Energy Audit',
    locationBadge: '📍 Chakan & Pimpri Industrial Estates',
    image: 'assets/hero_banner.jpg',
    features: [
      '<strong>Drone Rooftop Coverage Audit:</strong> Quantifies the exact % of factory roofs equipped with solar panels across industrial blocks.',
      '<strong>Phase-1 Adoption Roadmap:</strong> Recommends starting solar integration for common area lighting, fans, and basic loads before full factory scale.',
      '<strong>Quantified CO2 Reduction Data:</strong> Uses theoretical energy datasets to project annual electricity savings (₹12.4 Lakhs/yr) and carbon offset.'
    ]
  }
};

// ELI5 Tracks Data (Updated with Ground Reality Details)
const eli5Tracks = [
  {
    id: 'potholes',
    title: 'Pothole & Road Patrol (Nerul & Taloja)',
    icon: '🛣️',
    eli5Summary: 'Detecting and fixing broken industrial roads in Nerul & Taloja MIDC using Google Map GIS views, cost calculators, and smart day/night scheduling.',
    whyItMatters: 'Heavy container trucks destroy Nerul & Taloja roads. Fixing them at night based on foot/truck traffic prevents expensive industrial traffic jams.',
    whatTechDoes: 'Maps roads with drone/camera imagery, auto-detects pothole depth, and estimates repair materials.',
    whatYouDo: 'Design the day/night repair schedule based on foot-traffic data, calculate fixing timelines (e.g. 4-hour fix), and present the ROI to MIDC.',
    techRoles: ['CV/AI Developer', 'GIS Developer'],
    nonTechRoles: ['Traffic & Logistics Lead', 'Cost & Timeline Analyst', 'Pitch Lead']
  },
  {
    id: 'carbon',
    title: 'Carbon & Smoke Police (Drone Audits)',
    icon: '🌿',
    eli5Summary: 'Thermal drone surveillance checking factory chimneys for illegal off-hour smoke release and verifying filter compliance (Ajinkya’s rule set).',
    whyItMatters: 'Factories sometimes release dirty smoke at night. Thermal drones spot un-filtered emissions and check compliance timestamps.',
    whatTechDoes: 'Processes drone thermal images to measure stack temperature and gas opacity.',
    whatYouDo: 'Create the regulatory compliance checklist, design ESG certificates for compliant factories, and pitch the environmental benefits.',
    techRoles: ['Drone Imaging Dev', 'IoT Specialist'],
    nonTechRoles: ['Regulatory Compliance Specialist', 'ESG Pitch Storyteller']
  },
  {
    id: 'water',
    title: 'Water & Effluent Cleaner (Taloja River)',
    icon: '💧',
    eli5Summary: 'Aerial pollution heatmapping of Taloja River & industrial lakes, generating automated MIDC inspection notices for toxic factories.',
    whyItMatters: 'Toxic chemical spills destroy central water treatment plants. Visual heatmaps pinpoint exact polluting factories.',
    whatTechDoes: 'Generates spectral color maps comparing polluted water zones vs clean zones.',
    whatYouDo: 'Draft the automated MIDC Inspection Notice template, plan factory outreach, and present the community river restoration model.',
    techRoles: ['Spectral Analyst', 'Web GIS Dev'],
    nonTechRoles: ['Policy & Legal Draft Lead', 'Community Advocate', 'Operations Lead']
  },
  {
    id: 'energy',
    title: 'Rooftop Solar & Green Energy Audit',
    icon: '⚡',
    eli5Summary: 'Auditing factory roof solar % via drone shots, encouraging basic solar adoption starting with common lights & fans to cut carbon.',
    whyItMatters: 'Most factory roofs sit empty while grid power costs spike. Starting small with common area lighting builds momentum for full solar adoption.',
    whatTechDoes: 'Analyzes aerial drone photos to calculate roof area and solar panel coverage percentage.',
    whatYouDo: 'Quantify the theoretical energy savings, design the phased solar adoption roadmap for factory owners, and model the financial payback.',
    techRoles: ['Computer Vision Dev', 'Financial Modeling Dev'],
    nonTechRoles: ['Solar Business Analyst', 'Financial Modeler', 'UI/UX Visualizer']
  },
  {
    id: 'ai-parks',
    title: 'AI Safety & Fire Sentinel (Fire Dept Radar)',
    icon: '🤖',
    eli5Summary: 'Connecting factory camera feeds to local Fire Department radar with chemical lists, PPE guidance, traffic clearance, and a manual Kill Switch.',
    whyItMatters: 'Chemical fires spread in minutes! Responders need instant chemical details, PPE info, and clear emergency traffic routes.',
    whatTechDoes: 'Streams AI vision alerts to fire stations, pushes chemical inventory data, and broadcasts traffic clearance alerts to neighbor factories.',
    whatYouDo: 'Design the emergency response protocol, manage the mandatory AI Kill Switch audit log, and deliver a dramatic live fire-dispatch pitch!',
    techRoles: ['Python AI Engineer', 'Real-Time Streaming Dev'],
    nonTechRoles: ['Emergency Safety Director', 'Audit Log Lead', 'Pitch Storyteller']
  }
];

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  renderELI5Tracks();
  initCountdown();
  populateStudioSelects();
});

// Switch Sandbox Demo
function switchSandboxTab(key, btnElem) {
  document.querySelectorAll('.sandbox-tab-btn').forEach(b => b.classList.remove('active'));
  btnElem.classList.add('active');

  const demo = sandboxDemos[key];
  const container = document.getElementById('sandbox-viewer-content');

  container.innerHTML = `
    <div class="sandbox-media-wrapper">
      <img src="${demo.image}" alt="${demo.title}">
    </div>
    <div class="sandbox-details">
      <span class="sandbox-badge">${demo.locationBadge}</span>
      <h4>${demo.title}</h4>
      
      <ul class="sandbox-feature-list">
        ${demo.features.map(f => `<li><span>🔹</span><div>${f}</div></li>`).join('')}
      </ul>

      ${key === 'fire' ? `
        <div class="kill-switch-box">
          <button class="btn-kill-switch" onclick="triggerKillSwitch()">🚨 TEST MANUAL AI KILL SWITCH</button>
          <div id="kill-switch-log-display" class="override-log" style="display:none;"></div>
        </div>
      ` : ''}
    </div>
  `;
}

// Trigger Simulated AI Kill Switch
function triggerKillSwitch() {
  const logBox = document.getElementById('kill-switch-log-display');
  const now = new Date().toLocaleTimeString();
  
  logBox.style.display = 'block';
  logBox.innerHTML = `
    [OVERRIDE AUDIT LOG - ${now}]<br>
    STATUS: AI Camera Vision System KILLED BY MANUAL OVERRIDE.<br>
    OPERATOR ID: #SAFE-OPERATOR-8842<br>
    REASON LOGGED: "Routine sensor recalibration & manual safety audit."<br>
    AUDIT TRAIL: Saved to Permanent MIDC Governance Registry.
  `;
}

// Render ELI5 Cards
function renderELI5Tracks() {
  const container = document.getElementById('eli5-tracks-grid');
  if (!container) return;

  container.innerHTML = eli5Tracks.map(t => `
    <div class="eli5-card">
      <div>
        <div class="eli5-header">
          <div class="eli5-icon">${t.icon}</div>
          <h4 class="eli5-title">${t.title}</h4>
        </div>
        <div class="eli5-simple-desc">
          "${t.eli5Summary}"
        </div>
        
        <div class="eli5-roles-box">
          <div class="eli5-roles-title">🌟 Where YOU Shine (Non-Tech):</div>
          <div>
            ${t.nonTechRoles.map(r => `<span class="badge-pill">★ ${r}</span>`).join('')}
          </div>
        </div>
      </div>

      <div style="margin-top:16px; display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-glass); padding-top:16px;">
        <button class="btn-secondary" style="font-size:0.85rem;" onclick="openTrackModal('${t.id}')">
          Read Story & Deeper Details &rarr;
        </button>
        <button class="btn-cta" style="font-size:0.82rem; padding:8px 14px;" onclick="selectTrackForStudio('${t.id}')">
          Build Idea &rarr;
        </button>
      </div>
    </div>
  `).join('');
}

// Countdown Timer
function initCountdown() {
  const targetDate = new Date('September 30, 2026 23:59:59').getTime();
  
  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      document.getElementById('timer-display').innerText = `${days} Days ${hours} Hours Left to Join!`;
    } else {
      document.getElementById('timer-display').innerText = `Applications Open!`;
    }
  }

  updateTimer();
}

// Superpower Quiz Logic
let quizAnswers = { superpower: '', interest: '' };

function answerQuiz(step, value, btnElem) {
  const parent = btnElem.parentElement;
  parent.querySelectorAll('.quiz-opt-btn').forEach(b => b.classList.remove('selected'));
  btnElem.classList.add('selected');

  if (step === 1) {
    quizAnswers.superpower = value;
    document.getElementById('quiz-next-btn-1').style.display = 'inline-flex';
  } else if (step === 2) {
    quizAnswers.interest = value;
    document.getElementById('quiz-finish-btn').style.display = 'inline-flex';
  }
}

function showQuizStep(step) {
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  document.getElementById(`quiz-step-${step}`).classList.add('active');
}

function finishSuperpowerQuiz() {
  showQuizStep(3);
  const track = eli5Tracks.find(t => t.id === quizAnswers.interest);
  
  document.getElementById('quiz-result-box').innerHTML = `
    <div style="text-align:center; padding:10px 0;">
      <div style="font-size:3.5rem; margin-bottom:10px;">🌟</div>
      <h3 style="font-family:var(--font-heading); font-size:1.8rem; color:#fff; margin-bottom:8px;">
        You are "The ${quizAnswers.superpower}"!
      </h3>
      <p style="color:var(--text-muted); font-size:1rem; max-width:550px; margin:0 auto 20px;">
        Together with a tech partner, your best track to win is <strong>${track.title}</strong> (${track.icon}).
      </p>

      <div style="background:rgba(139, 92, 246, 0.12); border:1px solid var(--accent-purple); border-radius:14px; padding:20px; max-width:550px; margin:0 auto 24px; text-align:left;">
        <h5 style="color:var(--accent-cyan); font-size:1rem; margin-bottom:6px;">Your Secret Weapon Contribution:</h5>
        <p style="color:#e5e7eb; font-size:0.92rem; margin-bottom:12px;">${track.whatYouDo}</p>
        <h5 style="color:var(--accent-purple); font-size:1rem; margin-bottom:6px;">What the Tech Partner Builds:</h5>
        <p style="color:#d1d5db; font-size:0.92rem;">${track.whatTechDoes}</p>
      </div>

      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        <button class="btn-cta" onclick="selectTrackForStudio('${track.id}')">Build Pitch Deck Outline Together &rarr;</button>
      </div>
    </div>
  `;
}

// Studio Logic
function populateStudioSelects() {
  const sel = document.getElementById('co-track-select');
  if (!sel) return;

  sel.innerHTML = eli5Tracks.map(t => `<option value="${t.id}">${t.icon} ${t.title}</option>`).join('');
}

function selectTrackForStudio(trackId) {
  closeModal();
  document.getElementById('co-track-select').value = trackId;
  document.getElementById('pitch-studio-section').scrollIntoView({ behavior: 'smooth' });
}

function generateCoPitch() {
  const friendName = document.getElementById('friend-name').value || 'My Teammate';
  const myRole = document.getElementById('friend-role').value;
  const trackId = document.getElementById('co-track-select').value;
  const ideaTitle = document.getElementById('co-idea-title').value || 'MIDC Smart Ground Survey';

  const track = eli5Tracks.find(t => t.id === trackId);

  const slideDeck = `
🎯 OUR WINNING PITCH SLIDE DECK: "${ideaTitle.toUpperCase()}"
==================================================================
Target Track: ${track.icon} ${track.title}
Team Roles: ${friendName} (${myRole}) + Tech Lead (Developer)

SLIDE 1: GROUND REALITY & PROBLEM
• ${track.whyItMatters}

SLIDE 2: OUR SOLUTION CONCEPT ("${ideaTitle}")
• Concept: ${track.eli5Summary}

SLIDE 3: TECH + HUMAN EXECUTION
• Drone & AI Survey Tech: ${track.whatTechDoes}
• Operations & Governance (Led by ${friendName}): ${track.whatYouDo}

SLIDE 4: SAFETY & GOVERNANCE
• Full AI Manual Override / Kill Switch with audit logging.
• Direct MIDC Notice & Emergency Fire Dept Radar Integration.

SLIDE 5: PITCH CONCLUSION & ROI
• Clear financial payback, ready-to-deploy TRL 4+ prototype.
• Presented by ${friendName} (${myRole}) & Team.
==================================================================
`;

  document.getElementById('slide-output-text').innerText = slideDeck;
  document.getElementById('slide-output-box').style.display = 'block';
  document.getElementById('slide-output-box').scrollIntoView({ behavior: 'smooth' });
}

function copySlideDeck() {
  const text = document.getElementById('slide-output-text').innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Slide Deck copied! You can paste this into WhatsApp or Google Docs!');
  });
}

// Modal View
function openTrackModal(trackId) {
  const track = eli5Tracks.find(t => t.id === trackId);
  const modal = document.getElementById('track-modal');
  const body = document.getElementById('modal-content-area');

  body.innerHTML = `
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:20px;">
      <div style="font-size:3.2rem;">${track.icon}</div>
      <div>
        <h3 style="font-family:var(--font-heading); font-size:1.8rem; color:#fff;">${track.title}</h3>
        <span style="color:var(--accent-purple); font-weight:700; font-size:0.9rem;">MIDC Grand Challenge 2026 Track</span>
      </div>
    </div>

    <div style="background:rgba(255,255,255,0.04); border-left:4px solid var(--accent-cyan); padding:16px; border-radius:8px; margin-bottom:20px;">
      <h5 style="color:var(--accent-cyan); text-transform:uppercase; font-size:0.8rem; letter-spacing:1px; margin-bottom:4px;">In Plain English</h5>
      <p style="color:#e5e7eb; font-size:1rem; font-weight:500;">"${track.eli5Summary}"</p>
    </div>

    <div style="margin-bottom:20px;">
      <h4 style="color:#fff; font-size:1.1rem; margin-bottom:8px;">Ground Reality & Pain Point</h4>
      <p style="color:var(--text-muted); font-size:0.95rem;">${track.whyItMatters}</p>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
      <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-glass); padding:16px; border-radius:12px;">
        <h5 style="color:var(--accent-purple); font-size:0.95rem; margin-bottom:6px;">💻 Drone & Tech Component</h5>
        <p style="color:var(--text-muted); font-size:0.88rem;">${track.whatTechDoes}</p>
      </div>
      <div style="background:rgba(139, 92, 246, 0.12); border:1px solid var(--accent-purple); padding:16px; border-radius:12px;">
        <h5 style="color:#d8b4fe; font-size:0.95rem; margin-bottom:6px;">🌟 Non-Tech Strategy (YOU!)</h5>
        <p style="color:#e5e7eb; font-size:0.88rem;">${track.whatYouDo}</p>
      </div>
    </div>

    <div style="display:flex; gap:12px;">
      <button class="btn-cta" onclick="selectTrackForStudio('${track.id}')">Start Co-Creating Pitch &rarr;</button>
      <button class="btn-secondary" onclick="closeModal()">Close</button>
    </div>
  `;

  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('track-modal').classList.remove('active');
}
