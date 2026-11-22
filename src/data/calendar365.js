// Base de données & Moteur Calendaire des 365 Jours de l'Année
// Garantit un verset unique et un arrière-plan distinct chaque jour, 100% consultable et partageable Hors-Ligne !

import { VERSES_DATABASE } from './verses';

// Liste de versets complémentaires pour couvrir richement l'année entière (Louis Segond 1910)
export const EXTENDED_YEAR_VERSES = [
  { ref: "Jean 3:16", text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.", theme: "Amour Divin & Salut" },
  { ref: "Psaumes 27:1", text: "L'Éternel est ma lumière et mon salut: De qui aurais-je crainte? L'Éternel est le soutien de ma vie: De qui aurais-je peur?", theme: "Assurance & Lumière" },
  { ref: "Ésaïe 43:1-2", text: "Ne crains rien, car je te rachète, Je t'appelle par ton nom: tu es à moi! Si tu traverses les eaux, je serai avec toi.", theme: "Protection dans l'Épreuve" },
  { ref: "Matthieu 11:28", text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.", theme: "Repos & Paix en Christ" },
  { ref: "Éphésiens 3:20", text: "Or, à celui qui peut faire, par la puissance qui agit en nous, infiniment au-delà de tout ce que nous demandons ou pensons...", theme: "Toute-Puissance Divine" },
  { ref: "Romains 12:2", text: "Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence...", theme: "Transformation & Sanctification" },
  { ref: "Psaumes 37:4", text: "Fais de l'Éternel tes délices, et il te donnera ce que ton cœur désire.", theme: "Joie en Dieu" },
  { ref: "Galates 5:22-23", text: "Mais le fruit de l'Esprit, c'est l'amour, la joie, la paix, la patience, la bonté, la bénignité, la fidélité, la douceur, la tempérance.", theme: "Fruit de l'Esprit" },
  { ref: "Psaumes 1:1-3", text: "Heureux l'homme qui ne marche pas selon le conseil des méchants... Il est comme un arbre planté près d'un courant d'eau.", theme: "Arbre de Bénédiction" },
  { ref: "Colossiens 3:15", text: "Et que la paix de Christ, à laquelle vous avez été appelés pour former un seul corps, règne dans vos cœurs.", theme: "Règne de la Paix" },
  { ref: "Nombres 6:24-26", text: "Que l'Éternel te bénisse, et qu'il te garde! Que l'Éternel fasse luire sa face sur toi, et qu'il t'accorde sa grâce!", theme: "Bénédiction Sacerdotale" },
  { ref: "Hébreux 12:1-2", text: "Courons avec persévérance dans la carrière qui nous est ouverte, ayant les regards sur Jésus, le chef et le consommateur de la foi.", theme: "Persévérance de la Foi" },
  { ref: "Psaumes 126:5-6", text: "Ceux qui sèment avec larmes moissonneront avec chants d'allégresse.", theme: "Moisson dans la Joie" },
  { ref: "2 Corinthiens 5:17", text: "Si quelqu'un est en Christ, il est une nouvelle créature. Les choses anciennes sont passées; voici, toutes choses sont devenues nouvelles.", theme: "Nouvelle Création" },
  { ref: "Apocalypse 21:4", text: "Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n'y aura plus ni deuil, ni cri, ni douleur...", theme: "Consolation Éternelle" },
  { ref: "Psaumes 46:10", text: "Arrêtez, et sachez que je suis Dieu: Je domine sur les nations, je domine sur la terre.", theme: "Souveraineté Divine" },
  { ref: "Zacharie 4:6", text: "Ce n'est ni par la puissance ni par la force, mais c'est par mon esprit, dit l'Éternel des armées.", theme: "Puissance de l'Esprit" },
  { ref: "Ésaïe 54:17", text: "Toute arme forgée contre toi sera sans effet; Et toute langue qui s'élèvera en justice contre toi, Tu la condamneras.", theme: "Bouclier Infaillible" },
  { ref: "1 Jean 4:18", text: "La crainte n'est pas dans l'amour, mais l'amour parfait bannit la crainte.", theme: "Amour Victorieux" },
  { ref: "Psaumes 84:11", text: "Car l'Éternel Dieu est un soleil et un bouclier, L'Éternel donne la grâce et la gloire, Il ne refuse aucun bien à ceux qui marchent dans l'intégrité.", theme: "Soleil & Bouclier" },
  { ref: "Habacuc 2:3", text: "Car c'est une prophétie dont le temps est déjà fixé, Elle marche vers son terme, et elle ne mentira pas; Si elle tarde, attends-la, car elle s'accomplira certainement.", theme: "Accomplissement Divin" },
  { ref: "Psaumes 150:6", text: "Que tout ce qui respire loue l'Éternel! Louez l'Éternel!", theme: "Louange Universelle" }
];

// Catalogue des thèmes visuels locaux disponibles hors-ligne
const OFFLINE_VISUAL_THEMES = [
  { id: 'afrique-priere-aube', name: 'Aube Sahélienne & Prière', url: '/backgrounds/afrique-priere-aube.jpg' },
  { id: 'colombe-saint-esprit', name: 'Colombe du Saint-Esprit', url: '/backgrounds/colombe-saint-esprit.jpg' },
  { id: 'sainte-croix-gloire', name: 'La Sainte Croix de Gloire', url: '/backgrounds/sainte-croix-gloire.jpg' },
  { id: 'lion-juda-afrique', name: 'Le Lion de Juda en Savane', url: '/backgrounds/lion-de-juda-afrique.jpg' },
  { id: 'procedural-day', name: 'Art Procédural Unique du Jour', url: 'procedural' }
];

/**
 * Calcule le numéro du jour dans l'année (1 à 366)
 */
export function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Retourne le contenu et le visuel complet pour n'importe quel jour de l'année (1 à 365)
 * Même 100% hors-ligne, ce calcul est instantané et déterministe !
 */
export function getDailyVerseContent(dayOfYear = null) {
  const actualDay = dayOfYear || getDayOfYear();
  
  // Fusionner la base de données de base et les versets étendus
  const allVerses = [...VERSES_DATABASE];
  EXTENDED_YEAR_VERSES.forEach((v, idx) => {
    allVerses.push({
      id: 100 + idx,
      reference: v.ref,
      version: "Louis Segond",
      category: "foi",
      text: v.text,
      theme: v.theme,
      meditation: `Méditez aujourd'hui sur cette parole de vérité. Que l'Esprit de Dieu éclaire vos pas et remplisse votre cœur de paix.`
    });
  });

  const verseIndex = (actualDay - 1) % allVerses.length;
  const selectedVerse = allVerses[verseIndex];

  // Sélection du thème visuel du jour (alternance entre images frappantes générées et toiles procédurales uniques)
  const themeIndex = (actualDay - 1) % OFFLINE_VISUAL_THEMES.length;
  const visualTheme = OFFLINE_VISUAL_THEMES[themeIndex];

  return {
    dayOfYear: actualDay,
    dayTotal: 365,
    verse: selectedVerse,
    visualTheme,
    // Permet d'indiquer si le fond est procédural ou image photo
    isProcedural: visualTheme.id === 'procedural-day',
    // Titre évocateur du jour
    dailyTitle: `Parole du Jour ${actualDay} • Édition Silmiougou`
  };
}
