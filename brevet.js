/* EDUC National - Brevet de patriotisme.
   Délivré quand toutes les questions sont terminées. Le brevet porte le logo de l'application (pas celui du Ministère).
   Il peut être téléchargé (image) ou imprimé / enregistré en PDF. */
(function () {
  try {
    var W = 2480, H = 1754; // A4 paysage, 300 dpi

    var st = document.createElement('style');
    st.textContent =
      '.brevet-ov{position:fixed;left:0;right:0;top:0;bottom:0;z-index:10070;overflow-y:auto;padding:16px;background:rgba(0,30,80,.92);animation:lvlFade .35s ease backwards}' +
      '.brevet-wrap{max-width:560px;margin:0 auto}.brevet-wrap img{width:100%;display:block;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.45);animation:lvlPop .6s cubic-bezier(.2,.9,.3,1.2) backwards;background:#fff}' +
      '.brevet-wrap h3{color:#fff;text-align:center;font-size:1.15rem;font-weight:800;margin:6px 0 12px}' +
      '.brevet-btns{display:flex;flex-direction:column;gap:10px;margin-top:14px}' +
      '.brevet-btns button{padding:14px;border:none;border-radius:16px;font-weight:700;font-size:.95rem;cursor:pointer;background:#1a8cff;color:#fff}' +
      '.brevet-btns button.alt{background:rgba(255,255,255,.92);color:#0066cc}' +
      '.brevet-card .brevet-prog{height:8px;border-radius:5px;background:#e2e8f0;overflow:hidden;margin:6px 0 12px}.brevet-card .brevet-prog i{display:block;height:100%;background:linear-gradient(90deg,#ffc107,#ffd54f);width:0}' +
      '.brevet-card button{width:100%;padding:12px;border:none;border-radius:16px;font-weight:700;cursor:pointer;background:#1a8cff;color:#fff}';
    document.head.appendChild(st);

    function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function utilisateur() { try { return JSON.parse(localStorage.getItem('educ_utilisateur_connecte') || 'null') || {}; } catch (e) { return {}; } }
    function infos() {
      var p = window.educProgression ? window.educProgression() : { total: 0, uid: 'anonyme' }, u = utilisateur(), cle = 'educ_brevet_' + p.uid, b = null;
      try { b = JSON.parse(localStorage.getItem(cle) || 'null'); } catch (e) {}
      return { p: p, u: u, cle: cle, b: b };
    }
    function creerBrevet(i) {
      var d = new Date(), n = 'PAT-' + d.getFullYear() + '-' + String(Math.floor(100000 + Math.random() * 900000));
      var b = { date: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }), numero: n, total: i.p.total };
      try { localStorage.setItem(i.cle, JSON.stringify(b)); } catch (e) {}
      return b;
    }

    // ---------- Dessin du brevet ----------
    function etoile(c, x, y, R, r, col) {
      c.beginPath(); for (var k = 0; k < 10; k++) { var a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r : R; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); c.fillStyle = col; c.fill();
    }
    function lignes(c, texte, x, y, maxW, interligne) {
      var mots = texte.split(' '), ligne = '', yy = y;
      mots.forEach(function (m) { var t = ligne ? ligne + ' ' + m : m; if (c.measureText(t).width > maxW && ligne) { c.fillText(ligne, x, yy); ligne = m; yy += interligne; } else ligne = t; });
      c.fillText(ligne, x, yy); return yy;
    }
    function dessiner(i, b, logo) {
      var cv = document.createElement('canvas'); cv.width = W; cv.height = H; var c = cv.getContext('2d');
      var sans = '"Plus Jakarta Sans", Arial, sans-serif', serif = 'Georgia, "Times New Roman", serif';
      var g = c.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#eaf3ff'); c.fillStyle = g; c.fillRect(0, 0, W, H);
      // halos aux couleurs de l'application
      var h1 = c.createRadialGradient(300, 250, 10, 300, 250, 700); h1.addColorStop(0, 'rgba(26,140,255,.18)'); h1.addColorStop(1, 'rgba(26,140,255,0)'); c.fillStyle = h1; c.fillRect(0, 0, W, H);
      var h2 = c.createRadialGradient(W - 300, H - 250, 10, W - 300, H - 250, 700); h2.addColorStop(0, 'rgba(255,193,7,.22)'); h2.addColorStop(1, 'rgba(255,193,7,0)'); c.fillStyle = h2; c.fillRect(0, 0, W, H);
      // cadres
      c.lineWidth = 34; c.strokeStyle = '#0066cc'; c.strokeRect(45, 45, W - 90, H - 90);
      c.lineWidth = 8; c.strokeStyle = '#ffc107'; c.strokeRect(95, 95, W - 190, H - 190);
      c.lineWidth = 3; c.strokeStyle = '#1a8cff'; c.strokeRect(120, 120, W - 240, H - 240);
      [[150, 150], [W - 150, 150], [150, H - 150], [W - 150, H - 150]].forEach(function (p) { etoile(c, p[0], p[1], 34, 14, '#ffc107'); });
      c.textAlign = 'center'; c.textBaseline = 'alphabetic';
      // logo de l'application
      if (logo) c.drawImage(logo, W / 2 - 115, 160, 230, 230);
      c.fillStyle = '#64748b'; c.font = '700 38px ' + sans; c.fillText('EDUC NATIONAL  ·  RÉPUBLIQUE DÉMOCRATIQUE DU CONGO', W / 2, 455);
      c.fillStyle = '#0066cc'; c.font = '700 140px ' + serif; c.fillText('BREVET DE PATRIOTISME', W / 2, 595);
      c.fillStyle = '#ffc107'; c.fillRect(W / 2 - 300, 625, 600, 8);
      c.fillStyle = '#334155'; c.font = 'italic 50px ' + serif; c.fillText('Ce brevet est décerné à', W / 2, 705);
      var nom = (i.u.nomComplet || ((i.u.prenom || '') + ' ' + (i.u.nom || '') + ' ' + (i.u.postnom || ''))).trim().toUpperCase() || 'APPRENANT';
      var taille = 130; do { c.font = '800 ' + taille + 'px ' + sans; taille -= 6; } while (c.measureText(nom).width > W - 520 && taille > 50);
      c.fillStyle = '#1e293b'; c.fillText(nom, W / 2, 845);
      c.fillStyle = '#ffc107'; c.fillRect(W / 2 - 520, 872, 1040, 5);
      c.fillStyle = '#475569'; c.font = '600 44px ' + sans; if (i.u.ecole) c.fillText('Élève de ' + i.u.ecole, W / 2, 940);
      c.fillStyle = '#334155'; c.font = '500 48px ' + serif;
      lignes(c, 'pour avoir répondu à l\'ensemble des ' + b.total + ' questions de réflexion de Manassé IA sur la nouvelle citoyenneté, le patriotisme et l\'éducation nationale, et pour son engagement à servir la patrie avec honnêteté, courage et solidarité.', W / 2, 1030, W - 600, 68);
      // médaille
      var mx = W / 2, my = 1295, gr = c.createRadialGradient(mx - 25, my - 25, 8, mx, my, 105); gr.addColorStop(0, '#ffe082'); gr.addColorStop(1, '#ffb300');
      c.fillStyle = '#0066cc'; c.beginPath(); c.moveTo(mx - 62, my + 62); c.lineTo(mx - 105, my + 195); c.lineTo(mx - 52, my + 170); c.lineTo(mx - 18, my + 205); c.lineTo(mx + 9, my + 80); c.fill();
      c.fillStyle = '#1a8cff'; c.beginPath(); c.moveTo(mx + 62, my + 62); c.lineTo(mx + 105, my + 195); c.lineTo(mx + 52, my + 170); c.lineTo(mx + 18, my + 205); c.lineTo(mx - 9, my + 80); c.fill();
      c.beginPath(); c.arc(mx, my, 105, 0, 7); c.fillStyle = gr; c.fill(); c.lineWidth = 8; c.strokeStyle = '#e6a100'; c.stroke();
      c.beginPath(); c.arc(mx, my, 82, 0, 7); c.lineWidth = 4; c.strokeStyle = '#fff3c4'; c.stroke();
      etoile(c, mx, my + 4, 58, 25, '#0066cc');
      // date et numéro
      c.textAlign = 'left'; c.fillStyle = '#334155'; c.font = '600 42px ' + sans; c.fillText('Délivré le ' + b.date, 300, 1335);
      c.fillStyle = '#0066cc'; c.fillRect(300, 1358, 560, 4);
      c.textAlign = 'right'; c.fillStyle = '#334155'; c.fillText('N° ' + b.numero, W - 300, 1335);
      c.fillStyle = '#0066cc'; c.fillRect(W - 860, 1358, 560, 4);
      // signature
      c.textAlign = 'center'; c.fillStyle = '#334155'; c.font = '700 42px ' + sans; c.fillText('Manassé IA · Application EDUC National', W / 2, 1560);
      c.fillStyle = '#64748b'; c.font = 'italic 38px ' + serif; c.fillText('Justice – Paix – Travail', W / 2, 1605);
      return cv.toDataURL('image/png');
    }

    function construire(i, b, cb) {
      var go = function (logo) { try { cb(dessiner(i, b, logo)); } catch (e) { console.error(e); } };
      var lg = new Image(); lg.onload = function () { go(lg); }; lg.onerror = function () { go(null); }; lg.src = 'logoo.png';
    }

    // ---------- Fenêtre d'aperçu : télécharger / imprimer ----------
    function imprimer(url) {
      var f = document.createElement('iframe'); f.style.cssText = 'position:fixed;width:0;height:0;border:0;right:0;bottom:0';
      f.srcdoc = '<!DOCTYPE html><html><head><title>Brevet de patriotisme</title><style>@page{size:A4 landscape;margin:0}html,body{margin:0;padding:0}img{width:100vw;height:auto;display:block}</style></head><body><img src="' + url + '"></body></html>';
      f.onload = function () { setTimeout(function () { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) { if (window.educToast) educToast('Impossible d\'imprimer ici : télécharge l\'image puis imprime-la.'); } setTimeout(function () { f.remove(); }, 4000); }, 400); };
      document.body.appendChild(f);
    }
    window.educBrevet = function (felicitations) {
      var i = infos(), existe = !!i.b;
      if (!i.p.complet && !existe) { if (window.educToast) educToast('Termine les ' + i.p.total + ' questions (' + i.p.done + ' faites) pour obtenir ton brevet de patriotisme.', 4500); return; }
      var b = i.b || creerBrevet(i);
      construire(i, b, function (url) {
        var o = document.createElement('div'); o.className = 'brevet-ov';
        o.innerHTML = '<div class="brevet-wrap"><h3>' + (felicitations ? '🎉 Félicitations ! Tu as terminé toutes les questions' : '🏅 Mon brevet de patriotisme') + '</h3><img src="' + url + '" alt="Brevet de patriotisme">' +
          '<div class="brevet-btns"><button data-a="dl">⬇ Télécharger le brevet (image)</button><button data-a="print">🖨 Imprimer ou enregistrer en PDF</button><button class="alt" data-a="close">Fermer</button></div></div>';
        document.body.appendChild(o);
        o.addEventListener('click', function (e) {
          var t = e.target.closest('button'); if (!t) return; var a = t.getAttribute('data-a');
          if (a === 'close') o.remove();
          if (a === 'print') imprimer(url);
          if (a === 'dl') {
            var nom = ((i.u.prenom || '') + '-' + (i.u.nom || 'apprenant')).replace(/[^A-Za-z0-9À-ÿ-]+/g, '_');
            var l = document.createElement('a'); l.href = url; l.download = 'Brevet-Patriotisme-' + nom + '.png'; document.body.appendChild(l); l.click(); l.remove();
            if (window.educToast) educToast('✔ Brevet enregistré dans tes téléchargements');
          }
        });
        window.__brevetUrl = url;
      });
    };

    // ---------- Carte « Mon brevet » dans Profil ----------
    var profil = document.getElementById('tab-profil');
    if (profil) {
      var carte = document.createElement('div'); carte.className = 'xp-card brevet-card';
      carte.innerHTML = '<h4 style="font-weight:800;margin-bottom:4px">🏅 Mon brevet de patriotisme</h4><p id="bv-txt" style="font-size:.8rem;color:var(--text-muted);line-height:1.45"></p><div class="brevet-prog"><i id="bv-fill"></i></div><button id="bv-btn">Voir mon brevet</button>';
      var ref = profil.querySelector('.educ-rappel-card') || profil.querySelector('.xp-card');
      if (ref && ref.nextSibling) profil.insertBefore(carte, ref.nextSibling); else profil.appendChild(carte);
      var maj = function () {
        var i = infos(), pct = i.p.total ? Math.round(i.p.done / i.p.total * 100) : 0;
        document.getElementById('bv-fill').style.width = pct + '%';
        document.getElementById('bv-txt').innerText = (i.p.complet || i.b) ? 'Félicitations ! Ton brevet est prêt : tu peux le télécharger et l\'imprimer.' : 'Termine toutes les questions pour recevoir ton brevet : ' + i.p.done + ' / ' + i.p.total + ' (' + pct + ' %).';
        document.getElementById('bv-btn').innerText = (i.p.complet || i.b) ? '🏅 Voir et imprimer mon brevet' : 'Voir ma progression';
      };
      carte.querySelector('#bv-btn').addEventListener('click', function () { var i = infos(); if (i.p.complet || i.b) educBrevet(); else maj(); if (!(i.p.complet || i.b) && window.educToast) educToast('Encore ' + (i.p.total - i.p.done) + ' questions pour obtenir ton brevet.', 3500); });
      new MutationObserver(maj).observe(profil, { attributes: true, attributeFilter: ['class'] }); maj();
    }
  } catch (err) { console.error('Brevet :', err); }
})();
