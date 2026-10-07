/* Proxy des actualités (Cloudflare Worker, gratuit).
   Garde la clé API SECRÈTE côté serveur et ne l'interroge qu'une fois toutes les 3 heures pour TOUS les utilisateurs.
   Déploiement : Cloudflare > Workers > Créer > coller ce code, puis Settings > Variables :
     SERPAPI_KEY    = votre clé (type "Secret")
     ALLOWED_ORIGIN = https://votre-domaine.cd   (plusieurs : séparés par des virgules) */
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

    // Sujets autorisés : les visiteurs ne peuvent pas choisir une autre recherche (protège votre quota)
    const TOPICS = { rdc: 'République démocratique du Congo actualités', educ: 'éducation nationale RDC' };
    const t = new URL(request.url).searchParams.get('t');
    const topic = TOPICS[t] ? t : 'rdc';
    const cache = caches.default;
    const cacheKey = new Request('https://cache.local/educ-news-v2-' + topic);
    let res = await cache.match(cacheKey);
    if (!res) {
      const url = 'https://serpapi.com/search.json?engine=google_news&q=' + encodeURIComponent(TOPICS[topic]) +
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
