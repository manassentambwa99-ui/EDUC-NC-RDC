/* EDUC National - Dossiers patriotiques (patriotisme, mémoire, rôle du Rwanda, vigilance, biens publics, hygiène scolaire).
   Contenu intégré à l'application, sans fichier supplémentaire à envoyer, avec mini-quiz et XP. */
(function () {
  'use strict';
  try {
    var DOS = (function(){
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

    var S=[
"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"
    ].join("");var bin=atob(S),by=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)by[i]=bin.charCodeAt(i);return JSON.parse(new TextDecoder("utf-8").decode(inflate(by)));
  })();
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
        var hm = el('div', 'dos-home'); hm.id = 'dos-home'; hm.innerHTML = '<i class="fa-solid fa-landmark-flag"></i><div><h4>Dossiers patriotiques</h4><p>Patriotisme, mémoire, rôle du Rwanda, vigilance, biens publics, hygiène scolaire.</p></div>';
        hm.addEventListener('click', function () { if (typeof switchTab === 'function') switchTab('tab-cours', 1); setTimeout(function () { var t = g('dos-title'); if (t && t.scrollIntoView) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 250); });
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
    function ouvrir(id) {
      var d = DOS.filter(function (x) { return x.id === id; })[0]; if (!d) return;
      if (!over) { over = el('div'); over.id = 'dos-over'; document.body.appendChild(over); }
      over.innerHTML = '';
      var w = el('div', 'dos-wrap');
      var back = el('button', 'dos-back', '← Retour'); back.type = 'button'; back.addEventListener('click', function () { fermer(false); }); over.appendChild(back);
      var ban = el('div', 'dos-ban'); ban.innerHTML = banniere(d.banniere); w.appendChild(ban);
      w.appendChild(el('h2', '', d.titre)); w.appendChild(el('p', 'dos-intro', d.intro));
      var fs = el('div', 'dos-facts'); d.faits.forEach(function (f) { var x = el('div', 'dos-fact'); x.appendChild(el('b', '', f[0])); x.appendChild(el('span', '', f[1])); fs.appendChild(x); }); w.appendChild(fs);
      d.sections.forEach(function (s) {
        var sec = el('section'); sec.appendChild(el('h3', '', s.h));
        (s.p || []).forEach(function (t) { sec.appendChild(el('p', '', t)); });
        if (s.l) { var ul = el('ul'); s.l.forEach(function (t) { ul.appendChild(el('li', '', t)); }); sec.appendChild(ul); }
        w.appendChild(sec);
      });
      w.appendChild(el('div', 'dos-ret', '★ À retenir : ' + d.retenir));
      var act = el('div', 'dos-actions');
      var pdf = el('a', 'dos-btn alt', '📄 Dossiers en PDF'); pdf.href = PDF; pdf.target = '_blank'; pdf.rel = 'noopener'; act.appendChild(pdf);
      var qb = el('button', 'dos-btn', '🎯 Faire le quiz du dossier'); qb.type = 'button'; act.appendChild(qb); w.appendChild(act);
      var qz = el('section'); qz.id = 'dos-quiz'; qz.style.display = 'none'; w.appendChild(qz);
      var src = el('section', 'dos-src'); src.appendChild(el('h3', '', 'Sources'));
      var ul2 = el('ul'); d.sources.forEach(function (s) { var li = el('li'), a = el('a', '', s[0]); a.href = s[1]; a.target = '_blank'; a.rel = 'noopener noreferrer'; li.appendChild(a); ul2.appendChild(li); }); src.appendChild(ul2);
      src.appendChild(el('p', '', 'Les informations évoluent : pour les nouvelles récentes, consulte l\'onglet Actualités.')); w.appendChild(src);
      over.appendChild(w);
      qb.addEventListener('click', function () { quiz(d, qz); qz.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
      over.classList.add('on'); over.scrollTop = 0; document.body.style.overflow = 'hidden';
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
