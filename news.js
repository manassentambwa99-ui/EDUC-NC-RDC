(function () {
  try {
    var CFG = window.EDUC_CONFIG || {};
    var KEY = CFG.SERPAPI_KEY || '';
    var PROXY = CFG.NEWS_PROXY || '';
    var TTL = 6 * 60 * 60 * 1000;
    var QUERIES = { rdc: 'République démocratique du Congo actualités', educ: 'éducation nationale RDC' };
    var IMG = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80';
    var BASE = /éduc|educ|école|ecole|enseign|scolaire|élève|eleve|exetat|tenafep|citoyenn|epst|universit|étudiant|etudiant|rentrée|rentree/i;
    // chip -> { topic, filtre }
    var THEMES = {
      rdc: { topic: 'rdc', re: null },
      educ: { topic: 'educ', re: null },
      exam: { topic: 'educ', re: /exetat|tenafep|examen|résultat|resultat|épreuve|epreuve|diplôm|diplom/i },
      citoy: { topic: 'educ', re: /citoyenn|civisme|patriot|civique/i },
      ens: { topic: 'educ', re: /enseignant|professeur|instituteur|salaire|prime|grève|greve|paie/i }
    };
    var store = { rdc: [], educ: [] }, cur = 'rdc', pending = {};

    function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function fdate(d) { var m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(d || ''); return m ? m[2] + '/' + m[1] + '/' + m[3] : String(d || '').split(',')[0]; }
    function flat(list) {
      var out = [];
      list.forEach(function (r) {
        var arr = r.stories && r.stories.length ? r.stories : [r];
        arr.forEach(function (x) {
          if (!x || !x.title || !x.link) return;
          out.push({ title: x.title, link: x.link, src: x.source && x.source.name, icon: x.source && x.source.icon, img: x.thumbnail, date: x.date, snip: x.snippet || '' });
        });
      });
      return out;
    }
    function box() { return document.getElementById('live-news-container'); }
    function render(msg) {
      var b = box(); if (!b) return;
      var th = THEMES[cur], list = store[th.topic].filter(function (it) { return !th.re || th.re.test(it.title + ' ' + it.snip); });
      var titre = th.topic === 'rdc' ? 'actualité(s) de la République démocratique du Congo' : 'article(s) sur l\'éducation nationale en RDC';
      var meta = '<div class="news-meta"><i class="fa-regular fa-clock"></i> ' + list.length + ' ' + titre + '</div>';
      if (!list.length) { b.innerHTML = meta + '<div class="news-card"><p style="font-size:0.85rem;color:var(--text-muted);">' + (msg || 'Aucune actualité pour ce thème pour le moment.') + '</p></div>'; return; }
      b.innerHTML = meta + list.map(function (it) {
        return '<div class="news-card">' +
          '<img src="' + esc(it.img || IMG) + '" alt="" loading="lazy" class="news-card-img" onerror="this.onerror=null;this.src=\'' + IMG + '\';">' +
          '<span class="news-source">' + (it.icon ? '<img src="' + esc(it.icon) + '" alt="" onerror="this.style.display=\'none\'">' : '<i class="fa-solid fa-flag"></i>') + esc(it.src || 'RDC') + '</span>' +
          '<h4 style="font-size:0.95rem;font-weight:700;margin:4px 0;color:var(--text-dark);">' + esc(it.title) + '</h4>' +
          (it.snip ? '<p style="font-size:0.8rem;color:var(--text-muted);line-height:1.4;">' + esc(it.snip.substring(0, 120)) + '...</p>' : '') +
          '<div style="display:flex;justify-content:space-between;align-items:center;font-size:0.75rem;color:var(--text-muted);margin-top:6px;">' +
          '<span><i class="fa-regular fa-clock"></i> ' + esc(fdate(it.date)) + '</span>' +
          '<a href="' + esc(it.link) + '" target="_blank" rel="noopener" style="color:var(--primary-blue);font-weight:700;text-decoration:none;">Lire la suite →</a></div></div>';
      }).join('');
    }
    function charger(topic) {
      if (!PROXY && !KEY) return Promise.reject(new Error('NEWS_PROXY est vide dans config.js'));
      var url = PROXY ? PROXY + (PROXY.indexOf('?') < 0 ? '?' : '&') + 't=' + topic
        : 'https://serpapi.com/search.json?engine=google_news&q=' + encodeURIComponent(QUERIES[topic]) + '&gl=cd&hl=fr&api_key=' + KEY;
      return fetch(url).then(function (r) {
        if (!r.ok) throw new Error('le serveur répond ' + r.status);
        return r.json();
      }, function () {
        throw new Error('connexion impossible (adresse du proxy ou ALLOWED_ORIGIN incorrect ?)');
      }).then(function (d) {
        if (d.error) throw new Error(d.error);
        return flat(d.news_results || []);
      });
    }
    function charge(topic, force) {
      var ck = 'educ_news_v3_' + topic, cache = null;
      try { cache = JSON.parse(localStorage.getItem(ck) || 'null'); } catch (e) {}
      var has = cache && cache.items && cache.items.length;
      if (has) { store[topic] = cache.items; if (THEMES[cur].topic === topic) render(); }
      if (has && !force && Date.now() - cache.t < TTL) return;
      if (!has && box() && THEMES[cur].topic === topic) box().innerHTML = '<div class="news-card"><p style="color:var(--text-muted);font-size:0.85rem;">Chargement des actualités en cours...</p></div>';
      if (pending[topic]) return; pending[topic] = true;
      charger(topic).then(function (all) {
        var seen = {}, uniq = all.filter(function (it) { if (seen[it.link]) return false; seen[it.link] = 1; return true; });
        if (topic === 'educ') { var rel = uniq.filter(function (it) { return BASE.test(it.title + ' ' + it.snip); }); if (rel.length >= 4) uniq = rel; }
        store[topic] = uniq.slice(0, 25);
        if (!store[topic].length) throw new Error('aucun article trouvé');
        try { localStorage.setItem(ck, JSON.stringify({ t: Date.now(), items: store[topic] })); } catch (e) {}
        if (THEMES[cur].topic === topic) render();
      }).catch(function (e) {
        if (!store[topic].length && THEMES[cur].topic === topic) render('Actualités indisponibles pour le moment.<br><small>Détail : ' + esc(e.message) + '</small>');
      }).then(function () { pending[topic] = false; });
    }
    window.fetchLiveNewsRDC = function (force) { charge(THEMES[cur].topic, force); };

    var tab = document.getElementById('tab-actu'), b0 = box();
    if (tab && b0) {
      var h = tab.querySelector('.section-title'); if (h) h.innerText = 'Actualités – République Démocratique du Congo';
      var bar = document.createElement('div'); bar.className = 'news-chips';
      bar.innerHTML = '<button class="news-chip on" data-f="rdc">🇨🇩 RDC</button><button class="news-chip" data-f="educ">Éducation</button><button class="news-chip" data-f="exam">Examens</button><button class="news-chip" data-f="citoy">Citoyenneté</button><button class="news-chip" data-f="ens">Enseignants</button><button class="news-chip" data-f="refresh"><i class="fa-solid fa-rotate"></i> Actualiser</button>';
      tab.insertBefore(bar, b0);
      bar.addEventListener('click', function (e) {
        var b = e.target.closest('.news-chip'); if (!b) return; var f = b.getAttribute('data-f');
        if (f === 'refresh') { charge(THEMES[cur].topic, true); return; }
        cur = f; bar.querySelectorAll('.news-chip').forEach(function (x) { x.classList.toggle('on', x === b); });
        render(); charge(THEMES[cur].topic, false);
      });
    }
    var m0 = document.getElementById('main-app'); if (m0 && m0.classList.contains('active')) window.fetchLiveNewsRDC();
  } catch (err) { console.error('Actualités :', err); }
})();
