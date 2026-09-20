// Friendly Hackathon Explainer & Collaboration Studio Logic

// ELI5 Tracks Data
const eli5Tracks = [
  {
    id: 'potholes',
    title: 'Pothole & Road Patrol',
    icon: '🛣️',
    eli5Summary: 'Detecting and fixing broken industrial roads before heavy trucks break their axles or get stuck in monsoon mud.',
    whyItMatters: 'Industrial estates in Maharashtra carry heavy trucks 24/7. When roads get potholes, trucks slow down, break down, or spill chemical cargo.',
    whatTechDoes: 'Mounts camera pods on trucks/buses to auto-detect potholes using computer vision AI.',
    whatYouDo: 'Design the road repair dispatch strategy, calculate cost savings for truck owners, and pitch how MIDC can manage maintenance contractors.',
    techRoles: ['CV/AI Developer', 'Mobile App Dev'],
    nonTechRoles: ['Road Logistics Lead', 'Pitch Storyteller', 'Cost & Savings Analyst']
  },
  {
    id: 'carbon',
    title: 'Carbon & Smoke Police',
    icon: '🌿',
    eli5Summary: 'Tracking dirty factory chimney smoke in real-time and capturing carbon emissions before they ruin the air.',
    whyItMatters: 'Hundreds of chemical and metal factories have chimney stacks. Some release dirty gases at night when no one is watching.',
    whatTechDoes: 'Installs small solar-powered air sensors near chimneys to send real-time air quality data to a central cloud dashboard.',
    whatYouDo: 'Design the ESG sustainability report, pitch how factory owners get tax incentives for going green, and present the environmental impact.',
    techRoles: ['IoT Firmware Dev', 'Data Analyst'],
    nonTechRoles: ['Sustainability Specialist', 'ESG Strategy Lead', 'Presentation Master']
  },
  {
    id: 'water',
    title: 'Water & Effluent Cleaner',
    icon: '💧',
    eli5Summary: 'Stopping toxic factory waste from polluting rivers and recycling wastewater back into clean factory water.',
    whyItMatters: 'Factories generate dirty water. If toxic waste enters the central treatment plant without warning, it destroys the filter bacteria!',
    whatTechDoes: 'Uses optical sensors in drain pipes to detect chemical surges 40 minutes before they reach the main treatment plant.',
    whatYouDo: 'Map out factory outreach, create the water-recycling ROI model, and explain how local communities get cleaner river water.',
    techRoles: ['Sensor Engineer', 'Embedded Dev'],
    nonTechRoles: ['Water Resource Planner', 'Community Impact Advocate', 'Operations Lead']
  },
  {
    id: 'energy',
    title: 'Green Energy & Solar Sharing',
    icon: '⚡',
    eli5Summary: 'Letting neighbor factories trade excess rooftop solar power directly with each other like sharing Wi-Fi.',
    whyItMatters: 'Electricity is super expensive during peak hours. Some factories have massive solar panels going unused on weekends.',
    whatTechDoes: 'Builds a smart microgrid algorithm & trading platform to balance solar generation and factory electricity loads.',
    whatYouDo: 'Create the financial model showing how factories cut electricity bills by 25%, design the user dashboard, and lead the pitch.',
    techRoles: ['Smart Grid Dev', 'Web App Developer'],
    nonTechRoles: ['Energy Business Analyst', 'Financial Modeler', 'UI/UX Visualizer']
  },
  {
    id: 'ai-parks',
    title: 'AI Safety & Fire Sentinel',
    icon: '🤖',
    eli5Summary: 'Using smart cameras to spot chemical leaks, fires, and safety violations before accidents happen.',
    whyItMatters: 'Industrial parks span thousands of acres. Human security guards cannot watch every single corner 24/7.',
    whatTechDoes: 'Connects AI video software to existing CCTV cameras to trigger instant SMS alerts when smoke, fire, or oil spills appear.',
    whatYouDo: 'Build the factory safety protocol, design the emergency alert mobile interface, and deliver a dramatic live pitch demo to the judges!',
    techRoles: ['Python AI Engineer', 'Backend Dev'],
    nonTechRoles: ['Factory Safety Strategist', 'UI Designer', 'Pitch Director']
  }
];

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  renderELI5Tracks();
  initCountdown();
  populateStudioSelects();
});

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
  const ideaTitle = document.getElementById('co-idea-title').value || 'Smart MIDC Solution';

  const track = eli5Tracks.find(t => t.id === trackId);

  const slideDeck = `
🎯 OUR WINNING PITCH SLIDE DECK: "${ideaTitle.toUpperCase()}"
==================================================================
Target Track: ${track.icon} ${track.title}
Team Roles: ${friendName} (${myRole}) + Tech Lead (Developer)

SLIDE 1: THE REAL-WORLD PROBLEM
• ${track.whyItMatters}

SLIDE 2: OUR SOLUTION CONCEPT ("${ideaTitle}")
• Concept: ${track.eli5Summary}

SLIDE 3: HOW IT WORKS (TECH + HUMAN)
• Tech Hardware/Software: ${track.whatTechDoes}
• Operations & Field Strategy: ${track.whatYouDo}

SLIDE 4: WHY MIDC WILL LOVE IT (BUSINESS IMPACT)
• Solves real infrastructure issues across Maharashtra industrial estates.
• Clear cost savings, environmental impact, and ready-to-deploy plan (TRL 4+).

SLIDE 5: PITCH CONCLUSION
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
      <h4 style="color:#fff; font-size:1.1rem; margin-bottom:8px;">Why is this a big problem for MIDC?</h4>
      <p style="color:var(--text-muted); font-size:0.95rem;">${track.whyItMatters}</p>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
      <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-glass); padding:16px; border-radius:12px;">
        <h5 style="color:var(--accent-purple); font-size:0.95rem; margin-bottom:6px;">💻 The Tech Part</h5>
        <p style="color:var(--text-muted); font-size:0.88rem;">${track.whatTechDoes}</p>
      </div>
      <div style="background:rgba(139, 92, 246, 0.12); border:1px solid var(--accent-purple); padding:16px; border-radius:12px;">
        <h5 style="color:#d8b4fe; font-size:0.95rem; margin-bottom:6px;">🌟 The Non-Tech Part (YOU!)</h5>
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
