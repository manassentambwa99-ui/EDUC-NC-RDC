export default {
  async fetch(request, env, ctx) {
    // Gestion des requêtes CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Récupération de la clé depuis les secrets Cloudflare env.SERPAPI_KEY
    const apiKey = env.SERPAPI_KEY || "b185e4e6a36c13ea94407dc45036d34bc32a2b976d606fcb3329f358403b4678";

    // Mots-clés de recherche ciblés : Éducation Nationale, Nouvelle Citoyenneté, RDC
    const query = encodeURIComponent("Éducation Nationale Nouvelle Citoyenneté RDC enseignement");
    const targetUrl = `https://serpapi.com/search.json?engine=google_news&q=${query}&gl=cd&hl=fr&api_key=${apiKey}`;

    try {
      const response = await fetch(targetUrl);
      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Erreur lors de la récupération des actualités" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },
};
