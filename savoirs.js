/* EDUC National - Dossiers patriotiques (patriotisme, mémoire, rôle du Rwanda, vigilance, biens publics, hygiène scolaire).
   Contenu intégré à l'application, sans fichier supplémentaire à envoyer, avec mini-quiz et XP. */
(function () {
  'use strict';
  try {
    window.educUnz = function (S) {
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

    var bin = atob(S), by = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) by[i] = bin.charCodeAt(i);
    return JSON.parse(new TextDecoder("utf-8").decode(inflate(by)));
  };
    var DOS = window.educUnz([
"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",
"yJ86oXvB0i6XLNP/Hg8SAZM//B8="
    ].join(""));
    var PDF = 'Dossiers-Patriotiques-RDC.pdf';
    var g = function (id) { return document.getElementById(id); };
    var uid = function () { try { var u = JSON.parse(localStorage.getItem('educ_utilisateur_connecte') || 'null'); return u ? encodeURIComponent((u.telephone || '') + '|' + (u.nomComplet || (u.nom || '') + ' ' + (u.postnom || '') + ' ' + (u.prenom || ''))).toLowerCase() : 'anonyme'; } catch (e) { return 'anonyme'; } };
    var lire = function () { try { return JSON.parse(localStorage.getItem('educ_dos_' + uid()) || '{}'); } catch (e) { return {}; } };
    var ecrire = function (o) { try { localStorage.setItem('educ_dos_' + uid(), JSON.stringify(o)); } catch (e) {} };
    var shuf = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
    function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

    /* ---------- Illustrations (SVG léger, couleurs de l'application) ---------- */
    function banniere(type, c) {
      var star = '<polygon points="60,18 66,36 85,36 70,47 76,65 60,54 44,65 50,47 35,36 54,36" fill="#ffc107"/>';
      var f = {
        patrie: '<rect x="0" y="0" width="400" height="140" fill="#1a8cff"/><path d="M0 120 L400 20 L400 50 L0 150Z" fill="#ffc107"/><path d="M0 128 L400 28 L400 42 L0 142Z" fill="#dc2626"/><g transform="translate(20,6) scale(.9)">' + star + '</g><circle cx="330" cy="70" r="30" fill="rgba(255,255,255,.22)"/>',
        memoire: '<rect width="400" height="140" fill="#4c1d95"/><circle cx="200" cy="60" r="46" fill="rgba(255,193,7,.18)"/><rect x="190" y="52" width="20" height="56" rx="4" fill="#f8fafc"/><path d="M200 22 C186 42 188 52 200 52 C212 52 214 42 200 22Z" fill="#ffc107"/><g fill="#fff" opacity=".85"><circle cx="70" cy="40" r="3"/><circle cx="110" cy="90" r="2"/><circle cx="320" cy="34" r="3"/><circle cx="350" cy="96" r="2"/><circle cx="280" cy="70" r="2"/></g><path d="M0 130 C100 110 300 110 400 130 L400 140 L0 140Z" fill="rgba(255,255,255,.12)"/>',
        frontiere: '<rect width="400" height="140" fill="#7f1d1d"/><path d="M200 0 L206 28 L194 52 L204 80 L196 110 L202 140" stroke="#ffc107" stroke-width="5" fill="none" stroke-dasharray="10 7"/><circle cx="296" cy="64" r="26" fill="none" stroke="#fff" stroke-width="6"/><line x1="315" y1="84" x2="344" y2="116" stroke="#fff" stroke-width="7" stroke-linecap="round"/><rect x="40" y="30" width="110" height="80" rx="10" fill="rgba(255,255,255,.14)"/><path d="M60 92 L84 60 L104 78 L124 48 L136 92Z" fill="#ffc107" opacity=".9"/>',
        vigilance: '<rect width="400" height="140" fill="#0e7490"/><path d="M110 70 C150 22 250 22 290 70 C250 118 150 118 110 70Z" fill="#fff"/><circle cx="200" cy="70" r="26" fill="#0e7490"/><circle cx="200" cy="70" r="12" fill="#ffc107"/><path d="M40 30 L70 40 V70 C70 90 56 100 40 108 C24 100 10 90 10 70 V40Z" fill="rgba(255,255,255,.2)" transform="translate(320,0)"/>',
        biens: '<rect width="400" height="140" fill="#92400e"/><rect x="110" y="56" width="180" height="70" fill="#fef3c7"/><polygon points="95,58 200,14 305,58" fill="#ffc107"/><rect x="186" y="86" width="28" height="40" fill="#92400e"/><g fill="#92400e"><rect x="128" y="74" width="24" height="22"/><rect x="248" y="74" width="24" height="22"/></g><rect x="196" y="4" width="2" height="12" fill="#fff"/><path d="M198 4 L220 9 L198 14Z" fill="#1a8cff"/>',
        fierte: '<rect width="400" height="140" fill="#be123c"/><circle cx="300" cy="46" r="26" fill="#ffc107"/><path d="M0 120 C80 70 150 90 220 70 C290 50 340 80 400 60 L400 140 L0 140Z" fill="#065f46"/><path d="M0 132 C100 100 200 128 400 96 L400 140 L0 140Z" fill="#047857"/><path d="M170 140 C190 100 200 60 230 40" stroke="#a7f3d0" stroke-width="4" fill="none"/>',
        hygiene: '<rect width="400" height="140" fill="#047857"/><path d="M200 18 C168 62 160 78 160 92 C160 116 180 128 200 128 C220 128 240 116 240 92 C240 78 232 62 200 18Z" fill="#a7f3d0"/><path d="M182 96 C184 108 192 112 200 112" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><g fill="#fff" opacity=".8"><circle cx="90" cy="44" r="9"/><circle cx="116" cy="82" r="6"/><circle cx="310" cy="50" r="10"/><circle cx="290" cy="96" r="5"/><circle cx="350" cy="90" r="7"/></g>'
      };
      return '<svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' + (f[type] || f.patrie) + '</svg>';
    }

    /* ---------- Styles ---------- */
    var css = document.createElement('style');
    css.textContent = [
      '.dos-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:22px}',
      '.dos-card{position:relative;border-radius:18px;overflow:hidden;background:var(--bg-card,#fff);border:1px solid rgba(0,102,204,.12);box-shadow:0 6px 18px rgba(0,60,130,.1);cursor:pointer;text-align:left;padding:0;font:inherit;color:inherit;transition:transform .2s}',
      '.dos-card:active{transform:scale(.97)}',
      '.dos-card .dos-img{height:74px;overflow:hidden}.dos-card .dos-img svg{display:block;width:100%;height:100%}',
      '.dos-card .dos-t{padding:9px 11px 4px;font-weight:800;font-size:.84rem;line-height:1.25}',
      '.dos-card .dos-s{padding:0 11px 11px;font-size:.7rem;color:var(--text-muted,#64748b)}',
      '.dos-home{margin:0 0 20px;border-radius:20px;overflow:hidden;cursor:pointer;background:linear-gradient(135deg,#0066cc,#1a8cff);color:#fff;box-shadow:0 10px 26px rgba(0,102,204,.28);display:flex;align-items:center;gap:14px;padding:16px 18px}',
      '.dos-home i{font-size:1.9rem;color:#ffc107}.dos-home h4{margin:0 0 2px;font-size:1.02rem;font-weight:800}.dos-home p{margin:0;font-size:.76rem;opacity:.92}',
      '#dos-over{position:fixed;inset:0;z-index:9600;background:var(--bg-body,#f4f7fa);overflow-y:auto;-webkit-overflow-scrolling:touch;display:none}',
      '#dos-over.on{display:block;animation:dosIn .28s ease}@keyframes dosIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}',
      '#dos-over .dos-wrap{max-width:760px;margin:0 auto;padding:0 0 60px}',
      '#dos-over .dos-ban{position:relative;height:150px}#dos-over .dos-ban svg{width:100%;height:100%;display:block}',
      '#dos-over .dos-back{position:fixed;top:12px;left:12px;z-index:3;border:0;border-radius:50px;padding:9px 15px;font-weight:700;background:rgba(255,255,255,.92);color:#0066cc;box-shadow:0 4px 14px rgba(0,0,0,.18);cursor:pointer}',
      '#dos-over h2{margin:18px 16px 6px;font-size:1.28rem;line-height:1.25;font-weight:800;color:#0b3d7a}',
      '#dos-over .dos-intro{margin:0 16px 14px;font-size:.92rem;line-height:1.55;color:var(--text-muted,#475569)}',
      '#dos-over .dos-facts{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:0 16px 14px}',
      '#dos-over .dos-fact{border-radius:14px;padding:11px 12px;background:#fff;border-left:5px solid #ffc107;box-shadow:0 3px 10px rgba(0,0,0,.06)}',
      '#dos-over .dos-fact b{display:block;font-size:1.02rem;color:#0066cc}#dos-over .dos-fact span{font-size:.72rem;color:#475569}',
      '#dos-over section{margin:0 16px 12px;background:#fff;border-radius:16px;padding:14px 15px;box-shadow:0 3px 12px rgba(0,0,0,.06)}',
      '#dos-over section h3{margin:0 0 8px;font-size:1rem;font-weight:800;color:#0066cc}',
      '#dos-over section p{margin:0 0 8px;font-size:.9rem;line-height:1.6}#dos-over section ul{margin:0;padding-left:18px}#dos-over section li{margin:0 0 7px;font-size:.9rem;line-height:1.55}',
      '#dos-over .dos-ret{margin:0 16px 12px;border-radius:16px;padding:14px 15px;background:linear-gradient(135deg,#fff8e1,#ffecb3);border:1px solid #ffc107;font-weight:700;font-size:.92rem;line-height:1.5;color:#7a4b00}',
      '#dos-over .dos-src a{color:#0066cc;word-break:break-word}',
      '#dos-over .dos-actions{display:flex;gap:10px;margin:0 16px 12px;flex-wrap:wrap}',
      '#dos-over .dos-btn{flex:1;min-width:150px;text-align:center;border:0;border-radius:14px;padding:13px 14px;font-weight:800;font-size:.9rem;cursor:pointer;background:#0066cc;color:#fff;text-decoration:none}',
      '#dos-over .dos-btn.alt{background:#ffc107;color:#3b2a00}',
      '#dos-over h3 .dos-spk{border:0;background:#eff6ff;border-radius:50%;width:30px;height:30px;font-size:.9rem;cursor:pointer;vertical-align:middle}',
      '#dos-over .dq-q{font-weight:800;font-size:.98rem;margin:6px 0 10px}#dos-over .dq-o{display:block;width:100%;text-align:left;margin:0 0 8px;padding:12px 13px;border-radius:12px;border:2px solid #dbeafe;background:#fff;font:inherit;font-size:.9rem;cursor:pointer}',
      '#dos-over .dq-o.ok{border-color:#10b981;background:#ecfdf5}#dos-over .dq-o.ko{border-color:#ef4444;background:#fef2f2}',
      '#dos-over .dq-e{margin:8px 0;padding:10px 12px;border-radius:12px;background:#eff6ff;font-size:.86rem;line-height:1.5}',
      '#dos-over .dq-bar{height:8px;border-radius:8px;background:#e2e8f0;margin:0 0 10px;overflow:hidden}#dos-over .dq-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#0066cc,#ffc107);transition:width .3s}',
      '@media(min-width:700px){.dos-grid{grid-template-columns:repeat(3,1fr)}}'
    ].join('');
    document.head.appendChild(css);

    /* ---------- Cartes dans l'onglet Cours + carte sur l'accueil ---------- */
    function cartes() {
      var cours = g('tab-cours'); if (!cours || g('dos-grid')) return;
      var h = el('h3', 'section-title', 'Dossiers patriotiques'); h.id = 'dos-title';
      var grid = el('div', 'dos-grid'); grid.id = 'dos-grid';
      DOS.forEach(function (d) {
        var b = el('button', 'dos-card'); b.type = 'button'; b.setAttribute('data-dossier', d.id);
        var im = el('div', 'dos-img'); im.innerHTML = banniere(d.banniere);
        b.appendChild(im); b.appendChild(el('div', 'dos-t', d.court)); b.appendChild(el('div', 'dos-s', 'Lire · Quiz · +XP'));
        b.addEventListener('click', function () { ouvrir(d.id); });
        grid.appendChild(b);
      });
      var premier = cours.querySelector('.courses-grid-6');
      if (premier && premier.nextSibling) { cours.insertBefore(h, premier.nextSibling); cours.insertBefore(grid, h.nextSibling); } else { cours.insertBefore(h, cours.firstChild); cours.insertBefore(grid, h.nextSibling); }
      var acc = g('tab-accueil');
      if (acc && !g('dos-home')) {
        var hm = el('div', 'dos-home'); hm.id = 'dos-home'; hm.innerHTML = '<i class="fa-solid fa-landmark-flag"></i><div><h4>Espace Patriote</h4><p>Histoires avec voix, carte vivante, défi du jour, serment du patriote.</p></div>';
        hm.addEventListener('click', function () { if (typeof window.educEspace === 'function') { window.educEspace(); return; } if (typeof switchTab === 'function') switchTab('tab-cours', 1); setTimeout(function () { var t = g('dos-title'); if (t && t.scrollIntoView) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 250); });
        var cc = acc.querySelector('.course-card'); if (cc && cc.parentNode) cc.parentNode.insertBefore(hm, cc.nextSibling); else acc.insertBefore(hm, acc.firstChild);
      }
    }

    /* ---------- Lecteur de dossier ---------- */
    var over;
    function fermer(depuisHistorique) {
      if (!over || !over.classList.contains('on')) return;
      over.classList.remove('on'); document.body.style.overflow = '';
      if (!depuisHistorique && history.state && history.state.dos) { try { history.back(); } catch (e) {} }
    }
    function ouvrir(id, versQuiz) {
      var d = DOS.filter(function (x) { return x.id === id; })[0]; if (!d) return;
      if (!over) { over = el('div'); over.id = 'dos-over'; document.body.appendChild(over); }
      over.innerHTML = '';
      var w = el('div', 'dos-wrap');
      var back = el('button', 'dos-back', '← Retour'); back.type = 'button'; back.addEventListener('click', function () { fermer(false); }); over.appendChild(back);
      var ban = el('div', 'dos-ban'); ban.innerHTML = banniere(d.banniere); w.appendChild(ban);
      w.appendChild(el('h2', '', d.titre)); w.appendChild(el('p', 'dos-intro', d.intro));
      var fs = el('div', 'dos-facts'); d.faits.forEach(function (f) { var x = el('div', 'dos-fact'); x.appendChild(el('b', '', f[0])); x.appendChild(el('span', '', f[1])); fs.appendChild(x); }); w.appendChild(fs);
      d.sections.forEach(function (s) {
        var sec = el('section'), h3 = el('h3', '', s.h), hp = el('button', 'dos-spk', '🔊'); hp.type = 'button'; hp.title = 'Écouter'; hp.setAttribute('aria-label', 'Écouter cette section'); h3.appendChild(document.createTextNode(' ')); h3.appendChild(hp); sec.appendChild(h3);
        hp.addEventListener('click', function () { var V = window.educVoix; if (!V) return; V.actif = true; V.dire(s.h + '. ' + (s.p || []).concat(s.l || []).join('. '), null); });
        (s.p || []).forEach(function (t) { sec.appendChild(el('p', '', t)); });
        if (s.l) { var ul = el('ul'); s.l.forEach(function (t) { ul.appendChild(el('li', '', t)); }); sec.appendChild(ul); }
        w.appendChild(sec);
      });
      w.appendChild(el('div', 'dos-ret', '★ À retenir : ' + d.retenir));
      var act = el('div', 'dos-actions');
      if (window.educHistoire) { var sb = el('button', 'dos-btn', '🎬 Voir l\'histoire (avec voix et images)'); sb.type = 'button'; sb.style.flexBasis = '100%'; sb.addEventListener('click', function () { fermer(true); setTimeout(function () { window.educHistoire(d.id); }, 60); }); act.appendChild(sb); }
      var pdf = el('a', 'dos-btn alt', '📄 Dossiers en PDF'); pdf.href = PDF; pdf.target = '_blank'; pdf.rel = 'noopener'; act.appendChild(pdf);
      var qb = el('button', 'dos-btn', '🎯 Faire le quiz du dossier'); qb.type = 'button'; act.appendChild(qb); w.appendChild(act);
      var qz = el('section'); qz.id = 'dos-quiz'; qz.style.display = 'none'; w.appendChild(qz);
      var src = el('section', 'dos-src'); src.appendChild(el('h3', '', 'Sources'));
      var ul2 = el('ul'); d.sources.forEach(function (s) { var li = el('li'), a = el('a', '', s[0]); a.href = s[1]; a.target = '_blank'; a.rel = 'noopener noreferrer'; li.appendChild(a); ul2.appendChild(li); }); src.appendChild(ul2);
      src.appendChild(el('p', '', 'Les informations évoluent : pour les nouvelles récentes, consulte l\'onglet Actualités.')); w.appendChild(src);
      over.appendChild(w);
      qb.addEventListener('click', function () { quiz(d, qz); qz.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
      over.classList.add('on'); over.scrollTop = 0; document.body.style.overflow = 'hidden';
      if (versQuiz) setTimeout(function () { qb.click(); }, 120);
      try { history.pushState({ dos: id }, ''); } catch (e) {}
    }
    window.addEventListener('popstate', function () { fermer(true); });
    window.educDossier = ouvrir; window.educDossiers = DOS;

    /* ---------- Mini-quiz du dossier ---------- */
    function quiz(d, box) {
      box.style.display = 'block'; var Q = shuf(d.quiz), i = 0, bon = 0;
      function suite() {
        box.innerHTML = '';
        if (i >= Q.length) {
          var st = lire(); var meilleur = Math.max(st[d.id] || 0, bon); st[d.id] = meilleur; ecrire(st);
          box.appendChild(el('h3', '', 'Résultat : ' + bon + ' / ' + Q.length));
          box.appendChild(el('p', '', bon === Q.length ? '🇨🇩 Parfait ! Tu es un vrai patriote bien informé.' : bon >= Q.length / 2 ? 'Bien joué ! Relis le dossier pour faire encore mieux.' : 'Courage : relis le dossier et réessaie.'));
          box.appendChild(el('p', '', 'Meilleur score : ' + meilleur + ' / ' + Q.length));
          var r = el('button', 'dos-btn', 'Recommencer'); r.type = 'button'; r.addEventListener('click', function () { quiz(d, box); }); box.appendChild(r); return;
        }
        var q = Q[i], bar = el('div', 'dq-bar'); bar.innerHTML = '<i style="width:' + Math.round(i / Q.length * 100) + '%"></i>'; box.appendChild(bar);
        box.appendChild(el('h3', '', 'Quiz · question ' + (i + 1) + ' / ' + Q.length)); box.appendChild(el('div', 'dq-q', q.q));
        var fait = false;
        shuf([q.c].concat(q.w)).forEach(function (o) {
          var b = el('button', 'dq-o', o); b.type = 'button';
          b.addEventListener('click', function () {
            if (fait) return; fait = true; var ok = o === q.c; if (ok) bon++;
            [].forEach.call(box.querySelectorAll('.dq-o'), function (x) { x.disabled = true; if (x.textContent === q.c) x.classList.add('ok'); });
            if (!ok) b.classList.add('ko');
            if (ok && typeof window.addXP === 'function') { try { window.addXP(10); } catch (e) {} }
            box.appendChild(el('div', 'dq-e', (ok ? 'Bravo ! +10 XP. ' : 'Pas tout à fait. ') + q.e));
            var n = el('button', 'dos-btn', i + 1 >= Q.length ? 'Voir le résultat' : 'Question suivante'); n.type = 'button'; n.addEventListener('click', function () { i++; suite(); }); box.appendChild(n);
          });
          box.appendChild(b);
        });
      }
      suite();
    }

    function init() { cartes(); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  } catch (err) { console.error('Dossiers :', err); }
})();
