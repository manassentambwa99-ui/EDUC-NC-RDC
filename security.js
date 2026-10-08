/* EDUC National - protections côté navigateur.
   Limite honnête : tout code envoyé au navigateur peut être copié. Ce fichier gêne les copies simples
   (clonage sur un autre domaine, affichage dans un cadre) mais ne remplace pas la sécurité du serveur. */
(function () {
  'use strict';

  // 1. Interdire l'affichage de l'application dans le cadre d'un autre site (clickjacking)
  try { if (window.top !== window.self) { window.top.location = window.self.location; } }
  catch (e) { document.documentElement.innerHTML = ''; }

  // 2. Verrou de domaine : renseigner ici votre vrai domaine, par exemple ['educ-national.cd', 'www.educ-national.cd']
  //    Liste lue dans config.js. Vide = désactivé.
  var ALLOWED_HOSTS = (window.EDUC_CONFIG && window.EDUC_CONFIG.ALLOWED_HOSTS) || [];
  var h = location.hostname;
  if (ALLOWED_HOSTS.length && h && h !== 'localhost' && h !== '127.0.0.1' && ALLOWED_HOSTS.indexOf(h) === -1) {
    document.documentElement.innerHTML = '<p style="font-family:sans-serif;padding:24px">Cette application officielle est disponible uniquement sur son site d\'origine.</p>';
    throw new Error('Domaine non autorisé');
  }

  // 3. Échappement HTML pour tout texte venant de l'extérieur (actualités, etc.)
  window.escHtml = function (t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
})();
