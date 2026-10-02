// PotholeMukt MIDC - Map First App Logic

// Data (same as before)
let leafletMap = null;
let potholeMarkers = [];

const talojaPotholes = [
  { id: 'TAL-96420', location: 'Taloja MIDC Chemical Spine Road (Sector 12)', lat: 19.0685, lng: 73.0842, severity: 'HIGH', areaSqM: 1.45, depthCm: 8.5, bbox: { x: 35, y: 48, w: 32, h: 22 }, trafficType: 'Heavy 40-tonne Container Tankers' },
  { id: 'TAL-96421', location: 'Taloja Industrial Freight Corridor (Sector 18)', lat: 19.0720, lng: 73.0890, severity: 'MEDIUM', areaSqM: 0.85, depthCm: 5.0, bbox: { x: 55, y: 60, w: 25, h: 20 }, trafficType: 'Medium Goods Vehicles' },
  { id: 'TAL-96422', location: 'Taloja MIDC Effluent Access Corridor (Sector 4)', lat: 19.0640, lng: 73.0790, severity: 'CRITICAL', areaSqM: 2.10, depthCm: 11.0, bbox: { x: 20, y: 70, w: 40, h: 22 }, trafficType: 'Heavy Chemical Carriers' },
  { id: 'TAL-96423', location: 'Taloja MIDC Main Gate (Sector 1)', lat: 19.0620, lng: 73.0780, severity: 'HIGH', areaSqM: 1.20, depthCm: 7.0, bbox: { x: 40, y: 45, w: 20, h: 15 }, trafficType: 'Heavy Commuter & Freight' },
  { id: 'TAL-96424', location: 'Taloja Sector 5 Internal Road', lat: 19.0650, lng: 73.0820, severity: 'MEDIUM', areaSqM: 0.60, depthCm: 3.5, bbox: { x: 50, y: 55, w: 15, h: 10 }, trafficType: 'Light Commercial Vehicles' },
  { id: 'TAL-96425', location: 'Taloja Sector 9 Factory Zone', lat: 19.0665, lng: 73.0810, severity: 'CRITICAL', areaSqM: 2.80, depthCm: 14.5, bbox: { x: 10, y: 65, w: 50, h: 30 }, trafficType: 'Heavy Chemical Carriers' },
  { id: 'TAL-96426', location: 'Taloja Sector 11 Crossroad', lat: 19.0675, lng: 73.0850, severity: 'MEDIUM', areaSqM: 0.90, depthCm: 4.0, bbox: { x: 30, y: 50, w: 25, h: 20 }, trafficType: 'Medium Goods Vehicles' },
  { id: 'TAL-96427', location: 'Taloja Sector 14 Distribution Hub', lat: 19.0700, lng: 73.0830, severity: 'HIGH', areaSqM: 1.75, depthCm: 9.5, bbox: { x: 25, y: 40, w: 35, h: 25 }, trafficType: 'Heavy 40-tonne Container Tankers' },
  { id: 'TAL-96428', location: 'Taloja Sector 20 Logistics Park', lat: 19.0740, lng: 73.0870, severity: 'CRITICAL', areaSqM: 3.10, depthCm: 16.0, bbox: { x: 15, y: 55, w: 60, h: 35 }, trafficType: 'Heavy Multi-Axle Trucks' },
  { id: 'TAL-96429', location: 'Taloja Sector 22 Exit Route', lat: 19.0760, lng: 73.0900, severity: 'HIGH', areaSqM: 1.40, depthCm: 8.0, bbox: { x: 45, y: 60, w: 20, h: 15 }, trafficType: 'Heavy Freight' }
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

let isReportMode = false;
let pendingReportLatLng = null;

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

  renderMarkers('ALL');

  leafletMap.on('click', function(e) {
    if (isReportMode) {
      pendingReportLatLng = e.latlng;
      document.getElementById('report-modal').classList.remove('hidden');
      document.getElementById('report-location-text').innerText = `Capturing coordinates: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`;
      disableReportMode();
    }
  });
}

window.filterPotholes = function(type, btnElem) {
  document.querySelectorAll('.chicklet-bar .chicklet').forEach(b => b.classList.remove('active'));
  if (btnElem) btnElem.classList.add('active');
  renderMarkers(type);
}

function getPotholeImage(severity) {
  if (severity === 'CRITICAL') return 'assets/pothole_critical.jpg';
  if (severity === 'HIGH') return 'assets/pothole_high.jpg';
  return 'assets/pothole_medium.jpg';
}

function renderMarkers(filterType = 'ALL') {
  potholeMarkers.forEach(m => leafletMap.removeLayer(m));
  potholeMarkers = [];

  talojaPotholes.forEach((p) => {
    if (filterType !== 'ALL' && p.severity !== filterType) return;

    const customIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div class="marker-pulse"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const marker = L.marker([p.lat, p.lng], { icon: customIcon }).addTo(leafletMap);
    
    marker.bindPopup(`
      <div class="map-popup">
        <img src="${getPotholeImage(p.severity)}" alt="Pothole Thumbnail" class="map-popup-img">
        <strong>${p.id}</strong>
        <span style="font-size:0.9rem; color:#aaa;">Severity: ${p.severity}</span><br>
        <button class="btn btn-sm btn-primary mt-3" onclick="selectPotholeFromMap('${p.id}')">
          Analyze Diagnostics
        </button>
      </div>
    `);
    potholeMarkers.push(marker);
  });
}

window.selectPotholeFromMap = function(id) {
  selectedPothole = talojaPotholes.find(x => x.id === id);
  if (!selectedPothole) return;
  
  const imgElem = document.getElementById('dashcam-img');
  if (imgElem) {
    imgElem.src = getPotholeImage(selectedPothole.severity);
  }

  updateMathEngine(selectedPothole);
  drawCanvasBoundingBox();
  switchTab('tab-diagnostics');
}

window.enableReportMode = function() {
  isReportMode = true;
  document.getElementById('report-toast').classList.remove('hidden');
  document.getElementById('taloja-gis-map').classList.add('map-report-mode');
}

function disableReportMode() {
  isReportMode = false;
  document.getElementById('report-toast').classList.add('hidden');
  document.getElementById('taloja-gis-map').classList.remove('map-report-mode');
}

window.closeReportModal = function() {
  document.getElementById('report-modal').classList.add('hidden');
}

window.submitPotholeReport = function() {
  const severity = document.getElementById('report-severity').value;
  const newId = 'TAL-' + Math.floor(10000 + Math.random() * 90000);
  
  // Approximate values based on severity
  let area = 1.0, depth = 5.0;
  if (severity === 'CRITICAL') { area = 2.5; depth = 12.0; }
  else if (severity === 'HIGH') { area = 1.5; depth = 8.0; }
  else if (severity === 'MEDIUM') { area = 0.8; depth = 4.0; }

  const newPothole = {
    id: newId,
    location: 'User Reported Location',
    lat: pendingReportLatLng.lat,
    lng: pendingReportLatLng.lng,
    severity: severity,
    areaSqM: area,
    depthCm: depth,
    bbox: { x: 35, y: 50, w: 30, h: 20 },
    trafficType: 'Unknown (Community Report)'
  };

  talojaPotholes.push(newPothole);
  renderMarkers('ALL');
  
  // Reset active filter button to ALL
  document.querySelectorAll('.chicklet-bar .chicklet').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.chicklet-bar .chicklet')[0].classList.add('active');

  closeReportModal();
  selectPotholeFromMap(newId);
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
            selectPotholeFromMap(selectedPothole.id);
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
