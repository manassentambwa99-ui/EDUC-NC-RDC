/* Réglages de l'application EDUC National — seul fichier à modifier.
   ATTENTION : ce dépôt GitHub est public. Tout ce qui est écrit ici est lisible par tout le monde. */
window.EDUC_CONFIG = {
  // Adresse de votre Worker Cloudflare Proxy (sans guillemets en trop)
  NEWS_PROXY: 'https://tight-unit-96f3.manassentambwa99.workers.dev',

  // Laissez les clés vides ici !
  // La clé SerpApi doit être enregistrée dans les "Secrets" (Variables d'environnement) de votre Worker Cloudflare.
  SERPAPI_KEY: '',
  NEWSDATA_KEY: '',

  // Domaines autorisés pour votre application
  ALLOWED_HOSTS: ['manassentambwa99-ui.github.io']
};
