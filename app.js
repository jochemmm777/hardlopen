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
        <button class="complete-btn${ds.done ? ' done' : ''}" onclick="markDone(${di})">${ds.done ? '✓ Sessie voltooid!' : day.type === 'race' ? '🏅 Finish markeren!' : 'Sessie voltooien'}</button>
      </div>`;
    }

    card.innerHTML = `
      <div class="day-header">
        <div>
          <span class="day-name">${day.day}</span>
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

async function markDone(di) {
  const ds = getDs(currentWeek, di);
  if (ds.done) return;
  await saveRow(currentWeek, di, { done: true });
  render();
  const c = COMP_DAY[Math.floor(Math.random() * COMP_DAY.length)];
  toast(c[0], c[1]);
  confetti();
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

// ===== PAGE NAV =====
function showPage(page) {
  document.getElementById('page-training').style.display = page === 'training' ? 'block' : 'none';
  document.getElementById('page-voeding').style.display = page === 'voeding' ? 'block' : 'none';
  document.querySelectorAll('.page-tab').forEach((t, i) => t.classList.toggle('active', (i === 0 && page === 'training') || (i === 1 && page === 'voeding')));
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

// ===== INIT =====
window.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('auth-screen').style.display !== 'none') submitAuth();
});

(async () => {
  await sb.auth.signOut();
  sb.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      currentUser = session.user;
      document.getElementById('auth-screen').style.display = 'none';
      document.getElementById('app').style.display = 'block';
      await loadState();
      await loadProfile();
      render();
      toast('👋 Hey Jochem!', 'Klaar voor je halve marathon?', 3500);
    } else {
      document.getElementById('auth-screen').style.display = 'flex';
      document.getElementById('app').style.display = 'none';
    }
  });
})();
