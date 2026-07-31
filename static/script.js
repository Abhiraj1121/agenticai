document.addEventListener('DOMContentLoaded', () => {

  // ══════════════════════════════
  // API BASE — points at the deployed Flask backend on Render.
  // Needed because this frontend is hosted separately (e.g. GitHub Pages)
  // from app.py. If you ever serve them from the same origin again,
  // you can set this back to '' and all calls fall back to relative paths.
  // ══════════════════════════════
  const API_BASE = 'https://agenticai-2p4c.onrender.com';

  // ══════════════════════════════
  // ICON LIBRARY (inline SVG — no emoji anywhere in the UI)
  // ══════════════════════════════
  const ICONS = {
    sparkle:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 L14.6 9.4 L22 12 L14.6 14.6 L12 22 L9.4 14.6 L2 12 L9.4 9.4 Z"/></svg>',
    bot:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="9" width="18" height="11" rx="2"/><circle cx="8.5" cy="14.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="14.5" r="1.2" fill="currentColor" stroke="none"/><path d="M12 9V5"/><circle cx="12" cy="3.5" r="1.5"/><path d="M5 13H3v4h2M19 13h2v4h-2"/></svg>',
    globe:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>',
    folder:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    check:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg>',
    cross:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    mute:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>',
    unmute:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
    sun:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    moon:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    mic:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
    thumbsUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>',
    thumbsDown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3z"/><path d="M17 2h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/></svg>',
    copy:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    wave:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11.5V6a2 2 0 0 0-4 0v-.5"/><path d="M14 5.5V4a2 2 0 0 0-4 0v9"/><path d="M10 9.5a2 2 0 0 0-4 0v3.5c0 4 3 8 7 8s7-3 7-7v-2"/></svg>',
    image:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    edit:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>',
    regenerate:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    chevronDown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="6 9 12 15 18 9"/></svg>',
  };
  const SOURCE_BADGES = {
    web:       { icon: ICONS.globe,  label: 'Web + AI' },
    cached:    { icon: ICONS.folder, label: 'Cached' },
    ai:        { icon: ICONS.bot,    label: 'AI' },
    generated: { icon: ICONS.image,  label: 'Generated' },
    avatar:    { icon: ICONS.image,  label: 'Avatar' },
    code:      { icon: ICONS.bot,    label: 'Code' },
    diagram:   { icon: ICONS.bot,    label: 'Diagram' },
    document:  { icon: ICONS.folder, label: 'Document' },
  };

  // ══════════════════════════════
  // LAUNCH SCREEN
  // ══════════════════════════════
  (function initLaunchScreen() {
    const launch = document.getElementById('launchScreen');
    if (!launch) return;
    const MIN_MS = 1900;
    const start = Date.now();
    const dismiss = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => {
        launch.classList.add('hide');
        setTimeout(() => launch.remove(), 750);
      }, wait);
    };
    if (document.readyState === 'complete') dismiss();
    else window.addEventListener('load', dismiss, { once: true });
    // Safety net in case load never fires (e.g. cached/instant paint)
    setTimeout(dismiss, 3200);
  })();

  // ── DOM REFS ──
  const chat             = document.getElementById('chat');
  const msg              = document.getElementById('msg');
  const send             = document.getElementById('send');
  const mic              = document.getElementById('mic');
  const micStatus        = document.getElementById('mic-status');
  const muteToggle       = document.getElementById('muteToggle');
  const voiceOnlyToggle  = document.getElementById('voiceOnlyToggle');
  const languageToggle   = document.getElementById('languageToggle');
  const webToggle        = document.getElementById('webToggle');
  const imageToggle      = document.getElementById('imageToggle');
  const settingImage     = document.getElementById('settingImage');
  const themeToggle      = document.getElementById('themeToggle');
  const speakingAnim     = document.getElementById('speakingAnimation');
  const wakeMicButton    = document.getElementById('wakeMicButton');
  const clearChatBtn     = document.getElementById('clearChat');
  const sidebarToggle    = document.getElementById('sidebarToggle');
  const sidebar          = document.getElementById('sidebar');
  const openSettingsBtn  = document.getElementById('openSettings');
  const userCardBtn      = document.getElementById('userCardBtn');
  const settingsOverlay  = document.getElementById('settingsOverlay');
  const settingsClose    = document.getElementById('settingsClose');
  const userOverlay      = document.getElementById('userOverlay');
  const userClose        = document.getElementById('userClose');
  const settingMute      = document.getElementById('settingMute');
  const settingWeb       = document.getElementById('settingWeb');
  const settingLang      = document.getElementById('settingLang');
  const themeSwatches    = document.querySelectorAll('.theme-swatch');
  const profileName      = document.getElementById('profileName');
  const profileEmail     = document.getElementById('profileEmail');
  const profileAbout     = document.getElementById('profileAbout');
  const saveProfileBtn   = document.getElementById('saveProfile');
  const userAvatarBig    = document.getElementById('userAvatarBig');
  const userAvatarSmall  = document.getElementById('userAvatarSmall');
  const sidebarUserName  = document.getElementById('sidebarUserName');
  const sidebarUserEmail = document.getElementById('sidebarUserEmail');
  const avatarUploadZone = document.getElementById('avatarUploadZone');
  const avatarFileInput  = document.getElementById('avatarFileInput');
  const photoInput       = document.getElementById('photoInput');
  const attachBtn        = document.getElementById('attachBtn');
  const attachPreview    = document.getElementById('attachPreview');
  const attachThumb      = document.getElementById('attachThumb');
  const attachRemove     = document.getElementById('attachRemove');
  const sessionsList     = document.getElementById('sessionsList');
  const sessionsEmpty    = document.getElementById('sessionsEmpty');
  const newSessionBtn    = document.getElementById('newSessionBtn');
  const sessionCountEl   = document.getElementById('sessionCount');
  const clearAllSessions = document.getElementById('clearAllSessions');
  const exportAllSessions= document.getElementById('exportAllSessions');
  const resetAppBtn      = document.getElementById('resetAppBtn');
  const settingFontSize  = document.getElementById('settingFontSize');
  const settingDensity   = document.getElementById('settingDensity');
  const settingReduceMotion = document.getElementById('settingReduceMotion');
  const settingSoundFx   = document.getElementById('settingSoundFx');
  const settingEnterSend = document.getElementById('settingEnterSend');
  const onboardOverlay   = document.getElementById('onboardOverlay');
  const obSave           = document.getElementById('obSave');
  const obGuest          = document.getElementById('obGuest');
  const obName           = document.getElementById('obName');
  const obEmail          = document.getElementById('obEmail');

  // ── STATE ──
  let chatHistory      = [];
  let isMuted          = false;
  let voiceOnly        = false;
  let webSearchEnabled = false;
  let imageGenEnabled  = false;
  let recognition      = null;
  let isThinking       = false;
  let attachedImage    = null; // base64 string
  let currentSessionId = null;

  // ══════════════════════════════
  // PARTICLE CANVAS
  // ══════════════════════════════
  (function initCanvas() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const dust = [];
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    for (let i = 0; i < 80; i++) dust.push({ x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight, r:Math.random()*1.2+0.3, a:Math.random()*0.3+0.04, vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.18, hue:Math.random()<0.6?42:28 });
    function frame() {
      ctx.clearRect(0,0,W,H);
      const vg = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*0.75);
      vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,0.65)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);
      for (const p of dust) { p.x+=p.vx; p.y+=p.vy; if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`hsla(${p.hue},70%,65%,${p.a})`; ctx.fill(); }
      requestAnimationFrame(frame);
    }
    frame();
  })();

  // ══════════════════════════════
  // DEFINITIVE SIDEBAR FIX
  // Root cause of persistent bug:
  // Both 'click' AND 'touchend' were bound, causing double-fire on mobile.
  // Solution: use ONLY 'click' for everything. On touch devices,
  // touchend triggers click naturally. Never bind both on the same element.
  // ══════════════════════════════
  let sidebarOverlay = null;
  let sidebarJustOpened = false;

  function openSidebar() {
    sidebar.classList.add('open');
    if (!sidebarOverlay) {
      sidebarOverlay = document.createElement('div');
      sidebarOverlay.className = 'sidebar-overlay';
      document.body.appendChild(sidebarOverlay);
      sidebarOverlay.addEventListener('click', (e) => {
        if (sidebarJustOpened) return;
        if (e.target === sidebarOverlay) closeSidebar();
      });
    }
    sidebarJustOpened = true;
    sidebarOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { sidebarJustOpened = false; }, 400);
  }

  function closeSidebar() {
    if (!sidebar.classList.contains('open')) return;
    sidebar.classList.remove('open');
    sidebarOverlay?.classList.remove('show');
    document.body.style.overflow = '';
  }

  // ── Sidebar toggle — CLICK ONLY ──
  sidebarToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  // ── Stop sidebar's OWN clicks from reaching the overlay ──
  sidebar.addEventListener('click', (e) => { e.stopPropagation(); });

  // ══════════════════════════════
  // BYOK — Bring Your Own OpenRouter Key
  // Stored client-side only (localStorage). Sent as Authorization: Bearer <key>
  // on every /api/chat call; backend falls back to its own server key if absent.
  // ══════════════════════════════
  const BYOK_STORAGE_KEY = 'eka-openrouter-key';
  function getUserApiKey() { return (localStorage.getItem(BYOK_STORAGE_KEY) || '').trim(); }
  function setUserApiKey(key) { localStorage.setItem(BYOK_STORAGE_KEY, key.trim()); }
  function clearUserApiKey() { localStorage.removeItem(BYOK_STORAGE_KEY); }
  function authHeaders() {
    const key = getUserApiKey();
    return key ? { 'Authorization': `Bearer ${key}` } : {};
  }

  const settingApiKey  = document.getElementById('settingApiKey');
  const apiKeySave     = document.getElementById('apiKeySave');
  const apiKeyClear    = document.getElementById('apiKeyClear');
  const apiKeyStatus   = document.getElementById('apiKeyStatus');

  function refreshApiKeyStatus() {
    const key = getUserApiKey();
    if (apiKeyStatus) {
      apiKeyStatus.textContent = key
        ? `Using your key (••••${key.slice(-4)})`
        : 'Using the shared server key.';
    }
  }

  apiKeySave?.addEventListener('click', () => {
    const val = (settingApiKey?.value || '').trim();
    if (!val) { showToast('Enter a key first', ICONS.bot); return; }
    setUserApiKey(val);
    settingApiKey.value = '';
    refreshApiKeyStatus();
    showToast('API key saved locally', ICONS.bot);
  });

  apiKeyClear?.addEventListener('click', () => {
    clearUserApiKey();
    if (settingApiKey) settingApiKey.value = '';
    refreshApiKeyStatus();
    showToast('API key removed', ICONS.bot);
  });

  userCardBtn?.addEventListener('click', () => { openModal(userOverlay); });
  clearChatBtn?.addEventListener('click', () => { startNewSession(); });
  newSessionBtn?.addEventListener('click', () => { saveCurrentSession(); startNewSession(); });

  document.querySelectorAll('.chip').forEach(c => {
    c.addEventListener('click', () => { sendMessage(c.dataset.q); });
  });

  // ── Sidebar action buttons ──
  openSettingsBtn?.addEventListener('click', () => {
    settingMute.checked = isMuted;
    settingWeb.checked  = webSearchEnabled;
    if (settingImage) settingImage.checked = imageGenEnabled;
    settingLang.value   = languageToggle.value;
    updateSessionCount();
    refreshApiKeyStatus();
    openModal(settingsOverlay);
  });

  // ══════════════════════════════
  // MODALS
  // ══════════════════════════════
  function openModal(el) { el.classList.add('open'); }
  function closeModal(el) { el.classList.remove('open'); }

  settingsClose?.addEventListener('click', () => closeModal(settingsOverlay));
  userClose?.addEventListener('click',     () => closeModal(userOverlay));
  settingsOverlay?.addEventListener('click', (e) => { if (e.target === settingsOverlay) closeModal(settingsOverlay); });
  userOverlay?.addEventListener('click',    (e) => { if (e.target === userOverlay) closeModal(userOverlay); });

  // ══════════════════════════════
  // ONBOARDING (first visit)
  // ══════════════════════════════
  function checkOnboarding() {
    const seen = localStorage.getItem('eka-onboarded');
    if (!seen) openModal(onboardOverlay);
  }

  obSave?.addEventListener('click', () => {
    const name  = obName.value.trim();
    const email = obEmail.value.trim();
    if (name) {
      const profile = { name, email };
      localStorage.setItem('eka-profile', JSON.stringify(profile));
      loadProfile();
    }
    localStorage.setItem('eka-onboarded', '1');
    closeModal(onboardOverlay);
    showEmptyState();
  });

  obGuest?.addEventListener('click', () => {
    localStorage.setItem('eka-onboarded', '1');
    closeModal(onboardOverlay);
    showEmptyState();
  });

  // ══════════════════════════════
  // THEMES
  // ══════════════════════════════
  const THEMES = ['dark','light','purple','grid','pinkpurple','greenwhite','material'];
  function playMaterialTransform(originEl) {
    if (document.body.classList.contains('reduce-motion')) return;
    const overlay = document.createElement('div');
    overlay.className = 'material-transform-overlay';
    if (originEl) {
      const r = originEl.getBoundingClientRect();
      const ox = ((r.left + r.width / 2) / window.innerWidth) * 100;
      const oy = ((r.top + r.height / 2) / window.innerHeight) * 100;
      overlay.style.setProperty('--mat-ox', ox + '%');
      overlay.style.setProperty('--mat-oy', oy + '%');
    }
    overlay.innerHTML = `<div class="mat-icon">${ICONS.sparkle}</div>`;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 680);
  }
  function applyTheme(theme, originEl) {
    const prev = THEMES.find(t => document.body.classList.contains(t));
    document.body.classList.remove(...THEMES);
    document.body.classList.add(theme);
    localStorage.setItem('eka-theme', theme);
    themeSwatches.forEach(s => s.classList.toggle('active', s.dataset.theme === theme));
    updateThemeIcon(theme === 'light');
    if (theme === 'material' && prev !== 'material') playMaterialTransform(originEl);
  }
  applyTheme(localStorage.getItem('eka-theme') || 'dark');
  themeSwatches.forEach(s => s.addEventListener('click', (e) => applyTheme(s.dataset.theme, e.currentTarget)));
  themeToggle?.addEventListener('click', () => {
    const curr = document.body.classList.contains('light') ? 'light' : 'dark';
    applyTheme(curr === 'light' ? 'dark' : 'light');
    showToast(curr === 'light' ? 'Dark mode' : 'Light mode', curr === 'light' ? ICONS.moon : ICONS.sun);
  });
  function updateThemeIcon(light) {
    const icon = document.getElementById('themeIcon'); if (!icon) return;
    icon.innerHTML = light
      ? `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`
      : `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
  }

  // ══════════════════════════════
  // USER PROFILE + AVATAR PHOTO
  // ══════════════════════════════
  function loadProfile() {
    const p = JSON.parse(localStorage.getItem('eka-profile') || '{}');
    const photo = localStorage.getItem('eka-avatar');

    if (p.name) {
      if (profileName) profileName.value = p.name;
      sidebarUserName.textContent = p.name;
    }
    if (p.email) {
      if (profileEmail) profileEmail.value = p.email;
      sidebarUserEmail.textContent = p.email;
    }
    if (p.about && profileAbout) profileAbout.value = p.about;

    // Avatar: photo takes priority, else initial letter
    if (photo) {
      setAvatarPhoto(photo);
    } else if (p.name) {
      const init = p.name.trim()[0].toUpperCase();
      userAvatarBig.innerHTML = init;
      userAvatarSmall.innerHTML = init;
    }
  }

  function setAvatarPhoto(dataUrl) {
    userAvatarBig.innerHTML   = `<img src="${dataUrl}" alt="avatar" />`;
    userAvatarSmall.innerHTML = `<img src="${dataUrl}" alt="avatar" />`;
    if (document.getElementById('userAvatarBig')) userAvatarBig.innerHTML = `<img src="${dataUrl}" alt="avatar" />`;
  }

  // Tap avatar zone to upload photo
  avatarUploadZone?.addEventListener('click', () => avatarFileInput.click());
  avatarFileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target.result;
      localStorage.setItem('eka-avatar', data);
      setAvatarPhoto(data);
    };
    reader.readAsDataURL(file);
  });

  // Live initial preview
  profileName?.addEventListener('input', () => {
    const v = profileName.value.trim();
    if (!localStorage.getItem('eka-avatar'))
      userAvatarBig.innerHTML = v ? v[0].toUpperCase() : '?';
  });

  saveProfileBtn?.addEventListener('click', () => {
    localStorage.setItem('eka-profile', JSON.stringify({
      name: profileName.value.trim(),
      email: profileEmail.value.trim(),
      about: profileAbout?.value?.trim() || ''
    }));
    loadProfile();
    closeModal(userOverlay);
    showToast('Profile saved', ICONS.check);
  });

  loadProfile();

  // ══════════════════════════════
  // SETTINGS CONTROLS
  // ══════════════════════════════
  settingMute?.addEventListener('change', () => { isMuted = settingMute.checked; muteToggle?.classList.toggle('active', isMuted); if (isMuted) speechSynthesis.cancel(); showToast(isMuted ? 'Muted' : 'Unmuted', isMuted ? ICONS.mute : ICONS.unmute); });
  settingWeb?.addEventListener('change',  () => { webSearchEnabled = settingWeb.checked; webToggle?.classList.toggle('active', webSearchEnabled); showToast(webSearchEnabled ? 'Web search on' : 'Web search off', ICONS.globe); });
  settingImage?.addEventListener('change', () => {
    imageGenEnabled = settingImage.checked;
    imageToggle?.classList.toggle('active', imageGenEnabled);
    imageToggle?.setAttribute('aria-pressed', imageGenEnabled);
    if (imageToggle) imageToggle.title = imageGenEnabled ? 'Image Generation (ON)' : 'Image Generation (OFF)';
    if (msg) msg.placeholder = imageGenEnabled ? 'Describe the image to generate…' : 'Ask EKA anything…';
    showToast(imageGenEnabled ? 'Image generation on — describe what to create' : 'Image generation off', ICONS.image);
  });
  settingLang?.addEventListener('change', () => { if (languageToggle) languageToggle.value = settingLang.value; });
  clearAllSessions?.addEventListener('click', () => { if (confirm('Delete all saved chat history?')) { clearAllChatSessions(); showToast('All history cleared', ICONS.check); updateSessionCount(); } });
  muteToggle?.addEventListener('click', () => { isMuted = !isMuted; muteToggle.classList.toggle('active', isMuted); if (settingMute) settingMute.checked = isMuted; if (isMuted) speechSynthesis.cancel(); showToast(isMuted ? 'Muted' : 'Unmuted', isMuted ? ICONS.mute : ICONS.unmute); });
  webToggle?.addEventListener('click', () => { webSearchEnabled = !webSearchEnabled; webToggle.classList.toggle('active', webSearchEnabled); webToggle.setAttribute('aria-pressed', webSearchEnabled); if (settingWeb) settingWeb.checked = webSearchEnabled; showToast(webSearchEnabled ? 'Web search on' : 'Web search off', ICONS.globe); });
  imageToggle?.addEventListener('click', () => {
    imageGenEnabled = !imageGenEnabled;
    imageToggle.classList.toggle('active', imageGenEnabled);
    imageToggle.setAttribute('aria-pressed', imageGenEnabled);
    imageToggle.title = imageGenEnabled ? 'Image Generation (ON)' : 'Image Generation (OFF)';
    if (settingImage) settingImage.checked = imageGenEnabled;
    if (msg) msg.placeholder = imageGenEnabled ? 'Describe the image to generate…' : 'Ask EKA anything…';
    showToast(imageGenEnabled ? 'Image generation on — describe what to create' : 'Image generation off', ICONS.image);
  });
  voiceOnlyToggle?.addEventListener('click', () => { voiceOnly = !voiceOnly; document.body.classList.toggle('voice-only', voiceOnly); voiceOnlyToggle.classList.toggle('active', voiceOnly); if (voiceOnly) { wakeMicButton.style.display='flex'; speak("Hello, I'm EKA. Tap the mic."); } else { wakeMicButton.style.display='none'; msg.focus(); } showToast(voiceOnly ? 'Voice-only on' : 'Voice-only off', ICONS.mic); });

  // ── Appearance: font size / density / reduced motion ──
  const FONT_SIZES = ['font-sm','font-md','font-lg'];
  function applyFontSize(size) {
    document.body.classList.remove(...FONT_SIZES);
    document.body.classList.add(size);
    localStorage.setItem('eka-font-size', size);
    if (settingFontSize) settingFontSize.value = size;
  }
  settingFontSize?.addEventListener('change', () => applyFontSize(settingFontSize.value));
  applyFontSize(localStorage.getItem('eka-font-size') || 'font-md');

  function applyDensity(val) {
    document.body.classList.toggle('density-compact', val === 'density-compact');
    localStorage.setItem('eka-density', val);
    if (settingDensity) settingDensity.value = val;
  }
  settingDensity?.addEventListener('change', () => applyDensity(settingDensity.value));
  applyDensity(localStorage.getItem('eka-density') || 'cozy');

  function applyReduceMotion(on) {
    document.body.classList.toggle('reduce-motion', on);
    localStorage.setItem('eka-reduce-motion', on ? '1' : '0');
    if (settingReduceMotion) settingReduceMotion.checked = on;
  }
  settingReduceMotion?.addEventListener('change', () => applyReduceMotion(settingReduceMotion.checked));
  applyReduceMotion(localStorage.getItem('eka-reduce-motion') === '1');

  // ── Sound effects ──
  let soundFxEnabled = localStorage.getItem('eka-soundfx') === '1';
  if (settingSoundFx) settingSoundFx.checked = soundFxEnabled;
  function playFx(freq = 660, dur = 0.06) {
    if (!soundFxEnabled) return;
    try {
      const ctx = window.__ekaAudioCtx || (window.__ekaAudioCtx = new (window.AudioContext || window.webkitAudioContext)());
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.frequency.value = freq; osc.type = 'sine';
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + dur);
    } catch {}
  }
  settingSoundFx?.addEventListener('change', () => {
    soundFxEnabled = settingSoundFx.checked;
    localStorage.setItem('eka-soundfx', soundFxEnabled ? '1' : '0');
    showToast(soundFxEnabled ? 'Sound effects on' : 'Sound effects off', ICONS.check);
    if (soundFxEnabled) playFx();
  });

  // ── Enter to send ──
  let enterToSend = localStorage.getItem('eka-enter-send') !== '0';
  if (settingEnterSend) settingEnterSend.checked = enterToSend;
  settingEnterSend?.addEventListener('change', () => {
    enterToSend = settingEnterSend.checked;
    localStorage.setItem('eka-enter-send', enterToSend ? '1' : '0');
    showToast(enterToSend ? 'Enter sends messages' : 'Enter adds new line', ICONS.check);
  });

  // ── Export chat history ──
  exportAllSessions?.addEventListener('click', () => {
    const sessions = getAllSessions();
    if (!sessions.length) { showToast('No chat history to export', ICONS.cross); return; }
    const blob = new Blob([JSON.stringify(sessions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `eka-chat-history-${Date.now()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    showToast('Chat history exported', ICONS.check);
  });

  // ── Reset app to defaults ──
  resetAppBtn?.addEventListener('click', () => {
    if (!confirm('Reset EKA to default settings? This clears theme, preferences and profile, but keeps saved chat history.')) return;
    ['eka-theme','eka-font-size','eka-density','eka-reduce-motion','eka-soundfx','eka-enter-send'].forEach(k => localStorage.removeItem(k));
    showToast('App reset — reloading…', ICONS.check);
    setTimeout(() => location.reload(), 600);
  });

  // ══════════════════════════════
  // PHOTO ATTACH
  // ══════════════════════════════
  attachBtn?.addEventListener('click', () => photoInput.click());
  photoInput?.addEventListener('change', (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      attachedImage = ev.target.result;
      attachThumb.src = attachedImage;
      attachPreview.style.display = 'flex';
      attachBtn.classList.add('has-file');
    };
    reader.readAsDataURL(file);
    photoInput.value = '';
  });
  attachRemove?.addEventListener('click', () => {
    attachedImage = null;
    attachPreview.style.display = 'none';
    attachBtn.classList.remove('has-file');
  });

  // ══════════════════════════════
  // CHAT SESSIONS (localStorage)
  // ══════════════════════════════
  function genId() { return 'ses_' + Date.now(); }

  function getAllSessions() {
    try { return JSON.parse(localStorage.getItem('eka-sessions') || '[]'); }
    catch { return []; }
  }

  function saveAllSessions(sessions) {
    localStorage.setItem('eka-sessions', JSON.stringify(sessions));
  }

  function clearAllChatSessions() {
    localStorage.removeItem('eka-sessions');
    renderSessionList();
  }

  function saveCurrentSession() {
    if (!chatHistory.length) return;
    const sessions = getAllSessions();
    const firstMsg  = chatHistory.find(m => m.role === 'user')?.content || 'New chat';
    const title     = firstMsg.slice(0, 40) + (firstMsg.length > 40 ? '…' : '');
    const existing  = sessions.findIndex(s => s.id === currentSessionId);
    const session   = { id: currentSessionId || genId(), title, date: Date.now(), history: chatHistory };
    if (existing >= 0) sessions[existing] = session;
    else sessions.unshift(session);
    saveAllSessions(sessions.slice(0, 30)); // keep max 30 sessions
    renderSessionList();
  }

  function clearChatBubbles() {
    chat.querySelectorAll('.bubble-row, #typingIndicator').forEach(el => el.remove());
  }

  function loadSession(id) {
    const sessions = getAllSessions();
    const session  = sessions.find(s => s.id === id);
    if (!session) return;
    saveCurrentSession();
    currentSessionId = session.id;
    chatHistory = session.history || [];
    clearChatBubbles();
    chatHistory.forEach((m, i) => {
      if (m.role === 'user')      addBubble(m.content, 'user', '', false, null, i);
      else if (m.role === 'assistant') addBubble(m.content, 'bot', 'ai', false, null, i);
    });
    if (chatHistory.length === 0) showEmptyState(); else hideEmptyState();
    renderSessionList();
    closeSidebar();
  }

  function startNewSession() {
    saveCurrentSession();
    currentSessionId = genId();
    chatHistory = [];
    clearChatBubbles();
    showEmptyState();
    renderSessionList();
  }

  function deleteSession(id, e) {
    e.stopPropagation();
    const sessions = getAllSessions().filter(s => s.id !== id);
    saveAllSessions(sessions);
    if (id === currentSessionId) startNewSession();
    else renderSessionList();
  }

  function renderSessionList() {
    sessionsList.innerHTML = '';
    const sessions = getAllSessions();
    sessionsEmpty.style.display = sessions.length ? 'none' : 'block';
    sessions.forEach(s => {
      const item = document.createElement('div');
      item.className = 'session-item' + (s.id === currentSessionId ? ' active' : '');
      const date = new Date(s.date).toLocaleDateString([], { month:'short', day:'numeric' });
      item.innerHTML = `<span class="session-title">${s.title}</span><span class="session-date">${date}</span><button class="session-del" title="Delete">${ICONS.cross}</button>`;
      item.addEventListener('click', () => loadSession(s.id));
      item.querySelector('.session-del').addEventListener('click', (e) => deleteSession(s.id, e));
      sessionsList.appendChild(item);
    });
    updateSessionCount();
  }

  function updateSessionCount() {
    const n = getAllSessions().length;
    if (sessionCountEl) sessionCountEl.textContent = `${n} session${n !== 1 ? 's' : ''}`;
  }

  // Auto-save every message
  function autosave() { saveCurrentSession(); }

  // ══════════════════════════════
  // BUBBLE with action bar
  // ══════════════════════════════
  // ══════════════════════════════
  // CODE BLOCK ENHANCEMENT — adds a copy button + language label
  // to every <pre><code> block produced by marked.js
  // ══════════════════════════════
  function enhanceCodeBlocks(container) {
    const blocks = container.querySelectorAll('pre');
    blocks.forEach(pre => {
      if (pre.parentElement.classList.contains('code-block-wrap')) return; // already enhanced
      const codeEl = pre.querySelector('code');
      const langMatch = codeEl?.className?.match(/language-(\w+)/);
      const lang = langMatch ? langMatch[1] : 'text';

      const wrap = document.createElement('div');
      wrap.className = 'code-block-wrap';
      pre.parentNode.insertBefore(wrap, pre);

      const header = document.createElement('div');
      header.className = 'code-block-header';

      const label = document.createElement('span');
      label.className = 'code-lang-label';
      label.textContent = lang;
      header.appendChild(label);

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'copy-code-btn';
      copyBtn.innerHTML = `${ICONS.copy}<span>Copy</span>`;
      copyBtn.addEventListener('click', () => {
        const codeText = codeEl ? codeEl.innerText : pre.innerText;
        navigator.clipboard?.writeText(codeText).then(() => {
          copyBtn.innerHTML = `${ICONS.check}<span>Copied</span>`;
          copyBtn.classList.add('copied');
          playFx?.(880, 0.05);
          setTimeout(() => { copyBtn.innerHTML = `${ICONS.copy}<span>Copy</span>`; copyBtn.classList.remove('copied'); }, 1500);
        });
      });
      header.appendChild(copyBtn);

      wrap.appendChild(header);
      wrap.appendChild(pre);
    });
  }

  function addBubble(text, who = 'bot', source = '', animate = false, imgData = null, idx = null) {
    if (voiceOnly) return;

    const row = document.createElement('div');
    row.className = `bubble-row ${who}`;
    if (idx !== null) row.dataset.msgIndex = idx;

    const bubble = document.createElement('div');
    bubble.className = `bubble ${who}`;

    // Image (for user photo attachments)
    if (imgData) {
      const img = document.createElement('img');
      img.src = imgData; img.className = 'bubble-img'; img.alt = 'attached image';
      bubble.appendChild(img);
    }

    const content = document.createElement('div');
    content.className = 'ai-text';
    bubble.appendChild(content);

    const finalize = () => {
      if (source) {
        const meta = document.createElement('div'); meta.className = 'meta';
        const badge = document.createElement('span'); badge.className = 'meta-badge';
        const b = SOURCE_BADGES[source];
        badge.innerHTML = b ? `${b.icon}<span>${b.label}</span>` : source;
        meta.appendChild(badge);
        meta.appendChild(document.createTextNode(new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })));
        bubble.appendChild(meta);
      }
    };

    if (animate && who === 'bot') {
      let i = 0; const raw = text;
      const timer = setInterval(() => {
        if (i < raw.length) { i++; content.innerHTML = typeof marked !== 'undefined' ? marked.parse(raw.slice(0,i)) : raw.slice(0,i); chat.scrollTop = chat.scrollHeight; }
        else { clearInterval(timer); enhanceCodeBlocks(content); finalize(); }
      }, 16);
    } else {
      content.innerHTML = typeof marked !== 'undefined' ? marked.parse(text) : text;
      enhanceCodeBlocks(content);
      finalize();
    }

    row.appendChild(bubble);

    // Action bar: copy + thumbs (only for bot), copy for user
    const actions = document.createElement('div');
    actions.className = 'bubble-actions';

    // Copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'bact-btn'; copyBtn.title = 'Copy'; copyBtn.innerHTML = ICONS.copy;
    copyBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(text).then(() => {
        copyBtn.innerHTML = ICONS.check; copyBtn.classList.add('copied');
        setTimeout(() => { copyBtn.innerHTML = ICONS.copy; copyBtn.classList.remove('copied'); }, 1500);
      });
    });
    actions.appendChild(copyBtn);

    if (who === 'user' && idx !== null) {
      const editBtn = document.createElement('button');
      editBtn.className = 'bact-btn'; editBtn.title = 'Edit message'; editBtn.innerHTML = ICONS.edit;
      editBtn.addEventListener('click', () => startEdit(row, idx, text));
      actions.appendChild(editBtn);
    }

    if (who === 'bot') {
      if (idx !== null && source) {
        const regenBtn = document.createElement('button');
        regenBtn.className = 'bact-btn'; regenBtn.title = 'Regenerate response'; regenBtn.innerHTML = ICONS.regenerate;
        regenBtn.addEventListener('click', () => regenerateFrom(row, idx));
        actions.appendChild(regenBtn);
      }

      const likeBtn = document.createElement('button');
      likeBtn.className = 'bact-btn'; likeBtn.title = 'Good response'; likeBtn.innerHTML = ICONS.thumbsUp;
      likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('liked');
        dislikeBtn.classList.remove('disliked');
        showToast(likeBtn.classList.contains('liked') ? 'Thanks for the feedback!' : '', ICONS.thumbsUp);
      });

      const dislikeBtn = document.createElement('button');
      dislikeBtn.className = 'bact-btn'; dislikeBtn.title = 'Bad response'; dislikeBtn.innerHTML = ICONS.thumbsDown;
      dislikeBtn.addEventListener('click', () => {
        dislikeBtn.classList.toggle('disliked');
        likeBtn.classList.remove('liked');
        showToast(dislikeBtn.classList.contains('disliked') ? 'Feedback noted, will improve!' : '', ICONS.thumbsDown);
      });

      actions.appendChild(likeBtn);
      actions.appendChild(dislikeBtn);
    }

    row.appendChild(actions);
    chat.appendChild(row);
    chat.scrollTop = chat.scrollHeight;
  }

  // ══════════════════════════════
  // EDIT last message — rewrite + resubmit, discarding everything after it
  // ══════════════════════════════
  function startEdit(row, idx, originalText) {
    if (isThinking) return;
    const bubble  = row.querySelector('.bubble');
    const content = bubble.querySelector('.ai-text');
    const actions = row.querySelector('.bubble-actions');
    const prevHTML = content.innerHTML;

    content.innerHTML = '';
    const ta = document.createElement('textarea');
    ta.className = 'edit-textarea';
    ta.value = originalText;
    content.appendChild(ta);
    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);
    const autoGrow = () => { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; };
    autoGrow();
    ta.addEventListener('input', autoGrow);

    const editBar = document.createElement('div');
    editBar.className = 'edit-actions';
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button'; cancelBtn.className = 'edit-cancel-btn'; cancelBtn.textContent = 'Cancel';
    const saveBtn = document.createElement('button');
    saveBtn.type = 'button'; saveBtn.className = 'edit-save-btn'; saveBtn.textContent = 'Save & Submit';
    editBar.appendChild(cancelBtn);
    editBar.appendChild(saveBtn);
    bubble.appendChild(editBar);
    if (actions) actions.style.display = 'none';

    const cleanup = () => { editBar.remove(); if (actions) actions.style.display = ''; };

    cancelBtn.addEventListener('click', () => { content.innerHTML = prevHTML; cleanup(); });
    saveBtn.addEventListener('click', () => {
      const newText = ta.value.trim();
      if (!newText) return;
      chatHistory.length = idx;              // drop this message + everything after it
      let sib = row;
      while (sib) { const next = sib.nextElementSibling; sib.remove(); sib = next; }
      sendMessage(newText);
    });
    ta.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveBtn.click(); }
      if (e.key === 'Escape') cancelBtn.click();
    });
  }

  // ══════════════════════════════
  // REGENERATE — drop this bot reply + anything after, re-ask the same question
  // ══════════════════════════════
  function regenerateFrom(row, idx) {
    if (isThinking) return;
    chatHistory.length = idx;
    let sib = row;
    while (sib) { const next = sib.nextElementSibling; sib.remove(); sib = next; }
    fetchAndRenderReply();
  }

  function addImageBubble(dataUrl, prompt) {
    if (voiceOnly) return;

    const row = document.createElement('div'); row.className = 'bubble-row bot';
    const bubble = document.createElement('div'); bubble.className = 'bubble bot';

    const img = document.createElement('img');
    img.src = dataUrl; img.className = 'bubble-img generated-img'; img.alt = prompt;
    img.loading = 'lazy';
    img.addEventListener('click', () => window.open(dataUrl, '_blank'));
    bubble.appendChild(img);

    const caption = document.createElement('div');
    caption.className = 'ai-text image-caption';
    caption.textContent = prompt;
    bubble.appendChild(caption);

    const meta = document.createElement('div'); meta.className = 'meta';
    const badge = document.createElement('span'); badge.className = 'meta-badge';
    const b = SOURCE_BADGES.generated;
    badge.innerHTML = `${b.icon}<span>${b.label}</span>`;
    meta.appendChild(badge);
    meta.appendChild(document.createTextNode(new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })));
    bubble.appendChild(meta);

    row.appendChild(bubble);

    const actions = document.createElement('div'); actions.className = 'bubble-actions';
    const dlBtn = document.createElement('button');
    dlBtn.className = 'bact-btn'; dlBtn.title = 'Download image'; dlBtn.innerHTML = ICONS.download;
    dlBtn.addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = dataUrl; a.download = `eka-image-${Date.now()}.jpg`;
      document.body.appendChild(a); a.click(); a.remove();
    });
    actions.appendChild(dlBtn);
    row.appendChild(actions);

    chat.appendChild(row);
    chat.scrollTop = chat.scrollHeight;
  }

  // ══════════════════════════════
  // MODULE 1 — Avatar tool bubble
  // Renders a DiceBear SVG avatar (fetched by <img src>, no base64 needed since
  // it's already a lightweight vector URL) inline as a bot chat bubble.
  // ══════════════════════════════
  function addAvatarBubble(url, seed, style) {
    if (voiceOnly) return;

    const row = document.createElement('div'); row.className = 'bubble-row bot';
    const bubble = document.createElement('div'); bubble.className = 'bubble bot';

    const img = document.createElement('img');
    img.src = url; img.className = 'bubble-img generated-img avatar-img';
    img.alt = `${style} avatar for "${seed}"`; img.loading = 'lazy';
    img.addEventListener('click', () => window.open(url, '_blank'));
    bubble.appendChild(img);

    const caption = document.createElement('div');
    caption.className = 'ai-text image-caption';
    caption.textContent = `${style} avatar — "${seed}"`;
    bubble.appendChild(caption);

    const meta = document.createElement('div'); meta.className = 'meta';
    const badge = document.createElement('span'); badge.className = 'meta-badge';
    const b = SOURCE_BADGES.avatar;
    badge.innerHTML = `${b.icon}<span>${b.label}</span>`;
    meta.appendChild(badge);
    meta.appendChild(document.createTextNode(new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })));
    bubble.appendChild(meta);

    row.appendChild(bubble);

    const actions = document.createElement('div'); actions.className = 'bubble-actions';
    const dlBtn = document.createElement('button');
    dlBtn.className = 'bact-btn'; dlBtn.title = 'Download avatar (SVG)'; dlBtn.innerHTML = ICONS.download;
    dlBtn.addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = url; a.download = `eka-avatar-${seed}-${Date.now()}.svg`;
      document.body.appendChild(a); a.click(); a.remove();
    });
    actions.appendChild(dlBtn);
    row.appendChild(actions);

    chat.appendChild(row);
    chat.scrollTop = chat.scrollHeight;
  }

  // Calls the generic tool dispatcher for the avatar tool and renders the result.
  // seed: text to derive the avatar from (e.g. a name); style: DiceBear style name.
  // ══════════════════════════════
  // MODULE 6 — Unified tool-result renderer
  // Used by the auto-router path (/api/chat responses with source:'tool') so
  // tool output renders identically whether triggered by slash-command or by
  // natural-language auto-routing. Mirrors each run*Tool's success branch.
  // ══════════════════════════════
  async function renderToolResult(toolName, data) {
    switch (toolName) {
      case 'generate_avatar': {
        addAvatarBubble(data.url, data.seed, data.style);
        chatHistory.push({ role: 'assistant', content: `[Generated a ${data.style} avatar for: ${data.seed}]` });
        break;
      }
      case 'generate_code': {
        const { code, language: lang, filename, verification } = data;
        const statusLine = verification.passed
          ? `✅ Static check passed — ${verification.detail}`
          : `⚠️ Static check flagged an issue — ${verification.detail}`;
        const md = `\`\`\`${lang}\n${code}\n\`\`\`\n\n${statusLine}\n\n*Note: this is a syntax/structure check only — the code was not executed.*`;
        addBubble(md, 'bot', 'code', false, null, chatHistory.length);
        chatHistory.push({ role: 'assistant', content: md });
        const lastRow = chat.querySelector('.bubble-row.bot:last-of-type');
        const actions = lastRow?.querySelector('.bubble-actions');
        if (actions) {
          const dlBtn = document.createElement('button');
          dlBtn.className = 'bact-btn'; dlBtn.title = `Download ${filename}`; dlBtn.innerHTML = ICONS.download;
          dlBtn.addEventListener('click', () => {
            const blob = new Blob([code], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = filename;
            document.body.appendChild(a); a.click(); a.remove();
            URL.revokeObjectURL(url);
          });
          actions.appendChild(dlBtn);
        }
        break;
      }
      case 'generate_diagram': {
        const { mermaid: mermaidCode, prompt, verification } = data;
        await addDiagramBubble(mermaidCode, prompt, verification);
        chatHistory.push({ role: 'assistant', content: `[Generated a diagram for: ${prompt}]\n\`\`\`mermaid\n${mermaidCode}\n\`\`\`` });
        break;
      }
      case 'generate_document': {
        const { markdown, title, doc_type, actual_format, fallback_reason, filename, file_b64, mime } = data;
        let preamble = `**${title}** _(${doc_type || 'document'})_`;
        if (fallback_reason) preamble += `\n\n> ⚠️ ${fallback_reason}`;
        const md = `${preamble}\n\n---\n\n${markdown}`;
        addBubble(md, 'bot', 'document', false, null, chatHistory.length);
        chatHistory.push({ role: 'assistant', content: `[Generated a ${doc_type || ''} document: ${title}]\n\n${markdown}` });
        const lastRow = chat.querySelector('.bubble-row.bot:last-of-type');
        const actions = lastRow?.querySelector('.bubble-actions');
        if (actions) {
          const dlBtn = document.createElement('button');
          dlBtn.className = 'bact-btn'; dlBtn.title = `Download ${filename}`;
          dlBtn.innerHTML = `${ICONS.download}<span style="margin-left:4px;font-size:11px">${(actual_format || 'md').toUpperCase()}</span>`;
          dlBtn.addEventListener('click', () => {
            const blob = b64ToBlob(file_b64, mime);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = filename;
            document.body.appendChild(a); a.click(); a.remove();
            URL.revokeObjectURL(url);
          });
          actions.appendChild(dlBtn);
        }
        break;
      }
      case 'generate_image': {
        addImageBubble(data.image, data.prompt);
        chatHistory.push({ role: 'assistant', content: `[Generated an image for: ${data.prompt}]` });
        break;
      }
      default:
        addBubble(`Received an unrecognized tool result (${toolName}).`, 'bot');
    }
    autosave();
  }

  async function runAvatarTool(seed, style = 'bottts') {
    addTyping(); isThinking = true; setStatus('thinking');
    try {
      const res = await fetch(`${API_BASE}/api/tool/generate_avatar`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify({ seed, style })
      }).then(r => r.json());

      removeTyping(); isThinking = false; setStatus('ready');

      if (res.ok) {
        addAvatarBubble(res.data.url, res.data.seed, res.data.style);
        chatHistory.push({ role: 'assistant', content: `[Generated a ${res.data.style} avatar for: ${res.data.seed}]` });
        autosave();
      } else {
        addBubble(res.error || 'Avatar generation failed — please try again.', 'bot');
      }
    } catch {
      removeTyping(); isThinking = false; setStatus('ready');
      addBubble('Something went wrong generating that avatar. Please try again.', 'bot');
    }
  }

  // ══════════════════════════════
  // MODULE 2 — Code Writer & Static Verification
  // Renders the generated code as a normal markdown bubble (so it gets the
  // existing copy-button/syntax-block treatment for free), then appends a
  // Download button + a verification status line.
  // ══════════════════════════════
  // ══════════════════════════════
  // MODULE 3 — Diagram Generator (Mermaid.js)
  // Renders actual SVG diagrams client-side via mermaid.render(), not raw code text.
  // ══════════════════════════════
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'strict' });
  }
  let mermaidRenderCounter = 0;

  async function addDiagramBubble(mermaidCode, promptText, verification) {
    if (voiceOnly) return;

    const row = document.createElement('div'); row.className = 'bubble-row bot';
    const bubble = document.createElement('div'); bubble.className = 'bubble bot';

    const diagWrap = document.createElement('div');
    diagWrap.className = 'diagram-wrap';
    diagWrap.style.cssText = 'background:#fff;border-radius:10px;padding:12px;overflow:auto';
    bubble.appendChild(diagWrap);

    if (typeof mermaid === 'undefined') {
      diagWrap.textContent = 'Diagram renderer failed to load.';
    } else {
      try {
        const id = `mmd-${Date.now()}-${mermaidRenderCounter++}`;
        const { svg } = await mermaid.render(id, mermaidCode);
        diagWrap.innerHTML = svg;
      } catch (renderErr) {
        diagWrap.innerHTML = '';
        const fallback = document.createElement('pre');
        fallback.textContent = mermaidCode;
        diagWrap.style.background = '';
        diagWrap.appendChild(fallback);
        const warn = document.createElement('div');
        warn.className = 'ai-text';
        warn.style.cssText = 'color:var(--danger,#e55);margin-top:6px;font-size:13px';
        warn.textContent = `⚠️ Mermaid couldn't render this diagram (${renderErr.message || 'syntax error'}). Raw syntax shown above.`;
        bubble.appendChild(warn);
      }
    }

    const caption = document.createElement('div');
    caption.className = 'ai-text image-caption';
    caption.textContent = promptText;
    bubble.appendChild(caption);

    if (verification && !verification.passed) {
      const vWarn = document.createElement('div');
      vWarn.className = 'ai-text';
      vWarn.style.cssText = 'color:var(--warn,#e5a53e);font-size:13px;margin-top:2px';
      vWarn.textContent = `⚠️ ${verification.detail}`;
      bubble.appendChild(vWarn);
    }

    const meta = document.createElement('div'); meta.className = 'meta';
    const badge = document.createElement('span'); badge.className = 'meta-badge';
    const b = SOURCE_BADGES.diagram;
    badge.innerHTML = `${b.icon}<span>${b.label}</span>`;
    meta.appendChild(badge);
    meta.appendChild(document.createTextNode(new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })));
    bubble.appendChild(meta);

    row.appendChild(bubble);

    const actions = document.createElement('div'); actions.className = 'bubble-actions';
    const copyBtn = document.createElement('button');
    copyBtn.className = 'bact-btn'; copyBtn.title = 'Copy Mermaid syntax'; copyBtn.innerHTML = ICONS.copy;
    copyBtn.addEventListener('click', () => navigator.clipboard?.writeText(mermaidCode));
    actions.appendChild(copyBtn);

    const dlBtn = document.createElement('button');
    dlBtn.className = 'bact-btn'; dlBtn.title = 'Download .mmd file'; dlBtn.innerHTML = ICONS.download;
    dlBtn.addEventListener('click', () => {
      const blob = new Blob([mermaidCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `eka-diagram-${Date.now()}.mmd`;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    });
    actions.appendChild(dlBtn);
    row.appendChild(actions);

    chat.appendChild(row);
    chat.scrollTop = chat.scrollHeight;
  }

  // ══════════════════════════════
  // MODULE 5 — Document Generator (md / docx / pdf)
  // Renders the Markdown content as a normal formatted bubble (preview), then
  // attaches a prominent Download button that decodes the base64 file client-side.
  // ══════════════════════════════
  function b64ToBlob(b64, mime) {
    const bytes = atob(b64);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }

  async function runDocumentTool(topic, docType = 'report', format = 'md') {
    addTyping(); isThinking = true; setStatus('thinking');
    try {
      const res = await fetch(`${API_BASE}/api/tool/generate_document`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, credentials: 'include',
        body: JSON.stringify({ topic, doc_type: docType, format })
      }).then(r => r.json());

      removeTyping(); isThinking = false; setStatus('ready');

      if (!res.ok) {
        addBubble(res.error || 'Document generation failed — please try again.', 'bot');
        return;
      }

      const { markdown, title, actual_format, requested_format, fallback_reason, filename, file_b64, mime } = res.data;
      let preamble = `**${title}** _(${docType})_`;
      if (fallback_reason) preamble += `\n\n> ⚠️ ${fallback_reason}`;
      const md = `${preamble}\n\n---\n\n${markdown}`;

      addBubble(md, 'bot', 'document', false, null, chatHistory.length);
      chatHistory.push({ role: 'assistant', content: `[Generated a ${docType} document: ${title}]\n\n${markdown}` });

      const lastRow = chat.querySelector('.bubble-row.bot:last-of-type');
      const actions = lastRow?.querySelector('.bubble-actions');
      if (actions) {
        const dlBtn = document.createElement('button');
        dlBtn.className = 'bact-btn'; dlBtn.title = `Download ${filename}`;
        dlBtn.innerHTML = `${ICONS.download}<span style="margin-left:4px;font-size:11px">${actual_format.toUpperCase()}</span>`;
        dlBtn.addEventListener('click', () => {
          const blob = b64ToBlob(file_b64, mime);
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url; a.download = filename;
          document.body.appendChild(a); a.click(); a.remove();
          URL.revokeObjectURL(url);
        });
        actions.appendChild(dlBtn);
      }

      autosave();
    } catch {
      removeTyping(); isThinking = false; setStatus('ready');
      addBubble('Something went wrong generating that document. Please try again.', 'bot');
    }
  }

  async function runDiagramTool(promptText) {
    addTyping(); isThinking = true; setStatus('thinking');
    try {
      const res = await fetch(`${API_BASE}/api/tool/generate_diagram`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, credentials: 'include',
        body: JSON.stringify({ prompt: promptText })
      }).then(r => r.json());

      removeTyping(); isThinking = false; setStatus('ready');

      if (!res.ok) {
        addBubble(res.error || 'Diagram generation failed — please try again.', 'bot');
        return;
      }

      const { mermaid: mermaidCode, prompt, verification } = res.data;
      await addDiagramBubble(mermaidCode, prompt, verification);
      chatHistory.push({ role: 'assistant', content: `[Generated a diagram for: ${prompt}]\n\`\`\`mermaid\n${mermaidCode}\n\`\`\`` });
      autosave();
    } catch {
      removeTyping(); isThinking = false; setStatus('ready');
      addBubble('Something went wrong generating that diagram. Please try again.', 'bot');
    }
  }

  async function runCodeTool(promptText, language = 'python') {
    addTyping(); isThinking = true; setStatus('thinking');
    try {
      const res = await fetch(`${API_BASE}/api/tool/generate_code`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, credentials: 'include',
        body: JSON.stringify({ prompt: promptText, language })
      }).then(r => r.json());

      removeTyping(); isThinking = false; setStatus('ready');

      if (!res.ok) {
        addBubble(res.error || 'Code generation failed — please try again.', 'bot');
        return;
      }

      const { code, language: lang, extension, filename, verification } = res.data;
      const statusLine = verification.passed
        ? `✅ Static check passed — ${verification.detail}`
        : `⚠️ Static check flagged an issue — ${verification.detail}`;
      const md = `\`\`\`${lang}\n${code}\n\`\`\`\n\n${statusLine}\n\n*Note: this is a syntax/structure check only — the code was not executed.*`;

      addBubble(md, 'bot', 'code', false, null, chatHistory.length);
      chatHistory.push({ role: 'assistant', content: md });

      // Attach a download button to the action bar of the bubble just added
      const lastRow = chat.querySelector('.bubble-row.bot:last-of-type');
      const actions = lastRow?.querySelector('.bubble-actions');
      if (actions) {
        const dlBtn = document.createElement('button');
        dlBtn.className = 'bact-btn'; dlBtn.title = `Download ${filename}`; dlBtn.innerHTML = ICONS.download;
        dlBtn.addEventListener('click', () => {
          const blob = new Blob([code], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url; a.download = filename;
          document.body.appendChild(a); a.click(); a.remove();
          URL.revokeObjectURL(url);
        });
        actions.appendChild(dlBtn);
      }

      autosave();
    } catch {
      removeTyping(); isThinking = false; setStatus('ready');
      addBubble('Something went wrong generating that code. Please try again.', 'bot');
    }
  }

  function addTyping() {
    if (voiceOnly) return;
    const t = document.createElement('div'); t.className = 'bubble bot typing'; t.id = 'typingIndicator';
    t.innerHTML = `<div class="think-wave"><span class="think-bar"></span><span class="think-bar"></span><span class="think-bar"></span><span class="think-bar"></span><span class="think-bar"></span></div><span class="think-label">EKA is thinking</span>`;
    chat.appendChild(t); chat.scrollTop = chat.scrollHeight;
  }
  function removeTyping() { document.getElementById('typingIndicator')?.remove(); }

  // ══════════════════════════════
  // STATUS
  // ══════════════════════════════
  function setStatus(state) {
    const dot = document.querySelector('.hstatus-dot');
    const label = document.querySelector('.header-status');
    if (!dot || !label) return;
    dot.className = 'hstatus-dot' + (state !== 'ready' ? ` ${state}` : '');
    const map = { ready:'Ready', thinking:'Thinking…', speaking:'Speaking…' };
    label.innerHTML = ''; label.appendChild(dot);
    label.appendChild(document.createTextNode(' ' + (map[state] || 'Ready')));
  }

  // ══════════════════════════════
  // SEND MESSAGE
  // ══════════════════════════════
  // Shared: calls /api/chat using the current chatHistory (last entry must be
  // the user's message) and renders the reply. Used by normal sends AND regenerate.
  async function fetchAndRenderReply(imageToSend = null) {
    const lastUser = [...chatHistory].reverse().find(m => m.role === 'user');
    const messageText = lastUser ? lastUser.content : '';

    addTyping(); isThinking = true; setStatus('thinking');
    try {
      const body = { message: messageText || 'Please analyse this image.', history: chatHistory, wiki: webSearchEnabled };
      if (imageToSend) body.image = imageToSend;

      const res = await fetch(`${API_BASE}/api/chat`, {
        method:'POST', headers:{'Content-Type':'application/json', ...authHeaders()}, credentials:'include', body: JSON.stringify(body)
      }).then(r => r.json());

      removeTyping(); isThinking = false;

      // ── Auto-routed tool result (Module 6) ──
      if (res.source === 'tool' && res.tool_data) {
        setStatus('ready');
        await renderToolResult(res.tool, res.tool_data);
        return;
      }

      const srcLabel = res.source === 'web+ai' ? 'web' : res.source === 'local' ? 'cached' : 'ai';
      chatHistory.push({ role:'assistant', content: res.reply });

      setTimeout(() => {
        addBubble(res.reply, 'bot', srcLabel, true, null, chatHistory.length - 1);
        setStatus('speaking');
        const plain = res.reply.replace(/(\*\*|__|[\*_`])/g,'').replace(/<[^>]*>/g,'').replace(/[^\p{L}\p{N}\s.,!?]/gu,'').trim();
        speak(plain, () => setStatus('ready'));
        autosave();
      }, 200);
    } catch {
      removeTyping(); isThinking = false; setStatus('ready');
      addBubble('Something went wrong. Please try again.', 'bot');
    }
  }

  async function sendMessage(text) {
    const cleaned = text.trim();
    if (!cleaned && !attachedImage) return;
    if (isThinking) return;
    playFx(720, 0.05);
    hideEmptyState();

    // ── Document tool trigger: "/doc <format> <topic>" ──
    // e.g. "/doc pdf project report on Q3 sales" — format defaults to md if omitted/unrecognized.
    const docMatch = cleaned.match(/^\/doc\s+(.+)$/i);
    if (docMatch) {
      const knownFormats = ['md', 'docx', 'pdf'];
      const words = docMatch[1].trim().split(/\s+/);
      let format = 'md', topicWords = words;
      if (words.length > 1 && knownFormats.includes(words[0].toLowerCase())) {
        format = words[0].toLowerCase();
        topicWords = words.slice(1);
      }
      const topic = topicWords.join(' ');
      chatHistory.push({ role: 'user', content: cleaned });
      addBubble(cleaned, 'user', '', false, null, chatHistory.length - 1);
      msg.value = '';
      await runDocumentTool(topic, 'report', format);
      return;
    }

    // ── Diagram tool trigger: "/diagram <description>" ──
    const diagramMatch = cleaned.match(/^\/diagram\s+(.+)$/i);
    if (diagramMatch) {
      const description = diagramMatch[1].trim();
      chatHistory.push({ role: 'user', content: cleaned });
      addBubble(cleaned, 'user', '', false, null, chatHistory.length - 1);
      msg.value = '';
      await runDiagramTool(description);
      return;
    }

    // ── Code tool trigger: "/code <language> <task description>" ──
    // e.g. "/code python write a function to reverse a linked list"
    // If the first word isn't a recognized language, defaults to python and
    // treats the whole remainder as the task.
    const codeMatch = cleaned.match(/^\/code\s+(.+)$/i);
    if (codeMatch) {
      const knownLangs = ['python','javascript','typescript','bash','shell','html','css','java','c','cpp','c++','go','rust','sql','json','yaml','ruby','php','swift','kotlin'];
      const words = codeMatch[1].trim().split(/\s+/);
      let language = 'python', taskWords = words;
      if (words.length > 1 && knownLangs.includes(words[0].toLowerCase())) {
        language = words[0].toLowerCase();
        taskWords = words.slice(1);
      }
      const task = taskWords.join(' ');
      chatHistory.push({ role: 'user', content: cleaned });
      addBubble(cleaned, 'user', '', false, null, chatHistory.length - 1);
      msg.value = '';
      await runCodeTool(task, language);
      return;
    }

    // ── Avatar tool trigger: "/avatar <seed> [style]" ──
    // e.g. "/avatar Rohan" or "/avatar Rohan pixel-art"
    const avatarMatch = cleaned.match(/^\/avatar\s+(.+)$/i);
    if (avatarMatch) {
      const parts = avatarMatch[1].trim().split(/\s+/);
      const knownStyles = ['bottts','avataaars','adventurer','pixel-art','identicon','thumbs','fun-emoji','lorelei','notionists','shapes'];
      let style = 'bottts';
      if (parts.length > 1 && knownStyles.includes(parts[parts.length - 1].toLowerCase())) {
        style = parts.pop().toLowerCase();
      }
      const seed = parts.join(' ');
      chatHistory.push({ role: 'user', content: cleaned });
      addBubble(cleaned, 'user', '', false, null, chatHistory.length - 1);
      msg.value = '';
      await runAvatarTool(seed, style);
      return;
    }

    // ── Image generation mode: the typed text is a prompt, not a chat message ──
    if (imageGenEnabled && !attachedImage) {
      chatHistory.push({ role: 'user', content: cleaned });
      addBubble(cleaned, 'user', '', false, null, chatHistory.length - 1);
      msg.value = '';
      addTyping(); isThinking = true; setStatus('thinking');

      try {
        const res = await fetch(`${API_BASE}/api/image`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
          body: JSON.stringify({ prompt: cleaned })
        }).then(r => r.json());

        removeTyping(); isThinking = false; setStatus('ready');

        if (res.image) {
          addImageBubble(res.image, cleaned);
          chatHistory.push({ role: 'assistant', content: `[Generated an image for: ${cleaned}]` });
          autosave();
        } else {
          addBubble(res.error || 'Image generation failed — please try again.', 'bot');
        }
      } catch {
        removeTyping(); isThinking = false; setStatus('ready');
        addBubble('Something went wrong generating that image. Please try again.', 'bot');
      }
      return;
    }

    const imageToSend = attachedImage;
    if (attachedImage) { attachedImage = null; attachPreview.style.display = 'none'; attachBtn.classList.remove('has-file'); }

    chatHistory.push({ role:'user', content: cleaned || '[image attached]' });
    addBubble(cleaned || '', 'user', '', false, imageToSend, chatHistory.length - 1);
    msg.value = '';
    await fetchAndRenderReply(imageToSend);
  }

  // ══════════════════════════════
  // LANGUAGE MAP — app language code → BCP-47 locale for TTS/STT
  // ══════════════════════════════
  const LANG_LOCALE = {
    en: 'en-IN', hi: 'hi-IN', bn: 'bn-IN', ta: 'ta-IN', te: 'te-IN',
    mr: 'mr-IN', gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', pa: 'pa-IN',
    ur: 'ur-IN', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', ja: 'ja-JP',
    zh: 'zh-CN', ar: 'ar-SA', ru: 'ru-RU', pt: 'pt-PT',
  };
  function detectSpokenLocale(text) {
    if (/[\u0900-\u097F]/.test(text)) return 'hi-IN';
    if (/[\u0980-\u09FF]/.test(text)) return 'bn-IN';
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta-IN';
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te-IN';
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu-IN';
    if (/[\u0C80-\u0CFF]/.test(text)) return 'kn-IN';
    if (/[\u0D00-\u0D7F]/.test(text)) return 'ml-IN';
    if (/[\u0A00-\u0A7F]/.test(text)) return 'pa-IN';
    if (/[\u0600-\u06FF]/.test(text)) return 'ur-IN';
    if (/[\u4E00-\u9FFF]/.test(text)) return 'zh-CN';
    if (/[\u3040-\u30FF]/.test(text)) return 'ja-JP';
    if (/[\u0400-\u04FF]/.test(text)) return 'ru-RU';
    return 'en-IN';
  }

  // ══════════════════════════════
  // TTS — uses waveform animation
  // ══════════════════════════════
  function speak(text, onEnd = null) {
    if (!text || isMuted || !('speechSynthesis' in window)) { onEnd?.(); return; }
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.0; utter.pitch = 1.05;
    const sel = languageToggle.value;
    utter.lang = sel !== 'auto' ? (LANG_LOCALE[sel] || 'en-IN') : detectSpokenLocale(text);
    utter.onstart = () => { speakingAnim.style.display = 'flex'; };
    utter.onend   = () => { speakingAnim.style.display = 'none'; if (voiceOnly) wakeMicButton.style.display = 'flex'; else msg.focus(); onEnd?.(); };
    utter.onerror = () => { speakingAnim.style.display = 'none'; onEnd?.(); };
    speechSynthesis.speak(utter);
  }

  // ══════════════════════════════
  // SPEECH RECOGNITION
  // ══════════════════════════════
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    recognition = new SR(); recognition.continuous = false; recognition.interimResults = false; recognition.lang = 'en-IN';
    recognition.onstart  = () => { mic.classList.add('mic-active'); micStatus.textContent = 'Listening…'; };
    recognition.onresult = e => { micStatus.textContent = ''; sendMessage(e.results[0][0].transcript); };
    recognition.onend    = () => { mic.classList.remove('mic-active'); micStatus.textContent = ''; if (!voiceOnly) msg.focus(); };
    recognition.onerror  = () => { mic.classList.remove('mic-active'); micStatus.textContent = ''; };
    mic.addEventListener('click', () => {
      const sel = languageToggle.value;
      recognition.lang = sel !== 'auto' ? (LANG_LOCALE[sel] || 'en-IN') : 'en-IN';
      try { recognition.start(); } catch(e){}
    });
    wakeMicButton?.addEventListener('click', () => {
      wakeMicButton.style.display='none';
      const sel = languageToggle.value;
      recognition.lang = sel !== 'auto' ? (LANG_LOCALE[sel] || 'en-IN') : 'en-IN';
      try { recognition.start(); } catch(e){}
    });
  } else { mic.style.display = 'none'; }

  // ══════════════════════════════
  // TOAST
  // ══════════════════════════════
  let toastTimer = null;
  function showToast(message, icon) {
    if (!message) return;
    let t = document.getElementById('eka-toast');
    if (!t) { t = document.createElement('div'); t.id = 'eka-toast'; t.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(30,20,32,0.97);border:1px solid rgba(201,168,76,0.3);color:#C9A84C;font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:500;padding:9px 20px;border-radius:99px;opacity:0;transition:opacity 0.25s ease,transform 0.25s ease;pointer-events:none;z-index:9999;white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,0.5);display:flex;align-items:center;gap:8px;`; document.body.appendChild(t); }
    t.innerHTML = (icon ? `<span class="toast-icon">${icon}</span>` : '') + `<span>${message}</span>`;
    t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(12px)'; }, 2400);
  }

  // ══════════════════════════════
  // EVENT BINDINGS
  // ══════════════════════════════
  send.addEventListener('click', () => sendMessage(msg.value));
  msg.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && enterToSend) { e.preventDefault(); sendMessage(msg.value); } });

  // Keyboard viewport fix
  if (window.visualViewport) {
    let lastH = window.visualViewport.height;
    window.visualViewport.addEventListener('resize', () => { const h = window.visualViewport.height; if (lastH - h > 80) requestAnimationFrame(() => { chat.scrollTop = chat.scrollHeight; }); lastH = h; });
    msg.addEventListener('focus', () => { setTimeout(() => { chat.scrollTop = chat.scrollHeight; }, 320); });
  }

  // ══════════════════════════════
  // EMPTY-STATE (centered logo + greeting shown only on an empty chat)
  // ══════════════════════════════
  const emptyState     = document.getElementById('emptyState');
  const emptyStateText = document.getElementById('emptyStateText');

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function updateEmptyStateText() {
    if (!emptyStateText) return;
    const p = JSON.parse(localStorage.getItem('eka-profile') || '{}');
    emptyStateText.innerHTML = p.name
      ? `Hello <strong>${escapeHtml(p.name)}</strong>, how can I help you?`
      : `Hello! How can I help you today?`;
  }

  function showEmptyState() {
    updateEmptyStateText();
    if (emptyState) emptyState.style.display = 'flex';
  }

  function hideEmptyState() {
    if (emptyState) emptyState.style.display = 'none';
  }

  // ══════════════════════════════
  // SCROLL-TO-BOTTOM BUTTON
  // ══════════════════════════════
  const scrollBottomBtn = document.getElementById('scrollBottomBtn');
  if (scrollBottomBtn) {
    chat.addEventListener('scroll', () => {
      const distFromBottom = chat.scrollHeight - chat.scrollTop - chat.clientHeight;
      scrollBottomBtn.classList.toggle('show', distFromBottom > 160);
    });
    scrollBottomBtn.addEventListener('click', () => {
      chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
    });
  }

  // ══════════════════════════════
  // INIT
  // ══════════════════════════════
  currentSessionId = genId();
  renderSessionList();
  checkOnboarding();

  if (chatHistory.length === 0) showEmptyState(); else hideEmptyState();

  msg.focus();

});
