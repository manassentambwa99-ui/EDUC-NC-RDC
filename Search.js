/* EDUC National - recherche dans l'application (cours, présidents, autorités, sections).
   L'index est construit à partir de la page elle-même : tout nouveau cours ajouté dans index.html est trouvé automatiquement. */
(function () {
  try {
    var input = document.querySelector('.search-input-wrapper input'), barre = document.querySelector('.search-bar-container');
    if (!input || !barre) return;
    var CAT_ORDER = { 'Cours': 0, 'Section': 1, 'Présidents': 2, 'Autorités': 3 };
    var cat = 'Tout';

    var st = document.createElement('style');
    st.textContent =
      '#search-results{display:none;margin:0 20px 16px;padding:10px;border-radius:20px;max-height:62vh;overflow-y:auto;background:rgba(255,255,255,.94);border:1px solid rgba(255,255,255,.95);box-shadow:0 10px 30px rgba(0,60,130,.14);animation:liquidRise .35s ease backwards}' +
      '#search-results.show{display:block}' +
      '.sr-head{display:flex;justify-content:space-between;align-items:center;padding:2px 6px 8px;font-size:.75rem;font-weight:700;color:var(--text-muted)}' +
      '.sr-head button{border:none;background:none;color:var(--primary-blue);font-weight:700;font-size:.75rem;cursor:pointer}' +
      '.sr-chips{display:flex;gap:6px;overflow-x:auto;padding:0 4px 8px;scrollbar-width:none}.sr-chips::-webkit-scrollbar{display:none}' +
      '.sr-chip{flex:0 0 auto;border:none;border-radius:16px;padding:6px 12px;font-size:.72rem;font-weight:700;background:#e8f2ff;color:var(--primary-blue);cursor:pointer}' +
      '.sr-chip.on{background:var(--primary-blue);color:#fff}' +
      '.sr-item{display:flex;align-items:center;gap:12px;width:100%;padding:10px;border:none;border-radius:14px;background:transparent;text-align:left;cursor:pointer;transition:background .2s ease}' +
      '.sr-item:active,.sr-item:hover{background:#e8f2ff}' +
      '.sr-ic{flex:0 0 40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1rem;background:var(--primary-blue);overflow:hidden}' +
      '.sr-ic img{width:100%;height:100%;object-fit:cover}' +
      '.sr-t{font-size:.9rem;font-weight:800;color:var(--text-dark);line-height:1.25}.sr-t mark{background:rgba(255,193,7,.55);color:inherit;border-radius:3px;padding:0 1px}' +
      '.sr-s{font-size:.74rem;color:var(--text-muted);font-weight:600;margin-top:2px}' +
      '.sr-tag{margin-left:auto;flex:0 0 auto;font-size:.65rem;font-weight:700;padding:3px 8px;border-radius:10px;background:#fff3c4;color:#8a6500}' +
      '.sr-vide{padding:16px 8px;text-align:center;font-size:.85rem;color:var(--text-muted);line-height:1.5}' +
      '.sr-flash{animation:srFlash 1.6s ease}@keyframes srFlash{0%,100%{box-shadow:0 8px 32px rgba(0,0,0,.05)}30%{box-shadow:0 0 0 4px rgba(255,193,7,.8)}}';
    document.head.appendChild(st);

    var res = document.createElement('div'); res.id = 'search-results'; barre.parentNode.insertBefore(res, barre.nextSibling);

    var norm = function (t) { return String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); };
    var esc = function (t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
    var CLS = { a: 'aàâä', e: 'eéèêë', i: 'iîï', o: 'oôö', u: 'uùûü', c: 'cç', y: 'yÿ' };
    function motif(tok) { return tok.split('').map(function (ch) { var l = norm(ch); return CLS[l] ? '[' + CLS[l] + CLS[l].toUpperCase() + ']' : ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join(''); }
    function marque(texte, tokens) {
      var s = esc(texte); if (!tokens.length) return s;
      try { return s.replace(new RegExp('(' + tokens.map(motif).join('|') + ')', 'gi'), '<mark>$1</mark>'); } catch (e) { return s; }
    }
    function ouvrir(href) {
      var a = document.createElement('a'); a.href = href; a.target = '_blank'; a.rel = 'noopener'; a.style.display = 'none';
      document.body.appendChild(a); a.click(); a.remove();
    }
    function aller(tab, i) { if (typeof switchTab === 'function') switchTab(tab, i); }
    function defiler(el) { if (!el) return; aller('tab-accueil', 0); setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('sr-flash'); setTimeout(function () { el.classList.remove('sr-flash'); }, 1700); }, 150); }
    function txt(el, sel) { var x = el.querySelector(sel); return x ? x.textContent.trim() : ''; }

    function construire() {
      var L = [];
      [['Quiz Manassé IA', 'Questions de réflexion sur la citoyenneté et le patriotisme', 'quiz questions niveau facile difficile pro xp jeu manasse', 'fa-brain', function () { aller('tab-quiz', 2); }],
       ['Actualités de la RDC', 'Éducation nationale et actualité du pays', 'actualite actualites news nouvelles information', 'fa-newspaper', function () { aller('tab-actu', 3); }],
       ['Tous les cours', 'Programme national', 'cours programme pdf lecon', 'fa-book', function () { aller('tab-cours', 1); }],
       ['Mon profil', 'Informations, rappels d\'étude, installation', 'profil compte rappel notification installer deconnecter', 'fa-user', function () { aller('tab-profil', 4); }],
       ['Rappels d\'étude', 'Activer les notifications', 'rappel rappels notification heure alerte', 'fa-bell', function () { aller('tab-profil', 4); }],
       ['Histoire des présidents de la RDC', 'Frise chronologique et PDF', 'histoire presidents chronologie chefs etat', 'fa-timeline', function () { if (typeof ouvrirPagePresidents === 'function') ouvrirPagePresidents(); }]
      ].forEach(function (x) { L.push({ cat: 'Section', t: x[0], s: x[1], k: x[2], ic: x[3], go: x[4] }); });
      document.querySelectorAll('#tab-cours .book-card').forEach(function (a) {
        var i = a.querySelector('.book-cover-icon i'), bg = a.querySelector('.book-cover-icon');
        L.push({ cat: 'Cours', t: txt(a, '.book-title'), s: txt(a, '.book-sub'), k: 'cours pdf', ic: i ? i.className.replace('fa-solid ', '') : 'fa-book', bg: bg && bg.style.background, go: function () { ouvrir(a.getAttribute('href')); } });
      });
      var vedette = document.querySelector('#tab-accueil .course-card .course-btn');
      if (vedette) L.push({ cat: 'Cours', t: txt(vedette.closest('.course-card'), 'h4'), s: 'Cours en vedette', k: 'nouvelle citoyennete valeurs droits devoirs', ic: 'fa-flag', go: function () { ouvrir(vedette.getAttribute('href')); } });
      var cst = document.querySelector('a.access-card[href$=".pdf"]');
      if (cst) L.push({ cat: 'Cours', t: 'Constitution de la RDC', s: 'PDF officiel', k: 'constitution loi fondamentale article', ic: 'fa-gavel', go: function () { ouvrir(cst.getAttribute('href')); } });
      document.querySelectorAll('#tab-presidents-list .book-card').forEach(function (a) {
        var im = a.querySelector('img');
        L.push({ cat: 'Présidents', t: txt(a, '.book-title'), s: txt(a, '.book-sub'), k: 'president histoire pdf', ic: 'fa-landmark', img: im && im.getAttribute('src'), go: function () { ouvrir(a.getAttribute('href')); } });
      });
      document.querySelectorAll('#tab-accueil .authority-showcase').forEach(function (el) {
        var im = el.querySelector('img');
        L.push({ cat: 'Autorités', t: txt(el, 'h4'), s: txt(el, 'p'), k: txt(el, '.course-badge') + ' autorite gouvernement ministre', ic: 'fa-star', img: im && im.getAttribute('src'), go: function () { defiler(el); } });
      });
      return L;
    }

    function chercher(q) {
      var tokens = norm(q).split(/\s+/).filter(Boolean); if (!tokens.length) return { tokens: tokens, liste: [] };
      var liste = construire().map(function (it) {
        var titre = norm(it.t), tout = titre + ' ' + norm(it.s) + ' ' + norm(it.k), ok = tokens.every(function (tk) { return tout.indexOf(tk) >= 0; });
        if (!ok) return null;
        var score = tokens.reduce(function (a, tk) { return a + (titre.indexOf(tk) === 0 ? 3 : titre.indexOf(tk) > 0 ? 2 : 1); }, 0);
        it.score = score; return it;
      }).filter(Boolean);
      liste.sort(function (a, b) { return b.score - a.score || CAT_ORDER[a.cat] - CAT_ORDER[b.cat]; });
      return { tokens: tokens, liste: liste };
    }

    function afficher() {
      var q = input.value.trim(), r, tokens = [];
      if (!q) { res.classList.remove('show'); res.innerHTML = ''; return; }
      r = chercher(q); tokens = r.tokens;
      var liste = cat === 'Tout' ? r.liste : r.liste.filter(function (x) { return x.cat === cat; });
      if (!liste.length && r.liste.length && cat !== 'Tout') { cat = 'Tout'; liste = r.liste; }
      var chips = ['Tout', 'Cours', 'Présidents', 'Autorités', 'Section'].map(function (c) { return '<button class="sr-chip' + (c === cat ? ' on' : '') + '" data-c="' + c + '">' + (c === 'Section' ? 'Sections' : c) + '</button>'; }).join('');
      var html = '<div class="sr-chips">' + chips + '</div><div class="sr-head"><span>' + liste.length + ' résultat(s)</span><button data-a="clear">Effacer</button></div>';
      if (!liste.length) html += '<div class="sr-vide">Aucun résultat pour « ' + esc(q) + ' ».<br>Essayez : histoire, géographie, sociologie, serment, citoyenneté, quiz…</div>';
      liste.slice(0, 30).forEach(function (it, i) {
        var ic = it.img ? '<img src="' + esc(it.img) + '" alt="" onerror="this.parentNode.innerHTML=\'<i class=&quot;fa-solid ' + esc(it.ic) + '&quot;></i>\'">' : '<i class="fa-solid ' + esc(it.ic) + '"></i>';
        html += '<button class="sr-item" data-i="' + i + '"><span class="sr-ic"' + (it.bg ? ' style="background:' + esc(it.bg) + '"' : '') + '>' + ic + '</span><span><div class="sr-t">' + marque(it.t, tokens) + '</div><div class="sr-s">' + marque(it.s, tokens) + '</div></span><span class="sr-tag">' + (it.cat === 'Section' ? 'Section' : it.cat) + '</span></button>';
      });
      res.innerHTML = html; res.classList.add('show'); res._liste = liste;
    }
    function fermer() { input.value = ''; res.classList.remove('show'); res.innerHTML = ''; cat = 'Tout'; }

    var t = null;
    input.addEventListener('input', function () { clearTimeout(t); t = setTimeout(afficher, 80); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); afficher(); var f = res._liste && res._liste[0]; if (f) { f.go(); fermer(); input.blur(); } } if (e.key === 'Escape') fermer(); });
    res.addEventListener('click', function (e) {
      var c = e.target.closest('.sr-chip'); if (c) { cat = c.getAttribute('data-c'); afficher(); return; }
      if (e.target.closest('[data-a="clear"]')) { fermer(); return; }
      var b = e.target.closest('.sr-item'); if (!b) return;
      var it = res._liste && res._liste[parseInt(b.getAttribute('data-i'), 10)]; if (it) { fermer(); it.go(); }
    });
    // Le bouton de filtre : affiche tous les cours disponibles
    var f = document.querySelector('.filter-btn');
    if (f) f.addEventListener('click', function () { cat = 'Cours'; input.value = 'cours'; afficher(); input.focus(); });
    var nav = document.querySelector('.bottom-nav'); if (nav) nav.addEventListener('click', function () { if (res.classList.contains('show')) fermer(); });
    input.setAttribute('autocomplete', 'off'); input.setAttribute('enterkeyhint', 'search');
  } catch (err) { console.error('Recherche :', err); }
})();
