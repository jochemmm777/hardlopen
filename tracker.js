// ===== SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

// ===== SUPABASE =====
const SUPABASE_URL = 'https://tbvdpvqteawevfkwknys.supabase.co';
const SUPABASE_KEY = 'sb_publishable_MIkAatqn4V3R813p8RqYmQ_ZzBN3NMb';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ===== PACE COLORS =====
const PACE_COLORS = [
  '#a8f5a0', // 0  > 7:30/km  lichtgroen (langzaam)
  '#60e060', // 1  7:00-7:30
  '#20c040', // 2  6:30-7:00
  '#80cc00', // 3  6:00-6:30  limoen
  '#e0c800', // 4  5:30-6:00  geel
  '#f08000', // 5  5:00-5:30  oranje
  '#e04010', // 6  4:30-5:00  rood-oranje
  '#c00080', // 7  4:00-4:30  roze
  '#8000c0', // 8  3:30-4:00  paars
  '#40007a', // 9  < 3:30/km  donkerpaars (snel)
];
const PACE_LABELS = ['>7:30','7:00','6:30','6:00','5:30','5:00','4:30','4:00','3:30','<3:30'];
// Drempelwaarden in sec/km (hoog = langzaam)
function getPaceColorIdx(secPerKm) {
  if (secPerKm >= 450) return 0;
  if (secPerKm >= 420) return 1;
  if (secPerKm >= 390) return 2;
  if (secPerKm >= 360) return 3;
  if (secPerKm >= 330) return 4;
  if (secPerKm >= 300) return 5;
  if (secPerKm >= 270) return 6;
  if (secPerKm >= 240) return 7;
  if (secPerKm >= 210) return 8;
  return 9;
}

// ===== SCHEMA DATA (minimale kopie voor today-sessie lookup) =====
const TRACKER_WEEKS = [
  // Week 0
  [{t:'rust',d:null},{t:'rust',d:null},{t:'fietsen',d:null},{t:'lopen',d:null},{t:'rust',d:null},{t:'rust',d:null},{t:'lopen',d:null}],
  // Week 1
  [{t:'fietsen',d:null},{t:'lopen',d:'5 km (met wandelen)'},{t:'fietsen',d:null},{t:'lopen',d:'5 km'},{t:'fietsen',d:null},{t:'lopen',d:'5 km'},{t:'fietsen',d:null}],
  // Week 2
  [{t:'fietsen',d:null},{t:'lopen',d:'5 km'},{t:'fietsen',d:null},{t:'lopen',d:'5 km'},{t:'fietsen',d:null},{t:'lopen',d:'6 km'},{t:'fietsen',d:null}],
  // Week 3
  [{t:'fietsen',d:null},{t:'lopen',d:'5 km'},{t:'fietsen',d:null},{t:'lopen',d:'6 km'},{t:'fietsen',d:null},{t:'lopen',d:'7 km'},{t:'fietsen',d:null}],
  // Week 4
  [{t:'fietsen',d:null},{t:'lopen',d:'6 km'},{t:'fietsen',d:null},{t:'lopen',d:'6 km'},{t:'fietsen',d:null},{t:'lopen',d:'8 km'},{t:'fietsen',d:null}],
  // Week 5
  [{t:'fietsen',d:null},{t:'lopen',d:'6 km'},{t:'fietsen',d:null},{t:'lopen',d:'7 km'},{t:'fietsen',d:null},{t:'lopen',d:'9 km'},{t:'fietsen',d:null}],
  // Week 6
  [{t:'fietsen',d:null},{t:'lopen',d:'6 km'},{t:'fietsen',d:null},{t:'lopen',d:'7 km'},{t:'fietsen',d:null},{t:'lopen',d:'10 km'},{t:'fietsen',d:null}],
  // Week 7
  [{t:'fietsen',d:null},{t:'lopen',d:'7 km'},{t:'fietsen',d:null},{t:'lopen',d:'7 km'},{t:'fietsen',d:null},{t:'lopen',d:'12 km'},{t:'fietsen',d:null}],
  // Week 8
  [{t:'fietsen',d:null},{t:'lopen',d:'7 km'},{t:'fietsen',d:null},{t:'lopen',d:'6 km'},{t:'fietsen',d:null},{t:'lopen',d:'14 km'},{t:'fietsen',d:null}],
  // Week 9
  [{t:'fietsen',d:null},{t:'lopen',d:'8 km'},{t:'fietsen',d:null},{t:'lopen',d:'7 km'},{t:'fietsen',d:null},{t:'lopen',d:'15 km'},{t:'fietsen',d:null}],
  // Week 10
  [{t:'fietsen',d:null},{t:'lopen',d:'8 km'},{t:'fietsen',d:null},{t:'lopen',d:'7 km'},{t:'fietsen',d:null},{t:'lopen',d:'17 km'},{t:'fietsen',d:null}],
  // Week 11
  [{t:'fietsen',d:null},{t:'lopen',d:'6 km'},{t:'fietsen',d:null},{t:'lopen',d:'5 km'},{t:'fietsen',d:null},{t:'lopen',d:'18 km'},{t:'fietsen',d:null}],
  // Week 12
  [{t:'fietsen',d:null},{t:'lopen',d:'5 km'},{t:'fietsen',d:null},{t:'lopen',d:'5 km'},{t:'fietsen',d:null},{t:'race',d:'21,1 km'},{t:'fietsen',d:null}],
];

function getTodaySession() {
  const startW1 = new Date(2026, 2, 24); startW1.setHours(0,0,0,0);
  const startW0 = new Date(2026, 2, 19); startW0.setHours(0,0,0,0);
  const today = new Date(); today.setHours(0,0,0,0);
  let week;
  if (today < startW0) return null;
  if (today < startW1) {
    week = 0;
  } else {
    week = Math.min(Math.floor((today - startW1) / 604800000) + 1, 12);
  }
  const dayIdx = (new Date().getDay() + 6) % 7; // Monday=0
  const entry = TRACKER_WEEKS[week]?.[dayIdx];
  if (!entry || (entry.t !== 'lopen' && entry.t !== 'race')) return null;
  const km = entry.d ? parseFloat((entry.d.match(/(\d+(?:,\d+)?)/) || [])[1]?.replace(',', '.')) || null : null;
  return { week, dayIdx, type: entry.t, detail: entry.d, targetKm: km };
}

// ===== STATE =====
let currentUser = null;
let map = null, posMarker = null;
let routePolylines = []; // gekleurde segmenten
let kmMarkers = []; // km-marker divIcons op de kaart
let watchId = null;
let tracking = false, paused = false;
let routeCoords = [], lastPoint = null; // routeCoords: [[lat,lng,colorIdx],...]
let recentPoints = []; // voor 30s smooth pace
let totalDistanceKm = 0;
let lastCompletedKm = 0;
let kmSplitStartTime = null;
let startTime = null, endTime = null, pausedMs = 0, pauseStartTime = null;
let finalElapsedSeconds = 0;
let timerInterval = null;
let wakeLock = null;
let userWeightKg = parseInt(localStorage.getItem('runnerWeight') || '70');
let thinkAbout = '';
let reflectAnswered = null;
let timeOnlyMode = false;
let activityType = 'lopen'; // 'lopen' | 'fietsen'

// ===== AUTH =====
(async () => {
  if (!sessionStorage.getItem('session_active')) {
    await sb.auth.signOut();
  }
  sb.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      sessionStorage.setItem('session_active', '1');
      currentUser = session.user;
      document.getElementById('auth-screen').style.display = 'none';
      document.getElementById('app').style.display = 'block';
      initMap();
    } else {
      sessionStorage.removeItem('session_active');
      document.getElementById('auth-screen').style.display = 'flex';
      document.getElementById('app').style.display = 'none';
    }
  });
})();

window.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('auth-screen').style.display !== 'none') submitAuth();
});

async function submitAuth() {
  const email = document.getElementById('auth-email').value.trim();
  const pw = document.getElementById('auth-password').value;
  const btn = document.getElementById('auth-submit');
  const err = document.getElementById('auth-error');
  if (!email || !pw) { err.textContent = 'Vul e-mail en wachtwoord in.'; return; }
  btn.disabled = true; btn.textContent = '...'; err.textContent = '';
  const { error } = await sb.auth.signInWithPassword({ email, password: pw });
  btn.disabled = false; btn.textContent = 'Inloggen';
  if (error) err.textContent = 'Verkeerd e-mail of wachtwoord.';
}

// ===== MAP =====
function initMap() {
  if (map) { map.invalidateSize(); return; }
  map = L.map('map', { zoomControl: false, attributionControl: true })
    .setView([52.37, 4.9], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>'
  }).addTo(map);

  // Try to center on user's actual location right away
  navigator.geolocation?.getCurrentPosition(
    pos => map.setView([pos.coords.latitude, pos.coords.longitude], 16),
    null,
    { timeout: 8000 }
  );
}

// ===== GPS =====
function startGPS() {
  if (!navigator.geolocation) {
    toast('❌ Geen GPS', 'GPS niet beschikbaar in deze browser.');
    return false;
  }
  watchId = navigator.geolocation.watchPosition(onPosition, onGPSError, {
    enableHighAccuracy: true, maximumAge: 2000, timeout: 15000
  });
  return true;
}

function stopGPS() {
  if (watchId !== null) { navigator.geolocation.clearWatch(watchId); watchId = null; }
}

// ===== BACKGROUND KEEPALIVE =====
async function reacquireWakeLock() {
  if (tracking && !paused && (!wakeLock || wakeLock.released)) {
    try { wakeLock = await navigator.wakeLock?.request('screen'); } catch (e) {}
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') reacquireWakeLock();
});

function onPosition(pos) {
  const { latitude: lat, longitude: lng, accuracy } = pos.coords;
  const now = Date.now();

  // Update GPS accuracy indicator
  const el = document.getElementById('gps-acc');
  if (el) {
    el.textContent = `GPS ±${Math.round(accuracy)}m`;
    el.className = 'gps-acc ' + (accuracy < 20 ? 'gps-good' : accuracy < 50 ? 'gps-ok' : 'gps-bad');
  }

  // Always update position marker
  if (!posMarker) {
    const icon = L.divIcon({
      className: '',
      html: '<div class="pos-marker-icon"></div>',
      iconSize: [18, 18], iconAnchor: [9, 9]
    });
    posMarker = L.marker([lat, lng], { icon }).addTo(map);
  } else {
    posMarker.setLatLng([lat, lng]);
  }

  // If not tracking (or paused), just update map view
  if (!tracking || paused) {
    if (!tracking) map.panTo([lat, lng]);
    return;
  }

  // Filter: too inaccurate
  if (accuracy > 50) return;

  // Filter: implied speed > 20 m/s (72 km/h) = GPS noise
  if (lastPoint) {
    const dist = haversineKm(lastPoint.lat, lastPoint.lng, lat, lng);
    const secs = (now - lastPoint.time) / 1000;
    if (secs > 0 && (dist * 1000) / secs > 20) return;
    // Filter: moved less than 3 meters — not worth adding
    if (dist < 0.003) return;
    totalDistanceKm += dist;

    // Km split check
    const completedKm = Math.floor(totalDistanceKm);
    if (completedKm > lastCompletedKm) {
      const splitMs = now - kmSplitStartTime;
      const splitSecPerKm = splitMs / 1000;
      const splitMin = Math.floor(splitSecPerKm / 60);
      const splitSec = Math.round(splitSecPerKm % 60);
      toast(`🏁 Km ${completedKm}`, `Split: ${splitMin}:${pad(splitSec)} /km`);
      // Km marker op kaart
      const kmIcon = L.divIcon({
        className: '',
        html: `<div class="km-marker">${completedKm}</div>`,
        iconSize: [24, 24], iconAnchor: [12, 12]
      });
      const kmMarker = L.marker([lat, lng], { icon: kmIcon }).addTo(map);
      kmMarkers.push(kmMarker);
      lastCompletedKm = completedKm;
      kmSplitStartTime = now;
    }
  }

  // Bereken smooth pace (30s venster)
  recentPoints.push({ lat, lng, time: now, totalDist: totalDistanceKm });
  recentPoints = recentPoints.filter(p => now - p.time < 30000);
  let smoothedPaceSecPerKm = 999;
  if (recentPoints.length >= 2) {
    const first = recentPoints[0], last = recentPoints[recentPoints.length - 1];
    const d = last.totalDist - first.totalDist;
    const s = (last.time - first.time) / 1000;
    if (d > 0.005) smoothedPaceSecPerKm = s / d;
  }
  const colorIdx = getPaceColorIdx(smoothedPaceSecPerKm);
  const color = PACE_COLORS[colorIdx];

  // Pace alert check
  checkPaceAlert(smoothedPaceSecPerKm);

  lastPoint = { lat, lng, time: now };
  routeCoords.push([lat, lng, colorIdx]);
  map.panTo([lat, lng]);

  // Teken gekleurd segment van vorig punt naar dit punt
  if (routeCoords.length >= 2) {
    const prev = routeCoords[routeCoords.length - 2];
    const seg = L.polyline([[prev[0], prev[1]], [lat, lng]], { color, weight: 6, opacity: 0.9 }).addTo(map);
    routePolylines.push(seg);
  }
}

function onGPSError() {
  if (tracking) toast('⚠️ GPS', 'Signaal verloren...');
}

// ===== HAVERSINE =====
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371, r = Math.PI / 180;
  const dLat = (lat2 - lat1) * r, dLon = (lon2 - lon1) * r;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ===== STATS =====
function elapsed() {
  if (!startTime) return 0;
  if (paused) return (pauseStartTime - startTime - pausedMs) / 1000;
  return (Date.now() - startTime - pausedMs) / 1000;
}

function fmt(secs) {
  secs = Math.max(0, secs);
  const h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = Math.floor(secs % 60);
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }

function calcPace(distKm, secs) {
  if (distKm < 0.01) return '--:--';
  const spk = secs / distKm;
  return `${Math.floor(spk / 60)}:${pad(spk % 60)}`;
}

function calcCalories(distKm) {
  const factor = activityType === 'fietsen' ? 0.5 : 1.036;
  return Math.round(userWeightKg * distKm * factor);
}

function setActivityType(type) {
  activityType = type;
  document.getElementById('act-btn-lopen').classList.toggle('act-active', type === 'lopen');
  document.getElementById('act-btn-fietsen').classList.toggle('act-active', type === 'fietsen');
  updateStats();
}

function updateStats() {
  const e = elapsed();
  document.getElementById('stat-time').textContent = fmt(e);
  // In tijdmodus: afstand nog onbekend (handmatig in te vullen na stop)
  if (tracking && timeOnlyMode && totalDistanceKm === 0) {
    document.getElementById('stat-dist').textContent = '--';
    document.getElementById('stat-pace').textContent = '--:--';
    document.getElementById('stat-cal').textContent = '--';
  } else {
    document.getElementById('stat-dist').textContent = totalDistanceKm.toFixed(2);
    document.getElementById('stat-pace').textContent = calcPace(totalDistanceKm, e);
    document.getElementById('stat-cal').textContent = calcCalories(totalDistanceKm);
  }
}

// ===== CONTROLS =====
function startRun() {
  thinkAbout = '';
  reflectAnswered = null;
  document.getElementById('think-input').value = '';
  setTimeout(() => document.getElementById('think-modal').classList.add('open'), 50);
}

async function beginRun(useInput) {
  document.getElementById('think-modal').classList.remove('open');
  if (useInput) thinkAbout = document.getElementById('think-input').value.trim();

  routePolylines.forEach(p => p.remove());
  routePolylines = [];
  kmMarkers.forEach(m => m.remove());
  kmMarkers = [];
  routeCoords = []; totalDistanceKm = 0; lastPoint = null; recentPoints = [];
  lastCompletedKm = 0; kmSplitStartTime = Date.now();
  pausedMs = 0; pauseStartTime = null;

  // Hide today-session bar when tracking starts
  const tsBar = document.getElementById('today-session-bar');
  if (tsBar) tsBar.style.display = 'none';

  const gpsEl = document.getElementById('gps-acc');
  if (timeOnlyMode) {
    if (gpsEl) { gpsEl.textContent = 'GPS uit (tijdmodus)'; gpsEl.className = 'gps-acc gps-ok'; }
  } else {
    if (!startGPS()) return;
    if (gpsEl) { gpsEl.textContent = 'GPS zoeken...'; gpsEl.className = 'gps-acc gps-bad'; }
  }

  tracking = true; paused = false;
  startTime = Date.now();
  timerInterval = setInterval(updateStats, 1000);

  try { wakeLock = await navigator.wakeLock?.request('screen'); } catch (e) {}

  document.getElementById('controls-idle').style.display = 'none';
  document.getElementById('controls-active').style.display = 'flex';
  toast('🏃 Gestart!', timeOnlyMode ? 'Tijd loopt (geen GPS)...' : 'GPS vergrendelt...');
}

function togglePause() {
  if (!paused) {
    paused = true;
    pauseStartTime = Date.now();
    clearInterval(timerInterval);
    stopGPS();
    document.getElementById('btn-pause').textContent = 'HERVAT';
    toast('⏸ Gepauzeerd', '');
  } else {
    paused = false;
    pausedMs += Date.now() - pauseStartTime;
    pauseStartTime = null;
    startGPS();
    reacquireWakeLock();
    timerInterval = setInterval(updateStats, 1000);
    document.getElementById('btn-pause').textContent = 'PAUZE';
    toast('▶️ Hervat', '');
  }
}

function stopRun() {
  finalElapsedSeconds = elapsed();
  endTime = Date.now();
  tracking = false; paused = false;
  clearInterval(timerInterval);
  stopGPS();
  if (wakeLock) { wakeLock.release(); wakeLock = null; }

  document.getElementById('controls-idle').style.display = 'flex';
  document.getElementById('controls-active').style.display = 'none';

  if (timeOnlyMode) {
    // Toon km-invoer modal
    document.getElementById('manual-dist-input').value = '';
    document.getElementById('manual-dist-modal').classList.add('open');
  } else {
    if (totalDistanceKm < 0.05) {
      toast('⚠️ Te kort', 'Run te kort om op te slaan.');
      resetState();
      return;
    }
    showSummary();
  }
}

function discardManualRun() {
  document.getElementById('manual-dist-modal').classList.remove('open');
  resetState();
}

function confirmManualDistance() {
  const val = parseFloat(document.getElementById('manual-dist-input').value);
  if (!val || val <= 0) {
    toast('⚠️ Ongeldige afstand', 'Vul een getal in, bijv. 5.2');
    return;
  }
  totalDistanceKm = val;
  document.getElementById('manual-dist-modal').classList.remove('open');
  showSummary();
}

// ===== SUMMARY =====
function showSummary() {
  document.getElementById('sum-time').textContent = fmt(finalElapsedSeconds);
  document.getElementById('sum-dist').textContent = totalDistanceKm.toFixed(2) + ' km';
  document.getElementById('sum-pace').textContent = calcPace(totalDistanceKm, finalElapsedSeconds) + ' /km';
  document.getElementById('sum-cal').textContent = calcCalories(totalDistanceKm) + ' kcal';

  const section = document.getElementById('reflect-section');
  if (thinkAbout) {
    document.getElementById('reflect-question').textContent = thinkAbout;
    document.getElementById('reflect-notes').value = '';
    document.getElementById('opt-yes').classList.remove('selected');
    document.getElementById('opt-no').classList.remove('selected');
    reflectAnswered = null;
    section.style.display = 'block';
  } else {
    section.style.display = 'none';
  }

  document.getElementById('summary-modal').classList.add('open');
}

function setAnswered(val) {
  reflectAnswered = val;
  document.getElementById('opt-yes').classList.toggle('selected', val === true);
  document.getElementById('opt-no').classList.toggle('selected', val === false);
}

function discardRun() {
  document.getElementById('summary-modal').classList.remove('open');
  resetState();
}

async function saveRun() {
  const btn = document.getElementById('btn-save-run');
  btn.textContent = 'Opslaan...'; btn.disabled = true;

  const baseData = {
    user_id: currentUser.id,
    started_at: new Date(startTime).toISOString(),
    ended_at: new Date(endTime).toISOString(),
    distance_km: Math.round(totalDistanceKm * 100) / 100,
    duration_seconds: Math.round(finalElapsedSeconds),
    calories: calcCalories(totalDistanceKm),
    avg_pace: calcPace(totalDistanceKm, finalElapsedSeconds),
    route_json: JSON.stringify(routeCoords),
    activity_type: activityType,
  };

  let { error } = await sb.from('runs').insert({
    ...baseData,
    think_about: thinkAbout || null,
    reflection_answered: thinkAbout ? reflectAnswered : null,
    reflection_notes: document.getElementById('reflect-notes').value.trim() || null,
  });

  // Kolommen bestaan nog niet in DB: sla op zonder reflectie-velden
  if (error && error.message?.includes('column')) {
    ({ error } = await sb.from('runs').insert(baseData));
  }

  btn.textContent = 'Opslaan'; btn.disabled = false;

  if (error) { toast('❌ Fout', error.message); return; }

  document.getElementById('summary-modal').classList.remove('open');
  toast('✅ Opgeslagen!', 'Run toegevoegd aan je geschiedenis.');

  // Schema sync offer
  const todaySess = getTodaySession();
  if (todaySess && (todaySess.type === 'lopen' || todaySess.type === 'race')) {
    offerSchemaSync(todaySess.week, todaySess.dayIdx);
  }

  resetState();
}

function resetState() {
  routePolylines.forEach(p => p.remove());
  routePolylines = [];
  kmMarkers.forEach(m => m.remove());
  kmMarkers = [];
  routeCoords = []; totalDistanceKm = 0; lastPoint = null; recentPoints = [];
  lastCompletedKm = 0; kmSplitStartTime = null;
  startTime = null; endTime = null; pausedMs = 0;
  finalElapsedSeconds = 0; thinkAbout = ''; reflectAnswered = null;
  activityType = 'lopen';
  setActivityType('lopen');
  updateStats();
  // Re-show today-session bar
  renderTodaySession();
}

// ===== HISTORY =====
async function openHistory() {
  document.getElementById('history-modal').classList.add('open');
  const list = document.getElementById('history-list');
  list.innerHTML = '<div class="hist-loading">Laden...</div>';

  const { data, error } = await sb.from('runs')
    .select('started_at, distance_km, duration_seconds, avg_pace, calories, activity_type')
    .eq('user_id', currentUser.id)
    .order('started_at', { ascending: false })
    .limit(30);

  if (error || !data?.length) {
    list.innerHTML = '<div class="hist-empty">Nog geen runs opgeslagen.</div>';
    return;
  }

  list.innerHTML = data.map(run => {
    const date = new Date(run.started_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
    const time = new Date(run.started_at).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
    const actIcon = run.activity_type === 'fietsen' ? '🚴' : '🏃';
    const actLabel = run.activity_type === 'fietsen' ? 'Fietsen' : 'Hardlopen';
    return `<div class="hist-item">
      <div class="hist-date">${actIcon} ${actLabel} · ${date} · ${time}</div>
      <div class="hist-stats">
        <span>${run.distance_km.toFixed(2)} km</span>
        <span>${fmt(run.duration_seconds)}</span>
        <span>${run.avg_pace} /km</span>
        <span>${run.calories} kcal</span>
      </div>
    </div>`;
  }).join('');
}

function closeHistory() {
  document.getElementById('history-modal').classList.remove('open');
}

// ===== WEIGHT =====
function openWeightModal() {
  document.getElementById('weight-input').value = userWeightKg;
  document.getElementById('weight-modal').classList.add('open');
}

function closeWeightModal() {
  document.getElementById('weight-modal').classList.remove('open');
}

function saveWeight() {
  const w = parseInt(document.getElementById('weight-input').value);
  if (w >= 30 && w <= 300) {
    userWeightKg = w;
    localStorage.setItem('runnerWeight', w);
    document.getElementById('weight-val').textContent = w;
    updateStats();
  }
  closeWeightModal();
}

// ===== TODAY SESSION BAR =====
function renderTodaySession() {
  const bar = document.getElementById('today-session-bar');
  if (!bar) return;
  const sess = getTodaySession();
  if (!sess) { bar.style.display = 'none'; return; }
  const typeLabel = sess.type === 'race' ? '🏅 Race' : '🏃 Lopen';
  const kmText = sess.targetKm ? ` — ${sess.targetKm} km` : '';
  bar.innerHTML = `<span class="ts-label">Vandaag gepland:</span> <span class="ts-type">${typeLabel}</span><span class="ts-detail">${kmText}</span>`;
  bar.style.display = 'flex';
}

// ===== SCHEMA SYNC =====
function offerSchemaSync(week, dayIdx) {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div'); t.className = 'toast';
  t.innerHTML = `<div class="toast-icon">📅</div><div style="flex:1"><div class="toast-title">Schema bijwerken?</div><div class="toast-msg">Wil je dit ook in je trainingsschema markeren?</div><button class="toast-sync-btn" onclick="syncToSchema(${week},${dayIdx},this)">Ja, markeer</button></div><button class="toast-close">✕</button>`;
  c.appendChild(t);
  function dismiss() { t.classList.add('out'); setTimeout(() => t.remove(), 280); }
  t.querySelector('.toast-close').addEventListener('click', dismiss);
  setTimeout(dismiss, 8000);
}

async function syncToSchema(week, dayIdx, btn) {
  if (btn) { btn.disabled = true; btn.textContent = '...'; }
  const distKm = Math.round(totalDistanceKm * 100) / 100 || Math.round(finalElapsedSeconds > 0 ? finalElapsedSeconds / 360 : 0);
  const { error } = await sb.from('progress').upsert({
    user_id: currentUser.id,
    week,
    day_index: dayIdx,
    done: true,
    km: distKm,
  }, { onConflict: 'user_id,week,day_index' });
  if (error) { toast('❌ Fout', error.message); }
  else { toast('✅ Schema bijgewerkt!', `Week ${week + 1}, dag ${dayIdx + 1} gemarkeerd.`); }
  // Remove the offer toast
  if (btn) btn.closest('.toast')?.remove();
}

// ===== GPX EXPORT =====
function downloadGPX() {
  if (!routeCoords.length) { toast('⚠️ Geen route', 'Nog geen GPS-punten opgenomen.'); return; }
  const runName = startTime ? new Date(startTime).toISOString() : new Date().toISOString();
  const trkpts = routeCoords.map(([lat, lng]) =>
    `      <trkpt lat="${lat.toFixed(7)}" lon="${lng.toFixed(7)}"/>`
  ).join('\n');
  const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Hardloop Tracker" xmlns="http://www.topografix.com/GPX/1/1">
  <trk>
    <name>${runName}</name>
    <trkseg>
${trkpts}
    </trkseg>
  </trk>
</gpx>`;
  const blob = new Blob([gpx], { type: 'application/gpx+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `run_${runName.slice(0, 10)}.gpx`;
  a.click();
  URL.revokeObjectURL(url);
}

// ===== MANUAL LOG =====
function openManualLog() {
  // Standaard op vandaag
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  document.getElementById('ml-date').value = `${yyyy}-${mm}-${dd}`;
  document.getElementById('ml-time').value = '09:00';
  document.getElementById('ml-dist').value = '';
  document.getElementById('ml-dur-h').value = '';
  document.getElementById('ml-dur-m').value = '';
  document.getElementById('ml-dur-s').value = '';
  document.getElementById('manual-log-modal').classList.add('open');
}

function closeManualLog() {
  document.getElementById('manual-log-modal').classList.remove('open');
}

async function saveManualLog() {
  const dateVal = document.getElementById('ml-date').value;
  const timeVal = document.getElementById('ml-time').value || '00:00';
  const dist = parseFloat(document.getElementById('ml-dist').value);
  const h = parseInt(document.getElementById('ml-dur-h').value) || 0;
  const m = parseInt(document.getElementById('ml-dur-m').value) || 0;
  const s = parseInt(document.getElementById('ml-dur-s').value) || 0;
  const durSecs = h * 3600 + m * 60 + s;
  const manualActivity = document.getElementById('ml-activity').value || 'lopen';

  if (!dateVal) { toast('⚠️ Datum', 'Vul een datum in.'); return; }
  if (!dist || dist <= 0) { toast('⚠️ Afstand', 'Vul een geldige afstand in.'); return; }
  if (durSecs <= 0) { toast('⚠️ Duur', 'Vul een geldige duur in.'); return; }

  const startedAt = new Date(`${dateVal}T${timeVal}:00`);
  const endedAt = new Date(startedAt.getTime() + durSecs * 1000);

  const btn = document.querySelector('#manual-log-modal .btn-save');
  btn.disabled = true; btn.textContent = 'Opslaan...';

  const calFactor = manualActivity === 'fietsen' ? 0.5 : 1.036;
  const baseData = {
    user_id: currentUser.id,
    started_at: startedAt.toISOString(),
    ended_at: endedAt.toISOString(),
    distance_km: Math.round(dist * 100) / 100,
    duration_seconds: durSecs,
    calories: Math.round(userWeightKg * dist * calFactor),
    avg_pace: calcPace(dist, durSecs),
    route_json: JSON.stringify([]),
    activity_type: manualActivity,
  };

  let { error } = await sb.from('runs').insert({
    ...baseData,
    think_about: null,
    reflection_answered: null,
    reflection_notes: null,
  });
  if (error && error.message?.includes('column')) {
    ({ error } = await sb.from('runs').insert(baseData));
  }

  btn.disabled = false; btn.textContent = 'Opslaan';

  if (error) { toast('❌ Fout', error.message); return; }

  closeManualLog();
  const pace = calcPace(dist, durSecs);
  toast('✅ Opgeslagen!', `${dist} km · ${fmt(durSecs)} · ${pace} /km`);
}

// ===== TIME-ONLY MODE TOGGLE =====
function toggleTimeOnlyMode() {
  timeOnlyMode = !timeOnlyMode;
  const btn = document.getElementById('btn-timeonly');
  if (btn) {
    btn.textContent = timeOnlyMode ? '⏱ Tijdmodus AAN' : '⏱ Tijdmodus UIT';
    btn.classList.toggle('timeonly-active', timeOnlyMode);
  }
}

// ===== PACE ALERTS =====
let paceAlertEnabled = false;
let targetPaceSecPerKm = 390; // default 6:30/km
let paceAlertTolerance = 30; // ±30 sec/km
let lastPaceAlertTime = 0;
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playBeep(freq, duration, volume = 0.4) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch(e) {}
}

function checkPaceAlert(smoothedPaceSecPerKm) {
  if (!paceAlertEnabled || !tracking || paused) return;
  if (smoothedPaceSecPerKm >= 900) return; // geen betrouwbare pace
  const now = Date.now();
  if (now - lastPaceAlertTime < 15000) return; // max 1x per 15 sec

  const diff = smoothedPaceSecPerKm - targetPaceSecPerKm;
  if (diff > paceAlertTolerance) {
    // Te langzaam: laag piepje (2x)
    playBeep(330, 0.4);
    setTimeout(() => playBeep(330, 0.4), 500);
    lastPaceAlertTime = now;
    toast('🐢 Te langzaam', `Tempo: ${Math.floor(smoothedPaceSecPerKm/60)}:${pad(Math.round(smoothedPaceSecPerKm%60))} — doel ${Math.floor(targetPaceSecPerKm/60)}:${pad(Math.round(targetPaceSecPerKm%60))} /km`, 2500);
  } else if (diff < -paceAlertTolerance) {
    // Te snel: hoog piepje (3x)
    playBeep(880, 0.3);
    setTimeout(() => playBeep(880, 0.3), 350);
    setTimeout(() => playBeep(880, 0.3), 700);
    lastPaceAlertTime = now;
    toast('⚡ Te snel!', `Tempo: ${Math.floor(smoothedPaceSecPerKm/60)}:${pad(Math.round(smoothedPaceSecPerKm%60))} — doe wat rustiger`, 2500);
  }
}

function openPaceAlertModal() {
  const modal = document.getElementById('pace-alert-modal');
  if (!modal) return;
  document.getElementById('pa-target-min').value = Math.floor(targetPaceSecPerKm / 60);
  document.getElementById('pa-target-sec').value = Math.round(targetPaceSecPerKm % 60);
  document.getElementById('pa-tolerance').value = paceAlertTolerance;
  document.getElementById('pa-enabled').checked = paceAlertEnabled;
  modal.classList.add('open');
  document.getElementById('pace-alert-overlay').classList.add('open');
}

function closePaceAlertModal() {
  document.getElementById('pace-alert-modal').classList.remove('open');
  document.getElementById('pace-alert-overlay').classList.remove('open');
}

function savePaceAlerts() {
  const min = parseInt(document.getElementById('pa-target-min').value) || 6;
  const sec = parseInt(document.getElementById('pa-target-sec').value) || 30;
  paceAlertTolerance = parseInt(document.getElementById('pa-tolerance').value) || 30;
  paceAlertEnabled = document.getElementById('pa-enabled').checked;
  targetPaceSecPerKm = min * 60 + sec;
  localStorage.setItem('paceAlertEnabled', paceAlertEnabled ? '1' : '0');
  localStorage.setItem('paceAlertTargetSec', targetPaceSecPerKm);
  localStorage.setItem('paceAlertTolerance', paceAlertTolerance);
  closePaceAlertModal();
  updatePaceAlertBtn();
  toast('✅ Instellingen opgeslagen', paceAlertEnabled ? `Piepjes aan — doel: ${min}:${pad(sec)} /km` : 'Piepjes uitgeschakeld');
}

function updatePaceAlertBtn() {
  const btn = document.getElementById('btn-pace-alert');
  if (!btn) return;
  btn.textContent = paceAlertEnabled ? '🔔 Piepjes AAN' : '🔕 Piepjes UIT';
  btn.classList.toggle('pace-alert-active', paceAlertEnabled);
}

// Laad opgeslagen waarden
paceAlertEnabled = localStorage.getItem('paceAlertEnabled') === '1';
targetPaceSecPerKm = parseInt(localStorage.getItem('paceAlertTargetSec') || '390');
paceAlertTolerance = parseInt(localStorage.getItem('paceAlertTolerance') || '30');

// Init weight display
document.getElementById('weight-val').textContent = userWeightKg;

// Init today-session bar on load
document.addEventListener('DOMContentLoaded', () => {
  renderTodaySession();
  updatePaceAlertBtn();
});
// Also call directly in case DOM is already ready
renderTodaySession();
updatePaceAlertBtn();

// ===== TOAST =====
function toast(title, msg, dur = 3000) {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div'); t.className = 'toast';
  const icon = title.match(/[\u{1F300}-\u{1FFFF}]/u)?.[0] || 'ℹ️';
  t.innerHTML = `<div class="toast-icon">${icon}</div><div><div class="toast-title">${title.replace(/[\u{1F300}-\u{1FFFF}]/gu, '').trim()}</div>${msg ? `<div class="toast-msg">${msg}</div>` : ''}</div>`;
  c.appendChild(t);
  function dismiss() { t.classList.add('out'); setTimeout(() => t.remove(), 280); }
  setTimeout(dismiss, dur);
}
