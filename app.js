// MIDC Grand Challenge 2026 - Interactive Application Logic

// Track Data
const tracksData = [
  {
    id: 'potholes',
    title: 'Pothole Detection & Rapid Repair',
    category: 'Logistics & Infrastructure',
    icon: '🛣️',
    summary: 'Automated road degradation auditing and ultra-fast monsoon-resistant road patching for heavy industrial traffic.',
    techRoles: ['Computer Vision (YOLO/OpenCV)', 'GIS Developer', 'Materials Scientist'],
    nonTechRoles: ['Operations Lead', 'Road Quality Auditor', 'Logistics Strategist', 'Pitch Lead'],
    painPoint: 'Heavy truck traffic & monsoons destroy industrial estate roads, causing expensive transit delays, cargo damage, and unsafe conditions.',
    solutions: [
      {
        title: 'Dashcam & Drone AI Road Auditor',
        desc: 'Mount smartphone/edge camera pods on garbage trucks or transit vehicles to automatically detect potholes, measure depth, and auto-dispatch repair teams.',
        nonTechImpact: 'Eliminates manual road surveys and reduces repair response time from weeks to hours.'
      },
      {
        title: 'Rapid-Curing Polymer Cold-Mix Patching',
        desc: 'Bio-polymer asphalt material that cures under water in 20 minutes, allowing 40-tonne container trucks to pass without damaging repairs.',
        nonTechImpact: 'Zero traffic blockages even during peak monsoon season.'
      }
    ]
  },
  {
    id: 'carbon',
    title: 'Carbon Capture & Emission Management',
    category: 'Sustainability & ClimateTech',
    icon: '🌿',
    summary: 'Decentralized chimney stack emission tracking and affordable carbon capture scrubbers tailored for MSMEs.',
    techRoles: ['IoT Sensor Engineer', 'Environmental Data Analyst', 'Chemical Engineer'],
    nonTechRoles: ['ESG Compliance Manager', 'Sustainability Advocate', 'Regulatory Pitch Specialist'],
    painPoint: 'Industrial estates host thousands of boilers emitting SOx, NOx, and CO2. Small factories cannot afford multi-crore carbon capture plants.',
    solutions: [
      {
        title: 'Perimeter IoT Chimney Stack Tracker',
        desc: 'Solar-powered ambient & stack sensor pods that detect illegal off-hour gas venting and feed real-time air quality heatmaps.',
        nonTechImpact: 'Helps MIDC enforce green standards and gives factory owners transparent ESG compliance metrics.'
      },
      {
        title: 'Micro-Algae Scrubber for Boiler Exhaust',
        desc: 'Plug-and-play bio-reactor attachment for small boilers that uses algae cultures to convert CO2 into valuable bio-fertilizers.',
        nonTechImpact: 'Turns waste carbon emissions into a sellable byproduct for local farmers.'
      }
    ]
  },
  {
    id: 'water',
    title: 'Waste & Water Effluent Treatment / Recycling',
    category: 'Circular Economy & Water Tech',
    icon: '💧',
    summary: 'Early-warning toxic discharge surveillance and low-energy Zero Liquid Discharge (ZLD) for central treatment plants.',
    techRoles: ['Spectral Sensor Dev', 'Embedded Firmware Developer', 'Membrane Chemist'],
    nonTechRoles: ['Water Resource Planner', 'Factory Outreach Coordinator', 'Impact Assessor'],
    painPoint: 'Illegal or untreated chemical discharge into industrial drains destroys biological filters at Common Effluent Treatment Plants (CETPs).',
    solutions: [
      {
        title: 'Drain Spectral Early Warning Pods',
        desc: 'Optical sensors placed in drain networks that detect toxic surges 40 minutes before reaching the CETP, triggering auto-diversion valves.',
        nonTechImpact: 'Prevents multi-day plant shutdowns and protects surrounding river ecosystems.'
      },
      {
        title: 'Solar-Assisted Low-Energy Membrane Evaporator',
        desc: 'Modular solar thermal distillation unit that recovers 90%+ clean water from industrial brine at half the power cost.',
        nonTechImpact: 'Allows small textile & chemical units to afford zero liquid waste compliance.'
      }
    ]
  },
  {
    id: 'energy',
    title: 'Green Energy & Microgrid Solutions',
    category: 'Renewable Energy & Power',
    icon: '⚡',
    summary: 'Peer-to-peer solar trading microgrids and low-temperature industrial waste heat recovery.',
    techRoles: ['Smart Grid Engineer', 'Power Electronics Specialist', 'Blockchain / Smart Contract Dev'],
    nonTechRoles: ['Energy Business Analyst', 'Industrial Park Liaison', 'Financial Modeling Lead'],
    painPoint: 'High electricity tariffs during peak hours reduce factory profits, while excess rooftop solar energy goes unutilized.',
    solutions: [
      {
        title: 'Industrial Park Peer-to-Peer Solar Trading',
        desc: 'Smart contract platform allowing factories with excess rooftop solar power to sell energy directly to neighboring plants.',
        nonTechImpact: 'Reduces electricity bills by 20-30% for participating factories and stabilizes the power grid.'
      },
      {
        title: 'Exhaust Flue Waste Heat Generator',
        desc: 'Thermo-electric generator modules retrofitted onto furnace exhaust pipes to convert wasted 100°C+ heat directly into electricity.',
        nonTechImpact: 'Free internal power generation for lighting and control systems.'
      }
    ]
  },
  {
    id: 'ai-parks',
    title: 'AI-Driven Solutions & Smart Industrial Parks',
    category: 'AI & Smart Infrastructure',
    icon: '🤖',
    summary: 'Video analytics for industrial safety, gas leak surveillance, and 3D GIS digital twin infrastructure monitoring.',
    techRoles: ['Full-Stack AI Developer', 'Geospatial / GIS Analyst', 'Cloud Infrastructure Engineer'],
    nonTechRoles: ['Safety Auditor', 'Industrial Site Operations Lead', 'Presentation & Demo Storyteller'],
    painPoint: 'Vast industrial parks suffer from undetected pipeline leaks, fire hazards, trespassers, and safety non-compliance.',
    solutions: [
      {
        title: 'CCTV Vision AI Safety & Hazard Sentinel',
        desc: 'AI software overlay on existing security cameras that instantly flags fire, smoke, oil spills, chemical clouds, and worker safety gear violations.',
        nonTechImpact: 'Guarantees 24/7 automated site safety without hiring armies of manual guards.'
      },
      {
        title: '3D Spatial Digital Twin for Utility Pipelines',
        desc: 'Interactive 3D map mapping underground water and gas pipelines, analyzing sensor pressure drops to locate leaks within 5 meters.',
        nonTechImpact: 'Prevents catastrophic gas leaks and saves millions of liters of wasted municipal water.'
      }
    ]
  }
];

// Non-Tech Quiz Data
const quizQuestions = [
  {
    step: 1,
    question: "What is your primary superpower or background?",
    options: [
      { label: "Business, Strategy & Marketing", icon: "📊", role: "Business Lead / Strategist" },
      { label: "Design, UX & Storytelling", icon: "🎨", role: "Product Designer & Pitch Lead" },
      { label: "Environmental & Social Science", icon: "🌱", role: "Sustainability Specialist" },
      { label: "Operations, Logistics & Management", icon: "⚙️", role: "Operations Lead" }
    ]
  },
  {
    step: 2,
    question: "Which industrial challenge interests you the most?",
    options: [
      { label: "Fixing roads & smooth transportation", icon: "🛣️", track: "potholes" },
      { label: "Cleaning air & capturing carbon emissions", icon: "🌿", track: "carbon" },
      { label: "Water recycling & pollution prevention", icon: "💧", track: "water" },
      { label: "Renewable energy & lower electricity bills", icon: "⚡", track: "energy" },
      { label: "AI safety, security & smart infrastructure", icon: "🤖", track: "ai-parks" }
    ]
  }
];

let currentQuizState = { role: '', trackId: 'potholes' };

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  renderTracks('all');
  initCountdown();
  initQuiz();
  populateStudioForm();
});

// Render Tracks Grid
function renderTracks(filterCategory) {
  const container = document.getElementById('tracks-container');
  container.innerHTML = '';

  const filtered = filterCategory === 'all' 
    ? tracksData 
    : tracksData.filter(t => t.id === filterCategory);

  filtered.forEach(track => {
    const card = document.createElement('div');
    card.className = 'track-card';
    card.innerHTML = `
      <div>
        <div class="track-header">
          <div class="track-icon">${track.icon}</div>
          <div class="track-title-group">
            <h4>${track.title}</h4>
            <span class="track-tag">${track.category}</span>
          </div>
        </div>
        <p class="track-summary">${track.summary}</p>
        
        <div class="roles-box">
          <div class="roles-title">Roles Needed in Team</div>
          <div class="roles-list">
            ${track.techRoles.slice(0, 2).map(r => `<span class="role-pill">${r}</span>`).join('')}
            ${track.nonTechRoles.slice(0, 2).map(r => `<span class="role-pill nontech">★ ${r}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="track-card-footer">
        <span style="font-size:0.8rem; color:var(--text-muted);">${track.solutions.length} Problem Statements</span>
        <button class="btn-card-details" onclick="openTrackModal('${track.id}')">
          Explore Ideas &rarr;
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Filter Tabs Handler
function filterTracks(category, btnElement) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');
  renderTracks(category);
}

// Countdown Timer to Sept 30, 2026
function initCountdown() {
  const targetDate = new Date('September 30, 2026 23:59:59').getTime();
  
  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      document.getElementById('countdown-display').innerText = `${days}d ${hours}h ${mins}m remaining`;
    } else {
      document.getElementById('countdown-display').innerText = `Applications Open`;
    }
  }

  updateTimer();
  setInterval(updateTimer, 60000);
}

// Quiz / Track Finder Logic
function initQuiz() {
  const optionsGrid1 = document.getElementById('quiz-options-1');
  if (!optionsGrid1) return;

  optionsGrid1.innerHTML = quizQuestions[0].options.map(opt => `
    <div class="option-card" onclick="selectQuizOption(1, '${opt.role}', this)">
      <span class="option-icon">${opt.icon}</span>
      <div class="option-title">${opt.label}</div>
      <div class="option-sub">Recommended Role: ${opt.role}</div>
    </div>
  `).join('');

  const optionsGrid2 = document.getElementById('quiz-options-2');
  optionsGrid2.innerHTML = quizQuestions[1].options.map(opt => `
    <div class="option-card" onclick="selectQuizOption(2, '${opt.track}', this)">
      <span class="option-icon">${opt.icon}</span>
      <div class="option-title">${opt.label}</div>
    </div>
  `).join('');
}

function selectQuizOption(step, value, element) {
  const parent = element.parentElement;
  parent.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
  element.classList.add('selected');

  if (step === 1) {
    currentQuizState.role = value;
    document.getElementById('btn-next-step').style.display = 'inline-flex';
  } else if (step === 2) {
    currentQuizState.trackId = value;
    document.getElementById('btn-finish-quiz').style.display = 'inline-flex';
  }
}

function goToStep(step) {
  document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
  document.getElementById(`wizard-step-${step}`).classList.add('active');
}

function finishQuiz() {
  goToStep(3);
  const track = tracksData.find(t => t.id === currentQuizState.trackId);
  const resultContainer = document.getElementById('quiz-result');
  
  resultContainer.innerHTML = `
    <div style="text-align:center; padding: 20px 0;">
      <span style="font-size:3rem;">🎯</span>
      <h3 style="font-family:var(--font-heading); font-size:1.8rem; margin: 10px 0; color:#fff;">Your Perfect Match!</h3>
      <p style="color:var(--text-muted); margin-bottom: 20px;">
        As a <strong>${currentQuizState.role}</strong>, you are uniquely positioned to excel in:
      </p>
      
      <div style="background:rgba(16, 185, 129, 0.1); border:1px solid var(--accent-emerald); border-radius:var(--radius-md); padding:20px; max-width:500px; margin:0 auto 20px;">
        <div style="font-size:2rem; margin-bottom:6px;">${track.icon}</div>
        <h4 style="font-family:var(--font-heading); font-size:1.4rem; color:var(--accent-emerald);">${track.title}</h4>
        <p style="font-size:0.9rem; color:#e5e7eb; margin-top:8px;">${track.summary}</p>
      </div>

      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        <button class="btn-cta" onclick="openTrackModal('${track.id}')">View Detailed Track & Ideas</button>
        <button class="btn-secondary" onclick="scrollToStudio('${track.id}', '${currentQuizState.role}')">Launch Pitch Studio with this Track</button>
      </div>
    </div>
  `;
}

// Studio Generator
function populateStudioForm() {
  const trackSelect = document.getElementById('studio-track');
  if (!trackSelect) return;

  trackSelect.innerHTML = tracksData.map(t => `<option value="${t.id}">${t.icon} ${t.title}</option>`).join('');
}

function generatePitch() {
  const trackId = document.getElementById('studio-track').value;
  const userRole = document.getElementById('studio-role').value;
  const projectName = document.getElementById('studio-name').value || 'EcoSolve MIDC';
  const customNote = document.getElementById('studio-note').value || 'Focus on rapid deployment and high ROI';

  const track = tracksData.find(t => t.id === trackId);
  const solution = track.solutions[0];

  const pitchText = `
🏆 HACKATHON PITCH BLUEPRINT: ${projectName.toUpperCase()}
--------------------------------------------------
📍 Target Track: ${track.title} (${track.category})
👤 My Core Role: ${userRole}

1. EXECUTIVE SUMMARY & PROBLEM:
   ${track.painPoint}

2. PROPOSED SOLUTION CONCEPT:
   ${solution.title}: ${solution.desc}

3. NON-TECH & OPERATIONAL STRATEGY (Led by ${userRole}):
   - Real-World Impact: ${solution.nonTechImpact}
   - Stakeholder Alignment: Direct collaboration with local MIDC estate managers and factory owners.
   - Field Execution: Phased deployment strategy ensuring minimal operational friction.

4. TECHNICAL FEASIBILITY (TRL 4+ Plan):
   - Partner with technical team members to integrate sensor/software prototype.
   - Conduct 30-day live pilot test at an MIDC industrial estate block.

5. SPECIAL NOTES & VALUE PROP:
   "${customNote}"
  `;

  document.getElementById('pitch-output-text').innerText = pitchText;
  document.getElementById('pitch-result-box').style.display = 'block';
  document.getElementById('pitch-result-box').scrollIntoView({ behavior: 'smooth' });
}

function copyPitchText() {
  const text = document.getElementById('pitch-output-text').innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Pitch Blueprint copied to clipboard!');
  });
}

function scrollToStudio(trackId, role) {
  closeModal();
  document.getElementById('studio-track').value = trackId;
  if (role) document.getElementById('studio-role').value = role;
  document.getElementById('pitch-studio').scrollIntoView({ behavior: 'smooth' });
}

// Modal Details Handler
function openTrackModal(trackId) {
  const track = tracksData.find(t => t.id === trackId);
  const modal = document.getElementById('track-modal');
  const modalBody = document.getElementById('modal-body-content');

  modalBody.innerHTML = `
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:20px;">
      <div style="font-size:3rem;">${track.icon}</div>
      <div>
        <h3 style="font-family:var(--font-heading); font-size:1.8rem; color:#fff;">${track.title}</h3>
        <span style="color:var(--accent-cyan); font-weight:600; font-size:0.9rem;">${track.category}</span>
      </div>
    </div>

    <div style="background:rgba(255,255,255,0.04); border-left:4px solid var(--accent-emerald); padding:16px; border-radius:8px; margin-bottom:24px;">
      <h5 style="color:var(--accent-emerald); text-transform:uppercase; font-size:0.8rem; letter-spacing:1px; margin-bottom:4px;">Core Industry Pain Point</h5>
      <p style="color:#e5e7eb; font-size:0.95rem;">${track.painPoint}</p>
    </div>

    <h4 style="font-family:var(--font-heading); font-size:1.3rem; color:#fff; margin-bottom:16px;">💡 Problem Statements & Solution Concepts</h4>
    ${track.solutions.map((s, idx) => `
      <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-glass); padding:20px; border-radius:var(--radius-md); margin-bottom:16px;">
        <h5 style="color:var(--accent-cyan); font-size:1.1rem; margin-bottom:8px;">${idx + 1}. ${s.title}</h5>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:12px;">${s.desc}</p>
        <div style="background:rgba(139, 92, 246, 0.15); border:1px solid rgba(139, 92, 246, 0.3); padding:10px 14px; border-radius:6px; font-size:0.85rem; color:#d8b4fe;">
          <strong>🌟 Non-Tech Friend Value:</strong> ${s.nonTechImpact}
        </div>
      </div>
    `).join('')}

    <div style="display:flex; gap:12px; margin-top:24px;">
      <button class="btn-cta" onclick="scrollToStudio('${track.id}')">Build Pitch for this Track</button>
      <button class="btn-secondary" onclick="closeModal()">Close</button>
    </div>
  `;

  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('track-modal').classList.remove('active');
}
