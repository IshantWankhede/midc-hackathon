// PotholeMukt MIDC - Official Proposal Application Logic

// Proposal & Team Data
const proposalData = {
  title: 'PotholeMukt MIDC : AI Pothole Detector & Repair Guidance',
  statementNo: 1,
  statementTitle: 'Smart Pothole Detection & Repair',
  sector: 'Pothole Detection & Repair',
  subSector: 'AI-Driven Road Inspection & Patching',
  pilotLocation: 'Taloja MIDC (Sectors 1 to 24 Industrial Spine Road & Chemical Belt, Raigad District)',
  pilotStretch: '5 km to 10 km heavy freight corridor',
  applicationType: 'Innovation / Idea Stage',
  applicantCategory: 'Individual Innovators',
  team: [
    {
      name: 'Ritesh Singh',
      title: 'Senior Construction Program Manager',
      qualification: 'MS in Civil Engineering',
      experience: '10 Years Industry Experience',
      role: 'Technical Program Manager & Civil Infrastructure Lead',
      avatar: '👷‍♂️'
    },
    {
      name: 'Ishant Wankhede',
      title: 'Senior Data Scientist',
      qualification: 'Lead Applicant & SPOC',
      experience: 'Lead Data Science & AI Engineering',
      role: 'AI / Vision-AI & Data Science Lead',
      avatar: '👨‍💻'
    }
  ]
};

// 5-Stage Methodology Loop Data
const methodologySteps = [
  {
    step: '1. SCAN',
    title: 'Fleet Vision-AI Scanning',
    desc: 'Camera pods mounted on regular moving city buses/garbage trucks capture daily road video feeds.'
  },
  {
    step: '2. ESTIMATE',
    title: 'Automated Cost & Vol. Engine',
    desc: 'AI measures pothole depth & area, auto-calculating exact repair material volume, cost (INR), and fix time.'
  },
  {
    step: '3. SCHEDULE',
    title: 'Traffic-Smart Dispatch',
    desc: 'Schedules patching during low-traffic night hours (11 PM – 4 AM) so 40-tonne container trucks don’t get delayed.'
  },
  {
    step: '4. PATCH',
    title: '30-Min Rain-Proof Repair',
    desc: 'Technicians apply fast-curing polymer asphalt allowing heavy truck traffic to resume within 30 minutes.'
  },
  {
    step: '5. AUDIT',
    title: '365-Day Quality Tracking',
    desc: 'GIS dashboard tracks patched location for 1 year to ensure zero recurrence and contractor accountability.'
  }
];

// Timeline Milestones
const timelineMilestones = [
  {
    num: '01',
    title: 'Development / Modification',
    duration: '2 Weeks (Weeks 1–2)',
    outcome: 'Refined Vision-AI defect detection model, Taloja MIDC GIS map integration, and automated repair cost calculation logic.'
  },
  {
    num: '02',
    title: 'Installation & Setup',
    duration: '1 Week (Week 3)',
    outcome: 'Mounting 3x camera pods on pilot fleet vehicles (patrol/buses); setting up material storage at Taloja MIDC office.'
  },
  {
    num: '03',
    title: 'Testing & Calibration',
    duration: '2 Weeks (Weeks 4–5)',
    outcome: 'Processing 100+ km of road feeds, verifying AI detection accuracy (>90%), and calibrating cost/timeline estimates.'
  },
  {
    num: '04',
    title: 'Pilot Execution',
    duration: '4 Weeks (Weeks 6–9)',
    outcome: 'Live daily road scanning, automated work-ticket generation, and night-time repair demo on 1-km industrial stretch using rapid polymer asphalt.'
  },
  {
    num: '05',
    title: 'Performance Assessment',
    duration: '3 Weeks (Weeks 10–12)',
    outcome: '30-day durability tracking of patched roads under heavy 40-tonne truck loads, and final pilot report submission to MIDC.'
  }
];

// Initialize Page Elements
document.addEventListener('DOMContentLoaded', () => {
  renderMethodology();
  renderTeam();
  renderTimeline();
  initCountdown();
});

// Render 5-Step Methodology
function renderMethodology() {
  const container = document.getElementById('methodology-container');
  if (!container) return;

  container.innerHTML = methodologySteps.map(m => `
    <div class="method-card">
      <div class="method-step-num">${m.step}</div>
      <h4 class="method-title">${m.title}</h4>
      <p class="method-desc">${m.desc}</p>
    </div>
  `).join('');
}

// Render Team Cards
function renderTeam() {
  const container = document.getElementById('team-container');
  if (!container) return;

  container.innerHTML = proposalData.team.map(t => `
    <div class="team-card">
      <div class="team-avatar">${t.avatar}</div>
      <h3 class="team-name">${t.name}</h3>
      <div class="team-role">${t.title}</div>
      <div class="team-qual">🎓 ${t.qualification} • ⏳ ${t.experience}</div>
      <div style="background:rgba(16, 185, 129, 0.1); border:1px solid rgba(16, 185, 129, 0.3); border-radius:8px; padding:10px; font-size:0.85rem; color:#6ee7b7;">
        <strong>Role in Challenge:</strong> ${t.role}
      </div>
    </div>
  `).join('');
}

// Render Timeline
function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = timelineMilestones.map(t => `
    <div class="timeline-item">
      <div class="timeline-num">${t.num}</div>
      <div class="timeline-content">
        <h4>${t.title}</h4>
        <div class="timeline-duration">⏱️ ${t.duration}</div>
        <div class="timeline-outcome">${t.outcome}</div>
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
      document.getElementById('timer-display').innerText = `Submission Registered • Evaluation in Progress`;
    } else {
      document.getElementById('timer-display').innerText = `Proposal Submitted`;
    }
  }

  updateTimer();
}

// Interactive Pothole Simulator Trigger
function triggerPotholeScan() {
  const resultBox = document.getElementById('scan-result-details');
  resultBox.style.display = 'block';
  resultBox.scrollIntoView({ behavior: 'smooth' });
}

// Copy Proposal Text Blueprint
function copyProposalBlueprint() {
  const text = `
🏆 MIDC GRAND CHALLENGE 2026 - SUBMISSION BLUEPRINT
---------------------------------------------------
Project Title: PotholeMukt MIDC : AI Pothole Detector & Repair Guidance
Problem Statement #1: Smart Pothole Detection & Repair
Sector: Pothole Detection & Repair
Sub-Sector: AI-Driven Road Inspection & Patching
Proposed Pilot Location: Taloja MIDC (Sectors 1-24 Chemical Belt, Raigad District)
Applicants: Ritesh Singh & Ishant Wankhede

5-STEP METHODOLOGY:
[1. SCAN] ➔ Fleet cameras capture road video daily during regular routes.
[2. ESTIMATE] ➔ AI auto-calculates pothole area, depth, material mix, and repair cost.
[3. SCHEDULE] ➔ System schedules patching during low-traffic night hours (11 PM–4 AM).
[4. PATCH] ➔ Technicians apply rain-proof polymer asphalt (traffic resumes in 30 mins).
[5. AUDIT] ➔ GIS dashboard tracks patched location for 365 days to verify non-recurrence.
---------------------------------------------------
  `;

  navigator.clipboard.writeText(text).then(() => {
    alert('Proposal Summary copied to clipboard!');
  });
}
