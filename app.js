// PotholeMukt MIDC - Map First App Logic

// Data (same as before)
let leafletMap = null;
let potholeMarkers = [];

const talojaPotholes = [
  { id: 'TAL-96420', location: 'Taloja MIDC Chemical Spine Road (Sector 12)', lat: 19.0685, lng: 73.0842, severity: 'HIGH', areaSqM: 1.45, depthCm: 8.5, bbox: { x: 35, y: 48, w: 32, h: 22 }, trafficType: 'Heavy 40-tonne Container Tankers' },
  { id: 'TAL-96421', location: 'Taloja Industrial Freight Corridor (Sector 18)', lat: 19.0720, lng: 73.0890, severity: 'MEDIUM', areaSqM: 0.85, depthCm: 5.0, bbox: { x: 55, y: 60, w: 25, h: 20 }, trafficType: 'Medium Goods Vehicles' },
  { id: 'TAL-96422', location: 'Taloja MIDC Effluent Access Corridor (Sector 4)', lat: 19.0640, lng: 73.0790, severity: 'CRITICAL', areaSqM: 2.10, depthCm: 11.0, bbox: { x: 20, y: 70, w: 40, h: 22 }, trafficType: 'Heavy Chemical Carriers' }
];

let selectedPothole = talojaPotholes[0];

const proposalTeam = [
  { name: 'Ritesh Singh', title: 'Senior Program Manager', qualification: 'MS Civil Eng', experience: '10 Yrs', role: 'Civil Infra', avatar: '👷‍♂️' },
  { name: 'Ishant Wankhede', title: 'Senior Data Scientist', qualification: 'Lead SPOC', experience: 'AI Eng', role: 'Vision-AI Lead', avatar: '👨‍💻' }
];

const methodologySteps = [
  { step: '01. SCAN', title: 'Fleet Vision-AI Scanning' },
  { step: '02. ESTIMATE', title: 'Automated Cost Engine' },
  { step: '03. SCHEDULE', title: 'Traffic-Smart Dispatch' },
  { step: '04. PATCH', title: '30-Min Rain-Proof Repair' },
  { step: '05. AUDIT', title: '365-Day Quality Tracking' }
];

const timelineMilestones = [
  { num: '01', title: 'Dev & Modification', duration: 'Weeks 1-2' },
  { num: '02', title: 'Install & Setup', duration: 'Week 3' },
  { num: '03', title: 'Test & Calibrate', duration: 'Weeks 4-5' },
  { num: '04', title: 'Pilot Execution', duration: 'Weeks 6-9' },
  { num: '05', title: 'Performance Audit', duration: 'Weeks 10-12' }
];

// On Ready
document.addEventListener('DOMContentLoaded', () => {
  renderInfoContent();
  initTabs();
  updateMathEngine(selectedPothole);
  initLeafletMap();
});

window.dismissSplash = function() {
  document.getElementById('welcome-splash').classList.add('hidden');
}

function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target.getAttribute('data-tab');
      switchTab(target);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  
  const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  if(btn) btn.classList.add('active');
  const pane = document.getElementById(tabId);
  if(pane) pane.classList.add('active');
}

// Leaflet GIS Map Setup
function initLeafletMap() {
  const mapElem = document.getElementById('taloja-gis-map');
  if (!mapElem) return;

  leafletMap = L.map('taloja-gis-map', { zoomControl: false }).setView([19.0685, 73.0842], 14);
  L.control.zoom({ position: 'bottomright' }).addTo(leafletMap);

  // Modern Dark Map tiles (CARTO Dark Matter)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(leafletMap);

  const customIcon = L.divIcon({
    className: 'custom-map-marker',
    html: `<div class="marker-pulse"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  talojaPotholes.forEach((p, idx) => {
    const marker = L.marker([p.lat, p.lng], { icon: customIcon }).addTo(leafletMap);
    
    marker.bindPopup(`
      <div class="map-popup">
        <strong>${p.id}</strong><br>
        <span>Severity: ${p.severity}</span><br>
        <button class="btn btn-sm btn-primary mt-2" onclick="selectPotholeFromMap(${idx})">
          Analyze Diagnostics
        </button>
      </div>
    `);
    potholeMarkers.push(marker);
  });
}

window.selectPotholeFromMap = function(index) {
  selectedPothole = talojaPotholes[index];
  updateMathEngine(selectedPothole);
  drawCanvasBoundingBox();
  switchTab('tab-diagnostics');
}

// Math Engine
function updateMathEngine(p) {
  const volumeM3 = p.areaSqM * (p.depthCm / 100);
  const polymerMassKg = Math.round(volumeM3 * 2200);
  
  const materialCostINR = Math.round(polymerMassKg * 65);
  const repairHours = Math.round((p.areaSqM * 1.8) * 10) / 10;
  const laborCostINR = Math.round(repairHours * 750);
  const machineryCostINR = 3500;
  const totalCostINR = materialCostINR + laborCostINR + machineryCostINR;

  document.getElementById('stat-id').innerText = p.id;
  document.getElementById('stat-severity').innerText = p.severity;
  document.getElementById('stat-area').innerText = `${p.areaSqM} m²`;
  document.getElementById('stat-depth').innerText = `${p.depthCm} cm`;
  document.getElementById('stat-mass').innerText = `${polymerMassKg} kg`;
  document.getElementById('stat-time').innerText = `${repairHours} Hr`;

  document.getElementById('cost-material').innerText = `₹ ${materialCostINR.toLocaleString()}`;
  document.getElementById('cost-labor').innerText = `₹ ${laborCostINR.toLocaleString()}`;
  document.getElementById('cost-machinery').innerText = `₹ ${machineryCostINR.toLocaleString()}`;
  document.getElementById('cost-total').innerText = `₹ ${totalCostINR.toLocaleString()}`;
}

window.runVisionAIScan = function() {
  switchTab('tab-ai');
  const statusElem = document.getElementById('ai-scan-status');
  const scanOverlay = document.getElementById('scan-overlay');
  const progContainer = document.getElementById('scan-progress-container');
  const progBar = document.getElementById('scan-progress');
  const btn = document.getElementById('btn-run-scan');
  
  btn.disabled = true;
  statusElem.innerText = 'Initializing YOLOv8 Inference...';
  statusElem.style.color = 'var(--accent-cyan)';
  scanOverlay.classList.remove('hidden');
  progContainer.classList.remove('hidden');
  
  // Clear canvas for new scan
  const canvas = document.getElementById('vision-ai-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    progBar.style.width = `${progress}%`;
    
    if (progress >= 30 && progress < 70) {
      statusElem.innerText = 'Analyzing Road Surface Texture...';
    } else if (progress >= 70 && progress < 100) {
      statusElem.innerText = 'Extracting Defect Metrics...';
    }
    
    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        scanOverlay.classList.add('hidden');
        progContainer.classList.add('hidden');
        drawCanvasBoundingBox();
        statusElem.innerText = `✅ Detection Complete! ID: ${selectedPothole.id}`;
        statusElem.style.color = 'var(--accent-emerald)';
        document.getElementById('ai-latency').innerText = Math.floor(Math.random() * 15 + 12);
        btn.disabled = false;
        
        setTimeout(() => {
            selectPotholeFromMap(talojaPotholes.indexOf(selectedPothole));
        }, 2000);
      }, 400);
    }
  }, 200);
}

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

  ctx.strokeStyle = selectedPothole.severity === 'CRITICAL' ? '#ef4444' : '#10b981';
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = ctx.strokeStyle;
  ctx.fillRect(x, y - 24, w, 24);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText(selectedPothole.id, x + 4, y - 8);
}

// Work Order Modal
window.generateWorkTicket = function() {
  const p = selectedPothole;
  const volumeM3 = p.areaSqM * (p.depthCm / 100);
  const polymerMassKg = Math.round(volumeM3 * 2200);
  const totalCostINR = Math.round(polymerMassKg * 65) + Math.round((p.areaSqM * 1.8) * 750) + 3500;

  const ticketStr = `
MIDC OFFICIAL WORK ORDER
---------------------------------
Ticket ID: WT-2026-${p.id}
Date: ${new Date().toLocaleString()}
Location: ${p.location}
Coordinates: ${p.lat}, ${p.lng}

[1] DEFECT DETAILS
Severity: ${p.severity}
Area: ${p.areaSqM} m2 | Depth: ${p.depthCm} cm

[2] COST ESTIMATION
Polymer Mass: ${polymerMassKg} kg
Est. Budget: INR ${totalCostINR.toLocaleString()}

[3] DISPATCH
Schedule: NIGHT SHIFT (11 PM - 4 AM)
---------------------------------
  `;
  document.getElementById('ticket-display').innerText = ticketStr;
  document.getElementById('ticket-text-content').innerText = ticketStr;
  document.getElementById('ticket-modal').classList.remove('hidden');
}

window.closeTicketModal = function() {
  document.getElementById('ticket-modal').classList.add('hidden');
}

window.printWorkTicket = function() {
  const text = document.getElementById('ticket-text-content').innerText;
  const printWin = window.open('', '', 'width=600,height=400');
  printWin.document.write(`<pre style="font-family:monospace; padding:20px;">${text}</pre>`);
  printWin.document.close();
  printWin.print();
}

function renderInfoContent() {
  const s = document.getElementById('stepper-container');
  if(s) s.innerHTML = methodologySteps.map(m => `<div class="info-item"><strong>${m.step}</strong>: ${m.title}</div>`).join('');
  
  const t = document.getElementById('team-container');
  if(t) t.innerHTML = proposalTeam.map(m => `<div class="info-item"><strong>${m.name}</strong> (${m.role})<br><small>${m.qualification}</small></div>`).join('');

  const time = document.getElementById('timeline-container');
  if(time) time.innerHTML = timelineMilestones.map(m => `<div class="info-item"><strong>${m.num}. ${m.title}</strong><br><small>${m.duration}</small></div>`).join('');
}
