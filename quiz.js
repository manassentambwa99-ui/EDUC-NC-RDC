try {
(function () {
  const shR = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const cap = t => t.charAt(0).toUpperCase() + t.slice(1);
  const QQ = window.EDUC_QUESTIONS || {}, QB = window.EDUC_QB || {};
  const dec = k => { try { if (QQ[k]) return QQ[k]; if (!QB[k]) return []; const bin = atob(QB[k]), by = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) by[i] = bin.charCodeAt(i); return JSON.parse(new TextDecoder('utf-8').decode(by)); } catch (e) { return []; } };
  const POOL = { facile: dec('facile'), difficile: dec('difficile'), pro: dec('pro') };
  if (!POOL.facile.length && !POOL.difficile.length && !POOL.pro.length) throw new Error('fichiers questions-facile.js, questions-difficile.js, questions-pro.js introuvables');
  const XPN = { facile: 10, difficile: 25, pro: 50 };
  const ORDER = ['facile', 'difficile', 'pro'], SEUIL = 200, LABEL = { facile: 'Facile', difficile: 'Difficile', pro: 'Pro' };
  const vus = { facile: new Set(), difficile: new Set(), pro: new Set() }; let niv = 'facile';
  let prog = { facile: 0, difficile: 0, pro: 0 };
  try {
    const pg = JSON.parse(localStorage.getItem('educ_prog') || 'null'); if (pg) prog = Object.assign(prog, pg);
    const vv = JSON.parse(localStorage.getItem('educ_vus2') || 'null'); if (vv) ORDER.forEach(n => { if (Array.isArray(vv[n])) vv[n].forEach(k => vus[n].add(k)); });
  } catch (e) {}
  const sauver = () => { try { localStorage.setItem('educ_prog', JSON.stringify(prog)); const o = {}; ORDER.forEach(n => o[n] = [...vus[n]]); localStorage.setItem('educ_vus2', JSON.stringify(o)); } catch (e) {} };
  const debloque = n => { const k = ORDER.indexOf(n); return k === 0 || prog[ORDER[k - 1]] >= SEUIL; };
  ORDER.forEach(n => { if (debloque(n)) niv = n; });
  window.QUIZ_STATS = { facile: POOL.facile.length, difficile: POOL.difficile.length, pro: POOL.pro.length };

  try { const s = parseInt(localStorage.getItem('educ_xp')); if (!isNaN(s)) userXP = Math.min(1000, s); } catch (e) {}

  window.updateXPBar = function () {
    const max = 1000, pct = Math.round(userXP / max * 100);
    document.getElementById('xp-fill').style.width = pct + '%';
    document.getElementById('user-xp-percent').innerText = pct + '%';
    document.getElementById('user-xp-text').innerText = `${userXP} / ${max} XP`;
    document.getElementById('user-level').innerText = 'Niveau ' + (Math.min(Math.floor(userXP / 250), 3) + 1);
  };
  window.addXP = function (a) {
    userXP = Math.min(1000, userXP + a);
    try { localStorage.setItem('educ_xp', userXP); } catch (e) {}
    updateXPBar();
    const p = document.createElement('div'); p.className = 'xp-pop'; p.innerText = '+' + a + ' XP'; document.body.appendChild(p); setTimeout(() => p.remove(), 1100);
  };
  function meta() {
    const m = document.getElementById('quiz-meta'), k = ORDER.indexOf(niv), nx = ORDER[k + 1];
    if (m) m.innerText = nx ? `Niveau ${LABEL[niv]} · ${Math.min(prog[niv], SEUIL)}/${SEUIL} réponses pour débloquer ${LABEL[nx]}` : `Niveau ${LABEL[niv]} · ${prog[niv]} réponses · niveau maximal`;
    const f = document.getElementById('lvl-fill'); if (f) f.style.transform = `scaleX(${Math.min(prog[niv] / SEUIL, 1)})`;
    document.querySelectorAll('.lvl-chip').forEach(c => { const n = c.dataset.n, lk = !debloque(n); c.classList.toggle('lock', lk); c.classList.toggle('on', n === niv); c.querySelector('small').innerText = lk ? '🔒 verrouillé' : `+${XPN[n]} XP`; });
  }
  function levelUp(n) {
    const k = ORDER.indexOf(n), nx = ORDER[k + 1], o = document.createElement('div'); o.className = 'lvlup';
    let conf = ''; for (let j = 0; j < 14; j++) conf += `<b style="left:${5 + j * 7}%;animation-delay:${(j % 5) * 0.15}s;background:${['#ffc107', '#1a8cff', '#0066cc', '#ffffff'][j % 4]}"></b>`;
    o.innerHTML = `${conf}<div class="lvlup-card"><div class="lvlup-ring"></div><i class="fa-solid fa-trophy"></i><h2>Félicitations !</h2><p>${nx ? `Vous avez répondu à ${SEUIL} questions du niveau ${LABEL[n]}.<br>Vous passez au niveau supérieur : <strong>${LABEL[nx]}</strong><br><small>+100 XP de bonus</small>` : `Vous avez terminé les trois niveaux.<br>Vous êtes un vrai ambassadeur de la Nouvelle Citoyenneté !<br><small>+100 XP de bonus</small>`}</p><button>${nx ? 'Continuer' : 'Fermer'}</button></div>`;
    document.body.appendChild(o); addXP(100); meta();
    o.querySelector('button').onclick = () => { o.remove(); if (nx) { niv = nx; generateInfiniteQuizQuestion(); } };
  }
  window.generateInfiniteQuizQuestion = function () {
    const pool = POOL[niv];
    if (!pool.length) {
      const qt = document.getElementById('quiz-q-text'), f = 'questions-' + niv + '.js';
      document.getElementById('quiz-options-list').innerHTML = '';
      qt.innerText = 'Vérification du fichier ' + f + '…';
      fetch(f, { cache: 'no-store' }).then(r => {
        qt.innerText = r.ok ? 'Le fichier ' + f + ' est en ligne mais illisible ou ancien. Renvoyez-le sur GitHub, puis videz les données du site.' : 'Le fichier ' + f + ' est introuvable (erreur ' + r.status + '). Envoyez-le à la racine du dépôt GitHub, à côté de index.html.';
      }).catch(() => { qt.innerText = 'Le fichier ' + f + ' ne peut pas être chargé (connexion ?).'; });
      return;
    }
    let libres = [];
    for (let k = 0; k < pool.length; k++) if (!vus[niv].has(k)) libres.push(k);
    if (!libres.length) { vus[niv].clear(); for (let k = 0; k < pool.length; k++) libres.push(k); }
    const i = libres[Math.floor(Math.random() * libres.length)]; vus[niv].add(i);
    const b = pool[i];
    const opts = b.o ? b.o : b.fix ? (b.c === 'Vrai' || b.c === 'Faux' ? ['Vrai', 'Faux'] : ['Oui', 'Non']) : shR([b.c, ...b.w]);
    currentActiveQuestion = { question: b.q, options: opts, correctAnswer: b.c }; renderQuizUI(); meta();
  };
  window.validateAnswerChoice = function (btn, txt) {
    const all = document.querySelectorAll('.quiz-option-btn'); all.forEach(b => b.disabled = true);
    const ok = txt === currentActiveQuestion.correctAnswer, fb = document.getElementById('quiz-feedback'), ic = btn.querySelector('i');
    if (ok) {
      btn.classList.add('correct'); ic.className = 'fa-solid fa-circle-check'; ic.style.color = 'var(--success-green)';
      fb.innerText = `Excellente réponse ! Manassé IA valide. +${XPN[niv]} XP`; fb.className = 'quiz-feedback-box success'; addXP(XPN[niv]);
    } else {
      btn.classList.add('incorrect'); ic.className = 'fa-solid fa-circle-xmark'; ic.style.color = 'var(--error-red)';
      all.forEach(b => { if (b.innerText.trim() === currentActiveQuestion.correctAnswer.trim()) { b.classList.add('correct'); b.querySelector('i').className = 'fa-solid fa-circle-check'; b.querySelector('i').style.color = 'var(--success-green)'; } });
      fb.innerText = 'Incorrect. Manassé IA a mis en évidence la bonne réponse ci-dessus.'; fb.className = 'quiz-feedback-box error';
    }
    const avant = prog[niv]; prog[niv]++; sauver(); meta();
    if (avant < SEUIL && prog[niv] >= SEUIL) setTimeout(() => levelUp(niv), 900);
    document.getElementById('next-q-btn').style.display = 'block';
  };

  const box = document.querySelector('#tab-quiz .quiz-container-box');
  if (box) {
    const bar = document.createElement('div'); bar.className = 'quiz-levels';
    bar.innerHTML = ['facile', 'difficile', 'pro'].map(n => `<button class="lvl-chip${n === niv ? ' on' : ''}" data-n="${n}">${cap(n)} <small>+${XPN[n]} XP</small></button>`).join('');
    const m = document.createElement('div'); m.id = 'quiz-meta'; m.className = 'quiz-meta';
    box.insertBefore(m, box.children[1]); const pb = document.createElement('div'); pb.className = 'lvl-prog'; pb.innerHTML = '<i id="lvl-fill"></i>'; box.insertBefore(pb, m); box.insertBefore(bar, pb);
    bar.addEventListener('click', e => {
      const b = e.target.closest('.lvl-chip'); if (!b) return; const n = b.dataset.n;
      if (!debloque(n)) { b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); const k = ORDER.indexOf(n), m2 = document.getElementById('quiz-meta'); if (m2) m2.innerText = `🔒 Répondez à ${SEUIL} questions du niveau ${LABEL[ORDER[k - 1]]} pour débloquer ce niveau (${Math.min(prog[ORDER[k - 1]], SEUIL)}/${SEUIL}).`; return; }
      niv = n; generateInfiniteQuizQuestion();
    });
    for (let k = 0; k < 6; k++) { const sp2 = document.createElement('span'); sp2.className = 'spark'; sp2.style.left = (8 + k * 16) + '%'; sp2.style.top = (30 + (k % 3) * 25) + '%'; sp2.style.animationDelay = (k * 0.8) + 's'; box.appendChild(sp2); }
    meta();
  }
})();
} catch (err) {
  var qt = document.getElementById('quiz-q-text');
  if (qt) qt.innerText = 'Erreur du quiz : ' + err.message;
}

    
