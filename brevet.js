/* EDUC National - Galerie des brevets.
   4 brevets à gagner (Bronze = Facile, Argent = Difficile, Or = Pro, Diamant = les trois niveaux).
   Tous sont visibles dès le départ en aperçu, SANS le nom. Le nom du patriote, la date et le numéro s'inscrivent quand il a fini.
   Dessin en canvas : bordure guillochée, drapeau ondulant, filigrane de la carte, sceau métallique, reflet holographique. */
(function () {
  try {
    var W = 2480, H = 1754; // A4 paysage, 300 dpi
    var g = function (id) { return document.getElementById(id); };
    function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.textContent = h; return e; }
    var SERIF = 'Georgia, "Times New Roman", serif', SANS = '"Plus Jakarta Sans", Arial, sans-serif';

    var TIERS = [
      { id: 'facile', niv: 'facile', nom: 'Jeune Patriote', metal: 'BRONZE', emoji: '🥉', c1: '#f3c08a', c2: '#c27a3c', c3: '#6b3e1a', enc: '#7a4318',
        titre: 'Premier pas vers le patriotisme', lib: 'Facile' },
      { id: 'difficile', niv: 'difficile', nom: 'Patriote Engagé', metal: 'ARGENT', emoji: '🥈', c1: '#f4f7fa', c2: '#a3adb9', c3: '#566170', enc: '#2f3a48',
        titre: 'Un citoyen qui connaît et qui agit', lib: 'Difficile' },
      { id: 'pro', niv: 'pro', nom: "Patriote d'Honneur", metal: 'OR', emoji: '🥇', c1: '#fff0b3', c2: '#e0a91c', c3: '#7a5603', enc: '#6b4a00',
        titre: 'Maîtrise complète du programme', lib: 'Pro' },
      { id: 'grand', niv: null, nom: 'Grand Patriote National', metal: 'DIAMANT', emoji: '💎', c1: '#d8f1ff', c2: '#2f86e0', c3: '#0b2f66', enc: '#0b2f66',
        titre: 'Les trois niveaux accomplis', lib: 'Facile, Difficile et Pro' }
    ];
    function tier(id) { return TIERS.filter(function (t) { return t.id === id; })[0] || TIERS[3]; }

    function utilisateur() { try { return JSON.parse(localStorage.getItem('educ_utilisateur_connecte') || 'null') || {}; } catch (e) { return {}; } }
    function nomPatriote() { var u = utilisateur(), n = [u.prenom, u.nom, u.postnom].filter(Boolean).join(' ').trim(); return n || (u.nomComplet || '').trim(); }
    function prog() { try { return window.educProgression ? window.educProgression() : { done: 0, total: 0, uid: 'anonyme', par: {}, complet: false }; } catch (e) { return { done: 0, total: 0, uid: 'anonyme', par: {}, complet: false }; } }
    function cle(t, p) { return 'educ_brv_' + p.uid + '_' + t.id; }
    function etat(t) {
      var p = prog(), rec = null; try { rec = JSON.parse(localStorage.getItem(cle(t, p)) || 'null'); } catch (e) {}
      var done, total;
      if (t.niv) { var x = (p.par || {})[t.niv] || { done: 0, total: 0 }; done = x.done; total = x.total; } else { done = p.done; total = p.total; }
      var fini = t.niv ? (total > 0 && done >= total) : !!p.complet;
      return { p: p, rec: rec, done: done, total: total, pct: total ? Math.min(100, Math.round(done / total * 100)) : 0, obtenu: !!rec || fini, fini: fini };
    }
    function delivrer(t) {
      var e = etat(t); if (e.rec) return e.rec; if (!e.fini) return null;
      var d = new Date(), rec = { date: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }), numero: 'PAT-' + String(d.getFullYear()) + '-' + t.id.slice(0, 1).toUpperCase() + String(Math.floor(100000 + Math.random() * 900000)), nom: nomPatriote(), total: e.total };
      try { localStorage.setItem(cle(t, e.p), JSON.stringify(rec)); } catch (x) {}
      return rec;
    }

    /* ---------- Outils de dessin ---------- */
    function RND(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
    function metal(c, t, x0, y0, x1, y1) { var gr = c.createLinearGradient(x0, y0, x1, y1); gr.addColorStop(0, t.c3); gr.addColorStop(.22, t.c1); gr.addColorStop(.5, t.c2); gr.addColorStop(.74, t.c1); gr.addColorStop(1, t.c3); return gr; }
    function etoile(c, x, y, R, r, n) { c.beginPath(); for (var k = 0; k < n * 2; k++) { var a = -Math.PI / 2 + k * Math.PI / n, rr = k % 2 ? r : R; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); }
    function lignes(c, texte, x, y, maxW, inter) {
      var mots = texte.split(' '), ligne = '', yy = y;
      mots.forEach(function (m) { var tt = ligne ? ligne + ' ' + m : m; if (c.measureText(tt).width > maxW && ligne) { c.fillText(ligne, x, yy); ligne = m; yy += inter; } else ligne = tt; });
      c.fillText(ligne, x, yy); return yy;
    }
    function textArc(c, txt, cx, cy, r, a0, a1, haut) {
      var n = txt.length; for (var i = 0; i < n; i++) { var a = a0 + (a1 - a0) * (i + .5) / n; c.save(); c.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r); c.rotate(a + (haut ? Math.PI / 2 : -Math.PI / 2)); c.fillText(txt[i], 0, 0); c.restore(); }
    }
    function drapeau(c, x, y, w, h, t) {
      var o = document.createElement('canvas'); o.width = w; o.height = h; var d = o.getContext('2d');
      d.fillStyle = '#0a8bff'; d.fillRect(0, 0, w, h);
      d.fillStyle = '#f7d618'; d.beginPath(); d.moveTo(0, h * .94); d.lineTo(w * .06, h); d.lineTo(w, h * .12); d.lineTo(w * .94, 0); d.closePath(); d.fill();
      d.fillStyle = '#ce1021'; d.beginPath(); d.moveTo(0, h * .84); d.lineTo(w * .16, h); d.lineTo(w, h * .22); d.lineTo(w * .84, 0); d.closePath(); d.fill();
      d.fillStyle = '#f7d618'; etoile(d, w * .2, h * .24, h * .2, h * .08, 5); d.fill();
      var step = 4; for (var i = 0; i < w; i += step) { var dy = Math.sin(i / w * Math.PI * 2.4) * h * .035; c.drawImage(o, i, 0, step, h, x + i, y + dy, step, h);
        c.fillStyle = 'rgba(' + (Math.sin(i / w * Math.PI * 2.4 + 1) > 0 ? '255,255,255,.10' : '0,0,0,.10') + ')'; c.fillRect(x + i, y + dy, step, h); }
      c.strokeStyle = t.c3; c.lineWidth = 5; c.strokeRect(x - 3, y - 6, 8, h + 12);
    }
    function guillochis(c, t, ins, ep) {
      var x0 = ins, y0 = ins, x1 = W - ins, y1 = H - ins; c.save(); c.lineWidth = 2.6;
      var cols = [t.c2, t.c3, t.c1];
      for (var k = 0; k < 3; k++) for (var side = 0; side < 4; side++) {
        c.beginPath(); c.strokeStyle = cols[k]; c.globalAlpha = .85;
        var lon = (side % 2 === 0) ? (x1 - x0) : (y1 - y0), ph = k * 2.094;
        for (var s = 0; s <= lon; s += 3) {
          var o = ep / 2 + Math.sin(s / 38 + ph) * ep * .36 + Math.sin(s / 11 + ph * 2) * ep * .08, px, py;
          if (side === 0) { px = x0 + s; py = y0 + o; } else if (side === 1) { px = x1 - o; py = y0 + s; } else if (side === 2) { px = x1 - s; py = y1 - o; } else { px = x0 + o; py = y1 - s; }
          if (s === 0) c.moveTo(px, py); else c.lineTo(px, py);
        } c.stroke();
      }
      c.restore();
    }
    function coin(c, t, x, y, rot) {
      c.save(); c.translate(x, y); c.rotate(rot);
      for (var i = 0; i < 12; i++) { c.rotate(Math.PI / 6); c.beginPath(); c.ellipse(0, -62, 15, 44, 0, 0, Math.PI * 2); c.fillStyle = i % 2 ? t.c2 : t.c1; c.globalAlpha = .95; c.fill(); c.lineWidth = 2; c.strokeStyle = t.c3; c.stroke(); }
      c.globalAlpha = 1; c.beginPath(); c.arc(0, 0, 30, 0, Math.PI * 2); c.fillStyle = metal(c, t, -30, -30, 30, 30); c.fill(); c.strokeStyle = t.c3; c.lineWidth = 3; c.stroke();
      etoile(c, 0, 0, 20, 8, 5); c.fillStyle = '#ce1021'; c.fill(); c.restore();
    }
    function sceau(c, t, cx, cy, R) {
      // rubans
      [[-.42, '#0a8bff'], [.42, '#ce1021']].forEach(function (a) { c.save(); c.translate(cx, cy + R * .6); c.rotate(a[0]); c.fillStyle = a[1]; c.fillRect(-R * .22, 0, R * .44, R * 1.0); c.beginPath(); c.moveTo(-R * .22, R * 1.0); c.lineTo(0, R * .82); c.lineTo(R * .22, R * 1.0); c.fill(); c.fillStyle = '#f7d618'; c.fillRect(-R * .22, 0, R * .07, R * 1.0); c.restore(); });
      // médaille dentelée
      c.save(); c.shadowColor = 'rgba(0,0,0,.45)'; c.shadowBlur = R * .18; c.shadowOffsetY = R * .07;
      c.beginPath(); for (var i = 0; i < 72; i++) { var a = i / 72 * Math.PI * 2, rr = i % 2 ? R : R * .94; c.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } c.closePath();
      c.fillStyle = metal(c, t, cx - R, cy - R, cx + R, cy + R); c.fill(); c.restore();
      c.lineWidth = R * .02; c.strokeStyle = t.c3; c.stroke();
      c.beginPath(); c.arc(cx, cy, R * .86, 0, Math.PI * 2); c.strokeStyle = t.c3; c.lineWidth = R * .015; c.stroke();
      var gr = c.createRadialGradient(cx - R * .25, cy - R * .3, R * .05, cx, cy, R * .8); gr.addColorStop(0, t.c1); gr.addColorStop(.6, t.c2); gr.addColorStop(1, t.c3);
      c.beginPath(); c.arc(cx, cy, R * .62, 0, Math.PI * 2); c.fillStyle = gr; c.fill(); c.lineWidth = R * .025; c.strokeStyle = t.c3; c.stroke();
      c.fillStyle = t.enc; c.font = '800 ' + (R * .1) + 'px ' + SANS; c.textAlign = 'center'; c.textBaseline = 'middle';
      textArc(c, 'EDUC NATIONAL · JUSTICE · PAIX · TRAVAIL ·', cx, cy, R * .74, Math.PI * 1.02, Math.PI * 1.98, false);
      textArc(c, '· PATRIOTE · ' + t.metal + ' ·', cx, cy, R * .74, Math.PI * .1, Math.PI * .9, true);
      etoile(c, cx, cy - R * .02, R * .42, R * .17, 5); var g2 = c.createLinearGradient(cx - R * .4, cy - R * .4, cx + R * .4, cy + R * .4); g2.addColorStop(0, '#fff6c4'); g2.addColorStop(.5, '#f7d618'); g2.addColorStop(1, '#a87c00'); c.fillStyle = g2; c.fill(); c.lineWidth = R * .015; c.strokeStyle = t.c3; c.stroke();
      // reflet
      var sh = c.createLinearGradient(cx - R, cy - R, cx + R * .2, cy + R * .6); sh.addColorStop(0, 'rgba(255,255,255,.55)'); sh.addColorStop(.35, 'rgba(255,255,255,0)'); c.beginPath(); c.arc(cx, cy, R * .95, 0, Math.PI * 2); c.fillStyle = sh; c.fill();
    }

    /* Dessin complet. opts : { apercu:bool, nom, date, numero, total, echelle } */
    function dessiner(t, opts, logo) {
      var s = opts.echelle || 1, cv = document.createElement('canvas'); cv.width = Math.round(W * s); cv.height = Math.round(H * s); var c = cv.getContext('2d'); c.scale(s, s);
      var rnd = RND(t.id.length * 977 + 13);
      // papier
      var pa = c.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, W * .72); pa.addColorStop(0, '#fffefa'); pa.addColorStop(1, '#f4ead0'); c.fillStyle = pa; c.fillRect(0, 0, W, H);
      for (var i = 0; i < 2600; i++) { c.fillStyle = 'rgba(120,90,40,' + (rnd() * .06).toFixed(3) + ')'; c.fillRect(rnd() * W, rnd() * H, 2 + rnd() * 3, 2 + rnd() * 3); }
      // filigrane : carte du Congo + étoiles + bande du drapeau
      var G = window.educGeo;
      c.save(); c.globalAlpha = .08; c.fillStyle = t.c2;
      c.beginPath(); c.moveTo(0, H * .72); c.lineTo(W * .08, H * .78); c.lineTo(W, H * .2); c.lineTo(W * .92, H * .14); c.closePath(); c.fillStyle = '#ce1021'; c.fill();
      c.restore();
      if (G) { c.save(); c.translate(W / 2 - 470, H / 2 - 460); var k = 5.1; c.scale(k, k); c.beginPath(); G.CONTOUR.forEach(function (p, j) { var X = (p[0] - 11.6) * 19, Y = (6.2 - p[1]) * 19; if (j) c.lineTo(X, Y); else c.moveTo(X, Y); }); c.closePath(); c.globalAlpha = .09; c.fillStyle = t.c2; c.fill(); c.globalAlpha = .22; c.lineWidth = 1.4; c.strokeStyle = t.c3; c.stroke(); c.restore(); }
      c.save(); c.globalAlpha = .05; c.fillStyle = t.c3; for (var q = 0; q < 26; q++) { etoile(c, 220 + rnd() * (W - 440), 200 + rnd() * (H - 400), 36 + rnd() * 30, 14, 5); c.fill(); } c.restore();
      // cadre
      c.lineWidth = 22; c.strokeStyle = metal(c, t, 0, 0, W, H); c.strokeRect(46, 46, W - 92, H - 92);
      c.lineWidth = 5; c.strokeStyle = t.c3; c.strokeRect(78, 78, W - 156, H - 156);
      guillochis(c, t, 96, 92);
      c.lineWidth = 5; c.strokeStyle = t.c3; c.strokeRect(196, 196, W - 392, H - 392); c.lineWidth = 2; c.strokeStyle = t.c2; c.strokeRect(206, 206, W - 412, H - 412);
      [[130, 130, 0], [W - 130, 130, 1.57], [W - 130, H - 130, 3.14], [130, H - 130, 4.71]].forEach(function (p) { coin(c, t, p[0], p[1], p[2]); });
      // microtexte
      c.fillStyle = t.c3; c.globalAlpha = .6; c.font = '700 13px ' + SANS; c.textAlign = 'left'; c.textBaseline = 'middle'; var mt = 'EDUC NATIONAL · PATRIOTE · JUSTICE · PAIX · TRAVAIL · '; var rep = ''; while (rep.length < 330) rep += mt;
      c.fillText(rep, 224, 224); c.fillText(rep, 224, H - 224); c.globalAlpha = 1;
      // drapeau + logo
      drapeau(c, W / 2 - 150, 250, 300, 200, t);
      if (logo) { c.save(); c.beginPath(); c.arc(430, 360, 110, 0, Math.PI * 2); c.fillStyle = '#fff'; c.fill(); c.lineWidth = 8; c.strokeStyle = metal(c, t, 320, 250, 540, 470); c.stroke(); c.clip(); c.drawImage(logo, 330, 260, 200, 200); c.restore(); }
      // en-tête
      c.textAlign = 'center'; c.textBaseline = 'alphabetic'; c.fillStyle = t.enc; c.font = '800 46px ' + SANS; c.fillText('E D U C   N A T I O N A L', W / 2, 520);
      c.font = '600 30px ' + SANS; c.fillStyle = '#475569'; c.fillText("APPLICATION D'ÉDUCATION CIVIQUE ET DE PATRIOTISME", W / 2, 566);
      c.font = '900 200px ' + SERIF; c.lineJoin = 'round'; c.lineWidth = 8; c.strokeStyle = t.c3; c.strokeText('BREVET', W / 2, 760); c.fillStyle = metal(c, t, W / 2 - 500, 600, W / 2 + 500, 780); c.fillText('BREVET', W / 2, 760);
      c.fillStyle = t.enc; c.font = 'italic 800 82px ' + SERIF; c.fillText(t.nom + ' · ' + t.metal, W / 2, 860);
      // ornement
      c.strokeStyle = t.c2; c.lineWidth = 5; c.beginPath(); c.moveTo(W / 2 - 520, 898); c.quadraticCurveTo(W / 2 - 260, 870, W / 2 - 40, 898); c.moveTo(W / 2 + 40, 898); c.quadraticCurveTo(W / 2 + 260, 870, W / 2 + 520, 898); c.stroke(); etoile(c, W / 2, 894, 22, 9, 5); c.fillStyle = '#ce1021'; c.fill();
      // décerné à
      c.fillStyle = '#475569'; c.font = 'italic 46px ' + SERIF; c.fillText('Décerné à', W / 2, 970);
      var nom = (opts.nom || '').trim();
      if (!opts.apercu && nom) {
        var fs = 168; c.font = 'italic 800 ' + fs + 'px ' + SERIF; while (c.measureText(nom).width > 1850 && fs > 70) { fs -= 6; c.font = 'italic 800 ' + fs + 'px ' + SERIF; }
        c.save(); c.shadowColor = 'rgba(255,255,255,.9)'; c.shadowOffsetY = -3; c.shadowBlur = 0; c.fillStyle = '#12202f'; c.fillText(nom, W / 2, 1115); c.restore();
        var gx = c.createLinearGradient(W / 2 - 900, 0, W / 2 + 900, 0); gx.addColorStop(0, t.c3); gx.addColorStop(.5, t.c2); gx.addColorStop(1, t.c3); c.fillStyle = gx; c.fillText(nom, W / 2, 1112);
      } else {
        c.fillStyle = 'rgba(100,116,139,.55)'; c.font = 'italic 700 96px ' + SERIF; c.fillText('Ton nom sera inscrit ici', W / 2, 1100);
      }
      c.strokeStyle = t.c2; c.lineWidth = 6; c.beginPath(); if (!opts.apercu && nom) { c.moveTo(W / 2 - 950, 1150); c.quadraticCurveTo(W / 2, 1180, W / 2 + 950, 1150); } else { c.setLineDash([6, 16]); c.moveTo(W / 2 - 950, 1140); c.lineTo(W / 2 + 950, 1140); } c.stroke(); c.setLineDash([]);
      // texte
      c.fillStyle = '#243447'; c.font = '600 40px ' + SANS;
      var corps = t.niv ? 'pour avoir terminé avec succès le niveau ' + t.lib.toUpperCase() + ' du programme d\'éducation civique et de patriotisme, en répondant à ' + (opts.total || '…') + ' questions sur la patrie, la mémoire, la vigilance, le respect des biens publics et l\'hygiène.'
        : 'pour avoir terminé les trois niveaux (' + t.lib + ') du programme d\'éducation civique et de patriotisme, soit ' + (opts.total || '…') + ' questions sur la patrie, la mémoire, la vigilance, le respect des biens publics et l\'hygiène.';
      lignes(c, corps, W / 2, 1220, 1700, 50);
      // sceau
      sceau(c, t, W / 2, 1468, 118);
      // bas gauche : date, numéro
      c.textAlign = 'left'; c.fillStyle = '#334155'; c.font = '700 40px ' + SANS; c.fillText('Date : ' + (opts.apercu ? '— — — —' : (opts.date || '')), 330, 1400); c.fillStyle = '#64748b'; c.font = '600 34px ' + SANS; c.fillText('N° ' + (opts.apercu ? 'PAT-0000-000000' : (opts.numero || '')), 330, 1450);
      c.fillStyle = '#64748b'; c.font = 'italic 34px ' + SERIF; c.fillText(t.titre, 330, 1496);
      // bas droite : signature
      c.textAlign = 'center'; c.fillStyle = '#12202f'; c.font = 'italic 800 78px ' + SERIF; c.fillText('Manassé IA', W - 650, 1400);
      c.strokeStyle = t.c3; c.lineWidth = 3; c.beginPath(); c.moveTo(W - 920, 1418); c.lineTo(W - 380, 1418); c.stroke(); c.fillStyle = '#475569'; c.font = '600 32px ' + SANS; c.fillText('Application EDUC National', W - 650, 1458);
      c.font = 'italic 34px ' + SERIF; c.fillStyle = '#64748b'; c.fillText('Justice – Paix – Travail', W - 650, 1498);
      // reflet holographique sur le cadre
      c.save(); c.globalCompositeOperation = 'soft-light'; var hg = c.createLinearGradient(0, 0, W, H); ['rgba(255,0,128,.55)', 'rgba(255,200,0,.5)', 'rgba(0,255,200,.5)', 'rgba(0,128,255,.55)', 'rgba(200,0,255,.5)', 'rgba(255,0,128,.55)'].forEach(function (col, i) { hg.addColorStop(i / 5, col); });
      c.lineWidth = 120; c.strokeStyle = hg; c.strokeRect(120, 120, W - 240, H - 240); c.restore();
      var br = c.createLinearGradient(0, 0, W, H); br.addColorStop(0, 'rgba(255,255,255,0)'); br.addColorStop(.44, 'rgba(255,255,255,0)'); br.addColorStop(.5, 'rgba(255,255,255,.28)'); br.addColorStop(.56, 'rgba(255,255,255,0)'); br.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = br; c.fillRect(0, 0, W, H);
      // tampon aperçu
      if (opts.apercu) { c.save(); c.translate(W / 2, H / 2 + 40); c.rotate(-.34); c.globalAlpha = .2; c.lineWidth = 14; c.strokeStyle = '#ce1021'; c.fillStyle = '#ce1021'; c.font = '900 300px ' + SANS; c.textAlign = 'center'; var tw = c.measureText('APERÇU').width; c.strokeRect(-tw / 2 - 50, -270, tw + 100, 360); c.fillText('APERÇU', 0, 0); c.restore(); }
      return cv;
    }
    var logoImg = null; (function () { var l = new Image(); l.onload = function () { logoImg = l; }; l.src = 'logoo.png'; })();
    function rendre(t, e, echelle) {
      var rec = e.rec || (e.fini ? delivrer(t) : null);
      return dessiner(t, { apercu: !rec, nom: rec ? (rec.nom || nomPatriote()) : '', date: rec && rec.date, numero: rec && rec.numero, total: (rec && rec.total) || e.total, echelle: echelle }, logoImg);
    }

    /* ---------- Interface ---------- */
    var st = document.createElement('style');
    st.textContent = [
      '#brv-over{position:fixed;inset:0;z-index:10060;display:none;flex-direction:column;color:#0f172a;background:radial-gradient(50% 40% at 15% 10%,rgba(26,140,255,.55),transparent 70%),radial-gradient(45% 38% at 90% 25%,rgba(255,193,7,.45),transparent 70%),radial-gradient(50% 40% at 30% 95%,rgba(206,16,33,.30),transparent 70%),linear-gradient(180deg,#0a2a5e,#0b4aa3)}',
      '#brv-over.on{display:flex;animation:patUp .3s ease}',
      '.brv-top{display:flex;align-items:center;gap:10px;padding:10px 14px;color:#fff;background:linear-gradient(135deg,rgba(255,255,255,.22),rgba(255,255,255,.06));-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.35)}.brv-top b{flex:1;font-size:1.1rem;font-weight:800}',
      '.brv-x{width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.2);color:#fff;font-size:1.1rem;cursor:pointer}',
      '.brv-body{flex:1;overflow-y:auto;padding:14px;-webkit-overflow-scrolling:touch}',
      '.brv-intro{max-width:min(90rem,96vw);margin:0 auto 14px;color:#fff;text-align:center;font-weight:600;line-height:1.5;text-shadow:0 1px 3px rgba(0,0,0,.4)}',
      '.brv-grid{max-width:min(90rem,96vw);margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:16px}',
      '.brv-card{border-radius:22px;padding:12px;background:linear-gradient(135deg,rgba(255,255,255,.72),rgba(255,255,255,.3));-webkit-backdrop-filter:blur(22px) saturate(190%);backdrop-filter:blur(22px) saturate(190%);border:1px solid rgba(255,255,255,.8);box-shadow:0 14px 38px rgba(0,30,90,.35),inset 0 1.5px 0 rgba(255,255,255,.95);display:flex;flex-direction:column;gap:8px}',
      '.brv-card.foc{outline:4px solid #ffc107;animation:brvPulse 1.6s ease-in-out 3}@keyframes brvPulse{50%{transform:scale(1.02)}}',
      '.brv-img{position:relative;border-radius:12px;overflow:hidden;background:#f4ead0;aspect-ratio:2480/1754;box-shadow:0 8px 22px rgba(0,0,0,.28);cursor:pointer}.brv-img canvas,.brv-img img{width:100%;height:100%;display:block}',
      '.brv-lock{position:absolute;right:8px;top:8px;background:rgba(15,23,42,.72);color:#fff;border-radius:50px;padding:4px 10px;font-size:.75rem;font-weight:800}.brv-lock.ok{background:rgba(22,163,74,.9)}',
      '.brv-card h3{margin:2px 0 0;font-size:1.05rem;font-weight:900;color:#0b4aa3}.brv-card p{margin:0;font-size:.85rem;line-height:1.4;color:#334155}',
      '.brv-bar{height:8px;border-radius:5px;background:rgba(15,23,42,.14);overflow:hidden}.brv-bar i{display:block;height:100%;background:linear-gradient(90deg,#ffc107,#ffd54f);width:0;transition:width .6s}',
      '.brv-act{display:flex;gap:8px;flex-wrap:wrap}.brv-btn{flex:1;min-width:110px;border:0;border-radius:14px;padding:11px 12px;font-weight:800;font-size:.85rem;cursor:pointer;background:#1a8cff;color:#fff}.brv-btn.y{background:#ffc107;color:#3b2a00}.brv-btn.l{background:rgba(255,255,255,.8);color:#0b4aa3}',
      '#brv-big{position:fixed;inset:0;z-index:10070;display:none;flex-direction:column;background:rgba(3,15,40,.78);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);padding:12px;overflow-y:auto}#brv-big.on{display:flex}',
      '#brv-big .w{width:min(100%,1500px);margin:auto}#brv-big img{width:100%;display:block;border-radius:10px;box-shadow:0 20px 60px rgba(0,0,0,.6);animation:patUp .5s ease}',
      '#brv-big h3{color:#fff;text-align:center;margin:0 0 10px;font-size:1.15rem}#brv-big .brv-act{margin-top:12px}',
      '.brv-mini{margin:12px 20px 0;border-radius:20px;padding:12px 14px;background:linear-gradient(135deg,rgba(255,255,255,.62),rgba(255,255,255,.2));-webkit-backdrop-filter:blur(22px) saturate(190%);backdrop-filter:blur(22px) saturate(190%);border:1px solid rgba(255,255,255,.75);box-shadow:0 10px 30px rgba(0,60,130,.16),inset 0 1.5px 0 rgba(255,255,255,.95)}',
      '.brv-mini h4{margin:0 0 4px;font-weight:800}.brv-mini p{margin:0 0 8px;font-size:.8rem;color:var(--text-muted,#64748b);line-height:1.4}.brv-med{display:flex;gap:8px;margin-bottom:10px}.brv-med span{flex:1;text-align:center;font-size:1.7rem;padding:6px 0;border-radius:14px;background:rgba(255,255,255,.55);border:1px solid rgba(255,255,255,.8)}.brv-med span.off{filter:grayscale(1);opacity:.5}.brv-mini button{width:100%;padding:12px;border:0;border-radius:16px;font-weight:800;cursor:pointer;background:#1a8cff;color:#fff}'
    ].join('\n');
    document.head.appendChild(st);

    var over, big, focus = null;
    function telecharger(url, t) { var u = utilisateur(), nm = ((u.prenom || '') + '-' + (u.nom || 'patriote')).replace(/[^A-Za-z0-9À-ÿ-]+/g, '_'); var l = document.createElement('a'); l.href = url; l.download = 'Brevet-' + t.metal + '-' + nm + '.png'; document.body.appendChild(l); l.click(); l.remove(); if (window.educToast) window.educToast('✔ Brevet enregistré dans tes téléchargements'); }
    function imprimer(url) {
      var f = document.createElement('iframe'); f.style.cssText = 'position:fixed;width:0;height:0;border:0;right:0;bottom:0';
      f.srcdoc = '<!DOCTYPE html><html><head><title>Brevet</title><style>@page{size:A4 landscape;margin:0}html,body{margin:0;padding:0}img{width:100vw;height:auto;display:block}</style></head><body><img src="' + url + '"></body></html>';
      f.onload = function () { setTimeout(function () { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) { if (window.educToast) window.educToast("Impossible d'imprimer ici : télécharge l'image."); } setTimeout(function () { f.remove(); }, 4000); }, 500); };
      document.body.appendChild(f);
    }
    function partager(cv, t) {
      cv.toBlob(function (bl) { var f; try { f = new File([bl], 'Brevet-' + t.metal + '.png', { type: 'image/png' }); } catch (e) {}
        if (f && navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f], title: 'Mon brevet EDUC National', text: 'Je suis ' + t.nom + ' sur EDUC National !' }).catch(function () {});
        else telecharger(URL.createObjectURL(bl), t); }, 'image/png');
    }
    function grand(t) {
      var e = etat(t), rec = e.rec || (e.fini ? delivrer(t) : null), cv = rendre(t, e, 0.7), url = cv.toDataURL('image/jpeg', .92);
      big.innerHTML = ''; var w = el('div', 'w'); w.appendChild(el('h3', '', rec ? '🏅 ' + t.nom + ' · ' + t.metal : '👀 Aperçu : ' + t.nom + ' · ' + t.metal + ' (ton nom sera inscrit quand tu auras terminé)'));
      var im = document.createElement('img'); im.src = url; im.alt = 'Brevet ' + t.nom; w.appendChild(im);
      var act = el('div', 'brv-act');
      if (rec) {
        var b1 = el('button', 'brv-btn y', '⬇ Télécharger (haute qualité)'), b2 = el('button', 'brv-btn', '🖨 Imprimer / PDF'), b3 = el('button', 'brv-btn', '📤 Partager');
        function pleine() { return rendre(t, etat(t), 1); }
        b1.onclick = function () { telecharger(pleine().toDataURL('image/png'), t); }; b2.onclick = function () { imprimer(pleine().toDataURL('image/png')); }; b3.onclick = function () { partager(pleine(), t); };
        act.appendChild(b1); act.appendChild(b2); act.appendChild(b3);
      } else { var p = el('p', '', 'À gagner : termine ' + (t.niv ? 'toutes les questions du niveau ' + t.lib : 'les trois niveaux') + '. Il te reste ' + Math.max(0, e.total - e.done) + ' questions.'); p.style.cssText = 'color:#fff;text-align:center;width:100%;font-weight:700'; act.appendChild(p); }
      var bc = el('button', 'brv-btn l', 'Fermer'); bc.onclick = function () { big.classList.remove('on'); }; act.appendChild(bc); w.appendChild(act); big.appendChild(w); big.classList.add('on'); big.scrollTop = 0;
    }
    function remplir() {
      var gr = over.querySelector('.brv-grid'); gr.innerHTML = ''; var file = [];
      TIERS.forEach(function (t) {
        var e = etat(t), rec = e.rec || (e.fini ? delivrer(t) : null), ok = !!rec, card = el('div', 'brv-card' + (focus === t.id ? ' foc' : '')); card.setAttribute('data-t', t.id);
        var im = el('div', 'brv-img'), lk = el('span', 'brv-lock' + (ok ? ' ok' : ''), ok ? '✅ Obtenu' : '🔒 À gagner'); im.appendChild(lk); card.appendChild(im);
        card.appendChild(el('h3', '', t.emoji + ' ' + t.nom + ' · ' + t.metal)); card.appendChild(el('p', '', t.niv ? 'Termine les ' + (e.total || '…') + ' questions du niveau ' + t.lib + '.' : 'Termine les trois niveaux : Facile, Difficile et Pro.'));
        var bar = el('div', 'brv-bar'), fi = el('i'); bar.appendChild(fi); card.appendChild(bar); setTimeout(function () { fi.style.width = (ok ? 100 : e.pct) + '%'; }, 80);
        card.appendChild(el('p', '', ok ? 'Brevet au nom de ' + (rec.nom || nomPatriote()) + ' · ' + rec.date : e.done + ' / ' + e.total + ' questions (' + e.pct + ' %)'));
        var act = el('div', 'brv-act'), bv = el('button', 'brv-btn' + (ok ? ' y' : ''), ok ? '🏅 Voir et télécharger' : '👀 Voir l\'aperçu'); bv.onclick = function () { grand(t); }; act.appendChild(bv); card.appendChild(act);
        im.onclick = function () { grand(t); }; gr.appendChild(card); file.push([t, e, im]);
      });
      /* miniatures dessinées l'une après l'autre pour garder l'écran fluide */
      (function suite() { var x = file.shift(); if (!x) return; setTimeout(function () { try { var cv = rendre(x[0], x[1], 0.22), img = document.createElement('img'); img.src = cv.toDataURL('image/jpeg', .85); img.alt = 'Brevet ' + x[0].nom; x[2].insertBefore(img, x[2].firstChild); } catch (er) { console.error(er); } suite(); }, 40); })();
    }
    function construire() {
      over = el('div'); over.id = 'brv-over';
      over.innerHTML = '<div class="brv-top"><button class="brv-x" aria-label="Fermer">✕</button><b>🏅 Mes brevets de patriote</b></div><div class="brv-body"><div class="brv-intro">Voici les 4 brevets que tu peux gagner en répondant aux questions. Tu peux déjà les regarder en entier : <b>ton nom sera inscrit sur chacun d\'eux dès que tu l\'auras mérité.</b></div><div class="brv-grid"></div></div>';
      document.body.appendChild(over);
      big = el('div'); big.id = 'brv-big'; document.body.appendChild(big); big.addEventListener('click', function (e) { if (e.target === big) big.classList.remove('on'); });
      over.querySelector('.brv-x').onclick = function () { fermer(); try { if (history.state && history.state.brv) history.back(); } catch (e) {} };
      window.addEventListener('popstate', function () { if (over.classList.contains('on')) fermer(); });
    }
    function fermer() { if (big) big.classList.remove('on'); if (over) over.classList.remove('on'); document.body.style.overflow = ''; }
    window.educBrevet = function (arg) {
      var id = null, fete = false; if (arg && typeof arg === 'object') { id = arg.niveau; fete = !!arg.fete; } else if (arg === true) { id = 'grand'; fete = true; }
      if (!over) construire(); focus = id; remplir(); over.classList.add('on'); document.body.style.overflow = 'hidden'; try { history.pushState({ brv: 1 }, ''); } catch (e) {}
      if (id) setTimeout(function () { var c = over.querySelector('[data-t="' + id + '"]'); if (c) c.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, 300);
      if (fete && window.educToast) window.educToast('🎉 Félicitations ! Ton brevet est prêt, avec ton nom.', 4500);
    };

    /* ---------- Cartes d'accès : onglet Quiz et Profil ---------- */
    function carteMini(id) {
      var c = el('div', 'brv-mini'); c.id = id;
      c.innerHTML = '<h4>🏅 Les brevets à gagner</h4><p>4 brevets t\'attendent. Regarde-les dès maintenant : ton nom y sera inscrit quand tu auras fini les questions.</p><div class="brv-med"></div><button type="button">Voir les brevets</button>';
      c.querySelector('button').onclick = function () { window.educBrevet(); }; return c;
    }
    function majMini() {
      document.querySelectorAll('.brv-mini').forEach(function (c) { var m = c.querySelector('.brv-med'); if (!m) return; m.innerHTML = ''; TIERS.forEach(function (t) { var s = el('span', etat(t).obtenu ? '' : 'off', t.emoji); s.title = t.nom; m.appendChild(s); }); });
    }
    function monter() {
      var q = g('tab-quiz'), p = g('tab-profil');
      if (q && !g('brv-mini-q')) { var c = carteMini('brv-mini-q'), box = q.querySelector('.quiz-container-box'); if (box && box.parentNode) box.parentNode.insertBefore(c, box.nextSibling); else q.appendChild(c); }
      if (p && !g('brv-mini-p')) { var d = carteMini('brv-mini-p'), ref = p.querySelector('.educ-rappel-card') || p.querySelector('.xp-card'); if (ref && ref.parentNode) ref.parentNode.insertBefore(d, ref.nextSibling); else p.appendChild(d); }
      majMini();
    }
    monter(); setTimeout(monter, 800); window.addEventListener('educ-pret', monter);
    [g('tab-quiz'), g('tab-profil')].forEach(function (n) { if (n && window.MutationObserver) new MutationObserver(majMini).observe(n, { attributes: true, attributeFilter: ['class'] }); });
  } catch (err) { console.error('Brevets :', err); }
})();
