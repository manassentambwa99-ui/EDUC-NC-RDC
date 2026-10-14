/* EDUC National - Rendez-vous quotidien du patriote : capsule du jour, bouton étoile, Parcours (Académie), film complet, brevet. */
(function () {
  'use strict';
  try {
    var CAPS = [{"t": "Le drapeau nous rassemble", "x": "Bleu pour la paix, rouge pour le sang des martyrs, jaune pour la richesse, étoile pour l'avenir. Quand tu vois le drapeau, tu vois tout un peuple.", "sc": "drapeau", "a": "Apprends à un ami le sens des couleurs du drapeau."}, {"t": "30 juin 1960 : nous sommes libres", "x": "Le Congo est devenu indépendant le 30 juin 1960. Des hommes et des femmes ont donné leur vie pour cette liberté. À nous de la garder et de la construire.", "sc": "drapeau", "a": "Remercie dans ton cœur ceux qui se sont battus pour le Congo."}, {"t": "Lave-toi les mains, protège l'école", "x": "Se laver les mains au savon pendant 20 secondes arrête beaucoup de maladies comme le choléra et la diarrhée. Sans savon, utilise de la cendre.", "sc": "mains", "a": "Lave-toi les mains avant de manger aujourd'hui."}, {"t": "L'école est à nous tous", "x": "Les bancs, les murs, les livres et les toilettes de ton école sont payés par la collectivité. Les protéger, c'est protéger l'avenir de tes camarades.", "sc": "ecole", "a": "Nettoie ton banc et ne rien écrire sur les murs."}, {"t": "Un Congo, un seul peuple", "x": "Notre pays compte des centaines de cultures et de langues. Ce n'est pas une faiblesse : c'est une richesse. L'unité nous rend forts.", "sc": "unite", "a": "Salue quelqu'un d'une autre province ou ethnie avec respect."}, {"t": "Vérifie avant de partager", "x": "Une fausse nouvelle peut faire du mal à des milliers de personnes. Avant de partager, demande-toi : qui parle ? C'est vrai ? Est-ce utile ?", "sc": "alerte", "a": "Ne partage aujourd'hui que des informations que tu as vérifiées."}, {"t": "Le Congo est un géant", "x": "Plus de 2,3 millions de km², neuf pays voisins, un fleuve de 4 700 km. Le Congo est le deuxième plus grand pays d'Afrique.", "sc": "fleuve", "a": "Montre le Congo sur une carte à quelqu'un qui ne le connaît pas bien."}, {"t": "Se souvenir, c'est honorer", "x": "Des millions de Congolais ont souffert de la guerre. Nous nous souvenons d'eux, nous demandons justice et nous refusons la haine.", "sc": "bougies", "a": "Observe une minute de silence pour les victimes."}, {"t": "L'honnêteté, c'est du patriotisme", "x": "Refuser de tricher ou de donner un pot-de-vin, c'est protéger l'égalité des chances. Un pays honnête avance plus vite.", "sc": "justice", "a": "Refuse toute triche aujourd'hui, même petite."}, {"t": "Étudier, c'est servir", "x": "Un peuple instruit est un peuple libre. Chaque leçon apprise aujourd'hui construit le Congo de demain.", "sc": "livre", "a": "Révise une leçon pendant dix minutes."}, {"t": "La paix commence près de toi", "x": "La paix n'est pas seulement l'affaire des soldats et des présidents. Elle commence dans la classe, la famille et la rue, par le respect et le pardon.", "sc": "paix", "a": "Règle un petit désaccord par la parole."}, {"t": "Le fleuve Congo", "x": "Deuxième fleuve d'Afrique par la longueur et l'un des plus profonds du monde, le fleuve Congo nourrit des millions de personnes.", "sc": "fleuve", "a": "Ne jette jamais de déchets dans les rivières et les caniveaux."}, {"t": "Protège les biens publics", "x": "Routes, ponts, lampadaires, hôpitaux : tout cela est payé par nous tous. Un bien public détruit, c'est un service en moins pour tout le monde.", "sc": "ville", "a": "Signale quelque chose de cassé à un adulte responsable."}, {"t": "Des mains qui construisent", "x": "Aucun pays ne s'est construit sans travail. « Justice, Paix, Travail » : le travail est une des trois valeurs de notre devise.", "sc": "unite", "a": "Aide à faire une tâche utile à la maison ou à l'école."}, {"t": "Les bonobos ne vivent qu'ici", "x": "Le bonobo et l'okapi ne vivent à l'état sauvage qu'en RDC. Les protéger, c'est protéger un trésor que le monde entier nous envie.", "sc": "fleuve", "a": "Ne jamais acheter ni manger de la viande d'animaux protégés."}, {"t": "Le courage du Dr Mukwege", "x": "Le Dr Denis Mukwege soigne depuis des années des femmes victimes de violences. Il a reçu le Prix Nobel de la paix en 2018. Le courage peut changer un pays.", "sc": "justice", "a": "Pense à une personne courageuse près de toi et dis-lui merci."}, {"t": "Dis non à la haine", "x": "Aucune ethnie, aucune province n'est coupable à cause d'un groupe armé. La haine divise, l'unité protège. Nous condamnons les crimes, pas les peuples.", "sc": "unite", "a": "N'utilise jamais de mots qui insultent un groupe de personnes."}, {"t": "Un téléphone, une responsabilité", "x": "Ton téléphone peut aider ou blesser. Ne partage pas d'images choquantes. Ne donne jamais le code reçu par SMS à quelqu'un.", "sc": "alerte", "a": "Vérifie la sécurité de ton compte et de ton mot de passe."}, {"t": "La rumba, fierté du Congo", "x": "La rumba congolaise est inscrite au patrimoine culturel immatériel de l'UNESCO depuis 2021. La culture congolaise rayonne dans le monde.", "sc": "paix", "a": "Apprends une chanson de chez nous et partage-la."}, {"t": "Le Génocost", "x": "Génocost : le génocide pour des gains économiques. Chaque 2 août, on se souvient des victimes et on rappelle que les richesses du Congo doivent profiter aux Congolais.", "sc": "bougies", "a": "Parle du Génocost à un camarade avec respect et vérité."}, {"t": "Les richesses du Congo", "x": "Cuivre, cobalt, coltan, or, forêts, fleuve : le Congo est riche. Bien gérées, ces richesses construisent des écoles et des hôpitaux pour tous.", "sc": "ville", "a": "Apprends à citer trois richesses du Congo."}, {"t": "Toilettes propres, élèves en bonne santé", "x": "Des toilettes propres, séparées pour filles et garçons, avec de l'eau et du savon, évitent des maladies et gardent les élèves à l'école.", "sc": "mains", "a": "Aide à garder les toilettes de ton école propres."}, {"t": "Respecte tes enseignants", "x": "Un enseignant donne de son temps pour te donner des clés pour la vie. Le respecter, c'est respecter l'éducation nationale.", "sc": "ecole", "a": "Dis merci à un de tes enseignants."}, {"t": "La justice protège les faibles", "x": "Une société juste punit ceux qui font du mal et protège ceux qui n'ont pas de voix. Chacun de nous peut défendre la justice.", "sc": "justice", "a": "Prends la défense d'un camarade qu'on traite mal."}, {"t": "Écoute les anciens", "x": "Nos grands-parents connaissent l'histoire vivante du pays : contes, proverbes, souvenirs. Les écouter, c'est garder notre mémoire.", "sc": "unite", "a": "Demande à un ancien de te raconter un souvenir."}, {"t": "Le français et nos langues", "x": "Le français est la langue officielle, et le kikongo, le lingala, le swahili et le tshiluba sont nos langues nationales. Chacune est un trésor.", "sc": "unite", "a": "Apprends trois mots dans une langue nationale que tu connais moins."}, {"t": "Plante, protège, respire", "x": "La forêt du bassin du Congo est la deuxième plus grande forêt tropicale du monde. Planter un arbre aujourd'hui, c'est respirer mieux demain.", "sc": "fleuve", "a": "Plante ou arrose un arbre."}, {"t": "Les filles aussi bâtissent la nation", "x": "Quand une fille va à l'école, c'est toute la famille et toute la nation qui progressent. Encourage les filles à rester à l'école.", "sc": "livre", "a": "Encourage une fille de ton entourage à continuer ses études."}, {"t": "Tu es le Congo de demain", "x": "Les héros d'hier ont préparé le chemin. Les héros de demain, c'est toi : par ton travail, ton honnêteté et ton courage.", "sc": "drapeau", "a": "Écris une chose que tu veux accomplir pour ton pays."}];
    var g = function (id) { return document.getElementById(id); };
    function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
    var jnum = function () { return Math.floor(Date.now() / 864e5); };
    var jour = function () { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); };
    var S = function () { return window.educLireSave || null; };
    var cap = function () { return CAPS[jnum() % CAPS.length]; };
    var uidKey = function () { var s = S(); return 'educ_cap_' + (s ? s.uid() : 'anonyme'); };
    var vue = function () { try { return localStorage.getItem(uidKey()) === jour(); } catch (e) { return false; } };
    var marquer = function () { try { localStorage.setItem(uidKey(), jour()); } catch (e) {} majFab(); };
    var appActive = function () { var m = g('main-app'); return !!(m && m.classList.contains('active')); };
    var surcouche = function () { return ['dos-over', 'pat-his', 'pat-esp', 'cap-pop'].some(function (i) { var x = g(i); return x && x.classList.contains('on'); }); };

    var css = el('style'); css.textContent = [
      '@keyframes capPulse{0%{box-shadow:0 0 0 0 rgba(255,193,7,.7)}70%{box-shadow:0 0 0 16px rgba(255,193,7,0)}100%{box-shadow:0 0 0 0 rgba(255,193,7,0)}}@keyframes capIn{from{opacity:0;transform:translateY(40px) scale(.96)}to{opacity:1;transform:none}}',
      '#pat-fab{position:fixed;right:14px;bottom:88px;z-index:8000;width:58px;height:58px;border-radius:50%;border:0;background:linear-gradient(135deg,#ffc107,#ffd54f);color:#3b2a00;font-size:1.6rem;cursor:pointer;display:none;align-items:center;justify-content:center;box-shadow:0 8px 22px rgba(0,0,0,.28);animation:capPulse 2.2s infinite}',
      '#pat-fab.on{display:flex}#pat-fab b{position:absolute;top:-2px;right:-2px;width:18px;height:18px;border-radius:50%;background:#ef4444;border:2px solid #fff;display:none}#pat-fab.dot b{display:block}',
      '#pat-fab span{position:absolute;right:66px;background:#0b3d7a;color:#fff;font-size:.74rem;font-weight:800;padding:6px 10px;border-radius:12px;white-space:nowrap;opacity:0;transition:opacity .4s;pointer-events:none}#pat-fab.tip span{opacity:1}',
      '#cap-pop{position:fixed;inset:0;z-index:9650;background:rgba(3,15,40,.82);display:none;align-items:center;justify-content:center;padding:18px;overflow-y:auto}#cap-pop.on{display:flex}',
      '#cap-pop .cp{width:100%;max-width:440px;background:#fff;border-radius:26px;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.5);animation:capIn .5s ease}',
      '#cap-pop .cp-sc{height:200px;background:#0b4aa3}#cap-pop .cp-sc svg{display:block;width:100%;height:100%}',
      '#cap-pop .cp-b{padding:16px 18px 18px}#cap-pop .cp-k{display:inline-block;background:#fff3c4;border:1px solid #ffc107;color:#7a4b00;font-weight:800;font-size:.72rem;border-radius:50px;padding:4px 10px;margin-bottom:8px}',
      '#cap-pop h3{margin:0 0 6px;font-size:1.3rem;font-weight:900;color:#0b3d7a;line-height:1.25}#cap-pop p{margin:0 0 10px;font-size:1rem;line-height:1.55;color:#1e293b}#cap-pop .cp-a{background:#ecfdf5;border-left:5px solid #10b981;border-radius:10px;padding:9px 11px;font-size:.9rem;font-weight:700;color:#065f46;margin-bottom:12px}',
      '#cap-pop .cp-r{display:flex;gap:8px;flex-wrap:wrap}#cap-pop button{border:0;border-radius:14px;padding:12px 14px;font:inherit;font-weight:800;font-size:.9rem;cursor:pointer;background:#0066cc;color:#fff;flex:1;min-width:120px}#cap-pop button.y{background:#ffc107;color:#3b2a00}#cap-pop button.l{background:#eef2f7;color:#334155}',
      '.cap-hero{position:relative;border-radius:22px;overflow:hidden;margin:0 18px 16px;cursor:pointer;box-shadow:0 12px 30px rgba(0,60,140,.28);height:170px;background:#0b4aa3}.cap-hero svg{position:absolute;inset:0;width:100%;height:100%;display:block}',
      '.cap-hero .ch{position:absolute;left:0;right:0;bottom:0;padding:34px 16px 12px;background:linear-gradient(0deg,rgba(2,20,60,.88),rgba(2,20,60,0));color:#fff}.cap-hero .ch small{display:inline-block;background:#ffc107;color:#3b2a00;font-weight:900;border-radius:50px;padding:2px 9px;font-size:.68rem;margin-bottom:4px}.cap-hero .ch b{display:block;font-size:1.12rem;font-weight:900;line-height:1.2}.cap-hero .ch span{font-size:.78rem;opacity:.92}',
      '.par-road{display:flex;gap:6px;overflow-x:auto;padding:6px 2px 10px;scroll-snap-type:x proximity}.par-n{flex:0 0 92px;text-align:center;scroll-snap-align:start;cursor:pointer;position:relative}',
      '.par-n .c{width:62px;height:62px;border-radius:50%;margin:0 auto 4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.4rem;box-shadow:0 6px 14px rgba(0,0,0,.2);border:4px solid #fff;position:relative}.par-n.ok .c::after{content:"✔";position:absolute;right:-6px;top:-6px;background:#10b981;border:2px solid #fff;border-radius:50%;width:22px;height:22px;font-size:.7rem;display:flex;align-items:center;justify-content:center}',
      '.par-n b{display:block;font-size:.74rem;line-height:1.2;color:#0f172a}.par-n i{font-style:normal;font-size:.8rem;color:#f59e0b;letter-spacing:1px}.par-n::before{content:"";position:absolute;top:30px;left:-50%;width:100%;height:5px;background:repeating-linear-gradient(90deg,#cbd5e1 0 8px,transparent 8px 14px);z-index:0}.par-n:first-child::before{display:none}.par-n .c{z-index:1}',
      '.par-tot{font-weight:900;color:#0b3d7a}.par-brv{opacity:.55}.par-brv.on{opacity:1}'
    ].join(''); document.head.appendChild(css);

    /* ----- Bouton étoile ----- */
    var fab;
    function majFab() {
      if (!fab) return; var s = S(), fait = s ? !!s.lire()['def_' + jour()] : true;
      fab.classList.toggle('on', appActive() && !surcouche()); fab.classList.toggle('dot', !vue() || !fait);
    }
    function creerFab() {
      if (g('pat-fab')) return; fab = el('button'); fab.id = 'pat-fab'; fab.type = 'button'; fab.setAttribute('aria-label', 'Espace Patriote');
      fab.innerHTML = '⭐<b></b><span>Ta capsule du jour</span>'; fab.addEventListener('click', function () { if (window.educEspace) window.educEspace(); majFab(); }); document.body.appendChild(fab);
      setInterval(majFab, 1200); majFab(); setTimeout(function () { if (fab) { fab.classList.add('tip'); setTimeout(function () { fab.classList.remove('tip'); }, 4500); } }, 2500);
    }

    /* ----- Capsule du jour (plein écran, une fois par jour) ----- */
    var pop;
    function ouvrirCapsule(force) {
      var c = cap(); if (!pop) { pop = el('div'); pop.id = 'cap-pop'; document.body.appendChild(pop); }
      pop.innerHTML = '<div class="cp"><div class="cp-sc"></div><div class="cp-b"><span class="cp-k"></span><h3></h3><p></p><div class="cp-a"></div><div class="cp-r"></div></div></div>';
      pop.querySelector('.cp-sc').innerHTML = window.educScene ? window.educScene(c.sc) : '';
      pop.querySelector('.cp-k').textContent = '🇨🇩 Capsule patriote du jour'; pop.querySelector('h3').textContent = c.t; pop.querySelector('p').textContent = c.x; pop.querySelector('.cp-a').textContent = '👉 ' + c.a;
      var r = pop.querySelector('.cp-r');
      var e1 = el('button', 'l', '🔊 Écouter'); e1.addEventListener('click', function () { var V = window.educVoix; if (V) { V.actif = true; V.dire(c.t + '. ' + c.x + ' Action du jour : ' + c.a, null); } });
      var e2 = el('button', 'y', 'J\'ai compris, merci !'); e2.addEventListener('click', function () { var V = window.educVoix; if (V) V.stop(); pop.classList.remove('on'); document.body.style.overflow = ''; if (!vue()) { var s = S(); if (s) s.xp(5); } marquer(); });
      var e3 = el('button', '', '⭐ Espace Patriote'); e3.addEventListener('click', function () { var V = window.educVoix; if (V) V.stop(); pop.classList.remove('on'); marquer(); if (window.educEspace) window.educEspace(); });
      r.appendChild(e1); r.appendChild(e2); r.appendChild(e3); pop.classList.add('on');
    }
    window.educCapsule = ouvrirCapsule;

    /* ----- Bandeau animé en haut de l'accueil ----- */
    function bandeau() {
      var acc = g('tab-accueil'); if (!acc || g('cap-hero')) return; var c = cap();
      var h = el('div', 'cap-hero'); h.id = 'cap-hero'; h.innerHTML = (window.educScene ? window.educScene(c.sc) : '') + '<div class="ch"><small>CAPSULE DU JOUR</small><b></b><span>Touche pour écouter et voir ▶</span></div>';
      h.querySelector('b').textContent = c.t; h.addEventListener('click', function () { ouvrirCapsule(true); });
      acc.insertBefore(h, acc.firstChild);
    }

    /* ----- Parcours / Académie + film, ajoutés en haut de l'Espace Patriote ----- */
    function etoiles(d, s) { var n = 0; if (s['lu_' + d.id]) n++; var q = typeof s[d.id] === 'number' ? s[d.id] : -1; if (q >= Math.ceil(d.quiz.length / 2)) n++; if (q >= d.quiz.length) n++; return n; }
    window.educEspaceApres = function (esp, body) {
      var s = S(); if (!s || !body) return; var save = s.lire(), DOS = window.educDossiers || [], tot = 0, ok = true, max = DOS.length * 3;
      var c = el('div', 'esp-card'); c.appendChild(el('h3', '', '🎓 Parcours du patriote'));
      var info = el('p', ''); c.appendChild(info);
      var road = el('div', 'par-road'); c.appendChild(road);
      DOS.forEach(function (d) { var n = etoiles(d, save); tot += n; if (n < 2) ok = false;
        var nd = el('div', 'par-n' + (n >= 2 ? ' ok' : '')), cc = el('div', 'c'); cc.style.background = d.couleur; cc.innerHTML = '<i class="fa-solid ' + d.icone + '"></i>'; nd.appendChild(cc); nd.appendChild(el('b', '', d.court)); nd.appendChild(el('i', '', '★★★'.slice(0, n) + '☆☆☆'.slice(0, 3 - n)));
        nd.addEventListener('click', function () { if (window.educHistoire) window.educHistoire(d.id); }); road.appendChild(nd); });
      var fin = el('div', 'par-n par-brv' + (ok ? ' on' : '')), cf = el('div', 'c'); cf.style.background = '#ffc107'; cf.textContent = '🏅'; fin.appendChild(cf); fin.appendChild(el('b', '', 'Brevet du patriote')); fin.appendChild(el('i', '', ok ? 'Débloqué !' : '2★ partout')); fin.addEventListener('click', function () { if (ok) brevet(); else info.textContent = 'Pour débloquer ton brevet : regarde chaque histoire et obtiens au moins 2 étoiles (histoire vue + quiz réussi).'; }); road.appendChild(fin);
      info.innerHTML = '<span class="par-tot">' + tot + ' / ' + max + ' ★</span> · Chaque dossier : ★ histoire vue, ★ quiz réussi, ★ quiz parfait.';
      var f = el('button', 'esp-btn y', '🎬 Lancer le film complet (voix + musique)'); f.addEventListener('click', function () { window.educFilm = true; if (window.educHistoire && DOS.length) window.educHistoire(DOS[0].id); }); c.appendChild(f);
      var cp = el('button', 'esp-btn', '📅 Revoir la capsule du jour'); cp.addEventListener('click', function () { ouvrirCapsule(true); }); c.appendChild(cp);
      body.insertBefore(c, body.children[1] || null);
    };
    function brevet() {
      var s = S(); if (!s) return; var save = s.lire(), DOS = window.educDossiers || [], tot = 0; DOS.forEach(function (d) { tot += etoiles(d, save); });
      var cv = document.createElement('canvas'); cv.width = 1754; cv.height = 1240; var c = cv.getContext('2d');
      var gr = c.createLinearGradient(0, 0, 1754, 1240); gr.addColorStop(0, '#fff8e1'); gr.addColorStop(1, '#e0f2fe'); c.fillStyle = gr; c.fillRect(0, 0, 1754, 1240);
      c.strokeStyle = '#0066cc'; c.lineWidth = 14; c.strokeRect(36, 36, 1682, 1168); c.strokeStyle = '#ffc107'; c.lineWidth = 6; c.strokeRect(62, 62, 1630, 1116);
      c.fillStyle = '#0066cc'; c.fillRect(62, 62, 1630, 18); c.fillStyle = '#ffc107'; c.fillRect(62, 80, 1630, 8);
      c.textAlign = 'center'; c.fillStyle = '#0b3d7a'; c.font = '800 42px sans-serif'; c.fillText('EDUC NATIONAL · République Démocratique du Congo', 877, 170);
      c.fillStyle = '#0066cc'; c.font = '900 96px sans-serif'; c.fillText('BREVET DU PATRIOTE', 877, 320);
      c.fillStyle = '#334155'; c.font = '600 40px sans-serif'; c.fillText('décerné à', 877, 410);
      c.fillStyle = '#0b3d7a'; c.font = '900 84px sans-serif'; c.fillText((s.nomComplet() || 'Un patriote congolais').slice(0, 34), 877, 530);
      c.fillStyle = '#334155'; c.font = '600 38px sans-serif'; c.fillText('pour avoir étudié le patriotisme, la mémoire, l\'unité, la vigilance,', 877, 640); c.fillText('le respect des biens publics, l\'hygiène scolaire et la fierté du Congo.', 877, 696);
      c.fillStyle = '#f59e0b'; c.font = '900 64px sans-serif'; c.fillText(tot + ' ★ sur ' + (DOS.length * 3), 877, 800);
      c.fillStyle = '#0b3d7a'; c.font = '700 38px sans-serif'; c.fillText('Fait le ' + new Date().toLocaleDateString('fr-FR'), 877, 930);
      c.fillStyle = '#0066cc'; c.font = '800 44px sans-serif'; c.fillText('Justice – Paix – Travail', 877, 1070);
      c.fillStyle = '#ffc107'; c.beginPath(); for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 22 : 52; c.lineTo(877 + Math.cos(a) * r, 1140 + Math.sin(a) * r); } c.closePath(); c.fill();
      cv.toBlob(function (bl) { var f; try { f = new File([bl], 'Brevet-du-patriote.png', { type: 'image/png' }); } catch (e) {} if (f && navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f], title: 'Mon brevet du patriote' }).catch(function () {}); else { var a = document.createElement('a'); a.href = URL.createObjectURL(bl); a.download = 'Brevet-du-patriote.png'; document.body.appendChild(a); a.click(); a.remove(); } }, 'image/png');
    }

    /* ----- Démarrage : dès que l'application est ouverte ----- */
    var lance = false;
    function veille() {
      if (!appActive()) return; creerFab(); bandeau();
      if (!lance) { lance = true; setTimeout(function () { if (!vue() && !surcouche() && appActive()) ouvrirCapsule(false); }, 2800); }
      majFab();
    }
    setInterval(veille, 1000); veille();
  } catch (err) { console.error('Quotidien :', err); }
})();
