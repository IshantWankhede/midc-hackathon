// PotholeMukt MIDC - Live Prototype & Math Engine

// Leaflet Map Instance
let leafletMap = null;
let potholeMarkers = [];

// Sample Potholes Data in Taloja MIDC
const talojaPotholes = [
  {
    id: 'TAL-96420',
    location: 'Taloja MIDC Chemical Spine Road (Sector 12)',
    lat: 19.0685,
    lng: 73.0842,
    severity: 'HIGH',
    areaSqM: 1.45,
    depthCm: 8.5,
    bbox: { x: 30, y: 40, w: 35, h: 25 },
    trafficType: 'Heavy 40-tonne Container Tankers'
  },
  {
    id: 'TAL-96421',
    location: 'Taloja Industrial Freight Corridor (Sector 18)',
    lat: 19.0720,
    lng: 73.0890,
    severity: 'MEDIUM',
    areaSqM: 0.85,
    depthCm: 5.0,
    bbox: { x: 55, y: 60, w: 25, h: 20 },
    trafficType: 'Medium Goods Vehicles'
  },
  {
    id: 'TAL-96422',
    location: 'Taloja MIDC Common Effluent Access Road (Sector 4)',
    lat: 19.0640,
    lng: 73.0790,
    severity: 'CRITICAL',
    areaSqM: 2.10,
    depthCm: 11.0,
    bbox: { x: 20, y: 70, w: 40, h: 22 },
    trafficType: 'Heavy Chemical Carriers'
  }
];

let selectedPothole = talojaPotholes[0];

// Proposal & Team Data
const proposalData = {
  title: 'PotholeMukt MIDC : AI Pothole Detector & Repair Guidance',
  statementNo: 1,
  sector: 'Pothole Detection & Repair',
  subSector: 'AI-Driven Road Inspection & Patching',
  pilotLocation: 'Taloja MIDC (Sectors 1 to 24 Industrial Spine Road, Raigad District)',
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

// Method Steps & Milestones
const methodologySteps = [
  { step: '1. SCAN', title: 'Fleet Vision-AI Scanning', desc: 'Camera pods mounted on regular moving city buses/garbage trucks capture daily road video feeds.' },
  { step: '2. ESTIMATE', title: 'Automated Cost & Vol. Engine', desc: 'AI measures pothole depth & area, auto-calculating exact repair material volume, cost (INR), and fix time.' },
  { step: '3. SCHEDULE', title: 'Traffic-Smart Dispatch', desc: 'Schedules patching during low-traffic night hours (11 PM – 4 AM) so 40-tonne container trucks don’t get delayed.' },
  { step: '4. PATCH', title: '30-Min Rain-Proof Repair', desc: 'Technicians apply fast-curing polymer asphalt allowing heavy truck traffic to resume within 30 minutes.' },
  { step: '5. AUDIT', title: '365-Day Quality Tracking', desc: 'GIS dashboard tracks patched location for 1 year to ensure zero recurrence and contractor accountability.' }
];

const timelineMilestones = [
  { num: '01', title: 'Development / Modification', duration: '2 Weeks (Weeks 1–2)', outcome: 'Refined Vision-AI defect detection model, Taloja MIDC GIS map integration, and automated repair cost calculation logic.' },
  { num: '02', title: 'Installation & Setup', duration: '1 Week (Week 3)', outcome: 'Mounting 3x camera pods on pilot fleet vehicles (patrol/buses); setting up material storage at Taloja MIDC office.' },
  { num: '03', title: 'Testing & Calibration', duration: '2 Weeks (Weeks 4–5)', outcome: 'Processing 100+ km of road feeds, verifying AI detection accuracy (>90%), and calibrating cost/timeline estimates.' },
  { num: '04', title: 'Pilot Execution', duration: '4 Weeks (Weeks 6–9)', outcome: 'Live daily road scanning, automated work-ticket generation, and night-time repair demo on 1-km industrial stretch using rapid polymer asphalt.' },
  { num: '05', title: 'Performance Assessment', duration: '3 Weeks (Weeks 10–12)', outcome: '30-day durability tracking of patched roads under heavy 40-tonne truck loads, and final pilot report submission to MIDC.' }
];

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  initLeafletMap();
  renderMethodology();
  renderTeam();
  renderTimeline();
  updateMathEngine(selectedPothole);
});

// Initialize Leaflet Map
function initLeafletMap() {
  const mapElem = document.getElementById('taloja-leaflet-map');
  if (!mapElem) return;

  // Center on Taloja MIDC
  leafletMap = L.map('taloja-leaflet-map').setView([19.0685, 73.0842], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors | MIDC Taloja Corridor'
  }).addTo(leafletMap);

  // Add Markers for Taloja Potholes
  talojaPotholes.forEach((p, idx) => {
    const marker = L.marker([p.lat, p.lng]).addTo(leafletMap);
    
    marker.bindPopup(`
      <div style="font-family:sans-serif;">
        <strong style="color:#10b981;">${p.id}</strong><br>
        <span style="font-size:0.8rem;">${p.location}</span><br>
        <span style="font-size:0.75rem; color:#f59e0b;">Severity: ${p.severity}</span><br>
        <button onclick="selectPotholeFromMap(${idx})" style="background:#10b981; color:#000; border:none; padding:4px 8px; border-radius:4px; margin-top:4px; font-weight:bold; cursor:pointer;">
          Analyze Pothole &rarr;
        </button>
      </div>
    `);

    potholeMarkers.push(marker);
  });
}

function selectPotholeFromMap(index) {
  selectedPothole = talojaPotholes[index];
  updateMathEngine(selectedPothole);
  drawCanvasBoundingBox();
}

// REAL-TIME MATH ENGINE
function updateMathEngine(p) {
  const volumeM3 = p.areaSqM * (p.depthCm / 100);
  const polymerMassKg = Math.round(volumeM3 * 2200); // ~2200 kg/m3 asphalt density
  
  const materialCostINR = Math.round(polymerMassKg * 65); // ₹65 per kg cold mix
  const repairHours = Math.round((p.areaSqM * 1.8) * 10) / 10;
  const laborCostINR = Math.round(repairHours * 750); // ₹750/hr
  const machineryCostINR = 3500;
  const totalCostINR = materialCostINR + laborCostINR + machineryCostINR;

  document.getElementById('stat-id').innerText = p.id;
  document.getElementById('stat-severity').innerText = p.severity;
  document.getElementById('stat-area').innerText = `${p.areaSqM} m²`;
  document.getElementById('stat-depth').innerText = `${p.depthCm} cm`;
  document.getElementById('stat-mass').innerText = `${polymerMassKg} kg`;
  document.getElementById('stat-time').innerText = `${repairHours} Hours`;

  document.getElementById('cost-material').innerText = `₹ ${materialCostINR.toLocaleString()}`;
  document.getElementById('cost-labor').innerText = `₹ ${laborCostINR.toLocaleString()}`;
  document.getElementById('cost-machinery').innerText = `₹ ${machineryCostINR.toLocaleString()}`;
  document.getElementById('cost-total').innerText = `₹ ${totalCostINR.toLocaleString()}`;
}

// Draw Vision-AI Canvas Bounding Box
function drawCanvasBoundingBox() {
  const canvas = document.getElementById('vision-ai-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const box = selectedPothole.bbox;
  const x = (box.x / 100) * canvas.width;
  const y = (box.y / 100) * canvas.height;
  const w = (box.w / 100) * canvas.width;
  const h = (box.h / 100) * canvas.height;

  // Bounding box glow
  ctx.strokeStyle = selectedPothole.severity === 'CRITICAL' ? '#f43f5e' : '#10b981';
  ctx.lineWidth = 4;
  ctx.shadowColor = ctx.strokeStyle;
  ctx.shadowBlur = 10;
  ctx.strokeRect(x, y, w, h);

  // Label Box
  ctx.fillStyle = ctx.strokeStyle;
  ctx.fillRect(x, y - 24, w, 24);

  ctx.fillStyle = '#080c16';
  ctx.font = 'bold 12px Outfit, sans-serif';
  ctx.fillText(`${selectedPothole.id} [${selectedPothole.severity}]`, x + 6, y - 8);
}

// Run Vision-AI Scan Simulation
function runVisionAIScan() {
  const statusElem = document.getElementById('ai-scan-status');
  statusElem.innerText = '🎥 Vision-AI Scanning in Progress... Processing Frame Feeds';
  statusElem.style.color = '#06b6d4';

  setTimeout(() => {
    drawCanvasBoundingBox();
    statusElem.innerText = `✅ Detection Complete! Identified ${selectedPothole.id} (${selectedPothole.areaSqM} m²)`;
    statusElem.style.color = '#10b981';
  }, 800);
}

// Generate MIDC Official Work Ticket
function generateWorkTicket() {
  const p = selectedPothole;
  const volumeM3 = p.areaSqM * (p.depthCm / 100);
  const polymerMassKg = Math.round(volumeM3 * 2200);
  const totalCostINR = Math.round(polymerMassKg * 65) + Math.round((p.areaSqM * 1.8) * 750) + 3500;

  const ticketBox = document.getElementById('ticket-result-box');
  const ticketText = document.getElementById('ticket-text-content');

  ticketText.innerText = `
================================================================================
🏢 MAHARASHTRA INDUSTRIAL DEVELOPMENT CORPORATION (MIDC)
ROAD MAINTENANCE WORK ORDER & DISPATCH TICKET
================================================================================
Ticket ID: WT-2026-${p.id}
Generated At: ${new Date().toLocaleString()}
Target Area: Taloja MIDC Industrial Belt (Raigad District)
Specific Location: ${p.location}
GPS Coordinates: Lat ${p.lat}, Lng ${p.lng}

1. AI DEFECT MEASUREMENTS:
   - Severity Level: ${p.severity}
   - Estimated Surface Area: ${p.areaSqM} sq. meters
   - Measured Pothole Depth: ${p.depthCm} cm
   - Traffic Impact Type: ${p.trafficType}

2. MATERIAL & COST ESTIMATION (AUTOMATED):
   - Fast-Curing Polymer Cold-Mix Required: ${polymerMassKg} kg
   - Estimated Fixing Duration: ${Math.round((p.areaSqM * 1.8) * 10) / 10} Hours
   - Material Cost: ₹ ${(Math.round(polymerMassKg * 65)).toLocaleString()}
   - Estimated Total Budget (INR): ₹ ${totalCostINR.toLocaleString()}

3. TRAFFIC-AWARE DISPATCH SCHEDULE:
   - Recommended Dispatch Window: NIGHT SHIFT (11:00 PM – 4:00 AM)
   - Reason: Minimizes daytime 40-tonne container truck gridlock.
   - Polymer Cure Readiness: 30 minutes post-application.

4. 365-DAY QUALITY AUDIT:
   - Recurrence Check Schedule: Day 30, Day 90, Day 365
   - Lead Engineers: Ritesh Singh & Ishant Wankhede
================================================================================
  `;

  ticketBox.style.display = 'block';
  ticketBox.scrollIntoView({ behavior: 'smooth' });
}

function printWorkTicket() {
  const text = document.getElementById('ticket-text-content').innerText;
  const printWin = window.open('', '', 'width=800,height=600');
  printWin.document.write(`<pre style="font-family:monospace; padding:20px;">${text}</pre>`);
  printWin.document.close();
  printWin.print();
}

// Render Methodology Loop
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
