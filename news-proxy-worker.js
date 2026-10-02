/* Proxy des actualités (Cloudflare Worker, gratuit).
   Garde la clé API SECRÈTE côté serveur et ne l'interroge qu'une fois toutes les 3 heures pour TOUS les utilisateurs.
   Déploiement : Cloudflare > Workers > Créer > coller ce code, puis Settings > Variables :
     SERPAPI_KEY    =b185e4e6a36c13ea94407dc45036d34bc32a2b976d606fcb3329f358403b4678(type "Secret")
     ALLOWED_ORIGIN = https://manassentambwa99-ui.github.io/EDUC-NC-RDC/  (plusieurs : séparés par des virgules) */
export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
    const cors = {
      'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : 'null',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Vary': 'Origin'
    };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'GET' || !allowed.includes(origin)) return new Response('Accès refusé', { status: 403, headers: cors });

    const cache = caches.default;
    const cacheKey = new Request('https://cache.local/educ-news-v1');
    let res = await cache.match(cacheKey);
    if (!res) {
      // La requête est fixée ici : les visiteurs ne peuvent pas la modifier (protège votre quota)
      const url = 'https://serpapi.com/search.json?engine=google_news&q=' + encodeURIComponent('éducation nationale RDC') +
                  '&gl=cd&hl=fr&api_key=' + encodeURIComponent(env.SERPAPI_KEY);
      const r = await fetch(url);
      res = new Response(r.body, { status: r.status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=10800' } });
      if (r.ok) ctx.waitUntil(cache.put(cacheKey, res.clone()));
    }
    const out = new Response(res.body, res);
    Object.entries(cors).forEach(([k, v]) => out.headers.set(k, v));
    return out;
  }
};
