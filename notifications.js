/* EDUC National - rappels d'étude, messages dans l'application et mode hors connexion.
   Fichier autonome : il ajoute lui-même son style (aux couleurs de l'application). */
(function () {
  try {
    var KEY = 'educ_rappel', DERN = 'educ_rappel_dernier';
    var MESSAGES = [
      "C'est l'heure d'étudier ! Une question de réflexion t'attend 🇨🇩",
      "Un petit quiz sur la citoyenneté ? Gagne de l'XP avec Manassé IA !",
      "Aimer son pays, c'est aussi apprendre. Ouvre EDUC National.",
      "Maintiens ta série d'apprentissage : quelques minutes suffisent."
    ];

    // ---------- Style (aux couleurs de l'application) ----------
    var st = document.createElement('style');
    st.textContent =
      '.educ-toast{position:fixed;left:50%;top:84px;z-index:10050;max-width:88%;transform:translateX(-50%);padding:12px 18px;border-radius:16px;font-size:.85rem;font-weight:700;line-height:1.4;text-align:center;color:#1e293b;background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.95);box-shadow:0 8px 28px rgba(0,60,130,.2);animation:eToastIn .35s cubic-bezier(.2,.8,.2,1) backwards}' +
      '.educ-toast.out{opacity:0;transform:translateX(-50%) translateY(-12px);transition:all .35s ease}' +
      '@keyframes eToastIn{0%{opacity:0;transform:translateX(-50%) translateY(-16px)}100%{opacity:1;transform:translateX(-50%) translateY(0)}}' +
      '.educ-sheet{position:fixed;left:0;right:0;top:0;bottom:0;z-index:10040;display:flex;align-items:flex-end;justify-content:center;padding:16px;background:rgba(0,40,100,.45);animation:lvlFade .3s ease backwards}' +
      '.educ-sheet-card{width:100%;max-width:420px;padding:26px 22px 20px;border-radius:24px;text-align:center;background:rgba(255,255,255,.96);box-shadow:0 -8px 40px rgba(0,40,100,.3);animation:eSheet .4s cubic-bezier(.2,.9,.3,1.1) backwards}' +
      '@keyframes eSheet{0%{opacity:0;transform:translateY(60px)}100%{opacity:1;transform:translateY(0)}}' +
      '.educ-sheet-card i.big{font-size:2.4rem;color:#ffc107;margin-bottom:10px;display:block}' +
      '.educ-sheet-card h3{font-size:1.2rem;color:#0066cc;margin-bottom:8px;font-weight:800}' +
      '.educ-sheet-card p{font-size:.88rem;line-height:1.5;color:#64748b;margin-bottom:16px}' +
      '.educ-sheet-card button{display:block;width:100%;padding:14px;border:none;border-radius:16px;font-weight:700;font-size:.95rem;cursor:pointer;margin-bottom:8px;background:#1a8cff;color:#fff}' +
      '.educ-sheet-card button.alt{background:#e8f2ff;color:#0066cc}' +
      '#net-banner{position:fixed;left:0;right:0;top:0;z-index:10060;padding:calc(env(safe-area-inset-top,0px) + 8px) 14px 8px;font-size:.78rem;font-weight:700;text-align:center;color:#fff;transform:translateY(-110%);transition:transform .35s ease}' +
      '#net-banner.show{transform:translateY(0)}#net-banner.off{background:#0066cc}#net-banner.on{background:#10b981}' +
      '.educ-rappel-card{text-align:left}.educ-rappel-card h4{font-size:1rem;font-weight:800;margin-bottom:6px}' +
      '.educ-rappel-card p{font-size:.8rem;color:var(--text-muted);line-height:1.45;margin-bottom:12px}' +
      '.educ-rappel-card label{display:flex;align-items:center;gap:10px;font-weight:700;font-size:.9rem;margin-bottom:10px}' +
      '.educ-rappel-card select{padding:8px 10px;border-radius:12px;border:1px solid var(--border-color);font-weight:700;background:#f8fafc}' +
      '.educ-rappel-card button{width:100%;padding:12px;border:none;border-radius:16px;font-weight:700;cursor:pointer;margin-top:8px;background:#e8f2ff;color:#0066cc}' +
      '@media (prefers-reduced-motion:reduce){.educ-toast,.educ-sheet,.educ-sheet-card{animation:none}}';
    document.head.appendChild(st);

    // ---------- Messages dans l'application ----------
    function toast(msg, ms) {
      var t = document.createElement('div'); t.className = 'educ-toast'; t.innerHTML = msg; document.body.appendChild(t);
      setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, ms || 3500);
    }
    window.educToast = toast;

    // ---------- Réglages ----------
    function lire() { try { return Object.assign({ on: false, h: 18 }, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { return { on: false, h: 18 }; } }
    function ecrire(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} versSW({ type: 'REMINDER_SETTINGS', on: s.on, h: s.h }); }
    function versSW(msg) { try { if (navigator.serviceWorker && navigator.serviceWorker.controller) navigator.serviceWorker.controller.postMessage(msg); } catch (e) {} }

    // ---------- Notification : s'affiche comme une notification de l'application ----------
    window.envoyerNotificationInstantanee = function (titre, corps, tab) {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;
      var opt = { body: corps, icon: 'logoo.png', badge: 'logoo.png', tag: 'educ-rappel', renotify: true, vibrate: [120, 60, 120], data: { tab: tab || 'tab-quiz' } };
      if (navigator.serviceWorker && navigator.serviceWorker.getRegistration) {
        navigator.serviceWorker.getRegistration().then(function (reg) { if (reg) reg.showNotification(titre, opt); else new Notification(titre, opt); }).catch(function () { try { new Notification(titre, opt); } catch (e) {} });
      } else { try { new Notification(titre, opt); } catch (e) {} }
    };

    // ---------- Planification (application ouverte) + synchronisation périodique (application installée) ----------
    var timer = null;
    function aujourdhui() { var n = new Date(); return n.getFullYear() + '-' + (n.getMonth() + 1) + '-' + n.getDate(); }
    function verifier() {
      var s = lire(); if (!s.on || !('Notification' in window) || Notification.permission !== 'granted') return;
      if (new Date().getHours() >= s.h && localStorage.getItem(DERN) !== aujourdhui()) {
        try { localStorage.setItem(DERN, aujourdhui()); } catch (e) {}
        envoyerNotificationInstantanee('EDUC National', MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
        versSW({ type: 'REMINDER_SENT' });
      }
    }
    function periodique() {
      try {
        if (!navigator.serviceWorker) return;
        navigator.serviceWorker.ready.then(function (reg) {
          if (!reg.periodicSync) return;
          navigator.permissions.query({ name: 'periodic-background-sync' }).then(function (p) {
            if (p.state === 'granted') reg.periodicSync.register('educ-rappel', { minInterval: 12 * 60 * 60 * 1000 }).catch(function () {});
          }).catch(function () {});
        });
      } catch (e) {}
    }
    window.educPlanifierRappels = function () { clearInterval(timer); timer = setInterval(verifier, 60000); verifier(); periodique(); versSW({ type: 'REMINDER_SETTINGS', on: lire().on, h: lire().h }); };

    // ---------- Demande d'autorisation : fenêtre de l'application, pas un message du navigateur ----------
    function fenetre(html) {
      var o = document.createElement('div'); o.className = 'educ-sheet'; o.innerHTML = '<div class="educ-sheet-card">' + html + '</div>'; document.body.appendChild(o); return o;
    }
    window.demanderPermissionNotifications = function () {
      if (!('Notification' in window)) { toast('Les rappels ne sont pas disponibles sur ce navigateur.'); return; }
      if (Notification.permission === 'denied') { toast('Les rappels sont bloqués. Autorisez-les dans les réglages du site (cadenas près de l\'adresse).', 5000); return; }
      if (Notification.permission === 'granted') { var s = lire(); if (!s.on) { s.on = true; ecrire(s); educPlanifierRappels(); } toast('🔔 Rappels d\'étude activés. Réglez l\'heure dans Profil.'); return; }
      var o = fenetre('<i class="fa-solid fa-bell big"></i><h3>Activer les rappels d\'étude ?</h3><p>EDUC National te rappellera chaque jour de réviser la nouvelle citoyenneté et le patriotisme. Tu peux changer l\'heure ou arrêter quand tu veux.</p><button data-a="oui">Activer les rappels</button><button class="alt" data-a="non">Plus tard</button>');
      o.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return; o.remove();
        if (b.dataset.a !== 'oui') return;
        Notification.requestPermission().then(function (p) {
          if (p === 'granted') { var s = lire(); s.on = true; ecrire(s); educPlanifierRappels(); majCarte(); toast('✔ Rappels activés'); envoyerNotificationInstantanee('EDUC National', 'Bien joué ! Tes rappels d\'étude sont configurés.'); }
          else toast('Les rappels restent désactivés. Tu pourras les activer plus tard.');
        });
      });
    };

    // ---------- Carte « Rappels d'étude » dans Profil ----------
    function majCarte() {
      var s = lire(), on = document.getElementById('rp-on'), h = document.getElementById('rp-h');
      if (on) on.checked = !!s.on && 'Notification' in window && Notification.permission === 'granted'; if (h) h.value = String(s.h);
    }
    var profil = document.getElementById('tab-profil');
    if (profil) {
      var carte = document.createElement('div'); carte.className = 'xp-card educ-rappel-card';
      carte.innerHTML = '<h4>🔔 Rappels d\'étude</h4><p>Reçois une notification chaque jour pour réviser. Installe l\'application sur ton écran d\'accueil pour qu\'elle apparaisse comme une vraie application.</p>' +
        '<label><input type="checkbox" id="rp-on"> Activer les rappels</label>' +
        '<label>Heure : <select id="rp-h"><option value="8">8 h</option><option value="12">12 h</option><option value="17">17 h</option><option value="18">18 h</option><option value="20">20 h</option></select></label>' +
        '<button id="rp-test">Tester la notification</button><button id="rp-install" style="display:none">📲 Installer l\'application</button>';
      var premiere = profil.querySelector('.xp-card'); if (premiere && premiere.nextSibling) profil.insertBefore(carte, premiere.nextSibling); else profil.appendChild(carte);
      majCarte();
      carte.querySelector('#rp-on').addEventListener('change', function () {
        var s = lire();
        if (this.checked) { if ('Notification' in window && Notification.permission !== 'granted') { this.checked = false; demanderPermissionNotifications(); return; } s.on = true; ecrire(s); educPlanifierRappels(); toast('✔ Rappels activés'); }
        else { s.on = false; ecrire(s); toast('Rappels désactivés'); }
      });
      carte.querySelector('#rp-h').addEventListener('change', function () { var s = lire(); s.h = parseInt(this.value, 10); ecrire(s); toast('Rappel réglé à ' + s.h + ' h'); });
      carte.querySelector('#rp-test').addEventListener('click', function () {
        if (!('Notification' in window) || Notification.permission !== 'granted') { demanderPermissionNotifications(); return; }
        envoyerNotificationInstantanee('EDUC National', MESSAGES[Math.floor(Math.random() * MESSAGES.length)]); toast('Notification envoyée');
      });
      var bi = carte.querySelector('#rp-install');
      if (window.__dp) bi.style.display = 'block';
      window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); window.__dp = e; bi.style.display = 'block'; });
      bi.addEventListener('click', function () { if (window.__dp) { window.__dp.prompt(); window.__dp = null; bi.style.display = 'none'; } });
      window.addEventListener('appinstalled', function () { bi.style.display = 'none'; toast('✔ Application installée'); });
    }

    // ---------- Ouverture du bon onglet quand on touche une notification ----------
    if (navigator.serviceWorker) navigator.serviceWorker.addEventListener('message', function (e) {
      var d = e.data || {}; if (d.type !== 'OPEN_TAB' || typeof switchTab !== 'function') return;
      var idx = { 'tab-accueil': 0, 'tab-cours': 1, 'tab-quiz': 2, 'tab-actu': 3, 'tab-profil': 4 }[d.tab]; switchTab(d.tab, idx == null ? 0 : idx);
    });

    // ---------- Mode hors connexion : pas de page d'erreur de Chrome, un message de l'application ----------
    var nb = document.createElement('div'); nb.id = 'net-banner'; document.body.appendChild(nb);
    function reseau() {
      if (!navigator.onLine) { nb.className = 'show off'; nb.innerHTML = '📡 Hors connexion · le quiz reste disponible. Les cours PDF et les actualités reviendront avec Internet.'; }
      else if (nb.classList.contains('off')) { nb.className = 'show on'; nb.innerHTML = '✔ Connexion rétablie'; setTimeout(function () { nb.className = ''; }, 2500); }
    }
    window.addEventListener('offline', reseau); window.addEventListener('online', reseau); if (!navigator.onLine) reseau();

    // Un cours PDF jamais ouvert ne peut pas s'afficher sans Internet : message clair au lieu d'une erreur
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href$=".pdf"]'); if (!a || navigator.onLine) return;
      e.preventDefault();
      var lien = a.href;
      (window.caches ? caches.match(lien) : Promise.resolve(null)).then(function (r) {
        if (r) window.open(lien, '_blank'); else toast('📡 Ce cours n\'est pas encore sur ton téléphone. Ouvre-le une fois avec Internet : il sera ensuite disponible sans forfait.', 5500);
      });
    }, true);

    // ---------- Démarrage ----------
    var m = document.getElementById('main-app'); if (m && m.classList.contains('active')) educPlanifierRappels();
  } catch (err) { console.error('Notifications :', err); }
})();
