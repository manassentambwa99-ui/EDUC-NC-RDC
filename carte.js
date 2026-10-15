/* EDUC National - Atlas du Congo : les 26 provinces, les grandes villes, les sites naturels, la mémoire et l'économie.
   Carte à toucher, zoom (doigts, molette, boutons), visite guidée avec voix d'enseignant, points découverts = XP. */
(function () {
  try {
    var G = window.educGeo; if (!G) return;
    var g = function (id) { return document.getElementById(id); };
    function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.textContent = h; return e; }
    var CAT = {
      prov: { n: 'Provinces', c: '#ffc107', e: '🏛️' }, ville: { n: 'Villes', c: '#ffffff', e: '🏙️' }, nature: { n: 'Nature', c: '#22d3ee', e: '🌿' },
      memoire: { n: 'Mémoire', c: '#ef4444', e: '🕯️' }, eco: { n: 'Économie', c: '#fb923c', e: '💎' }
    };
    /* [id, nom, lon, lat, catégorie, province (chef-lieu), texte, important] */
    var L = [
      ['kinshasa', 'Kinshasa', 15.31, -4.32, 'prov', 'ville-province de Kinshasa', "Capitale du pays, au bord du fleuve Congo, face à Brazzaville. Plus de quinze millions d'habitants selon les estimations.", 1],
      ['matadi', 'Matadi', 13.45, -5.82, 'prov', 'du Kongo-Central', "Grand port sur le fleuve Congo, porte d'entrée maritime du pays.", 1],
      ['kenge', 'Kenge', 16.99, -4.85, 'prov', 'du Kwango', '', 0],
      ['bandundu', 'Bandundu', 17.38, -3.32, 'prov', 'du Kwilu', '', 0],
      ['inongo', 'Inongo', 18.27, -1.95, 'prov', 'du Mai-Ndombe', "Elle borde le lac Mai-Ndombe.", 0],
      ['tshikapa', 'Tshikapa', 20.8, -6.42, 'prov', 'du Kasaï', "Région connue pour ses diamants.", 0],
      ['kananga', 'Kananga', 22.4, -5.9, 'prov', 'du Kasaï-Central', '', 1],
      ['mbujimayi', 'Mbuji-Mayi', 23.6, -6.15, 'prov', 'du Kasaï-Oriental', "Ville du diamant.", 1],
      ['kabinda', 'Kabinda', 24.48, -6.13, 'prov', 'de la Lomami', '', 0],
      ['lusambo', 'Lusambo', 23.43, -4.97, 'prov', 'du Sankuru', '', 0],
      ['kindu', 'Kindu', 25.95, -2.94, 'prov', 'du Maniema', "Port sur le fleuve Congo (le Lualaba).", 0],
      ['bukavu', 'Bukavu', 28.86, -2.51, 'prov', 'du Sud-Kivu', "Au bord du lac Kivu. Ville du Dr Mukwege et de l'hôpital de Panzi. Prise par le M23 en février 2025.", 1],
      ['goma', 'Goma', 29.22, -1.68, 'prov', 'du Nord-Kivu', "Au bord du lac Kivu, au pied du volcan Nyiragongo. Prise par le M23 le 27 janvier 2025.", 1],
      ['bunia', 'Bunia', 30.25, 1.56, 'prov', "de l'Ituri", "Région touchée par de graves violences.", 1],
      ['isiro', 'Isiro', 27.62, 2.77, 'prov', 'du Haut-Uele', '', 0],
      ['kisangani', 'Kisangani', 25.19, 0.52, 'prov', 'de la Tshopo', "Grande ville du fleuve Congo. Les combats de juin 2000 l'ont durement touchée.", 1],
      ['buta', 'Buta', 24.73, 2.8, 'prov', 'du Bas-Uele', '', 0],
      ['gbadolite', 'Gbadolite', 21.01, 4.28, 'prov', 'du Nord-Ubangi', '', 0],
      ['lisala', 'Lisala', 21.52, 2.15, 'prov', 'de la Mongala', '', 0],
      ['gemena', 'Gemena', 19.77, 3.25, 'prov', 'du Sud-Ubangi', '', 0],
      ['mbandaka', 'Mbandaka', 18.26, 0.05, 'prov', "de l'Équateur", "Sur le fleuve Congo, presque exactement sur la ligne de l'équateur.", 1],
      ['boende', 'Boende', 20.87, -0.28, 'prov', 'de la Tshuapa', '', 0],
      ['kalemie', 'Kalemie', 29.19, -5.93, 'prov', 'du Tanganyika', "Port sur le lac Tanganyika.", 1],
      ['kamina', 'Kamina', 25.0, -8.74, 'prov', 'du Haut-Lomami', '', 0],
      ['kolwezi', 'Kolwezi', 25.47, -10.71, 'prov', 'du Lualaba', "Au cœur de la région du cuivre et du cobalt.", 1],
      ['lubumbashi', 'Lubumbashi', 27.48, -11.66, 'prov', 'du Haut-Katanga', "Grande ville minière du Sud-Est (cuivre, cobalt).", 1],
      ['boma', 'Boma', 13.05, -5.85, 'ville', '', "Ancienne capitale de l'État indépendant du Congo, jusqu'en 1926.", 0],
      ['kikwit', 'Kikwit', 18.82, -5.04, 'ville', '', "Grande ville du Kwilu.", 0],
      ['ilebo', 'Ilebo', 20.58, -4.32, 'ville', '', "Port sur le Kasaï, terminus d'une ligne de chemin de fer.", 0],
      ['bumba', 'Bumba', 22.46, 2.19, 'ville', '', "Port sur le fleuve Congo.", 0],
      ['mwene', 'Mwene-Ditu', 23.45, -7.0, 'ville', '', "Carrefour ferroviaire.", 0],
      ['likasi', 'Likasi', 26.74, -10.98, 'ville', '', "Ville minière du Haut-Katanga.", 0],
      ['butembo', 'Butembo', 29.29, 0.12, 'ville', '', "Grande ville commerçante du Nord-Kivu.", 0],
      ['beni', 'Beni', 29.47, 0.5, 'ville', '', "Ville du Nord-Kivu, proche du parc des Virunga.", 0],
      ['uvira', 'Uvira', 29.14, -3.38, 'ville', '', "Ville du Sud-Kivu, au bord du lac Tanganyika.", 0],
      ['virunga', 'Virunga', 29.4, -0.9, 'nature', '', "Créé en 1925, c'est le plus ancien parc national d'Afrique. Patrimoine mondial de l'UNESCO, avec des gorilles de montagne.", 1],
      ['nyiragongo', 'Nyiragongo', 29.25, -1.52, 'nature', '', "Volcan actif près de Goma, avec un lac de lave dans son cratère.", 0],
      ['kahuzi', 'Kahuzi-Biega', 28.75, -2.3, 'nature', '', "Parc national près de Bukavu, patrimoine mondial de l'UNESCO, refuge de gorilles de plaine de l'Est.", 0],
      ['salonga', 'Salonga', 21.0, -2.0, 'nature', '', "Parc national forestier, patrimoine mondial de l'UNESCO, l'un des plus vastes d'Afrique.", 1],
      ['garamba', 'Garamba', 29.5, 4.0, 'nature', '', "Parc national du Nord-Est, patrimoine mondial de l'UNESCO.", 0],
      ['okapi', 'Réserve à okapis', 28.6, 1.4, 'nature', '', "Réserve de faune où vit l'okapi, animal qui ne vit à l'état sauvage qu'au Congo. Patrimoine mondial de l'UNESCO.", 0],
      ['rwenzori', 'Rwenzori', 29.9, 0.4, 'nature', '', "Monts à la frontière avec l'Ouganda, aux sommets enneigés.", 0],
      ['kivu', 'Lac Kivu', 29.08, -2.0, 'nature', '', "Grand lac de l'Est, partagé avec le Rwanda.", 0],
      ['tanganyika', 'Lac Tanganyika', 29.45, -6.2, 'nature', '', "Deuxième lac le plus profond du monde, partagé avec le Burundi, la Tanzanie et la Zambie.", 1],
      ['albert', 'Lac Albert', 30.7, 1.7, 'nature', '', "Lac partagé avec l'Ouganda.", 0],
      ['edouard', 'Lac Édouard', 29.65, -0.4, 'nature', '', "Lac partagé avec l'Ouganda.", 0],
      ['mweru', 'Lac Mweru', 28.75, -9.0, 'nature', '', "Lac à la frontière avec la Zambie.", 0],
      ['maindombe', 'Lac Mai-Ndombe', 18.3, -2.2, 'nature', '', "Grand lac de l'Ouest, au cœur d'une vaste forêt.", 0],
      ['fleuve', 'Fleuve Congo', 21.0, 0.95, 'nature', '', "Environ 4 700 kilomètres, deuxième fleuve d'Afrique par la longueur et l'un des plus profonds du monde.", 1],
      ['kasika', 'Kasika', 28.4, -3.0, 'memoire', '', "Massacre du 24 août 1998 dans la région de Mwenga (Sud-Kivu) : plus de 1 000 civils tués selon l'ONU.", 0],
      ['makobola', 'Makobola', 29.0, -3.65, 'memoire', '', "Au sud d'Uvira : environ 800 civils tués fin 1998 selon l'ONU.", 0],
      ['rubaya', 'Rubaya', 28.95, -1.2, 'eco', '', "Mines de coltan du Masisi, contrôlées par le M23 depuis avril 2024.", 0],
      ['inga', 'Inga', 13.62, -5.52, 'eco', '', "Site hydroélectrique sur le fleuve Congo, à très fort potentiel d'énergie.", 0],
      ['tenke', 'Tenke-Fungurume', 26.2, -10.6, 'eco', '', "Zone minière de cuivre et de cobalt dans le Lualaba.", 0],
      ['banana', 'Banana', 12.4, -6.0, 'eco', '', "Le fleuve Congo se jette ici dans l'océan Atlantique.", 0]
    ];
    var PROV = L.filter(function (x) { return x[4] === 'prov'; });
    function fiche(x) { return x[4] === 'prov' ? 'Chef-lieu de la province ' + x[5] + '. ' + x[6] : x[6]; }
    function uid() { try { return (window.educProgression && window.educProgression().uid) || 'anonyme'; } catch (e) { return 'anonyme'; } }
    function lireV() { try { return JSON.parse(localStorage.getItem('educ_atl_' + uid()) || '{}') || {}; } catch (e) { return {}; } }
    function ecrireV(o) { try { localStorage.setItem('educ_atl_' + uid(), JSON.stringify(o)); } catch (e) {} }

    var st = document.createElement('style');
    st.textContent = [
      '#atl-over{position:fixed;inset:0;z-index:9800;display:none;flex-direction:column;color:#0f172a;background:radial-gradient(50% 40% at 15% 10%,rgba(26,140,255,.5),transparent 70%),radial-gradient(45% 38% at 90% 25%,rgba(255,193,7,.4),transparent 70%),radial-gradient(50% 40% at 30% 95%,rgba(16,185,129,.4),transparent 70%),linear-gradient(180deg,#0a2a5e,#0b4aa3)}',
      '#atl-over.on{display:flex;animation:patUp .3s ease}',
      '.atl-top{display:flex;align-items:center;gap:10px;padding:10px 14px;color:#fff;background:linear-gradient(135deg,rgba(255,255,255,.22),rgba(255,255,255,.06));-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.35)}',
      '.atl-top b{font-size:1.1rem;font-weight:800;flex:1}.atl-top small{opacity:.9;font-weight:700}',
      '.atl-x{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.45);color:#fff;border-radius:50%;width:40px;height:40px;font-size:1.1rem;cursor:pointer}',
      '.atl-body{flex:1;min-height:0;display:flex;flex-direction:column;gap:10px;padding:10px;overflow-y:auto}',
      '.atl-map{position:relative;flex:0 0 auto;border-radius:22px;overflow:hidden;background:linear-gradient(180deg,#bfe3ff,#dff1ff);border:1px solid rgba(255,255,255,.7);box-shadow:0 14px 40px rgba(0,0,0,.35);touch-action:none;height:min(62vh,520px)}',
      '.atl-map svg{width:100%;height:100%;display:block;cursor:grab}.atl-map svg:active{cursor:grabbing}',
      '.atl-zoom{position:absolute;right:10px;top:10px;display:flex;flex-direction:column;gap:8px}',
      '.atl-zoom button{width:42px;height:42px;border-radius:14px;border:1px solid rgba(255,255,255,.8);background:rgba(255,255,255,.55);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);font-size:1.25rem;font-weight:800;color:#0b4aa3;cursor:pointer;box-shadow:0 6px 16px rgba(0,60,130,.25)}',
      '.atl-side{display:flex;flex-direction:column;gap:10px;min-width:0}',
      '.atl-card{border-radius:20px;padding:12px 14px;background:linear-gradient(135deg,rgba(255,255,255,.72),rgba(255,255,255,.34));-webkit-backdrop-filter:blur(22px) saturate(190%);backdrop-filter:blur(22px) saturate(190%);border:1px solid rgba(255,255,255,.8);box-shadow:0 10px 30px rgba(0,40,100,.25),inset 0 1.5px 0 rgba(255,255,255,.95)}',
      '.atl-chips{display:flex;flex-wrap:wrap;gap:7px}',
      '.atl-chip{border:1px solid rgba(11,74,163,.25);background:rgba(255,255,255,.6);color:#0b4aa3;border-radius:50px;padding:7px 12px;font-weight:800;font-size:.82rem;cursor:pointer}.atl-chip.on{background:#0b4aa3;color:#fff;border-color:#0b4aa3}',
      '.atl-info h3{margin:0 0 4px;font-size:1.15rem;font-weight:900;color:#0b4aa3}.atl-info p{margin:0;font-size:.95rem;line-height:1.5}',
      '.atl-act{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.atl-btn{border:0;border-radius:14px;padding:11px 14px;font-weight:800;cursor:pointer;background:#1a8cff;color:#fff;font-size:.9rem}.atl-btn.y{background:#ffc107;color:#3b2a00}',
      '.atl-list{display:flex;flex-wrap:wrap;gap:6px;max-height:240px;overflow-y:auto}',
      '.atl-pill{border:1px solid rgba(11,74,163,.18);background:rgba(255,255,255,.65);border-radius:12px;padding:6px 10px;font-size:.8rem;font-weight:700;color:#0f172a;cursor:pointer}.atl-pill.vu{background:rgba(34,197,94,.22);border-color:rgba(34,197,94,.55)}.atl-pill.cur{background:#ffc107;border-color:#ffc107}',
      '.atl-prog{height:8px;border-radius:5px;background:rgba(15,23,42,.12);overflow:hidden;margin-top:6px}.atl-prog i{display:block;height:100%;background:linear-gradient(90deg,#ffc107,#ffd54f);width:0;transition:width .5s}',
      '@media(min-width:900px){.atl-body{flex-direction:row;overflow:hidden;padding:14px;gap:16px}.atl-map{flex:1.6;height:auto}.atl-side{flex:1;overflow-y:auto;min-width:340px;max-width:560px}}',
      '.atl-pt{cursor:pointer}.atl-pt text{pointer-events:none}',
      '@keyframes atlPulse{0%{opacity:.9}100%{opacity:0}}'
    ].join('\n');
    document.head.appendChild(st);

    var over, svg, gpts, vb, cat = 'tout', sel = null, vus = {}, visite = false, zoomMax = 14, anim = null;
    function viewBox() { svg.setAttribute('viewBox', vb.x.toFixed(2) + ' ' + vb.y.toFixed(2) + ' ' + vb.w.toFixed(2) + ' ' + vb.h.toFixed(2)); }
    function zoomNiveau() { return G.W / vb.w; }
    function borne() { var s = zoomNiveau(); vb.h = vb.w * (svg.clientHeight && svg.clientWidth ? svg.clientHeight / svg.clientWidth : G.H / G.W); }
    function clamp() { vb.x = vb.w > G.W + 80 ? (G.W - vb.w) / 2 : Math.max(-40, Math.min(G.W + 40 - vb.w, vb.x)); vb.y = vb.h > G.H + 80 ? (G.H - vb.h) / 2 : Math.max(-40, Math.min(G.H + 40 - vb.h, vb.y)); }
    function base() {
      var d = 'M' + G.pl(G.CONTOUR) + 'Z', s = '<defs><linearGradient id="atg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e7d32"/><stop offset=".38" stop-color="#3f8f3a"/><stop offset=".62" stop-color="#7aa63a"/><stop offset=".85" stop-color="#b5a14a"/><stop offset="1" stop-color="#a48a46"/></linearGradient>' +
        '<radialGradient id="atf" cx=".45" cy=".4" r=".55"><stop offset="0" stop-color="#14532d" stop-opacity=".55"/><stop offset="1" stop-color="#14532d" stop-opacity="0"/></radialGradient>' +
        '<filter id="att" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".035 .05" numOctaves="3" seed="7"/><feColorMatrix type="matrix" values="0 0 0 0 .1 0 0 0 0 .2 0 0 0 0 .05 0 0 0 .9 -.25"/></filter><clipPath id="atc"><path d="' + d + '"/></clipPath></defs>';
      s += '<path d="' + d + '" fill="#0b3d2e" opacity=".35" transform="translate(3 5)"/><path d="' + d + '" fill="url(#atg)"/><g clip-path="url(#atc)"><rect x="-50" y="-50" width="500" height="480" fill="url(#atf)"/><rect x="-50" y="-50" width="500" height="480" filter="url(#att)" opacity=".5"/>';
      s += '<ellipse cx="' + G.px(29) + '" cy="' + G.py(-2.5) + '" rx="22" ry="52" fill="#8d6e3f" opacity=".42"/><ellipse cx="' + G.px(27.5) + '" cy="' + G.py(-10.5) + '" rx="48" ry="22" fill="#9a7b43" opacity=".35"/>';
      s += '<path d="M' + G.px(11) + ' ' + G.py(0) + 'L' + G.px(32) + ' ' + G.py(0) + '" stroke="#fff" stroke-opacity=".4" stroke-dasharray="4 5"/>';
      G.LACS.forEach(function (l) { s += '<path d="M' + G.pl(l) + 'Z" fill="#5fb4ee" stroke="#2f86c9" stroke-width="1" stroke-linejoin="round"/>'; });
      G.RIVIERES.forEach(function (r, i) { s += '<path d="M' + G.pl(r) + '" fill="none" stroke="#2f86c9" stroke-width="' + (i === 0 ? 3.2 : 1.8) + '" stroke-linecap="round" stroke-linejoin="round"/>'; });
      s += '</g><path d="' + d + '" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><path d="' + d + '" fill="none" stroke="#0b3d2e" stroke-width=".8" opacity=".7"/>';
      return s;
    }
    function points() {
      var z = zoomNiveau(), r = 4.6 / Math.sqrt(z), fs = 10.5 / Math.sqrt(z), dots = '', labs = '', pris = [], sw = 3 / Math.sqrt(z);
      var liste = L.filter(function (x) { return cat === 'tout' || x[4] === cat; });
      var ordre = liste.slice().sort(function (a, b) { return (b[0] === sel ? 9 : 0) + b[7] * 3 - ((a[0] === sel ? 9 : 0) + a[7] * 3); });
      ordre.forEach(function (x) {
        var X = +G.px(x[2]), Y = +G.py(x[3]), cur = sel === x[0], gauche = x[2] > 26, w = x[1].length * fs * .56 + r * 2, hh = fs * 1.1,
            rx = gauche ? X - r * 1.9 - w : X + r * 1.9, ry = Y - hh / 2;
        var voulu = cur || z >= 1.15 || (z < 1.15 && x[7]);
        if (voulu && !cur) { for (var q = 0; q < pris.length; q++) { var o = pris[q]; if (rx < o.x + o.w && rx + w > o.x && ry < o.y + o.h && ry + hh > o.y) { voulu = false; break; } } }
        if (voulu) { pris.push({ x: rx, y: ry, w: w, h: hh }); labs += '<text x="' + (gauche ? X - r * 1.9 : X + r * 1.9) + '" y="' + (Y + fs * .35) + '" text-anchor="' + (gauche ? 'end' : 'start') + '" font-size="' + fs + '" font-weight="800" fill="#fff" stroke="rgba(0,35,20,.92)" stroke-width="' + sw + '" paint-order="stroke" stroke-linejoin="round">' + x[1] + '</text>'; }
        var vu = vus[x[0]];
        dots += '<g class="atl-pt" data-k="' + x[0] + '">';
        if (cur) dots += '<circle cx="' + X + '" cy="' + Y + '" r="' + r * 2.4 + '" fill="none" stroke="#ffc107" stroke-width="' + 1.6 / Math.sqrt(z) + '"><animate attributeName="r" from="' + r + '" to="' + r * 3.4 + '" dur="1.4s" repeatCount="indefinite"/><animate attributeName="opacity" from=".95" to="0" dur="1.4s" repeatCount="indefinite"/></circle>';
        dots += '<circle cx="' + X + '" cy="' + Y + '" r="' + (r * 2.1) + '" fill="transparent"/><circle cx="' + X + '" cy="' + Y + '" r="' + (cur ? r * 1.35 : r) + '" fill="' + CAT[x[4]].c + '" stroke="' + (vu ? '#16a34a' : '#0b3d2e') + '" stroke-width="' + (vu ? 2 : 1.3) / Math.sqrt(z) + '"/></g>';
      });
      gpts.innerHTML = dots + labs;
    }
    function aller(x, zoom) {
      var X = +G.px(x[2]), Y = +G.py(x[3]), z = zoom || Math.max(zoomNiveau(), 2.4);
      var cible = { w: G.W / z }; borne(); var h = cible.w * (vb.h / vb.w), nx = X - cible.w / 2, ny = Y - h / 2;
      var d0 = { x: vb.x, y: vb.y, w: vb.w }, t0 = Date.now(); if (anim) cancelAnimationFrame(anim);
      (function pas() { var p = Math.min(1, (Date.now() - t0) / 600), e = 1 - Math.pow(1 - p, 3);
        vb.w = d0.w + (cible.w - d0.w) * e; borne(); vb.x = d0.x + (nx - d0.x) * e; vb.y = d0.y + (ny - d0.y) * e; clamp(); viewBox(); if (p < 1) anim = requestAnimationFrame(pas); else points(); })();
    }
    function majProg() {
      var n = Object.keys(vus).length, pr = over.querySelector('.atl-prog i'); if (pr) pr.style.width = Math.round(n / L.length * 100) + '%';
      var t = over.querySelector('.atl-score'); if (t) t.textContent = n + ' / ' + L.length + ' lieux découverts';
      var sm = over.querySelector('.atl-top small'); if (sm) sm.textContent = n + '/' + L.length;
      over.querySelectorAll('.atl-pill').forEach(function (p) { var k = p.getAttribute('data-k'); p.classList.toggle('vu', !!vus[k]); p.classList.toggle('cur', k === sel); });
    }
    function choisir(k, centrer, parler) {
      var x = L.filter(function (a) { return a[0] === k; })[0]; if (!x) return; sel = k;
      var nouveau = !vus[k]; if (nouveau) { vus[k] = 1; ecrireV(vus); try { if (window.addXP) window.addXP(2); } catch (e) {} }
      var info = over.querySelector('.atl-info'); info.innerHTML = '';
      info.appendChild(el('h3', '', CAT[x[4]].e + ' ' + x[1])); info.appendChild(el('p', '', fiche(x) || 'Un lieu à découvrir.'));
      if (nouveau) info.appendChild(el('p', '', '✨ Nouveau lieu découvert : +2 XP')).style.cssText = 'color:#15803d;font-weight:800;margin-top:6px';
      var act = el('div', 'atl-act'), b1 = el('button', 'atl-btn', '🔊 Écouter'); b1.addEventListener('click', function () { if (window.educVoix) { window.educVoix.actif = true; window.educVoix.dire(x[1] + '. ' + (fiche(x) || ''), null); } }); act.appendChild(b1); info.appendChild(act);
      if (centrer) aller(x); else points(); majProg();
      if (parler && window.educVoix) window.educVoix.dire(x[1] + '. ' + (fiche(x) || ''), function () { if (visite) setTimeout(suiv, 400); }); 
    }
    var vi = 0;
    function suiv() { if (!visite) return; vi++; if (vi >= PROV.length) { arreter(); if (window.educVoix) window.educVoix.dire('Bravo ! Tu as fait le tour des vingt-six provinces du Congo.', null); return; } choisir(PROV[vi][0], true, true); }
    function arreter() { visite = false; var b = over.querySelector('.atl-visite'); if (b) b.textContent = '▶ Visite guidée des 26 provinces'; if (window.educVoix) window.educVoix.stop(); }
    function demarrer() {
      if (visite) { arreter(); return; } visite = true; vi = 0; cat = 'prov'; filtres(); var b = over.querySelector('.atl-visite'); b.textContent = '⏸ Arrêter la visite';
      vb = { x: 0, y: 0, w: G.W, h: G.H }; borne(); clamp(); viewBox(); choisir(PROV[0][0], true, true);
    }
    function filtres() {
      over.querySelectorAll('.atl-chip').forEach(function (c) { c.classList.toggle('on', c.getAttribute('data-c') === cat); });
      var lst = over.querySelector('.atl-list'); lst.innerHTML = '';
      L.filter(function (x) { return cat === 'tout' || x[4] === cat; }).forEach(function (x) { var p = el('button', 'atl-pill', x[1]); p.setAttribute('data-k', x[0]); lst.appendChild(p); });
      points(); majProg();
    }
    function ouvrir(k) {
      if (!over) construire(); vus = lireV(); over.classList.add('on'); document.body.style.overflow = 'hidden';
      try { history.pushState({ atl: 1 }, ''); } catch (e) {}
      setTimeout(function () { vb = { x: 0, y: 0, w: G.W, h: G.H }; borne(); clamp(); viewBox(); filtres(); if (k) choisir(k, true, false); }, 30);
    }
    function fermer() { arreter(); if (over) over.classList.remove('on'); document.body.style.overflow = ''; }
    function construire() {
      over = el('div'); over.id = 'atl-over';
      over.innerHTML = '<div class="atl-top"><button class="atl-x" aria-label="Fermer">✕</button><b>🗺️ Atlas du Congo</b><small></small></div>' +
        '<div class="atl-body"><div class="atl-map"><svg role="img" aria-label="Carte de la République démocratique du Congo" xmlns="http://www.w3.org/2000/svg"></svg><div class="atl-zoom"><button data-z="in" aria-label="Zoom avant">+</button><button data-z="out" aria-label="Zoom arrière">−</button><button data-z="re" aria-label="Tout voir" style="font-size:.9rem">⟲</button></div></div>' +
        '<div class="atl-side"><div class="atl-card"><div class="atl-chips"></div></div>' +
        '<div class="atl-card atl-info"><h3>Touche un point</h3><p>Découvre les 26 provinces, les villes, les parcs, les lacs, les lieux de mémoire et les richesses du Congo. Zoome avec deux doigts.</p></div>' +
        '<div class="atl-card"><button class="atl-btn y atl-visite" style="width:100%">▶ Visite guidée des 26 provinces</button><div class="atl-score" style="font-weight:800;margin-top:10px"></div><div class="atl-prog"><i></i></div></div>' +
        '<div class="atl-card"><div class="atl-list"></div></div></div></div>';
      document.body.appendChild(over); svg = over.querySelector('svg'); svg.innerHTML = '<g id="atl-base">' + base() + '</g><g id="atl-pts"></g>'; gpts = svg.querySelector('#atl-pts');
      var ch = over.querySelector('.atl-chips'); [['tout', 'Tout']].concat(Object.keys(CAT).map(function (k) { return [k, CAT[k].e + ' ' + CAT[k].n]; })).forEach(function (a) { var b = el('button', 'atl-chip', a[1]); b.setAttribute('data-c', a[0]); ch.appendChild(b); });
      over.querySelector('.atl-x').addEventListener('click', function () { fermer(); try { if (history.state && history.state.atl) history.back(); } catch (e) {} });
      window.addEventListener('popstate', function () { if (over.classList.contains('on')) fermer(); });
      over.querySelector('.atl-visite').addEventListener('click', demarrer);
      over.addEventListener('click', function (e) {
        var c = e.target.closest('.atl-chip'); if (c) { cat = c.getAttribute('data-c'); filtres(); return; }
        var p = e.target.closest('.atl-pill'); if (p) { arreter(); choisir(p.getAttribute('data-k'), true, true); return; }
        var z = e.target.closest('[data-z]'); if (z) { var a = z.getAttribute('data-z'); if (a === 're') { vb = { x: 0, y: 0, w: G.W, h: G.H }; borne(); clamp(); viewBox(); points(); } else zoomer(a === 'in' ? 1.6 : 1 / 1.6, vb.x + vb.w / 2, vb.y + vb.h / 2); }
      });
      /* toucher un point sur la carte (clic sans glisser) */
      var dep = null, ptrs = {}, pinch0 = null;
      function pos(e) { var r = svg.getBoundingClientRect(); return { x: vb.x + (e.clientX - r.left) / r.width * vb.w, y: vb.y + (e.clientY - r.top) / r.height * vb.h }; }
      svg.addEventListener('pointerdown', function (e) { ptrs[e.pointerId] = e; try { svg.setPointerCapture(e.pointerId); } catch (x) {} dep = { x: e.clientX, y: e.clientY, bx: vb.x, by: vb.y, bouge: false, cible: e.target.closest && e.target.closest('.atl-pt') }; if (Object.keys(ptrs).length === 2) { var a = Object.keys(ptrs).map(function (k) { return ptrs[k]; }); pinch0 = { d: Math.hypot(a[0].clientX - a[1].clientX, a[0].clientY - a[1].clientY), w: vb.w }; } });
      svg.addEventListener('pointermove', function (e) {
        if (!ptrs[e.pointerId]) return; ptrs[e.pointerId] = e; var ks = Object.keys(ptrs);
        if (ks.length === 2 && pinch0) { var a = ks.map(function (k) { return ptrs[k]; }), d = Math.hypot(a[0].clientX - a[1].clientX, a[0].clientY - a[1].clientY), nw = Math.max(G.W / zoomMax, Math.min(G.W * 1.1, pinch0.w * pinch0.d / d)); var cx = vb.x + vb.w / 2, cy = vb.y + vb.h / 2; vb.w = nw; borne(); vb.x = cx - vb.w / 2; vb.y = cy - vb.h / 2; clamp(); viewBox(); dep && (dep.bouge = true); return; }
        if (!dep) return; var r = svg.getBoundingClientRect(), dx = e.clientX - dep.x, dy = e.clientY - dep.y; if (Math.abs(dx) + Math.abs(dy) > 6) dep.bouge = true;
        if (dep.bouge) { vb.x = dep.bx - dx / r.width * vb.w; vb.y = dep.by - dy / r.height * vb.h; clamp(); viewBox(); }
      });
      function fin(e) { var etait = ptrs[e.pointerId]; delete ptrs[e.pointerId]; if (Object.keys(ptrs).length < 2) pinch0 = null;
        if (dep && !dep.bouge && dep.cible) { arreter(); choisir(dep.cible.getAttribute('data-k'), false, true); } else if (dep && dep.bouge) points(); if (!Object.keys(ptrs).length) dep = null; }
      svg.addEventListener('pointerup', fin); svg.addEventListener('pointercancel', fin);
      svg.addEventListener('wheel', function (e) { e.preventDefault(); var p = pos(e); zoomer(e.deltaY < 0 ? 1.25 : 0.8, p.x, p.y); }, { passive: false });
      window.addEventListener('resize', function () { if (over.classList.contains('on')) { borne(); viewBox(); points(); } });
    }
    function zoomer(f, cx, cy) { var nw = Math.max(G.W / zoomMax, Math.min(G.W * 1.1, vb.w / f)), k = nw / vb.w; vb.x = cx - (cx - vb.x) * k; vb.y = cy - (cy - vb.y) * k; vb.w = nw; borne(); clamp(); viewBox(); points(); }
    window.educAtlas = ouvrir;

    /* ---- Boutons d'entrée : sous le bouton Espace Patriote et dans l'Espace Patriote ---- */
    function entree() {
      var ref = g('pat-fl'); if (!ref || g('atl-fl')) return;
      var b = el('button', 'pat-fl'); b.id = 'atl-fl'; b.type = 'button'; b.style.marginTop = '-4px';
      b.innerHTML = '<i class="fa-solid fa-map-location-dot"></i><div><h4>Atlas du Congo</h4><p>Les 26 provinces, les villes, les parcs, les lacs et les lieux de mémoire, à toucher</p></div>';
      b.addEventListener('click', function () { ouvrir(); }); ref.parentNode.insertBefore(b, ref.nextSibling);
    }
    entree(); setTimeout(entree, 500); window.addEventListener('educ-pret', entree);
    var prev = window.educEspaceApres;
    window.educEspaceApres = function (esp, body) {
      if (typeof prev === 'function') { try { prev(esp, body); } catch (e) { console.error(e); } }
      try {
        var cartes = body.querySelectorAll('.esp-card'), c4 = null; cartes.forEach(function (c) { var h = c.querySelector('h3'); if (h && /carte vivante/i.test(h.textContent)) c4 = c; });
        if (c4) { c4.innerHTML = ''; c4.appendChild(el('h3', '', '🗺️ Atlas du Congo')); c4.appendChild(el('p', 'esp-fact', 'Les 26 provinces, les grandes villes, les parcs, les lacs, la mémoire et les richesses. Zoom, visite guidée avec voix, XP à gagner.'));
          var bt = el('button', 'esp-btn y', '🗺️ Ouvrir l\'atlas'); bt.addEventListener('click', function () { ouvrir(); }); c4.appendChild(bt); }
      } catch (e) { console.error(e); }
    };
  } catch (err) { console.error('Atlas :', err); }
})();
