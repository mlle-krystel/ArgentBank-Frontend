// Sert à optimiser le CSS pour qu'il soit plus léger, plus rapide à charger et sans classes inutiles

// Plugin de minification CSS (supprime espaces, commentaires, réduit la taille)
const cssnano = require('cssnano');

// Plugin de nettoyage : supprime les classes CSS non utilisées
const purgecss = require('@fullhuman/postcss-purgecss').default;

// Configuration de PostCSS
module.exports = {
  plugins: [
    // Minification automatique du CSS
    cssnano({
      preset: 'default', // "default" applique toutes les optimisations standards
    }),

    // Suppression des classes CSS non utilisées (purge)
    purgecss({
      // Chemins des fichiers à analyser pour repérer les classes réellement utilisées .ts, .tsx, .html, .vue, etc
      content: ['./index.html', './src/**/*.{js,jsx}'],

      // Expression régulière (regex) qui extrait toutes les classes utilisées dans le code et ignore les faux positifs comme les ":" de :hover, :focus...
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
