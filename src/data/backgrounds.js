// Fonds d'écran et thèmes visuels pour le générateur de versets
// Inclut des visuels africains frappants, symboles sacrés (colombe, croix), paysages bibliques et dégradés AD

export const DESIGN_STYLES = [
  { 
    id: 'celeste', 
    name: 'Céleste & Royal AD', 
    description: 'Logo et nom du temple majestueusement mis en valeur dans un médaillon d\'or.', 
    badge: 'Recommandé Pro' 
  },
  { 
    id: 'glass', 
    name: 'Studio Verre Épuré', 
    description: 'Plaque de verre dépoli avec bordure dorée pour une lisibilité parfaite.', 
    badge: 'Tendance 2026' 
  },
  { 
    id: 'proclamation', 
    name: 'Impact & Proclamation', 
    description: 'Grand bandeau officiel supérieur, typographie puissante et présence forte.', 
    badge: 'Culte & Évangélisation' 
  },
  { 
    id: 'sahel', 
    name: 'Sahel & Ferveur Dorée', 
    description: 'Chaleur de l\'aube sahélienne, accents or et terre cuite du Burkina Faso.', 
    badge: 'Identité Locale' 
  }
];

export const BACKGROUND_PRESETS = [
  // 1. VISUELS D'INSPIRATION AFRICAINE (Très parlants & frappants)
  {
    id: 'afrique-priere-aube',
    name: 'Prière à l\'Aube Sahélienne',
    type: 'image',
    url: '/backgrounds/afrique-priere-aube.jpg',
    overlay: 'rgba(5, 12, 30, 0.40)',
    textColor: '#ffffff',
    category: 'Afrique & Sahel'
  },
  {
    id: 'lion-juda-afrique',
    name: 'Le Lion de Juda en Savane',
    type: 'image',
    url: '/backgrounds/lion-de-juda-afrique.jpg',
    overlay: 'rgba(15, 10, 5, 0.45)',
    textColor: '#ffffff',
    category: 'Afrique & Sahel'
  },
  {
    id: 'acacia-crepuscule-afrique',
    name: 'Acacia & Gloire au Sahel',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80',
    overlay: 'rgba(25, 12, 5, 0.45)',
    textColor: '#ffffff',
    category: 'Afrique & Sahel'
  },
  {
    id: 'baobab-etoiles',
    name: 'Baobab Millénaire & Ciel Étoilé',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80',
    overlay: 'rgba(2, 6, 23, 0.50)',
    textColor: '#ffffff',
    category: 'Afrique & Sahel'
  },
  {
    id: 'terre-benie-dore',
    name: 'Terre d\'Afrique Illuminée',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    overlay: 'rgba(20, 10, 5, 0.45)',
    textColor: '#ffffff',
    category: 'Afrique & Sahel'
  },

  // 2. SYMBOLES SACRÉS (Colombe de l'Esprit, Sainte Croix, Parole)
  {
    id: 'colombe-saint-esprit',
    name: 'Colombe du Saint-Esprit',
    type: 'image',
    url: '/backgrounds/colombe-saint-esprit.jpg',
    overlay: 'rgba(10, 15, 40, 0.40)',
    textColor: '#ffffff',
    category: 'Symboles Sacrés'
  },
  {
    id: 'sainte-croix-gloire',
    name: 'La Sainte Croix au Crépuscule',
    type: 'image',
    url: '/backgrounds/sainte-croix-gloire.jpg',
    overlay: 'rgba(15, 10, 30, 0.45)',
    textColor: '#ffffff',
    category: 'Symboles Sacrés'
  },
  {
    id: 'adoration-mains-levees',
    name: 'Adoration & Mains Levées',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1600&q=80',
    overlay: 'rgba(15, 23, 42, 0.50)',
    textColor: '#ffffff',
    category: 'Symboles Sacrés'
  },
  {
    id: 'open-bible',
    name: 'Sainte Bible & Rayons Célestes',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1600&q=80',
    overlay: 'rgba(15, 10, 5, 0.55)',
    textColor: '#ffffff',
    category: 'Symboles Sacrés'
  },

  // 3. NATURE & PAYSAGES BIBLIQUES
  {
    id: 'dawn-mountain',
    name: 'Aube Céleste & Montagnes',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    overlay: 'rgba(5, 15, 35, 0.45)',
    textColor: '#ffffff',
    category: 'Nature & Majesté'
  },
  {
    id: 'sunburst-rays',
    name: 'Rayons de Gloire',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    overlay: 'rgba(10, 25, 45, 0.40)',
    textColor: '#ffffff',
    category: 'Nature & Majesté'
  },
  {
    id: 'golden-sunset',
    name: 'Crépuscule Doré',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1600&q=80',
    overlay: 'rgba(20, 10, 30, 0.45)',
    textColor: '#ffffff',
    category: 'Nature & Majesté'
  },
  {
    id: 'starry-sky',
    name: 'Ciel Étoilé & Immensité',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80',
    overlay: 'rgba(2, 6, 23, 0.50)',
    textColor: '#ffffff',
    category: 'Nature & Majesté'
  },

  // 4. DÉGRADÉS PURS AD (100% Hors-Ligne)
  {
    id: 'grad-ad-royal',
    name: 'Bleu Royal AD & Saphir',
    type: 'gradient',
    css: 'linear-gradient(135deg, #004b91 0%, #00224d 100%)',
    overlay: 'rgba(0, 0, 0, 0.1)',
    textColor: '#ffffff',
    category: 'Élégance AD'
  },
  {
    id: 'grad-celestial-gold',
    name: 'Bleu Nuit & Or Céleste',
    type: 'gradient',
    css: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #92400e 100%)',
    overlay: 'rgba(0, 0, 0, 0.15)',
    textColor: '#ffffff',
    category: 'Élégance AD'
  },
  {
    id: 'grad-emerald-grace',
    name: 'Émeraude & Grâce',
    type: 'gradient',
    css: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #022c22 100%)',
    overlay: 'rgba(0, 0, 0, 0.1)',
    textColor: '#ffffff',
    category: 'Élégance AD'
  },
  {
    id: 'grad-purple-majesty',
    name: 'Pourpre Royale & Aube',
    type: 'gradient',
    css: 'linear-gradient(135deg, #3b0764 0%, #4c1d95 50%, #1e1b4b 100%)',
    overlay: 'rgba(0, 0, 0, 0.1)',
    textColor: '#ffffff',
    category: 'Élégance AD'
  }
];

// Formats de sortie du visuel
export const VISUAL_FORMATS = [
  {
    id: 'story',
    name: 'Statut WhatsApp / Story',
    ratio: '9:16',
    width: 1080,
    height: 1920,
    icon: 'Smartphone',
    description: 'Idéal pour le partage en statut WhatsApp et Instagram Story'
  },
  {
    id: 'square',
    name: 'Carré Réseaux Sociaux',
    ratio: '1:1',
    width: 1080,
    height: 1080,
    icon: 'Square',
    description: 'Idéal pour les publications Facebook, Instagram et groupes'
  },
  {
    id: 'banner',
    name: 'Paysage / Bannière',
    ratio: '16:9',
    width: 1920,
    height: 1080,
    icon: 'Monitor',
    description: 'Idéal pour la projection sur écran au culte et bannières'
  }
];

// Typographies bibliques élégantes
export const FONT_STYLES = [
  { id: 'serif-cinzel', name: 'Majestueux (Serif Cinzel)', fontClass: 'font-serif', style: { fontFamily: 'Georgia, "Times New Roman", serif' } },
  { id: 'sans-inter', name: 'Moderne (Sans-Serif Inter)', fontClass: 'font-sans', style: { fontFamily: 'Inter, system-ui, -apple-system, sans-serif' } },
  { id: 'script-elegant', name: 'Élégant & Solennel (Garamond)', fontClass: 'font-serif italic', style: { fontFamily: 'Garamond, Baskerville, "Baskerville Old Face", serif', fontStyle: 'italic' } }
];
