// ===== SUPABASE INIT =====
const SUPABASE_URL = 'https://tbvdpvqteawevfkwknys.supabase.co';
const SUPABASE_KEY = 'sb_publishable_MIkAatqn4V3R813p8RqYmQ_ZzBN3NMb';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ===== SCHEMA (exact uit PDF) =====
const BASE_WEEKS = [
  // Week 0 — opwarmer (19–23 maart 2026)
  [{day:'Maandag',type:'rust',sessions:[]},
   {day:'Dinsdag',type:'rust',sessions:[]},
   {day:'Woensdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Donderdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'Rustig uitproberen'}]},
   {day:'Vrijdag',type:'rust',sessions:[]},
   {day:'Zaterdag',type:'rust',sessions:[]},
   {day:'Zondag',type:'lopen',sessions:[{name:'Hardlopen',detail:'Rustig uitproberen'}]}],
  [{day:'Maandag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Dinsdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'5 km (met wandelen)'}]},
   {day:'Woensdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Donderdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'5 km'}]},
   {day:'Vrijdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Zaterdag',type:'lopen',sessions:[{name:'Lange duurloop',detail:'5 km'}]},
   {day:'Zondag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]}],
  [{day:'Maandag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Dinsdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'5 km'}]},
   {day:'Woensdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Donderdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'5 km'}]},
   {day:'Vrijdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Zaterdag',type:'lopen',sessions:[{name:'Lange duurloop',detail:'6 km'}]},
   {day:'Zondag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]}],
  [{day:'Maandag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Dinsdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'5 km'}]},
   {day:'Woensdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Donderdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'6 km'}]},
   {day:'Vrijdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Zaterdag',type:'lopen',sessions:[{name:'Lange duurloop',detail:'7 km'}]},
   {day:'Zondag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]}],
  [{day:'Maandag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Dinsdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'6 km'}]},
   {day:'Woensdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Donderdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'6 km'}]},
   {day:'Vrijdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Zaterdag',type:'lopen',sessions:[{name:'Lange duurloop',detail:'8 km'}]},
   {day:'Zondag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]}],
  [{day:'Maandag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Dinsdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'6 km'}]},
   {day:'Woensdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Donderdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'7 km'}]},
   {day:'Vrijdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Zaterdag',type:'lopen',sessions:[{name:'Lange duurloop',detail:'9 km'}]},
   {day:'Zondag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]}],
  [{day:'Maandag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Dinsdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'6 km'}]},
   {day:'Woensdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Donderdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'7 km'}]},
   {day:'Vrijdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Zaterdag',type:'lopen',sessions:[{name:'Lange duurloop',detail:'10 km'}]},
   {day:'Zondag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]}],
  [{day:'Maandag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Dinsdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'7 km'}]},
   {day:'Woensdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Donderdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'7 km'}]},
   {day:'Vrijdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Zaterdag',type:'lopen',sessions:[{name:'Lange duurloop',detail:'12 km'}]},
   {day:'Zondag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]}],
  [{day:'Maandag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Dinsdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'7 km'}]},
   {day:'Woensdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Donderdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'6 km'}]},
   {day:'Vrijdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Zaterdag',type:'lopen',sessions:[{name:'Lange duurloop',detail:'14 km'}]},
   {day:'Zondag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]}],
  [{day:'Maandag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Dinsdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'8 km'}]},
   {day:'Woensdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Donderdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'7 km'}]},
   {day:'Vrijdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Zaterdag',type:'lopen',sessions:[{name:'Lange duurloop',detail:'15 km'}]},
   {day:'Zondag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]}],
  [{day:'Maandag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Dinsdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'8 km'}]},
   {day:'Woensdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Donderdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'7 km'}]},
   {day:'Vrijdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Zaterdag',type:'lopen',sessions:[{name:'Lange duurloop',detail:'17 km'}]},
   {day:'Zondag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]}],
  [{day:'Maandag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Dinsdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'6 km'}]},
   {day:'Woensdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Donderdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'5 km'}]},
   {day:'Vrijdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Zaterdag',type:'lopen',sessions:[{name:'Lange duurloop',detail:'18 km'}]},
   {day:'Zondag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]}],
  [{day:'Maandag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Dinsdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'5 km'}]},
   {day:'Woensdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Donderdag',type:'lopen',sessions:[{name:'Hardlopen',detail:'5 km'}]},
   {day:'Vrijdag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]},
   {day:'Zaterdag',type:'race',sessions:[{name:'🏅 HALVE MARATHON',detail:'21,1 km — finish!'}]},
   {day:'Zondag',type:'fietsen',sessions:[{name:'Fietsen',detail:'20–60 min rustig'}]}],
];

const START_DATE = new Date(2026, 2, 24); // 24 maart 2026 = week 1 maandag

function getDayDate(week, dayIndex) {
  const d = new Date(START_DATE);
  d.setDate(d.getDate() + (week - 1) * 7 + dayIndex);
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' });
}

function getSmartDate(week, dayIndex) {
  const d = new Date(START_DATE);
  d.setDate(d.getDate() + (week - 1) * 7 + dayIndex);
  const today = new Date(); today.setHours(0,0,0,0);
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const target = new Date(d); target.setHours(0,0,0,0);
  if (target.getTime() === today.getTime()) return 'Vandaag';
  if (target.getTime() === tomorrow.getTime()) return 'Morgen';
  return d.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' });
}

const PHASES = {0:'Opwarmer',1:'Weken 1–4',2:'Weken 1–4',3:'Weken 1–4',4:'Weken 1–4',5:'Weken 5–8',6:'Weken 5–8',7:'Weken 5–8',8:'Weken 5–8',9:'Weken 9–12',10:'Weken 9–12',11:'Weken 9–12',12:'Weken 9–12'};
const COMP_EX = [['🔥 YES!','Weer een stap richting de finish!'],['💪 LEKKER!','Zo ga je dat, Jochem!'],['✅ GEDAAN!','Elke kilometer telt.'],['⚡ BOOM!','Rustig tempo is de sleutel!']];
const COMP_DAY = [['🎉 DAG VOLTOOID!','Jochem pakt het helemaal af!'],['🏅 KLAAR!','Zo bouw je een halve marathon op!'],['💥 DONE!','De finish komt dichterbij!']];

// ===== STATE =====
let currentUser = null;
let currentWeek = parseInt(localStorage.getItem('currentWeek') ?? '0') || 0;
let dbState = {}; // { 'w1_d0': { done, km, gevoel, sessions_json } }
let localSchedule = {}; // overridden sessions per week/day
let authMode = 'login';
let dragItem = null, dragSrc = null;
let userProfile = {};
let pendingAvatarFile = null;

// ===== PROFILE & THEME =====
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const btnDark = document.getElementById('btn-theme-dark');
  const btnLight = document.getElementById('btn-theme-light');
  if (btnDark) btnDark.classList.toggle('active', theme === 'dark');
  if (btnLight) btnLight.classList.toggle('active', theme === 'light');
}

async function loadProfile() {
  if (!currentUser) return;
  const { data } = await sb.from('profiles').select('*').eq('user_id', currentUser.id).single();
  userProfile = data || {};
  applyTheme(userProfile.theme || localStorage.getItem('theme') || 'dark');
  renderHeaderAvatar();
}

function renderHeaderAvatar() {
  const btn = document.getElementById('header-avatar');
  if (!btn) return;
  const name = userProfile.name || currentUser?.email?.split('@')[0] || '?';
  if (userProfile.avatar_url) {
    btn.innerHTML = `<img src="${userProfile.avatar_url}" style="width:100%;height:100%;object-fit:cover">`;
  } else {
    btn.textContent = name[0].toUpperCase();
  }
}

function openSettings() {
  document.getElementById('settings-panel').classList.add('open');
  document.getElementById('settings-overlay').classList.add('open');
  document.getElementById('sp-name').value = userProfile.name || '';
  document.getElementById('sp-status').value = userProfile.status || '';
  pendingAvatarFile = null;
  renderSettingsAvatar(userProfile.avatar_url || null);
  applyTheme(localStorage.getItem('theme') || 'dark');
}

function closeSettings() {
  document.getElementById('settings-panel').classList.remove('open');
  document.getElementById('settings-overlay').classList.remove('open');
  pendingAvatarFile = null;
}

function renderSettingsAvatar(src) {
  const el = document.getElementById('sp-avatar-preview');
  if (!el) return;
  if (src) {
    el.innerHTML = `<img src="${src}" style="width:100%;height:100%;object-fit:cover">`;
  } else {
    const name = userProfile.name || currentUser?.email?.split('@')[0] || '?';
    el.textContent = name[0].toUpperCase();
  }
}

function setTheme(theme) { applyTheme(theme); }

function previewAvatar(input) {
  const file = input.files[0];
  if (!file) return;
  resizeImageToBlob(file).then(blob => {
    pendingAvatarFile = blob;
    renderSettingsAvatar(URL.createObjectURL(blob));
  });
}

function resizeImageToBlob(file) {
  return new Promise(resolve => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 200; canvas.height = 200;
      const ctx = canvas.getContext('2d');
      const min = Math.min(img.width, img.height);
      ctx.drawImage(img, (img.width - min) / 2, (img.height - min) / 2, min, min, 0, 0, 200, 200);
      URL.revokeObjectURL(url);
      canvas.toBlob(resolve, 'image/jpeg', 0.8);
    };
    img.src = url;
  });
}

async function deleteAccount() {
  const btn = document.querySelector('.sp-delete-confirm-btn');
  btn.textContent = 'Bezig...';
  btn.disabled = true;
  const { error } = await sb.rpc('delete_account');
  if (error) {
    btn.textContent = 'Ja, verwijder mijn account';
    btn.disabled = false;
    toast('❌ Fout', 'Kon account niet verwijderen: ' + error.message);
    return;
  }
  logout();
}

async function saveProfile() {
  const name = document.getElementById('sp-name').value.trim();
  const status = document.getElementById('sp-status').value.trim();
  const btn = document.querySelector('.sp-save-btn');
  btn.textContent = 'Opslaan...';
  btn.disabled = true;
  const updates = { ...userProfile, name: name || userProfile.name, status, theme: localStorage.getItem('theme') || 'dark' };

  if (pendingAvatarFile) {
    const path = `${currentUser.id}/avatar.jpg`;
    const { error: uploadErr } = await sb.storage.from('avatars').upload(path, pendingAvatarFile, { upsert: true, contentType: 'image/jpeg' });
    if (uploadErr) {
      toast('❌ Foto fout', uploadErr.message);
    } else {
      const { data: urlData } = sb.storage.from('avatars').getPublicUrl(path);
      updates.avatar_url = urlData.publicUrl + '?t=' + Date.now();
    }
  }

  const row = {
    user_id: currentUser.id,
    name: updates.name || null,
    status: updates.status || null,
    theme: updates.theme || 'dark',
    avatar_url: updates.avatar_url || userProfile.avatar_url || null,
  };
  const { error } = await sb.from('profiles').upsert(row, { onConflict: 'user_id' });
  btn.textContent = 'Opslaan';
  btn.disabled = false;
  if (error) { toast('❌ Fout', error.message); return; }
  userProfile = row;
  pendingAvatarFile = null;
  renderHeaderAvatar();
  closeSettings();
  toast('✅ Opgeslagen!', 'Je profiel is bijgewerkt.');
}

// ===== AUTH =====
function switchTab(mode) {
  authMode = mode;
  document.querySelectorAll('.auth-tab').forEach((t,i) => t.classList.toggle('active', (i===0&&mode==='login')||(i===1&&mode==='register')));
  document.getElementById('auth-name-wrap').style.display = mode === 'register' ? 'block' : 'none';
  document.getElementById('auth-submit').textContent = mode === 'login' ? 'Inloggen' : 'Account aanmaken';
  document.getElementById('auth-error').textContent = '';
}

async function submitAuth() {
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  const btn = document.getElementById('auth-submit');
  const err = document.getElementById('auth-error');
  if (!email || !password) { err.textContent = 'Vul je e-mail en wachtwoord in.'; return; }
  btn.disabled = true;
  btn.textContent = '...';
  err.textContent = '';
  let result;
  if (authMode === 'register') {
    const name = document.getElementById('auth-name').value.trim();
    result = await sb.auth.signUp({ email, password, options: { data: { name: name || email.split('@')[0] } } });
  } else {
    result = await sb.auth.signInWithPassword({ email, password });
  }
  btn.disabled = false;
  btn.textContent = authMode === 'login' ? 'Inloggen' : 'Account aanmaken';
  if (result.error) {
    const msgs = {
      'Invalid login credentials': 'Verkeerd e-mail of wachtwoord.',
      'Email not confirmed': 'Bevestig je e-mail eerst.',
      'User already registered': 'Dit e-mailadres is al in gebruik.',
    };
    err.textContent = msgs[result.error.message] || result.error.message;
  } else if (authMode === 'register' && result.data?.user && !result.data.session) {
    err.style.color = 'var(--green)';
    err.textContent = 'Check je inbox om je account te bevestigen!';
  }
}

function logout() {
  sessionStorage.removeItem('session_active');
  Object.keys(localStorage).forEach(k => { if (k.startsWith('sb-')) localStorage.removeItem(k); });
  location.reload();
}

// ===== DB =====
async function loadState() {
  if (!currentUser) return;
  const { data } = await sb.from('progress').select('*').eq('user_id', currentUser.id);
  dbState = {};
  if (data) data.forEach(row => {
    const key = `w${row.week}_d${row.day_index}`;
    dbState[key] = { done: row.done, km: row.km, gevoel: row.gevoel, sessions_json: row.sessions_json };
  });
}

async function saveRow(week, dayIdx, patch) {
  const key = `w${week}_d${dayIdx}`;
  dbState[key] = { ...dbState[key], ...patch };
  const row = {
    user_id: currentUser.id,
    week, day_index: dayIdx,
    done: dbState[key].done || false,
    km: dbState[key].km || null,
    gevoel: dbState[key].gevoel || null,
    sessions_json: dbState[key].sessions_json || null,
  };
  await sb.from('progress').upsert(row, { onConflict: 'user_id,week,day_index' });
}

function getDs(week, dayIdx) {
  return dbState[`w${week}_d${dayIdx}`] || {};
}

function getSessions(week, dayIdx) {
  const ds = getDs(week, dayIdx);
  if (ds.sessions_json) {
    try { return JSON.parse(ds.sessions_json); } catch(e) {}
  }
  return JSON.parse(JSON.stringify(BASE_WEEKS[week][dayIdx].sessions));
}

// ===== RENDER =====
function render() {
  renderWeekNav();
  renderProgress();
  renderOverall();
  renderDots();
  renderDays();
  renderStreak();
}

function renderWeekNav() {
  document.getElementById('week-label').textContent = currentWeek === 0 ? 'WEEK 0' : 'WEEK ' + currentWeek;
  document.getElementById('week-phase').textContent = PHASES[currentWeek];
  document.getElementById('week-counter').textContent = currentWeek === 0 ? '0 / 12' : currentWeek + ' / 12';
  document.getElementById('btn-prev').disabled = currentWeek <= 0;
  document.getElementById('btn-next').disabled = currentWeek >= 12;
}

function renderProgress() {
  const week = BASE_WEEKS[currentWeek];
  const active = week.filter(d => d.type !== 'fietsen' && d.type !== 'rust');
  const done = active.filter((d, _) => getDs(currentWeek, week.indexOf(d)).done);
  const pct = active.length ? Math.round(done.length / active.length * 100) : 0;
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('prog-fraction').textContent = done.length + ' / ' + active.length + ' sessies';
}

function renderOverall() {
  let total = 0, done = 0;
  for (let w = 1; w <= 12; w++) {
    BASE_WEEKS[w].forEach((d, i) => {
      if (d.type === 'fietsen' || d.type === 'rust') return;
      total++;
      if (getDs(w, i).done) done++;
    });
  }
  const pct = total ? Math.round(done / total * 100) : 0;
  document.getElementById('ov-fill').style.width = pct + '%';
  document.getElementById('ov-pct').textContent = pct + '%';
}

function renderDots() {
  const c = document.getElementById('week-dots');
  c.innerHTML = '';
  for (let w = 1; w <= 12; w++) {
    const g = document.createElement('div'); g.className = 'wdg';
    const lbl = document.createElement('div'); lbl.className = 'wdg-lbl'; lbl.textContent = 'W' + w;
    const row = document.createElement('div'); row.className = 'wdg-row';
    BASE_WEEKS[w].forEach((d, i) => {
      const dot = document.createElement('div'); dot.className = 'dot';
      if (d.type === 'fietsen' || d.type === 'rust') dot.classList.add('idle');
      else if (getDs(w, i).done) dot.classList.add('done');
      else if (w === currentWeek) dot.classList.add('cur');
      row.appendChild(dot);
    });
    g.appendChild(lbl); g.appendChild(row); c.appendChild(g);
  }
}

function renderDays() {
  const week = BASE_WEEKS[currentWeek];
  const grid = document.getElementById('days-grid');
  grid.innerHTML = '';

  week.forEach((day, di) => {
    const ds = getDs(currentWeek, di);
    const sessions = getSessions(currentWeek, di);
    const card = document.createElement('div');
    card.className = 'day-card' + (ds.done ? ' done-card' : '') + (day.type === 'race' ? ' race-card' : '');
    card.dataset.dayIdx = di;

    const tagClass = { lopen: 'tag-lopen', fietsen: 'tag-fietsen', race: 'tag-race' }[day.type] || '';
    const tagLabel = { lopen: 'Hardlopen', fietsen: 'Fietsen', race: 'Race!', rust: 'Rust' }[day.type] || day.type;

    let bodyHTML = '';

    if (day.type === 'rust') {
      bodyHTML = `<div class="rest-body">
        <div class="rest-icon">😴</div>
        <div>Rustdag</div>
        <div style="font-size:0.7rem;margin-top:0.2rem;color:#555;">Herstel is ook training</div>
      </div>`;
    } else if (day.type === 'fietsen') {
      bodyHTML = `<div class="rest-body">
        <div class="rest-icon">🚴</div>
        <div>${sessions[0]?.detail || '20–60 min rustig'}</div>
        <div style="font-size:0.7rem;margin-top:0.2rem;color:#555;">Herstel, niet slopen</div>
        <button class="complete-btn${ds.done ? ' done' : ''}" onclick="toggleDone(${di})">${ds.done ? '✓ Gefietst!' : 'Markeer als gedaan'}</button>
      </div>`;
    } else {
      const gevoel = ds.gevoel || '';
      const sessionsHTML = sessions.map((s, si) => `
        <div class="session-item${ds.done ? ' done-session' : ''}" 
             draggable="true"
             data-day="${di}" data-session="${si}"
             id="session-${di}-${si}">
          <span class="drag-handle">⠿</span>
          <div class="session-check${ds.done ? ' checked' : ''}" onclick="toggleDone(${di}); event.stopPropagation();">${ds.done ? '✓' : ''}</div>
          <div class="session-info">
            <div class="session-name">${s.name}</div>
            <div class="session-detail">${s.detail}</div>
          </div>
          <button class="session-edit-btn" onclick="openEdit(${di},${si}); event.stopPropagation();">✏️</button>
        </div>
        <div class="session-edit-form" id="edit-form-${di}-${si}">
          <input class="edit-input" type="text" placeholder="Naam (bv. Hardlopen)" value="${s.name}" id="edit-name-${di}-${si}">
          <input class="edit-input" type="text" placeholder="Detail (bv. 8 km)" value="${s.detail}" id="edit-detail-${di}-${si}">
          <div class="edit-btns">
            <button class="edit-save" onclick="saveEdit(${di},${si})">Opslaan</button>
            <button class="edit-cancel" onclick="closeEdit(${di},${si})">Annuleren</button>
          </div>
        </div>`).join('');

      bodyHTML = `<div class="day-body">
        <div class="sessions-list" 
             id="sessions-${di}"
             ondragover="onDragOver(event,${di})" 
             ondrop="onDrop(event,${di})"
             ondragleave="onDragLeave(event,${di})">
          ${sessionsHTML}
        </div>
        <div class="log-row">
          <span class="log-label">Gelopen:</span>
          <input class="log-input" type="number" step="0.1" min="0" max="30" placeholder="km" value="${ds.km || ''}" onchange="saveKm(${di}, this.value)">
          <span class="log-label">km</span>
        </div>
        <div class="log-row" style="margin-top:0.3rem;">
          <span class="log-label">Gevoel:</span>
          <div class="gevoel-btns">
            ${['😓','😐','😊','🔥'].map(g => `<button class="gevoel-btn${gevoel === g ? ' active' : ''}" onclick="saveGevoel(${di},'${g}')">${g}</button>`).join('')}
          </div>
        </div>
        <button class="complete-btn${ds.done ? ' done' : ''}" onclick="toggleDone(${di})">${ds.done ? '✓ Voltooid — klik om ongedaan te maken' : day.type === 'race' ? '🏅 Finish markeren!' : 'Sessie voltooien'}</button>
      </div>`;
    }

    const smartLabel = getSmartDate(currentWeek, di);
    const displayDay = (smartLabel === 'Vandaag' || smartLabel === 'Morgen') ? smartLabel : day.day;
    const displayDate = (smartLabel === 'Vandaag' || smartLabel === 'Morgen') ? getDayDate(currentWeek, di) : smartLabel.replace(/^[a-z]/, c => c.toUpperCase()).split(' ').slice(1).join(' ');

    card.innerHTML = `
      <div class="day-header">
        <div>
          <span class="day-name">${displayDay}</span>
          <span class="day-date">${getDayDate(currentWeek, di)}</span>
        </div>
        <span class="day-tag ${tagClass}">${tagLabel}</span>
      </div>
      ${bodyHTML}`;

    grid.appendChild(card);
  });

  // Attach drag events after render
  document.querySelectorAll('.session-item').forEach(item => {
    item.addEventListener('dragstart', onDragStart);
    item.addEventListener('dragend', onDragEnd);
  });
}

function renderStreak() {
  let streak = 0;
  outer: for (let w = currentWeek; w >= 0; w--) {
    const week = BASE_WEEKS[w];
    for (let i = week.length - 1; i >= 0; i--) {
      if (week[i].type === 'fietsen' || week[i].type === 'rust') continue;
      if (getDs(w, i).done) streak++;
      else if (streak > 0) break outer;
    }
  }
  document.getElementById('streak-num').textContent = streak;
}

// ===== TOGGLE DONE FROM HOME =====
async function toggleDoneHome(week, dayIdx) {
  const ds = getDs(week, dayIdx);
  const newDone = !ds.done;
  await saveRow(week, dayIdx, { done: newDone });
  render();
  loadHomeData();
  if (newDone) {
    const c = COMP_DAY[Math.floor(Math.random() * COMP_DAY.length)];
    toast(c[0], c[1]);
    confetti();
  }
}

// ===== ACTIONS =====
async function toggleDone(di) {
  const ds = getDs(currentWeek, di);
  const newDone = !ds.done;
  await saveRow(currentWeek, di, { done: newDone });
  render();
  if (newDone) {
    const c = COMP_DAY[Math.floor(Math.random() * COMP_DAY.length)];
    toast(c[0], c[1]);
    confetti();
  }
}

async function saveKm(di, val) {
  await saveRow(currentWeek, di, { km: parseFloat(val) || null });
  const c = COMP_EX[Math.floor(Math.random() * COMP_EX.length)];
  toast(c[0], val + ' km gelogd!');
}

async function saveGevoel(di, val) {
  await saveRow(currentWeek, di, { gevoel: val });
  renderDays();
}

function changeWeek(d) {
  const n = currentWeek + d;
  if (n < 0 || n > 12) return;
  currentWeek = n;
  localStorage.setItem('currentWeek', n);
  render();
}

// ===== EDIT SESSION =====
function openEdit(di, si) {
  document.getElementById(`edit-form-${di}-${si}`).classList.add('open');
}
function closeEdit(di, si) {
  document.getElementById(`edit-form-${di}-${si}`).classList.remove('open');
}
async function saveEdit(di, si) {
  const name = document.getElementById(`edit-name-${di}-${si}`).value.trim();
  const detail = document.getElementById(`edit-detail-${di}-${si}`).value.trim();
  if (!name) return;
  const sessions = getSessions(currentWeek, di);
  sessions[si] = { name, detail };
  await saveRow(currentWeek, di, { sessions_json: JSON.stringify(sessions) });
  toast('✅ Opgeslagen!', 'Sessie bijgewerkt.');
  renderDays();
}

// ===== DRAG & DROP =====
function onDragStart(e) {
  dragItem = e.currentTarget;
  dragSrc = { day: parseInt(dragItem.dataset.day), session: parseInt(dragItem.dataset.session) };
  setTimeout(() => dragItem.classList.add('dragging'), 0);
  e.dataTransfer.effectAllowed = 'move';
}

function onDragEnd(e) {
  if (dragItem) dragItem.classList.remove('dragging');
  document.querySelectorAll('.day-card').forEach(c => c.classList.remove('drag-over'));
  dragItem = null; dragSrc = null;
}

function onDragOver(e, di) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  const card = document.querySelector(`[data-day-idx="${di}"]`);
  if (card) card.classList.add('drag-over');
}

function onDragLeave(e, di) {
  const card = document.querySelector(`[data-day-idx="${di}"]`);
  if (card) card.classList.remove('drag-over');
}

async function onDrop(e, targetDay) {
  e.preventDefault();
  if (!dragSrc) return;
  const srcDay = dragSrc.day;
  const srcSession = dragSrc.session;

  if (srcDay === targetDay) return;

  const srcSessions = getSessions(currentWeek, srcDay);
  const tgtSessions = getSessions(currentWeek, targetDay);

  const [moved] = srcSessions.splice(srcSession, 1);
  tgtSessions.push(moved);

  await saveRow(currentWeek, srcDay, { sessions_json: JSON.stringify(srcSessions) });
  await saveRow(currentWeek, targetDay, { sessions_json: JSON.stringify(tgtSessions) });

  toast('↔️ Verschoven!', `${moved.name} verplaatst naar ${BASE_WEEKS[currentWeek][targetDay].day}.`);
  renderDays();
}

// ===== MENU =====
function openMenu() {
  document.getElementById('nav-menu').classList.add('open');
  document.getElementById('nav-overlay').classList.add('open');
}
function closeMenu() {
  document.getElementById('nav-menu').classList.remove('open');
  document.getElementById('nav-overlay').classList.remove('open');
}

const PAGE_TITLES = {
  home: 'HALVE <span>MARATHON</span>',
  training: '← TRAININGS<span>SCHEMA</span>',
  voeding: '← <span>VOEDING</span>',
  data: '← DATA & <span>STATS</span>',
  reflecties: '← <span>REFLECTIES</span>',
};

// ===== PAGE NAV =====
function showPage(page) {
  const pages = ['home', 'training', 'voeding', 'data', 'reflecties'];
  pages.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.style.display = p === page ? 'block' : 'none';
  });
  // Highlight active menu item
  pages.forEach(p => {
    const el = document.getElementById('nm-' + p);
    if (el) el.classList.toggle('active-page', p === page);
  });
  // Back button + header title
  const backBtn = document.getElementById('back-btn');
  const menuBtn = document.getElementById('menu-btn');
  const title = document.getElementById('header-title');
  if (backBtn) backBtn.style.display = page === 'home' ? 'none' : 'flex';
  if (menuBtn) menuBtn.style.display = page === 'home' ? 'flex' : 'none';
  if (title) title.innerHTML = PAGE_TITLES[page] || PAGE_TITLES.home;

  if (page === 'home') loadHomeData();
  if (page === 'data') loadRunData();
  if (page === 'reflecties') loadReflections();
}

// ===== HOME PAGE =====
function loadHomeData() {
  // Week card
  document.getElementById('hwc-week').textContent = currentWeek === 0 ? 'WEEK 0 — OPWARMER' : 'WEEK ' + currentWeek;
  document.getElementById('hwc-phase').textContent = PHASES[currentWeek] || '';

  const week = BASE_WEEKS[currentWeek];
  const activeDays = week.filter(d => d.type !== 'rust');
  const runDays = week.filter(d => d.type !== 'fietsen' && d.type !== 'rust');
  const doneDays = runDays.filter((d, _) => getDs(currentWeek, week.indexOf(d)).done);
  const pct = runDays.length ? Math.round(doneDays.length / runDays.length * 100) : 0;
  document.getElementById('hwc-fill').style.width = pct + '%';
  document.getElementById('hwc-fraction').textContent = doneDays.length + ' / ' + runDays.length + ' sessies';

  // Overall
  let total = 0, doneTotal = 0;
  for (let w = 1; w <= 12; w++) {
    BASE_WEEKS[w].forEach((d, i) => {
      if (d.type === 'fietsen' || d.type === 'rust') return;
      total++;
      if (getDs(w, i).done) doneTotal++;
    });
  }
  const ovPct = total ? Math.round(doneTotal / total * 100) : 0;
  document.getElementById('ho-fill').style.width = ovPct + '%';
  document.getElementById('ho-pct').textContent = ovPct + '%';

  // Upcoming sessions: show next 5 from current week (+ start of next week if needed)
  const upcoming = [];
  outer: for (let w = currentWeek; w <= Math.min(currentWeek + 1, 12); w++) {
    BASE_WEEKS[w].forEach((day, di) => {
      if (upcoming.length >= 5) return;
      if (day.type === 'rust') return;
      const ds = getDs(w, di);
      upcoming.push({
        week: w, dayIdx: di,
        day: day.day, type: day.type,
        done: ds.done || false,
        detail: (BASE_WEEKS[w][di].sessions[0]?.detail) || '',
        sessionName: (BASE_WEEKS[w][di].sessions[0]?.name) || '',
        date: getDayDate(w, di),
      });
    });
  }

  const list = document.getElementById('home-upcoming');
  if (!upcoming.length) {
    list.innerHTML = '<div class="uc-loading">Geen sessies gevonden.</div>';
    return;
  }

  list.innerHTML = upcoming.map(item => {
    const tagClass = { lopen: 'uc-tag-lopen', fietsen: 'uc-tag-fietsen', race: 'uc-tag-race' }[item.type] || '';
    const tagLabel = { lopen: 'Hardlopen', fietsen: 'Fietsen', race: 'Race!' }[item.type] || item.type;
    const checkClass = item.done ? 'done' : (item.type === 'fietsen' ? 'fietsen-todo' : 'todo');
    const checkIcon = item.done ? '✓' : '';
    const smartDate = getSmartDate(item.week, item.dayIdx);
    const isToday = smartDate === 'Vandaag';
    const displayDay = (smartDate === 'Vandaag' || smartDate === 'Morgen') ? smartDate : item.day;
    const displayDate = (smartDate === 'Vandaag' || smartDate === 'Morgen') ? getDayDate(item.week, item.dayIdx) : '';
    return `<div class="upcoming-card type-${item.type} ${item.done ? 'uc-done' : ''} ${isToday ? 'uc-today' : ''}">
      <button class="uc-check-btn" data-week="${item.week}" data-dayidx="${item.dayIdx}" aria-label="Afvinken">
        <span class="uc-check ${checkClass}">${checkIcon}</span>
      </button>
      <div class="uc-body">
        <div class="uc-day-row">
          <span class="uc-day">${displayDay}</span>
          <span class="uc-date">${displayDate}</span>
        </div>
        <div class="uc-detail">${item.detail || item.sessionName}</div>
      </div>
      <span class="uc-tag ${tagClass}">${tagLabel}</span>
    </div>`;
  }).join('');

}

let reflectionsLoaded = false;

async function loadReflections() {
  if (reflectionsLoaded) return;
  reflectionsLoaded = true;

  const container = document.getElementById('reflecties-content');
  container.innerHTML = '<div class="reflect-empty">Laden...</div>';

  const { data, error } = await sb.from('runs')
    .select('started_at, think_about, reflection_answered, reflection_notes')
    .eq('user_id', currentUser.id)
    .not('think_about', 'is', null)
    .order('started_at', { ascending: false })
    .limit(50);

  if (error || !data?.length) {
    container.innerHTML = '<div class="reflect-empty">Nog geen reflecties gevonden. Stel een vraag voor je run in de tracker.</div>';
    return;
  }

  container.innerHTML = data.map(r => {
    const date = new Date(r.started_at).toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
    const answered = r.reflection_answered === true
      ? '<span class="rc-badge badge-yes">✓ Antwoord gekregen</span>'
      : r.reflection_answered === false
        ? '<span class="rc-badge badge-no">✗ Nog niet</span>'
        : '';
    const notes = r.reflection_notes ? `<div class="reflect-card-notes">${r.reflection_notes}</div>` : '';
    return `<div class="reflect-card">
      <div class="reflect-card-date">${date}</div>
      <div class="reflect-card-q">${r.think_about}</div>
      ${answered}
      ${notes}
    </div>`;
  }).join('');
}

const PACE_COLORS = [
  '#a8f5a0','#60e060','#20c040','#80cc00','#e0c800',
  '#f08000','#e04010','#c00080','#8000c0','#40007a'
];

let runMapInstance = null;

function openRunMap(routeJsonStr, label) {
  const coords = JSON.parse(routeJsonStr);
  if (!coords?.length) return;

  document.getElementById('runmap-title').textContent = label || 'Route';
  document.getElementById('runmap-modal').classList.add('open');

  // Init map (or reset existing)
  if (runMapInstance) {
    runMapInstance.remove();
    runMapInstance = null;
  }
  setTimeout(() => {
    runMapInstance = L.map('runmap-map', { zoomControl: true, attributionControl: false }).setView([coords[0][0], coords[0][1]], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(runMapInstance);

    // Teken gekleurde segmenten
    const bounds = [];
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1], curr = coords[i];
      const colorIdx = (curr[2] !== undefined) ? curr[2] : 5;
      L.polyline([[prev[0], prev[1]], [curr[0], curr[1]]], {
        color: PACE_COLORS[colorIdx], weight: 5, opacity: 0.9
      }).addTo(runMapInstance);
      bounds.push([curr[0], curr[1]]);
    }
    bounds.push([coords[0][0], coords[0][1]]);
    if (bounds.length > 1) runMapInstance.fitBounds(bounds, { padding: [20, 20] });

    // Start en eind marker
    L.circleMarker([coords[0][0], coords[0][1]], { radius: 7, color: '#fff', fillColor: '#5CB85C', fillOpacity: 1, weight: 2 }).addTo(runMapInstance).bindPopup('Start');
    const last = coords[coords.length - 1];
    L.circleMarker([last[0], last[1]], { radius: 7, color: '#fff', fillColor: '#F4631E', fillOpacity: 1, weight: 2 }).addTo(runMapInstance).bindPopup('Finish');

    runMapInstance.invalidateSize();
  }, 50);
}

function closeRunMap() {
  document.getElementById('runmap-modal').classList.remove('open');
}

let runDataLoaded = false;

async function loadRunData() {
  if (runDataLoaded) return;
  runDataLoaded = true;

  const { data, error } = await sb.from('runs')
    .select('started_at, distance_km, duration_seconds, calories, avg_pace, think_about, reflection_answered, reflection_notes, route_json')
    .eq('user_id', currentUser.id)
    .order('started_at', { ascending: false })
    .limit(50);

  if (error || !data?.length) {
    document.getElementById('data-runs').innerHTML = '<div class="data-empty">Nog geen runs. Start de tracker om data te verzamelen.</div>';
    document.getElementById('data-chart').innerHTML = '';
    return;
  }

  // Totals
  const totalKm = data.reduce((s, r) => s + r.distance_km, 0);
  const totalSec = data.reduce((s, r) => s + r.duration_seconds, 0);
  const totalKcal = data.reduce((s, r) => s + r.calories, 0);
  const totalH = Math.floor(totalSec / 3600), totalM = Math.floor((totalSec % 3600) / 60);

  document.getElementById('ds-runs').textContent = data.length;
  document.getElementById('ds-km').textContent = totalKm.toFixed(1);
  document.getElementById('ds-time').textContent = totalH > 0 ? `${totalH}u ${totalM}m` : `${totalM}m`;
  document.getElementById('ds-kcal').textContent = totalKcal.toLocaleString('nl-NL');

  // Weekly chart
  const weeks = {};
  data.forEach(r => {
    const d = new Date(r.started_at);
    const mon = new Date(d); mon.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    const key = mon.toISOString().slice(0, 10);
    weeks[key] = (weeks[key] || 0) + r.distance_km;
  });
  const weekKeys = Object.keys(weeks).sort().slice(-8);
  const maxKm = Math.max(...weekKeys.map(k => weeks[k]));
  const chart = document.getElementById('data-chart');
  chart.innerHTML = weekKeys.map(k => {
    const pct = maxKm > 0 ? (weeks[k] / maxKm * 100) : 0;
    const label = new Date(k).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' });
    return `<div class="chart-col">
      <div class="chart-bar-wrap"><div class="chart-bar" style="height:${pct}%"></div></div>
      <div class="chart-km">${weeks[k].toFixed(1)}</div>
      <div class="chart-label">${label}</div>
    </div>`;
  }).join('');

  // Run list
  document.getElementById('data-runs').innerHTML = data.map(r => {
    const date = new Date(r.started_at).toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'long' });
    const time = new Date(r.started_at).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
    const min = Math.floor(r.duration_seconds / 60), sec = r.duration_seconds % 60;
    const reflectHTML = r.think_about ? `
      <div class="run-reflect">
        <div class="run-reflect-q">${r.think_about}</div>
        ${r.reflection_answered !== null ? `<span class="run-reflect-badge ${r.reflection_answered ? 'badge-yes' : 'badge-no'}">${r.reflection_answered ? '✓ Antwoord gekregen' : '✗ Nog niet'}</span>` : ''}
        ${r.reflection_notes ? `<div class="run-reflect-notes">${r.reflection_notes}</div>` : ''}
      </div>` : '';
    const routeBtn = r.route_json
      ? `<button class="run-map-btn" onclick='openRunMap(${JSON.stringify(r.route_json)}, "${date}")'>📍 Bekijk route</button>`
      : '';
    const gpxBtn = r.route_json
      ? `<button class="run-map-btn run-gpx-btn" onclick='downloadRunGPX(${JSON.stringify(r.route_json)}, "${date}")'>⬇️ GPX</button>`
      : '';
    return `<div class="run-item">
      <div class="run-meta">${date} · ${time}</div>
      <div class="run-stats">
        <span class="run-km">${r.distance_km.toFixed(2)} km</span>
        <span>${r.avg_pace} /km</span>
        <span>${min}:${String(sec).padStart(2,'0')} min</span>
        <span>${r.calories} kcal</span>
      </div>
      ${reflectHTML}
      <div class="run-btn-row">${routeBtn}${gpxBtn}</div>
    </div>`;
  }).join('');
}

// ===== GPX EXPORT =====
function downloadRunGPX(routeJsonStr, dateStr) {
  let coords;
  try { coords = typeof routeJsonStr === 'string' ? JSON.parse(routeJsonStr) : routeJsonStr; }
  catch (e) { toast('❌ Fout', 'Ongeldige route data.'); return; }
  if (!coords?.length) { toast('⚠️ Geen route', 'Geen GPS-punten beschikbaar.'); return; }
  const trkpts = coords.map(([lat, lng]) =>
    `      <trkpt lat="${parseFloat(lat).toFixed(7)}" lon="${parseFloat(lng).toFixed(7)}"/>`
  ).join('\n');
  const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Hardloop Tracker" xmlns="http://www.topografix.com/GPX/1/1">
  <trk>
    <name>${dateStr || 'Run'}</name>
    <trkseg>
${trkpts}
    </trkseg>
  </trk>
</gpx>`;
  const blob = new Blob([gpx], { type: 'application/gpx+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `run_${(dateStr || 'export').replace(/[^a-zA-Z0-9]/g, '_')}.gpx`;
  a.click();
  URL.revokeObjectURL(url);
}

// ===== TOAST =====
function toast(title, msg, dur = 3500) {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div'); t.className = 'toast';
  const icon = title.match(/[\u{1F300}-\u{1FFFF}]/u)?.[0] || '✅';
  t.innerHTML = `<div class="toast-icon">${icon}</div><div style="flex:1"><div class="toast-title">${title.replace(/[\u{1F300}-\u{1FFFF}]/gu, '').trim()}</div><div class="toast-msg">${msg}</div></div><button class="toast-close">✕</button>`;
  c.appendChild(t);
  function dismiss() { t.classList.add('out'); setTimeout(() => t.remove(), 280); }
  t.querySelector('.toast-close').addEventListener('click', dismiss);
  setTimeout(dismiss, dur);
}

// ===== CONFETTI =====
function confetti() {
  const cv = document.getElementById('confetti-canvas'), ctx = cv.getContext('2d');
  cv.width = window.innerWidth; cv.height = window.innerHeight;
  const ps = Array.from({ length: 80 }, () => ({
    x: Math.random() * cv.width, y: -10 - Math.random() * 100,
    w: 5 + Math.random() * 7, h: 3 + Math.random() * 4,
    color: ['#F4631E','#5CB85C','#4fb8ff','#FFD700','#FF6B9D'][Math.floor(Math.random() * 5)],
    rot: Math.random() * 360, rs: (Math.random() - .5) * 5,
    vx: (Math.random() - .5) * 3, vy: 1.8 + Math.random() * 3,
  }));
  let raf;
  function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height); let alive = false;
    ps.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.rs; p.vy += 0.04;
      if (p.y < cv.height + 20) alive = true;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
    });
    if (alive) raf = requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, cv.width, cv.height);
  }
  if (raf) cancelAnimationFrame(raf); draw();
}

// ===== SWIPE WEEK NAV =====
(function initSwipe() {
  // Swipe op trainingsschema (document-level, simpel)
  let txStart = 0, tyStart = 0;
  document.addEventListener('touchstart', e => {
    txStart = e.touches[0].clientX;
    tyStart = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const training = document.getElementById('page-training');
    if (!training || training.style.display === 'none') return;
    const dx = e.changedTouches[0].clientX - txStart;
    const dy = e.changedTouches[0].clientY - tyStart;
    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx) * 0.8) return;
    if (dx < 0) changeWeek(1);
    else changeWeek(-1);
  }, { passive: true });

  // Swipe op home: visuele feedback tijdens drag
  const weekCard = document.querySelector('.home-week-card');
  const upcomingList = document.getElementById('home-upcoming');
  if (!weekCard) return;

  let startX = 0, startY = 0, dragging = false, isHoriz = null;

  weekCard.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    dragging = true;
    isHoriz = null;
    weekCard.style.transition = 'none';
    if (upcomingList) upcomingList.style.transition = 'none';
  }, { passive: true });

  weekCard.addEventListener('touchmove', e => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    if (isHoriz === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      isHoriz = Math.abs(dx) > Math.abs(dy);
    }
    if (!isHoriz) return;
    const clamped = Math.max(-120, Math.min(120, dx));
    const factor = 1 - Math.abs(clamped) / 300;
    weekCard.style.transform = `translateX(${clamped * 0.4}px) scale(${0.97 + factor * 0.03})`;
    if (upcomingList) upcomingList.style.transform = `translateX(${clamped * 0.15}px)`;
    if (upcomingList) upcomingList.style.opacity = 0.5 + factor * 0.5;
  }, { passive: true });

  function snapBack() {
    weekCard.style.transition = 'transform 0.25s cubic-bezier(.4,0,.2,1)';
    weekCard.style.transform = '';
    if (upcomingList) {
      upcomingList.style.transition = 'transform 0.25s cubic-bezier(.4,0,.2,1), opacity 0.25s';
      upcomingList.style.transform = '';
      upcomingList.style.opacity = '';
    }
    dragging = false;
  }

  weekCard.addEventListener('touchend', e => {
    if (!dragging || !isHoriz) { snapBack(); return; }
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) >= 55) {
      const prev = currentWeek;
      if (dx < 0) changeWeek(1);
      else changeWeek(-1);
      if (currentWeek !== prev) loadHomeData();
    }
    snapBack();
  }, { passive: true });

  weekCard.addEventListener('touchcancel', snapBack, { passive: true });
})();

// ===== HOME CHECK DELEGATION =====
// Gebruik button zodat click altijd bubbles op iOS Safari
document.getElementById('home-upcoming').addEventListener('click', e => {
  const btn = e.target.closest('.uc-check-btn');
  if (!btn) return;
  toggleDoneHome(parseInt(btn.dataset.week), parseInt(btn.dataset.dayidx));
});

// ===== INIT =====
window.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('auth-screen').style.display !== 'none') submitAuth();
});

(async () => {
  if (!sessionStorage.getItem('session_active')) {
    await sb.auth.signOut();
  }
  sb.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      sessionStorage.setItem('session_active', '1');
      currentUser = session.user;
      document.getElementById('auth-screen').style.display = 'none';
      document.getElementById('app').style.display = 'block';
      await loadState();
      await loadProfile();
      render();
      showPage('home');
      toast('👋 Hey Jochem!', 'Klaar voor je halve marathon?', 3500);
    } else {
      sessionStorage.removeItem('session_active');
      document.getElementById('auth-screen').style.display = 'flex';
      document.getElementById('app').style.display = 'none';
    }
  });
})();
