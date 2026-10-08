/* Réglages de l'application EDUC National — seul fichier à modifier.
   ATTENTION : ce dépôt GitHub est public. Tout ce qui est écrit ici est lisible par tout le monde. */
window.EDUC_CONFIG = {
  // Adresse du proxy Cloudflare des actualités (voir news-proxy-worker.js). Exemple : 'https://educ-news.xxx.workers.dev'
  NEWS_PROXY: 'https://tight-unit-96f3.manassentambwa99.workers.dev',

  // Clés directes : déconseillé (visibles publiquement). À laisser vides si vous utilisez le proxy.
  SERPAPI_KEY: '',
  NEWSDATA_KEY: '',

  // Domaines autorisés pour votre application (sans https://). Un clone sur un autre domaine sera bloqué.
  // false = les trois niveaux sont ouverts dès le début ; true = Difficile et Pro s'ouvrent après 200 réponses du niveau précédent
  VERROUILLER_NIVEAUX: false,

  ALLOWED_HOSTS: ['manassentambwa99-ui.github.io']
};
