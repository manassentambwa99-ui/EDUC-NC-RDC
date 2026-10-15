try {
(function () {
  const shR = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const cap = t => t.charAt(0).toUpperCase() + t.slice(1);
  const QQ = window.EDUC_QUESTIONS || {}, QB = window.EDUC_QB || {};
  const MANQ = [], ATT = { facile: 92152, difficile: 103850, pro: 97822 }, NB = { facile: 240, difficile: 258, pro: 240 };
  const QZ = window.EDUC_QZ || {};
  const inflate = src => {
    let pos = 0, bb = 0, bc = 0; const out = [];
    const bits = n => { while (bc < n) { if (pos >= src.length) throw new Error('fin'); bb |= src[pos++] << bc; bc += 8; } const v = bb & ((1 << n) - 1); bb >>>= n; bc -= n; return v; };
    const mk = L => { const count = new Array(16).fill(0), sym = []; L.forEach(l => count[l]++); count[0] = 0; const offs = [0, 0]; for (let i = 1; i < 15; i++) offs[i + 1] = offs[i] + count[i]; L.forEach((l, s) => { if (l) sym[offs[l]++] = s; }); return { count, sym }; };
    const dc = h => { let code = 0, first = 0, idx = 0; for (let l = 1; l < 16; l++) { code |= bits(1); const c = h.count[l]; if (code - c < first) return h.sym[idx + (code - first)]; idx += c; first += c; first <<= 1; code <<= 1; } throw new Error('code'); };
    const LB = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258], LE = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];
    const DB = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577], DE = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
    let fl, fd; const fix = () => { if (!fl) { const l = []; for (let i = 0; i < 288; i++) l.push(i < 144 ? 8 : i < 256 ? 9 : i < 280 ? 7 : 8); fl = mk(l); fd = mk(new Array(30).fill(5)); } };
    let last;
    do {
      last = bits(1); const t = bits(2);
      if (t === 0) { bb = 0; bc = 0; const len = src[pos] | (src[pos + 1] << 8); pos += 4; for (let i = 0; i < len; i++) out.push(src[pos++]); continue; }
      let lt, dt;
      if (t === 1) { fix(); lt = fl; dt = fd; }
      else {
        const nl = bits(5) + 257, nd = bits(5) + 1, nc = bits(4) + 4, ORD = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15], cl = new Array(19).fill(0);
        for (let i = 0; i < nc; i++) cl[ORD[i]] = bits(3);
        const ch = mk(cl), L = [];
        while (L.length < nl + nd) { const s = dc(ch); if (s < 16) L.push(s); else { let p = 0, r; if (s === 16) { p = L[L.length - 1]; r = 3 + bits(2); } else if (s === 17) r = 3 + bits(3); else r = 11 + bits(7); while (r--) L.push(p); } }
        lt = mk(L.slice(0, nl)); dt = mk(L.slice(nl));
      }
      for (;;) {
        let s = dc(lt); if (s < 256) out.push(s); else if (s === 256) break;
        else { s -= 257; const len = LB[s] + bits(LE[s]), d = dc(dt), dist = DB[d] + bits(DE[d]); for (let i = 0; i < len; i++) out.push(out[out.length - dist]); }
      }
    } while (!last);
    return new Uint8Array(out);
  };
  const bytes = s => { const bin = atob(s), by = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) by[i] = bin.charCodeAt(i); return by; };
  const b64 = s => JSON.parse(new TextDecoder('utf-8').decode(bytes(s)));
  const dec = k => { try { if (QQ[k]) return QQ[k]; let r = null; if (window.EDUC_QZ && window.EDUC_QZ[k]) r = JSON.parse(new TextDecoder('utf-8').decode(inflate(bytes(window.EDUC_QZ[k])))); else if (window.EDUC_QB && window.EDUC_QB[k]) r = b64(window.EDUC_QB[k]); if (!r || !r.length) { MANQ.push(k); return []; } return r; } catch (e) { MANQ.push(k); return []; } };
  const POOL = { facile: dec('facile'), difficile: dec('difficile'), pro: dec('pro') };
  if (!POOL.facile.length && !POOL.difficile.length && !POOL.pro.length) throw new Error('fichiers questions-facile.js, questions-difficile.js, questions-pro.js introuvables');
  if (MANQ.length) { try { console.warn('EDUC : fichiers de questions manquants ou abîmés :', MANQ.join(', ')); } catch (e) {} }
  const XPN = { facile: 10, difficile: 25, pro: 50 };
  const ORDER = ['facile', 'difficile', 'pro'], SEUIL = 200, LABEL = { facile: 'Facile', difficile: 'Difficile', pro: 'Pro' };
  const EXP = {
    P: "Aimer son pays, c'est le servir par des actes concrets et quotidiens, pas seulement par des paroles.",
    C: "Un citoyen actif participe, vote, contrôle et propose : la démocratie vit de ceux qui s'engagent.",
    S: "La confiance en soi se construit par l'effort et le courage d'essayer ; elle ne dépend ni de ton origine ni du regard des autres.",
    H: "L'intégrité, c'est agir de la même façon que l'on soit vu ou non : c'est la base de la confiance dans un pays.",
    U: "L'unité nationale se construit chaque jour par le respect des différences et la solidarité entre Congolais.",
    R: "Être responsable, c'est assumer ses actes et agir au lieu d'attendre que d'autres le fassent.",
    E: "L'éducation libère : elle donne les moyens de comprendre, de choisir et de servir son pays.",
    B: "Ce qui appartient à tous doit être protégé par tous, pour nous et pour les générations futures.",
    N: "La paix se choisit chaque jour : par la parole, le pardon et le refus de la haine."
  };
  const PRAISE = ['Bravo !', 'Excellent !', 'Quel patriote !', 'Bien joué !', 'Magnifique !', 'Belle réflexion !'];

  let uid = 'anonyme', niv = 'facile', streak = 0, prog = { facile: 0, difficile: 0, pro: 0 };
  const vus = { facile: new Set(), difficile: new Set(), pro: new Set() };
  const cle = n => n + '_' + uid;
  const sessionUser = () => { try { return JSON.parse(localStorage.getItem('educ_utilisateur_connecte') || 'null'); } catch (e) { return null; } };
  const uidDe = u => u ? encodeURIComponent((u.telephone || '') + '|' + (u.nomComplet || (u.nom || '') + ' ' + (u.postnom || '') + ' ' + (u.prenom || ''))).toLowerCase() : 'anonyme';
  const VERROU = !!(window.EDUC_CONFIG && window.EDUC_CONFIG.VERROUILLER_NIVEAUX);
  const debloque = n => { if (!VERROU) return true; const k = ORDER.indexOf(n); return k === 0 || prog[ORDER[k - 1]] >= SEUIL; };
  const tousTermines = () => ORDER.every(n => POOL[n].length && vus[n].size >= POOL[n].length);
  window.educProgression = () => { let done = 0, total = 0; const par = {}; ORDER.forEach(n => { done += vus[n].size; total += POOL[n].length; par[n] = { done: vus[n].size, total: POOL[n].length }; }); return { done: done, total: total, complet: total > 0 && tousTermines(), uid: uid, par: par }; };
  const sauver = () => {
    try {
      localStorage.setItem(cle('educ_prog'), JSON.stringify(prog));
      const o = {}; ORDER.forEach(n => o[n] = [...vus[n]]); localStorage.setItem(cle('educ_vus3'), JSON.stringify(o));
      localStorage.setItem(cle('educ_xp'), String(userXP));
    } catch (e) {}
  };

  // Chaque identité (téléphone + nom) a sa propre progression : une nouvelle inscription repart de zéro
  function chargerEtat(u) {
    uid = uidDe(u || sessionUser());
    prog = { facile: 0, difficile: 0, pro: 0 }; ORDER.forEach(n => vus[n] = new Set());
    userXP = 0; streak = 0;
    try {
      const pg = JSON.parse(localStorage.getItem(cle('educ_prog')) || 'null'); if (pg) Object.assign(prog, pg);
      const vv = JSON.parse(localStorage.getItem(cle('educ_vus3')) || 'null'); if (vv) ORDER.forEach(n => { if (Array.isArray(vv[n])) vv[n].forEach(k => vus[n].add(k)); });
      const x = parseInt(localStorage.getItem(cle('educ_xp'))); if (!isNaN(x)) userXP = x;
    } catch (e) {}
    niv = ORDER.filter(n => debloque(n) && POOL[n].length && vus[n].size < POOL[n].length)[0] || ORDER.filter(n => POOL[n].length)[0] || 'facile';
  }

  window.updateXPBar = function () {
    let done = 0, total = 0; ORDER.forEach(n => { done += vus[n].size; total += POOL[n].length; });
    const pct = total ? Math.round(done / total * 100) : 0;
    const set = (id, fn) => { const el = document.getElementById(id); if (el) fn(el); };
    set('xp-fill', el => el.style.width = pct + '%');
    set('user-xp-percent', el => el.innerText = pct + '%');
    set('user-xp-text', el => el.innerText = done + ' / ' + total + ' questions · ' + userXP + ' XP');
    set('user-level', el => el.innerText = 'Niveau ' + LABEL[niv]);
  };
  window.addXP = function (a) {
    userXP += a; sauver(); updateXPBar();
    const p = document.createElement('div'); p.className = 'xp-pop'; p.innerText = '+' + a + ' XP'; document.body.appendChild(p); setTimeout(() => p.remove(), 1100);
  };

  function meta() {
    const m = document.getElementById('quiz-meta'), k = ORDER.indexOf(niv), nx = ORDER[k + 1], n = vus[niv].size, t = POOL[niv].length;
    if (m) { let s = 'Niveau ' + LABEL[niv] + ' · ' + n + '/' + t + ' questions répondues'; if (VERROU && nx && !debloque(nx)) s += ' · encore ' + Math.max(SEUIL - prog[niv], 0) + ' pour débloquer ' + LABEL[nx]; m.innerText = s; }
    const f = document.getElementById('lvl-fill'); if (f) f.style.transform = 'scaleX(' + (t ? Math.min(n / t, 1) : 0) + ')';
    document.querySelectorAll('.lvl-chip').forEach(c => { const x = c.dataset.n, lk = !debloque(x); c.classList.toggle('lock', lk); c.classList.toggle('on', x === niv); c.querySelector('small').innerText = !POOL[x].length ? '⚠ fichier manquant' : lk ? '🔒 verrouillé' : '+' + XPN[x] + ' XP'; });
  }

  function bravo(txt) {
    const box = document.querySelector('#tab-quiz .quiz-container-box'); if (!box) return;
    const p = document.createElement('div'); p.className = 'praise'; p.innerText = txt; box.appendChild(p);
    for (let i = 0; i < 8; i++) {
      const s = document.createElement('i'); s.className = 'fa-solid fa-star praise-star';
      const a = i * Math.PI / 4; s.style.setProperty('--dx', Math.round(Math.cos(a) * 90) + 'px'); s.style.setProperty('--dy', Math.round(Math.sin(a) * 60) + 'px'); box.appendChild(s); setTimeout(() => s.remove(), 1300);
    }
    setTimeout(() => p.remove(), 1400);
    try { if (navigator.vibrate) navigator.vibrate(30); } catch (e) {}
  }

  function finCard() {
    const g = id => document.getElementById(id), k = ORDER.indexOf(niv), suiv = ORDER[k + 1];
    g('quiz-q-text').innerText = 'Bravo ! Vous avez terminé toutes les questions du niveau ' + LABEL[niv] + '.';
    let h = '<button class="fin-btn" data-a="redo">↻ Recommencer ce niveau à zéro</button>';
    if (suiv && debloque(suiv)) h += '<button class="fin-btn alt" data-a="next">Passer au niveau ' + LABEL[suiv] + ' →</button>';
    h = '<button class="fin-btn" data-a="brevet-niv">🏅 Voir mon brevet ' + ({ facile: 'Bronze', difficile: 'Argent', pro: 'Or' }[niv] || '') + ' (avec mon nom)</button>' + h;
    if (tousTermines()) h = '<button class="fin-btn" data-a="brevet">💎 Voir mon Grand brevet national</button>' + h;
    if (!suiv) h += '<button class="fin-btn alt" data-a="all">Tout recommencer à zéro (tous les niveaux)</button>';
    g('quiz-options-list').innerHTML = h;
    g('quiz-feedback').style.display = 'none'; g('next-q-btn').style.display = 'none';
    const ex = g('quiz-explain'); if (ex) ex.style.display = 'none';
    bravo('Félicitations !'); updateXPBar(); meta();
  }

  window.generateInfiniteQuizQuestion = function () {
    const pool = POOL[niv], g = id => document.getElementById(id);
    if (!pool.length) {
      const qt = g('quiz-q-text'), f = 'questions-' + niv + '.js', nv = niv; g('quiz-options-list').innerHTML = '';
      qt.innerText = 'Chargement des questions ' + LABEL[nv] + '…';
      if (!window['_educRetry' + nv]) {
        window['_educRetry' + nv] = 1; const sc = document.createElement('script'); sc.src = f + '?v=' + Date.now();
        sc.onload = () => { POOL[nv] = dec(nv); if (niv === nv) generateInfiniteQuizQuestion(); }; sc.onerror = () => { window['_educRetry' + nv] = 0; if (niv === nv) qt.innerText = 'Le fichier ' + f + ' est introuvable. Envoyez-le à la racine du dépôt GitHub, à côté de index.html.'; };
        document.head.appendChild(sc); return;
      }
      window['_educRetry' + nv] = 0;
      fetch(f + '?v=' + Date.now(), { cache: 'no-store' }).then(r => r.ok ? r.text().then(t => { qt.innerText = 'Le fichier ' + f + ' sur GitHub fait ' + t.length + ' octets : il est incomplet ou ancien. Renvoyez la dernière version du fichier ' + f + ', puis videz les données du site.'; }) : (qt.innerText = 'Le fichier ' + f + ' est introuvable (erreur ' + r.status + ').')).catch(() => { qt.innerText = 'Le fichier ' + f + ' ne peut pas être chargé (connexion ?).'; });
      return;
    }
    if (vus[niv].size >= pool.length) { finCard(); return; }
    const libres = []; for (let k = 0; k < pool.length; k++) if (!vus[niv].has(k)) libres.push(k);
    const i = libres[Math.floor(Math.random() * libres.length)], b = pool[i];
    const opts = b.fix ? (b.c === 'Vrai' || b.c === 'Faux' ? ['Vrai', 'Faux'] : ['Oui', 'Non']) : shR([b.c, ...b.w]);
    currentActiveQuestion = { question: b.q, options: opts, correctAnswer: b.c, idx: i, niv: niv, expl: b.e || EXP[b.d] || '' };
    const ex = g('quiz-explain'); if (ex) { ex.style.display = 'none'; ex.innerText = ''; }
    renderQuizUI(); meta(); updateXPBar();
  };

  window.validateAnswerChoice = function (btn, txt) {
    const all = document.querySelectorAll('.quiz-option-btn'); all.forEach(b => b.disabled = true);
    const q = currentActiveQuestion, ok = txt === q.correctAnswer, fb = document.getElementById('quiz-feedback'), ic = btn.querySelector('i');
    const avant = prog[q.niv]; vus[q.niv].add(q.idx); prog[q.niv]++;
    if (ok) {
      streak++; btn.classList.add('correct', 'pulse-ok'); ic.className = 'fa-solid fa-circle-check'; ic.style.color = 'var(--success-green)';
      fb.innerText = 'Excellente réponse ! +' + XPN[q.niv] + ' XP' + (streak >= 3 ? ' · 🔥 ' + streak + ' d\'affilée' : ''); fb.className = 'quiz-feedback-box success';
      addXP(XPN[q.niv]); bravo(streak >= 3 ? '🔥 ' + streak + ' d\'affilée !' : PRAISE[Math.floor(Math.random() * PRAISE.length)]);
    } else {
      streak = 0; btn.classList.add('incorrect', 'shake-no'); ic.className = 'fa-solid fa-circle-xmark'; ic.style.color = 'var(--error-red)';
      all.forEach(b => { if (b.innerText.trim() === q.correctAnswer.trim()) { b.classList.add('correct'); b.querySelector('i').className = 'fa-solid fa-circle-check'; b.querySelector('i').style.color = 'var(--success-green)'; } });
      fb.innerText = 'Pas tout à fait. Courage : chaque erreur est un pas vers le progrès !'; fb.className = 'quiz-feedback-box error';
    }
    const ex = document.getElementById('quiz-explain'); if (ex && q.expl) { ex.innerText = '💡 ' + q.expl; ex.style.display = 'block'; }
    sauver(); updateXPBar(); meta();
    const nx = ORDER[ORDER.indexOf(q.niv) + 1];
    if (tousTermines()) setTimeout(() => { if (window.educBrevet) window.educBrevet(true); }, 1800);
    else if (nx && avant < SEUIL && prog[q.niv] >= SEUIL) setTimeout(() => levelUp(q.niv), 1500);
    document.getElementById('next-q-btn').style.display = 'block';
  };

  function levelUp(n) {
    const k = ORDER.indexOf(n), nx = ORDER[k + 1], o = document.createElement('div'); o.className = 'lvlup';
    let conf = ''; for (let j = 0; j < 14; j++) conf += '<b style="left:' + (5 + j * 7) + '%;animation-delay:' + ((j % 5) * 0.15) + 's;background:' + ['#ffc107', '#1a8cff', '#0066cc', '#ffffff'][j % 4] + '"></b>';
    o.innerHTML = conf + '<div class="lvlup-card"><div class="lvlup-ring"></div><i class="fa-solid fa-trophy"></i><h2>Félicitations !</h2><p>Vous avez répondu à ' + SEUIL + ' questions du niveau ' + LABEL[n] + '.<br>Vous passez au niveau supérieur : <strong>' + LABEL[nx] + '</strong><br><small>+100 XP de bonus</small></p><button>Continuer</button></div>';
    document.body.appendChild(o); addXP(100); meta();
    o.querySelector('button').onclick = () => { o.remove(); niv = nx; generateInfiniteQuizQuestion(); };
  }

  // Interface : niveaux, progression, explication, étincelles
  const box = document.querySelector('#tab-quiz .quiz-container-box');
  if (box) {
    const bar = document.createElement('div'); bar.className = 'quiz-levels';
    bar.innerHTML = ORDER.map(n => '<button class="lvl-chip" data-n="' + n + '">' + LABEL[n] + ' <small>+' + XPN[n] + ' XP</small></button>').join('');
    const m = document.createElement('div'); m.id = 'quiz-meta'; m.className = 'quiz-meta';
    const pb = document.createElement('div'); pb.className = 'lvl-prog'; pb.innerHTML = '<i id="lvl-fill"></i>';
    box.insertBefore(m, box.children[1]); box.insertBefore(pb, m); box.insertBefore(bar, pb);
    const fb = document.getElementById('quiz-feedback');
    if (fb) { const ex = document.createElement('div'); ex.id = 'quiz-explain'; ex.className = 'quiz-explain'; fb.parentNode.insertBefore(ex, fb.nextSibling); }
    bar.addEventListener('click', e => {
      const b = e.target.closest('.lvl-chip'); if (!b) return; const n = b.dataset.n;
      if (!debloque(n)) { b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); const k = ORDER.indexOf(n), m2 = document.getElementById('quiz-meta'); if (m2) m2.innerText = '🔒 Répondez à ' + SEUIL + ' questions du niveau ' + LABEL[ORDER[k - 1]] + ' pour débloquer ce niveau (' + Math.min(prog[ORDER[k - 1]], SEUIL) + '/' + SEUIL + ').'; return; }
      niv = n; generateInfiniteQuizQuestion();
    });
    document.getElementById('quiz-options-list').addEventListener('click', e => {
      const b = e.target.closest('.fin-btn'); if (!b) return; const a = b.dataset.a, k = ORDER.indexOf(niv);
      if (a === 'brevet') { if (window.educBrevet) window.educBrevet({ niveau: 'grand', fete: true }); return; }
      if (a === 'brevet-niv') { if (window.educBrevet) window.educBrevet({ niveau: niv, fete: true }); return; }
      if (a === 'redo') { vus[niv].clear(); }
      else if (a === 'next') { niv = ORDER[k + 1]; }
      else if (a === 'all') { ORDER.forEach(n => vus[n].clear()); prog = { facile: 0, difficile: 0, pro: 0 }; userXP = 0; streak = 0; niv = 'facile'; }
      sauver(); updateXPBar(); generateInfiniteQuizQuestion();
    });
    for (let k = 0; k < 6; k++) { const sp = document.createElement('span'); sp.className = 'spark'; sp.style.left = (8 + k * 16) + '%'; sp.style.top = (30 + (k % 3) * 25) + '%'; sp.style.animationDelay = (k * 0.8) + 's'; box.appendChild(sp); }
  }

  // Quand une personne s'inscrit ou se connecte, on charge SA progression (nouvelle identité = zéro)
  const orig = window.restaurerSessionDashboard;
  if (typeof orig === 'function') window.restaurerSessionDashboard = function (u) { try { chargerEtat(u); } catch (e) {} const r = orig.apply(this, arguments); try { meta(); } catch (e) {} return r; };

  window.QUIZ_STATS = { facile: POOL.facile.length, difficile: POOL.difficile.length, pro: POOL.pro.length };
  chargerEtat(); meta();
  try { const m = document.getElementById('main-app'); if (m && m.classList.contains('active')) { updateXPBar(); generateInfiniteQuizQuestion(); } } catch (e) {}
})();
} catch (err) {
  var qt = document.getElementById('quiz-q-text');
  if (qt) qt.innerText = 'Erreur du quiz : ' + err.message;
}
